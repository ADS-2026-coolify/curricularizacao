import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  salvarToken(token: string): void {
    if (!token) {
      return;
    }

    sessionStorage.setItem('TOKEN', token);
  }

  excluirToken(): void {
    sessionStorage.removeItem('TOKEN');
  }

  obterToken(): string | null {
    return sessionStorage.getItem('TOKEN');
  }
}
