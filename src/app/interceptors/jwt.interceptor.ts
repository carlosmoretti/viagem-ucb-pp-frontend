import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../service/login-service/login.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class JwtRequestInterceptor implements HttpInterceptor {
    constructor(private auth: LoginService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.token}`
            }
        })

        if(this.auth.token != null) {
            return next.handle(request).pipe(
                catchError((error: any) => {
                    if (error.status === 401) {
                        localStorage.removeItem("token");
                        this.router.navigate(['/login']);
                        return of(error);
                    }
                })
              );
        } else {
            return next.handle(request);
        }
    }
}