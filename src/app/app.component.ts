import { Component } from '@angular/core';
import { EmployeeService } from './employee/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'management-app';

  constructor(private employeeService: EmployeeService) {
    this.employeeService.getEmployees().subscribe(resp => console.log(resp));
  }
}
