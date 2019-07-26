import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceinfoComponent } from './experienceinfo.component';



const routes: Routes = [
    { path: '', component: ExperienceinfoComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceinfoRoutingModule { }

