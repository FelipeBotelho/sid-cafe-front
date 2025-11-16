
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, Category, Sale, User, SaleStatus, SaleItem } from '../types';

// MOCK DATA
const initialCategories: Category[] = [
  { id: '1', name: 'Cafés Especiais' },
  { id: '2', name: 'Salgados' },
  { id: '3', name: 'Doces e Sobremesas' },
  { id: '4', name: 'Bebidas Geladas' },
];

const initialProducts: Product[] = [
  { id: 'p1', name: 'Espresso Intenso', description: 'Café forte e encorpado.', price: 7.50, categoryId: '1', stock: 50, imageUrl: 'https://picsum.photos/400/300?random=1' },
  { id: 'p2', name: 'Cappuccino Cremoso', description: 'Espresso, leite vaporizado e espuma.', price: 12.00, categoryId: '1', stock: 30, imageUrl: 'https://picsum.photos/400/300?random=2' },
  { id: 'p3', name: 'Pão de Queijo', description: 'Tradicional pão de queijo mineiro.', price: 5.00, categoryId: '2', stock: 100, imageUrl: 'https://picsum.photos/400/300?random=3' },
  { id: 'p4', name: 'Croissant de Chocolate', description: 'Massa folhada com recheio de chocolate.', price: 9.00, categoryId: '3', stock: 0, imageUrl: 'https://picsum.photos/400/300?random=4' },
  { id: 'p5', name: 'Torta de Limão', description: 'Fatia de torta com merengue suíço.', price: 15.00, categoryId: '3', stock: 15, imageUrl: 'https://picsum.photos/400/300?random=5' },
  { id: 'p6', name: 'Frappuccino de Caramelo', description: 'Bebida gelada com café, leite e caramelo.', price: 18.00, categoryId: '4', stock: 25, imageUrl: 'https://picsum.photos/400/300?random=6' },
  { id: 'p7', name: 'Coxinha de Frango', description: 'Salgado frito com recheio de frango cremoso.', price: 8.00, categoryId: '2', stock: 40, imageUrl: 'https://picsum.photos/400/300?random=7' },
];

const initialSales: Sale[] = [
    { id: 's1', items: [{ productId: 'p1', quantity: 2, price: 7.50 }, { productId: 'p3', quantity: 1, price: 5.00 }], total: 20.00, status: SaleStatus.COMPLETED, createdAt: new Date() },
    { id: 's2', items: [{ productId: 'p2', quantity: 1, price: 12.00 }], total: 12.00, status: SaleStatus.PREPARING, createdAt: new Date() },
    { id: 's3', items: [{ productId: 'p6', quantity: 1, price: 18.00 }, { productId: 'p7', quantity: 2, price: 8.00 }], total: 34.00, status: SaleStatus.PENDING, createdAt: new Date(new Date().setDate(new Date().getDate() -1)) },
];

const initialUsers: User[] = [
    { id: 'u1', name: 'Admin Sid', email: 'admin@sidcafe.com', role: 'admin' },
    { id: 'u2', name: 'Funcionário', email: 'staff@sidcafe.com', role: 'staff' },
]

interface DataContextType {
  products: Product[];
  categories: Category[];
  sales: Sale[];
  users: User[];
  addProduct: (product: Omit<Product, 'id' | 'imageUrl'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  addSale: (items: { productId: string, quantity: number }[]) => void;
  updateSaleStatus: (saleId: string, status: SaleStatus) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addProduct = (product: Omit<Product, 'id' | 'imageUrl'>) => {
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`,
      imageUrl: `https://picsum.photos/400/300?random=${Date.now()}`
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = { ...category, id: `c${Date.now()}`};
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };
  
  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  const addSale = (items: { productId: string, quantity: number }[]) => {
    const saleItems: SaleItem[] = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error("Product not found");
      return { productId: item.productId, quantity: item.quantity, price: product.price };
    });

    const total = saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newSale: Sale = {
      id: `s${Date.now()}`,
      items: saleItems,
      total,
      status: SaleStatus.PENDING,
      createdAt: new Date(),
    };
    
    setSales(prev => [newSale, ...prev]);

    // Decrease stock
    saleItems.forEach(item => {
      updateProductStock(item.productId, -item.quantity);
    });
  };

  const updateSaleStatus = (saleId: string, status: SaleStatus) => {
    setSales(prev => prev.map(s => s.id === saleId ? { ...s, status } : s));
  };

  const updateProductStock = (productId: string, change: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: p.stock + change } : p));
  }

  return (
    <DataContext.Provider value={{ products, categories, sales, users, addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory, addSale, updateSaleStatus }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
