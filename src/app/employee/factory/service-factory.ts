import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from "../../shared/local-storage.service";
import { IFactory, IServiceType, ServiceEnum } from "../models/factory.model";
import { EmployeeServiceA } from "../service/employee-service-a";
import { EmployeeServiceB } from "../service/employee-service-b";
import { Store } from '@ngrx/store';
import { EmployeeState } from "../store/employee.reducer";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceFactory implements IFactory {
    constructor(private http: HttpClient, private localStorage: LocalStorageService, private store: Store<EmployeeState>) {}

    public createService(serviceType: ServiceEnum) : IServiceType {
        switch (serviceType) {
            case ServiceEnum.A: return new EmployeeServiceA(this.http, this.localStorage, this.store); break;  
            case ServiceEnum.B: return new EmployeeServiceB(this.http, this.localStorage, this.store); break;
            default: throw "Unable to locate this employee!" 
        }
    }
}