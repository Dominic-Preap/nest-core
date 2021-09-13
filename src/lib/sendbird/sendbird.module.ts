import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { SendBirdProvider } from './sendbird.provider';
import { SendBirdWebhookGuard } from './webhook';

@Global()
@Module({
  imports: [HttpModule.register({})],
  providers: [SendBirdProvider, SendBirdWebhookGuard],
  exports: [SendBirdProvider, SendBirdWebhookGuard]
})
export class SendBirdModule {}
