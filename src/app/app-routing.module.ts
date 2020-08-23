import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticadoComponent } from './pages/autenticado/autenticado.component';
import { LoginComponent } from './pages/login/component/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/component/register.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "login", component: LoginComponent },
  { path: "register", loadChildren: () => import('./pages/register/register.module').then(d=>d.RegisterModule) },
  { path: "home", component: AutenticadoComponent, canActivate: [AuthGuard], children: [
    { path: "", loadChildren: () => import('./pages/homepage/homepage.module').then(e=>e.HomepageModule) },
    { path: "travel", loadChildren: () => import('./pages/travel/travel.module').then(d=>d.TravelModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
