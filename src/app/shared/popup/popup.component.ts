import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
    @Input() title: string;
    @Input() deletedItem: string;
    @Output() buttonPressedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    public buttonPressed(confirmation: boolean): void {
        this.buttonPressedEvent.emit(confirmation);
    }
}
