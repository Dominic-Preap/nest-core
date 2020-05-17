import { Inject, UseGuards } from '@nestjs/common';

import { SENDBIRD_TOKEN } from './sendbird.constant';
import { SendBirdWebhookGuard } from './webhook';

export const InjectSendBird = () => Inject(SENDBIRD_TOKEN);
export const UseSendBirdWebhookGuard = () => UseGuards(SendBirdWebhookGuard);
