import { TranslateService } from '@ngx-translate/core';
import { CatigoriesService } from './../../../core/services/catigories.service';
import { FlowbiteService } from './../../../core/services/flowbite.service';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Catigory } from '../../../features/home/components/categories-home/catigory.interface';
import { CartService } from '../../../core/services/cart.service';
import { NgxTranslateService } from '../../../core/services/ngx-translate.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly catigoriesService = inject(CatigoriesService);
  private readonly cartService = inject(CartService);
  private readonly translateService = inject(NgxTranslateService);
  catigoryList: Catigory[] = [];
  flowbiteService = inject(FlowbiteService);
  open = signal(false);
  openUserMenu = signal(false);
  count = computed(() => this.cartService.cartCount());
  wishes = computed(() => this.cartService.wishCount());
  logged = computed(() => this.authService.isLogged());
  currentLang: string = 'en';

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('token')) {
        this.authService.isLogged.set(true);
        this.getCartCount();
      }
    }
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.getCatigories();
  }

  changeLang(lang: string) {
    this.translateService.changeLang(lang);
    this.currentLang = lang;
    console.log(this.currentLang);
  }

  @ViewChild('userMenuParent') userMenuParentRef!: ElementRef;

  toggleSidebar() {
    this.open.update((p) => !p);
  }
  closeSidebar() {
    this.open.set(false);
  }

  toggleOpenUserMenu() {
    this.openUserMenu.update((p) => !p);
  }

  logOut() {
    this.authService.signOut();
  }

  //
  @HostListener('document:click', ['$event'])
  closeMenu(e: Event) {
    if (this.userMenuParentRef.nativeElement.contains(e.target)) return;
    this.openUserMenu.set(false);
  }

  getCatigories() {
    this.catigoriesService.getAllCatigories().subscribe({
      next: (res) => {
        this.catigoryList = res.data;
      },
    });
  }

  getCartCount(): void {
    this.cartService.getLoggedCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }
}
