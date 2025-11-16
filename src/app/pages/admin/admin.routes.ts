import { Routes } from '@angular/router';
import { authGuard, loginGuard } from '../../guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    canActivate: [loginGuard] // Impede acesso se já estiver logado
  },
  {
    path: '',
    loadComponent: () => import('./admin-layout/admin-layout.component').then(c => c.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent)
      },
      {
        path: 'vendas',
        loadComponent: () => import('./sales/sales.component').then(c => c.SalesComponent)
      },
      {
        path: 'gerenciar',
        loadComponent: () => import('./management/management.component').then(c => c.ManagementComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];