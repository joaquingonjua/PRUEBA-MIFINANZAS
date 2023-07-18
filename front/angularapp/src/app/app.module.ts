import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Mis componentes
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { AppRoutingModule } from './app-routing.module';
import { RoundResultComponent } from './components/round-result/round-result.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';

//Componentes de Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Modulos
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    HomeComponent,
    GameComponent,
    RoundResultComponent,
    GameResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    NgFor,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
