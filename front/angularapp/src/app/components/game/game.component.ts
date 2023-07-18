import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidaService } from 'src/app/services/partida.service';
import { Partida } from 'src/app/interfaces/partida';
import { Ronda } from 'src/app/interfaces/ronda';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovesService } from 'src/app/services/moves.service';
import { RondaService } from 'src/app/services/ronda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoundResultComponent } from '../round-result/round-result.component';
import { RoundsNumberService } from 'src/app/services/rounds-number.service';

interface Play {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  partidaId: number;
  round!: number;
  partidaData!: Partida;
  player1Name!: string;
  player2Name!: string;
  selectedPlay!: Play;

  formP1Move: FormGroup;
  formP2Move: FormGroup;

  p1Move!: string;
  p2Move!: string;

  allRounds: any = null;

  p1WinsCount: number = 0;
  p2WinsCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _partidaService: PartidaService,
    private _rondaService: RondaService,
    private _roundNumberService: RoundsNumberService,
    private fb: FormBuilder,
    private movesService: MovesService,
    private _snackBar: MatSnackBar
  ) {
    this.partidaId = Number(this.route.snapshot.paramMap.get('partidaId')); //Obtengo el id desde la Url

    this.formP1Move = this.fb.group({ p1Move: ['', Validators.required] });
    this.formP2Move = this.fb.group({ p2Move: ['', Validators.required] });
  }

  plays: Play[] = [
    { value: 'rock', viewValue: 'Rock' },
    { value: 'paper', viewValue: 'Paper' },
    { value: 'scissors', viewValue: 'Scissors' },
  ];

  ngOnInit() {
    this.obtenerPartida();
    try {
      this.getRondasAndGetWinnerGame();
    } catch (err) {
      console.log(err);
    }
  }

  playP1() {
    this.movesService.setPlayer1Move(this.formP1Move.value.p1Move);
    this.router.navigate([`/gamep2/${this.partidaId}`]);
  }

  playP2() {
    this.movesService.setPlayer2Move(this.formP2Move.value.p2Move);

    //armo el objeto
    const round: Ronda = {
      roundNumber: this._roundNumberService.getRound(),
      p1Move: this.movesService.getMoves().moveP1,
      p2Move: this.movesService.getMoves().moveP2,
      partidaId: this.partidaId,
    };

    this._rondaService.addRonda(round).subscribe((data) => {
      this.mensajeExito();
      this.router.navigate([
        `/round-result/${data.partidaId}/${data.roundResult}`,
      ]);
    });
  }

  obtenerPartida() {
    this._partidaService.getPartida(this.partidaId).subscribe((data) => {
      this.partidaData = data;
    });
  }

  getRondasAndGetWinnerGame() {
    this._rondaService
      .getRondasByPartidaId(this.partidaId)
      .subscribe((data) => {
        this.allRounds = data;

        for (let round of this.allRounds) {
          if (round.roundResult == 'p1') {
            this.p1WinsCount += 1;
          }
          if (round.roundResult == 'p2') {
            this.p2WinsCount += 1;
          }
        }

        if (this.p1WinsCount == 3 && this.partidaData !== null) {
          this.router.navigate([`game-result/${this.partidaId}/p1`]);
        }
        if (this.p2WinsCount == 3 && this.partidaData !== null) {
          this.router.navigate([`game-result/${this.partidaId}/p2`]);
        }
      });
  }

  checkUrl(str: string): boolean {
    return this.router.url.includes(str);
  }

  //Creo el mensaje de exito.
  mensajeExito() {
    this._snackBar.open(`La ronda fue exitosa!`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
