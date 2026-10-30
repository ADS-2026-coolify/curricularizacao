import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sprint-card',
  imports: [],
  templateUrl: './sprint-card.html',
  styleUrl: './sprint-card.css',
})
export class SprintCard {
  @Input() title: string = '';
}
