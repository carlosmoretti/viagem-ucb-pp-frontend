import { Component, OnInit } from '@angular/core'
import { ViagemService } from 'src/app/service/viagem-service/viagem.service';

@Component({
    templateUrl: "dashboard.html",
    styleUrls: ["dashboard.css"],
})
export class DashboardComponent implements OnInit {

    viagens = [];

    constructor(private service: ViagemService) {
    }

    ngOnInit() {
        this.service.getAll()
            .subscribe((d: any[])=> {
                this.viagens = d;
                console.log(d);
            })
    }

    origem(item: any[]) {
        return item.find((e) => {
            return e.tipoRota_Id == 1;
        });
    }

    destino(item: any[]) {
        return item.find((e) => {
            return e.tipoRota_Id == 2;
        });
    }

    get getViagens() {
        return this.viagens.slice(0, 7);
    }
}