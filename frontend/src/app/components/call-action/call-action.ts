import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-call-action',
  imports: [],
  templateUrl: './call-action.html',
  styleUrl: './call-action.css',
})
export class CallAction {
  @Input() title: string = '';
  @Input() description: string = '';
}
