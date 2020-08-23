import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class RegisterService {
    /**
     *
     */
    constructor(private http: HttpClient) {
    }

    AdicionarUsuario(usuario: any) {
        return this.http.post(environment.API_URL + "usuario", usuario);
    }
}