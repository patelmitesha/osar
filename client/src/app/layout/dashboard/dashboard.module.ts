import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdvertisementService } from  '../../services/advertisement.service';
import { ApplicationService } from  '../../services/application.service';
import { PostService } from  '../../services/post.service';
import { SubjectService } from  '../../services/subject.service';

@NgModule({
  imports: [
   	FormsModule,
    CommonModule,
    MaterialModule,
    HttpModule,
    TranslateModule,
    DashboardRoutingModule
  ],
  declarations: [ DashboardComponent],
  providers: [AdvertisementService, ApplicationService, PostService, SubjectService]
})
export class DashboardModule { }

