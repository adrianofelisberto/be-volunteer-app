import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'platform'
})
export class LoaderService {
  loadding = new Subject<boolean>();

  show() {
    this.loadding.next(true);
  }

  hide() {
    this.loadding.next(false);
  }
}
