import { BaseLimitTokenOption, BaseNextOption, Metadata } from '../_base';
import { BaseListChannelOption, GroupChannel } from '../group-channel';

export interface User {
  /**
   * The unique ID of the user.
   */
  user_id: string;

  /**
   * The user's nickname.
   */
  nickname: string;

  /**
   * The URL of the user’s profile image.
   */
  profile_url: string;

  /**
   * An opaque string that identifies the user. It is recommended that every user has their own access token and provides it upon login for security.
   */
  access_token: string;

  /**
   * An array of information of session tokens that identifies the user session and which have no validity after their own expiration time.
   * Each of items consists of two `session_token` and `expires_at` properties.
   * The `session_token` is an opaque string and `expires_at` is a validation period of the session token.
   * It is recommended that a new session token is periodically issued to every user, and provided upon the user's login for security.
   */
  session_tokens: Array<{
    session_token: string;
    expires_at: number;
  }>;

  /**
   * Indicates whether the user has ever logged into the application so far.
   */
  has_ever_logged_in: boolean;

  /**
   * Indicates whether the user is currently active within the application.
   */
  is_active: boolean;

  /**
   * Indicates whether the user is currently connected to SendBird server.
   */
  is_online: boolean;

  /**
   * An array of unique keys of the user which is provided to SendBird server for discovering friends.
   * By using the keys, the server can identify and match the user with other users.
   */
  discovery_keys: string[];

  /**
   * An array of one or more language codes to translate notification messages to preferred languages.
   * Up to 4 languages can be set for the user. If messages are sent in one of the preferred languages, notification messages won't be translated.
   * If messages are sent in a language other than the preferred languages, notification messages will be translated into the first language in the array.
   * In addition, the messages translated into other preferred languages will be provided in the `sendbird` property of a notification message payload.
   */
  preferred_languages: string[];

  /**
   * The time recorded when the user goes offline, to indicate when they were last online, in the Unix milliseconds format.
   * If the user is online, the value is set as 0.
   */
  last_seen_at: number;

  /**
   * An array of key-value items which store additional user information. For more information, see the User `Metadata` section
   */
  metadata: Metadata;
}

export interface UserIdOption {
  /**
   * Specifies the unique ID of the target user.
   */
  user_id: string;
}

// ===================================================
// Managing users
// ===================================================

export interface ListOption extends BaseLimitTokenOption {
  /**
   * Specifies the activation status of the users in the list. Acceptable values are
   * limited to `activated`, `deactivated`, and `all`. If set to activated, users as
   * `is_active=true` are returned. If set to `deactivated`, users as `is_active=false` are returned. (Default: activated)
   *
   * @default activated
   */
  active_mode?: 'activated' | 'deactivated' | 'all';

  /**
   * Determines whether to include bots in the list. (Default: true)
   *
   * @default true
   */
  show_bot?: boolean;

  /**
   * Searches for users who are using the user IDs in the specified value. The string should consist of multiple
   * urlencoded user IDs separated by commas (for example, `?user_ids=urlencoded_id_1,urlencoded_id_2`).
   */
  user_ids?: string;

  /**
   * Searches for users who are using the specified value. Urlencoding the value is recommended.
   */
  nickname?: string;

  /**
   * Searches for users whose nicknames start with the specified value. Urlencoding the value is recommended.
   */
  nickname_startswith?: string;

  /**
   * Searches for users with metadata containing an item with the specified value as its key.
   * This should be specified in conjunction with the `metadatavalues_in` parameter below.
   */
  metadatakey?: string;

  /**
   * Searches for users with metadata containing an item with the key specified by the `metadatakey`
   * parameter above, and the value of that item matches one or more values specified by this parameter.
   * The string should be specified with multiple urlencoded metadata values separated by commas
   * (for example, `?metadatavalues_in=urlencoded_value_1, urlencoded_value_2`.
   * This parameter should be specified in conjunction with the `metadatakey` above.
   */
  metadatavalues_in?: string;
}

export interface ListResult extends BaseNextOption {
  /**
   * A list of users.
   */
  users: User[];
}

export interface ViewOption extends UserIdOption {
  /**
   * Specifies a comma-separated string of one or more custom types to filter the user's group channels with the corresponding types.
   * This is to retrieve the number of the user's unread messages only in the filtered channels.
   * This parameter should be specified in conjunction with the include_unread_count above.
   * Urlencoding each type is recommended `(?custom_types=urlencoded_type_1,urlencoded_type_2)`.
   */
  custom_types?: string;

