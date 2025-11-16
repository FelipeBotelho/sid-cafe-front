import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sale, SaleItem, SaleStatus, CartItem } from '../shared/models/sale.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private salesSubject = new BehaviorSubject<Sale[]>(this.getInitialSales());

  constructor(private productService: ProductService) {}

  private getInitialSales(): Sale[] {
    return [
      {
        id: 's1732644021001',
        items: [
          { productId: '1', quantity: 2, price: 4.50 },
          { productId: '3', quantity: 1, price: 5.00 }
        ],
        total: 14.00,
        status: SaleStatus.COMPLETED,
        createdAt: new Date('2025-11-16T10:30:00')
      },
      {
        id: 's1732644021002',
        items: [
          { productId: '2', quantity: 1, price: 6.50 },
          { productId: '4', quantity: 2, price: 7.00 }
        ],
        total: 20.50,
        status: SaleStatus.PREPARING,
        createdAt: new Date('2025-11-16T11:15:00')
      },
      {
        id: 's1732644021003',
        items: [
          { productId: '5', quantity: 1, price: 12.00 }
        ],
        total: 12.00,
        status: SaleStatus.READY,
        createdAt: new Date('2025-11-16T12:00:00')
      },
      {
        id: 's1732644021004',
        items: [
          { productId: '6', quantity: 1, price: 8.00 },
          { productId: '8', quantity: 2, price: 9.50 }
        ],
        total: 27.00,
        status: SaleStatus.PENDING,
        createdAt: new Date('2025-11-16T13:30:00')
      }
    ];
  }

  getSales(): Observable<Sale[]> {
    return this.salesSubject.asObservable();
  }

  addSale(cartItems: CartItem[]): void {
    if (cartItems.length === 0) {
      throw new Error('Adicione pelo menos um item para criar a venda.');
    }

    const products = this.productService.getProductsSnapshot();
    
    const saleItems: SaleItem[] = cartItems.map(item => {
      const product = products.find((p: any) => p.id === item.productId);
      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para ${product.name}`);
      }
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      };
    });

    const total = saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newSale: Sale = {
      id: `s${Date.now()}`,
      items: saleItems,
      total,
      status: SaleStatus.PENDING,
      createdAt: new Date()
    };

    const currentSales = this.salesSubject.value;
    this.salesSubject.next([newSale, ...currentSales]);

    // Atualiza o estoque dos produtos
    saleItems.forEach(item => {
      this.productService.updateProductStock(item.productId, -item.quantity);
    });
  }

  updateSaleStatus(saleId: string, status: SaleStatus): void {
    const currentSales = this.salesSubject.value;
    const updatedSales = currentSales.map(sale => 
      sale.id === saleId ? { ...sale, status } : sale
    );
    this.salesSubject.next(updatedSales);
  }

  getSalesForToday(): Sale[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.salesSubject.value.filter(sale => {
      const saleDate = new Date(sale.createdAt);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime() && sale.status === SaleStatus.COMPLETED;
    });
  }

  getTotalRevenueToday(): number {
    return this.getSalesForToday().reduce((sum, sale) => sum + sale.total, 0);
  }

  getSalesCount(): number {
    return this.salesSubject.value.length;
  }
}