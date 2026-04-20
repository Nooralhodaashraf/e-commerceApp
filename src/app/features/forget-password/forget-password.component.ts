import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step = signal<number>(1);
  email: FormControl = new FormControl('', [Validators.required]);
  code: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  ]);

  submitEmail(e: Event) {
    e.preventDefault();
    if (this.email.valid) {
      const data = { email: this.email.value };
      this.authService.changePassword(data).subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(2);
        },
      });
    }
  }
  submitCode(e: Event) {
    e.preventDefault();
    if (this.code.valid) {
      const data = { resetCode: this.code.value };
      this.authService.sendCode(data).subscribe({
        next: (res) => {
          console.log(res);
          this.step.set(3);
        },
      });
    }
  }

  resendCode(): void {
    const data = { email: this.email.value };
    this.authService.changePassword(data).subscribe({
      next: (res) => {
        console.log(res);
        console.log('swnt sode');
      },
    });
  }

  submitPassword(e: Event) {
    e.preventDefault();
    if (this.password.valid) {
      const data = {
        email: this.email.value,
        newPassword: this.password.value,
      };
      this.authService.resetPassword(data).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
