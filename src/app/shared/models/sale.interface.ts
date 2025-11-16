export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

export enum SaleStatus {
  PENDING = 'Pendente',
  PREPARING = 'Em Preparo',
  READY = 'Pronto para Retirada',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado',
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  status: SaleStatus;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface SaleFormData {
  items: CartItem[];
}