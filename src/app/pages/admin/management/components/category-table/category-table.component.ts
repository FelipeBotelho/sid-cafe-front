import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent {
  @Input() categories: Category[] = [];

  @Output() onEdit = new EventEmitter<Category>();
  @Output() onDelete = new EventEmitter<Category>();
  @Output() onCreate = new EventEmitter<Category>();

  showCategoryDialog = false;
  isEditingCategory = false;
  selectedCategory: Category | null = null;
  
  categoryForm = {
    name: ''
  };

  openCategoryDialog(category?: Category) {
    this.selectedCategory = category || null;
    this.isEditingCategory = !!category;
    
    if (category) {
      this.categoryForm = {
        name: category.name
      };
    } else {
      this.resetCategoryForm();
    }
    
    this.showCategoryDialog = true;
  }

  closeCategoryDialog() {
    this.showCategoryDialog = false;
    this.selectedCategory = null;
    this.isEditingCategory = false;
    this.resetCategoryForm();
  }

  private resetCategoryForm() {
    this.categoryForm = {
      name: ''
    };
  }

  saveCategory() {
    if (!this.categoryForm.name) {
      alert('Nome é obrigatório.');
      return;
    }

    const categoryData = {
      name: this.categoryForm.name
    };

    if (this.isEditingCategory && this.selectedCategory) {
      // Emit edit event
      const updatedCategory: Category = {
        ...this.selectedCategory,
        name: this.categoryForm.name
      };
      this.onEdit.emit(updatedCategory);
    } else {
      // Emit create event
      const newCategory: Category = {
        id: `cat${Date.now()}`,
        name: this.categoryForm.name
      };
      this.onCreate.emit(newCategory);
    }
    
    this.closeCategoryDialog();
  }

  deleteCategory(category: Category) {
    this.onDelete.emit(category);
  }
}