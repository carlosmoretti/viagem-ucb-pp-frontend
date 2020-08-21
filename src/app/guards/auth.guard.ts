import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../service/login-service/login.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private service: JwtHelperService, private login: LoginService, private router: Router) {
    }

    public isAuthenticated() : boolean {
        return !this.service.isTokenExpired(this.login.token);
    }

    canActivate() : boolean {
        if(!this.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        } 
        return true;
    }
}