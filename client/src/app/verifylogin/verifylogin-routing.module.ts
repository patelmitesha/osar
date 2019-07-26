import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyloginComponent } from './verifylogin.component';

const routes: Routes = [
 { path: '', component: VerifyloginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyloginRoutingModule { }
