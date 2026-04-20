import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  cartCount = signal<number>(0);
  wishCount = signal<number>(0);
  cartCurrId = signal<string>('');

  addProduct(productId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v2/cart`, {
      productId: productId,
    });
  }

  getLoggedCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/api/v2/cart');
  }

  removeItem(itemId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart/${itemId}`);
  }

  updateItemCount(itemId: string, countItem: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v2/cart/${itemId}`, {
      count: countItem,
    });
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart`);
  }

  createCashOrder(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/orders/${cartId}`, data);
  }

  createVisaOrder(cartId: string, shippingAddress: any, data: object): Observable<any> {
    const href = window.location.href;
    return this.httpClient.post(
      environment.baseUrl + `/api/v1/orders/checkout-session/${cartId}`,
      { shippingAddress },
      { params: { url: href } },
    );
  }

  getAllOrders(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/orders/user/${id}`);
  }
}
