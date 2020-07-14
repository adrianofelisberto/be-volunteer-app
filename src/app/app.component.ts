import { Component } from '@angular/core';
import { LoaderService } from './modules/core/services/loader.service';
import { Loader } from './shared/loader.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Loader {

  constructor(loaderService: LoaderService) {
    super(loaderService)
  }

}
