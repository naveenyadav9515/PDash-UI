import { Component, signal, afterNextRender, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Feature {
  _id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

interface FeaturesResponse {
  status: string;
  count: number;
  data: Feature[];
}

interface HelloResponse {
  status: string;
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api';

  protected readonly userName = 'Naani';
  protected readonly greeting = signal('Hello');
  protected readonly dbStatus = signal<'connecting' | 'connected' | 'error'>('connecting');
  protected readonly features = signal<Feature[]>([]);
  protected readonly apiMessage = signal('');

  constructor() {
    afterNextRender(() => {
      // Set greeting based on time
      const hour = new Date().getHours();
      if (hour < 12) {
        this.greeting.set('Good morning');
      } else if (hour < 17) {
        this.greeting.set('Good afternoon');
      } else {
        this.greeting.set('Good evening');
      }

      // Test API connection
      this.http.get<HelloResponse>(`${this.apiUrl}/hello`).subscribe({
        next: (res) => {
          this.apiMessage.set(res.message);
        },
        error: () => {
          this.dbStatus.set('error');
        }
      });

      // Fetch features from MongoDB
      this.http.get<FeaturesResponse>(`${this.apiUrl}/features`).subscribe({
        next: (res) => {
          this.features.set(res.data);
          this.dbStatus.set('connected');
        },
        error: () => {
          this.dbStatus.set('error');
        }
      });
    });
  }
}
