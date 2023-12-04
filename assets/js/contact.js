$(function () {
    $("#contact-form").submit(function (e) {
        e.preventDefault();

        var username = $("#username").val();
        var name = $("#name").val();
        var subject = $("#subject").val();
        var message = $("#message").val();
        var response = $("#data-response");

        // Include the CSRF token in the data
        var data = {
            _token: $('meta[name="csrf-token"]').attr('content'),
            username: username,
            name: name,
            subject: subject,
            message: message
        };

        $.ajax({
            method: "POST",
            url: "https://zobirofkir.com/api/api/contact",
            data: data,
            success: function (data, status, xhr) {
                if (status === "success") {
                    response.html(`
                        <br>
                        <div class="alert alert-success text-center" role="alert">
                            We Will Contact You Soon
                        </div>
                    `);
                } else {
                    response.html(`
                        <div class="alert alert-danger" role="alert">
                            Bad Request
                        </div>
                    `);
                }
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    });
});
