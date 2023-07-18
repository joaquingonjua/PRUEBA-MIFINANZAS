import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartidaService } from 'src/app/services/partida.service';
import { Partida } from 'src/app/interfaces/partida';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoundsNumberService } from 'src/app/services/rounds-number.service';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  formNames: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _roundsNumberService: RoundsNumberService,
    private _partidaService: PartidaService,
    private _snackBar: MatSnackBar
  ) {
    this.formNames = this.fb.group({
      player1Name: ['', Validators.required],
      player2Name: ['', Validators.required],
    });
  }

  //accion para el submit del form
  startGame() {
    //Seteo las rondas en 1
    this._roundsNumberService.resetRounds();

    //armo el objeto
    const game: Partida = {
      p1Name: this.formNames.value.player1Name,
      p2Name: this.formNames.value.player2Name,
    };

    //envio el objeto al be
    this._partidaService.addPartida(game).subscribe((data) => {
      this.mensajeExito();
      this.router.navigate([`/gamep1/${data.id}`]);
    });
  }

  //Creo el mensaje de exito.
  mensajeExito() {
    this._snackBar.open(`La Partida fue creada con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