  /**
   * Determines whether to include the number of the user's unread messages in the group channels in the response. (Default: false)
   *
   * @default false
   */
  include_unread_count?: number;

  /**
   * Restricts the search scope to only retrieve super or nonsuper group channels.
   * Acceptable values are `all`, `super`, and `nonsuper`.
   * This parameter should be specified in conjunction with the include_unread_count above. (Default: `nonsuper`)
   *
   * @default nonsuper
   */
  active_mode?: 'nonsuper' | 'super' | 'all';
}

export interface CreateOption extends UserIdOption {
  /**
   * Specifies the user’s nickname. The length is limited to 80 bytes.
   */
  nickname: string;

  /**
   * Specifies the URL of the user’s profile image. If left empty, no profile image is set for the user. The length is limited to 2,048 bytes.
   * * The domain filter filters out the request if the value of this property matches the filter's domain set.
   */
  profile_url: string;

  /**
   * Uploads the file of the user's profile image. An acceptable image is limited to `JPG` (.jpg), `JPEG` (.jpeg), or `PNG` (.png) file of up to 25 MB.
   */
  profile_file?: any;

  /**
   * Determines whether to create an access token for the user.
   * If `true`, an opaque string token is issued and provided upon creation, which should be passed whenever the user logs in.
   * If `false`, an access token is not required when the user logs in. (Default: `false`)
   *
   * @default false
   */
  issue_access_token?: boolean;

  /**
   * Determines whether to create a session token for the user.
   * If `true`, an opaque string token is issued and provided upon creation, which should be passed whenever the user logs in.
   * If `false`, a session token is not required when the user logs in. (Default: `false`)
   *
   * @default false
   */
  issue_session_token?: boolean;

  /**
   * Specifies the time for the issued session token to expire in the Unix milliseconds format.
   * The length should be 13. If not specified and the `issue_session_token` property above is true,
   * the value of this property is set to the sum of the current timestamp and `604800000` by default,
   * which indicates that the token will be valid for the next `7 days` starting from the current timestamp.
   */
  session_token_expires_at?: number;

  /**
   * Specifies an array of unique keys of the user which is provided to SendBird server for discovering friends.
   * By using the keys, the server can identify and match the user with other users.
   */
  discovery_keys?: string[];

  /**
   * Specifies a `JSON` object that stores `key-value` items. The `key` must not have a comma (,) and its length is limited to 128 bytes.
   * The `value` must be a string and its length is limited to 190 bytes. This property can have yp to `5` items.
   */
  metadata?: Metadata;
}

export interface UpdateOption extends UserIdOption {
  /**
   * Specifies the user’s nickname. The length is limited to 80 bytes.
   */
  nickname?: string;

  /**
   * Specifies the URL of the user’s profile image. The length is limited to 2,048 bytes.
   * * The domain filter filters out the request if the value of this property matches the filter's domain set.
   */
  profile_url?: string;

  /**
   * Uploads the file of the user's profile image. An acceptable image is limited to `JPG` (.jpg), `JPEG` (.jpeg), or `PNG` (.png) file of up to 25 MB.
   */
  profile_file?: any;

  /**
   * Determines whether to revoke the existing access token and create a new one for the user.
   * If `true`, an opaque string token is issued and provided upon creation, which should be passed whenever the user logs in.
   * If `false`, an access token is not required when the user logs in. (Default: `false`)
   *
   * @default false
   */
  issue_access_token?: boolean;

  /**
   * Determines whether to add a new session token for the user.
   * If `true`, an opaque string token is issued and provided upon creation, which should be passed whenever the user logs in.
   * If `false`, a session token is not required when the user logs in. (Default: `false`)
   *
   * @default false
   */
  issue_session_token?: boolean;

  /**
   * Specifies the time for the issued session token to expire in the Unix milliseconds format.
   * The length should be 13. If not specified and the `issue_session_token` property above is `true`,
   * the value of this property is set to the sum of the current timestamp and `604800000` by default,
   * which indicates that the token will be valid for the next `7 days` starting from the current timestamp.
   */
  session_token_expires_at?: number;

  /**
   * Determines whether to activate or deactivate the user within the application.
   */
  is_active?: boolean;

