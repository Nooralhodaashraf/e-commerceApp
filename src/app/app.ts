import { GlobalLoaderComponent } from './layouts/components/global-loader/global-loader.component';
import { FooterComponent } from './layouts/components/footer/footer.component';
import { NavbarComponent } from './layouts/components/navbar/navbar.component';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxTranslateService } from './core/services/ngx-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly translate = inject(TranslateService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly ngxTranslateService = inject(NgxTranslateService);

  constructor() {
    this.ngxTranslateService.initNgxTranslate();
    this.translate.addLangs(['ar', 'en']);
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('lang')) {
        this.translate.use(localStorage.getItem('lang')!);
        this.ngxTranslateService.changeDir();
      }
    }
  }
}
