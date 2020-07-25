import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeState, getEmployeesLoaded } from '../employee.reducer';
import { Store } from '@ngrx/store';
import { EmployeeService } from '../../employee.service';
import { ToastNotificationService } from '../../../shared/toast-notification.service';
import { ErrorLoggingService } from '../../../shared/error-logging.service';
import { EmployeeActionTypes, LoadEmployees, LoadEmployeesFailed, LoadEmployeesSuccess } from '../employee.actions';
import { catchError, exhaustMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EmployeeEffects {

    constructor(
        private actions$: Actions,
        private store: Store<EmployeeState>,
        private employeeService: EmployeeService,
        private toastNotificationService: ToastNotificationService,
        private errorLoggingService: ErrorLoggingService
    ) {
    }

    loadEmployees = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadEmployees>(EmployeeActionTypes.LoadEmployees),
            withLatestFrom(this.store.select(getEmployeesLoaded)),
            filter(([action, employeesLoaded]) => !employeesLoaded),
            exhaustMap(([action, employeesLoaded]) =>
                this.employeeService.getEmployees().pipe(
                    map(
                        employees => new LoadEmployeesSuccess(employees)
                    ),
                    catchError(error => {
                        this.errorLoggingService.logError(error);
                        return of(new LoadEmployeesFailed(error));
                    })
                )
            )
        )
    );
}
