import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulationRequest, SimulationResponse } from '../models/simulation.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Simulation {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/defense`;

  simulate(request: SimulationRequest): Observable<SimulationResponse> {
    const headers = new HttpHeaders({
      'X-API-KEY': 'ZSAFE-LOCAL-DEV-2026'
    });

    return this.http.post<SimulationResponse>(`${this.baseUrl}/simulate`, request, { headers });
  }
}