  /**
   * Specifies the time when the user goes offline, to indicate when they were last online, in the Unix milliseconds format.
   */
  last_seen_at?: number;

  /**
   * Specifies an array of unique keys of the user which is provided to SendBird server for discovering friends.
   * By using the keys, the server can identify and match the user with other users.
   */
  discovery_keys?: string[];

  /**
   * Specifies an array of one or more language codes to translate notification messages to preferred languages. Up to 4 languages can be set for the user.
   * If messages are sent in one of the preferred languages, notification messages won't be translated.
   * If messages are sent in a language other than the preferred languages, notification messages will be translated into the first language in the array.
   * In addition, the messages translated into other preferred languages will be provided in the sendbird property of a notification message payload.
   */
  preferred_languages?: string[];

  /**
   * Determines whether the user leaves all joined group channels upon deactivation. Note that this value is `true` by default.
   * Use in conjunction with the `is_active` property above.
   */
  leave_all_when_deactivated?: boolean;
}

export type DeleteOption = UserIdOption;

// ===================================================
// Operating users' channels
// ===================================================

export interface MyGroupChannelsOption extends BaseListChannelOption, UserIdOption {
  /**
   * Restricts the search scope to only retrieve distinct or nondistinct group channels.
   * Acceptable values are `all`, `distinct`, and `nondistinct`.
   * - If set to **distinct**, only distinct group channels are returned.
   * - If set to **nondistinct**, only the group channels that are not distinct are returned.
   * - If set to **all**, all group channels are returned. (Default: all)
   *
   * @default all
   */
  distinct_mode?: 'all' | 'distinct' | 'nondistinct';

  /**
   * Restricts the search scope to only retrieve group channels with the specified state and operating behavior
   * in a list of the user's channels. Acceptable values are limited to the following:
   * - `unhidden_only` (default): shown in a list.
   * - `hidden_only`: not shown in a list.
   * - `hidden_allow_auto_unhide`: hidden from a list.
   * - `hidden_prevent_auto_unhide`: archived from a list.
   *
   * @default unhidden_only
   */
  hidden_mode?:
    | 'unhidden_only'
    | 'hidden_only'
    | 'hidden_allow_auto_unhide'
    | 'hidden_prevent_auto_unhide';

  /**
   * Restricts the search scope to retrieve group channels based on whether or not the user has accepted an invitation,
   * or whether or not the user was invited by a friend. Acceptable values are `all`, `invited_only`, `joined_only`, `invited_by_friend`,
   * and `invited_by_non_friend`. (Default: all)
   *
   * @default all
   */
  member_state_filter?:
    | 'all'
    | 'invited_only'
    | 'joined_only'
    | 'invited_by_friend'
    | 'invited_by_non_friend';

  /**
   * Restricts the search scope to only retrieve group channels with one or more unread messages,
   * if specified. Acceptable values are `all` and `unread_message`. (Default: all)
   *
   * @default all
   */
  unread_filter?: 'all' | 'unread_message';

  /**
   * Searches for group channels by the specified query term that matches the channel name or the nickname of the member.
   * This should be specified in conjunction with the `search_fields` parameter below. Urlencoding the value is recommended.
   */
  search_query?: string;

  /**
   * Specifies a comma-separated string of one or more search fields to apply to the query,
   * which restricts the results within the specified fields (`OR` search condition).
   * Acceptable values are limited to `channel_name` and `member_nickname` for now.
   * This is effective only when the `search_query` parameter above is specified.
   * (Default: channel_name,member_nickname together)
   */
  search_fields?: string;
}

export interface MyGroupChannelsResult extends BaseNextOption {
  /**
   * A list of group channels associated with the user.
   */
  channels: GroupChannel[];
}

export interface LeaveMyGroupChannelsOption extends UserIdOption {
  /**
   * Specifies the custom channel type to make the user leave joined group channels with the corresponding type.
   */
  custom_type?: string;
}

export interface UnreadMessageCountOption extends UserIdOption {
  /**
   * Specifies a comma-separated string of one or more custom types to filter the group channels with the corresponding types,
   * to retrieve the number of unread messages in the filtered channels.
   *
   * @example ?custom_types=art,sports
   */
  custom_types?: string;

  /**
   * Restricts the search scope to only retrieve super or nonsuper group channels.
   * Acceptable values are `all`, `super`, and `nonsuper`. (Default: `nonsuper`)
   *
   * @default nonsuper
   */
  super_mode?: 'nonsuper' | 'super' | 'all';
}

