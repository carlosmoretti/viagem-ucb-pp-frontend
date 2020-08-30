import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViagemService } from 'src/app/service/viagem-service/viagem.service';
import { MapsService } from 'src/app/service/maps-service/maps.service';
import { switchMap, map } from 'rxjs/operators';

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
    constructor(private fb: FormBuilder, private service: ViagemService, private maps: MapsService) {
    }

    ngOnInit() {
    }

    adicionarDestino(endereco, uf) {
        if(endereco  && uf && uf.length == 2) {

            var tmp = {
                endereco: endereco,
                uf: uf,
                coords: this.getRoute(endereco, uf),
                distance: null,
            };

            var it: any;
            var total = this.destinos.filter((e) => {
                return e.tipoRota_Id == null;
            })
            
            if(total.length > 0) {            
                it = total[total.length - 1];
            } else {
                it = this.destinos.find((e) => e.tipoRota_Id == 1);
            }

            it.coords
                .subscribe((ori) => {
                    tmp.coords.subscribe((dest) => {
                        this.getDistance(ori.lat, ori.lng, dest.lat, dest.lng)
                            .subscribe(resp => {
                                tmp.distance = resp;
                                this.destinos.push(tmp);
                            });
                    })
                })
        }
    }

    definirOrigemDestino(origem, origemuf, destino, destinouf) {
        if(this.saida && this.saidaUf && this.retorno && this.retornoUf && this.dataPartida && this.dataRetorno && this.saidaUf.length == 2 && this.retornoUf.length == 2) {

            if(this.wporigem != null) {
                this.destinos = this.destinos.filter((e) => e.tipoRota_Id != 1);
            }

            if(this.wpdestino != null) {
                this.destinos = this.destinos.filter((e) => e.tipoRota_Id != 2);
            }

            this.destinos.push({
                endereco: origem,
                uf: origemuf,
                coords: this.getRoute(origem, origemuf),
                tipoRota_Id: 1
            });
    
            this.destinos.push({
                endereco: destino,
                uf: destinouf,
                coords: this.getRoute(destino, destinouf),
                tipoRota_Id:2 
            });

            this.recalcularDestinos();
        }
    }

    recalcularDestinos() {
        var snapshot = <Array<any>>JSON.parse(JSON.stringify(this.wps));
        this.destinos = this.destinos.filter((e) => e.tipoRota_Id != null);
        snapshot.forEach((e) => {
            this.adicionarDestino(e.endereco, e.uf);
        })
    }

    salvar() {
        if(this.saida && this.saidaUf && this.retorno && this.retornoUf && this.dataPartida && this.dataRetorno && this.saidaUf.length == 2 && this.retornoUf.length == 2) {

            var clone = JSON.parse(JSON.stringify(this.destinos));    
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

    getRoute(address, uf) {
        this.maps.toRoute(`${address}, ${uf}`)
            .subscribe(d=> console.log(d));

        return this.maps.toRoute(`${address}, ${uf}`)
            .pipe(
                map((d: any) => d.items[0].position)
            )
    }

    getDistance(lat1, lng1, lat2, lng2) {
        return this.maps.getDistance(lat1 + ", " + lng1, lat2 + ", " + lng2)
            .pipe(
                map((res: any) => res.routes[0].sections[0].summary.duration)
            )
    }

    removerDestino(item) {
        this.destinos = this.destinos.filter((e) => {
            return e != item;
        });

        this.recalcularDestinos();
    }

    get wporigem() {
        return this.destinos.find((e) => {
            return e.tipoRota_Id == 1;
        })
    }

    get wpdestino() {
        return this.destinos.find((e) => {
            return e.tipoRota_Id == 2;
        })
    }

    get wps() {
        return this.destinos.filter((e) => {
            return e.tipoRota_Id == null;
        })
    }

    
}