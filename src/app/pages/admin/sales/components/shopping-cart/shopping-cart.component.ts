import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartItem } from '../../../../../shared/models/sale.interface';
import { Product } from '../../../../../shared/models/product.model';

interface CartItemDetails extends CartItem {
  name: string;
  price: number;
  subtotal: number;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit, OnChanges {
  @Input() cartItems: CartItem[] = [];
  @Input() products: Product[] = [];
  @Output() removeFromCart = new EventEmitter<string>();
  @Output() updateQuantity = new EventEmitter<{productId: string, quantity: number}>();

  cartDetails: CartItemDetails[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.updateCartDetails();
  }

  ngOnChanges(): void {
    this.updateCartDetails();
  }

  private updateCartDetails(): void {
    this.cartDetails = this.cartItems.map(item => {
      const product = this.products.find(p => p.id === item.productId);
      const price = product?.price || 0;
      const name = product?.name || 'Produto não encontrado';
      const subtotal = price * item.quantity;
      
      return {
        ...item,
        name,
        price,
        subtotal
      };
    });

    this.total = this.cartDetails.reduce((sum, item) => sum + item.subtotal, 0);
  }

  onRemoveFromCart(productId: string): void {
    this.removeFromCart.emit(productId);
  }

  onIncreaseQuantity(productId: string): void {
    const item = this.cartItems.find(item => item.productId === productId);
    if (item) {
      this.updateQuantity.emit({ productId, quantity: item.quantity + 1 });
    }
  }

  onDecreaseQuantity(productId: string): void {
    const item = this.cartItems.find(item => item.productId === productId);
    if (item && item.quantity > 1) {
      this.updateQuantity.emit({ productId, quantity: item.quantity - 1 });
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}