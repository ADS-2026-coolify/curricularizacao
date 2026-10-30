import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-main',
  imports: [],
  templateUrl: './title-main.html',
  styleUrl: './title-main.css',
})
export class TitleMain {
  @Input() subdescription: string = '';
  @Input() maindescription: string = '';
}
