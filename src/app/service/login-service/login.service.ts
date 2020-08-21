import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: "root"
})
export class LoginService {
    constructor(private http: HttpClient) {
    }

    autenticar(login: String, senha: String) : Observable<any> {
        return this.http.post(environment.API_URL + "autenticar/login", {
            username: login,
            password: senha
        })
    }

    setSession(token) {
        localStorage.setItem("token", token);
    }

    decodeToken() {
        return jwt_decode(this.token);
    }

    get token() {
        return localStorage.getItem("token");
    }
}