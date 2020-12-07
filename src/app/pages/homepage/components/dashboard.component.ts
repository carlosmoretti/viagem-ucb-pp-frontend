import { Component, OnInit } from '@angular/core'
import { ViagemService } from 'src/app/service/viagem-service/viagem.service';

@Component({
    templateUrl: "dashboard.html",
    styleUrls: ["dashboard.css"],
})
export class DashboardComponent implements OnInit {

    viagens: Array<any> = [];

    removeMessage: String;
    removeId: number;

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

    removerViagem(item) {
        this.removeMessage = `Confirma a exclusão da viagem ${this.origem(item.rotas).uf} — ${this.destino(item.rotas).uf}?`;
        this.removeId = item.id;
    }

    confirmaRemove() {
        this.service.delete(this.removeId)
            .subscribe(d=> {
                this.ngOnInit()
                this.removeId = null;
                this.removeMessage = null;
            })
    }

    get getViagens() {
        return this.viagens;
    }
}
