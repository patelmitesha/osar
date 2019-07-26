import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { ApplicationService } from  '../../services/application.service';
import { CourseconfigService } from  '../../services/courseconfig.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule,
    TranslateModule,
    PreviewRoutingModule
  ],
  declarations: [PreviewComponent],
  providers: [
  	ApplicationService, 
  	CourseconfigService
  ],
exports: [
    CommonModule,
  ]
})
export class PreviewModule { }