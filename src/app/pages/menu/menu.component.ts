import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { Category, Product } from '../../shared/models/interfaces';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  groupedMenu: (Category & { products: Product[] })[] = [];
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.loadMenu();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMenu() {
    this.menuService.getGroupedMenu()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.groupedMenu = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar menu:', error);
          this.loading = false;
        }
      });
  }

  formatPrice(price: number): string {
    return price.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  }
}
