$(function () {
    const response = $("#result-container");

    let imageUrls = []; // Array to store image URLs

    $.ajax({
        method: "GET",
        url: "https://zobirofkir.com/api/api/data",
        dataType: "json",

        success: function (data, status, xhr) {
            if (status === "success") {
                // Clear existing content before appending new data
                response.html("");

                // Iterate through the received data
                data.forEach(function (item) {
                    console.log("Image URL:", item.image_url);

                    // Store the image URL in the array
                    imageUrls.push(item.image_url);

                    // Assuming 'items' is an array containing your data
                    response.append(`
                        <div class="col-lg-3 col-md-6">
                            <div class="item">
                                <div class="thumb"> 
                                    <img src="${item.image_url}" alt="No Image Found">
                                </div>
                                <div class="down-content">
                                    <span class="category">${item.title}</span>
                                    <h4>${item.description.substring(0, 100)+' ...'}</h4>
                                    <a href="${item.game_path}"><i class="fa-solid fa-download fa-shake"></i></a>
                                </div>
                                <a href="games.html" class="btn btn-info show-details" data-game-id="${item.id}">
                                    <i class="fa-solid fa-circle-info"></i> More Games
                                </a>              
                            </div>
                        </div>
                    `);
                });

                // Now imageUrls array contains all the image URLs
                console.log("All Image URLs:", imageUrls);
            } else {
                console.error("No Data Found");
                response.html("No Data Found");
            }
        },
        error: function (xhr, status, error) {
            console.error("Ajax Request Failed:", status, error);
        }
    });
});
