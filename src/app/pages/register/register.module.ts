import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './component/register.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterService } from 'src/app/service/register-service/register.service';

const routes: Routes = [
    { path: '', component: RegisterComponent }
]

@NgModule({
    providers:[
        FormBuilder,
        RegisterService
    ],
    declarations:[
        RegisterComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class RegisterModule
{
    
}