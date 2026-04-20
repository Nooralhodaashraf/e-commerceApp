<<<<<<< HEAD
import { RenderMode } from '@angular/ssr';
=======
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
import { BrandProductsComponent } from './features/brand-products/brand-products.component';
import { SpiceficCatigoryComponent } from './features/spicefic-catigory/spicefic-catigory.component';
import { Component } from '@angular/core';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ContactComponent } from './features/contact/contact.component';
import { authGuard } from './core/auth/guard/auth-guard';

//home - address - settungs - details - brands - categories - contact - shop - wishlist - cart - orders - profile - login - register - notfound

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    children: [],
  },

  {
    path: 'details/:id/:slug',
    loadComponent: () =>
      import('./features/details/details.component').then((c) => c.DetailsComponent),
    title: 'Settings',
  },

  { path: 'brands', component: BrandsComponent, title: 'Brands' },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },

  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((c) => c.ShopComponent),
    title: 'Shop',
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
    title: 'Wishlist',
    canActivate: [authGuard],
  },

  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/check-out/check-out.component').then((c) => c.CheckOutComponent),
    title: 'Wishlist',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
    title: 'Cart',
    canActivate: [authGuard],
  },

  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((c) => c.OrdersComponent),
    title: 'Orders',
<<<<<<< HEAD
    canActivate: [authGuard],
=======
    // canActivate: [authGuard],
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then((c) => c.ProfileComponent),
    title: 'Profile',
<<<<<<< HEAD
    canActivate: [authGuard],
=======
>>>>>>> b22c633ac045141d10986a22d147b1c2e5314756
  },
  {
    path: 'allProduct',
    loadComponent: () =>
      import('./features/all-products/all-products.component').then((c) => c.AllProductsComponent),
    title: 'allProduct',
  },
  {
    path: 'spicifcCatigory/:id',
    loadComponent: () =>
      import('./features/spicefic-catigory/spicefic-catigory.component').then(
        (c) => c.SpiceficCatigoryComponent,
      ),
    title: 'allProduct',
  },

  {
    path: 'brandproducts/:id',
    loadComponent: () =>
      import('./features/brand-products/brand-products.component').then(
        (c) => c.BrandProductsComponent,
      ),
    title: 'brand',
  },

  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
