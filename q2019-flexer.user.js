// ==UserScript==
// @name         Q2019 Flexer
// @namespace    http://tampermonkey.net/
// @version      2024-09-09.01
// @description  Flexbox structure for Quarantine 2019
// @author       Julio Santa Cruz <bartacruz@gmail.com>
// @match        https://play.quarantine2019.com/game
// @icon         https://play.quarantine2019.com/favicon.ico
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    /* global $ */
    var fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.type="text/css";
    fa.href = "https://q2019.bartatech.net/Q2019-scripts/res/q2019-flexer.css";
    document.getElementsByTagName("head")[0].appendChild(fa);

    var main1 = $("#main1");
    var main2 = $("#main2");
    var left = $("#left");
    var middle = $("#middle");
    
    var char_table=$('<table class="boxborder" cellspacing="1" cellpadding="4" border="0">');
    $("#left>.column-in").append(char_table);

    var trs = $("#left>.column-in>table>tbody>tr");
    trs[4].remove();
    var data = $(trs[3]).detach();
    char_table.prepend(data);
    var title = $(trs[2]).detach();
    char_table.prepend(title);
    

})();