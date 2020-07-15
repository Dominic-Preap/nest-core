import { Logger } from '@nestjs/common';
import * as NodeMediaServer from 'node-media-server';

import { MediaStreamConfig } from './media-stream.dto';

export class MediaStream {
  public nms!: NodeMediaServer;
  private logger: Logger = new Logger('MediaStreamModule');

  constructor(private readonly config: MediaStreamConfig) {
    const configs = {
      rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30
      },
      http: {
        mediaroot: './media',
        port: this.config.MEDIA_STREAM_HTTP_PORT,
        allow_origin: '*'
      },
      auth: {
        play: true,
        publish: true,
        secret: 'abc'
      },
      trans: {
        ffmpeg: 'D:/SOS Project/bin/ffmpeg.exe',
        tasks: [
          {
            app: 'live',
            // ac: '10',
            mp4: true,
            mp4Flags: '[movflags=faststart]'
          }
        ]
      }
    };

    this.nms = new NodeMediaServer(configs);
    this.nms.run();
    // this.XXX();

    this.logger.log('MediaStreamModule dependencies initialized');
  }

  XXX() {
    this.nms.on('preConnect', (id, args) => {
      console.log('preConnect', id, args);
      // const session = this.nms.getSession(id);
      // console.log(session);
      // session.reject();
    });

    this.nms.on('postConnect', (id, args) => {
      console.log('postConnect', id, args);
    });

    this.nms.on('doneConnect', (id, args) => {
      console.log('doneConnect', id, args);
    });

    this.nms.on('prePublish', (id, StreamPath, args) => {
      console.log('prePublish', id, StreamPath, args);
      // let session = nms.getSession(id);
      // session.reject();
    });

    this.nms.on('postPublish', (id, StreamPath, args) => {
      console.log('postPublish', id, StreamPath, args);
    });

    this.nms.on('donePublish', (id, StreamPath, args) => {
      console.log('donePublish', id, StreamPath, args);
    });

    this.nms.on('prePlay', (id, StreamPath, args) => {
      console.log('prePlay', id, StreamPath, args);
      // let session = nms.getSession(id);
      // session.reject();
    });

    this.nms.on('postPlay', (id, StreamPath, args) => {
      console.log('postPlay', id, StreamPath, args);
    });

    this.nms.on('donePlay', (id, StreamPath, args) => {
      console.log('donePlay', id, StreamPath, args);
    });
  }
}
