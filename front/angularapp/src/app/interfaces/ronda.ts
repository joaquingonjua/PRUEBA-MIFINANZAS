export interface Ronda {
  Id?: number; //? quiere decir que no lo voy a ingresar yo
  roundNumber: number;
  p1Move: string;
  p2Move: string;
  roundResult?: string;
  partidaId: number;
}
