import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { cartDetails } from './cart-details.interface';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  CartDetails = signal<cartDetails>({} as cartDetails);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartData();
    }
  }

  getCartData(): void {
    this.cartService.getLoggedCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.CartDetails.set(res.data);
        this.cartService.cartCurrId.set(this.CartDetails()._id);
        console.log(this.CartDetails().products);
      },
    });
  }

  deletProduct(productId: string): void {
    this.cartService.removeItem(productId).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);

        console.log(res);
        this.CartDetails.set(res.data);
        console.log(this.CartDetails().products.length);
      },
    });
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateItemCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.CartDetails.set(res.data);
      },
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);

        console.log(res);
        this.CartDetails.set(res.data);
      },
    });
  }
}
