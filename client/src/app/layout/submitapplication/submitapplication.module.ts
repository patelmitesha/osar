import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';


import { SubmitapplicationRoutingModule } from './submitapplication-routing.module';

import { SubmitapplicationComponent } from './submitapplication.component';
import { ApplicationService } from  '../../services/application.service';


@NgModule({
  imports: [
    FormsModule,
	CommonModule,
	MaterialModule,
	HttpModule,
	ReactiveFormsModule,
	TranslateModule,
    SubmitapplicationRoutingModule
  ],
  declarations: [SubmitapplicationComponent],
  providers:[ApplicationService],
	exports: [
	    CommonModule,
	    FormsModule,
	    ReactiveFormsModule
	]
})
export class SubmitapplicationModule { }
