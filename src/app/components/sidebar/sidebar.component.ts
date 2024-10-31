import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategory: string | null = null;
  @Output() categorySelected = new EventEmitter<string | null>();
  @Output() addNewCategory = new EventEmitter<void>();

  selectCategory(categoryId: string | null) {
    this.categorySelected.emit(categoryId);
  }

  onAddCategory() {
    this.addNewCategory.emit();
  }
}
