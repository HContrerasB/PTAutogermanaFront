import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { ZombieService } from '../../../core/services/zombie';
import { Zombie } from '../../../core/models/zombie.model';
import { CreateZombieRequest } from '../../../core/models/create-zombie.model';
import { UpdateZombieRequest } from '../../../core/models/update-zombie.model';

@Component({
  selector: 'app-zombie-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './zombie-form.html',
  styleUrl: './zombie-form.scss'
})
export class ZombieForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly zombieService = inject(ZombieService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  form: FormGroup = this.fb.group({
    tipo: ['', [Validators.required, Validators.maxLength(100)]],
    tiempoDisparo: [0, [Validators.required, Validators.min(0)]],
    balasNecesarias: [0, [Validators.required, Validators.min(0)]],
    puntajeBase: [0, [Validators.required, Validators.min(0)]],
    nivelAmenaza: [0, [Validators.required, Validators.min(0)]],
    activo: ['true', [Validators.required]]
  });

  loading = false;
  saving = false;
  deleting = false;
  submitted = false;

  isEditMode = false;
  zombieId = 0;

  successMessage = '';
  errorMessage = '';

  estadoOptions = [
    { label: 'Activo', value: 'true' },
    { label: 'Inactivo', value: 'false' }
  ];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.zombieId = Number(idParam);
      this.cargarZombie(this.zombieId);
    }
  }

  get f() {
    return this.form.controls;
  }

  cargarZombie(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.zombieService.getById(id).subscribe({
      next: (response: Zombie) => {
        this.form.patchValue({
          tipo: response.tipo,
          tiempoDisparo: response.tiempoDisparo,
          balasNecesarias: response.balasNecesarias,
          puntajeBase: response.puntajeBase,
          nivelAmenaza: response.nivelAmenaza,
          activo: response.activo ? 'true' : 'false'
        });

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        console.error('Error cargando zombie:', error);
        this.errorMessage = 'No fue posible cargar la información del zombie.';
        this.cdr.detectChanges();
      }
    });
  }

  guardar(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    if (this.isEditMode) {
      this.actualizarZombie();
    } else {
      this.crearZombie();
    }
  }

  crearZombie(): void {
    const request: CreateZombieRequest = {
      tipo: this.form.value.tipo?.trim(),
      tiempoDisparo: Number(this.form.value.tiempoDisparo),
      balasNecesarias: Number(this.form.value.balasNecesarias),
      puntajeBase: Number(this.form.value.puntajeBase),
      nivelAmenaza: Number(this.form.value.nivelAmenaza),
      activo: this.form.value.activo === 'true'
    };

    this.zombieService.create(request).subscribe({
      next: (response) => {
        this.saving = false;
        this.successMessage = response?.message || 'Zombie creado correctamente.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/zombies']);
        }, 900);
      },
      error: (error) => {
        this.saving = false;
        console.error('Error creando zombie:', error);
        this.errorMessage = this.obtenerMensajeError(error, 'No fue posible crear el zombie.');
        this.cdr.detectChanges();
      }
    });
  }

  actualizarZombie(): void {
    const request: UpdateZombieRequest = {
      id: this.zombieId,
      tipo: this.form.value.tipo?.trim(),
      tiempoDisparo: Number(this.form.value.tiempoDisparo),
      balasNecesarias: Number(this.form.value.balasNecesarias),
      puntajeBase: Number(this.form.value.puntajeBase),
      nivelAmenaza: Number(this.form.value.nivelAmenaza),
      activo: this.form.value.activo === 'true'
    };

    this.zombieService.update(this.zombieId, request).subscribe({
      next: (response) => {
        this.saving = false;
        this.successMessage = response?.message || 'Zombie actualizado correctamente.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/zombies']);
        }, 900);
      },
      error: (error) => {
        this.saving = false;
        console.error('Error actualizando zombie:', error);
        this.errorMessage = this.obtenerMensajeError(error, 'No fue posible actualizar el zombie.');
        this.cdr.detectChanges();
      }
    });
  }

  eliminar(): void {
    if (!this.isEditMode || !this.zombieId) {
      return;
    }

    const confirmado = window.confirm('¿Seguro que deseas eliminar este zombie?');

    if (!confirmado) {
      return;
    }

    this.deleting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.zombieService.delete(this.zombieId).subscribe({
      next: (response) => {
        this.deleting = false;
        this.successMessage = response?.message || 'Zombie eliminado correctamente.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/zombies']);
        }, 900);
      },
      error: (error) => {
        this.deleting = false;
        console.error('Error eliminando zombie:', error);
        this.errorMessage = this.obtenerMensajeError(error, 'No fue posible eliminar el zombie.');
        this.cdr.detectChanges();
      }
    });
  }

  volver(): void {
    this.router.navigate(['/zombies']);
  }

  private obtenerMensajeError(error: any, fallback: string): string {
    if (error?.error?.message) {
      return error.error.message;
    }

    if (error?.error?.errors) {
      return Object.entries(error.error.errors)
        .map(([campo, mensajes]) => `${campo}: ${(mensajes as string[]).join(', ')}`)
        .join(' | ');
    }

    return fallback;
  }
}