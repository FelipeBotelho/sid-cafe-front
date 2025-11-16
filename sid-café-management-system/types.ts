
export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  stock: number;
  imageUrl: string;
}

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

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}
