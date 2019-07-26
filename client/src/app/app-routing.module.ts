import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: 'index', loadChildren: './index/index.module#IndexModule'},
    { path: 'register', loadChildren: './register/register.module#RegisterModule'},
    { path: 'verifylogin', loadChildren: './verifylogin/verifylogin.module#VerifyloginModule'},
    { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordModule'},
    { path: 'layout', loadChildren: './layout/layout.module#LayoutModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
