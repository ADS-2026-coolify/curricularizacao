import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tittle-section',
  imports: [],
  templateUrl: './tittle-section.html',
  styleUrl: './tittle-section.css',
})
export class TittleSection {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() subdescription: string = '';
}
