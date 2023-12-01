$(function () {
    $("#contact-form").submit(function (e) {
        e.preventDefault(); // prevent the form from submitting normally
        // Assuming you have defined variables username, name, subject, and message somewhere in your code

        var username = $("#username").val();  // Replace with the actual ID of your input field
        var name = $("#name").val();  // Replace with the actual ID of your input field
        var subject = $("#subject").val();  // Replace with the actual ID of your input field
        var message = $("#message").val();  // Replace with the actual ID of your input field
        const response = document.getElementById("data-response");

        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:8000/contact",
            data: JSON.stringify({
                username: username,
                name: name,
                subject: subject,
                message: message
            }),
            success: function(data, status, xhr){
                if (status === "success"){
                    response.innerHTML += `
                    <br>
                    <div class="alert alert-success text-center" role="alert">
                        We Will Contact You Soon
                    </div>
                    `;
                    
                } else {
                    response.innerHTML += `
                    <div class="alert alert-danger" role="alert">
                        Bad Request
                    </div>
                    `;
                }
            },
        
            error: function(xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    });
});
