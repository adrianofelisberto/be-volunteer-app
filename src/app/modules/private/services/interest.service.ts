import { Observable } from 'rxjs';
import { Interest } from './../models/interest';
import { BaseService } from 'src/app/shared/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InterestService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super('interests');
  }

  getAll(): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.path);
  }

}