import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ToastModel } from 'projects/dc-toast-ng/src/model/models.model';
import { DcToastService } from 'projects/dc-toast-ng/src/public-api';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  DCToast:ToastModel = {
    content: 'Dark Chicken Toast NG',
    time: 5,
    position: 'top-right',
    closeWithHover: true,
    closeButtonPosition: 'right',
    type: 'success',
    allowTimeBar: true,
    showCloseButton: true
  };
  constructor(private DcToastService: DcToastService) {
    this.DcToastService.onHidden().subscribe((res)=> {
      console.log(res)
    })
  }

  showToast() {
    this.DcToastService.create(this.DCToast)
  }

  


}
