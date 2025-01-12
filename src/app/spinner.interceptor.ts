import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { catchError, finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();

  return next(req).pipe(
    finalize(() => spinnerService.hide()),
    catchError((error) => {
      spinnerService.show();
      throw error;
    })
  );
};
