import { SendBirdHelper } from '../sendbird.helper';
import * as I from './user.interface';

export class UserService extends SendBirdHelper {
  // ===================================================
  // Managing users
  // ===================================================

  /**
   * List users
   *
   * ​@description Retrieves a list of users in your application. You can query the list using various parameters.
   * @see https://docs.sendbird.com/platform/user#3_list_users
   */
  async list(params?: I.ListOption) {
    return this.wrapper(this.http.get<I.ListResult>('users', { params })); // prettier-ignore
  }

  /**
   * View a user
   *
   * @description Retrieves information on a user.
   * @see https://docs.sendbird.com/platform/user#3_view_a_user
   */
  async view(params: I.ViewOption) {
    const url = `users/${params.user_id}`;
    return this.wrapper(this.http.get<I.User>(url, { params })); // prettier-ignore
  }

  /**
   * Create a user
   *
   * @description Creates a new user. You can choose to authorize a user with just their own user ID, or with an access token additionally.
   * @see https://docs.sendbird.com/platform/user#3_create_a_user
   */
  async create(params: I.CreateOption) {
    const config = this.getFormData(params, 'profile_file');
    return this.wrapper(this.http.post<I.User>('users', config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * Update a user
   *
   * @description Updates information on the user.
   * @see https://docs.sendbird.com/platform/user#3_update_a_user
   */
  async update(params: I.UpdateOption) {
    const url = `users/${params.user_id}`;
    const config = this.getFormData(params, 'profile_file');
    return this.wrapper(this.http.put<I.User>(url, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * Delete a user
   *
   * @description Deletes the user.
   * @see https://docs.sendbird.com/platform/user#3_delete_a_user
   */
  async delete(params: I.DeleteOption) {
    const url = `users/${params.user_id}`;
    return this.wrapper(this.http.delete(url));
  }

  // ===================================================
  // Operating users' channels
  // ===================================================

  /**
   * List my group channels
   *
   * @description Retrieves all group channels that the user has joined. You can create a request based on various query parameters.
   * @see https://docs.sendbird.com/platform/user#3_list_my_group_channels
   */
  async myGroupChannels(params: I.MyGroupChannelsOption) {
    const url = `users/${params.user_id}/my_group_channels`;
    return this.wrapper(this.http.get<I.MyGroupChannelsResult>(url, { params })); // prettier-ignore
  }

  /**
   * Leave my group channels
   *
   * @description Makes a user leave all joined group channels.
   * @see https://docs.sendbird.com/platform/user#3_leave_my_group_channels
   */
  async leaveMyGroupChannels(params: I.LeaveMyGroupChannelsOption) {
    const url = `users/${params.user_id}/my_group_channels/leave`;
    return this.wrapper(this.http.put(url, params));
  }

  /**
   * View number of unread messages
   *
   * @description Retrieves the total number of a user’s currently unread messages in the group channels. The unread counts feature is `only available` for the group channels.
   * @see https://docs.sendbird.com/platform/user#3_view_number_of_unread_messages
   */
  async unreadMessageCount(params: I.UnreadMessageCountOption) {
    const url = `users/${params.user_id}/unread_message_count`;
    return this.wrapper(this.http.get<I.UnreadMessageCountResult>(url, { params })); // prettier-ignore
  }

  /**
   * View number of unread items
   *
   * @description Retrieves a set of total numbers of a user's unread messages, unread mentioned messages, or received invitations in either super or non-super group channels. This action is `only available` for the group channels.
   * @see https://docs.sendbird.com/platform/user#3_view_number_of_unread_items
   */
  async unreadItemCount(params: I.UnreadItemCountOption) {
    const url = `users/${params.user_id}/unread_item_count`;
    return this.wrapper(this.http.get<I.UnreadItemCountResult>(url, { params })); // prettier-ignore
  }

  /**
   * View number of channels with unread messages
   *
   * @description Retrieves the total number of a user’s group channels with unread messages.
   * @see https://docs.sendbird.com/platform/user#3_view_number_of_channels_with_unread_messages
   */
  async unreadChannelCount(params: I.UnreadChannelCountOption) {
    const url = `users/${params.user_id}/unread_channel_count`;
    return this.wrapper(this.http.get<I.UnreadChannelCountResult>(url, { data: params })); // prettier-ignore
  }

  /**
   * View number of channels by join status
   *
   * @description Retrieves the number of a user's group channels by their join status.
   * @see https://docs.sendbird.com/platform/user#3_view_number_of_channels_by_join_status
   */
  async groupChannelCount(params: I.GroupChannelCountOption) {
    const url = `users/${params.user_id}/group_channel_count`;
    return this.wrapper(this.http.get<I.GroupChannelCountResult>(url, { data: params })); // prettier-ignore
  }

  /**
   * View count preference of a channel
   *
   * @description Retrieves count preference of a specific group channel of a user.
   * @see https://docs.sendbird.com/platform/user#3_view_count_preference_of_a_channel
   */
  async countPreference(params: I.CountPreferenceOption) {
    const url = `users/${params.user_id}/count_preference/${params.channel_url}`;
    return this.wrapper(this.http.get<I.CountPreferenceResult>(url));
  }

  /**
   * Update count preference of a channel
   *
   * @description Updates count preference of a specific group channel of a user.
   * @see https://docs.sendbird.com/platform/user#3_update_count_preference_of_a_channel
   */
  async updateCountPreference(params: I.UpdateCountPreferenceOption) {
    const url = `users/${params.user_id}/count_preference/${params.channel_url}`;
    return this.wrapper(this.http.put<I.UpdateCountPreferenceResult>(url, params));
  }

  /**
   * View channel invitation preference
   *
   * @description Retrieves channel invitation preference for a user's private group channels.
   * @see https://docs.sendbird.com/platform/user#3_view_channel_invitation_preference
   */
  async channelInvitationPreference(params: I.UserIdOption) {
    const url = `users/${params.user_id}/channel_invitation_preference`;
    return this.wrapper(this.http.get<I.ChannelInvitationPreferenceResult>(url));
  }

  /**
   * Update channel invitation preference
   *
   * @description Updates the channel invitation preference for a user's private group channels.
   * @see https://docs.sendbird.com/platform/user#3_view_channel_invitation_preference
   */
  async updateChannelInvitationPreference(params: I.UpdateChannelInvitationPreferenceOption) {
    const url = `users/${params.user_id}/channel_invitation_preference`;
    return this.wrapper(this.http.put<I.UpdateChannelInvitationPreferenceResult>(url, params));
  }

  /**
   * Mark all messages as read
   *
   * @description Marks all of a user’s unread messages as read in the joined group channels.
   * @see https://docs.sendbird.com/platform/user#3_mark_all_messages_as_read
   */
  async markAsReadAll(params: I.MarkAsReadAllOption) {
    const url = `users/${params.user_id}/mark_as_read_all`;
    return this.wrapper(this.http.put(url, null, { params })); // prettier-ignore
  }

  /**
   * Register as an operator to channels with custom channel types
   *
   * @description Registers a user as an operator to channels with particular custom channel types.
   * @see https://docs.sendbird.com/platform/user#3_register_as_an_operator_to_channels_with_custom_channel_types
   */
  async operatingChannelCustomTypes(params: I.OperatingChannelCustomTypesOption) {
    const url = `users/${params.user_id}/operating_channel_custom_types`;
    return this.wrapper(this.http.post(url, params));
  }

  /**
   * List banned channels
   *
   * @description Retrieves a list of open and group channels with additional information where a user is banned.
   * @see https://docs.sendbird.com/platform/user#3_list_banned_channels
   */
  async getBannedChannels(params: I.GetBannedChannelsOption) {
    const url = `users/${params.user_id}/ban`;
    return this.wrapper(this.http.get<I.GetBannedChannelsResult>(url, { params })); // prettier-ignore
  }

  /**
   * Ban from channels with custom channel types
   *
   * @description Bans a user from channels with particular custom channel types.
   * @see https://docs.sendbird.com/platform/user#3_ban_from_channels_with_custom_channel_types
   */
  async bannedChannelCustomTypes(params: I.BannedChannelCustomTypesOption) {
    const url = `users/${params.user_id}/banned_channel_custom_types`;
    return this.wrapper(this.http.post(url, params));
  }

  /**
   * List muted channels
   *
   * @description Retrieves a list of open and group channels with additional information where a user is muted.
   * @see https://docs.sendbird.com/platform/user#3_list_muted_channels
   */
  async getMutedChannels(params: I.GetMutedChannelsOption) {
    const url = `users/${params.user_id}/mute`;
    return this.wrapper(this.http.get<I.GetMutedChannelsResult>(url, { params })); // prettier-ignore
  }

  /**
   * Mute in channels with custom channel types
   *
   * @description Mutes a user in channels with particular custom channel types.
   * @see https://docs.sendbird.com/platform/user#3_mute_in_channels_with_custom_channel_types
   */
  async mutedChannelCustomTypes(params: I.MutedChannelCustomTypesOption) {
    const url = `users/${params.user_id}/muted_channel_custom_types`;
    return this.wrapper(this.http.post(url, params));
  }

  /**
   * List blocked users
   *
   * @description Retrieves a list of other users that a user has blocked.
   * @see https://docs.sendbird.com/platform/user#3_list_blocked_users
   */
  async getBlockedUsers(params: I.GetBlockedUsersOption) {
    const url = `users/${params.user_id}/block`;
    return this.wrapper(this.http.get<I.GetBlockedUsersResult>(url, { params })); // prettier-ignore
  }

  /**
   * Block a user
   *
   * @description Allows a user to block another user. A user doesn't receive messages from someone they have blocked anymore. Also, blocking someone doesn't alert them that they have been blocked. Blocked users still can send messages as normal in the channel: however, they can't receive any messages from the users who have blocked them.
   * @see https://docs.sendbird.com/platform/user#3_block_a_user
   */
  async blockUser(params: I.BlockUserOption) {
    const url = `users/${params.user_id}/block`;
    return this.wrapper(this.http.post<I.User>(url, params));
  }

  /**
   * Unblock a user
   *
   * @description Unblocks the user.
   * @see https://docs.sendbird.com/platform/user#3_unblock_a_user
   */
  async unblockUser(params: I.UnblockUserOption) {
    const url = `users/${params.user_id}/block/${params.target_id}`;
    return this.wrapper(this.http.delete(url));
  }

  // ===================================================
  // Managing users' push notifications
  // ===================================================

  /**
   * List registration or device tokens
   *
   * @description Retrieves a list of the registration or device tokens of a user. You can specify either `gcm` or `apns` in the `token_type` parameter, depending on which push notification service you are using.
   * @see https://docs.sendbird.com/platform/user#3_list_registration_or_device_tokens
   */
  async getDeviceTokens(params: I.GetDeviceTokensOption) {
    const url = `users/${params.user_id}/push/${params.token_type}`;
    return this.wrapper(this.http.get<I.GetDeviceTokensResult>(url));
  }

  /**
   * Add a registration or device token
   *
   * @description Adds a registration or device token of a user for push notification service. Depending on which push service you are using, you can pass one of two values in `token_type`: `gcm`, or `apns`. A registration token (FCM) and a device token (APNs) allow identification of each client app instance on each device, and are generated and registered by Android and iOS apps through the corresponding SDK. Use this method if you need to register a token via your own server.
   * @see https://docs.sendbird.com/platform/user#3_list_registration_or_device_tokens
   */
  async addDeviceTokens(params: I.AddDeviceTokensOption) {
    const url = `users/${params.user_id}/push/${params.token_type}`;
    return this.wrapper(this.http.post<I.AddDeviceTokensResult>(url, params));
  }

  /**
   * Remove a registration or device token
   *
   * @description Removes a user's one or more registration or device tokens for push notification service.
   * @see https://docs.sendbird.com/platform/user#3_remove_a_registration_or_device_token
   */
  async removeDeviceTokens(params: I.RemoveDeviceTokensOption) {
    const url = `users/${params.user_id}/push/${params.token_type}/${params.token || ''}`;
    return this.wrapper(this.http.delete<I.RemoveDeviceTokensResult>(url));
  }

  /**
   * View who owns a registration or device token
   *
   * @description Retrieves a user who owns a registration or device token of a user. You can pass one of two values in `token_type`: `gcm`, or `apns`, depending on which push service you are using.
   * @see https://docs.sendbird.com/platform/user#3_remove_a_registration_or_device_token
   */
  async viewWhoOwnDeviceToken(params: I.ViewWhoOwnDeviceTokenOption) {
    const url = `push/device_tokens/${params.token_type}/${params.token}`;
    return this.wrapper(this.http.get<I.ViewWhoOwnDeviceTokenResult>(url));
  }

  /**
   * Remove a registration or device token from an owner
   *
   * @description Removes a registration or device token from a user who owns it. You can pass one of two values in `token_type`: `gcm`, or `apns`, depending on which push service you are using.
   * @see https://docs.sendbird.com/platform/user#3_remove_a_registration_or_device_token_from_an_owner
   */
  async removeDeviceTokenFromOwner(params: I.RemoveDeviceTokenFromOwnerOption) {
    const url = `push/device_tokens/${params.token_type}/${params.token}`;
    return this.wrapper(this.http.delete<I.RemoveDeviceTokenFromOwnerResult>(url));
  }

  /**
   * View push preferences
   *
   * @description Retrieves a user’s push preferences about whether the user has set `do_not_disturb` to pause notifications for a certain period of time, and the time frame in which the user has applied the setting.
   * @see https://docs.sendbird.com/platform/user#3_view_push_preferences
   */
  async viewPushReference(params: I.UserIdOption) {
    const url = `users/${params.user_id}/push_preference`;
    return this.wrapper(this.http.get<I.ViewPushReferenceResult>(url));
  }

  /**
   * Update push preferences
   *
   * @description Updates a user's push preferences. Through this action, you can set `do_not_disturb` for a user, and update the time frame in which the setting applies.
   * @see https://docs.sendbird.com/platform/user#3_update_push_preferences
   */
  async updatePushReference(params: I.UpdatePushReferenceOption) {
    const url = `users/${params.user_id}/push_preference`;
    return this.wrapper(this.http.put<I.UpdatePushReferenceResult>(url));
  }

  /**
   * Update push preferences
   * - `do_not_disturb` and `snooze_enabled` are set to `false`.
   * - The values of the parameters associated with the time frame are all set to 0.
   * - `timezone` is reset to UTC.
   * - `push_sound` is reset to default.
   *
   * @see https://docs.sendbird.com/platform/user#3_reset_push_preferences
   */
  async resetPushReference(params: I.UserIdOption) {
    const url = `users/${params.user_id}/push_preference`;
    return this.wrapper(this.http.delete(url));
  }

  /**
   * View push preferences for a channel
   *
   * @description Retrieves whether a user has turned on notification messages for a specific channel. The push notifications feature is **only available** for group channels.
   * @see https://docs.sendbird.com/platform/user#3_view_push_preferences_for_a_channel
   */
  async viewPushReferenceForChannel(params: I.ViewPushReferenceForChannelOption) {
    const url = `users/${params.user_id}/push_preference/${params.channel_url}`;
    return this.wrapper(this.http.get<I.ViewPushReferenceForChannelResult>(url));
  }

  /**
   * Update push preferences for a channel
   *
   * @description Updates push preferences for a user's specific group channel. The push notifications feature is **only available** for group channels.
   * @see https://docs.sendbird.com/platform/user#3_update_push_preferences_for_a_channel
   */
  async updatePushReferenceForChannel(params: I.UpdatePushReferenceForChannelOption) {
    const url = `users/${params.user_id}/push_preference/${params.channel_url}`;
    return this.wrapper(this.http.put<I.UpdatePushReferenceForChannelResult>(url));
  }

  /**
   * Choose a push notification template
   *
   * @description Chooses a push notification template of a user's own. The push notifications feature is only available for group channels.
   * @see https://docs.sendbird.com/platform/user#3_choose_a_push_notification_template
   */
  async choosePushNotificationTemplate(params: I.ChoosePushNotificationTemplateOption) {
    const url = `users/${params.user_id}/push/template`;
    return this.wrapper(this.http.put<I.ChoosePushNotificationTemplateResult>(url, params));
  }
}
