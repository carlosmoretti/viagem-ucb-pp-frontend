import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "hospedagem.html",
  styleUrls: ['hospedagem.css'],
  selector: "app-hospedagem"
})
export class HospedagemComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      hospedagem: ['', Validators.required]
    })
  }
}
