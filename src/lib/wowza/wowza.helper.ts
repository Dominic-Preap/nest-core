import { HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export class WowzaHelper {
  constructor(protected readonly http: HttpService) {}

  protected async wrapper<T>(req: Observable<AxiosResponse<T>>) {
    return req.toPromise().then(x => x.data);
  }
}
