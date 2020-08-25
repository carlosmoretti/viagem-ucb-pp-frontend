import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViagemService } from 'src/app/service/viagem-service/viagem.service';

@Component({
    templateUrl: "detail.html",
    styleUrls: ["detail.css"]
})
export class TravelDetailComponent implements OnInit {

    saida: String = '';
    saidaUf: String = '';

    retorno: String = '';
    retornoUf: String = "";

    dataPartida: String;
    dataRetorno: String;

    destino: String = '';
    orcamento: Number;
    addVisible = false;
    destinos = [];

    validateFields = false;
    validateDestiny = false;

    retornoTipo: String;
    retornoMensagem: String;

    private form: FormGroup;

    /**
     *
     */
    constructor(private fb: FormBuilder, private service: ViagemService) {
    }

    ngOnInit() {
    }

    adicionarDestino(endereco, uf) {
        if(endereco  && uf && uf.length == 2) {
            this.destinos.push({
                endereco: endereco,
                uf: uf
            })
        }
    }

    salvar() {
        if(this.saida && this.saidaUf && this.retorno && this.retornoUf && this.dataPartida && this.dataRetorno && this.saidaUf.length == 2 && this.retornoUf.length == 2) {

            var clone = JSON.parse(JSON.stringify(this.destinos));
            clone.push({
                endereco: this.saida,
                uf: this.saidaUf,
                tipoRota_Id: 1
            },{
                endereco: this.retorno,
                uf: this.retornoUf,
                tipoRota_Id: 2
            });
    
            this.service.post({
                rotas: clone,
                inicio: this.dataPartida,
                fim: this.dataRetorno
            }).subscribe(d=> {
                this.retornoTipo = "sucesso";
                this.retornoMensagem = "A sua viagem foi cadastrada com sucesso."
            }, err => {
                this.retornoTipo = "erro";
                this.retornoMensagem = "Não foi possível cadastrar essa viagem. Verifique se alguma informação ficou pendente!"
            })
        }
    }
}