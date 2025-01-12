import { ChangeDetectorRef, Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'assignment11125';

  constructor(
    private router: Router,
    protected spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinnerService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this.spinnerService.hide();
      }
    });
  }
}
