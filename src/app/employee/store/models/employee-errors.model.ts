export class EmployeeErrors {
    employeeLoadError: string;
    employeeCreateError: string;
    employeeUpdateError: string;
    employeeDeleteError: string;

    constructor() {
        this.employeeLoadError = null;
        this.employeeCreateError = null;
        this.employeeUpdateError = null;
        this.employeeDeleteError = null;
    }
}
