import { Component, inject, OnInit } from '@angular/core';
import { CatigoriesService } from '../../../../core/services/catigories.service';
import { Catigory } from './catigory.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-home',
  imports: [RouterLink],
  templateUrl: './categories-home.component.html',
  styleUrl: './categories-home.component.css',
})
export class CategoriesHomeComponent implements OnInit {
  catigoryList: Catigory[] = [];
  private readonly catigoriesService = inject(CatigoriesService);
  ngOnInit(): void {
    this.getAllCatigories();
  }

  getAllCatigories(): void {
    this.catigoriesService.getAllCatigories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.catigoryList = res.data;
      },
    });
  }
}
