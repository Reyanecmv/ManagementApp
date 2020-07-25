import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from './models/employee.model';
import { map } from 'rxjs/operators';
import { EmployeeDtoModel } from './models/employee-dto.model';

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) {
    }

    public getEmployees(): Observable<EmployeeModel[]> {
        return this.http.get<EmployeeDtoModel[]>('./assets/data/employees.json').pipe(map(employees => employees.map(
            employee => new EmployeeModel(
                employee.FirstName,
                employee.SecondName,
                employee.Position,
                employee.Id,
                employee.Details,
                employee.Blocked
            ))));
    }
}

