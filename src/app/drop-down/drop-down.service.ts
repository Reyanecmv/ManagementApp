import { Injectable } from '@angular/core';
import { ServiceEnum } from '../employee/models/factory.model';
import { ServiceFactory } from '../employee/factory/service-factory'

/**
 * De fiecare data cand vreai sa creezi un nou service care sa mapeze pe un nou path
 * trebuie adaugat doar aici si implementat serice ul
 */
@Injectable({
    providedIn: 'root'
})
export class DropdownService {
    private dropdownValue = null;

    constructor(private serviceFactory : ServiceFactory) {};

    public getValue() : string {
        return this.dropdownValue;
    }

    public setValue(value : string) : void {
        this.dropdownValue = value;
    }
    public apply(dbName : string) : void {
        switch (dbName.toUpperCase()) {
          case ServiceEnum[ServiceEnum.A]: this.serviceFactory.createService(ServiceEnum.A).apply(); break;  
          case ServiceEnum[ServiceEnum.B]: this.serviceFactory.createService(ServiceEnum.B).apply(); break;
          default: throw "Unable to locate this employee!" 
        }
    }
}