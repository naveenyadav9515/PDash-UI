import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseTrackerComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  // @ts-ignore
  private readonly apiUrl = inject(ApiService).apiUrl;

  protected readonly expenses = signal<any[]>([]);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly isAdding = signal<boolean>(false);

  protected readonly expenseForm = this.fb.nonNullable.group({
    amount: [null, [Validators.required, Validators.min(1)]],
    merchant: ['', Validators.required],
    category: ['Food', Validators.required],
    paymentMethod: ['UPI', Validators.required],
    tags: [''],
    notes: ['']
  });

  ngOnInit() {
    this.fetchExpenses();
  }

  protected fetchExpenses() {
    this.isLoading.set(true);
    this.http.get<{status: string, data: any[]}>(`${this.apiUrl}/expenses`).subscribe({
      next: (res) => {
        this.expenses.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  protected submitExpense() {
    if (this.expenseForm.invalid) return;

    const rawValue = this.expenseForm.getRawValue();
    const payload = {
      ...rawValue,
      tags: rawValue.tags ? rawValue.tags.split(',').map(t => t.trim()) : []
    };

    this.isAdding.set(true);
    this.http.post(`${this.apiUrl}/expenses`, payload).subscribe({
      next: () => {
        this.isAdding.set(false);
        this.expenseForm.reset({ category: 'Food', paymentMethod: 'UPI' });
        this.fetchExpenses(); // Refresh list
      },
      error: () => this.isAdding.set(false)
    });
  }
}
