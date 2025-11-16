import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductService } from '../../../services/product.service';
import { Product, ProductFormData, ProductCategory } from '../../../shared/models/product.model';

// Import child components
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';

interface Category {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

interface Tab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    TabNavigationComponent,
    ProductTableComponent,
    CategoryTableComponent,
    UserTableComponent
  ],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Tab state
  activeTab = 'products';
  
  // Tab configuration
  tabs: Tab[] = [
    { id: 'products', label: 'Produtos', icon: 'inventory_2' },
    { id: 'categories', label: 'Categorias', icon: 'folder' },
    { id: 'users', label: 'Usuários', icon: 'people' }
  ];
  
  // Products
  products: Product[] = [];

  // Categories
  availableCategories: Category[] = [
    { id: 'cafes', name: 'Cafés Especiais' },
    { id: 'bebidas', name: 'Bebidas Geladas' },
    { id: 'doces', name: 'Doces e Sobremesas' },
    { id: 'salgados', name: 'Salgados' },
    { id: 'paes', name: 'Pães' }
  ];

  // Users (mock data)
  mockUsers: User[] = [
    { id: 'u1', name: 'Admin Sid', email: 'admin@sidcafe.com', role: 'admin' },
    { id: 'u2', name: 'Funcionário', email: 'staff@sidcafe.com', role: 'staff' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Tab navigation
  onTabChange(tabId: string) {
    this.activeTab = tabId;
  }

  // Product methods
  loadProducts() {
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error: any) => {
          console.error('Erro ao carregar produtos:', error);
        }
      });
  }

  onProductEdit(updatedProduct: Product) {
    this.productService.updateProduct(updatedProduct.id, {
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      image: updatedProduct.image,
      category: updatedProduct.category,
      available: updatedProduct.available,
      stock: updatedProduct.stock
    });
  }

  onProductDelete(product: Product) {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      this.productService.deleteProduct(product.id);
    }
  }

  onProductCreate(productData: ProductFormData) {
    this.productService.addProduct(productData);
  }

  // Category methods
  onCategoryEdit(updatedCategory: Category) {
    const index = this.availableCategories.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      this.availableCategories[index] = updatedCategory;
    }
  }

  onCategoryDelete(category: Category) {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) {
      const index = this.availableCategories.findIndex(c => c.id === category.id);
      if (index !== -1) {
        this.availableCategories.splice(index, 1);
      }
    }
  }

  onCategoryCreate(newCategory: Category) {
    this.availableCategories.push(newCategory);
  }
}