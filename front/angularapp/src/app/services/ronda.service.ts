import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partida } from '../interfaces/partida';
import { Ronda } from '../interfaces/ronda';

@Injectable({
  providedIn: 'root',
})
export class RondaService {
  myAppUrl: string = environment.endpoint; //tiene la barra final!
  myApiUrl: string = 'api/Ronda';

  constructor(private http: HttpClient) {}

  //Obtener todas las rondas segun su partidaId
  getRondasByPartidaId(partidaId: number): Observable<Ronda> {
    return this.http.get<Ronda>(
      `${this.myAppUrl}${this.myApiUrl}/partida/${partidaId}`
    );
  }

  addRonda(ronda: Ronda): Observable<Ronda> {
    return this.http.post<Ronda>(`${this.myAppUrl}${this.myApiUrl}`, ronda);
  }
}
