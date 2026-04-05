export interface CreateZombieRequest {
  tipo: string;
  tiempoDisparo: number;
  balasNecesarias: number;
  puntajeBase: number;
  nivelAmenaza: number;
  activo: boolean;
}