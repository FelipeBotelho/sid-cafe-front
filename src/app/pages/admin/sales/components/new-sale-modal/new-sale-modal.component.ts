import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProductSelectorComponent } from '../product-selector/product-selector.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { CartItem, SaleFormData } from '../../../../../shared/models/sale.interface';
import { Product, CategoryInfo } from '../../../../../shared/models/product.model';
import { ProductService } from '../../../../../services/product.service';
import { SalesService } from '../../../../../services/sales.service';

@Component({
  selector: 'app-new-sale-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ProductSelectorComponent,
    ShoppingCartComponent
  ],
  templateUrl: './new-sale-modal.component.html'
})
export class NewSaleModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  
  cart: CartItem[] = [];
  products: Product[] = [];
  categories: CategoryInfo[] = [];
  loading = false;

  constructor(
    private productService: ProductService,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  private loadCategories(): void {
    this.categories = this.productService.getCategories();
  }

  onAddToCart(productId: string): void {
    const existingItem = this.cart.find(item => item.productId === productId);
    
    if (existingItem) {
      this.onUpdateQuantity({ productId, quantity: existingItem.quantity + 1 });
    } else {
      this.cart = [...this.cart, { productId, quantity: 1 }];
    }
  }

  onRemoveFromCart(productId: string): void {
    this.cart = this.cart.filter(item => item.productId !== productId);
  }

  onUpdateQuantity(update: { productId: string, quantity: number }): void {
    if (update.quantity <= 0) {
      this.onRemoveFromCart(update.productId);
      return;
    }

    this.cart = this.cart.map(item =>
      item.productId === update.productId
        ? { ...item, quantity: update.quantity }
        : item
    );
  }

  onCancel(): void {
    this.resetCart();
    this.closeModal.emit(false);
  }

  onSubmit(): void {
    if (this.cart.length === 0) {
      alert('Adicione pelo menos um item para criar a venda.');
      return;
    }

    this.loading = true;

    try {
      this.salesService.addSale(this.cart);
      
      alert('Venda criada com sucesso!');
      
      this.resetCart();
      this.closeModal.emit(true);
    } catch (error: any) {
      alert(error.message || 'Erro ao criar venda');
    } finally {
      this.loading = false;
    }
  }

  private resetCart(): void {
    this.cart = [];
  }

  get hasItems(): boolean {
    return this.cart.length > 0;
  }
}