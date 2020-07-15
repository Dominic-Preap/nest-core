import { Metacounter, Metadata } from '../_base';
import { SendBirdHelper } from '../sendbird.helper';
import * as I from './channel-metadata.interface';

export class ChannelMetadataService extends SendBirdHelper {
  /**
   * View a channel metadata
   *
   * ​@description Retrieves a channel metadata's one or more items that are stored in a channel.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_view_a_channel_metadata
   */
  async view(params: I.ViewOption) {
    const url = `${params.channel_type}/${params.channel_url}/metadata/${params.key || ''}`;
    return this.wrapper(this.http.get<Metadata>(url, { params })); // prettier-ignore
  }

  /**
   * Create a channel metadata
   *
   * ​@description Creates a channel metadata's items to store in a channel.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_create_a_channel_metadata
   */
  async create(params: I.CreateOption) {
    const url = `${params.channel_type}/${params.channel_url}/metadata`;
    return this.wrapper(this.http.post<Metadata>(url, params));
  }

  /**
   * Update a channel metadata
   *
   * ​@description Updates existing items of a channel metadata by their keys, or adds new items to the metadata.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_update_a_channel_metadata
   */
  async update(params: I.UpdateOption) {
    const url = `${params.channel_type}/${params.channel_url}/metadata/${params.key || ''}`;
    return this.wrapper(this.http.put<Metadata>(url, params));
  }

  /**
   * Delete a channel metadata
   *
   * ​@description Deletes a channel metadata's one or all items that are stored in a channel.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_delete_a_channel_metadata
   */
  async delete(params: I.DeleteOption) {
    const url = `${params.channel_type}/${params.channel_url}/metadata`;
    return this.wrapper(this.http.delete(url));
  }
}

export class ChannelMetacounterService extends SendBirdHelper {
  /**
   * View a channel metacounter
   *
   * ​@description Retrieves channel metacounter's one or more items that are stored in a channel.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_view_a_channel_metacounter
   */
  async view(params: I.ViewMetacounterOption) {
    const url = `${params.channel_type}/${params.channel_url}/metacounter/${params.key || ''}`;
    return this.wrapper(this.http.get<Metacounter>(url, { params })); // prettier-ignore
  }

  /**
   * Create a channel metacounter
   *
   * ​@description Creates a channel metacounter's items to store in a channel.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_create_a_channel_metacounter
   */
  async create(params: I.CreateMetacounterOption) {
    const url = `${params.channel_type}/${params.channel_url}/metacounter`;
    return this.wrapper(this.http.post<Metacounter>(url, params));
  }

  /**
   * Update a channel metacounter
   *
   * ​@description Updates existing items of a channel metacounter by their keys, or adds new items to the metacounter.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_update_a_channel_metacounter
   */
  async update(params: I.UpdateMetacounterOption) {
    const url = `${params.channel_type}/${params.channel_url}/metacounter/${params.key || ''}`;
    return this.wrapper(this.http.put<Metacounter>(url, params));
  }

  /**
   * Delete a channel metacounter
   *
   * ​@description Deletes a channel metacounter's item that is stored in a channel.
   * @see https://docs.sendbird.com/platform/channel_metadata#3_delete_a_channel_metacounter
   */
  async delete(params: I.DeleteMetacounterOption) {
    const url = `${params.channel_type}/${params.channel_url}/metacounter`;
    return this.wrapper(this.http.delete(url));
  }
}
