
// //jquery ajax call
function sendRequest(nameOfPlayer) {
    $.ajax({
    url: './../addvote',
    dataType: 'json',
    data: {
      'name': nameOfPlayer,
    },
    success: function (data) {
        //if object is null then its not an error!
        if(data && Object.keys(data).length == 0 || data.error == null) {
            console.log("success");
            location.reload();
        } else {
            alert(data.error);
        }
    }
    });
}

//array of all btnVote buttons
let btnVote = document.querySelectorAll(".btnVote");
//add the click event to each button witht he target name as the value 
btnVote.forEach(function(ele) {
    ele.addEventListener("click", function(event) {
        sendRequest(event.target.value.toString());
    });
});
