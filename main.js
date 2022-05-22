// ==UserScript==
// @name         Jobber - Timeclock Week Total
// @namespace    https://secure.getjobber.com/
// @version      1.9
// @description  When in the week overview in the time sheet menu, this script will total your hours and insert an element that displays them on the right.
// @author       Noah MacMurchy
// @match        https://secure.getjobber.com/time_sheet/*/*/*/week
// @require      http://code.jquery.com/jquery-latest.js
// @copyright    2022+ © Noah MacMurchy
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;
    var totalHours = 0;

    $(".u-textSmall.u-paddingTopSmallest.u-paddingBottomSmallest.js-weeklyTimeSheetTotalTimeNumber").each(function(e) {
        var text = $(this).text();
        console.log(text);
        if (text !== "0:00") {
            var [hours, minutes] = text.split(":");
            hours = parseInt(hours);
            minutes = parseInt(minutes);
            totalHours += hours + minutes / 60;
        }
    });

    $(".card-headerTitle").each(function() {
        $(this).text($(this).text() + " | Remaining: " + convertToTime(40 - totalHours));
    });


    function convertToTime(number) {
        var sign = (number >= 0) ? 1 : -1;

        number *= sign;

        var hour = Math.floor(number);
        var decpart = number - hour;

        var min = 1 / 60;
        // Round to nearest minute
        decpart = min * Math.round(decpart / min);

        var minute = Math.floor(decpart * 60) + '';

        // Add padding if need
        if (minute.length < 2) {
            minute = '0' + minute;
        }

        // Add Sign in final result
        sign = (sign == 1) ? '' : '-';

        // Concate hours and minutes
        return sign + hour + ':' + minute;
    }

})();

