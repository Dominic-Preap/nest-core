import { SendBirdHelper } from '../sendbird.helper';
import * as I from './webhook.interface';

export class WebhookService extends SendBirdHelper {
  /**
   * Retrieve a list of subscribed events
   *
   * ​@description Retrieves a list of events for your webhook server to receive payloads for.
   * @see https://docs.sendbird.com/platform/webhooks#3_retrieve_a_list_of_subscribed_events
   */
  async list(params?: I.LisOption) {
    const url = `applications/settings/webhook`;
    return this.wrapper(this.http.get<I.Webhook>(url, { params })); // prettier-ignore
  }

  /**
   * Choose which events to subscribe to
   *
   * ​@description Chooses which events for your webhook server to receive payloads for. By subscribing to specific events based on your own needs, you can control the number of HTTP requests to your webhook server.
   * @see https://docs.sendbird.com/platform/webhooks#3_choose_which_events_to_subscribe_to
   */
  async update(params: I.UpdateOption) {
    const url = `applications/settings/webhook`;
    return this.wrapper(this.http.put<I.Webhook>(url, params));
  }
}
