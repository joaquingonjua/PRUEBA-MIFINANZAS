import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Mis componentes
import { InputComponent } from './components/input/input.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { RoundResultComponent } from './components/round-result/round-result.component';
import { GameResultComponent } from './components/game-result/game-result.component';

const routes: Routes = [
  { path: 'game-result/:partidaId/:winner', component: GameResultComponent },
  { path: 'round-result/:partidaId/:winner', component: RoundResultComponent },
  { path: 'gamep1/:partidaId', component: GameComponent },
  { path: 'gamep2/:partidaId', component: GameComponent },
  { path: 'players', component: InputComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
