import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FirebaseService } from './services/firebase.service';
import { Note } from './models/note.interface';
import { Category } from './models/category.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    SidebarComponent,
    NoteListComponent,
    NoteCardComponent,
    AddNoteComponent,
    AddCategoryComponent
  ],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <app-sidebar
        [categories]="categories"
        [selectedCategory]="selectedCategory"
        (categorySelected)="onCategorySelected($event)"
        (addNewCategory)="showAddCategory = true">
      </app-sidebar>

      <!-- Main Content -->
      <div class="flex-1 overflow-auto">
        <app-note-list
          [notes]="filteredNotes"
          [categories]="categories"
          (editNote)="onEditNote($event)"
          (deleteNote)="onDeleteNote($event)"
          (addNote)="showAddNote = true">
        </app-note-list>
      </div>

      <!-- Add/Edit Note Modal -->
      @if (showAddNote) {
        <app-add-note
          [categories]="categories"
          [note]="selectedNote"
          (saveNote)="onSaveNote($event)"
          (cancel)="onCancelNote()">
        </app-add-note>
      }

      <!-- Add Category Modal -->
      @if (showAddCategory) {
        <app-add-category
          (saveCategory)="onSaveCategory($event)"
          (cancel)="onCancelCategory()">
        </app-add-category>
      }
    </div>
  `
})
export class AppComponent implements OnInit {
  categories: Category[] = [];
  notes: Note[] = [];
  selectedCategory: string | null = null;
  selectedNote: Note | null = null;
  showAddNote = false;
  showAddCategory = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadNotes();
  }

  get filteredNotes(): Note[] {
    if (!this.selectedCategory) return this.notes;
    return this.notes.filter(note => note.category === this.selectedCategory);
  }

  private loadCategories() {
    this.firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private loadNotes() {
    this.firebaseService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  onCategorySelected(categoryId: string | null) {
    this.selectedCategory = categoryId;
  }

  async onSaveCategory(category: Partial<Category>) {
    await this.firebaseService.addCategory(category);
    this.showAddCategory = false;
    this.loadCategories();
  }

  onCancelCategory() {
    this.showAddCategory = false;
  }

  async onSaveNote(note: Partial<Note>) {
    if (note.id) {
      await this.firebaseService.updateNote(note.id, note);
    } else {
      await this.firebaseService.addNote(note);
    }
    this.showAddNote = false;
    this.selectedNote = null;
    this.loadNotes();
  }

  onEditNote(note: Note) {
    this.selectedNote = note;
    this.showAddNote = true;
  }

  async onDeleteNote(noteId: string) {
    await this.firebaseService.deleteNote(noteId);
    this.loadNotes();
  }

  onCancelNote() {
    this.showAddNote = false;
    this.selectedNote = null;
  }
}
