import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class AbastecimentoService {

  constructor(private http: HttpClient) {
  }

  buscarAbastecimento(viagemId) {
    return this.http.get(environment.API_URL + "/abastecimento/viagem/" + viagemId);
  }

  cadastrarAbastecimento(obj) {
    return this.http.post(environment.API_URL + "/abastecimento", obj);
  }

  remover(id) {
    return this.http.delete(environment.API_URL + "/abastecimento/" + id);
  }
}
