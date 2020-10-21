import { AtividadeService } from './../../../service/atividade-service/atividade.service';
import { AtividadeStore } from './../../../store/atividades.store';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, ChildActivationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViagemService } from 'src/app/service/viagem-service/viagem.service';
import { MapsService } from 'src/app/service/maps-service/maps.service';
import { switchMap, map } from 'rxjs/operators';
import { isNgTemplate, ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: "detail.html",
    styleUrls: ["detail.css"]
})
export class TravelDetailComponent implements OnInit {


    currentAction = 0;

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

    retornoTipo: string;
    retornoMensagem: any;

    isEdit = false;

    atividades = [];

    private form: FormGroup;

    /**
     *
     */
    constructor(private fb: FormBuilder, private service: ViagemService, private maps: MapsService, private router: Router,
      private route: ActivatedRoute, private toastr: ToastrService, private store: AtividadeStore, private atividadeService: AtividadeService) {
    }

    ngOnInit() {
      this.atividades = this.store.atividades;
      this.ifEdit();
    }

    get id() {
      return this.route.snapshot.params.id;
    }

    ifEdit() {
      if(this.route.snapshot.params.id) {
        this.isEdit = true;

        this.service.get(this.route.snapshot.params.id)
          .subscribe((x: any) => {

            this.saida = x.rotas.find((e) => e.tipoRota_Id == 1).endereco;
            this.saidaUf = x.rotas.find((e) => e.tipoRota_Id == 1).uf;
            this.retorno = x.rotas.find((e) => e.tipoRota_Id == 2).endereco;
            this.retornoUf = x.rotas.find((e) => e.tipoRota_Id == 2).uf

            this.dataPartida = new Date(x.inicio).toISOString().split("T")[0]
            this.dataRetorno = new Date(x.fim).toISOString().split("T")[0]

            this.definirOrigemDestino(x.rotas.find((e) => e.tipoRota_Id == 1).endereco,
              x.rotas.find((e) => e.tipoRota_Id == 1).uf,
              x.rotas.find((e) => e.tipoRota_Id == 2).endereco,
              x.rotas.find((e) => e.tipoRota_Id == 2).uf)

            for(let item of x.rotas.filter((x => x.tipoRota_Id !== 1 && x.tipoRota_Id !== 2))) {
              this.adicionarDestino(item.endereco, item.uf, new Date(item.dataInicio).toISOString().split("T")[0], new Date(item.dataFim).toISOString().split("T")[0]);
            }

            console.log(x);
          })
      }
    }

    validaDatas(data, dataFim, tipo, index) {
      let destinosMeio = this.destinos.filter((e) => e.tipoRota_Id != 2);
      let obj = destinosMeio[index === 0 ? 0 : index];

      if(data != null && dataFim != null) {
        if(new Date(data) > new Date(dataFim) || new Date(dataFim) < new Date(data)) {
          this.toastr.error('Datas inválidas. Favor conferir o preenchimento!')
          this.wps[index].dataInicio = null;
          this.wps[index].dataFim = null;
          return;
        }
        data = this.toDate(data);
        dataFim = this.toDate(dataFim);

        if(destinosMeio.length > 0) {
          let inicio = new Date(data);
          let fim = new Date(dataFim);
          if(inicio < new Date(obj.dataFim ?? this.toDate(this.dataPartida)) || inicio < new Date(this.toDate(this.dataPartida))
            || fim > new Date(this.toDate(this.dataRetorno))
            || inicio > new Date(this.toDate(this.dataRetorno)))
          {
            this.toastr.error("Datas inválidas. Favor conferir o preenchimento!")
            this.wps[index].dataInicio = null;
            this.wps[index].dataFim = null;
            return;
          }
        }
      }
    }

    toDate(data) {
      let tmp = data.split("-");
      return `${tmp[0]}/${tmp[1]}/${tmp[2]}`
    }

    adicionarDestino(endereco, uf, dataInicio?: string, dataFim?: string) {
        if(endereco  && uf && uf.length == 2) {
            var tmp = {
                endereco: endereco,
                uf: uf,
                coords: this.getRoute(endereco, uf),
                distance: null,
            };

            if(dataInicio && dataFim) {
              tmp["dataInicio"] = dataInicio;
              tmp["dataFim"] = dataFim;
            }

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

            if(this.dataPartida )

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

            if(this.isEdit) {
              this.service.put({
                rotas: clone,
                inicio: this.dataPartida,
                fim: this.dataRetorno,
                id: this.route.snapshot.params.id
            }).subscribe(d=> {
                this.retornoTipo = "sucesso";
                this.toastr.success("Sua viagem foi editada com sucesso na aplicação.");
                this.router.navigate(['home', 'dashboard']);
                this.retornoMensagem = {
                  text: "A sua viagem foi alterada com sucesso.",
                  action: {
                    text: "Voltar",
                    route: ['/home']
                  }
                }
                this.clearFields();
            }, err => {
                this.retornoTipo = "erro";
                this.retornoMensagem = "Não foi possível cadastrar essa viagem. Verifique se alguma informação ficou pendente!"
            })
            } else {
              this.service.post({
                rotas: clone,
                inicio: this.dataPartida,
                fim: this.dataRetorno
            }).subscribe(d=> {
                this.retornoTipo = "sucesso";
                this.toastr.success("Sua viagem foi cadastrada com sucesso na aplicação.");
                this.router.navigate(['home', 'dashboard']);
                this.retornoMensagem = {
                  text: "A sua viagem foi cadastrada com sucesso.",
                  action: {
                    text: "Voltar",
                    route: ['/home']
                  }
                }
                this.clearFields();
            }, err => {
                this.retornoTipo = "erro";
                this.retornoMensagem = "Não foi possível cadastrar essa viagem. Verifique se alguma informação ficou pendente!"
            })
            }
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

    clearFields() {
      this.saida = '';
      this.saidaUf = '';
      this.retorno = '';
      this.retornoUf = '';
      this.dataPartida = '';
      this.dataRetorno = '';
      this.destinos = [];
    }

    get wporigem() : any {
        return this.destinos.find((e) => {
            return e.tipoRota_Id == 1;
        })
    }

    get wpdestino() : any {
        return this.destinos.find((e) => {
            return e.tipoRota_Id == 2;
        })
    }

    get wps() {
        return this.destinos.filter((e) => {
            return e.tipoRota_Id == null;
        })
    }

    get pageType() {
      return this.route.snapshot.data.titulo;
    }


}
