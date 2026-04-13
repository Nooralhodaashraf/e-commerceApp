import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const LANG_KEY = 'lang';

@Injectable({
  providedIn: 'root',
})
export class NgxTranslateService {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  // !!! ssr error
  currentLang = signal('en');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang.set(localStorage.getItem(LANG_KEY) || 'en');
    }
  }

  changeDir(): void {
    if (localStorage.getItem('lang') === 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      document.documentElement.setAttribute('dir', 'rlt');
      document.documentElement.setAttribute('lang', 'ar');
    }
  }

  initNgxTranslate() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('en');
  }

  changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.changeDir();
  }
}
