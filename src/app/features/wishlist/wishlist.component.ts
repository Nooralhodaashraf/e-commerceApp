import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CatigoriesService } from '../../core/services/catigories.service';
import { Product } from '../../core/model/product.interface';
import { RouterLink } from '@angular/router';
import { WishList } from '../../core/model/wish-list.interface';

@Component({
  standalone: true,
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly catigoriesService = inject(CatigoriesService);
  private readonly cartService = inject(CartService);
  wishList: Product[] = [];
  allWishData = signal<WishList>({} as WishList);
  ngOnInit(): void {
    this.getAllWishes();
  }

  getAllWishes(): void {
    this.catigoriesService.getWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
      },
    });
  }

  deletItem(id: string): void {
    this.catigoriesService.removeItemFromWishList(id).subscribe({
      next: (res) => {
        console.log(res.message);
        this.allWishData.set(res);
        this.wishList = res.data;
        this.cartService.wishCount.set(res.count);
      },
    });
  }
}
