import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PrincipalDashboardDTO } from '../dto/dashboard/dashboard.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly apiUrlAdmin = `${environment.apiUrl}/admin`;
  private http = inject(HttpClient);

  carregarDashboard(): Observable<PrincipalDashboardDTO> {
    return this.http.get<PrincipalDashboardDTO>(`${this.apiUrlAdmin}/dashboard`);
  }

  ativarProva(): Observable<PrincipalDashboardDTO> {
    return this.http.patch<PrincipalDashboardDTO>(`${this.apiUrlAdmin}/ativar`, null);
  }

  desativarProva(): Observable<PrincipalDashboardDTO> {
    return this.http.patch<PrincipalDashboardDTO>(`${this.apiUrlAdmin}/desativar`, null);
  }

  exportarRelatorio(): Observable<Blob> {
    return this.http.get(`${this.apiUrlAdmin}/relatorio`, { responseType: 'blob' });
  }
}