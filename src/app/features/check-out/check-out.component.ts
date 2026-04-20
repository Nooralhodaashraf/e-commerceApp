<<<<<<< HEAD
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
=======
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756

@Component({
  selector: 'app-check-out',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
<<<<<<< HEAD
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

=======
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
  flag = signal<string>('cash');

  checkOut: FormGroup = this.fb.group({
    ahippingAddress: this.fb.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }),
  });

  cartID = signal<string>('');
  ngOnInit(): void {
<<<<<<< HEAD
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartId();
    }
=======
    this.getCartId();
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
  }

  submiteForm(): void {
    if (this.checkOut.valid) {
      console.log(this.checkOut.value);

      if (this.flag() === 'cash') {
        this.cartService.createCashOrder(this.cartID(), this.checkOut.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this.router.navigate(['/allorders']);
            }

            console.log(res);
          },
        });
        console.log('cash');
      } else {
        this.cartService.createVisaOrder(this.cartID(), this.checkOut.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
            console.log(res);
          },
        });
        console.log('visa');
      }
    } else {
      console.log('not valide', this.checkOut);
    }
  }

  changeFlage(event: any) {
    this.flag.set(event.target.value);
    console.log(this.flag());
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cartID.set(params.get('id')!);
    });
  }
}
