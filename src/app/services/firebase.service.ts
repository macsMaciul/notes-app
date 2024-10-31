import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, getDocs } from '@angular/fire/firestore';
import { Note } from '../models/note.interface';
import { Category } from '../models/category.interface';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Notes Operations
  async addNote(note: Partial<Note>): Promise<string> {
    const notesRef = collection(this.firestore, 'notes');
    const docRef = await addDoc(notesRef, note);
    return docRef.id;
  }

  async updateNote(id: string, note: Partial<Note>): Promise<void> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    await updateDoc(noteRef, { ...note });
  }

  async deleteNote(id: string): Promise<void> {
    const noteRef = doc(this.firestore, `notes/${id}`);
    await deleteDoc(noteRef);
  }

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    const q = query(notesRef, orderBy('timestamp', 'desc'));
    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Note))
      )
    );
  }

  // Categories Operations
  async addCategory(category: Partial<Category>): Promise<string> {
    const categoriesRef = collection(this.firestore, 'categories');
    const docRef = await addDoc(categoriesRef, category);
    return docRef.id;
  }

  async updateCategory(id: string, category: Partial<Category>): Promise<void> {
    const categoryRef = doc(this.firestore, `categories/${id}`);
    await updateDoc(categoryRef, { ...category });
  }

  async deleteCategory(id: string): Promise<void> {
    const categoryRef = doc(this.firestore, `categories/${id}`);
    await deleteDoc(categoryRef);
  }

  getCategories(): Observable<Category[]> {
    const categoriesRef = collection(this.firestore, 'categories');
    return from(getDocs(categoriesRef)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Category))
      )
    );
  }

  // Helper method to get notes by category
  getNotesByCategory(categoryName: string): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    const q = query(notesRef, orderBy('timestamp', 'desc'));
    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Note))
          .filter(note => note.category === categoryName)
      )
    );
  }
}
