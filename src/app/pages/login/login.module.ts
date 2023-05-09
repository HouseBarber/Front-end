import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatButtonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatIconModule,
        MatCardModule
    ]
})
export class LoginModule {
}
