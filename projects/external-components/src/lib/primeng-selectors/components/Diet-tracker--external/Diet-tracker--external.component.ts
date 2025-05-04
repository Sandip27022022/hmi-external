import { Component } from '@angular/core';
import { CommonExternalComponent } from '../common-external/common-external.component';

/*
  Diet-tracker-Component Features:
  - Add, edit, and delete food entries with calories and meal type.
  - Nutrition breakdown: carbs, protein, fat per entry.
  - Displays today's entries and total calorie/macronutrient intake.
  - Simple daily summary.
*/

interface FoodEntry {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  time: string;
  editing?: boolean;
}

@Component({
  selector: 'app-diet-tracker-',
  template: `
    <div class="diet-tracker-container">
      <h2>Diet Tracker</h2>
      <form (ngSubmit)="addOrUpdateEntry()" #entryForm="ngForm" class="entry-form">
        <input 
          type="text"
          placeholder="Food name"
          [(ngModel)]="foodName"
          name="foodName"
          required
        />
        <input 
          type="number"
          placeholder="Calories"
          [(ngModel)]="calories"
          name="calories"
          required
          min="1"
        />
        <input 
          type="number"
          placeholder="Carbs (g)"
          [(ngModel)]="carbs"
          name="carbs"
          required
          min="0"
        />
        <input 
          type="number"
          placeholder="Protein (g)"
          [(ngModel)]="protein"
          name="protein"
          required
          min="0"
        />
        <input 
          type="number"
          placeholder="Fat (g)"
          [(ngModel)]="fat"
          name="fat"
          required
          min="0"
        />
        <select [(ngModel)]="mealType" name="mealType" required>
          <option value="" disabled selected>Meal Type</option>
          <option *ngFor="let type of mealTypes" [value]="type">{{type}}</option>
        </select>
        <button type="submit" [disabled]="!entryForm.form.valid">
          {{editIndex === -1 ? 'Add Entry' : 'Update Entry'}}
        </button>
        <button *ngIf="editIndex !== -1" type="button" (click)="cancelEdit()">Cancel</button>
      </form>

      <div class="entries-list" *ngIf="foodEntries.length > 0">
        <h3>Today's Entries</h3>
        <ul>
          <li *ngFor="let entry of foodEntries; let i = index">
            <span *ngIf="!entry.editing">
              {{entry.time}} - <strong>{{entry.name}}</strong> ({{entry.mealType}}): 
              {{entry.calories}} kcal, 
              C: {{entry.carbs}}g, 
              P: {{entry.protein}}g, 
              F: {{entry.fat}}g
            </span>
            <span *ngIf="entry.editing">
              Editing...
            </span>
            <button (click)="startEdit(i)" *ngIf="!entry.editing">Edit</button>
            <button (click)="deleteEntry(i)">Delete</button>
          </li>
        </ul>
        <div class="summary">
          <div>Total Calories: <strong>{{getTotal('calories')}}</strong> kcal</div>
          <div>Total Carbs: <strong>{{getTotal('carbs')}}</strong> g</div>
          <div>Total Protein: <strong>{{getTotal('protein')}}</strong> g</div>
          <div>Total Fat: <strong>{{getTotal('fat')}}</strong> g</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .diet-tracker-container {
      max-width: 420px;
      margin: 24px auto;
      padding: 16px;
      border-radius: 8px;
      background: #fafbfc;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      font-family: Arial, sans-serif;
    }
    h2, h3 {
      text-align: center;
    }
    .entry-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }
    .entry-form input, .entry-form select {
      padding: 8px;
      border: 1px solid #cfd8dc;
      border-radius: 4px;
      font-size: 15px;
    }
    .entry-form button {
      background: #2196f3;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-right: 5px;
    }
    .entries-list ul {
      list-style: none;
      padding: 0;
      margin: 0 0 12px 0;
    }
    .entries-list li {
      padding: 6px 0;
      border-bottom: 1px solid #e0e0e0;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .entries-list button {
      margin-left: 7px;
      background: #90caf9;
      color: #222;
      font-size: 13px;
      padding: 4px 8px;
      border-radius: 3px;
      border: none;
      cursor: pointer;
    }
    .entries-list button:hover {
      background: #1976d2;
      color: #fff;
    }
    .summary {
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      color: #388e3c;
    }
    .summary div {
      margin-bottom: 2px;
    }
  `]
})
export class DietTrackerComponent extends CommonExternalComponent {
  foodEntries: FoodEntry[] = [];
  foodName: string = '';
  calories: number | null = null;
  carbs: number | null = null;
  protein: number | null = null;
  fat: number | null = null;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | '' = '';
  readonly mealTypes: Array<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'> = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  editIndex: number = -1;

  addOrUpdateEntry(): void {
    if (
      this.foodName && this.calories !== null && this.mealType &&
      this.carbs !== null && this.protein !== null && this.fat !== null
    ) {
      const now: Date = new Date();
      const entry: FoodEntry = {
        name: this.foodName,
        calories: this.calories,
        carbs: this.carbs,
        protein: this.protein,
        fat: this.fat,
        mealType: this.mealType as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (this.editIndex === -1) {
        this.foodEntries.push(entry);
      } else {
        this.foodEntries[this.editIndex] = { ...entry };
        this.editIndex = -1;
      }
      this.resetForm();
    }
  }

  startEdit(index: number): void {
    const entry: FoodEntry = this.foodEntries[index];
    this.foodName = entry.name;
    this.calories = entry.calories;
    this.carbs = entry.carbs;
    this.protein = entry.protein;
    this.fat = entry.fat;
    this.mealType = entry.mealType;
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.editIndex = -1;
    this.resetForm();
  }

  deleteEntry(index: number): void {
    this.foodEntries.splice(index, 1);
    if (this.editIndex === index) {
      this.cancelEdit();
    }
  }

  getTotal(key: keyof Omit<FoodEntry, 'name' | 'mealType' | 'time' | 'editing'>): number {
    return this.foodEntries.reduce((sum: number, entry: FoodEntry) => sum + (entry[key] || 0), 0);
  }

  private resetForm(): void {
    this.foodName = '';
    this.calories = null;
    this.carbs = null;
    this.protein = null;
    this.fat = null;
    this.mealType = '';
  }
}