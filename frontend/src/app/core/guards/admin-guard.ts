import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../service/token-service';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  ROLE?: string;
  exp?: number;
}

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const login = router.createUrlTree(['/login']);

  const token = tokenService.obterToken();
  if (!token) return login;

  try {
    const payload = jwtDecode<TokenPayload>(token);

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      tokenService.excluirToken();
      return login;
    }

    return payload.ROLE === 'ADMIN' ? true : login;
  } catch {
    tokenService.excluirToken();
    return login;
  }
};