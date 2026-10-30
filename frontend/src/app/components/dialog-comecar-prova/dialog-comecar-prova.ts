import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ExamService } from '../../service/exam-service';
import { TokenService } from '../../service/token-service';
import { CriarUsuarioDTO } from '../../dto/usuario/CriarUsuarioDTO.dto';

@Component({
  selector: 'app-dialog-comecar-prova',
  imports: [DialogModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './dialog-comecar-prova.html',
  styleUrl: './dialog-comecar-prova.css',
})
export class DialogComecarProva {
  @Input() visivel = false;
  @Output() visivelChange = new EventEmitter<boolean>();

  private router = inject(Router);
  private examService = inject(ExamService);
  private tokenService = inject(TokenService);
  private messageService = inject(MessageService);

  nome = '';
  idade: number | null = null;
  sexo = '';
  escolaridade = '';
  experiencia = '';
  carregando = false;
  isExamUnlocked = true; // vai vir de um endpoint do backend

  niveis = [
    { label: 'Nunca ouvi falar', value: 'NENHUMA' },
    { label: 'Já ouvi falar, conheço por cima', value: 'BASICA' },
    { label: 'Já estudei ou usei em trabalhos da faculdade', value: 'INTERMEDIARIA' },
    { label: 'Entendo bem (Scrum, Kanban, papéis, cerimônias)', value: 'AVANCADA' },
    { label: 'Uso no meu trabalho', value: 'PROFISSIONAL' },
  ];

  get formularioValido(): boolean {
    return (
      !!this.nome.trim() &&
      !!this.sexo &&
      !!this.escolaridade &&
      !!this.experiencia &&
      this.idade !== null &&
      this.idade >= 15 &&
      this.idade <= 100
    );
  }

  fechar() {
    this.visivelChange.emit(false);
  }

  iniciarProva() {
    if (!this.formularioValido || this.carregando || !this.isExamUnlocked) return;

    this.carregando = true;

    const dto: CriarUsuarioDTO = {
      nome: this.nome.trim(),
      idade: this.idade as number,
      sexo: this.sexo,
      escolaridade: this.escolaridade,
      experiencia: this.experiencia,
    };

    this.examService.iniciarProva(dto).subscribe({
      next: (res) => {
        this.tokenService.salvarToken(res.token);
        this.fechar();
        this.router.navigate(['/exam', res.idTentativa]);
      },
      error: (err) => {
        console.error('Erro ao iniciar prova:', err);
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível iniciar a prova. Tente novamente.',
        });
      },
    });
  }
}