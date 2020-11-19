import { ViagemService } from './../../service/viagem-service/viagem.service';
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

  reloadingHospedagens: boolean;

  tipoHospedagens$: Observable<any>;
  hospedagens: Array<any>;

  visibleId: number;
  @Input('viagemId') viagemId: number;

  constructor(private viagem: ViagemService, private toastr: ToastrService, private fb: FormBuilder, private hospedagemService: HospedagemService) {
  }

  ngOnInit() {
    this.obterHospedagens();
    this.tipoHospedagens$ = this.hospedagemService.getAll();

    this.form = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      tipoHospedagem_Id: ['', Validators.required],
      checkin: ['', Validators.required],
      diarias: ['', Validators.required],
      valorTotal: ['', Validators.required],
      avaliacao: ['', Validators.required],
      Viagem_Id: ['', Validators.required],
      estrelas: ['', Validators.required]
    })
  }

  obterHospedagens() {
    this.hospedagemService.get(this.viagemId)
      .subscribe((d: Array<any>) => {
        this.hospedagens = d;
        this.visibleId = d[d.length-1].id
      });
  }

  remover(id) {
    this.reloadingHospedagens = true;
    this.hospedagemService.delete(id)
      .subscribe(d=> {
        this.toastr.info("Hospedagem removida com sucesso.");
        this.obterHospedagens();
        this.reloadingHospedagens = false;
      })
  }

  starsNumber(stars: number) {
    let ar = [];
    for(let i =0; i < stars; i++)
      ar.push({});

    return ar;
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
          this.toastr.info("A hospedagem foi incluída com sucesso.");
          this.form.reset();
          this.savePressed = false;
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

  get estrelas() {
    return this.form.controls['estrelas'];
  }
}
