import { SendBirdHelper } from '../sendbird.helper';
import * as U from '../user';
import * as I from './open-channel.interface';

export class OpenChannelService extends SendBirdHelper {
  // ===================================================
  // Managing channels
  // ===================================================

  /**
   * List channels
   *
   * ​@description Retrieves a list of open channels. You can query the list using various parameters.
   * @see https://docs.sendbird.com/platform/open_channel#3_list_channels
   */
  async list(params?: I.ListOption) {
    return this.wrapper(this.http.get<I.ListResult>(`open_channels`, { params })); // prettier-ignore
  }

  /**
   * View a channel
   *
   * ​@description Retrieves information on a specific open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_view_a_channel
   */
  async view(params: I.ViewOption) {
    const url = `open_channels/${params.channel_url}`;
    return this.wrapper(this.http.get<I.OpenChannel>(url, { params })); // prettier-ignore
  }

  /**
   * Create a channel
   *
   * ​@description Creates an open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_create_a_channel
   */
  async create(params: I.CreateOption) {
    // return this.wrapper(this.http.post<I.OpenChannel>(`open_channels`, params));

    const config = this.getFormData(params, 'cover_file');
    return this.wrapper(this.http.post<I.OpenChannel>('open_channels', config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * Update a channel
   *
   * ​@description Updates information on an open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_update_a_channel
   */
  async update(params: I.UpdateOption) {
    const url = `open_channels/${params.channel_url}`;
    // return this.wrapper(this.http.put<I.OpenChannel>(url, params));

    const config = this.getFormData(params, 'cover_file');
    return this.wrapper(this.http.put<I.OpenChannel>(url, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * List participants
   *
   * ​@description Retrieves a list of the participants of an open channel. A participant refers to a user who has entered the open channel and is currently online.
   * @see https://docs.sendbird.com/platform/open_channel#3_list_participants
   */
  async listParticipants(params: I.ListParticipantsOption) {
    const url = `open_channels/${params.channel_url}/participants`;
    return this.wrapper(this.http.get<I.ListParticipantsResult>(url, { params })); // prettier-ignore
  }

  /**
   * Freeze a channel
   *
   * ​@description Freezes or unfreezes an open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_freeze_a_channel
   */
  async freeze(params: I.FreezeOption) {
    const url = `open_channels/${params.channel_url}/freeze`;
    return this.wrapper(this.http.put<I.OpenChannel>(url, params));
  }

  /**
   * Delete a channel
   *
   * ​@description Deletes an open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_delete_a_channel
   */
  async delete(params: I.DeleteOption) {
    const url = `open_channels/${params.channel_url}`;
    return this.wrapper(this.http.delete(url));
  }

  // ===================================================
  // Moderation for channels
  // ===================================================

  /**
   * List banned users
   *
   * ​@description Retrieves a list of banned users from a specific open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_list_banned_users
   */
  async listBannedUsers(params: I.ListBannedUsersOption) {
    const url = `open_channels/${params.channel_url}/ban`;
    return this.wrapper(this.http.get<I.ListBannedUsersResult>(url, { params })); // prettier-ignore
  }

  /**
   * View a ban
   *
   * ​@description Retrieves details of a ban imposed on a user.
   * @see https://docs.sendbird.com/platform/open_channel#3_view_a_ban
   */
  async viewBannedUser(params: I.ViewBannedUserOption) {
    const url = `open_channels/${params.channel_url}/ban/${params.banned_user_id}`;
    return this.wrapper(this.http.get<U.User>(url));
  }

  /**
   * Ban a user
   *
   * ​@description Bans a user from an open channel. A banned user is immediately expelled from a channel and allowed to participate in the channel again after a set time period.
   * @see https://docs.sendbird.com/platform/open_channel#3_ban_a_user
   */
  async banUser(params: I.BanUserOption) {
    const url = `open_channels/${params.channel_url}/ban`;
    return this.wrapper(this.http.post<I.BanUserResult>(url, params));
  }

  /**
   * Update a ban
   *
   * ​@description Updates details of a ban imposed on a user. You can change the length of a ban with this action, and also provide an updated description.
   * @see https://docs.sendbird.com/platform/open_channel#3_update_a_ban
   */
  async updateBannedUser(params: I.UpdateBannedUserOption) {
    const url = `open_channels/${params.channel_url}/ban/${params.banned_user_id}`;
    return this.wrapper(this.http.put<U.User>(url, params));
  }

  /**
   * Unban user
   *
   * ​@description Unbans a user from an open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_unban_a_user
   */
  async unbanUser(params: I.UnbanUserOption) {
    const url = `open_channels/${params.channel_url}/ban/${params.banned_user_id}`;
    return this.wrapper(this.http.delete(url));
  }

  /**
   * List muted users
   *
   * ​@description Retrieves a list of muted users in the channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_list_muted_users
   */
  async listMutedUsers(params: I.ListMutedUsersOption) {
    const url = `open_channels/${params.channel_url}/mute`;
    return this.wrapper(this.http.get<I.ListMutedUsersResult>(url, { params })); // prettier-ignore
  }

  /**
   * View a mute
   *
   * ​@description Checks if a user is muted in an open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_view_a_mute
   */
  async viewMutedUser(params: I.ViewMutedUserOption) {
    const url = `open_channels/${params.channel_url}/mute/${params.muted_user_id}`;
    return this.wrapper(this.http.get<I.ViewMutedUserResult>(url));
  }

  /**
   * Mute a user
   *
   * ​@description Mutes a user in the channel. A muted user remains in the channel and is allowed to view the messages, but can't send any messages until unmuted.
   * @see https://docs.sendbird.com/platform/open_channel#3_mute_a_user
   */
  async muteUser(params: I.MuteUserOption) {
    const url = `open_channels/${params.channel_url}/mute`;
    return this.wrapper(this.http.post<I.OpenChannel>(url, params));
  }

  /**
   * Unmute a user
   *
   * ​@description Unmutes a user from an open channel.
   * @see https://docs.sendbird.com/platform/open_channel#3_unmute_a_user
   */
  async unmuteUser(params: I.UnmuteUserOption) {
    const url = `open_channels/${params.channel_url}/mute/${params.muted_user_id}`;
    return this.wrapper(this.http.delete(url));
  }
}
