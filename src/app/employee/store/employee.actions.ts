import { Action } from '@ngrx/store';
import { EmployeeModel } from '../models/employee.model';

export enum EmployeeActionTypes {
    LoadEmployees = '[Employees] Load Employees',
    LoadEmployeesSuccess = '[Employees] Load Employees Success',
    LoadEmployeesFailed = '[Employees] Load Employees Failed',
    CreateEmployee = '[Employees] Create Employees',
    CreateEmployeeSuccess = '[Employees] Create Employees Success',
    CreateEmployeeFailed = '[Employees] Create Employees Failed',
    UpdateEmployee = '[Employees] Update Employees',
    UpdateEmployeeSuccess = '[Employees] Update Employees Success',
    UpdateEmployeeFailed = '[Employees] Update Employees Failed',
    DeleteEmployee = '[Employees] Delete Employees',
    DeleteEmployeeSuccess = '[Employees] Delete Employees Success',
    DeleteEmployeeFailed = '[Employees] Delete Employees Failed'
}

// LOAD ACTIONS
export class LoadEmployees implements Action {
    readonly type = EmployeeActionTypes.LoadEmployees;

    constructor() {
    }
}

export class LoadEmployeesSuccess implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeesSuccess;

    constructor(public payload: EmployeeModel[]) {
    }
}

export class LoadEmployeesFailed implements Action {
    readonly type = EmployeeActionTypes.LoadEmployeesFailed;

    constructor(public payload: string) {
    }
}

// CREATE ACTIONS

export class CreateEmployee implements Action {
    readonly type = EmployeeActionTypes.CreateEmployee;

    constructor(public payload: EmployeeModel) {
    }
}

export class CreateEmployeeSuccess implements Action {
    readonly type = EmployeeActionTypes.CreateEmployeeSuccess;

    constructor(public payload: EmployeeModel) {
    }
}

export class CreateEmployeeFailed implements Action {
    readonly type = EmployeeActionTypes.CreateEmployeeFailed;

    constructor(public payload: string) {
    }
}

// UPDATE ACTIONS

export class UpdateEmployee implements Action {
    readonly type = EmployeeActionTypes.UpdateEmployee;

    constructor(public payload: EmployeeModel) {
    }
}

export class UpdateEmployeeSuccess implements Action {
    readonly type = EmployeeActionTypes.UpdateEmployeeSuccess;

    constructor(public payload: EmployeeModel) {
    }
}

export class UpdateEmployeeFailed implements Action {
    readonly type = EmployeeActionTypes.UpdateEmployeeFailed;

    constructor(public payload: string) {
    }
}

// DELETE ACTIONS

export class DeleteEmployee implements Action {
    readonly type = EmployeeActionTypes.DeleteEmployee;

    constructor(public payload: EmployeeModel) {
    }
}

export class DeleteEmployeeSuccess implements Action {
    readonly type = EmployeeActionTypes.DeleteEmployeeSuccess;

    constructor(public payload: EmployeeModel) {
    }
}

export class DeleteEmployeeFailed implements Action {
    readonly type = EmployeeActionTypes.DeleteEmployeeFailed;

    constructor(public payload: string) {
    }
}

export type EmployeeActions =
    LoadEmployees |
    LoadEmployeesSuccess |
    LoadEmployeesFailed |
    CreateEmployee |
    CreateEmployeeSuccess |
    CreateEmployeeFailed |
    UpdateEmployee |
    UpdateEmployeeSuccess |
    UpdateEmployeeFailed |
    DeleteEmployee |
    DeleteEmployeeSuccess |
    DeleteEmployeeFailed;
