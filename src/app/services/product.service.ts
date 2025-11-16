import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductFormData, ProductCategory, CategoryInfo, ProductStats } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>(this.getMockProducts());
  
  public products$ = this.productsSubject.asObservable();

  private categories: CategoryInfo[] = [
    { id: 'cafes', name: 'Cafés', description: 'Bebidas quentes à base de café', icon: 'local_cafe' },
    { id: 'bebidas', name: 'Bebidas', description: 'Sucos, chás e outras bebidas', icon: 'local_bar' },
    { id: 'doces', name: 'Doces', description: 'Bolos, tortas e sobremesas', icon: 'cake' },
    { id: 'salgados', name: 'Salgados', description: 'Lanches e comidas salgadas', icon: 'fastfood' },
    { id: 'paes', name: 'Pães', description: 'Pães frescos e assados', icon: 'bakery_dining' }
  ];

  constructor() {}

  // Mock data baseado no projeto React
  private getMockProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Café Expresso',
        description: 'Café forte e encorpado, preparado na hora com grãos selecionados',
        price: 4.50,
        category: 'cafes',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
        available: true,
        stock: 50,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        name: 'Cappuccino',
        description: 'Café espresso com leite vaporizado e espuma cremosa',
        price: 6.50,
        category: 'cafes',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
        available: true,
        stock: 30,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: '3',
        name: 'Café com Leite',
        description: 'Tradicional café com leite, cremoso e saboroso',
        price: 5.00,
        category: 'cafes',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
        available: true,
        stock: 40,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-19')
      },
      {
        id: '4',
        name: 'Suco de Laranja',
        description: 'Suco natural de laranja, fresco e vitamínico',
        price: 7.00,
        category: 'bebidas',
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
        available: true,
        stock: 25,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-19')
      },
      {
        id: '5',
        name: 'Bolo de Chocolate',
        description: 'Fatia de bolo de chocolate com cobertura cremosa',
        price: 12.00,
        category: 'doces',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
        available: true,
        stock: 8,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-21')
      },
      {
        id: '6',
        name: 'Croissant',
        description: 'Croissant francês crocante e amanteigado',
        price: 8.00,
        category: 'paes',
        image: 'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=400',
        available: true,
        stock: 15,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-19')
      },
      {
        id: '7',
        name: 'Pão de Açúcar',
        description: 'Pão doce tradicional, macio e saboroso',
        price: 3.50,
        category: 'paes',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
        available: false,
        stock: 0,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-21')
      },
      {
        id: '8',
        name: 'Sanduíche Natural',
        description: 'Sanduíche com ingredientes frescos e saudáveis',
        price: 9.50,
        category: 'salgados',
        image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
        available: true,
        stock: 12,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-22')
      }
    ];
  }

  // Métodos CRUD
  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: string): Product | null {
    const products = this.productsSubject.value;
    return products.find(p => p.id === id) || null;
  }

  addProduct(productData: ProductFormData): void {
    const newProduct: Product = {
      id: this.generateId(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const currentProducts = this.productsSubject.value;
    this.productsSubject.next([...currentProducts, newProduct]);
  }

  updateProduct(id: string, productData: Partial<ProductFormData>): void {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.map(product =>
      product.id === id
        ? { ...product, ...productData, updatedAt: new Date() }
        : product
    );

    this.productsSubject.next(updatedProducts);
  }

  deleteProduct(id: string): void {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.filter(product => product.id !== id);
    this.productsSubject.next(updatedProducts);
  }

  toggleProductAvailability(id: string): void {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.map(product =>
      product.id === id
        ? { ...product, available: !product.available, updatedAt: new Date() }
        : product
    );

    this.productsSubject.next(updatedProducts);
  }

  updateStock(id: string, newStock: number): void {
    this.updateProduct(id, { stock: newStock });
  }

  // Método para atualizar estoque (usado em vendas)
  updateProductStock(productId: string, quantityChange: number): void {
    const currentProducts = this.productsSubject.value;
    const updatedProducts = currentProducts.map(product =>
      product.id === productId
        ? { ...product, stock: Math.max(0, product.stock + quantityChange), updatedAt: new Date() }
        : product
    );
    this.productsSubject.next(updatedProducts);
  }

  // Método para obter snapshot dos produtos (usado em vendas)
  getProductsSnapshot(): Product[] {
    return this.productsSubject.value;
  }

  // Métodos de utilidade
  getCategories(): CategoryInfo[] {
    return this.categories;
  }

  getCategoryInfo(categoryId: ProductCategory): CategoryInfo | null {
    return this.categories.find(cat => cat.id === categoryId) || null;
  }

  getStats(): ProductStats {
    const products = this.productsSubject.value;
    
    return {
      totalProducts: products.length,
      availableProducts: products.filter(p => p.available).length,
      unavailableProducts: products.filter(p => !p.available).length,
      lowStockProducts: products.filter(p => p.stock <= 10).length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    };
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
