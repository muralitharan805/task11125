import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  standalone: false,

  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  constructor(private router: Router) {}
}
