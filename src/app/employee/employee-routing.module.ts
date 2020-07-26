import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolver } from './resolvers/employee.resolver';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
    {
        path: '',
        component: EmployeeListComponent,
        resolve: { employees: EmployeeResolver }
    },
    {
        path: ':id',
        component: EmployeeEditComponent,
        resolve: { employees: EmployeeResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
