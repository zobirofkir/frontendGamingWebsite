$(function () {
  const response = $("#all-games");
  const imageUrls = [];

  $.ajax({
    method: "GET",
    url: "https://zobirofkir.com/api/api/data",
    dataType: "json",
    success: handleSuccess,
    error: handleAjaxError
  });

  function handleSuccess(data) {
    response.empty();

    if (Array.isArray(data) && data.length > 0) {
      data.forEach(function (item) {
        if (isValidDataItem(item)) {
          imageUrls.push(item.image_url);

          let truncatedDescription = $("<div>").text(item.description).html().substring(0, 50) + '...';

          response.append(`
            <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv">
              <div class="item">
                <div class="thumb">
                  <a href="${item.game_path}" target="__blank"><img src="${item.image_url}" alt=""></a>
                </div>
                <div class="down-content">
                  <h4>${item.title}</h4>
                  <span class="category">${truncatedDescription}</span>
                  <a href="${item.game_path}" target="__blank"><i class="fa-solid fa-download fa-shake"></i></a>
                </div>
                <a href="#" class="btn btn-info show-details" data-game-id="${item.id}">
                  <i class="fa-solid fa-circle-info"></i> Game Details
                </a>
              </div>
            </div>
          `);
        } else {
          console.error("Missing required properties in data item:", item);
        }
      });

      logImageUrls();
    } else {
      console.error("No Data Found");
      response.html("No Data Found");
    }
  }

  function handleAjaxError(xhr, status, error) {
    console.error("Ajax Request Failed:", status, error);
  }

  function isValidDataItem(item) {
    return item && item.image_url && item.title && item.description && item.game_path && item.id;
  }

  function logImageUrls() {
    if (imageUrls.length > 0) {
      console.log("All Image URLs:", imageUrls);
    } else {
      console.error("No Image URLs found");
    }
  }
});

$(document).on("click", ".show-details", function (e) {
  e.preventDefault();

  const imageUrls = [];
  const gameId = $(this).data("game-id");

  $.ajax({
    method: "GET",
    url: `https://zobirofkir.com/api/api/data/${gameId}`,
    dataType: "json",

    success: function (gameDetails) {
      imageUrls.push(gameDetails.image_url);
      let truncatedDescription = $("<div>").text(gameDetails.description).html() + '...';

      // Add custom CSS styles to position the modal above the screen
      const modalStyle = `
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      max-width: 90vw;
    `;
    
    $("#gameDetailsContent").html(`
      <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md" style="${modalStyle}">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${gameDetails.title}</h5>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div class="container-fluid">
              <img src="${gameDetails.image_url}" class="img-fluid rounded mb-3" alt="Game Image">
            </div>
            <p>${truncatedDescription}</p>
            <a href="${gameDetails.game_path}" target='__blanck' class="btn btn-primary"><i class="fa-solid fa-download fa-shake"></i> Download</a>
          </div>
        </div>
      </div>
    `);
    
    // Add custom styles for small screens
    const smallScreenStyles = `
      @media (max-width: 576px) {
        .modal-dialog {
          width: 100%;
          max-width: 100%;
          margin: 0;
        }
      }
    `;
    
    // Append custom styles to the head of the document
    $("head").append(`<style>${smallScreenStyles}</style>`);
    
      // Add event listener for the close button
      $(".btn-close").on("click", function () {
        // Close the modal by removing its content
        $("#gameDetailsContent").html("");
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to fetch game details:", status, error);
    }
  });
});
