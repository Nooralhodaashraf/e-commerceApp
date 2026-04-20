import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  msgError: string = '';
  loginSubscribe: Subscription = new Subscription();

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            console.log(res.token);
            this.authService.isLogged.set(true);
            this.router.navigate(['/']);
          }

          //
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
