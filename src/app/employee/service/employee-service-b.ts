import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServiceType } from '../models/factory.model';
import { EmployeeService } from '../service/employee.service';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Store } from '@ngrx/store';
import { EmployeeState } from '../store/employee.reducer'
import { LoadEmployeesSuccess } from '../store/employee.actions';

/**
 * Teoretic un service nou o sa fie fix ca si employee service dar acum n-am vrut sa mai fac dto uri
 * si sa creez un service in functie de dto, modelarea datelor, etc.. :D
 * D-asta iti spuneam ca am in principiu doar service ul tau dar da, lene
 */
@Injectable({
    providedIn: 'root'
})
export class EmployeeServiceB extends EmployeeService implements IServiceType {
    constructor(http: HttpClient, localStorage: LocalStorageService, private store: Store<EmployeeState>) {
        super(http, localStorage);
    }

    public apply(): void {
        super.getEmployees("B").subscribe(
            data  => this.store.dispatch(new LoadEmployeesSuccess(data))
        );
    }

    public getContent(): void {
        throw "TODO: dynamic database";
    }

}
