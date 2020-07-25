import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'employees',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
    },
    {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full'
    },
    // THIS REDIRECT SHOULD ACTUALLY BE TO A 404 PAGE
    {
        path: '**',
        redirectTo: 'employees'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
