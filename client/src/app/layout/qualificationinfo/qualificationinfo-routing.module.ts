
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualificationinfoComponent } from './qualificationinfo.component';

const routes: Routes = [{ path: '', component: QualificationinfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualificationinfoRoutingModule { }
