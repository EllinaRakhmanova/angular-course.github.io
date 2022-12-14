import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      responseData => {
        console.log('responseData: ', responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },errorMessage => {
        console.log('error: ', errorMessage);
        this.errorMessage = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
