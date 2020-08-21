import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../service/login-service/login.service';

@Injectable({
    providedIn: "root"
})
export class JwtRequestInterceptor implements HttpInterceptor {
    constructor(private auth: LoginService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.token}`
            }
        })

        return next.handle(request);
    }
}