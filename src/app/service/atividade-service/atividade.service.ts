import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private http: HttpClient) {
  }

  adicionar(obj) {
    console.log("obj", obj);
    return this.http.post(environment.API_URL + "atividade", obj)
      .pipe(take(1));
  }

  getAll(viagemId) {
    return this.http.get(environment.API_URL + "atividade/" + viagemId)
      .pipe(take(1));
  }

  remove(id) {
    return this.http.delete(environment.API_URL + "atividade/" + id)
      .pipe(take(1));
  }
}
