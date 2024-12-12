import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent,RegisterComponent,ForgetPasswordComponent,ResetPasswordComponent],
  imports: [CommonModule, AuthenticationRoutingModule,FormsModule,ReactiveFormsModule]
})
export class AuthenticationModule {}
