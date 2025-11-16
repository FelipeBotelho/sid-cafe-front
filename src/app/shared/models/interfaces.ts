export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  stock: number;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  sortOrder: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}