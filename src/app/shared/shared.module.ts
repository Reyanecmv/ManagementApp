import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';


@NgModule({
    declarations: [PopupComponent, ToastNotificationComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        PopupComponent,
        ToastNotificationComponent
    ]
})
export class SharedModule {
}
