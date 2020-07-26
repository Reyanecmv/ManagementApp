import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeState, getEmployees } from '../store/employee.reducer';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';
import { FormControl } from '@angular/forms';
import { DeleteEmployee } from '../store/employee.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
    public searchFormControl = new FormControl();
    public filteredEmployees: EmployeeModel[];
    public confirmationPopupShown = false;
    public employeeForDelete: EmployeeModel;

    private unsubscriber$: Subject<void> = new Subject<void>();
    private employees: EmployeeModel[];

    constructor(
        private store: Store<EmployeeState>,
        private router: Router) {
    }

    ngOnInit(): void {
        this.initializeStore();
        this.initializeListeners();
    }

    private initializeStore(): void {
        this.store.pipe(select(getEmployees), takeUntil(this.unsubscriber$)).subscribe(resp => {
            this.employees = resp;
            this.filterEmployees();
        });
    }

    ngOnDestroy(): void {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }

    public filterEmployees(filterTerm?: string): void {
        if (filterTerm) {
            filterTerm = filterTerm.toLowerCase();
            this.filteredEmployees = this.employees.filter(employee =>
                employee.firstName.toLowerCase().includes(filterTerm) ||
                employee.secondName.toLowerCase().includes(filterTerm) ||
                employee.position.toLowerCase().includes(filterTerm)
            );
        } else {
            this.filteredEmployees = this.employees;
        }
    }

    public deleteEmployeePressed(employee: EmployeeModel): void {
        this.confirmationPopupShown = true;
        this.employeeForDelete = employee;
    }

    public deleteEmployee(confirmation: boolean): void {
        if (confirmation) {
            this.store.dispatch(new DeleteEmployee(this.employeeForDelete.id));
        }
        this.confirmationPopupShown = false;
    }

    public editEmployeePressed(employee: EmployeeModel): void {
        if (!employee.blocked) {
            this.router.navigate([`employees/${employee.id}`]);
        }
    }

    private initializeListeners(): void {
        this.searchFormControl.valueChanges.subscribe(filterTerm => this.filterEmployees(filterTerm));
    }

}
