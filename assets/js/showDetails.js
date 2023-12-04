function showGameDetails(gameId){
    $.ajax({
        method:"GET",
        url:`http://127.0.0.1:8000/api/data/${gameId}`,
        dataType: "json",
        success: function(gameData){
            showGameDetails.html("");
        }
    })
}