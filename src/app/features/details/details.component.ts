import { Product } from './../../core/model/product.interface';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CurrencyPipe } from '@angular/common';
import { ReviewComponent } from '../review/review.component';
import { Review } from '../../core/model/review.interface';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, ReviewComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  reviewList = signal<Review>({} as Review);

  ProductDetails = signal<Product>({} as Product);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getProductDetails(params.get('id')!);
    });
  }

  getProductDetails(id: string): void {
    this.productService.getSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.ProductDetails.set(res.data);
      },
    });
  }

  // getstars(): void {
  //   for (let index = 0; index < 5; index++) {
  //     if (index < this.ProductDetails().ratingsAverage) {
  //       this.rating += ` <i class="fas fa-star"></i>`;
  //     } else if (index > this.ProductDetails().ratingsAverage) {
  //       this.rating += `     <i class="far fa-star text-gray-300"></i>`;
  //     }
  //   }
  // }
  // getStars(rating: number): ('full' | 'half' | 'empty')[] {
  //   return Array.from({ length: 5 }, (_, i) => {
  //     const star = i + 1;

  //     if (rating >= star) return 'full';
  //     if (rating >= star - 0.5) return 'half';
  //     return 'empty';
  //   });
  // }
}
