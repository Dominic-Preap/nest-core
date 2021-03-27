import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { InjectFirebaseAdmin } from '@lib/firebase-admin';

@Injectable()
export class FirebaseAdminService {
  constructor(@InjectFirebaseAdmin() private readonly admin: admin.app.App) {}
  async notifySample(total: number) {
    if (!total) return;

    const tokens = ['sample-token']; // TODO: get token from your database
    const payload = this.getPayload('New Sample', `There are ${total} new sample.`);
    this.sendPush(tokens, payload);
  }

  private sendPush(tokens: string[], payload: admin.messaging.MessagingPayload) {
    if (!tokens.length) return;
    this.admin
      .messaging()
      .sendToDevice(tokens, payload)
      .then((response: any) => console.log('Successfully sent message:', response))
      .catch((error: string) => console.log('Error sending message:', error));
  }

  private getPayload(
    title: string,
    body: string,
    data: any = {}
  ): admin.messaging.MessagingPayload {
    return { data, notification: { title, body } };
  }
}
