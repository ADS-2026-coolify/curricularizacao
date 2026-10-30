import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TokenService } from '../../../service/token-service';
import { PrincipalDashboardDTO, StatusTentativa } from '../../../dto/dashboard/dashboard.dto';
import { AdminService } from '../../../service/admin-service';

@Component({
  selector: 'app-admin-home',
  imports: [DatePipe, TitleCasePipe, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './admin-home.html',
})
export class AdminHome implements OnInit {
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private adminService = inject(AdminService);
  private messageService = inject(MessageService);

  dashboard = signal<PrincipalDashboardDTO | null>(null);
  carregando = signal(true);
  alterandoProva = signal(false);
  exportando = signal(false);
  busca = signal('');
  statusFiltro = signal<StatusTentativa | ''>('');
  provaAtiva = computed(() => this.dashboard()?.provaAtiva ?? false);
  resumo = computed(() => this.dashboard()?.resumo ?? null);
  experiencias = computed(() => this.dashboard()?.experiencias ?? []);
  tentativas = computed(() => {
    const listaTentativas = this.dashboard()?.tentativas ?? [];
    const textoBusca = this.busca().trim().toLowerCase();
    const filtro = this.statusFiltro();
    const listaFiltrada = listaTentativas.filter(
      (t) =>
        (textoBusca === '' || t.nome.toLowerCase().includes(textoBusca)) &&
        (filtro === '' || t.status === filtro),
    );

    return listaFiltrada;
  });

  readonly experienciaLabel: Record<string, string> = {
    NENHUMA: 'Nunca ouviu falar',
    BASICA: 'Conhece por cima',
    INTERMEDIARIA: 'Estudou na faculdade',
    AVANCADA: 'Entende bem',
    PROFISSIONAL: 'Usa no trabalho',
  };

  readonly escolaridadeLabel: Record<string, string> = {
    FUNDAMENTAL: 'Fundamental',
    MEDIO: 'Médio',
    SUPERIOR: 'Superior',
  };

  ngOnInit() {
    this.adminService.carregarDashboard().subscribe({
      next: (res) => {
        this.carregando.set(false);
        this.dashboard.set(res);
      },
      error: (err: HttpErrorResponse) => {
        this.carregando.set(false);
        this.mostrarErro(err, 'Não foi possível carregar o painel.');
      },
    });
  }

  alternarProva() {
    if (this.alterandoProva()) {
      return;
    }

    this.alterandoProva.set(true);

    if (this.provaAtiva() && !confirm('deseja cancelar a prova?')) {
      return;
    }

    if (this.provaAtiva()) {
      this.adminService.desativarProva().subscribe({
        next: (res) => {
          this.dashboard.set(res);
          this.alterandoProva.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.alterandoProva.set(false);
          this.mostrarErro(err, 'Não foi possível encerrar a prova.');
        },
      });
    } else {
      this.adminService.ativarProva().subscribe({
        next: (res) => {
          this.dashboard.set(res);
          this.alterandoProva.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.alterandoProva.set(false);
          this.mostrarErro(err, 'Não foi possível ativar a prova.');
        },
      });
    }
  }

  exportarPdf() {
    if (this.exportando()) {
      return;
    }

    this.exportando.set(true);

    this.adminService.exportarRelatorio().subscribe({
      next: (arquivo) => {
        const url = URL.createObjectURL(arquivo);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-prova-${new Date().toISOString().slice(0, 10)}.pdf`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        this.exportando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.exportando.set(false);
        this.mostrarErro(err, 'Não foi possível gerar o relatório.');
      },
    });
  }
  sair() {
    this.tokenService.excluirToken();
    this.router.navigate(['/login']);
  }

  private mostrarErro(err: HttpErrorResponse, mensagemPadrao: string) {
    console.error(err);

    if (err.status === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Sem conexão',
        detail: 'Não foi possível falar com o servidor. Verifique se ele está no ar.',
      });
      return;
    }

    if (err.status === 401) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Sessão expirada',
        detail: 'Faça login novamente para continuar.',
      });
      this.tokenService.excluirToken();
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: err.error?.mensagem ?? mensagemPadrao,
    });
  }
}
