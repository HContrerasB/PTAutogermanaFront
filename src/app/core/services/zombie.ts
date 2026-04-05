import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateZombieRequest } from '../models/create-zombie.model';
import { UpdateZombieRequest } from '../models/update-zombie.model';
import { ZombieActionResponse } from '../models/zombie-action-response.model';
import { Zombie } from '../models/zombie.model';

@Injectable({
  providedIn: 'root'
})
export class ZombieService  {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Zombies`;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-API-KEY': 'ZSAFE-LOCAL-DEV-2026'
    });
  }

  getAll(): Observable<Zombie[]> {
    return this.http.get<Zombie[]>(
      this.baseUrl,
      { headers: this.getHeaders() }
    );
  }

  getById(id: number): Observable<Zombie> {
    return this.http.get<Zombie>(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  create(request: CreateZombieRequest): Observable<ZombieActionResponse> {
    return this.http.post<ZombieActionResponse>(
      this.baseUrl,
      request,
      { headers: this.getHeaders() }
    );
  }

  update(id: number, request: UpdateZombieRequest): Observable<ZombieActionResponse> {
    return this.http.put<ZombieActionResponse>(
      `${this.baseUrl}/${id}`,
      request,
      { headers: this.getHeaders() }
    );
  }

  delete(id: number): Observable<ZombieActionResponse> {
    return this.http.delete<ZombieActionResponse>(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}