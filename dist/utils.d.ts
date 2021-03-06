/// <reference path="../typings/browser.d.ts" />
export declare function GetDefaultRequestHeaders(): {
    __RequestVerificationToken: string;
};
export declare function ShowGrowlError(message: string, duration?: number): void;
export declare function ShowGrowlWarning(message: string, duration?: number): void;
export declare function ShowGrowlSuccess(message: string, duration?: number): void;
export declare function IsValidEmail(input: string): boolean;
export declare function Truncate(input: string, toLength: number): string;
/**
 * Checks to see if a string ends with the given string.
 */
export declare function StringEndsWith(string: string, searchString: any, position?: number): boolean;
export declare function StringReplaceAll(input: string, filter: string, replaceWith: string, ignore?: string): string;
/**
 * Checks that two strings are equal, ignoring case.
 */
export declare function StringEquals(input1: string | string[], input2: string): boolean;
export declare function CapitalizeString(input?: string): string;
/**
 * Humanizes a line item's 'FulfillmentStatus' string.
 */
export declare function HumanizeFulfillmentStatus(status: string): string;
/**
 * Converts a UTC to a localized date and time string.
 */
export declare function GetLocalizedDate(utcDate: any, withTimeString: boolean): string;
export declare function GenerateGuid(): string;
export declare module LocalStorage {
    function Save(key: string, value: any): void;
    function Retrieve(key: string): any;
    function Delete(key: string): void;
}
export declare module SessionStorage {
    function Save(key: string, value: any): void;
    function Retrieve(key: string): any;
    function Delete(key: string): void;
}
export declare function ShowDialog(title: string, message: string, buttonText?: string, callback?: (event) => void): void;
/**
 * Shows a loading dialog via WinJS.UI.ContentDialog. Will return a function that must be called to close the dialog.
 * @param title The dialog's title.
 */
export declare function ShowLoadingDialog(title?: string): () => void;
