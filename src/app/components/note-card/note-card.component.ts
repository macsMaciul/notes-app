import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.interface';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Input() categoryColor: string = '#e5e7eb';
  @Output() editNote = new EventEmitter<Note>();
  @Output() deleteNote = new EventEmitter<string>();

  onEdit() {
    this.editNote.emit(this.note);
  }

  onDelete(event: Event) {
    event.stopPropagation();
    if (this.note.id) {
      this.deleteNote.emit(this.note.id);
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
