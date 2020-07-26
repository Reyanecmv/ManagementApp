import { Component, Input, OnInit } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
    @Input() employee: EmployeeModel;

    constructor() {
    }
}
