import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';

import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadService } from  '../../services/upload.service';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MaterialModule,
		HttpModule,
		ReactiveFormsModule,
		TranslateModule,
		UploadRoutingModule
	],
	declarations: [UploadComponent],
	providers:[UploadService],
	exports: [
	    CommonModule,
	    FormsModule,
	    ReactiveFormsModule
	]
})
export class UploadModule { }