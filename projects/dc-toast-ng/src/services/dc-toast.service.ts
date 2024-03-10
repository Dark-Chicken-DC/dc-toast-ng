import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewRef } from '@angular/core';
import { DcToastComponent } from '../lib/dc-toast/dc-toast.component';
import { BaseToastModel, ToastModel } from '../model/models.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DcToastService {

  constructor(private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector) {}


  private componentRef!: ComponentRef<DcToastComponent> | null;
  private domElement!: HTMLElement
  private onHiddenSubject: Subject<BaseToastModel> = new Subject<BaseToastModel>();
  private toastCreator() {
    const factory = this.resolver.resolveComponentFactory(DcToastComponent)
    this.componentRef = factory.create(this.injector)

    this.applicationRef.attachView(this.componentRef.hostView);
    this.domElement = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement
    
    document.body.appendChild(this.domElement)
    const onHiddenObservable = new Observable<BaseToastModel>((observer) => {
      this.componentRef?.instance.onHidden().subscribe((res) => {
        observer.next(res);
      });
    });

    onHiddenObservable.subscribe((res) => {
      this.onHiddenSubject.next(res);
    });
  }
  create(toast: ToastModel) {
    if (!this.componentRef) {
      this.toastCreator()
    }
    this.componentRef?.instance.generateToast(toast)
    
  }

  onHidden(): Observable<BaseToastModel> {
    return this.onHiddenSubject.asObservable();
  }

  delete() {
    if (this.componentRef) {
      document.body.removeChild(this.domElement)
      this.applicationRef.detachView(this.componentRef.hostView);
      this.componentRef?.destroy();
      
      this.componentRef = null
    }
  }
}
