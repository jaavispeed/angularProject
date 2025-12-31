import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Injectable()
export class LoginFormService {
  private fb = inject(FormBuilder);

  inicializarForm(): FormGroup<LoginForm> {
    return this.fb.group<LoginForm>({
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
      }),
    });
  }
}