export interface UnreadMessageCountResult {
  /**
   * The total number of the user's unread messages.
   */
  unread_count: number;
}

export interface UnreadItemCountOption extends UserIdOption {
  /**
   * Specifies a comma-separated string of one or more item keys to retrieve a set of total numbers of.
   * Acceptable values are limited to the following:
   * - `non_super_group_channel_unread_message_count`: count the total number of the user's unread messages in the non-super group channels only.
   * - `super_group_channel_unread_message_count`: count the total number of the user's unread messages in the super group channels only.
   * - `group_channel_unread_message_count`: count the total number of the user's unread messages in all joined group channels.
   * - `non_super_group_invitation_count`: count the total number of the user's received invitations to the non-super group channels only.
   * - `super_group_channel_invitation_count`: count the total number of the user's received invitations to the super group channels only.
   * - `group_channel_invitation_count`: count the total number of the user's received invitations to all group channels.
   * - `non_super_group_channel_unread_mention_count`: count the total number of the user's mentioned but unread messages in the non-super group channels only.
   * - `super_group_channel_unread_mention_count`: count the total number of the user's mentioned but unread message in the super group channels only.
   * - `group_channel_unread_mention_count`: count the total number of the user's mentioned but unread messages in all joined group channels.
   *
   * @example ?item_keys=non_super_group_channel_unread_message_count,non_super_group_channel_unread_mention_count,non_super_group_invitation_count
   */
  item_keys: string;
}

export interface UnreadItemCountResult {
  group_channel_invitation_count?: number;
  group_channel_unread_mention_count?: number;
  group_channel_unread_message_count?: number;
  non_super_group_channel_unread_mention_count?: number;
  non_super_group_channel_unread_message_count?: number;
  non_super_group_invitation_count?: number;
  super_group_channel_invitation_count?: number;
  super_group_channel_unread_mention_count?: number;
  super_group_channel_unread_message_count?: number;
}

export interface UnreadChannelCountOption extends UserIdOption {
  /**
   * Specifies an array of one or more custom types to filter the group channels with the corresponding types,
   * to retrieve the number of unread messages in the filtered channels.
   */
  custom_types?: string[];

  /**
   * Restricts the search scope to only retrieve super or nonsuper group channels.
   * Acceptable values are `all`, `super`, and `nonsuper`. (Default: `nonsuper`)
   *
   * @default nonsuper
   */
  super_mode?: 'nonsuper' | 'super' | 'all';
}

export interface UnreadChannelCountResult {
  /**
   * The total number of a user's group channels with unread messages.
   */
  unread_count: number;
}

export interface GroupChannelCountOption extends UserIdOption {
  /**
   * Determines which join status to use to filter the user's group channels and count the total number.
   * Acceptable values are `all`, `joined`, `invited`, `invited_by_friend`, and `invited_by_non_friend`.
   * A value of `joined` indicates the number count of the user’s joined channels while `invited` indicates
   * the number count of channels which the user has been invited to but not joined.
   * Moreover, a value of `invited_by_friend` indicates the number count of invited channels by the user’s friends
   * but not joined, while `invited_by_non_friend` indicates the number count of invited channels by non-friends but not joined.
   */
  state?: string;
}

export interface GroupChannelCountResult {
  /**
   * The number of the user's group channels by join status.
   */
  group_channel_count: number;
}

export interface CountPreferenceOption extends UserIdOption {
  /**
   * Specifies the URL of a group channel to retrieve the count preference of.
   */
  channel_url: string;
}

export interface CountPreferenceResult {
  /**
   * Indicates whether to only count the number of unread messages or the number of unread mentioned messages in the specified group channel.
   * Only the one that is chosen to be preferenced is being counted and added to the total number count.
   * A value of `off` indicates that both read statuses are currently not being counted,
   * while `all` indicates that both read statuses are being counted by the system.
   * A value of `unread_message_count_only` indicates that only the user's unread messages are being counted in the channel
   * while `unread_mentioned_count_only` indicates that only the user's unread mentioned messages are being counted.
   * (Default: `all`)
   */
  count_preference: string;
}

export interface UpdateCountPreferenceOption extends CountPreferenceOption, CountPreferenceResult {}

export type UpdateCountPreferenceResult = CountPreferenceResult;

