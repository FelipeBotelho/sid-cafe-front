import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../../services/menu.service';

interface DashboardStats {
  revenueToday: number;
  salesToday: number;
  topProduct: string;
  outOfStock: number;
}

interface RecentSale {
  id: string;
  productName: string;
  total: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CurrencyPipe
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats = {
    revenueToday: 0,
    salesToday: 0,
    topProduct: 'N/A',
    outOfStock: 0
  };

  recentSales: RecentSale[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    // Simulando dados do dashboard baseado no projeto React
    this.stats = {
      revenueToday: 1250.50,
      salesToday: 12,
      topProduct: 'Espresso Duplo',
      outOfStock: 3
    };

    // Simulando vendas recentes
    this.recentSales = [
      { id: 'v001', productName: 'Espresso Duplo', total: 8.50 },
      { id: 'v002', productName: 'Cappuccino Tradicional', total: 12.00 },
      { id: 'v003', productName: 'Pão de Açúcar', total: 6.50 },
      { id: 'v004', productName: 'Café com Leite', total: 7.00 },
      { id: 'v005', productName: 'Croissant de Chocolate', total: 9.50 }
    ];
  }
}
