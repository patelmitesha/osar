import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';

import { ExperienceinfoRoutingModule } from './experienceinfo-routing.module';
import { ExperienceinfoComponent } from './experienceinfo.component';
import { ApplicationService } from  '../../services/application.service';

@NgModule({
  imports: [
    
   FormsModule,
    CommonModule,
    MaterialModule,
    HttpModule,
    ReactiveFormsModule,
    TranslateModule,
    ExperienceinfoRoutingModule
  ],
  declarations: [ExperienceinfoComponent],
  providers:[ApplicationService],
    exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExperienceinfoModule { }
