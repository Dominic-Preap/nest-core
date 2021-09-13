import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';

export class WowzaHelper {
  constructor(protected readonly http: HttpService) {}

  protected async wrapper<T>(req: Observable<AxiosResponse<T>>) {
    return lastValueFrom(req).then(x => x.data);
  }
}
