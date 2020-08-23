import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register-service/register.service';

@Component({
    templateUrl: "register.html",
    styleUrls: ["register.css"]
})
export class RegisterComponent implements OnInit {

    public form: FormGroup;
    public repitaSenha: String;
    public error: String;
    public success: String;

    public confirm: boolean;

    constructor(private fb: FormBuilder, private service: RegisterService) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            nome: ['', Validators.required ],
            sobrenome: ['', Validators.required ],
            username: ['', Validators.required ],
            password: ['', Validators.required ],
            repitaSenha: ['', Validators.required ]
        })
    }

    createAccount() {
        this.confirm = true;
        console.log(this.form);
        console.log(this.repitaSenha, this.form.value.senha);

        if(this.form.valid) {
            this.service.AdicionarUsuario(this.form.value)
            .subscribe(d=> {
                this.success = "O seu usuário foi cadastrado com sucesso. Autentique-se agora!"
            }, err => {
                this.error = err.error;
            });
        }
    }
}