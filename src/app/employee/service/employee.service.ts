import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EmployeeModel } from './../models/employee.model';
import { map, tap } from 'rxjs/operators';
import { EmployeeDtoModel } from './../models/employee-dto.model';
import { LocalStorageService } from '../../shared/local-storage.service';
import * as _ from 'lodash';

/**
 * In mod normal trebuie sa creez un service si un dto pentru fiecare componenta
 * dar am spus sa implementez logica si apoi creez in fiecare service cu metodele
 * necesare iar apoi EmployeeService o sa devina ServiceType si redenumesc
 * ServiceType in EmployeeService.
 * TODO: Implementare service + metode + dto + models.
 */
@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private employeeData: EmployeeModel[];
    private localStorageKey = 'employees';
    private baseType = '';

    constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    }

    public setEmployees(employees: EmployeeModel[]) : void {
        this.employeeData = _.cloneDeep(employees);
        console.log(this.employeeData)
    }

    public getEmployees(dbName : string): Observable<EmployeeModel[]> {
        this.baseType = dbName;
        const localStorageData = this.getEmployeesFromLocalStorage();
        let result: Observable<EmployeeModel[]>;
        if (localStorageData) {
            result = of(localStorageData);
            this.employeeData = _.cloneDeep(localStorageData);
        } else {
            result = this.http.get<EmployeeDtoModel[]>(`./assets/data/${dbName.toLocaleLowerCase()}_employees.json`).pipe(
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
                    this.localStorage.setLocalStorage(this.localStorageKey + this.baseType, JSON.stringify(this.employeeData));
                })
            );
        }
        return result;
    }

    public getEmployeesFromLocalStorage(): EmployeeModel[] {
        const localStorageData = localStorage.getItem(this.localStorageKey + this.baseType);
        let result: EmployeeModel[];
        if (localStorageData && localStorageData !== '[]') {
            result = JSON.parse(localStorageData);
        }
        return result;
    }

    public editEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
        const index = this.employeeData.findIndex(foundEmployee => foundEmployee.id === employee.id);
        this.employeeData[index] = _.cloneDeep(employee);
        this.localStorage.setLocalStorage(this.localStorageKey, JSON.stringify(this.employeeData));
        return of(employee);
    }

    public deleteEmployee(id: string): Observable<string> {
        const index = this.employeeData.findIndex(employee => employee.id === id);
        this.employeeData.splice(index, 1);
        this.localStorage.setLocalStorage(this.localStorageKey, JSON.stringify(this.employeeData));
        return of(id);
    }
}

