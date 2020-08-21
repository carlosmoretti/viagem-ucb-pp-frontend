import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelDetailComponent } from './detail/traveldetail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let routes: Routes = [
    { path: 'create', component: TravelDetailComponent }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        TravelDetailComponent
    ]
})
export class TravelModule {
}