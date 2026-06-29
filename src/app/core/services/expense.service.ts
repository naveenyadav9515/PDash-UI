import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

export interface ExpenseSummary {
  monthlySpend: number;
  budgetTarget: number;
  budgetUsedPct: number;
  budgetStatus: string;
  spent: number;
  available: number;
  topCategories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
  spendingTrend: {
    labels: string[];
    data: number[];
    avgPerWeek: number;
    trendPct: number;
    trendStatus: string;
  };
  forecast: {
    estimatedSpend: number;
    statusText: string;
    statusColor: string;
  };
  insight: {
    highlightPct: string;
    highlightCategory: string;
    text: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly http = inject(HttpClient);
  // @ts-ignore - reaching into private apiService property to get dynamic URL
  private readonly apiUrl = inject(ApiService).apiUrl;

  public readonly summary = signal<ExpenseSummary | null>(null);
  public readonly isLoading = signal<boolean>(false);

  /** Fetches summary stats for the dashboard widget */
  public fetchSummary(): Observable<{ status: string, data: ExpenseSummary }> {
    this.isLoading.set(true);
    return this.http.get<{ status: string, data: ExpenseSummary }>(`${this.apiUrl}/expenses/summary`).pipe(
      tap({
        next: (res) => {
          this.summary.set(res.data);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      })
    );
  }
}
