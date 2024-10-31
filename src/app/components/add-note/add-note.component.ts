import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Note } from '../../models/note.interface';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddNoteComponent {
  @Input() categories: Category[] = [];
  @Input() set note(value: Note | null) {
    if (value) {
      this.isEditing = true;
      this.noteForm.patchValue({
        id: value.id,
        title: value.title,
        content: value.content,
        category: value.category
      });
    }
  }
  
  @Output() saveNote = new EventEmitter<Partial<Note>>();
  @Output() cancel = new EventEmitter<void>();

  noteForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const formValue = this.noteForm.value;
      const note: Partial<Note> = {
        ...formValue,
        timestamp: new Date()
      };
      this.saveNote.emit(note);
      this.noteForm.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.noteForm.reset();
  }
}
