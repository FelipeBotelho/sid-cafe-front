import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, Product } from '../shared/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  // Dados mock das categorias
  private categoriesData: Category[] = [
    { id: '1', name: 'Cafés Especiais', description: 'Nossos melhores grãos selecionados', sortOrder: 1 },
    { id: '2', name: 'Salgados', description: 'Deliciosos salgados frescos', sortOrder: 2 },
    { id: '3', name: 'Doces e Sobremesas', description: 'Irresistíveis sobremesas artesanais', sortOrder: 3 },
    { id: '4', name: 'Bebidas Geladas', description: 'Refrescantes bebidas especiais', sortOrder: 4 },
  ];

  // Dados mock dos produtos
  private productsData: Product[] = [
    { id: 'p1', name: 'Espresso Intenso', description: 'Café forte e encorpado com notas de chocolate.', price: 7.50, categoryId: '1', stock:9, available: true, imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop' },
    { id: 'p2', name: 'Cappuccino Cremoso', description: 'Espresso, leite vaporizado e espuma perfeita.', price: 12.00, categoryId: '1', stock: 30, available: true, imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop' },
    { id: 'p3', name: 'Latte Macchiato', description: 'Camadas perfeitas de café, leite e espuma.', price: 14.00, categoryId: '1', stock: 25, available: true, imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' },
    
    { id: 'p4', name: 'Pão de Queijo', description: 'Tradicional pão de queijo mineiro quentinho.', price: 5.00, categoryId: '2', stock: 100, available: true, imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop' },
    { id: 'p5', name: 'Coxinha de Frango', description: 'Salgado frito com recheio de frango cremoso.', price: 8.00, categoryId: '2', stock: 40, available: true, imageUrl: 'https://images.unsplash.com/photo-1603729362753-f8162ac6ab39?w=400&h=300&fit=crop' },
    { id: 'p6', name: 'Sanduíche Natural', description: 'Pão integral com peito de peru e salada.', price: 16.00, categoryId: '2', stock: 20, available: true, imageUrl: 'https://images.unsplash.com/photo-1567234669003-ddc38e0d4c75?w=400&h=300&fit=crop' },
    
    { id: 'p7', name: 'Torta de Limão', description: 'Fatia de torta com merengue suíço cremoso.', price: 15.00, categoryId: '3', stock: 15, available: true, imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop' },
    { id: 'p8', name: 'Brownie de Chocolate', description: 'Brownie quentinho com calda de chocolate.', price: 12.00, categoryId: '3', stock: 30, available: true, imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop' },
    { id: 'p9', name: 'Croissant de Chocolate', description: 'Massa folhada com recheio de chocolate belga.', price: 9.00, categoryId: '3', stock: 0, available: false, imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
    
    { id: 'p10', name: 'Frappuccino de Caramelo', description: 'Bebida gelada com café, leite e caramelo.', price: 18.00, categoryId: '4', stock: 25, available: true, imageUrl: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop' },
    { id: 'p11', name: 'Smoothie de Frutas', description: 'Mix refrescante de frutas da estação.', price: 16.00, categoryId: '4', stock: 35, available: true, imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop' },
    { id: 'p12', name: 'Chá Gelado Artesanal', description: 'Chá premium gelado com limão siciliano.', price: 14.00, categoryId: '4', stock: 20, available: true, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
  ];

  private categoriesSubject = new BehaviorSubject<Category[]>(this.categoriesData);
  private productsSubject = new BehaviorSubject<Product[]>(this.productsData);

  // Getters para acessar os dados
  get categories$(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  get products$(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  // Método para obter produtos por categoria
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return new BehaviorSubject(
      this.productsData.filter(product => product.categoryId === categoryId)
    ).asObservable();
  }

  // Método para obter menu agrupado por categoria
  getGroupedMenu(): Observable<(Category & { products: Product[] })[]> {
    const groupedMenu = this.categoriesData
      .map(category => ({
        ...category,
        products: this.productsData.filter(product => product.categoryId === category.id)
      }))
      .filter(category => category.products.length > 0)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return new BehaviorSubject(groupedMenu).asObservable();
  }
}