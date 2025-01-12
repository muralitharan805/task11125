import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: false,

  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  getIsLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    protected spinnerService: SpinnerService
  ) {
    this.getIsLoading$ = this.spinnerService.$isLoading;
  }
}
