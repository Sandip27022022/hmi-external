import { Component } from '@angular/core';
import { CommonExternalComponent } from '../common-external/common-external.component';

/*
  AstrologyAI Component - Notes App with Edit and Search

  Features:
  - Add, view, edit, delete notes.
  - Search/filter notes by text.
  - Responsive layout.
  - Notes stored in component memory (not persistent).
  - Ready for extension (e.g., categories, cloud sync).

  Please specify if you want more features like categories or cloud sync.
*/

type Note = {
  id: number;
  content: string;
  editing?: boolean;
};

@Component({
  selector: 'app-astrology-ai',
  template: `
    <div class="notes-container">
      <h2>Notes</h2>
      <form (submit)="addNote()" autocomplete="off" class="note-form">
        <textarea
          [(ngModel)]="newNote"
          name="note"
          required
          maxlength="500"
          placeholder="Write your note here..."
          class="note-input"
        ></textarea>
        <button type="submit" [disabled]="!newNote.trim()" class="add-btn">Add Note</button>
      </form>
      <input
        [(ngModel)]="searchTerm"
        type="text"
        placeholder="Search notes..."
        class="search-input"
      />
      <div *ngIf="filteredNotes.length === 0" class="empty-msg">No notes found.</div>
      <ul class="notes-list">
        <li *ngFor="let note of filteredNotes" class="note-item">
          <span *ngIf="!note.editing" class="note-content">{{ note.content }}</span>
          <textarea
            *ngIf="note.editing"
            [(ngModel)]="note.content"
            class="edit-input"
            (keydown.enter)="saveEdit(note)"
            (blur)="saveEdit(note)"
            rows="2"
            maxlength="500"
          ></textarea>
          <div class="note-actions">
            <button *ngIf="!note.editing" (click)="editNote(note)" class="edit-btn" aria-label="Edit note">✎</button>
            <button *ngIf="note.editing" (click)="saveEdit(note)" class="save-btn" aria-label="Save note">✔</button>
            <button (click)="deleteNote(note.id)" class="delete-btn" aria-label="Delete note">&times;</button>
          </div>
        </li>
      </ul>
      <div class="clarify">
        Need more features? (e.g., categories, cloud sync)
      </div>
    </div>
  `,
  styles: [`
    .notes-container {
      max-width: 440px;
      margin: 40px auto;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 2px 12px #0001;
      background: #fff;
      font-family: Arial, sans-serif;
      text-align: center;
    }
    .note-form {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      margin-bottom: 14px;
    }
    .note-input, .edit-input {
      min-height: 48px;
      resize: vertical;
      padding: 8px;
      font-size: 15px;
      border-radius: 5px;
      border: 1px solid #bbb;
      outline: none;
      width: 100%;
      margin-bottom: 4px;
    }
    .add-btn {
      align-self: flex-end;
      padding: 6px 16px;
      background: #3b82f6;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.15s;
    }
    .add-btn:disabled {
      background: #bbb;
      cursor: not-allowed;
    }
    .search-input {
      width: 100%;
      padding: 7px;
      margin-bottom: 18px;
      font-size: 15px;
      border-radius: 5px;
      border: 1px solid #bbb;
      outline: none;
    }
    .empty-msg {
      color: #888;
      margin: 22px 0 12px 0;
      font-size: 15px;
    }
    .notes-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .note-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: #f9fafb;
      border-radius: 6px;
      margin-bottom: 10px;
      padding: 10px 14px;
      box-shadow: 0 1px 4px #0001;
      word-break: break-word;
    }
    .note-content {
      flex: 1;
      text-align: left;
      font-size: 15px;
      white-space: pre-wrap;
    }
    .note-actions {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-left: 10px;
    }
    .edit-btn, .save-btn, .delete-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #3b82f6;
      padding: 0 2px;
      line-height: 1.2;
    }
    .delete-btn {
      color: #ef4444;
      font-size: 20px;
    }
    .clarify {
      margin-top: 20px;
      color: #555;
      font-size: 15px;
      line-height: 1.5;
    }
  `]
})
export class AstrologyAIComponent extends CommonExternalComponent {
  notes: Note[] = [];
  newNote: string = '';
  searchTerm: string = '';
  private nextId: number = 1;

  get filteredNotes(): Note[] {
    const term = this.searchTerm.trim().toLowerCase();
    return term
      ? this.notes.filter(n => n.content.toLowerCase().includes(term))
      : this.notes;
  }

  addNote(): void {
    const content: string = this.newNote.trim();
    if (!content) return;
    this.notes.unshift({ id: this.nextId++, content });
    this.newNote = '';
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }

  editNote(note: Note): void {
    note.editing = true;
  }

  saveEdit(note: Note): void {
    note.content = note.content.trim();
    note.editing = false;
  }
}