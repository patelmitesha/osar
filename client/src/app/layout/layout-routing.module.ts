import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    { path: '', 
    component: LayoutComponent ,
    children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'personalinfo/:id', loadChildren: './personalinfo/personalinfo.module#PersonalinfoModule' },
            { path: 'personalinfo/:advertisementno/:postcode/:subjectcode', loadChildren: './personalinfo/personalinfo.module#PersonalinfoModule' },
            { path: 'qualificationinfo/:id/:courseconfigid', loadChildren: './qualificationinfo/qualificationinfo.module#QualificationinfoModule' },
            { path: 'semesterwisemarks/:id/:qualificationid', loadChildren: './semesterwisemarks/semesterwisemarks.module#SemesterwisemarksModule' },
            { path: 'semesterwisemarks/:id/:qualificationid/:semesterwisemarksid', loadChildren: './semesterwisemarks/semesterwisemarks.module#SemesterwisemarksModule' },
            { path: 'editqualificationinfo/:id/:qualificationid', loadChildren: './qualificationinfo/qualificationinfo.module#QualificationinfoModule' },
            { path: 'experienceinfo/:id', loadChildren: './experienceinfo/experienceinfo.module#ExperienceinfoModule' },
            { path: 'experienceinfo/:id/:experienceid', loadChildren: './experienceinfo/experienceinfo.module#ExperienceinfoModule' },
            { path: 'preview/:id', loadChildren: './preview/preview.module#PreviewModule' },
            { path: 'upload/:id', loadChildren: './upload/upload.module#UploadModule' },
            { path: 'submit/:id', loadChildren: './submitapplication/submitapplication.module#SubmitapplicationModule' }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
