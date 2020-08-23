import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../../service/login-service/login.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: "login.html",
    styleUrls: ["login.css"]
})

export class LoginComponent implements OnInit {
    constructor(private login: LoginService, private router: Router) {
    }

    public erroLogin: boolean = false;

    ngOnInit() {
        if(this.login.token != null) {
            this.router.navigate(["home"]);
        }
    }

    autenticar(login: String, senha: String) {
        this.login.autenticar(login, senha)
            .subscribe(d=> {
                this.login.setSession(d.token);
                this.router.navigate(["home"]);
            }, e => {
                this.erroLogin = true;
            });
    }
}