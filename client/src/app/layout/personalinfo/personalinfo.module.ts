
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { TranslateModule } from '@ngx-translate/core';

import { PersonalinfoRoutingModule } from './personalinfo-routing.module';
import { PersonalinfoComponent } from './personalinfo.component';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as moment from 'moment';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
    parse  : {
        dateInput: 'LL'
    },
    display: {
        dateInput         : 'LL',
        monthYearLabel    : 'MMM YYYY',
        dateA11yLabel     : 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
import { ApplicationService } from  '../../services/application.service';


@NgModule({
  imports: [
   FormsModule,
    CommonModule,
    MaterialModule,
    HttpModule,
    ReactiveFormsModule,
    TranslateModule,
    PersonalinfoRoutingModule
  ],
  declarations: [PersonalinfoComponent],
  providers:
    [  ApplicationService ,
        {provide    : DateAdapter,
            useClass: MomentDateAdapter,
            deps    : [MAT_DATE_LOCALE]
        },

        {provide    : MAT_DATE_FORMATS,
            useValue: MY_FORMATS
        }
    ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonalinfoModule { }
