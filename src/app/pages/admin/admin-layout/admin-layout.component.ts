import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    HeaderComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard', exact: true },
    { path: '/admin/vendas', icon: 'shopping_cart', label: 'Vendas', exact: false },
    { path: '/admin/gerenciar', icon: 'inventory_2', label: 'Gerenciamento', exact: false }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
  }
}