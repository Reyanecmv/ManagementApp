import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmployeeModel } from './models/employee.model';
import { map, tap } from 'rxjs/operators';
import { EmployeeDtoModel } from './models/employee-dto.model';
import { LocalStorageService } from '../shared/local-storage.service';
import * as _ from 'lodash';

@Injectable()
export class EmployeeService {
    private employeeData: EmployeeModel[];
    private localStorageKey = 'employees';

    constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    }

    public getEmployees(): Observable<EmployeeModel[]> {
        const localStorageData = this.getEmployeesFromLocalStorage();
        let result: Observable<EmployeeModel[]>;
        if (localStorageData) {
            result = of(localStorageData);
            this.employeeData = _.cloneDeep(localStorageData);
        } else {
            result = this.http.get<EmployeeDtoModel[]>('./assets/data/employees.json').pipe(
                map(employees => {
                    employees.sort((i1, i2) => i1.FirstName < i2.FirstName ? -1 : 1);
                    return employees.map(
                        employee => new EmployeeModel(
                            employee.FirstName,
                            employee.SecondName,
                            employee.Position,
                            employee.Id,
                            employee.Details,
                            employee.Blocked
                        ));
                }),
                tap(employees => {
                    this.employeeData = _.cloneDeep(employees);
                    this.localStorage.setLocalStorage(this.localStorageKey, JSON.stringify(this.employeeData));
                })
            );
        }
        return result;
    }

    public getEmployeesFromLocalStorage(): EmployeeModel[] {
        const localStorageData = localStorage.getItem(this.localStorageKey);
        let result: EmployeeModel[];
        if (localStorageData && localStorageData !== '[]') {
            result = JSON.parse(localStorageData);
        }
        return result;
    }

    public deleteEmployee(id: number): Observable<number> {
        const index = this.employeeData.findIndex(employee => employee.id === id);
        this.employeeData.splice(index, 1);
        this.localStorage.setLocalStorage(this.localStorageKey, JSON.stringify(this.employeeData));
        return of(id);
    }
}

