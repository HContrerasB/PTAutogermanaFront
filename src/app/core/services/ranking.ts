import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RankingItem } from '../models/ranking.model';

@Injectable({
  providedIn: 'root'
})
export class Ranking {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Defense`;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-API-KEY': 'ZSAFE-LOCAL-DEV-2026'
    });
  }

  getRanking(): Observable<RankingItem[]> {
    return this.http.get<RankingItem[]>(
      `${this.baseUrl}/ranking`,
      { headers: this.getHeaders() }
    );
  }
}