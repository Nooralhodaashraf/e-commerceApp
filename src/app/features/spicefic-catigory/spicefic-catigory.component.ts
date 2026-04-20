<<<<<<< HEAD
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
=======
import { Component, inject, OnInit, signal } from '@angular/core';
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
import { CatigoriesService } from '../../core/services/catigories.service';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from '../../core/model/product.interface';
import { Catigory } from '../home/components/categories-home/catigory.interface';
<<<<<<< HEAD
import { isPlatformBrowser } from '@angular/common';
=======
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756

@Component({
  selector: 'app-spicefic-catigory',
  imports: [],
  templateUrl: './spicefic-catigory.component.html',
  styleUrl: './spicefic-catigory.component.css',
})
export class SpiceficCatigoryComponent implements OnInit {
  private readonly catigoriesService = inject(CatigoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);
<<<<<<< HEAD
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  productList = signal<Product[]>([]);
  catInfo: Catigory = {} as Catigory;
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.getAllproduct(params.get('id')!);
        this.getCatData(params.get('id')!);
      });
    }
=======
  productList = signal<Product[]>([]);
  catInfo: Catigory = {} as Catigory;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getAllproduct(params.get('id')!);
      this.getCatData(params.get('id')!);
    });
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
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
