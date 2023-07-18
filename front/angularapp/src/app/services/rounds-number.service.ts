import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoundsNumberService {
  rounds: number = 1;

  nextRound() {
    this.rounds++;
  }

  getRound() {
    return this.rounds;
  }

  resetRounds() {
    this.rounds = 1;
  }

  constructor() {}
}
