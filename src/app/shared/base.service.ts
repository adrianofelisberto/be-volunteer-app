import { environment } from 'src/environments/environment';

export abstract class BaseService {
  protected path: string;

  constructor(path: string) {
    this.path = `${environment.urlApi}/${path}`;
  }
}