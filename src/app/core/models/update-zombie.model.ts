export interface UpdateZombieRequest {
  id: number;
  tipo: string;
  tiempoDisparo: number;
  balasNecesarias: number;
  puntajeBase: number;
  nivelAmenaza: number;
  activo: boolean;
}