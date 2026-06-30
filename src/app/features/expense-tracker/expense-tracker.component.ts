import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly expenses = signal<any[]>([]);
  protected readonly pendingTransactions = signal<any[]>([]);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly isAdding = signal<boolean>(false);
  protected readonly activePendingId = signal<string | null>(null);

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
    
    // Silently sync new emails in the background
    this.http.post(`${this.apiUrl}/expenses/sync`, {}).subscribe({
      next: () => this.fetchPendingTransactions(),
      error: () => this.fetchPendingTransactions() // Still fetch what we have if sync fails
    });
    
    // Check for Google OAuth code
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.completeGmailConnection(code);
      }
    });
  }

  protected completeGmailConnection(code: string) {
    const redirectUri = window.location.origin + window.location.pathname;
    this.http.post(`${this.apiUrl}/auth/google/connect`, { code, redirectUri }).subscribe({
      next: () => {
        alert('Gmail successfully connected for automated logging!');
        this.router.navigate([], { queryParams: { code: null, scope: null, authuser: null, prompt: null }, queryParamsHandling: 'merge' });
      },
      error: (err) => {
        console.error('Failed to connect Gmail', err);
        alert('Failed to connect Gmail. Please try again.');
        this.router.navigate([], { queryParams: { code: null, scope: null, authuser: null, prompt: null }, queryParamsHandling: 'merge' });
      }
    });
  }

  protected connectGmail() {
    const redirectUri = window.location.origin + window.location.pathname;
    this.http.get<{status: string, data: {url: string}}>(`${this.apiUrl}/auth/google/url?redirectUri=${encodeURIComponent(redirectUri)}`).subscribe({
      next: (res) => {
        window.location.href = res.data.url;
      },
      error: (err) => console.error('Failed to get auth URL', err)
    });
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

  protected fetchPendingTransactions() {
    this.http.get<{status: string, data: any[]}>(`${this.apiUrl}/expenses/pending`).subscribe({
      next: (res) => {
        this.pendingTransactions.set(res.data);
      },
      error: (err) => console.error('Error fetching pending transactions', err)
    });
  }

  protected processPending(id: string, action: 'approve' | 'ignore') {
    this.http.post(`${this.apiUrl}/expenses/pending/${id}`, { action }).subscribe({
      next: () => {
        this.fetchPendingTransactions();
        if (action === 'approve') {
          this.fetchExpenses(); // Refresh expense list as it got approved
        }
      },
      error: (err) => console.error('Error processing transaction', err)
    });
  }

  protected reviewPending(ptx: any) {
    this.activePendingId.set(ptx._id);
    this.expenseForm.patchValue({
      amount: ptx.amount,
      merchant: ptx.merchant,
      paymentMethod: ptx.paymentMethod,
      category: ptx.category || 'Food'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected cancelReview() {
    this.activePendingId.set(null);
    this.expenseForm.reset({ category: 'Food', paymentMethod: 'UPI' });
  }

  protected simulateAutoLog() {
    this.http.post(`${this.apiUrl}/expenses/pending/simulate`, {}).subscribe({
      next: () => {
        this.fetchPendingTransactions();
      },
      error: (err) => console.error('Error simulating auto log', err)
    });
  }

  protected submitExpense() {
    if (this.expenseForm.invalid) return;

    const rawValue = this.expenseForm.getRawValue();
    const payload = {
      ...rawValue,
      tags: rawValue.tags ? rawValue.tags.split(',').map((t: string) => t.trim()) : []
    };

    this.isAdding.set(true);
    
    const pendingId = this.activePendingId();
    if (pendingId) {
      this.http.post(`${this.apiUrl}/expenses/pending/${pendingId}`, { action: 'approve', ...payload }).subscribe({
        next: () => {
          this.isAdding.set(false);
          this.activePendingId.set(null);
          this.expenseForm.reset({ category: 'Food', paymentMethod: 'UPI' });
          this.fetchPendingTransactions();
          this.fetchExpenses(); // Refresh list
        },
        error: () => this.isAdding.set(false)
      });
    } else {
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
}
