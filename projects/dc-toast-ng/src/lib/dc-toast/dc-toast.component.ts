import { Component, EventEmitter, Input, Output, NgZone } from '@angular/core';
import { ToastPositionType, ToastCloseButtonPositionType, ToastType } from '../../type/types';
import { DcToastService } from '../../services/dc-toast.service';
import { IconService } from '../../services/icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { fadeIn, fadeOut } from '../animations/animations';
import { BaseToastModel, ToastModel } from '../../model/models.model';
import { Observable } from 'rxjs';



@Component({
    selector: 'dc-toast-ng',
    templateUrl: 'dc-toast.component.html',
    styleUrls: ['./dc-toast.component.css'],
    animations: [fadeIn, fadeOut]
})
export class DcToastComponent {

    toasts: { [key in ToastPositionType]: BaseToastModel[] } = {
        'top-center': [],
        'top-right': [],
        'right-center': [],
        'bottom-right': [],
        'bottom-center': [],
        'bottom-left': [],
        'left-center': [],
        'top-left': []
    };
    toastTimeouts: { [key in ToastPositionType]: ReturnType<typeof setTimeout>[] } = {
        'top-center': [],
        'top-right': [],
        'right-center': [],
        'bottom-right': [],
        'bottom-center': [],
        'bottom-left': [],
        'left-center': [],
        'top-left': []
    };

    closeButtonSvg!: SafeHtml
    private onHiddenSubject: EventEmitter<BaseToastModel> = new EventEmitter<BaseToastModel>();
    private counter: number = 0

    constructor(private ngZone: NgZone, private service: DcToastService, private iconService: IconService, private sanitizer: DomSanitizer) {
        this.iconService.getIconSVG('close').subscribe(res => {
            this.closeButtonSvg = this.getTrustedSvgContent(res)
        })
    }

    getToastPositions(): ToastPositionType[] {
        let toastPositions: ToastPositionType[] = []
        for (const key in this.toasts) {
            if (this.toasts[key as ToastPositionType].length > 0) {
                toastPositions.push(key as ToastPositionType)
            }
        }
        return toastPositions
    }

    async generateToast(toastModel: ToastModel) {
        let toast: BaseToastModel = this.fillParameters(toastModel);
        this.counter += 1
        this.setToastTypeIcon(toast)
        this.toasts[toast.position].push(toast);
        if (toastModel.time) {
            this.ngZone.runOutsideAngular(() => {
                this.toastTimeouts[toast.position][toast.index] = setTimeout(() => {
                    this.ngZone.run(() => {
                        this.removeToast(toast.position, toast);
                    });
                }, toastModel.time ? toastModel.time * 1000 : 0);
            });
        }
    }

    async removeToast(position: ToastPositionType, toast: BaseToastModel) {
        const index = this.toasts[position].indexOf(toast);
        this.toasts[position].splice(index, 1);
        this.hide(toast)
        if (this.isClear()) {
            setTimeout(() => {
                if (this.isClear()) {
                    this.service.delete()
                }
            }, 500)
        }

    }

    private isClear(): boolean {
        let flag = true
        for (const key in this.toasts) {
            if (this.toasts[key as ToastPositionType].length > 0) {
                flag = false
            }
        }
        return flag
    }
    onHidden(): Observable<BaseToastModel> {
        return this.onHiddenSubject.asObservable();
      }
    
      hide(toast:BaseToastModel) {
        this.onHiddenSubject.next(toast);
      }


    private fillParameters(toastModel: ToastModel): BaseToastModel {
        return {
            'content': toastModel.content != undefined ? toastModel.content : "",
            'time': toastModel.time != undefined ? toastModel.time + 's' : '0s',
            'type': toastModel.type != undefined ? toastModel.type : 'success',
            'closeButton': toastModel.showCloseButton != undefined ? toastModel.showCloseButton : true,
            'closeButtonPosition': toastModel.closeButtonPosition != undefined ? toastModel.closeButtonPosition : 'right',
            'allowTimeBar': toastModel.allowTimeBar != undefined ? toastModel.allowTimeBar : true,
            'closeWithHover': toastModel.closeWithHover != undefined ? toastModel.closeWithHover : true,
            'index': this.counter,
            'position': toastModel.position != undefined ? toastModel.position : 'top-right'
        };
    }

    onMouseEnter(position: ToastPositionType, toast: BaseToastModel) {
        if (toast.closeWithHover == true) {
            toast.allowTimeBar = false;

            if (this.toastTimeouts[position][toast.index]) {
                clearTimeout(this.toastTimeouts[position][toast.index]);
            }
        }
    }

    onMouseLeave(position: ToastPositionType, toast: BaseToastModel) {
        if (toast.closeWithHover == true) {
            this.removeToast(position, toast)
        }

    }

    private setToastTypeIcon(toast: BaseToastModel) {
        this.iconService.getIconSVG(toast.type).subscribe((res: string) => {
            toast.icon = this.getTrustedSvgContent(res)
        })
    }

    private getTrustedSvgContent(content: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}
