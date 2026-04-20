import { Component, inject, OnInit } from '@angular/core';
import { CatigoriesService } from '../../core/services/catigories.service';
import { Brands } from '../../core/model/brands.interface';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly catigoriesService = inject(CatigoriesService);
  brandList: Brands[] = [];

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.catigoriesService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandList = res.data;
      },
    });
  }
}
