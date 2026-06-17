export interface Session {
  id: string;
  instrument: string;
  duration: number;
  tempo: number[] | null;
  notes: string | null;
  createdAt: string;
}

export interface CreateSessionInput {
  instrument: string;
  duration: number;
  tempo?: number[];
  notes?: string;
}
