import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidaService } from 'src/app/services/partida.service';
import { Partida } from 'src/app/interfaces/partida';
import { RoundsNumberService } from 'src/app/services/rounds-number.service';

@Component({
  selector: 'app-round-result',
  templateUrl: './round-result.component.html',
  styleUrls: ['./round-result.component.css'],
})
export class RoundResultComponent {
  partidaId: number;
  roundResult: string;
  partidaData!: Partida;
  winnerName!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _partidaService: PartidaService,
    private _roundsNumberService: RoundsNumberService
  ) {
    this.partidaId = Number(this.route.snapshot.paramMap.get('partidaId'));
    this.roundResult = String(this.route.snapshot.paramMap.get('winner'));
  }

  ngOnInit() {
    this.obtenerPartidaAndShowResult();
  }

  nextRound(): void {
    this._roundsNumberService.nextRound();
    this.router.navigate([`/gamep1/${this.partidaId}`]);
  }

  obtenerPartidaAndShowResult() {
    this._partidaService.getPartida(this.partidaId).subscribe((data) => {
      if (this.roundResult == 'p1') {
        this.winnerName = data.p1Name;
      }
      if (this.roundResult == 'p2') {
        this.winnerName = data.p2Name;
      }
      this.partidaData = data;
    });
  }
}
