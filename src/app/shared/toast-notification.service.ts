import { Injectable } from '@angular/core';
import { ToastNotificationType } from './toast-notification/toast-notification-type.enum';
import { Observable, Subject } from 'rxjs';
import { ToastNotificationModel } from './toast-notification/toast-notification.model';

@Injectable({
    providedIn: 'root'
})
export class ToastNotificationService {
    private toastSubject = new Subject<ToastNotificationModel>();

    constructor() {
    }

    public sendToast(message: string, toastType: ToastNotificationType): void {
        const toast = new ToastNotificationModel(message, toastType);
        this.toastSubject.next(toast);
    }

    public getToasts(): Observable<ToastNotificationModel> {
        return this.toastSubject.asObservable();
    }
}
