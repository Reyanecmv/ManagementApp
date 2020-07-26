import { createFeatureSelector, createSelector, } from '@ngrx/store';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeActions, EmployeeActionTypes } from './employee.actions';
import { EmployeeErrors } from './models/employee-errors.model';
import * as _ from 'lodash';

export interface EmployeeState {
    employees: EmployeeModel[];
    employeeErrors: EmployeeErrors;
}

export const initialEmployeeState: EmployeeState = {
    employees: null,
    employeeErrors: new EmployeeErrors()
};

const getEmployeeState = createFeatureSelector<EmployeeState>('employee');

export const getEmployees = createSelector(getEmployeeState, state => _.cloneDeep(state.employees));
export const getEmployeeById = (id: string) => createSelector(getEmployeeState, state => _.cloneDeep(state.employees.find(employee => employee.id === id)));
export const getEmployeesLoaded = createSelector(getEmployeeState, state => !!state.employees);
export const getEmployeeLoadError = createSelector(getEmployeeState, state => state.employeeErrors.employeeLoadError);
export const getEmployeeCreateError = createSelector(getEmployeeState, state => state.employeeErrors.employeeCreateError);
export const getEmployeeUpdateError = createSelector(getEmployeeState, state => state.employeeErrors.employeeUpdateError);
export const getEmployeeDeleteError = createSelector(getEmployeeState, state => state.employeeErrors.employeeDeleteError);

export function employeeReducer(state = initialEmployeeState, action: EmployeeActions): EmployeeState {
    switch (action.type) {
        case EmployeeActionTypes.LoadEmployeesSuccess: {
            return {
                ...state,
                employees: action.payload
            };
        }
        case EmployeeActionTypes.CreateEmployeeSuccess: {
            const employeeArray = _.cloneDeep(state.employees);
            return {
                ...state,
                employees: employeeArray
            };
        }
        case EmployeeActionTypes.CreateEmployeeFailed: {
            return {
                ...state,
                employeeErrors: {
                    ...state.employeeErrors,
                    employeeCreateError: action.payload
                }
            };
        }
        case EmployeeActionTypes.UpdateEmployeeSuccess: {
            const updatedEmployeeArray = state.employees.map(employee => (action.payload.id) === employee.id ? action.payload : employee);
            return {
                ...state,
                employees: updatedEmployeeArray
            };
        }
        case EmployeeActionTypes.UpdateEmployeeFailed: {
            return {
                ...state,
                employeeErrors: {
                    ...state.employeeErrors,
                    employeeUpdateError: action.payload
                }
            };
        }
        case EmployeeActionTypes.DeleteEmployeeSuccess: {
            const updatedEmployeeArray = _.cloneDeep(state.employees).filter(employee => employee.id !== action.payload);
            return {
                ...state,
                employees: updatedEmployeeArray
            };
        }
        case EmployeeActionTypes.DeleteEmployeeFailed: {
            return {
                ...state,
                employeeErrors: {
                    ...state.employeeErrors,
                    employeeDeleteError: action.payload
                }
            };
        }
        default:
            return state;
    }
}
