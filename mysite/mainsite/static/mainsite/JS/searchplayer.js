document.getElementById("btnplayer").addEventListener("click", () => {
    sendRequest();
});
//jquery ajax call
function sendRequest() {
    $.ajax({
    url: './../searchplayerstats',
    data: {
      'name': document.getElementById("username").value,
    },
    dataType: 'json',
    success: function (data) {
        console.log("Ran");
      }
    });
}
