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

    // viagens =  [
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "São Gonçalo, Rio de Janeiro - RJ", destino: "Lages, Rio Grande do Sul - RS", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    //     { origem: "Niteroi, Rio de Janeiro - RJ", destino: "Aparecida do Norte, São Paulo - SP", inicio: "22/02/2020", fim: "22/03/2020" },
    // ]

    ngOnInit() {
        this.service.getAll()
            .subscribe((d: any[])=> {
                this.viagens = d;
            })
    }

    get getViagens() {
        return this.viagens.slice(0, 7);
    }
}