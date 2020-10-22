import { take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class HospedagemService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(environment.API_URL + "hospedagem/tipohospedagens").pipe(take(1));
  }

  save(obj) {
    return this.http.post(environment.API_URL + "hospedagem", obj).pipe(take(1));
  }

  getAllHospedagens() {
    return this.http.get(environment.API_URL + "hospedagem").pipe(take(1));
  }
}
