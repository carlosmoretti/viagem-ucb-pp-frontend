import { AtividadeStore } from './../../store/atividades.store';
import { AtividadeService } from './../../service/atividade-service/atividade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: "atividade.html",
  selector: "app-atividade",
  styleUrls: ["atividades.css"]
})
export class AtividadeComponent implements OnInit{
  constructor(private fb: FormBuilder, private service: AtividadeService, private toastr: ToastrService, private store: AtividadeStore) {
  }

  @Input("viagemId") viagemId: number;

  formulario: FormGroup;
  checked = false;

  recarregando: boolean;

  atividades = [];

  ngOnInit() {
    this.formulario = this.fb.group({
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      comentario: ['', Validators.required],
      viagem_Id: [''],
      coordenadas: ['']
    });

    this.buscarAtividade();
  }

  buscarAtividade() {
    this.recarregando = true;
    this.service.getAll(this.viagemId)
      .subscribe((d: Array<any>) => {
        this.atividades = d;
        this.recarregando = false;
      })
  }

  remover(id, index) {
    this.atividades.splice(index, 1);
    this.service.remove(id)
      .subscribe(d=> {
        this.toastr.info("Esta atividade foi removida com sucesso.");
        this.buscarAtividade();
      })
  }

  salvarAtividade() {
    this.checked = true;
    if(this.formulario.status != 'INVALID') {
      this.formulario.patchValue({
        viagem_Id: this.viagemId
      });

      this.service.adicionar(this.formulario.value)
        .subscribe((success) => {
          this.toastr.success("Essa atividade foi associada a sua viagem.");
          this.formulario.reset();
          this.checked = false;

          this.buscarAtividade();
        })
    }
  }

  get total() {
    return this.atividades.map((e) => e.valor).reduce((a, b) => a + b, 0);
  }
}
