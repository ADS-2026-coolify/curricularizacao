import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginAdminResponseDTO } from '../dto/admin/LoginAdminResponseDTO.dto';
import { LoginAdminRequest } from '../dto/admin/LoginAdminRequest.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrlAdmin = `${environment.apiUrl}/admin`;
  private http = inject(HttpClient);

  login(nome: string, senha: string): Observable<LoginAdminResponseDTO> {
    const dto: LoginAdminRequest = {
      nome: nome,
      senha: senha,
    };
    return this.http.post<LoginAdminResponseDTO>(`${this.apiUrlAdmin}/autenticar`, dto);
  }
}