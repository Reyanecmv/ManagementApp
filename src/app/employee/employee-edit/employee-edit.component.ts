import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeState, getEmployeeById } from '../store/employee.reducer';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateEmployee } from '../store/employee.actions';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public employee: EmployeeModel;

    private unsubscriber$: Subject<void> = new Subject<void>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<EmployeeState>,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
        this.initializeData();
    }

    public cancelPressed(): void {
        this.router.navigate(['employees']);
    }

    public confirmPressed(): void {
        if (this.form.invalid) {
            this.form.markAsTouched();
        } else {
            this.employee.position = this.form.value.position;
            this.store.dispatch(new UpdateEmployee(this.employee));
            this.router.navigate(['employees']);
        }
    }

    private initializeData(): void {
        this.activatedRoute.params.subscribe(param => {
            this.store.pipe(select(getEmployeeById(param.id)), takeUntil(this.unsubscriber$)).subscribe(resp => {
                this.employee = resp;
                this.form.patchValue({
                    position: this.employee.position
                });
            });
        });
    }

    ngOnDestroy(): void {
        this.unsubscriber$.next();
        this.unsubscriber$.complete();
    }

    private initializeForm(): void {
        this.form = this.formBuilder.group({
            position: [null, Validators.required]
        });
    }
}
