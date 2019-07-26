import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';

import { QualificationinfoRoutingModule } from './qualificationinfo-routing.module';
import { QualificationinfoComponent } from './qualificationinfo.component';
import { ApplicationService } from  '../../services/application.service';
import { StateService } from  '../../services/state.service';
import { CourseService } from  '../../services/course.service';
import { CourseconfigService } from  '../../services/courseconfig.service';
import { UniversityService } from  '../../services/university.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpModule,
    ReactiveFormsModule,
    TranslateModule,
    QualificationinfoRoutingModule
  ],
  declarations: [QualificationinfoComponent],
  providers:[ApplicationService,StateService,CourseService,CourseconfigService, UniversityService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QualificationinfoModule { }