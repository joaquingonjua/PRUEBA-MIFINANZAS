import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovesService {
  player1Move!: string;
  player2Move!: string;

  setPlayer1Move(move: string) {
    this.player1Move = move;
  }

  setPlayer2Move(move: string) {
    this.player2Move = move;
  }

  getMoves() {
    return {
      moveP1: this.player1Move,
      moveP2: this.player2Move,
    };
  }

  constructor() {}
}
