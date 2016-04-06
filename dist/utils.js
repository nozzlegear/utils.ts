/// <reference path="./typings/browser.d.ts" />
"use strict";
var dateformat = require("dateformat");
var lodash_1 = require("lodash");
function GetDefaultRequestHeaders() {
    var input = document.querySelector("input[name=__RequestVerificationToken]");
    return {
        __RequestVerificationToken: lodash_1.isElement(input) ? input.value : "",
    };
}
exports.GetDefaultRequestHeaders = GetDefaultRequestHeaders;
;
function ShowGrowlError(message, duration) {
    if (duration === void 0) { duration = 10000; }
    if (!toastr.options.closeButton) {
        toastr.options.closeButton = true;
    }
    var growlOptions = {
        closeButton: true,
        extendedTimeOut: duration,
        timeOut: duration,
        hideDuration: 250
    };
    toastr.error(message, "Error", growlOptions);
}
exports.ShowGrowlError = ShowGrowlError;
function ShowGrowlWarning(message, duration) {
    if (duration === void 0) { duration = 10000; }
    var growlOptions = {
        closeButton: true,
        extendedTimeOut: duration,
        timeOut: duration,
        hideDuration: 250
    };
    toastr.warning(message, "Warning", growlOptions);
}
exports.ShowGrowlWarning = ShowGrowlWarning;
function ShowGrowlSuccess(message, duration) {
    if (duration === void 0) { duration = 10000; }
    var growlOptions = {
        closeButton: true,
        extendedTimeOut: duration,
        timeOut: duration,
        hideDuration: 250
    };
    toastr.success(message, "Success", growlOptions);
}
exports.ShowGrowlSuccess = ShowGrowlSuccess;
function IsValidEmail(input) {
    var isValid = (lodash_1.isEmpty(input) === false && lodash_1.includes(input, "@") && lodash_1.includes(input, "."));
    return isValid;
}
exports.IsValidEmail = IsValidEmail;
;
function Truncate(input, toLength) {
    if (input.length > toLength) {
        return input.substring(0, toLength) + "...";
    }
    else {
        return input;
    }
    ;
}
exports.Truncate = Truncate;
;
/**
 * Checks to see if a string ends with the given string.
 */
function StringEndsWith(string, searchString, position) {
    var subjectString = string.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}
exports.StringEndsWith = StringEndsWith;
;
function StringReplaceAll(input, filter, replaceWith, ignore) {
    var output = "";
    if (input) {
        output = input.replace(new RegExp(filter.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (replaceWith) === "string") ? replaceWith.replace(/\$/g, "$$$$") : replaceWith);
    }
    return output;
}
exports.StringReplaceAll = StringReplaceAll;
/**
 * Checks that two strings are equal, ignoring case.
 */
function StringEquals(input1, input2) {
    var matchCase = function (x) {
        if (x) {
            return x.toLowerCase();
        }
        return "";
    };
    var stringCompare = function (string1, string2) {
        return matchCase(string1) === matchCase(string2);
    };
    if (lodash_1.isString(input1)) {
        return stringCompare(input1, input2);
    }
    else if (lodash_1.isArray(input1)) {
        var results = lodash_1.map(input1, function (x) {
            return stringCompare(x, input2);
        });
        return lodash_1.some(results, function (x) { return lodash_1.isBoolean(x) && x === true; });
    }
    ;
}
exports.StringEquals = StringEquals;
;
function CapitalizeString(input) {
    if (input === void 0) { input = ""; }
    input = input || "";
    return input.substring(0, 1).toUpperCase() + input.substring(1);
}
exports.CapitalizeString = CapitalizeString;
/**
 * Humanizes a line item's 'FulfillmentStatus' string.
 */
function HumanizeFulfillmentStatus(status) {
    var output = "";
    switch (status && status.toLowerCase()) {
        default:
        case "none":
            output = "Not fulfilled.";
            break;
        case "partial":
            output = "Partially fulfilled.";
            break;
        case "fulfilled":
            output = "Fulfilled.";
            break;
    }
    return output;
}
exports.HumanizeFulfillmentStatus = HumanizeFulfillmentStatus;
/**
 * Converts a UTC to a localized date and time string.
 */
function GetLocalizedDate(utcDate, withTimeString) {
    var date = new Date(utcDate);
    //Time formatting data at: http://blog.stevenlevithan.com/archives/date-time-format
    if (withTimeString) {
        return dateformat(date, "mmm d, h:MM TT Z");
    }
    return dateformat(date, "mmm d, yyyy");
}
exports.GetLocalizedDate = GetLocalizedDate;
function GenerateGuid() {
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return guid;
}
exports.GenerateGuid = GenerateGuid;
//#region Storage 
var LocalStorage;
(function (LocalStorage) {
    function Save(key, value) {
        localStorage.setItem(key, value);
    }
    LocalStorage.Save = Save;
    ;
    function Retrieve(key) {
        return localStorage.getItem(key);
    }
    LocalStorage.Retrieve = Retrieve;
    ;
    function Delete(key) {
        localStorage.removeItem(key);
    }
    LocalStorage.Delete = Delete;
    ;
})(LocalStorage = exports.LocalStorage || (exports.LocalStorage = {}));
;
var SessionStorage;
(function (SessionStorage) {
    function Save(key, value) {
        sessionStorage.setItem(key, value);
    }
    SessionStorage.Save = Save;
    ;
    function Retrieve(key) {
        return sessionStorage.getItem(key);
    }
    SessionStorage.Retrieve = Retrieve;
    ;
    function Delete(key) {
        sessionStorage.removeItem(key);
    }
    SessionStorage.Delete = Delete;
    ;
})(SessionStorage = exports.SessionStorage || (exports.SessionStorage = {}));
;
//#endregion
function ShowDialog(title, message, buttonText, callback) {
    if (buttonText === void 0) { buttonText = "Okay"; }
    var div = document.createElement("div");
    var p = document.createElement("p");
    p.textContent = message;
    //Add the paragraph to the div element
    div.appendChild(p);
    var dialog = new WinJS.UI.ContentDialog(div, { title: title, primaryCommandText: buttonText });
    //Dispose the dialog after the user closes it.
    dialog.onafterhide = function (event) {
        dialog.dispose();
        if (callback) {
            callback(event);
        }
        ;
    };
    //Add the dialog to the body and show it
    document.body.appendChild(dialog.element);
    dialog.show();
}
exports.ShowDialog = ShowDialog;
/**
 * Shows a loading dialog via WinJS.UI.ContentDialog. Will return a function that must be called to close the dialog.
 * @param title The dialog's title.
 */
function ShowLoadingDialog(title) {
    if (title === void 0) { title = "Loading, please wait."; }
    var div = document.createElement("div");
    var s = document.createElement("span");
    var i = document.createElement("i");
    i.classList.add("fa", "fa-spin", "fa-spinner", "fa-3x", "color");
    //Add the spinner to the div element
    s.appendChild(i);
    div.appendChild(s);
    var dialog = new WinJS.UI.ContentDialog(div, { title: title, primaryCommandDisabled: true });
    var content = dialog.element.querySelector(".win-contentdialog-content");
    //Make the content container flex to center the spinner
    content.style.display = "flex";
    content.style.justifyContent = "center";
    content.style.alignItems = "center";
    //Dispose the dialog after it closes.
    dialog.onafterhide = function (event) {
        dialog.dispose();
    };
    //Add the dialog to the body and show it
    document.body.appendChild(dialog.element);
    dialog.show();
    return function () {
        dialog.hide();
    };
}
exports.ShowLoadingDialog = ShowLoadingDialog;
//# sourceMappingURL=utils.js.map