import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Product, ProductFormData, ProductCategory } from '../../../../../shared/models/product.model';

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() availableCategories: Category[] = [];

  @Output() onEdit = new EventEmitter<Product>();
  @Output() onDelete = new EventEmitter<Product>();
  @Output() onCreateProduct = new EventEmitter<ProductFormData>();

  showProductDialog = false;
  isEditing = false;
  selectedProduct: Product | null = null;
  
  productForm: ProductFormData = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'cafes' as ProductCategory,
    available: true,
    stock: 0
  };

  openProductDialog(product?: Product) {
    this.selectedProduct = product || null;
    this.isEditing = !!product;
    
    if (product) {
      this.productForm = {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        available: product.available,
        stock: product.stock
      };
    } else {
      this.resetProductForm();
    }
    
    this.showProductDialog = true;
  }

  closeProductDialog() {
    this.showProductDialog = false;
    this.selectedProduct = null;
    this.isEditing = false;
    this.resetProductForm();
  }

  private resetProductForm() {
    this.productForm = {
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'cafes' as ProductCategory,
      available: true,
      stock: 0
    };
  }

  saveProduct() {
    if (!this.isProductFormValid()) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    if (this.isEditing && this.selectedProduct) {
      // Emit edit event with updated product
      const updatedProduct: Product = {
        ...this.selectedProduct,
        ...this.productForm
      };
      this.onEdit.emit(updatedProduct);
    } else {
      // Emit create event with form data
      this.onCreateProduct.emit(this.productForm);
    }
    
    this.closeProductDialog();
  }  private isProductFormValid(): boolean {
    return !!(this.productForm.name && 
              this.productForm.category && 
              this.productForm.price > 0);
  }

  deleteProduct(product: Product) {
    this.onDelete.emit(product);
  }

  getCategoryName(categoryId: ProductCategory): string {
    const category = this.availableCategories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
}