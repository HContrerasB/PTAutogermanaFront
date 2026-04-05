import { Component, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs/operators';

import { Simulation as SimulationService } from '../../core/services/simulation';
import { SimulationRequest, SimulationResponse } from '../../core/models/simulation.model';

interface ResultadoEstrategia {
  puntaje: number;
  zombiesEliminados: number;
  balasUsadas: number;
  tiempoUsado: number;
  estrategia: string[];
}

interface HistorialSimulacion {
  fecha: string;
  balas: number;
  tiempo: number;
  puntaje: number;
  resultado: string;
}

@Component({
  selector: 'app-simulacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './simulacion.html',
  styleUrl: './simulacion.scss'
})
export class Simulacion {
  private readonly fb = inject(FormBuilder);
  private readonly simulationService = inject(SimulationService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);

  simulationForm: FormGroup = this.fb.group({
    balas: [null, [Validators.required, Validators.min(1)]],
    tiempo: [null, [Validators.required, Validators.min(1)]]
  });

  loading = false;
  simulationStarted = false;
  errorMessage = '';
  resultado: ResultadoEstrategia | null = null;

  displayedColumns: string[] = ['fecha', 'balas', 'tiempo', 'puntaje', 'resultado'];
  historial: HistorialSimulacion[] = [];

  get f() {
    return this.simulationForm.controls;
  }

  simular(): void {
    if (this.simulationForm.invalid) {
      this.simulationForm.markAllAsTouched();
      return;
    }

    const balas = Number(this.simulationForm.value.balas);
    const tiempo = Number(this.simulationForm.value.tiempo);

    const request: SimulationRequest = {
      bullets: balas,
      secondsAvailable: tiempo
    };

    this.loading = true;
    this.simulationStarted = true;
    this.resultado = null;
    this.errorMessage = '';

    this.cdr.detectChanges();

    this.simulationService
      .simulate(request)
      .pipe(
        finalize(() => {
          this.ngZone.run(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
        })
      )
      .subscribe({
        next: (response: SimulationResponse) => {
          this.ngZone.run(() => {
            const result = response.strategyResult;

            this.resultado = {
              puntaje: result.totalScore,
              zombiesEliminados: response.totalZombiesEliminados,
              balasUsadas: result.bulletsUsed,
              tiempoUsado: result.secondsUsed,
              estrategia: result.strategy.map(
                zombie => `${zombie.tipo} x${zombie.cantidad} (Amenaza ${zombie.nivelAmenaza})`
              )
            };

            this.historial = [
              {
                fecha: new Date().toLocaleString('es-CO'),
                balas,
                tiempo,
                puntaje: result.totalScore,
                resultado: `Simulación #${response.simulationId}`
              },
              ...this.historial
            ];

            this.errorMessage = '';
            this.cdr.detectChanges();
          });
        },
        error: (error) => {
          this.ngZone.run(() => {
            console.error('Error al simular defensa:', error);
            console.log('Body error:', error?.error);
            console.log('Request enviado:', request);

            this.errorMessage = this.obtenerMensajeError(error);
            this.resultado = null;
            this.cdr.detectChanges();
          });
        }
      });
  }

  limpiar(): void {
    this.simulationForm.reset();
    this.resultado = null;
    this.loading = false;
    this.simulationStarted = false;
    this.errorMessage = '';
    this.cdr.detectChanges();
  }

  private obtenerMensajeError(error: any): string {
    if (error?.error?.message) {
      return error.error.message;
    }

    if (error?.error?.errors) {
      return Object.entries(error.error.errors)
        .map(([campo, mensajes]) => `${campo}: ${(mensajes as string[]).join(', ')}`)
        .join(' | ');
    }

    if (error?.status === 0) {
      return 'No fue posible conectar con el backend. Verifica CORS, API Key o que la API esté encendida.';
    }

    return 'Ocurrió un error al simular la defensa.';
  }
}