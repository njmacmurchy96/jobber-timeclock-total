// ==UserScript==
// @name         Jobber - Timeclock Week Total
// @namespace    https://secure.getjobber.com/
// @version      0.3
// @description  When in the week overview in the time sheet menu, this script will total your hours and insert an element that displays them on the right.
// @author       Noah MacMurchy
// @match        https://secure.getjobber.com/time_sheet/*/*/*/week
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @copyright    2021+, Noah MacMurchy
// ==/UserScript==
var $ = window.jQuery;

$(document).ready(function() {
    var totalHours = 0.0;
    $('.duration.placeholderField-input').each(function(i) {
        if (this.value !== "" || this.value !== " " || this.value !== "0:00")
            return;
        var [hours, minutes] = this.value.split(":");
        hours = parseInt(hours);
        minutes = parseInt(minutes);
        totalHours += hours + minutes / 60;
    });
    $(".headingFive.u-marginNone.u-colorGreyBlueDark")[0].innerText = "Total: " + convertToTime(totalHours);
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
