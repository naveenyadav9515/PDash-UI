import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { FeaturesResponse, HelloResponse, AuthResponse } from '@core/models/api-response.model';
/**
 * Stateless API client service.
 *
 * Encapsulates all HTTP communication with the backend API.
 * Components must NEVER call HttpClient directly (§5.1).
 *
 * API URL is resolved dynamically:
 * - Development (localhost): `http://localhost:5000/api`
 * - Production (Render): auto-mapped from frontend hostname
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  /** Request timeout in milliseconds (§5.4) */
  private readonly REQUEST_TIMEOUT_MS = 15000;

  /**
   * Resolves the API base URL dynamically based on the current environment.
   * Uses `isPlatformBrowser` for SSR safety (§5.3).
   */
  public get apiUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      const host = window.location.hostname;
      if (host !== 'localhost' && host !== '127.0.0.1') {
        return `https://${host.replace('-ui', '-services')}/api`;
      }
    }
    return 'http://localhost:5000/api';
  }

  /**
   * Fetches the hello/health-check response from the backend.
   * @returns Observable of the hello response envelope
   */
  fetchHello(): Observable<HelloResponse> {
    return this.http.get<HelloResponse>(`${this.apiUrl}/hello`).pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetches the list of application features from the backend.
   * @returns Observable of the features response envelope
   */
  fetchFeatures(): Observable<FeaturesResponse> {
    return this.http.get<FeaturesResponse>(`${this.apiUrl}/features`).pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      catchError((error: unknown) => throwError(() => error))
    );
  }

  /**
   * Registers a new user.
   */
  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData).pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      catchError((error: unknown) => throwError(() => error))
    );
  }

  /**
   * Logs in an existing user with email and password.
   */
  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      catchError((error: unknown) => throwError(() => error))
    );
  }

  /**
   * Authenticates a user using a Google OAuth ID Token.
   */
  loginWithGoogle(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/google`, { token }).pipe(
      timeout(this.REQUEST_TIMEOUT_MS),
      catchError((error: unknown) => throwError(() => error))
    );
  }
}
