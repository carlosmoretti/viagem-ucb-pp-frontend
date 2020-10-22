import { Observable } from 'rxjs';
import { HospedagemService } from './../../service/hospedagem-service/hospedagem.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: "hospedagem.html",
  styleUrls: ['hospedagem.css'],
  selector: "app-hospedagem"
})
export class HospedagemComponent implements OnInit {

  form: FormGroup;
  savePressed: boolean;

  tipoHospedagens$: Observable<any>;
  hospedagens: Array<any>;
  @Input('viagemId') viagemId: number;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private hospedagemService: HospedagemService) {
  }

  ngOnInit() {

    this.tipoHospedagens$ = this.hospedagemService.getAll();
    this.obterHospedagens();

    this.form = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      tipoHospedagem_Id: ['', Validators.required],
      checkin: ['', Validators.required],
      diarias: ['', Validators.required],
      valorTotal: ['', Validators.required],
      avaliacao: ['', Validators.required],
      Viagem_Id: ['', Validators.required]
    })
  }

  obterHospedagens() {
    return this.hospedagemService.getAllHospedagens()
      .subscribe((d: Array<any>) => {
        this.hospedagens = d;
      })
  }

  save() {
    this.savePressed = true;

    this.form.patchValue({
      Viagem_Id: this.viagemId
    });

    if(this.form.valid) {
      console.log(this.form.value);
      this.hospedagemService.save(this.form.value)
        .subscribe((d) => {
          this.toastr.success("A hospedagem foi incluída com sucesso.");
          this.form.reset();
          this.obterHospedagens();
        });
    }
  }

  get nomeHotel() {
    return this.form.controls['nome'];
  }

  get endereco() {
    return this.form.controls['endereco'];
  }

  get tipoHospedagem() {
    return this.form.controls['tipoHospedagem_Id'];
  }

  get checkin() {
    return this.form.controls['checkin'];
  }

  get diarias() {
    return this.form.controls['diarias'];
  }

  get valorTotal() {
    return this.form.controls['valorTotal'];
  }

  get avaliacao() {
    return this.form.controls['avaliacao'];
  }
}
