import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AbastecimentoService } from './../../service/abastecimento-service/abastecimento.service';
import { Observable } from 'rxjs';
import { ViagemService } from './../../service/viagem-service/viagem.service';
import { Component, Input, OnInit } from "@angular/core";

@Component({
  templateUrl: 'abastecimento.html',
  selector: 'app-abastecimento'
})
export class AbastecimentoComponent implements OnInit {
  @Input() viagemId: number;

  origem: any;
  destino: any;
  rotas: Array<any>;

  viagem: any;

  form: FormGroup;

  abastecimentos: Array<any>;

  salvou: boolean = false;

  constructor(private viagemService: ViagemService, private abastecimentoService: AbastecimentoService, private fb: FormBuilder, private toastr: ToastrService){
  }

  buscarAbastecimentos() {
    this.abastecimentoService.buscarAbastecimento(this.viagemId)
      .subscribe((d: Array<any>) => this.abastecimentos = d);
  }

  getErrors(fieldname) {
    return this.form.get(fieldname);
  }

  ngOnInit() {

    this.form = this.fb.group({
      valor: ['', Validators.required],
      quantidade: ['', Validators.required],
      rota_Id: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    this.viagemService.get(this.viagemId)
      .subscribe((d: any) => {
        this.origem = d.rotas.find((e) => e.tipoRota_Id == 1);
        this.destino = d.rotas.find((e) => e.tipoRota_Id == 2);
        this.rotas = d.rotas.filter((e) => e.tipoRota_Id == null);
      });

    this.buscarAbastecimentos();
  }

  remover(id) {
    this.abastecimentoService.remover(id)
      .subscribe(d => {
        this.toastr.success("O abastecimento foi removido com sucesso.");
        this.buscarAbastecimentos();
      });
  }

  save() {
    this.salvou = true;
    if(this.form.valid) {
      this.abastecimentoService.cadastrarAbastecimento(this.form.value)
      .subscribe(d => {
        this.toastr.success("O abastecimento foi registrado com sucesso.");
        this.buscarAbastecimentos();
        this.form.reset();
      });
    }
  }
}
