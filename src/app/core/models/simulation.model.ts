export interface SimulationRequest {
  bullets: number;
  secondsAvailable: number;
}

export interface ZombieStrategyItem {
  zombieId: number;
  tipo: string;
  tiempoDisparo: number;
  balasNecesarias: number;
  puntajeBase: number;
  nivelAmenaza: number;
  cantidad:number;
}

export interface StrategyResult {
  bulletsAvailable: number;
  secondsAvailable: number;
  bulletsUsed: number;
  secondsUsed: number;
  totalScore: number;
  strategy: ZombieStrategyItem[];
}

export interface SimulationResponse {
  simulationId: number;
  strategyResult: StrategyResult;
  totalZombiesEliminados: number;
}