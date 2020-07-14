import { Volunteer } from './../models/volunteer';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';

@Injectable()
export class VolunteerService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super('volunteers');
  }

  getAll(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.path);
  }

  getById(id: number): Observable<Volunteer> {
    return this.http.get<Volunteer>(`${this.path}/${id}`);
  }

  create(volunteer: Volunteer): Observable<Message> {
    return this.http.post<Message>(this.path, volunteer);
  }

  update(volunteer: Volunteer): Observable<Message> {
    return this.http.put<Message>(this.path, volunteer);
  }

  removeById(id: number) {
    this.http.delete(`${this.path}/${id}`);
  }

}
