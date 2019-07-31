import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemesterwisemarksComponent } from './semesterwisemarks.component';

const routes: Routes = [{ path: '', component: SemesterwisemarksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemesterwisemarksRoutingModule { }



