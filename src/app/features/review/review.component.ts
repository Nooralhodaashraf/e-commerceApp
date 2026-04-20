import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { Product } from '../../core/model/product.interface';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { Review } from '../../core/model/review.interface';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  private readonly productService = inject(ProductService);
  product = input.required<Product>();
  reviewList = signal<Review[]>([]);
  activeTab: 'details' | 'reviews' | 'shipping' = 'details';
  starsArray = [1, 2, 3, 4, 5];
  ngOnInit(): void {
    this.getReview(this.product()._id);
  }

  setTab(tab: 'details' | 'reviews' | 'shipping') {
    this.activeTab = tab;
  }

  getReview(id: string): void {
    this.productService.getReview(id).subscribe({
      next: (res) => {
        console.log(res);
        this.reviewList.set(res.data);
        console.log(this.reviewList());
      },
    });
  }
}
