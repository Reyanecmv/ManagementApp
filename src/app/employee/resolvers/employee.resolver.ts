import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EmployeeState, getEmployees } from '../store/employee.reducer';
import { select, Store } from '@ngrx/store';
import { EmployeeModel } from '../models/employee.model';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LoadEmployees } from '../store/employee.actions';

@Injectable()
export class EmployeeResolver implements Resolve<EmployeeModel[]> {

    constructor(
        private router: Router,
        private store: Store<EmployeeState>
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeModel[]> | Promise<EmployeeModel[]> | EmployeeModel[] {
        this.store.dispatch(new LoadEmployees());
        return this.store.pipe(
            select(getEmployees),
            filter(employees => employees != null),
            take(1)
        );
    }
}
