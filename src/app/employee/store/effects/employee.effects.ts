import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeState, getEmployeesLoaded } from '../employee.reducer';
import { Store } from '@ngrx/store';
import { EmployeeService } from '../../employee.service';
import { ToastNotificationService } from '../../../shared/toast-notification.service';
import { ErrorLoggingService } from '../../../shared/error-logging.service';
import {
    DeleteEmployee,
    DeleteEmployeeFailed,
    EmployeeActionTypes,
    LoadEmployees,
    LoadEmployeesFailed,
    LoadEmployeesSuccess,
    DeleteEmployeeSuccess
} from '../employee.actions';
import { catchError, exhaustMap, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastNotificationType } from '../../../shared/toast-notification/toast-notification-type.enum';

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

    deleteEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeActionTypes.DeleteEmployee),
            map((action: DeleteEmployee) => action.payload),
            mergeMap((employeeId: number) =>
                this.employeeService.deleteEmployee(employeeId).pipe(
                    map(() => {
                        this.toastNotificationService.sendToast('Employee deleted successfully', ToastNotificationType.Success);
                        return new DeleteEmployeeSuccess(employeeId);
                    }),
                    catchError(err => {
                        this.errorLoggingService.logError(err);
                        this.toastNotificationService.sendToast('An error occured. Please refresh the page or contact support.', ToastNotificationType.Error);
                        return of(new DeleteEmployeeFailed(err));
                    })
                )
            )
        )
    );
}
