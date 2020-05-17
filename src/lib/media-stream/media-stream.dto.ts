import { IsNotEmpty } from 'class-validator';

export class MediaStreamConfig {
  @IsNotEmpty()
  MEDIA_STREAM_HTTP_PORT!: number;
}
