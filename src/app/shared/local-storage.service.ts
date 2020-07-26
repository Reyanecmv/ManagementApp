import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    public setLocalStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getLocalStorage(key: string): string {
        return localStorage.getItem(key);
    }
}
