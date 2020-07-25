import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorLoggingService {

    constructor() {
    }

    public logError(error: string): void {
        // Access an error logging service
        console.error(error);
    }
}
