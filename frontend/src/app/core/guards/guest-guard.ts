import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../service/token-service';
import { jwtDecode } from 'jwt-decode';
interface TokenPayload {
  ROLE?: string;
  exp?: number;
}

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  const token = tokenService.obterToken();
  if (!token) return true;

  try {
    const payload = jwtDecode<TokenPayload>(token);

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      tokenService.excluirToken();
      return true;
    }

    if (payload.ROLE === 'ADMIN') {
      return router.createUrlTree(['/admin']);
    }

    return true;
  } catch {
    tokenService.excluirToken();
    return true;
  }
};