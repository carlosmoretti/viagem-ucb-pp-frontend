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
    return this.http.get(environment.API_URL + "Hospedagem/TipoHospedagem").pipe(take(1));
  }

  save(obj) {
    return this.http.post(environment.API_URL + "Hospedagem", obj).pipe(take(1));
  }

  get(id) {
    return this.http.get(environment.API_URL + "Hospedagem/viagem/" + id).pipe(take(1));
  }

  delete(id) {
    return this.http.delete(environment.API_URL + "Hospedagem/" + id);
  }
}
