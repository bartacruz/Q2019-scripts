// ==UserScript==
// @name         q19 buttons
// @namespace    http://tampermonkey.net/
// @version      2024-09-09.02
// @description  Buttons for quarantine 2019
// @author       Julio Santa Cruz <bartacruz@gmail.com>
// @match        https://play.quarantine2019.com/game
// @icon         https://play.quarantine2019.com/favicon.ico
// @grant        none
// ==/UserScript==
// require http://code.jquery.com/jquery-latest.js

var $q;
function addIcon(i, name, prepend) {
    var icon;
    if(prepend) {
        icon = i.prepend('<i class="fa-solid fa-'+name+'" style="margin-right:5px"></i>');
    } else {
        icon = i.append('<i class="fa-solid fa-'+name+'" style="margin-left:5px"></i>');
    }
    return icon;
}

function makeButtons(divname){
    var menu = $q("#"+divname+" a").not(".popupitemdisabled");
    var div = $q("<div class='buttons'>").css("padding-top","10px").insertAfter("#"+divname);
    menu.each(function() {
        var i = $q(this).clone();
        i.addClass("button");
        i.css("padding","5px")
            .css("background-color","#869927")
            .css("color","#f0f0f0")
            .css("padding","3px 5px")
            .css("margin-right","5px")
            .css("text-decoration","none")
            .css("border-radius","5px");
        console.log(i.text());
        if(i.text().indexOf("Teeth") >= 0) {
            addIcon(i,"tooth", true);
        }
        if(i.text().indexOf("Claws") >= 0) {
            addIcon(i,"hand-fist",true);
        }
        if(i.text().indexOf("Repair") >= 0) {
            addIcon(i,"screwdriver-wrench",true);
        }
        if(i.text().indexOf("Secure") >= 0) {
            addIcon(i,"lock",true);
        }
        if(i.text().indexOf("Unsecure") >= 0) {
            addIcon(i,"lock-open",true);
        }
        i.find(".smaller").css("color","#000");
        div.append(i);
    });
}

function buildingPanel() {
    var buildingPanel = $q('<div id="building_panel" class="qpanel">');
    $q('#play_content').append(buildingPanel);
    var buildingName = $q('#building_menulink span').text();
    buildingPanel.append("<h4>").text(buildingName);
}
var icons={
    "Punch":"hand-fist",
    "Kick": "socks",
    "Sledgehammer": "gavel",
    "Hammer": "hammer",
    "Handgun": "gun",


};

function playerIcon(item,key) {
    var li = item.clone();
    var title = li.text();
    li.text("");
    var icon = addIcon(li,icons[key]);
    icon.attr("title",title);
    console.debug("icon",icon);
    return li;
}

(function() {
    $q = window.jQuery;
    var fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.type="text/css";
    fa.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
    document.getElementsByTagName("head")[0].appendChild(fa);
    
    makeButtons("building_menu");
    makeButtons("doors_menu");
    makeButtons("fusebox_menu");
 
    var rx = /player_(.*)_menu/;
    var rtitle = /(.*)\s+\(.*\)/;
    $q("ul[id*='player_']").each( (index,plm) => {
        console.debug(plm.id,plm);

        var playerMenus = $q(plm);
        var pid = rx.exec(plm.id)[1];
        var plink = $q("#player_"+pid+"_menulink");

        
        var keys = Object.keys(icons);
  
        playerMenus.each( (index,pm) => {
            var playerMenu=$q(pm);
            console.debug("playerMenu",index,pm, playerMenu);
            var items = playerMenu.find("a").not(".popupitemdisabled");
            items.each((index,i) => {
                var item = $q(i);
                var title = rtitle.exec(item.text());

                if (title && title.length > 1 && keys.indexOf(title[1]) >=0) {
                    console.debug("item",keys.indexOf(title[1]) >=0, title,item);
                    plink.append(playerIcon(item,title[1]));
                }
            });
        });
    });

})();