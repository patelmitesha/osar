import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitapplicationComponent } from './submitapplication.component';

const routes: Routes = [
{ path: '', component: SubmitapplicationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitapplicationRoutingModule { }
