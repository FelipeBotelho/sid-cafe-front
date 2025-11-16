import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { SalesTableComponent } from './components/sales-table/sales-table.component';
import { NewSaleModalComponent } from './components/new-sale-modal/new-sale-modal.component';
import { Sale, SaleStatus } from '../../../shared/models/sale.interface';
import { SalesService } from '../../../services/sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SalesTableComponent,
    NewSaleModalComponent
  ],
  templateUrl: './sales.component.html'
})
export class SalesComponent implements OnInit {
  sales$!: Observable<Sale[]>;
  sales: Sale[] = [];
  showNewSaleModal = false;

  constructor(
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.sales$ = this.salesService.getSales();
    this.sales$.subscribe(sales => this.sales = sales);
  }

  onNewSale(): void {
    this.showNewSaleModal = true;
  }

  onModalClose(result: boolean): void {
    this.showNewSaleModal = false;
    if (result) {
      // Venda criada com sucesso
      console.log('Venda criada com sucesso!');
    }
  }

  onStatusChange(event: {saleId: string, status: SaleStatus}): void {
    try {
      this.salesService.updateSaleStatus(event.saleId, event.status);
      console.log('Status da venda atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar status da venda:', error);
    }
  }
}