import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PartidaService } from 'src/app/services/partida.service';
import { Partida } from 'src/app/interfaces/partida';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css'],
})
export class GameResultComponent {
  partidaId: number;
  gameWinner: string;

  gameWinnerName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _partidaService: PartidaService
  ) {
    this.partidaId = Number(this.route.snapshot.paramMap.get('partidaId'));
    this.gameWinner = String(this.route.snapshot.paramMap.get('winner'));
  }

  ngOnInit() {
    this.obtenerPartida();
  }

  obtenerPartida() {
    this._partidaService.getPartida(this.partidaId).subscribe((data) => {
      if (this.gameWinner == 'p1') {
        this.gameWinnerName = data.p1Name;
      }
      if (this.gameWinner == 'p2') {
        this.gameWinnerName = data.p2Name;
      }
    });
  }

  newGame(): void {
    this.router.navigate(['/']);
  }
}
