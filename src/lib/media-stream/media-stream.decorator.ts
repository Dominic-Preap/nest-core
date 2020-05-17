import { Inject } from '@nestjs/common';

import { MEDIA_STREAM_TOKEN } from './media-stream.constant';

export const InjectMediaStream = () => Inject(MEDIA_STREAM_TOKEN);
