import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginFormService } from '@app/auth/login/login-form-service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [LoginFormService],
  templateUrl: './login.html',
})
export default class Login {
  private authService = inject(AuthService);
  private loginForm = inject(LoginFormService);
  private router = inject(Router);

  form = this.loginForm.inicializarForm();

  cargando = signal(false);

  ingresar() {
    if (this.form.invalid) {
      this.cargando.set(false);
      return;
    }
    this.cargando.set(true);

    const { email, password } = this.form.value;

    this.authService.postLogin(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/core');
        return;
      }
    });
  }
}