export interface ChannelInvitationPreferenceResult {
  /**
   * Indicates for the user whether or not to automatically join a private group channel promptly from an invitation without having to accept it.
   * (Default: true)
   *
   * @default true
   */
  auto_accept: boolean;
}

export interface UpdateChannelInvitationPreferenceOption
  extends UserIdOption,
    ChannelInvitationPreferenceResult {}

export type UpdateChannelInvitationPreferenceResult = ChannelInvitationPreferenceResult;

export interface MarkAsReadAllOption extends UserIdOption {
  /**
   * Specifies an array of one or more group channel URLs to mark all of the unread messages in as read.
   * If not specified, all of the unread messages in the joined group channels are marked as read.
   *
   * @example ?channel_urls=sendbird_group_channel_24896175_a72c41bacda9d4559f60379b4547f7c6d15d74fe,sendbird_group_channel_24896175_1062a6074f982c05f9c49c6111ccae49eba096b3
   */
  channel_urls: string;
}

export interface OperatingChannelCustomTypesOption extends UserIdOption {
  /**
   * Specifies an array of one or more custom channel types, in order to register the user as an operator to channels with the channel types.
   */
  channel_custom_types: string[];
}

export interface GetBannedChannelsOption extends UserIdOption, BaseLimitTokenOption {}

export interface GetBannedChannelsResult extends BaseNextOption {
  /**
   * A list of the bans which contain information about the ban period, reason, and channel.
   */
  banned_channels: Array<{
    /**
     * The timestamp of when the ban starts, in Unix milliseconds.
     */
    start_at: number;

    /**
     * The timestamp of when the ban is scheduled to end, in Unix milliseconds.
     */
    end_at: number;

    /**
     * A reason for the banning.
     */
    description: string;

    /**
     * A simplified open or group channel resource.
     */
    channel: GroupChannel; // TODO: OpenChannel
  }>;
}

export interface BannedChannelCustomTypesOption extends UserIdOption {
  /**
   * Specifies an array of one or more custom channel types, in order to ban the user from channels with the channel types. The user is permanently banned unless unbanned (10 years, technically).
   */
  channel_custom_types: string[];
}

export interface GetMutedChannelsOption extends UserIdOption, BaseLimitTokenOption {}

export interface GetMutedChannelsResult extends BaseNextOption {
  /**
   * A list of the bans which contain information about the ban period, reason, and channel.
   */
  muted_channels: Array<{
    /**
     * The remaining duration, measured in Unix milliseconds, from the start of the muting to the end_at below which indicates when the user gets unmuted in the channel. A value of -1 indicates that no time limit is imposed on the muting. (Default: -1)
     */
    remaining_duration: number;

    /**
     * The time in seconds when the user gets unmuted in the channel. The value is in Unix milliseconds format. A value of -1 indicates that no time limit is imposed on the muting. (Default: -1)
     */
    end_at: number;

    /**
     * A reason for the banning.
     */
    description: string;

    /**
     * The topic or name of the muted channel.
     */
    name: string;

    /**
     * The custom channel type of the muted channel.
     */
    custom_type: string;

    /**
     * The URL of the muted channel.
     */
    channel_url: string;

    /**
     * The time in which the muted channel was created. The value is in Unix milliseconds format.
     */
    created_at: string;

    /**
     * The URL of the cover image of the muted channel.
     */
    cover_url: string;

    /**
     * Additional data of the muted channel.
     */
    data: string;
  }>;
}

export interface MutedChannelCustomTypesOption extends UserIdOption {
  /**
   * Specifies an array of one or more custom channel types, in order to mute the user in channels with the channel types. The user is permanently muted unless unmuted (10 years, technically).
   */
  channel_custom_types: string[];
}

export interface GetBlockedUsersOption extends UserIdOption, BaseLimitTokenOption {
  /**
   * Searches for users who are using the user IDs in the specified value. The string should consist of multiple urlencoded user IDs separated by commas
   *
   * @example ?user_ids=urlencoded_id_1, urlencoded_id_2
   */
  user_ids?: string;

  /**
   * Searches for blocked users with metadata containing an item with the specified value as its key. This should be specified in conjunction with the metadatavalues_in parameter below.
   */
  metadatakey?: string;

