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

  ngOnInit() {
    this.formulario = this.fb.group({
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      comentario: ['', Validators.required],
      viagem_Id: [''],
      coordenadas: ['']
    });
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

          this.service.getAll(this.viagemId)
            .subscribe((x: Array<any>) => {
              console.log(x);
              this.store.atividades = x;
            });
        })
    }

  }
}
