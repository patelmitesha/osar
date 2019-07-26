import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalinfoComponent } from './personalinfo.component';


const routes: Routes = [
    { path: '', component: PersonalinfoComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalinfoRoutingModule { }
