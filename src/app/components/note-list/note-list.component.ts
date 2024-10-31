import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.interface';
import { Category } from '../../models/category.interface';
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  standalone: true,
  imports: [CommonModule, NoteCardComponent]
})
export class NoteListComponent {
  @Input() notes: Note[] = [];
  @Input() categories: Category[] = [];
  @Output() editNote = new EventEmitter<Note>();
  @Output() deleteNote = new EventEmitter<string>();
  @Output() addNote = new EventEmitter<void>();

  getCategoryColor(categoryName: string): string {
    const category = this.categories.find(c => c.name === categoryName);
    return category?.color || '#e5e7eb';
  }

  onEditNote(note: Note) {
    this.editNote.emit(note);
  }

  onDeleteNote(noteId: string) {
    this.deleteNote.emit(noteId);
  }

  onAddNote() {
    this.addNote.emit();
  }
}
