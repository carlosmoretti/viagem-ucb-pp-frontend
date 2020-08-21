import{ NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';
import { LoginService } from 'src/app/service/login-service/login.service';

const routes: Routes = [
    { path: '', component: LoginComponent }
]

@NgModule({
    providers: [
        LoginService
    ],
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class LoginModule
{
}