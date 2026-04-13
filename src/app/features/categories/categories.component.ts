import { Component, inject } from '@angular/core';
import { Catigory } from '../home/components/categories-home/catigory.interface';
import { CatigoriesService } from '../../core/services/catigories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  catigoryList: Catigory[] = [];
  private readonly catigoriesService = inject(CatigoriesService);
  ngOnInit(): void {
    this.getAllCatigories();
  }

  getAllCatigories(): void {
    this.catigoriesService.getAllCatigories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.catigoryList = res.data;
      },
    });
  }
}
