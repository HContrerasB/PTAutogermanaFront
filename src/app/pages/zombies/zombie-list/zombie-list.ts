import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { ZombieService } from '../../../core/services/zombie';
import { Zombie } from '../../../core/models/zombie.model';

@Component({
  selector: 'app-zombie-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './zombie-list.html',
  styleUrl: './zombie-list.scss'
})
export class ZombieList implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly zombieService = inject(ZombieService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  filterForm: FormGroup = this.fb.group({
    id: [''],
    estado: ['todos']
  });

  loading = false;
  errorMessage = '';

  zombies: Zombie[] = [];
  zombiesFiltrados: Zombie[] = [];
  zombiesPaginados: Zombie[] = [];

  displayedColumns: string[] = [
    'id',
    'tipo',
    'tiempoDisparo',
    'balasNecesarias',
    'puntajeBase',
    'nivelAmenaza',
    'activo',
    'acciones'
  ];

  pageSize = 10;
  currentPage = 1;
  totalPages = 1;

  ngOnInit(): void {
    this.cargarZombies();
  }

  get f() {
    return this.filterForm.controls;
  }

  cargarZombies(): void {
    this.loading = true;
    this.errorMessage = '';

    this.zombieService.getAll().subscribe({
      next: (response: Zombie[]) => {
        this.zombies = Array.isArray(response) ? response : [];
        this.aplicarFiltros();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        console.error('Error cargando zombies:', error);
        this.errorMessage = 'No fue posible cargar la lista de zombies.';
        this.cdr.detectChanges();
      }
    });
  }

  aplicarFiltros(): void {
    const idValue = this.filterForm.value.id?.toString().trim();
    const estadoValue = this.filterForm.value.estado;

    this.zombiesFiltrados = this.zombies.filter((zombie) => {
      const cumpleId = !idValue || zombie.id === Number(idValue);

      const cumpleEstado =
        estadoValue === 'todos' ||
        (estadoValue === 'activo' && zombie.activo) ||
        (estadoValue === 'inactivo' && !zombie.activo);

      return cumpleId && cumpleEstado;
    });

    this.currentPage = 1;
    this.totalPages = Math.max(1, Math.ceil(this.zombiesFiltrados.length / this.pageSize));
    this.actualizarPaginado();
  }

  limpiarFiltros(): void {
    this.filterForm.reset({
      id: '',
      estado: 'todos'
    });

    this.aplicarFiltros();
  }

  actualizarPaginado(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.zombiesPaginados = this.zombiesFiltrados.slice(start, end);
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

  crearZombie(): void {
    this.router.navigate(['/zombies/nuevo']);
  }

  editarZombie(id: number): void {
    this.router.navigate(['/zombies/editar', id]);
  }

  getEstadoLabel(activo: boolean): string {
    return activo ? 'Activo' : 'Inactivo';
  }
}