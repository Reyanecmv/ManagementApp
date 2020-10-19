import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EmployeeService } from './employee/service/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { DropDownComponent } from './drop-down/drop-down.component';

@NgModule({
    declarations: [
        AppComponent,
        DropDownComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            name: 'ManagementApp',
            maxAge: 50
        }),
        AppRoutingModule,
        SharedModule
    ],
    providers: [EmployeeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
