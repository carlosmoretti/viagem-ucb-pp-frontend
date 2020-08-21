import { Component } from '@angular/core'
import { LoginService } from 'src/app/service/login-service/login.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-navbar",
    templateUrl: "navbar.html",
    styleUrls: ["navbar.css"]
})
export class NavbarComponent {
    /**
     *
     */
    constructor(private loginService: LoginService, private router: Router) {
    }

    logout() {
        localStorage.removeItem("token");
        this.router.navigate(['/login'])
    }

    get usuario() {
        return this.loginService.decodeToken();
    }
}