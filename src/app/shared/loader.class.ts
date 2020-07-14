import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../modules/core/services/loader.service';

export class Loader implements OnInit {

  showLoader: Subject<boolean>;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.showLoader = this.loaderService.loadding;
  }

}