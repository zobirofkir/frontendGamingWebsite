function showGameDetails(gameId){
    $.ajax({
        method:"GET",
        url:`https://zobirofkir.com/api/api/data/${gameId}`,
        dataType: "json",
        success: function(gameData){
            showGameDetails.html("");
        }
    })
}