import { SafeHtml } from "@angular/platform-browser";
import { ToastCloseButtonPositionType, ToastPositionType, ToastType } from "../type/types";

export interface ToastModel {
    content?: string;
    position?: ToastPositionType;
    type?: ToastType;
    time?: number;
    closeButtonPosition?: ToastCloseButtonPositionType;
    closeWithHover?:boolean;
    allowTimeBar?:boolean;
    showCloseButton?:boolean;
}


export interface BaseToastModel {
    content: string,
    time: string,
    type: ToastType,
    closeButton: boolean,
    closeButtonPosition: ToastCloseButtonPositionType,
    allowTimeBar: boolean,
    closeWithHover: boolean,
    index: number,
    position: ToastPositionType
    icon?: SafeHtml
}