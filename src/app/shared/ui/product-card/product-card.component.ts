import { CartService } from '../../../core/services/cart.service';
import { Component, inject, input, InputSignal, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/model/product.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatigoriesService } from '../../../core/services/catigories.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly catigoriesService = inject(CatigoriesService);

  private readonly toastrService = inject(ToastrService);
  product = input.required<Product>();

  productList = signal<Product[]>([]);
  starsArray = [1, 2, 3, 4, 5];
  ngOnInit(): void {}

  addToCart(prodId: string): void {
    if (localStorage.getItem('token')) {
      this.cartService.addProduct(prodId).subscribe({
        next: (res) => {
          this.cartService.cartCount.set(res.numOfCartItems);
          // console.log(res);
          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
        },
      });
    } else {
      this.toastrService.warning('please sign in to add items', 'FreshCart', {
        progressBar: true,
        closeButton: true,
      });
    }
  }

  addToWIshlist(prodId: string): void {
    if (localStorage.getItem('token')) {
      this.catigoriesService.addToWishlist(prodId).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.toastrService.warning('please sign in to add items', 'FreshCart', {
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
