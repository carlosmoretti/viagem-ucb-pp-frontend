import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ViagemService } from 'src/app/service/viagem-service/viagem.service';

@Injectable({
  providedIn: "root"
})
export class TravelEditResolver implements Resolve<any> {

  constructor(private service: ViagemService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.params != null) {
      this.service.get(route.params.id)
        .subscribe(x=> {
          return x;
        })
    }
  }
}
