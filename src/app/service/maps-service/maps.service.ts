import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class MapsService {

    private http: HttpClient;
    constructor(private handler: HttpBackend) {
      this.http = new HttpClient(handler);
    }

    toRoute(address: String) {
        return this.http.get(`https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${environment.HERE_API}`)
            // .subscribe((d: any)=> {
            //     return d.items[0].position;
            // });
    }

    getDistance(coord1: string, coord2: string) {
        coord1 = coord1.replace(" ", "");
        coord2 = coord2.replace(" ", "");
        var url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${coord1}&destination=${coord2}&return=summary&apiKey=${environment.HERE_API}`;
        return this.http.get(url);
    }
}
