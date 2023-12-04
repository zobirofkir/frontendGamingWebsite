$(function () {
    $("#search-form").submit(function (e) {
        e.preventDefault();

        var title = $("#title").val();
        var resultContainer = $("#result-search");

        // Include the CSRF token in the data
        var searchData = {
            title: title,
        };

        $.ajax({
            method: "GET",
            url: "https://zobirofkir.com/api/api/game/search",
            data: searchData,
            success: function (response, status, xhr) {
                if (status === "success") {
                    // Clear previous results
                    resultContainer.html("");

                    // Handle the search results here
                    if (response && response.length > 0) {
                        // Assuming response is an array of results
                        response.forEach(function (result) {
                            resultContainer.append(`
                            <div class="alert alert-warning" role="alert">
                                This search result <span style="color: red;">${result.title}</span> will close in <span style="color: red; font-size: 20px; font-weight: 900; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">1 minute</span>.
                            </div>
                        
                                <div class="modal-dialog modal-dialog-scrollable modal-fullscreen-md" style="background-color: white; padding: 15px 10px; border-radius: 15px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <div class="modal-content">
                                        <div class="modal-header text-center" style="text-align: center;">
                                            <h5 class="modal-title" style="margin-bottom: 10px;">${result.title}</h5>
                                        </div>
                                        <div class="modal-body text-center">
                                            <div class="container-fluid">
                                                <img src="${result.image_url}" class="img-fluid rounded mb-3" alt="Game Image" style="margin-bottom: 15px;">
                                            </div>
                                            <p style="color: black;">${result.description}</p>
                                            <a href="${result.game_path}" target='__blank' class="btn btn-primary"><i class="fa-solid fa-download fa-shake"></i> Download</a>

                                            <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                                        </div>
                                    </div>
                                </div>
                            `);
                        // Close the modal after 5 seconds
                        setTimeout(function() {
                            $('#result-search').modal('hide'); // Replace 'yourModalId' with the actual ID of your modal
                            resultContainer.html(""); // Clear the content
                        }, 60000);
                    });
                    } else {
                        resultContainer.html(`
                        <div class="alert alert-dark" role="alert">
                            Not Found Any Games Name <span style="color: black; font-weight: 900;">${title}</span>
                        </div>
                        `);
                        setTimeout(function() {
                            $('#result-search').modal('hide'); // Replace 'yourModalId' with the actual ID of your modal
                            resultContainer.html(""); // Clear the content
                        }, 3000);

                    }
                } else {
                    console.log("false");
                    // Handle the error case here
                }
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
                // Handle the error case here
            }
        });
    });
});
