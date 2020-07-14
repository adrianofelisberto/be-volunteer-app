import { HttpStatus } from './../enum/http-status.enum';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, finalize } from 'rxjs/operators';

import { LoaderService } from './loader.service';
import { ApiError } from '../models/api-error';
import { MessageService } from './message.service';

@Injectable()
export class HttpInterceptorService {
  constructor(
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      map((event) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return this.errorHandler(error);
      }),
      finalize(() => setTimeout(() => this.loaderService.hide(), 1000))
    );
  }

  errorHandler(error: HttpErrorResponse) {
    switch (error.status) {
      case HttpStatus.NOT_FOUND:
        this.messageService.inforMessage(error.error.message);
        break;
      case HttpStatus.BAD_REQUEST:
        this.messageService.warnningMessage(error.error.message);
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        this.messageService.errorMessage(error.error.message);
        break;
      case HttpStatus.GATEWAY_TIMEOUT:
        this.messageService.errorMessage(error.error.message);
        break;
    }
    return throwError(error);
  }
}
