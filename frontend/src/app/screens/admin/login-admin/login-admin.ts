import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../service/token-service';
import { AuthService } from '../../../service/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
})
export class LoginAdmin {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);

 nome = '';
senha = '';
mostrarSenha = false;
carregando = false;
erro = '';

entrar() {
  if (!this.nome || !this.senha || this.carregando) return;

  this.carregando = true;
  this.erro = '';

  this.authService.login(this.nome.trim(),this.senha ).subscribe({
    next: (res) => {
      this.tokenService.salvarToken(res.token);
      this.router.navigate(['/admin']);
    },
    error: (err) => {
      this.carregando = false;
      this.erro =
        err.status === 401 || err.status === 403
          ? 'Nome ou senha incorretos.'
          : 'Não foi possível entrar agora. Tente novamente.';
    },
  });
}
}
