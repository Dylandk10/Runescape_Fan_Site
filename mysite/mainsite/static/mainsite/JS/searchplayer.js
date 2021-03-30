//ajax handler for search player html
//button event handler
document.getElementById("btnplayer").addEventListener("click", () => {
    sendRequest();
    document.getElementById("btnplayer").innerHTML = "Searching ...";
    document.getElementById("btnplayer").disable = true;
    document.getElementById("errorplayer").innerHTML = "";
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
        document.getElementById("btnplayer").innerHTML = "Search Player";
        document.getElementById("btnplayer").disable = false;

        //if object is null
        if(data && Object.keys(data).length == 0) {
            document.getElementById("errorplayer").innerHTML = "Player Not Found";
            resetTable();
        } else {
            var obj = JSON.parse(JSON.stringify(data));
            displayData(obj);
        }
      }
    });
}

//display the ajax data
function displayData(obj) {
    document.getElementById("attlvl").innerHTML = obj.att_lvl;
    document.getElementById("attrank").innerHTML = obj.att_rank;
    document.getElementById("strlvl").innerHTML = obj.str_lvl;
    document.getElementById("strrank").innerHTML = obj.str_rank;
    document.getElementById("deflvl").innerHTML = obj.def_lvl;
    document.getElementById("defrank").innerHTML = obj.def_rank;
    document.getElementById("rangelvl").innerHTML = obj.rng_lvl;
    document.getElementById("rangerank").innerHTML = obj.rng_rank;
    document.getElementById("prayerlvl").innerHTML = obj.pray_lvl;
    document.getElementById("prayerrank").innerHTML = obj.pray_rank;
    document.getElementById("magelvl").innerHTML = obj.mage_lvl;
    document.getElementById("magerank").innerHTML = obj.mage_rank;
    document.getElementById("rclvl").innerHTML = obj.rune_lvl;
    document.getElementById("rcrank").innerHTML = obj.rune_rank;
    document.getElementById("hplvl").innerHTML = obj.hp_lvl;
    document.getElementById("hprank").innerHTML = obj.hp_rank;
    document.getElementById("craftlvl").innerHTML = obj.craf_lvl;
    document.getElementById("craftrank").innerHTML = obj.craf_rank;
    document.getElementById("minelvl").innerHTML = obj.mine_lvl;
    document.getElementById("minerank").innerHTML = obj.mine_rank;
    document.getElementById("smithlvl").innerHTML = obj.smith_lvl;
    document.getElementById("smithrank").innerHTML = obj.smith_rank;
    document.getElementById("attlvl").innerHTML = obj.att_lvl;
    document.getElementById("attrank").innerHTML = obj.att_rank;
    document.getElementById("fishlvl").innerHTML = obj.fish_lvl;
    document.getElementById("fishrank").innerHTML = obj.fish_rank;
    document.getElementById("cooklvl").innerHTML = obj.cook_lvl;
    document.getElementById("cookrank").innerHTML = obj.cook_rank;
    document.getElementById("firelvl").innerHTML = obj.fire_lvl;
    document.getElementById("firerank").innerHTML = obj.fire_rank;
    document.getElementById("woodlvl").innerHTML = obj.wood_lvl;
    document.getElementById("woodrank").innerHTML = obj.wood_rank;
    document.getElementById("aglvl").innerHTML = obj.ag_lvl;
    document.getElementById("agrank").innerHTML = obj.ag_rank;
    document.getElementById("herblvl").innerHTML = obj.herb_lvl;
    document.getElementById("herbrank").innerHTML = obj.herb_rank;
    document.getElementById("thievlvl").innerHTML = obj.thiev_lvl;
    document.getElementById("thievrank").innerHTML = obj.thiev_rank;
    document.getElementById("fletchlvl").innerHTML = obj.flet_lvl;
    document.getElementById("fletchrank").innerHTML = obj.flet_rank;
    document.getElementById("slaylvl").innerHTML = obj.slay_lvl;
    document.getElementById("slayrank").innerHTML = obj.slay_rank;
    document.getElementById("farmlvl").innerHTML = obj.farm_lvl;
    document.getElementById("farmrank").innerHTML = obj.farm_rank;
    document.getElementById("conlvl").innerHTML = obj.con_lvl;
    document.getElementById("conrank").innerHTML = obj.con_rank;
    document.getElementById("huntlvl").innerHTML = obj.hunt_lvl;
    document.getElementById("huntrank").innerHTML = obj.hunt_rank;
}

//reset table 
function resetTable() {
    document.getElementById("attlvl").innerHTML = "--";
    document.getElementById("attrank").innerHTML = "--"''
    document.getElementById("strlvl").innerHTML = "--";
    document.getElementById("strrank").innerHTML = "--";
    document.getElementById("deflvl").innerHTML = "--";
    document.getElementById("defrank").innerHTML = "--";
    document.getElementById("rangelvl").innerHTML = "--";
    document.getElementById("rangerank").innerHTML = "--";
    document.getElementById("prayerlvl").innerHTML = "--";
    document.getElementById("prayerrank").innerHTML = "--";
    document.getElementById("magelvl").innerHTML = "--";
    document.getElementById("magerank").innerHTML = "--";
    document.getElementById("rclvl").innerHTML = "--";
    document.getElementById("rcrank").innerHTML = "--";
    document.getElementById("hplvl").innerHTML = "--";
    document.getElementById("hprank").innerHTML = "--";
    document.getElementById("craftlvl").innerHTML = "--";
    document.getElementById("craftrank").innerHTML = "--";
    document.getElementById("minelvl").innerHTML = "--";
    document.getElementById("minerank").innerHTML = "--";
    document.getElementById("smithlvl").innerHTML = "--";
    document.getElementById("smithrank").innerHTML = "--";
    document.getElementById("attlvl").innerHTML = "--";
    document.getElementById("attrank").innerHTML = "--";
    document.getElementById("fishlvl").innerHTML = "--";
    document.getElementById("fishrank").innerHTML = "--";
    document.getElementById("cooklvl").innerHTML = "--";
    document.getElementById("cookrank").innerHTML = "--";
    document.getElementById("firelvl").innerHTML = "--";
    document.getElementById("firerank").innerHTML = "--";
    document.getElementById("woodlvl").innerHTML = "--";
    document.getElementById("woodrank").innerHTML = "--";
    document.getElementById("aglvl").innerHTML = "--";
    document.getElementById("agrank").innerHTML = "--";
    document.getElementById("herblvl").innerHTML = "--";
    document.getElementById("herbrank").innerHTML = "--";
    document.getElementById("thievlvl").innerHTML = "--";
    document.getElementById("thievrank").innerHTML = "--";
    document.getElementById("fletchlvl").innerHTML = "--";
    document.getElementById("fletchrank").innerHTML = "--";
    document.getElementById("slaylvl").innerHTML = "--";
    document.getElementById("slayrank").innerHTML = "--";
    document.getElementById("farmlvl").innerHTML = "--";
    document.getElementById("farmrank").innerHTML = "--";
    document.getElementById("conlvl").innerHTML = "--";
    document.getElementById("conrank").innerHTML = "--";
    document.getElementById("huntlvl").innerHTML = "--";
    document.getElementById("huntrank").innerHTML = "--";
}
