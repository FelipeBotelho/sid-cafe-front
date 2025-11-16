import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Product, CategoryInfo } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-product-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './product-selector.component.html'
})
export class ProductSelectorComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() categories: CategoryInfo[] = [];
  @Output() addToCart = new EventEmitter<string>();

  searchTerm: string = '';
  selectedCategoryId: string | null = null;
  filteredProducts: Product[] = [];

  ngOnInit(): void {
    this.filterProducts();
  }

  ngOnChanges(): void {
    this.filterProducts();
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  onCategoryFilter(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    this.filterProducts();
  }

  private filterProducts(): void {
    this.filteredProducts = this.products
      .filter(product => product.stock > 0 && product.available) // Apenas produtos disponíveis e com estoque
      .filter(product => 
        this.searchTerm.length === 0 || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter(product => 
        this.selectedCategoryId === null || 
        product.category === this.selectedCategoryId
      );
  }

  onAddToCart(productId: string): void {
    this.addToCart.emit(productId);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}