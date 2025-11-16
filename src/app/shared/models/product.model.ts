export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  available: boolean;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  available: boolean;
  stock: number;
}

export type ProductCategory = 'cafes' | 'bebidas' | 'doces' | 'salgados' | 'paes';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
}

export interface ProductStats {
  totalProducts: number;
  availableProducts: number;
  unavailableProducts: number;
  lowStockProducts: number;
  totalValue: number;
}