  /**
   * Searches for blocked users with metadata containing an item with the key specified by the metadatakey parameter above, and the value of that item matches one or more values specified by this parameter. The string should be specified with multiple urlencoded metadata values separated by commas (for example, ?metadatavalues_in=urlencoded_value_1, urlencoded_value_2). This parameter should be specified in conjunction with the metadatakey above.
   */
  metadatavalues_in?: string;
}

export interface GetBlockedUsersResult extends BaseNextOption {
  /**
   * A list of blocked users.
   */
  users: User[];
}

export interface BlockUserOption extends UserIdOption {
  /**
   * Specifies the ID of the user to be blocked.
   */
  target_id?: string;

  /**
   * Specifies an array of the IDs of the users to be blocked at a time. (for bulk mode)
   */
  user_ids?: string[];

  /**
   * Specifies an array of the IDs of the users to be blocked at a time. The user_ids above and this property can be used interchangeably. (for bulk mode)
   */
  users?: string[];
}

export interface UnblockUserOption extends UserIdOption {
  /**
   * Specifies the ID of the user to be blocked.
   */
  target_id: string;
}

// ===================================================
// Managing users' push notifications
// ===================================================

export interface GetDeviceTokensOption extends UserIdOption {
  /**
   * Specifies the type of the token to retrieve a list. Acceptable values are `gcm` (for FCM) and `apns` (for APNs).
   */
  token_type: 'gcm' | 'apns';
}

export interface GetDeviceTokensResult {
  /**
   * An array of registration or device tokens for the specified user.
   */
  tokens: string[];

  /**
   * The type of the retrieved tokens, which is either `GCM` or `APNS`.
   */
  type: string[];

  /**
   * The user resource which encapsulates information about the specified user.
   */
  user: User;
}

export interface AddDeviceTokensOption extends GetDeviceTokensOption {
  /**
   * Specifies a registration token for **Firebase Cloud Messaging** (formerly Google Cloud Messaging).
   */
  gcm_reg_token?: string;

  /**
   * Specifies a device token for **Apple Push Notification Service**.
   */
  apns_device_token?: string;
}

export type AddDeviceTokensResult = GetDeviceTokensResult;

export interface RemoveDeviceTokensOption extends GetDeviceTokensOption {
  /**
   * Specifies the registration or device token to remove.
   */
  token?: string;
}

export interface RemoveDeviceTokensResult {
  /**
   * The unregistered token of the user.
   */
  token?: string;

  /**
   * The user resource which encapsulates information about the specified user.
   */
  user: User;
}

export interface ViewWhoOwnDeviceTokenOption {
  /**
   * Specifies the type of the token. Acceptable values are `gcm` (for FCM) and `apns` (for APNs).
   */
  token_type: 'gcm' | 'apns';

  /**
   * Specifies the token to retrieve who owns it.
   */
  token: string;
}

export type ViewWhoOwnDeviceTokenResult = UserIdOption;

export type RemoveDeviceTokenFromOwnerOption = ViewWhoOwnDeviceTokenOption;

export type RemoveDeviceTokenFromOwnerResult = UserIdOption;

export interface ViewPushReferenceResult {
  /**
   * The type of push notification trigger to apply to the user's joined group channels. Valid values are the following:
   * - **all** (default): when disconnected from SendBird server, the user receives notifications for all new messages including mentioned messages the user has been mentioned in.
   * - **mention_only**: when disconnected from SendBird server, the user only receives notifications for messages the user has been mentioned in.
   * - **off**: the user doesn't receive any notifications.
   */
  push_trigger_option: string;

  /**
   * Indicates whether to pause notification messages for the user.
   */
  do_not_disturb: boolean;

  /**
   * The hour to start pausing the notifications.
   */
  start_hour: number;

  /**
   * The minute of the hour to start pausing the notifications.
   */
  start_min: number;

  /**
   * The hour to stop pausing the notifications.
   */
  end_hour: number;

  /**
   * The minute of the hour to stop pausing the notifications.
   */
  end_min: number;

  /**
   * Indicates whether to snooze notification messages for the user during a specific period of time.
   */
  snooze_enabled: string;

  /**
   * The timestamp of when to start snoozing the notifications, in Unix milliseconds.
   */
  snooze_start_ts: number;

  /**
   * The timestamp of when to end snoozing the notifications, in Unix milliseconds.
   */
  snooze_end_ts: number;

  /**
   * The timezone to be applied to push preferences with a value such as **UTC**, **Asia/Seoul**, **Europe/London**, etc.
   */
  timezone: string;

