import { NgModule } from '@angular/core';
import { DcToastComponent } from './dc-toast/dc-toast.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    DcToastComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    DcToastComponent
  ]
})
export class DcToastNgModule { }
