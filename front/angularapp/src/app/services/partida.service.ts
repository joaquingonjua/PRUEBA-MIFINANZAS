import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partida } from '../interfaces/partida';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  myAppUrl: string = environment.endpoint;
  myApiUrl: string = 'api/Partida';

  constructor(private http: HttpClient) {}

  //No lo voy a usar
  getPartidas(): Observable<Partida> {
    return this.http.get<Partida>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  //Obtener una sola partida por id
  getPartida(id: number): Observable<Partida> {
    return this.http.get<Partida>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  //Crear partida (crear)
  addPartida(partida: Partida): Observable<Partida> {
    return this.http.post<Partida>(`${this.myAppUrl}${this.myApiUrl}`, partida);
  }
}
