import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EmployeeService } from './employee.service';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './store/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/effects/employee.effects';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolver } from './resolvers/employee.resolver';


@NgModule({
    declarations: [EmployeeListComponent],
    imports: [
        SharedModule,
        EmployeeRoutingModule,
        StoreModule.forFeature('employee', employeeReducer),
        EffectsModule.forFeature([EmployeeEffects])
    ],
    providers: [EmployeeService, EmployeeResolver]
})
export class EmployeeModule {
}
