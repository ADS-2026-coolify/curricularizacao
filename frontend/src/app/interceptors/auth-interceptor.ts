import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../service/token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.obterToken();

  if (!token) {
    return next(req);
  }

  const requisicaoComToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(requisicaoComToken);
};
