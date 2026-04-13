import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { AddressList } from '../../core/model/address.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  activeTab = signal<string>('settings');
  isModalOpen = signal(false);
  formSubscribe: Subscription = new Subscription();
  msgError: string = '';
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);

  addressList: AddressList[] = [];

  ngOnInit(): void {
    this.getAddressList();
  }

  addAddress: FormGroup = this.fb.group({
    name: ['', Validators.required],
    details: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', Validators.required],
  });

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  submitForm(): void {
    if (this.addAddress.valid) {
      console.log(this.addAddress.value);
      this.formSubscribe.unsubscribe();

      this.authService.addAddress(this.addAddress.value).subscribe({
        next: (res) => {
          this.isModalOpen.set(false);
          this.getAddressList();
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
        },
      });
    } else {
      this.addAddress.markAllAsTouched();
    }
  }

  getAddressList(): void {
    this.authService.getUserAddresses().subscribe({
      next: (res) => {
        // console.log(res);
        this.addressList = res.data;
      },
    });
  }

  deletAddress(id: string): void {
    this.authService.deletAddress(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAddressList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });

  submitData(): void {
    if (this.userForm.valid) {
      const userObject = this.userForm.value;

      console.log(userObject);
      this.authService.updateUserData(userObject).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success(res.message);
        },
      });
    }
  }

  changePasswordForm: FormGroup = this.fb.group(
    {
      currentPassword: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      rePassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    },
    { validators: this.confirmPassword },
  );
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ misMach: true });
      return { misMach: true };
    } else {
      return null;
    }
  }

  submitPassword(): void {
    if (this.changePasswordForm.valid) {
      const passwordsObject = this.changePasswordForm.value;
      this.authService.changeCurrPassword(passwordsObject).subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    }
  }
}
