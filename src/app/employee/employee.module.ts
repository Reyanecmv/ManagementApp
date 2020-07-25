import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EmployeeService } from './employee.service';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './store/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/effects/employee.effects';
import { EmployeeRoutingModule } from './employee-routing.module';


@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        EmployeeRoutingModule,
        StoreModule.forFeature('employee', employeeReducer),
        EffectsModule.forFeature([EmployeeEffects])
    ],
    providers: [EmployeeService]
})
export class EmployeeModule {
}
