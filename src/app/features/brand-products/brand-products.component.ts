import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CatigoriesService } from '../../core/services/catigories.service';
import { Product } from '../../core/model/product.interface';
import { Brand } from '../cart/cart-details.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brand-products',
  imports: [TranslatePipe],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css',
})
export class BrandProductsComponent implements OnInit {
  private readonly catigoriesService = inject(CatigoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  productList = signal<Product[]>([]);
  brandInfo = signal<Brand>({} as Brand);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getAllProducts(params.get('id')!);
      this.getBrandData(params.get('id')!);
      console.log(params.get('id'));
    });
  }

  getAllProducts(brandID: string): void {
    this.catigoriesService.getBrandProducts(brandID).subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
        console.log(brandID);
      },
    });
  }

  getBrandData(id: string): void {
    this.catigoriesService.getSpicificBrandData(id).subscribe({
      next: (res) => {
        console.log(res);
        this.brandInfo.set(res.data);
      },
    });
  }
}
