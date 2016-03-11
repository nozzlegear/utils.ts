/// <reference path="./typings/browser.d.ts" />

import * as react from "react";
import * as dom from "react-dom";
import * as dateformat from "dateformat";
import {
    map,
    has,
    some,
    isEmpty,
    memoize, 
    isArray,
    includes,
    isString,
    isElement,
    isBoolean,
} from "lodash";

export function GetDefaultRequestHeaders()
{
    var input = <HTMLInputElement>document.querySelector("input[name=__RequestVerificationToken]");

    return {
        __RequestVerificationToken: isElement(input) ? input.value : "",
    };
};

export function ShowGrowlError(message: string, duration: number = 10000)
{
    if (!toastr.options.closeButton)
    {
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

export function ShowGrowlWarning(message: string, duration: number = 10000)
{
    var growlOptions = {
        closeButton: true,
        extendedTimeOut: duration,
        timeOut: duration,
        hideDuration: 250
    };

    toastr.warning(message, "Warning", growlOptions);
}

export function ShowGrowlSuccess(message: string, duration: number = 10000)
{
    var growlOptions = {
        closeButton: true,
        extendedTimeOut: duration,
        timeOut: duration,
        hideDuration: 250
    };

    toastr.success(message, "Success", growlOptions);
}

export function IsValidEmail(input: string)
{
    var isValid = (isEmpty(input) === false && includes(input, "@") && includes(input, "."));

    return isValid;
};

export function Truncate(input: string, toLength: number)
{
    if (input.length > toLength)
    {
        return input.substring(0, toLength) + "...";
    }
    else
    {
        return input;
    };
};

/**
 * Checks to see if a string ends with the given string.
 */
export function StringEndsWith(string: string, searchString, position?: number)
{
    var subjectString = string.toString();

    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length)
    {
        position = subjectString.length;
    }

    position -= searchString.length;

    var lastIndex = subjectString.indexOf(searchString, position);

    return lastIndex !== -1 && lastIndex === position;
};

export function StringReplaceAll(input: string, filter: string, replaceWith: string, ignore?: string)
{
    var output = "";

    if (input)
    {
        output = input.replace(new RegExp(filter.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (replaceWith) === "string") ? replaceWith.replace(/\$/g, "$$$$") : replaceWith);
    }

    return output;
}

/**
 * Checks that two strings are equal, ignoring case.
 */
export function StringEquals(input1: string | string[], input2: string)
{
    var matchCase = (x: string) =>
    {
        if (x)
        {
            return x.toLowerCase();
        }

        return "";            
    }

    var stringCompare = (string1: string, string2: string) =>
    {
        return matchCase(string1) === matchCase(string2);
    }

    if (isString(input1))
    {
        return stringCompare(<string>input1, input2);
    }
    else if (isArray(input1))
    {
        var results: boolean[] = map(<string[]>input1, x =>
        {
            return stringCompare(x, input2);
        });

        return some(results, x => isBoolean(x) && x === true);
    };
};

export function CapitalizeString(input: string = "")
{
    input = input || "";
    
    return input.substring(0, 1).toUpperCase() + input.substring(1);
}

/**
 * Humanizes a line item's 'FulfillmentStatus' string.
 */
export function HumanizeFulfillmentStatus(status: string)
{
    let output = "";
    
    switch(status && status.toLowerCase())
    {
        default:
        case "none":
            output = "Not fulfilled.";
            break;
            
        case "partial": 
            output = "Partially fulfilled.";
            break;
            
        case "fulfilled":
            output = "Fulfilled."
            break;
    }
    
    return output;
}

/**
 * Converts a UTC to a localized date and time string.
 */
export function GetLocalizedDate(utcDate, withTimeString: boolean) 
{
    const date = new Date(utcDate);

    //Time formatting data at: http://blog.stevenlevithan.com/archives/date-time-format
    
    if (withTimeString) 
    {
        return dateformat(date, "mmm d, h:MM TT Z");
    }
    
    return dateformat(date, "mmm d, yyyy");
}

export function GenerateGuid()
{
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
    {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    return guid;
}

//#region Storage 

export module LocalStorage 
{
    export function Save(key: string, value: any)
    {
        localStorage.setItem(key, value);
    };

    export function Retrieve(key: string)
    {
        return localStorage.getItem(key);
    };

    export function Delete(key: string)
    {
        localStorage.removeItem(key);
    };
};

export module SessionStorage
{
    export function Save(key: string, value: any)
    {
        sessionStorage.setItem(key, value);
    };

    export function Retrieve(key: string)
    {
        return sessionStorage.getItem(key);
    };

    export function Delete(key: string)
    {
        sessionStorage.removeItem(key);
    };
};

//#endregion

export function ShowDialog(title: string, message: string, buttonText: string = "Okay", callback?: (event) => void)
{
    var div = document.createElement("div");
    var p = document.createElement("p");
    p.textContent = message;

    //Add the paragraph to the div element
    div.appendChild(p);

    var dialog = new WinJS.UI.ContentDialog(div, { title: title, primaryCommandText: buttonText });

    //Dispose the dialog after the user closes it.
    dialog.onafterhide = (event) =>
    {
        dialog.dispose();

        if (callback)
        {
            callback(event);
        };
    };

    //Add the dialog to the body and show it
    document.body.appendChild(dialog.element);
    dialog.show();
}

/**
 * Shows a loading dialog via WinJS.UI.ContentDialog. Will return a function that must be called to close the dialog.
 * @param title The dialog's title.
 */
export function ShowLoadingDialog(title: string = "Loading, please wait.")
{
    var div = document.createElement("div");
    var s = document.createElement("span");
    var i = document.createElement("i");
    i.classList.add("fa", "fa-spin", "fa-spinner", "fa-3x", "color");

    //Add the spinner to the div element
    s.appendChild(i);
    div.appendChild(s);

    var dialog = new WinJS.UI.ContentDialog(div, { title: title, primaryCommandDisabled: true });
    var content = <HTMLElement>dialog.element.querySelector(".win-contentdialog-content");

    //Make the content container flex to center the spinner
    content.style.display = "flex";
    content.style.justifyContent = "center";
    content.style.alignItems = "center";

    //Dispose the dialog after it closes.
    dialog.onafterhide = (event) =>
    {
        dialog.dispose();
    };

    //Add the dialog to the body and show it
    document.body.appendChild(dialog.element);
    dialog.show();

    return () =>
    {
        dialog.hide();
    };
}

/**
 * Creates and returns an empty React DOM container for a given type of element. 
 * Unfortunately necessary because some WinJS components must be a child of the body.
 */
export function GetReactDomContainer(selector: string)
{
    if(! document.querySelector("#react-container > #" + selector))
    {
        let container = document.createElement("div");
        container.id = selector;
        
        document.querySelector("#react-container").appendChild(container);
    }
    
    return document.querySelector("#react-container > #" + selector);
}

/**
 * Renders the given React component into a DOM container based on its name. Useful
 * when the component must be a direct child of the body.
 */
export function RenderReactComponent<T>(component: react.ReactElement<T> )
{
    const name = component.type["name"] || component.type["displayName"];    
    const rendered = dom.render(component, GetReactDomContainer(name));
    
    return rendered;
}

/**
 * Renders the given ReactWinJS control into a DOM container based on its name. Returns both the
 * React component and WinControl.
 */
export function RenderReactWinJSControl<ReactType, WinJSType>(component: JSX.Element)
{
    let name = component.type["name"] || component.type["displayName"];
    let rendered = dom.render(component, GetReactDomContainer(name));
    
    if(! has(rendered, "winControl") && ! has(rendered, "refs.control.winControl"))
    {
        console.warn(`WARNING: The React Component '${name}' passed to Utils.RenderReactWinJSControl must be a WinJS control, or must have a direct ref named 'control' that is a WinJS control.`)
    }
    
    let control = (rendered.refs["control"] && rendered.refs["control"]["winControl"] || rendered["winControl"]) as WinJSType;
    
    return {
        Component: rendered as any as ReactType,
        WinControl: control
    };
}