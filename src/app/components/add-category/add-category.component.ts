import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddCategoryComponent {
  @Output() saveCategory = new EventEmitter<Partial<Category>>();
  @Output() cancel = new EventEmitter<void>();

  categoryForm: FormGroup;
  colors = [
    '#EF4444', // red
    '#F59E0B', // amber
    '#10B981', // emerald
    '#3B82F6', // blue
    '#6366F1', // indigo
    '#8B5CF6', // violet
    '#EC4899', // pink
  ];

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: ['#3B82F6', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.saveCategory.emit(this.categoryForm.value);
      this.categoryForm.reset({color: '#3B82F6'});
    }
  }

  onCancel() {
    this.cancel.emit();
    this.categoryForm.reset({color: '#3B82F6'});
  }
}
