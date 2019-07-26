import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { LoginService } from  '../services/login.service';
import { AdvertisementService } from  '../services/advertisement.service';
import { PostService } from  '../services/post.service';
import { SubjectService } from  '../services/subject.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  	MaterialModule,
    HttpModule,
    TranslateModule,
    IndexRoutingModule
  ],
  declarations: [IndexComponent],
  providers: [LoginService, AdvertisementService, PostService, SubjectService]
})
export class IndexModule { 

}


