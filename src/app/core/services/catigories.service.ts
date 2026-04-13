import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatigoriesService {
  private readonly httpClient = inject(HttpClient);

  getAllCatigories(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories`);
  }

  getSpicificCatigory(catId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products?category[in]=${catId}`);
  }

  getSpicificCatigoryData(catId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories/${catId}`);
  }

  getAllBrands(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/brands`);
  }

  getBrandProducts(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products?brand=${id}`);
  }

  getSpicificBrandData(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/brands/${id}`);
  }

  getWishList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/wishlist`);
  }

  addToWishlist(productId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v2/wishlist`, {
      productId: productId,
    });
  }

  removeItemFromWishList(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/wishlist/${id}`);
  }
}
