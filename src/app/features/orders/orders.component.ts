import { cartDetails } from '../cart/cart-details.interface';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Order } from '../../core/model/order.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartID = signal<string>('');
  orderList = signal<Order[]>([]);
  ngOnInit(): void {
    this.getID();
  }

  getOrders(id: string): void {
    this.cartService.getAllOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.orderList.set(res);
      },
    });
  }

  getID(): void {
    this.cartService.getLoggedCart().subscribe({
      next: (res) => {
        console.log(res.data.cartOwner);
        this.cartID.set(res.data.cartOwner);
        this.getOrders(this.cartID());
      },
    });
  }
}
