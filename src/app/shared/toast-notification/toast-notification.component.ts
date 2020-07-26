import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastNotificationType } from './toast-notification-type.enum';
import { ToastNotificationModel } from './toast-notification.model';
import { ToastNotificationService } from '../toast-notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-toast-notification',
    templateUrl: './toast-notification.component.html',
    styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit, OnDestroy {
    public isToastVisible = false;
    public toastTypes = ToastNotificationType;
    public toastModel: ToastNotificationModel;

    private unsubscriber$: Subject<void> = new Subject<void>();

    constructor(private toastNotificationService: ToastNotificationService) {
    }

    ngOnInit(): void {
        this.toastNotificationService
            .getToasts()
            .pipe(takeUntil(this.unsubscriber$))
            .subscribe(resp => {
                this.showToast(resp);
            });
    }

    private showToast(toastModel: ToastNotificationModel): void {
        this.toastModel = toastModel;

        this.isToastVisible = true;
        setTimeout(() => {
            this.isToastVisible = false;
        }, 5000);
    }

    ngOnDestroy(): void {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }

}
