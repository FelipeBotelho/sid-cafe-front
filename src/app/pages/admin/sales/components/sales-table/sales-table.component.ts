import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Sale, SaleStatus } from '../../../../../shared/models/sale.interface';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './sales-table.component.html'
})
export class SalesTableComponent {
  @Input() sales: Sale[] = [];
  @Output() statusChange = new EventEmitter<{saleId: string, status: SaleStatus}>();

  saleStatusEnum = SaleStatus;
  statusOptions = Object.values(SaleStatus);

  constructor(private productService: ProductService) {}

  onStatusChange(saleId: string, event: any): void {
    const newStatus = event.target.value as SaleStatus;
    this.statusChange.emit({ saleId, status: newStatus });
  }

  getProductName(productId: string): string {
    const product = this.productService.getProductById(productId);
    return product?.name || 'Produto não encontrado';
  }

  getStatusChipClass(status: SaleStatus): string {
    const statusClasses: Record<SaleStatus, string> = {
      [SaleStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
      [SaleStatus.PREPARING]: 'bg-blue-100 text-blue-800',
      [SaleStatus.READY]: 'bg-green-100 text-green-800',
      [SaleStatus.COMPLETED]: 'bg-gray-100 text-gray-800',
      [SaleStatus.CANCELLED]: 'bg-red-100 text-red-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusIcon(status: SaleStatus): string {
    const statusIcons: Record<SaleStatus, string> = {
      [SaleStatus.PENDING]: 'schedule',
      [SaleStatus.PREPARING]: 'kitchen',
      [SaleStatus.READY]: 'done',
      [SaleStatus.COMPLETED]: 'check_circle',
      [SaleStatus.CANCELLED]: 'cancel'
    };
    return statusIcons[status] || 'help';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
}