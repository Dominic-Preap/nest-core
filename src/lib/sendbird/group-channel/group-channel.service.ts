import { SendBirdHelper } from '../sendbird.helper';
import * as U from '../user';
import * as I from './group-channel.interface';

export class GroupChannelService extends SendBirdHelper {
  // ===================================================
  // Managing channels
  // ===================================================

  /**
   * List channels
   *
   * ​@description Retrieves a list of group channels in the application.
   * @see https://docs.sendbird.com/platform/group_channel#3_list_channels
   */
  async list(params?: I.ListOption) {
    return this.wrapper(this.http.get<I.ListResult>(`group_channels`, { params })); // prettier-ignore
  }

  /**
   * View a channel
   *
   * ​@description Retrieves information on a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_view_a_channel
   */
  async view(params: I.ViewOption) {
    const url = `group_channels/${params.channel_url}`;
    return this.wrapper(this.http.get<I.GroupChannel>(url, { params })); // prettier-ignore
  }

  /**
   * Create a channel
   *
   * ​@description Creates a new group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_create_a_channel
   */
  async create(params: I.CreateOption) {
    // return this.wrapper(this.http.post<I.GroupChannel>(`group_channels`, params));

    const config = this.getFormData(params, 'cover_file');
    return this.wrapper(this.http.post<I.GroupChannel>(`group_channels`, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * Update a channel
   *
   * ​@description Updates information on a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_update_a_channel
   */
  async update(params: I.UpdateOption) {
    const url = `group_channels/${params.channel_url}`;
    // return this.wrapper(this.http.put<I.GroupChannel>(url, params));

    const config = this.getFormData(params, 'cover_file');
    return this.wrapper(this.http.put<I.GroupChannel>(url, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * List members
   *
   * ​@description Retrieves a list of members of a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_list_members
   */
  async listMembers(params: I.ListMembersOption) {
    const url = `group_channels/${params.channel_url}/members`;
    return this.wrapper(this.http.get<I.ListMembersResult>(url, { params })); // prettier-ignore
  }

  /**
   * Check if member
   *
   * ​@description Checks whether the user is a member of the group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_check_if_member
   */
  async checkIfMember(params: I.CheckIfMemberOption) {
    const url = `group_channels/${params.channel_url}/members/${params.user_id}`;
    return this.wrapper(this.http.get<I.CheckIfMemberResult>(url));
  }

  /**
   * Invite as members
   *
   * ​@description Invites one or more users as members into the group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_invite_as_members
   */
  async inviteAsMembers(params: I.InviteAsMembersOption) {
    const url = `group_channels/${params.channel_url}/invite`;
    return this.wrapper(this.http.post<I.GroupChannel>(url, params));
  }

  /**
   * Accept an invitation
   *
   * ​@description Accepts an invitation from a private group channel for a user to join.
   * @see https://docs.sendbird.com/platform/group_channel#3_accept_an_invitation
   */
  async acceptInvitation(params: I.AcceptInvitationOption) {
    const url = `group_channels/${params.channel_url}/accept`;
    return this.wrapper(this.http.put<I.GroupChannel>(url, params));
  }

  /**
   * Decline an invitation
   *
   * ​@description Declines an invitation for a user to not join a private group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_decline_an_invitation
   */
  async declineInvitation(params: I.DeclineInvitationOption) {
    const url = `group_channels/${params.channel_url}/decline`;
    return this.wrapper(this.http.put(url, params));
  }

  /**
   * Join a channel
   *
   * ​@description Allows a user to join a public group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_join_a_channel
   */
  async joinChannel(params: I.JoinChannelOption) {
    const url = `group_channels/${params.channel_url}/join`;
    return this.wrapper(this.http.put(url, params));
  }

  /**
   * Leave a channel
   *
   * ​@description Makes one or more members leave a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_leave_a_channel
   */
  async leaveChannel(params: I.LeaveChannelOption) {
    const url = `group_channels/${params.channel_url}/leave`;
    return this.wrapper(this.http.put(url, params));
  }

  /**
   * Hide or archive a channel
   *
   * ​@description Hides or archives a channel from a list of a specific user’s group channels.
   * @see https://docs.sendbird.com/platform/group_channel#3_hide_or_archive_a_channel
   */
  async hideChannel(params: I.HideChannelOption) {
    const url = `group_channels/${params.channel_url}/hide`;
    return this.wrapper(this.http.put(url, params));
  }

  /**
   * Unhide or unarchive a channel
   *
   * ​@description Unhides or unarchives a channel, and then gets the channel appeared back in a list of a specific user’s group channels.
   * @see https://docs.sendbird.com/platform/group_channel#3_unhide_or_unarchive_a_channel
   */
  async unhideChannel(params: I.UnhideChannelOption) {
    const url = `group_channels/${params.channel_url}/hide`;
    return this.wrapper(this.http.delete(url, { data: params, params })); // prettier-ignore
  }

  /**
   * Reset chat history
   *
   * ​@description Resets the properties related to a user’s chat history in a group channel, then clears the existing messages in the channel on the user’s side only.
   * @see https://docs.sendbird.com/platform/group_channel#3_reset_chat_history
   */
  async resetUserHistory(params: I.ResetUserHistoryOption) {
    const url = `group_channels/${params.channel_url}/reset_user_history`;
    return this.wrapper(this.http.put(url, params));
  }

  /**
   * Freeze a channel
   *
   * ​@description Freezes or unfreezes a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_freeze_a_channel
   */
  async freeze(params: I.FreezeOption) {
    const url = `group_channels/${params.channel_url}/freeze`;
    return this.wrapper(this.http.put<I.GroupChannel>(url, params));
  }

  /**
   * Delete a channel
   *
   * ​@description Deletes a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_delete_a_channel
   */
  async delete(params: I.DeleteOption) {
    const url = `group_channels/${params.channel_url}`;
    return this.wrapper(this.http.delete(url));
  }

  // ===================================================
  // Operators of channels
  // ===================================================

  /**
   * List operators
   *
   * ​@description Retrieves a list of the operators of a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_list_operators
   */
  async listOperators(params: I.ListOperatorsOption) {
    const url = `group_channels/${params.channel_url}/operators`;
    return this.wrapper(this.http.get<I.ListOperatorsResult>(url, { params })); // prettier-ignore
  }

  /**
   * Register operators
   *
   * ​@description Registers one or more operators to a group channel. This action is **not available** from SDK.
   * @see https://docs.sendbird.com/platform/group_channel#3_register_operators
   */
  async registerOperators(params: I.RegisterOperatorsOption) {
    const url = `group_channels/${params.channel_url}/operators`;
    return this.wrapper(this.http.post(url, params));
  }

  /**
   * Unregister operators
   *
   * ​@description Unregisters one or more operators from a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_unregister_operators
   */
  async unregisterOperators(params: I.UnregisterOperatorsOption) {
    const url = `group_channels/${params.channel_url}/operators`;
    return this.wrapper(this.http.delete(url, { data: params })); // prettier-ignore
  }

  // ===================================================
  // Moderation for channels
  // ===================================================

  /**
   * List banned users
   *
   * ​@description Retrieves a list of the banned users from a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_list_banned_users
   */
  async listBannedUsers(params: I.ListBannedUsersOption) {
    const url = `group_channels/${params.channel_url}/ban`;
    return this.wrapper(this.http.get<I.ListBannedUsersResult>(url, { params })); // prettier-ignore
  }

  /**
   * View a ban
   *
   * ​@description Retrieves details of a ban imposed on a user.
   * @see https://docs.sendbird.com/platform/group_channel#3_list_banned_users
   */
  async viewBannedUser(params: I.ViewBannedUserOption) {
    const url = `group_channels/${params.channel_url}/ban/${params.banned_user_id}`;
    return this.wrapper(this.http.get<U.User>(url));
  }

  /**
   * Ban a user
   *
   * ​@description Bans a user from a group channel. A banned user is immediately expelled from a channel and allowed to join the channel again after a set time period.
   * @see https://docs.sendbird.com/platform/group_channel#3_ban_a_user
   */
  async banUser(params: I.BanUserOption) {
    const url = `group_channels/${params.channel_url}/ban`;
    return this.wrapper(this.http.post<I.BanUserResult>(url, params));
  }

  /**
   * Update a ban
   *
   * ​@description Updates details of a ban imposed on a user. You can change the length of the ban with this action, and also provide an updated description.
   * @see https://docs.sendbird.com/platform/group_channel#3_update_a_ban
   */
  async updateBannedUser(params: I.UpdateBannedUserOption) {
    const url = `group_channels/${params.channel_url}/ban/${params.banned_user_id}`;
    return this.wrapper(this.http.put<U.User>(url, params));
  }

  /**
   * Unban user
   *
   * ​@description Unbans a user from a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_unban_a_user
   */
  async unbanUser(params: I.UnbanUserOption) {
    const url = `group_channels/${params.channel_url}/ban/${params.banned_user_id}`;
    return this.wrapper(this.http.delete(url));
  }

  /**
   * List muted users
   *
   * ​@description Retrieves a list of the muted users in a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_list_muted_users
   */
  async listMutedUsers(params: I.ListMutedUsersOption) {
    const url = `group_channels/${params.channel_url}/mute`;
    return this.wrapper(this.http.get<I.ListMutedUsersResult>(url, { params })); // prettier-ignore
  }

  /**
   * View a mute
   *
   * ​@description Checks if a user is muted in a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_view_a_mute
   */
  async viewMutedUser(params: I.ViewMutedUserOption) {
    const url = `group_channels/${params.channel_url}/mute/${params.muted_user_id}`;
    return this.wrapper(this.http.get<I.ViewMutedUserResult>(url));
  }

  /**
   * Mute a user
   *
   * ​@description Mutes a user in a group channel. A muted user remains in the channel and is allowed to view the messages, but can't send any messages until unmuted.
   * @see https://docs.sendbird.com/platform/group_channel#3_mute_a_user
   */
  async muteUser(params: I.MuteUserOption) {
    const url = `group_channels/${params.channel_url}/mute`;
    return this.wrapper(this.http.post<I.GroupChannel>(url, params));
  }

  /**
   * Unmute a user
   *
   * ​@description Unmutes a user within a group channel.
   * @see https://docs.sendbird.com/platform/group_channel#3_unmute_a_user
   */
  async unmuteUser(params: I.UnmuteUserOption) {
    const url = `group_channels/${params.channel_url}/mute/${params.muted_user_id}`;
    return this.wrapper(this.http.delete(url));
  }
}
