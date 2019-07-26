import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';

import { VerifyloginRoutingModule } from './verifylogin-routing.module';
import { VerifyloginComponent } from './verifylogin.component';
import { LoginService } from  '../services/login.service';
import { Http, HttpModule } from '@angular/http';

@NgModule({
	imports: [
		FormsModule,
		MaterialModule,
		CommonModule,
		MaterialModule,
	    ReactiveFormsModule,
	    TranslateModule,
		HttpModule,
		VerifyloginRoutingModule
	],
	declarations: [VerifyloginComponent],
	providers: [LoginService],
	exports: [
	    CommonModule,
	    FormsModule,
	    ReactiveFormsModule
	]
})
export class VerifyloginModule { }