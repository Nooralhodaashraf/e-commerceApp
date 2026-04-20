import { Component, inject, OnInit, signal } from '@angular/core';
import { CatigoriesService } from '../../core/services/catigories.service';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from '../../core/model/product.interface';
import { Catigory } from '../home/components/categories-home/catigory.interface';

@Component({
  selector: 'app-spicefic-catigory',
  imports: [],
  templateUrl: './spicefic-catigory.component.html',
  styleUrl: './spicefic-catigory.component.css',
})
export class SpiceficCatigoryComponent implements OnInit {
  private readonly catigoriesService = inject(CatigoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  productList = signal<Product[]>([]);
  catInfo: Catigory = {} as Catigory;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getAllproduct(params.get('id')!);
      this.getCatData(params.get('id')!);
    });
  }

  getAllproduct(id: string): void {
    this.catigoriesService.getSpicificCatigory(id).subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
      },
    });
  }

  getCatData(id: string): void {
    this.catigoriesService.getSpicificCatigoryData(id).subscribe({
      next: (res) => {
        console.log(res);
        this.catInfo = res.data;
      },
    });
  }
}
