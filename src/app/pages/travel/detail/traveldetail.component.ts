import { Component, OnInit } from '@angular/core'

@Component({
    templateUrl: "detail.html",
    styleUrls: ["detail.css"]
})
export class TravelDetailComponent implements OnInit {

    saida: String = '';
    retorno: String = '';
    destino: String = '';
    
    orcamento: Number;
    addVisible = false;
    destinos = [];

    validateFields = false;
    validateDestiny = false;

    ngOnInit() {
    }
}