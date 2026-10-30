import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComecarProva } from '../../components/dialog-comecar-prova/dialog-comecar-prova';
import { ExamService } from '../../service/exam-service';

@Component({
  selector: 'app-start-test',
  imports: [DialogComecarProva],
  templateUrl: './start-test.html',
  styleUrl: './start-test.css',
})
export class StartTest implements OnInit {

  isExamUnlocked: boolean = true;
  cdr = inject(ChangeDetectorRef);
  openModal: boolean = false;
  service = inject(ExamService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.service.isProvaAtiva().subscribe({
      next:(res) =>{
        this.isExamUnlocked = res;
        this.cdr.detectChanges();
      },
      error:(err) =>{
        console.error(err);
      }
    })
  }

}
