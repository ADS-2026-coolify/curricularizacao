import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ExamService } from '../../service/exam-service';
import { TokenService } from '../../service/token-service';
import { ProvaDTO } from '../../dto/Prova/ProvaDTO.dto';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FinalizarProvaDto } from '../../dto/Prova/FinalizarProvaDTO.dto';

@Component({
  selector: 'app-exam',
  imports: [ProgressSpinnerModule, ToastModule],
  providers: [MessageService],
  templateUrl: './exam.html',
  styleUrl: './exam.css',
})
export class ExamComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(ExamService);
  tokenService = inject(TokenService);
  messageService = inject(MessageService);
  idTentativa!: number;
  provaDTO: ProvaDTO | null = null;
  cdr = inject(ChangeDetectorRef);
  carregando = false;
  indiceAtual = 0;
  respostasSelecionadas: Record<number, number> = {};
  acertos: number | null = null;
  porcentagem: number | null = null;
  Math = Math;

  ngOnInit(): void {
    this.carregando = true;
    this.idTentativa = Number(this.route.snapshot.paramMap.get('idTentativa'));
    this.service.carregarProva(this.idTentativa).subscribe({
      next: (res) => {
        this.provaDTO = res;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.carregando = false;
        this.cdr.detectChanges();
        this.tratarErro(err, 'Não foi possível carregar a prova.');
      },
    });
  }

  finalizarProva() {
    const dto: FinalizarProvaDto = {
      idTentativa: this.idTentativa,
      respostas: this.respostasSelecionadas,
    };
    this.service.finalizarProva(dto).subscribe({
      next: (res) => {
        this.acertos = res;

        const porcentagemFinal = Math.round((res / this.provaDTO!.listaPerguntas.length) * 100);

        this.porcentagem = 0;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.porcentagem = porcentagemFinal;
          this.cdr.detectChanges();
        }, 100);
      },
      error: (err: HttpErrorResponse) => {
        this.tratarErro(err, 'Não foi possível finalizar a prova.');
      },
    });
  }

  private tratarErro(err: HttpErrorResponse, mensagemPadrao: string) {
    console.error(err);

    if (err.status === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Sem conexão',
        detail: 'Verifique sua internet e tente novamente. Suas respostas foram mantidas.',
        life: 5000,
      });
      return;
    }

    const mensagem =
      err.status === 401
        ? 'Sua sessão expirou. Inicie a prova novamente.'
        : (err.error?.mensagem ?? mensagemPadrao);

    this.messageService.add({
      severity: 'warn',
      summary: 'Não foi possível continuar',
      detail: mensagem,
      life: 4000,
    });

    this.tokenService.excluirToken();
    setTimeout(() => this.router.navigate(['/']), 3500);
  }
}