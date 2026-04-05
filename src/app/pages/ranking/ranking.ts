import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Ranking as RankingService } from '../../core/services/ranking';
import { RankingItem } from '../../core/models/ranking.model';

@Component({
  selector: 'app-ranking',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})
export class Ranking implements OnInit {
  private readonly rankingService = inject(RankingService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  errorMessage = '';

  ranking: RankingItem[] = [];
  top3: RankingItem[] = [];
  rankingPaginado: RankingItem[] = [];

  displayedColumns: string[] = [
    'posicion',
    'simulationId',
    'fecha',
    'balasDisponibles',
    'tiempoDisponible',
    'balasUsadas',
    'ZombiesMuertos',
    'tiempoUsado',
    'puntajeTotal'
  ];

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;

  ngOnInit(): void {
    this.cargarRanking();
  }

  cargarRanking(): void {
    this.loading = true;
    this.errorMessage = '';

    this.rankingService.getRanking().subscribe({
      next: (response: RankingItem[]) => {
        const data: RankingItem[] = Array.isArray(response) ? response : [];

        this.ranking = [...data].sort((a, b) => {
          if (b.puntajeTotal !== a.puntajeTotal) {
            return b.puntajeTotal - a.puntajeTotal;
          }

          if (a.balasUsadas !== b.balasUsadas) {
            return a.balasUsadas - b.balasUsadas;
          }

          return a.tiempoUsado - b.tiempoUsado;
        });

        this.top3 = this.ranking.slice(0, 3);

        this.currentPage = 1;
        this.totalPages = Math.max(1, Math.ceil(this.ranking.length / this.pageSize));
        this.actualizarPaginado();

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        console.error('Error cargando ranking:', error);
        this.errorMessage = 'No fue posible cargar el ranking histórico.';
        this.cdr.detectChanges();
      }
    });
  }

  actualizarPaginado(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.rankingPaginado = this.ranking.slice(start, end);
  }

  irPaginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPaginado();
    }
  }

  irPaginaSiguiente(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.actualizarPaginado();
    }
  }

  obtenerPosicion(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';

    const parsed = new Date(fecha);

    if (isNaN(parsed.getTime())) {
      return fecha;
    }

    return parsed.toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getMedalla(index: number): string {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return '🏅';
    }
  }

  getTituloTop(index: number): string {
    switch (index) {
      case 0:
        return 'Primer lugar';
      case 1:
        return 'Segundo lugar';
      case 2:
        return 'Tercer lugar';
      default:
        return 'Clasificado';
    }
  }
}