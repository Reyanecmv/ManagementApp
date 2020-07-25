import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolver } from './resolvers/employee.resolver';

const routes: Routes = [
    {
        path: '',
        component: EmployeeListComponent,
        resolve: { employees: EmployeeResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
