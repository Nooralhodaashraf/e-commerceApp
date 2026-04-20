import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../model/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(page: number = 1): Observable<any> {
    return this.httpClient.get<{ data: Product[] }>(
      environment.baseUrl + `/api/v1/products?page=${page}`,
    );
  }

  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products/${productId}`);
  }

  getReview(productId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products/${productId}/reviews`);
  }
}
