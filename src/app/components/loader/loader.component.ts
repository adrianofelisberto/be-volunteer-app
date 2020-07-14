import { LoaderService } from '../../modules/core/services/loader.service';
import { Component } from '@angular/core';
import { Loader } from 'src/app/shared/loader.class';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends Loader {

  constructor(loaderService: LoaderService) {
    super(loaderService)
  }

}
