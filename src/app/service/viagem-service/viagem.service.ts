import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class ViagemService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get(environment.API_URL + "viagem");
    }

    post(obj) {
        return this.http.post(environment.API_URL + "viagem", obj);
    }

    delete(id) {
        return this.http.delete(environment.API_URL + "viagem/" + id);
    }
}