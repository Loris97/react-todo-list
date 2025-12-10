// src/types/task.ts
export interface Task {
  id: number;
  nome: string;
  completata: boolean;
  categoria?: string;
  dataCreazione: Date;
  dataModifica?: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TaskStats {
  totali: number;
  completati: number;
  attivi: number;
  perCategoria: Record<string, number>;
}
