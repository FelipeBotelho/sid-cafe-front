import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'cardapio',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
