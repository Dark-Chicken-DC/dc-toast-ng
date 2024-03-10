<div align="center">
  <img src="https://raw.githubusercontent.com/Dark-Chicken-DC/dc-toast-ng/main/misc/documentation-assets/dark-chicken-toasts-examples.png" width="600" height="300" alt="Dark Chicken Toast NG">
  <br>
  <h1>Dark Chicken Toast NG</h1>
  <br>
  <a href="https://www.npmjs.com/package/dc-toast-ng">
    NPM
  </a>
  <br>
  <br>
</div>

DEMO: https://dark-chicken-dc.github.io/dc-toast-ng/


## Dependencies

Latest version available for each version of Angular


## Install

```bash
npm i dc-toast-ng
```

## Setup

**step 1:** add assets

- You can add it to your angular.json for icons and fonts

```ts
"assets": [
  {
    "glob": "**/*",
    "input": "./node_modules/dc-toast-ng/assets",
    "output": "/assets/"
  }
],
```

**step 2:** add `DcToastNgModule` to app `NgModule`

- Module based

```typescript

import { DcToastNgModule } from 'dc-toast-ng';

@NgModule({
  imports: [
    DcToastNgModule // DcToastNgModule added
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent],
})
class MainModule {}
```


## Use

```typescript
import { DcToastService } from 'dc-toast-ng';
import { ToastModel } from 'dc-toast-ng/model/models.model';

@Component({...})
export class YourComponent {

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

  constructor(private DcToastService: DcToastService) {}

  showToast() {
    this.DcToastService.create(this.DCToast: ToastModel)
  }
}
```

## Options

Passed to `DcToastService.create()`

| Option            | Type                           | Default                        | Description                                                                             
| -----------------   | ------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| content             | string                         | null                           | Determines the content within the toast message.             |
| position            | string                         | 'top-right'                    | Allows the toast to be created in the specified position.    |
| type                | string                         | 'success'                      | Determines what type of toast will be created.               |
| time                | number                         | 0 ( infinity )                 | Determines how long toast will be active.                    |
| closeButtonPosition | string                         | 'right'                        | The position of the close button inside toast.               |
| closeWithHover      | boolean                        | true                           | It closes when you exit to toast with the mouse.             |
| allowTimeBar        | boolean                        | true                           | The value that allows the time bar to be displayed.          |
| showCloseButton     | boolean                        | true                           | The value of whether there will be a close button or not.    |



### DcToast Service method return:

```typescript
this.DcToastService.onHidden().subscribe((response)=> {
      //...
})
//The response value comes in BaseToastModel Type

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
```

## Functions

##### Create

Create a new dc-toast

```ts
DcToastService.create(toast: ToastModel);
```

##### Delete

Delete all dc-toasts

```ts
DcToastService.delete();
```


## License

MIT

---

> GitHub [@skarahan35](https://github.com/skarahan35) &nbsp;&middot;&nbsp;
> Github [@ergulferik](https://github.com/ergulferik) &nbsp;&middot;&nbsp;
