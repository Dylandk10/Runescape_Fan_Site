//ajax handler for search player html
//button event handler
document.getElementById("btnItem").addEventListener("click", () => {
    sendRequest();
    document.getElementById("btnItem").innerHTML = "Searching ...";
    document.getElementById("btnItem").disable = true;
    document.getElementById("errorItem").innerHTML = "";
});

//jquery ajax call
function sendRequest() {
    $.ajax({
    url: './../searchitem',
    data: {
      'name': document.getElementById("item").value,
    },
    dataType: 'json',
    success: function (data) {
        document.getElementById("btnItem").innerHTML = "Search Item";
        document.getElementById("btnItem").disable = false;

        //if object is null
        if(data && Object.keys(data).length == 0) {
            document.getElementById("errorItem").innerHTML = "Item Not Found";
            resetTable();
        } else {
            var obj = JSON.parse(JSON.stringify(data));
            setTable(obj);
        }
      }
    });
}

//set the table with object
function setTable(obj) {
    document.getElementById('itemname').innerHTML = obj.name;
    document.getElementById('itemprice').innerHTML = obj.price.toString();
    document.getElementById('itemdes').innerHTML = obj.des;
    document.getElementById('itemmem').innerHTML = obj.mem.toString();

}
function resetTable() {
    document.getElementById('itemname').innerHTML = "--";
    document.getElementById('itemprice').innerHTML = "--";
    document.getElementById('itemdes').innerHTML = "--";
    document.getElementById('itemmem').innerHTML = "--";
}
