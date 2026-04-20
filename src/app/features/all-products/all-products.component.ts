import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/model/product.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-all-products',
  imports: [RouterLink, ProductCardComponent, TranslatePipe],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  private readonly productService = inject(ProductService);
  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
