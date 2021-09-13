import { HttpService } from '@nestjs/axios';

import { ConfigService } from '../config';
import { StreamTargetService } from './stream-target';
import { WowzaConfig } from './wowza.dto';

export class Wowza {
  /**
   * A stream target is a destination for a stream. Stream targets can be Wowza Streaming Cloud edge resources; custom, external destinations; or ultra low latency target destinations.
   */
  public streamTarget: StreamTargetService;

  constructor(private readonly configService: ConfigService, private readonly http: HttpService) {
    const config = this.configService.validate('WowzaModule', WowzaConfig);

    this.http.axiosRef.defaults.baseURL = `https://api.cloud.wowza.com`;
    this.http.axiosRef.defaults.headers['wsc-api-key'] = config.WOWZA_API_KEY;
    this.http.axiosRef.defaults.headers['wsc-access-key'] = config.WOWZA_ACCESS_KEY;
    this.http.axiosRef.defaults.headers['Content-Type'] = 'application/json, charset=utf8';

    // https://github.com/axios/axios/issues/1600#issuecomment-454013644
    this.http.axiosRef.interceptors.response.use(
      response => response, // response.data
      error => Promise.reject(error.response)
    );

    this.streamTarget = new StreamTargetService(this.http);
  }
}
