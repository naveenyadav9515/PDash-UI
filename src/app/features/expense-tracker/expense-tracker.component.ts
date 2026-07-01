import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Expense,
  ExpensePayload,
  ExpenseService,
  PendingTransaction
} from '@core/services/expense.service';
import { NotificationService } from '@core/services/notification.service';
import { environment } from '@env/environment';

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
  private readonly expenseService = inject(ExpenseService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly expenses = signal<Expense[]>([]);
  protected readonly pendingTransactions = signal<PendingTransaction[]>([]);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly isAdding = signal<boolean>(false);
  protected readonly activePendingId = signal<string | null>(null);
  protected readonly canSimulateAutoLog = !environment.production && environment.featureFlags.enableExpenseSimulator;

  protected readonly expenseForm = this.fb.nonNullable.group({
    amount: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
    merchant: ['', Validators.required],
    category: ['Food', Validators.required],
    paymentMethod: ['UPI', Validators.required],
    tags: [''],
    notes: ['']
  });

  ngOnInit() {
    this.fetchExpenses();
    
    // Silently sync new emails in the background
    this.expenseService.syncExpenses().subscribe({
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
    this.expenseService.completeGmailConnection(code, redirectUri).subscribe({
      next: () => {
        this.notificationService.success('Gmail connected for automated logging', 'Connected');
        this.router.navigate([], { queryParams: { code: null, scope: null, authuser: null, prompt: null }, queryParamsHandling: 'merge' });
      },
      error: (err) => {
        console.error('Failed to connect Gmail', err);
        this.notificationService.error('Failed to connect Gmail. Please try again.', 'Connection Failed');
        this.router.navigate([], { queryParams: { code: null, scope: null, authuser: null, prompt: null }, queryParamsHandling: 'merge' });
      }
    });
  }

  protected connectGmail() {
    const redirectUri = window.location.origin + window.location.pathname;
    this.expenseService.getGmailConnectionUrl(redirectUri).subscribe({
      next: (res) => {
        window.location.href = res.data.url;
      },
      error: (err) => {
        console.error('Failed to get auth URL', err);
        this.notificationService.error('Gmail connection is not configured yet.', 'Connection Failed');
      }
    });
  }

  protected fetchExpenses() {
    this.isLoading.set(true);
    this.expenseService.fetchExpenses().subscribe({
      next: (res) => {
        this.expenses.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  protected fetchPendingTransactions() {
    this.expenseService.fetchPendingTransactions().subscribe({
      next: (res) => {
        this.pendingTransactions.set(res.data);
      },
      error: (err) => console.error('Error fetching pending transactions', err)
    });
  }

  protected processPending(id: string, action: 'approve' | 'ignore') {
    this.expenseService.processPendingTransaction(id, { action }).subscribe({
      next: () => {
        this.fetchPendingTransactions();
        if (action === 'approve') {
          this.fetchExpenses(); // Refresh expense list as it got approved
        }
      },
      error: (err) => console.error('Error processing transaction', err)
    });
  }

  protected reviewPending(ptx: PendingTransaction) {
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
    this.expenseService.simulateAutoLog().subscribe({
      next: () => {
        this.fetchPendingTransactions();
      },
      error: (err) => console.error('Error simulating auto log', err)
    });
  }

  protected submitExpense() {
    if (this.expenseForm.invalid) return;

    const rawValue = this.expenseForm.getRawValue();
    const payload: ExpensePayload = {
      ...rawValue,
      amount: Number(rawValue.amount),
      tags: rawValue.tags ? rawValue.tags.split(',').map((t: string) => t.trim()) : []
    };

    this.isAdding.set(true);
    
    const pendingId = this.activePendingId();
    if (pendingId) {
      this.expenseService.processPendingTransaction(pendingId, { action: 'approve', ...payload }).subscribe({
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
      this.expenseService.createExpense(payload).subscribe({
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
