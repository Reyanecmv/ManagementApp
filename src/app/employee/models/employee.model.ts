export class EmployeeModel {
    constructor(
        public firstName: string,
        public secondName: string,
        public position: string,
        public id: string,
        public details: string,
        public blocked: boolean
    ) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.position = position;
        this.id = id;
        this.details = details;
        this.blocked = blocked;
    }
}
