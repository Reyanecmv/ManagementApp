import { ToastNotificationType } from './toast-notification-type.enum';

export class ToastNotificationModel {
    public message: string;
    public type: ToastNotificationType;

    constructor(message: string, type: ToastNotificationType) {
        this.message = message;
        this.type = type;
    }
}
