import { SendBirdHelper } from '../sendbird.helper';
import * as I from './message.interface';

export class MessageService extends SendBirdHelper {
  /**
   * List messages
   *
   * ​@description Retrieves a list of past messages of a channel.
   * @see https://docs.sendbird.com/platform/messages#3_list_messages
   */
  async list(params: I.ListOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages`;
    return this.wrapper(this.http.get<any>(url, { params })); // prettier-ignore
  }

  /**
   * View a message
   *
   * ​@description Retrieves information on a message.
   * @see https://docs.sendbird.com/platform/messages#3_view_a_message
   */
  async view(params: I.ViewOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}`;
    return this.wrapper(this.http.get<I.Message>(url, { params })); // prettier-ignore
  }

  /**
   * Send a message
   *
   * ​@description Sends a message to a channel.
   * @see https://docs.sendbird.com/platform/messages#3_send_a_message
   */
  async send(params: I.CreateOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages`;
    const config = this.getFormData(params, 'file');
    return this.wrapper(this.http.post<I.Message>(url, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * Update a message
   *
   * ​@description Updates information on a message in a channel.
   * @see https://docs.sendbird.com/platform/messages#3_update_a_message
   */
  async update(params: I.UpdateOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}`;
    const config = this.getFormData(params, 'file');
    return this.wrapper(this.http.put(url, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * View number of all messages in a channel
   *
   * ​@description Retrieves the total number of messages in a channel.
   * @see https://docs.sendbird.com/platform/messages#3_view_number_of_all_messages_in_a_channel
   */
  async totalCount(params: I.TotalCountOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/total_count`;
    return this.wrapper(this.http.get<I.TotalCountResult>(url));
  }

  /**
   * View number of each member's unread messages
   *
   * ​@description Retrieves the total number of each member's unread messages in a group channel. This action is **only applicable for** users in a group channel.
   * @see https://docs.sendbird.com/platform/messages#3_view_number_of_each_member_s_unread_messages
   */
  async unreadCount(params: I.UnreadCountOption) {
    const url = `group_channels/${params.channel_url}/messages/unread_count`;
    return this.wrapper(this.http.get<I.UnreadCountResult>(url, { params })); // prettier-ignore
  }

  /**
   * Mark all messages as read
   *
   * ​@description Marks all messages in a group channel as read for a given user. This action is **only applicable for** users in a group channel.
   * @see https://docs.sendbird.com/platform/messages#3_mark_all_messages_as_read
   */
  async markAsRead(params: I.MarkAsReadOption) {
    const url = `group_channels/${params.channel_url}/messages/mark_as_read`;
    return this.wrapper(this.http.put(url, params));
  }

  /**
   * Delete a message
   *
   * ​@description Deletes a message from a channel.
   * @see https://docs.sendbird.com/platform/messages#3_mark_all_messages_as_read
   */
  async delete(params: I.DeleteOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}`;
    return this.wrapper(this.http.delete(url));
  }

  /**
   * Turn on message reaction (only available in group channels)
   *
   * ​@description Turns on and off the message reaction feature at an application level.
   * @see https://docs.sendbird.com/platform/messages#3_mark_all_messages_as_read
   */
  async toggleReaction(params: I.ToggleReactionOption) {
    const url = `applications/settings/reactions`;
    return this.wrapper(this.http.put<I.ToggleReactionResult>(url, params));
  }

  /**
   * List reactions of a message (only available in group channels)
   *
   * ​@description Retrieves a list of reactions made to a message.
   * @see https://docs.sendbird.com/platform/messages#3_list_reactions_of_a_message
   */
  async listReactions(params: I.ListReactionsOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}/reactions`;
    return this.wrapper(this.http.get<I.ListReactionsResult>(url, { params })); // prettier-ignore
  }

  /**
   * Add a reaction to a message (only available in group channels)
   *
   * ​@description Adds a specific reaction to a message.
   * @see https://docs.sendbird.com/platform/messages#3_add_a_reaction_to_a_message
   */
  async addReaction(params: I.AddReactionOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}/reactions`;
    return this.wrapper(this.http.post<I.AddReactionResult>(url, params));
  }

  /**
   * Remove a reaction from a message (only available in group channels)
   *
   * ​@description Removes a specific reaction from a message.
   * @see https://docs.sendbird.com/platform/messages#3_remove_a_reaction_from_a_message
   */
  async removeReaction(params: I.RemoveReactionOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}/reactions`;
    return this.wrapper(this.http.delete<I.RemoveReactionResult>(url, { data: params })); // prettier-ignore
  }

  /**
   * Add extra data to a message
   *
   * ​@description Adds one or more key-values items which store additional information for a message.
   * @see https://docs.sendbird.com/platform/messages#3_add_extra_data_to_a_message
   */
  async addMetadata(params: I.AddMetadataOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}/sorted_metaarray`;
    return this.wrapper(this.http.post<I.AddMetadataResult>(url, params));
  }

  /**
   * Update extra data in a message
   *
   * ​@description Updates the values of specific items by their keys.
   * @see https://docs.sendbird.com/platform/messages#3_update_extra_data_in_a_message
   */
  async updateMetadata(params: I.UpdateMetadataOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}/sorted_metaarray`;
    return this.wrapper(this.http.put<I.UpdateMetadataResult>(url, params));
  }

  /**
   * Remove extra data from a message
   *
   * ​@description Removes specific items from a message by their keys.
   * @see https://docs.sendbird.com/platform/messages#3_remove_extra_data_from_a_message
   */
  async removeMetadata(params: I.RemoveMetadataOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}/sorted_metaarray`;
    return this.wrapper(this.http.delete(url, { params })); // prettier-ignore
  }

  /**
   * Translate a message into other languages
   *
   * ​@description Translates a message into specific languages. Only text messages of which type is `MESG` can be translated into other languages.
   * @see https://docs.sendbird.com/platform/messages#3_translate_a_message_into_other_languages
   */
  async translate(params: I.TranslateOption) {
    const url = `${params.channel_type}/${params.channel_url}/messages/${params.message_id}/translation`;
    return this.wrapper(this.http.post<I.Message>(url, params));
  }
}
