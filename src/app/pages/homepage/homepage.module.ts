import { NgModule } from '@angular/core'
import { ngModuleJitUrl } from '@angular/compiler';
import { DashboardComponent } from './components/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TimelineComponent } from './components/timeline/timeline.component';
const routes: Routes = [
    { path: "", redirectTo: "dashboard", pathMatch: "full"},
    { path: "dashboard", component: DashboardComponent },
    { path: "timeline", component: TimelineComponent }
]

@NgModule({
    bootstrap: [],
    providers: [],
    declarations: [DashboardComponent, TimelineComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports:[]
})
export class HomepageModule{
}