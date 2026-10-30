import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarUsuarioDTO } from '../dto/usuario/CriarUsuarioDTO.dto';
import { UsuarioCriadoDTO } from '../dto/usuario/UsuarioCriadoDTO.dto';
import { ProvaDTO } from '../dto/Prova/ProvaDTO.dto';
import { FinalizarProvaDto } from '../dto/Prova/FinalizarProvaDTO.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private readonly apiUrlExam = `${environment.apiUrl}/exam`;
  private http = inject(HttpClient);

  iniciarProva(dto: CriarUsuarioDTO): Observable<UsuarioCriadoDTO> {
    return this.http.post<UsuarioCriadoDTO>(`${this.apiUrlExam}/iniciarProva`, dto);
  }

  carregarProva(idTentativa: number): Observable<ProvaDTO> {
    return this.http.get<ProvaDTO>(`${this.apiUrlExam}/carregarProva/${idTentativa}`);
  }

  isProvaAtiva(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrlExam}/provaAtiva`);
  }

  finalizarProva(dto: FinalizarProvaDto): Observable<number> {
    return this.http.patch<number>(`${this.apiUrlExam}/finalizarProva`, dto);
  }
}