  /**
   * The name of a sound file to be played when a push notification is delivered to your client app.
   */
  push_sound: string;
}

export interface UpdatePushReferenceOption extends UserIdOption {
  /**
   * Determines the type of push notification trigger to apply to the user's joined group channels. Valid values are the following:
   * - **all** (default): when disconnected from SendBird server, the user receives notifications for all new messages including mentioned messages the user has been mentioned in.
   * - **mention_only**: when disconnected from SendBird server, the user only receives notifications for messages the user has been mentioned in.
   * - **off**: the user doesn't receive any notifications.
   */
  push_trigger_option?: string;

  /**
   * Determines whether to pause notification messages for the user during a specific time of day. (Default: false)
   */
  do_not_disturb?: boolean;

  /**
   * Specifies the hour to start pausing the notifications for **Do Not Disturb** of the user.
   */
  start_hour?: number;

  /**
   * Specifies the minute of the hour to start pausing the notifications for **Do Not Disturb** of the user.
   */
  start_min?: number;

  /**
   * Specifies the hour to stop pausing the notifications for **Do Not Disturb** of the user.
   */
  end_hour?: number;

  /**
   * Specifies the minute of the hour to stop pausing the notifications for **Do Not Disturb** of the user.
   */
  end_min?: number;

  /**
   * Determines whether to snooze notification messages for the user during a specific period of time. (Default: false)
   */
  snooze_enabled?: string;

  /**
   * Specifies the timestamp of when to start snoozing the notifications, in Unix milliseconds.
   */
  snooze_start_ts?: number;

  /**
   * Specifies the timestamp of when to end snoozing the notifications, in Unix milliseconds.
   */
  snooze_end_ts?: number;

  /**
   * Specifies the timezone to be applied to push preferences with a value such as **UTC**, **Asia/Seoul**, **Europe/London**, etc.
   */
  timezone?: string;

  /**
   * Specifies the name of a sound file to be played when a push notification is delivered to your client app.
   */
  push_sound?: string;
}

export type UpdatePushReferenceResult = ViewPushReferenceResult;

export interface ViewPushReferenceForChannelOption extends UserIdOption {
  /**
   * Specifies the URL of a group channel to retrieve push preferences for.
   */
  channel_url: string;
}

export interface ViewPushReferenceForChannelResult {
  /**
   * Indicates whether notification messages for the user are delivered to the group channel.
   */
  enable: boolean;

  /**
   * The type of push notification trigger to apply to the channel. Valid values are the following:
   * - **default**: the user's push notification trigger setting automatically applies to the channel. This is the default setting.
   * - **all**: when disconnected from SendBird server, the user receives notifications for all new messages in the channel including messages the user has been mentioned in.
   * - **mention_only**: when disconnected from SendBird server, the user only receives notifications for messages in the channel the user has been mentioned in.
   * - **off**: the user doesn't receive any notifications in the channel.
   */
  push_trigger_option: string;

  /**
   * The name of a sound file to be played when a push notification is delivered to the specified channel.
   */
  push_sound: string;
}

export interface UpdatePushReferenceForChannelOption extends ViewPushReferenceForChannelOption {
  /**
   * Determines whether notification messages for the user are delivered to the group channel. (default: true)
   */
  enable: boolean;

  /**
   * Determines the type of push notification trigger to apply to the speficied channel. Acceptable values are limited to the following:
   * - **default**: the user's push notification trigger setting automatically applies to the channel. This is the default setting.
   * - **all**: when disconnected from SendBird server, the user receives notifications for all new messages in the channel including messages the user has been mentioned in.
   * - **mention_only**: when disconnected from SendBird server, the user only receives notifications for messages in the channel the user has been mentioned in.
   * - **off**: the user doesn't receive any notifications in the channel.
   */
  push_trigger_option?: string;

  /**
   * Specifies the name of a sound file to be played when a push notification is delivered to the specified channel.
   */
  push_sound?: string;
}

export type UpdatePushReferenceForChannelResult = ViewPushReferenceForChannelResult;

export interface ChoosePushNotificationTemplateOption extends UserIdOption {
  /**
   * Specifies the name of a push notification template to apply to the user. Acceptable values are **default** and **alternative**.
   */
  name: string;
}

export interface ChoosePushNotificationTemplateResult {
  name: string;
}
