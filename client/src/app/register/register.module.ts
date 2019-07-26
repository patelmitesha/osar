import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { LoginService } from  '../services/login.service';

@NgModule({
  imports: [
	FormsModule,
	MaterialModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    TranslateModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterComponent],
  providers: [LoginService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }