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
        if(data && Object.keys(data).length == 0) {
            console.log("error");
        } else {
            console.log(data);
        }
      }
    });
}
