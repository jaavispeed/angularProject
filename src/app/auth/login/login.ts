import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginFormService } from '@app/auth/login/login-form-service';
import { finalize, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  providers: [LoginFormService],
  templateUrl: './login.html',
})
export default class Login {
  private authService = inject(AuthService);
  private loginForm = inject(LoginFormService);
  private router = inject(Router);

  form = this.loginForm.inicializarForm();

  cliente = environment.clientName;

  cargando = signal(false);

  ingresar() {
    if (this.form.invalid) {
      this.cargando.set(false);
      return;
    }
    this.cargando.set(true);

    const { email, password } = this.form.value;

    this.authService
      .postLogin(email!, password!)
      .pipe(
        tap((isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigateByUrl('/core');
          }
        }),
        finalize(() => this.cargando.set(false)),
      )
      .subscribe();
  }
}
