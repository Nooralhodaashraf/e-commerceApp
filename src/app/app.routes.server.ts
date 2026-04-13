import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'details/:id/:slug', renderMode: RenderMode.Client },
  { path: 'checkout/:id', renderMode: RenderMode.Client },
  { path: 'spicifcCatigory/:id', renderMode: RenderMode.Client },
  { path: 'brandproducts/:id', renderMode: RenderMode.Client },
  { path: 'cart', renderMode: RenderMode.Client },
  { path: 'allorders', renderMode: RenderMode.Client },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
