import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemesterwisemarksComponent} from './semesterwisemarks.component';
import { SemesterwisemarksRoutingModule } from './semesterwisemarks-routing.module';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from  '../../services/application.service';

@NgModule({
  imports: [
    CommonModule,
    SemesterwisemarksRoutingModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SemesterwisemarksComponent],
  providers:[ApplicationService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SemesterwisemarksModule { }
