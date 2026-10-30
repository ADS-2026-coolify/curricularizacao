import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrum-card',
  imports: [NgClass],
  templateUrl: './scrum-card.html',
  styleUrl: './scrum-card.css',
})
export class ScrumCard {
  @Input() title: string = '';
  @Input() isSmall: boolean = false;
}
