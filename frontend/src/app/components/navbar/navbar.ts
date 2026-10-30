import { Component } from '@angular/core';
import { StartTest } from '../start-test/start-test';

@Component({
  selector: 'app-navbar',
  imports: [StartTest],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
