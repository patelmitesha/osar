import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginService } from  '../services/login.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpModule,
    LayoutRoutingModule,
    TranslateModule,
  ],
  declarations: [LayoutComponent],
  providers: [LoginService]
})
export class LayoutModule { }


