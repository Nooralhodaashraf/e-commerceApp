import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { SliderComponent } from './components/slider/slider.component';
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';
import { Product } from '../../core/model/product.interface';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, NewsletterComponent, SliderComponent, CategoriesHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(r.data);
        this.productList.set(res.data);
      },
    });
  }
}
