import { HttpService } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import * as FormData from 'form-data';
import { Observable } from 'rxjs';

export class SendBirdHelper {
  constructor(protected readonly http: HttpService) {}

  protected async wrapper<T>(req: Observable<AxiosResponse<T>>) {
    return req.toPromise().then(x => x.data);
  }

  protected getFormData(data: { [key: string]: any }, fileName: string) {
    const headers = this.http.axiosRef.defaults.headers;
    if (!data[fileName]) return { data, headers };

    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => form.append(key, value));
    return { data: form, headers: { ...headers, ...form.getHeaders() } };
  }
}
