import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { Product } from '../../core/model/product.interface';
import { ProductService } from '../../core/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-shop',
  imports: [ProductCardComponent, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  pageSize = signal<number>(0);
  cp = signal<number>(0);
  total = signal<number>(0);

  private readonly productService = inject(ProductService);
  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.metadata);
        this.productList.set(res.data);

        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }

  pageChanged(num: number): void {
    this.productService.getAllProducts(num).subscribe({
      next: (res) => {
        console.log(res.metadata);
        this.productList.set(res.data);

        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }
}
