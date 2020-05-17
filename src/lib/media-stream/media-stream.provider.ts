import { ConfigService } from '../config';
import { MediaStream } from './media-stream';
import { MEDIA_STREAM_TOKEN } from './media-stream.constant';
import { MediaStreamConfig } from './media-stream.dto';

export const mediaStreamProvider = {
  inject: [ConfigService],
  provide: MEDIA_STREAM_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('MediaStreamModule', MediaStreamConfig);
    return new MediaStream(config);
  }
};
