$(function () {
    $("#games-form").submit(function (e) {
        e.preventDefault();

        var form = $(this);
        var response = $("#response-data");

        var formData = new FormData(form[0]);

        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:8000/api/game",
            data: formData,
            dataType: "json",
            contentType: false,
            processData: false,

            success: function (data, status, xhr) {
                console.log(data); // Log the server response for debugging
                if (status === "success") {
                    response.html(`
                        <br>
                        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-center" role="alert">
                            <span class="font-medium">Success:</span> You have successfully uploaded your game.
                        </div>
                    `);
                    form[0].reset();
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText); // Log the server error response for debugging
                response.html(`
                    <br>
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
                        <span class="font-medium">Error:</span> An error occurred while processing your request. Please try again later.
                    </div>
                `);
            },
            complete: function () {
                // Re-enable submit button regardless of success or failure
                form.find("input[type='submit']").prop("disabled", false);
            },
        });
    });
});
