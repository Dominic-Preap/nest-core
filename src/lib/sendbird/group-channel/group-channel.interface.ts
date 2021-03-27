import { BaseLimitTokenOption, BaseNextOption } from '../_base';
import { Message } from '../message';
import { User, UserIdOption } from '../user';

export interface GroupChannel {
  /**
   * The name of the channel, or the channel topic.
   */
  name: string;

  /**
   * The unique URL of the channel.
   */
  channel_url: string;

  /**
   * The URL of the cover image.
   */
  cover_url: string;

  /**
   * A custom channel type which is used for channel grouping.
   */
  custom_type: string;

  /**
   * Additional data that you can store for the channel.
   */
  data: string;

  /**
   * Indicates whether an existing channel is reused or a new channel has been created with
   * a combination of the channel members as well as the custom channel type if specified.
   */
  is_distinct: boolean;

  /**
   * Indicates whether to allow a user to join the channel without an invitation.
   */
  is_public: boolean;

  /**
   * Indicates whether to allow the channel to accommodate more than 100 members.
   */
  is_super: boolean;

  /**
   * Indicates whether to preserve the messages in the channel for the purpose of retrieving chat history.
   */
  is_ephemeral: boolean;

  /**
   * Indicates whether to set an access code to the channel and require an access code to a user who attempts to join the channel.
   */
  is_access_code_required: boolean;

  /**
   * The number of all members who have joined the channel and who have been invited but not joined.
   */
  member_count: number;

  /**
   * The number of members who have joined the channel only.
   */
  joined_member_count: number;

  /**
   * The list of `users` who are members of the group channel.
   */
  members: User[];

  /**
   * The list of `users` registered as operators of the channel. The operators can ban, mute or delete messages in the channel that they join as an operator.
   */
  operators: User[];

  /**
   * The timestamps of when each user has last read the messages in the channel, in Unix milliseconds.
   * Each key-value pair has a key with the unique ID of a user and a value with the user’s timestamp.
   */
  read_receipt: { [key: string]: any };

  /**
   * The maximum length of a message allowed to be sent within the channel. If set to `-1`, the length is unlimited.
   */
  max_length_message: number;

  /**
   * The number of a specific user's unread messages within the channel.
   * If a user is not specified in the request, the value of this property is 0.
   * However if you specify a user in the request when using such as the list my group channels action, the value is not 0.
   */
  unread_message_count: number;

  /**
   * The number of messages which a specific user has been mentioned but has not read within the channel.
   * If a user is not specified in the request, the value of this property is 0.
   * However if you specify a user in the request when using such as the list my group channels action, the value is not 0.
   */
  unread_mention_count: number;

  /**
   * The last message that was sent within the channel.
   */
  last_message: Message;

  /**
   * The timestamp of when the channel was created, in Unix seconds format.
   */
  created_at: number;

  /**
   * The list of `users` who are members of the group channel.
   */
  freeze: boolean;
}

export interface ChannelUrlOption {
  /**
   * Specifies the URL of the channel to retrieve.
   */
  channel_url: string;
}

export interface BaseListChannelOption extends BaseLimitTokenOption {
  /**
   * Restricts the search scope to only retrieve public or private group channels.
   * Acceptable values are limited to the following:
   * - **all** (default): all the group channels are returned.
   * - **private**: all the private group channels are returned.
   * - **public**: all the public group channels are returned.
   *
   * @default all
   */
  public_mode?: 'all' | 'private' | 'public';

  /**
   * Restricts the search scope to only retrieve super or nonsuper group channels.
   * Acceptable values are `all`, `super`, and `nonsuper`. (Default: all)
   *
   * @default all
   */
  super_mode?: 'all' | 'super' | 'nonsuper';

  /**
   * Restricts the search scope to only retrieve group channels which have been created after the specified time in Unix seconds format.
   */
  created_after?: number;

  /**
   * Restricts the search scope to only retrieve group channels which have been created before the specified time in Unix seconds format.
   */
  created_before?: number;

  /**
   * Determines whether to include empty channels in the response. `Empty channels` are channels that have been created but contain no sent messages. (Default: false)
   *
   * @default false
   */
  show_empty?: boolean;

  /**
   * Determines whether to include information about the members of each channel in the response. (Default: false)
   *
   * @default false
   */
  show_member?: boolean;

  /**
   * Determines whether to include information about the read receipts of each channel in the response body.
   * The read receipt indicates the timestamps of when each user has last read the messages in the channel, in Unix milliseconds. (Default: false)
   *
   * @default false
   */
  show_read_receipt?: boolean;

  /**
   * Specifies the method to sort a list of results. Acceptable values are limited to the following:
   * - **chronological** (default): sorts by the time of channel creation in a descending order. (most recently created channels)
   * - **latest_last_message**: sorts by the time of the last message in a descending order. (most recently updated channels)
   * - **channel_name_alphabetical**: sorts by the channel names in an alphabetical order.
   * - **metadata_value_alphabetical**: sorts by the value of metadata in an alphabetical order. This is effective only when the metadata_order_key is specified.
   *
   * @default chronological
   */
  order?:
    | 'chronological'
    | 'latest_last_message'
    | 'channel_name_alphabetical'
    | 'metadata_value_alphabetical';

  /**
   * Specifies the key of an item in metadata. When the value of the `order` parameter is set to `metatdata_value_alphabetical`,
   * the results are alphabetically sorted by the value of the item specified by the key.
   */
  metadata_order_key?: string;

  /**
   * Specifies a comma-separated string of one or more custom types to filter the group channels with the corresponding types.
   * Urlencoding each type is recommended (for example, `?custom_types=urlencoded_type_1,urlencoded_type_2`).
   * If not specified, all channels are returned, regardless of their custom type.
   */
  custom_types?: string;

  /**
   * Searches for group channels with the custom type which starts with the specified value. Urlencoding the value is recommended.
   */
  custom_type_startswith?: string;

  /**
   * 	Specifies a comma-separated string of one or more group channel URLs to restrict the search scope.
   * Urlencoding each channel URL is recommended (for example, `?channel_urls=urlencoded_url_1, urlencoded_url_2`).
   */
  channel_urls?: string;

  /**
   * Specifies the name of group channels to retrieve.
   */
  name?: string;

  /**
   * Searches for group channels of which name contain the specified value. Urlencoding the value is recommended.
   */

  name_contains?: string;

  /**
   * Searches for group channels of which names start with the specified value. Urlencoding the value is recommended.
   */
  name_startswith?: string;

  /**
   * Searches for group channels with the specified members exactly in.
   * The string should be specified with multiple urlencoded user IDs separated by commas
   * (for example, `?members_exactly_in=urlencoded_user_id_1, urlencoded_user_id_2`).
   */
  members_exactly_in?: string;

  /**
   * Specifies a logical condition applied to the members_include_in filter. Possible values are either AND or OR.
   * For example, take the case that you specify three members in members_include_in: A, B, and C. AND returns all channels that include all of {A. B, C} as a subset.
   * OR returns channels that include {A}, plus those that include {B}. plus those that include {C}. (Default: AND)
   */
  members_include_in?: string;

  /**
   * Searches for group channels with members whose nicknames match the specified value. Urlencoding the value is recommended.
   */
  members_nickname?: string;

  /**
   * Searches for group channels with members whose nicknames contain the specified value. Urlencoding the value is recommended.
   */
  members_nickname_contains?: string;

  /**
   * Searches for group channels with metadata containing an item with the specified value as its key.
   * This parameter should be specified in conjunction with either the `metadata_values` or `metadata_value_startswith` parameters below.
   */
  metadata_key?: string;

  /**
   * Searches for group channels with metadata containing an item with the key specified by the `metadata_key` parameter above,
   * and the value of that item matches one or more values specified by this parameter.
   * The string should be specified with multiple urlencoded values separated by commas
   * (for example, `?metadata_values=urlencoded_value_1, urlencoded_value_2`).
   * This parameter should be specified in conjunction with the `metadata_key` above.
   */
  metadata_values?: string;

  /**
   * Searches for group channels with metadata containing an item with the key specified by the `metadata_key` parameter above,
   * and the values of that item start with the specified value by this parameter.
   * Urlencoding the value is recommended. This parameter should be specified in conjunction with the `metadata_key` above.
   */
  metadata_value_startswith?: string;

  /**
   * Searches for group channels with metacounter containing an item with the specified value as its key.
   * This parameter should be specified in conjunction with the `metacounter_values` or one of `metacounter_value_gt`,
   * `metacounter_value_gte`, `metacounter_value_lt`, and `metacounter_value_lte` below.
   */
  metacounter_key?: string;

  /**
   * Searches for group channels with metacounter containing an item with the key specified by the metadata_key parameter above, and the value of that item is equal to one or more values specified by this parameter. The string should be specified with multiple values separated by commas. This parameter should be specified in conjunction with the metacounter_key above.
   */
  metacounter_values?: string;

  /**
   * Searches for group channels with metacounter containing an item with the key specified by the `metadata_key` parameter above,
   * and the value of that item is greater than the value specified by this parameter.
   * This parameter should be specified in conjunction with the `metacounter_key` above.
   */
  metacounter_value_gt?: string;

  /**
   * Searches for group channels with metacounter containing an item with the key specified by the `metadata_key` parameter above,
   * and the value of that item is greater than or equal to the value specified by this parameter.
   * This parameter should be specified in conjunction with the `metacounter_key` above.
   */
  metacounter_value_gte?: string;

  /**
   * Searches for group channels with metacounter containing an item with the key specified by the `metadata_key` parameter above,
   * and the value of that item is lower than the value specified by this parameter.
   * This parameter should be specified in conjunction with the `metacounter_key` above.
   */
  metacounter_value_lt?: string;

  /**
   * Searches for group channels with metacounter containing an item with the key specified by the `metadata_key` parameter above,
   * and the value of that item is lower than or equal to the value specified by this parameter.
   * This parameter should be specified in conjunction with the `metacounter_key` above.
   */
  metacounter_value_lte?: string;

  /**
   * Specifies a logical condition applied to the `members_include_in` filter.
   * Acceptable values are either `AND` or `OR`. For example, if you specify three members
   * in the `members_include_in` above: A, B, and C, `AND` returns all channels that include all of {A. B, C} as a subset.
   * `OR` returns channels that include {A}, plus those that include {B}, plus those that include {C}. (Default: `AND`)
   */
  query_type?: 'AND' | 'OR';
}

// ===================================================
// Managing channels
// ===================================================

export interface ListOption extends BaseListChannelOption {
  /**
   * Restricts the search scope to only retrieve the target user's group channels. It is recommended to use the list my group channels action instead.
   */
  user_id?: string;
}

export interface ListResult extends BaseNextOption {
  /**
   * A list of group channels that match the specified optional parameters.
   */
  channels: GroupChannel[];
}

export interface ViewOption extends ChannelUrlOption {
  /**
   * Determines whether to include information about the read receipt of each member of the channel in the response body.
   * The read receipt indicates the timestamps of when each user has last read the messages in the channel, in Unix milliseconds. (Default: `false`)
   *
   * @default false
   */
  show_read_receipt?: boolean;

  /**
   * Determines whether to include information about the members of the channel in the response. (Default: `false`)
   *
   * @default false
   */
  show_member?: boolean;
}

export interface CreateOption {
  /**
   * Specifies the name of the channel, or the channel topic. The length is limited to 1,024 bytes. (Default: `group channel`)
   */
  name?: string;

  /**
   * Specifies the URL of the channel. Only numbers, characters, and underscores are allowed. The length is 4 to 100 bytes, inclusive. If not specified, a URL is automatically generated.
   */
  channel_url?: string;

  /**
   * Specifies the URL of the cover image for the channel. The length is limited to 2,048 bytes.
   */
  cover_url?: string;

  /**
   * Uploads the cover image file for the channel.
   */
  cover_file?: any;

  /**
   * Specifies the custom channel type which is used for channel grouping. The length is limited to 128 bytes. (Default: "")
   */
  custom_type?: string;

  /**
   * Specifies additional data that you can store for the channel.
   */
  data?: string;

  /**
   * Determines whether to reuse an existing channel or create a new channel.
   * If set to `true`, returns a channel with the same users in the user_ids or users property or creates a new channel if no match is found.
   * SendBird server can also use the custom channel type in the custom_type property if specified along with the users to return the corresponding channel.
   * If set to `false`, SendBird server always creates a new channel with a combination of the users as well as the channel custom type if specified. (Default: `false`)
   */
  is_distinct?: boolean;

  /**
   * Determines whether to allow a user to join the channel without an invitation. (Default: `false`)
   *
   * @default false
   */
  is_public?: boolean;

  /**
   * Determines whether to allow the channel to accommodate more than 100 members. (Default: `false`)
   *
   * @default false
   */
  is_super?: boolean;

  /**
   * Determines whether to preserve the messages in the channel for the purpose of retrieving chat history. (Default: `false`)
   *
   * @default false
   */
  is_ephemeral?: boolean;

  /**
   * This parameter can only be used when the **channel operator** creates a public group channel.
   * They can set an access code for the corresponding type of channel.
   * The channel then requires the specified access code to a user who attempts to join.
   * If specified, the `is_access_code_required` property of the channel resource is set to `true`.
   */
  access_code?: string;

  /**
   * Specifies the ID of the user who has invited other users as a member of the channel.
   * The inviter is not automatically registered to the channel as a member,
   * so you should specify the ID of the inviter in the `user_ids` property below if needed.
   */
  inviter_id?: string;

  /**
   * Specifies an array of one or more IDs of users to invite to the channel.
   * The maximum number of users to be invited at once is **100**. The **users** below and this property can be used interchangeably.
   */
  user_ids?: string[];

  /**
   * Specifies an array of one or more IDs of users to invite to the channel.
   * The maximum number of users to be invited at once is **100**. The **user_ids** above and this property can be used interchangeably.
   */
  users?: string[];

  /**
   * Determines whether to receive a `400111` error and cease channel creation when there is at least one non-existing user
   * in the specified **user_ids** or **users** property above. If set to `false`, the channel will be created excluding the non-existing users
   * without receiving the mentioned error. (Default: `false`)
   *
   * @default false
   */
  strict?: boolean;

  /**
   * Specifies an array of one or more information about the join status of each user to the channel.
   * Each item of the array should be specified with a combination of the unique ID of a user in the user_ids or users property,
   * a colon (:), and the user's join status (for example, **user_id_1: join status**).
   * Acceptable values are
   * - `joined`,
   * - `invited_by_friend`,
   * - `invited_by_non_friend`. (Default: `joined`)
   */
  invitation_status?: { [key: string]: 'joined' | 'invited_by_friend' | 'invited_by_non_friend' };

  /**
   * Specifies an array of one or more channel hidden statuses about whether to hide the channel from each user's list of group channels,
   * and whether to automatically unhide the hidden channel when receiving a new message from other member of that channel.
   * Each item of the array should be specified with a combination of the unique ID of a user in the user_ids or users property,
   * a colon (:), and the channel hidden status (for example, user_id_1: channel hidden status). Acceptable values are limited to the following:
   * - **unhidden** (default): the channel is included in when retrieving a list of group channels.
   * - **hidden_allow_auto_unhide**: the channel automatically gets unhidden when receiving a new message.
   * - **hidden_prevent_auto_unhide**: the channel keeps hidden though receiving a new message.
   */
  hidden_status?: {
    [key: string]: 'unhidden' | 'hidden_allow_auto_unhide' | 'hidden_prevent_auto_unhide';
  };

  /**
   * Specifies an array of one or more IDs of the users to register as operators to the channel.
   * You should also include these IDs in the `user_ids` property to invite them to the channel as members.
   * They can delete any messages in the channel, and also view all messages without any filtering or throttling.
   * The maximum number of operators allowed per channel is `100`.
   */
  operator_ids?: string[];
}

export interface UpdateOption extends ChannelUrlOption {
  /**
   * Specifies the name of the channel, or the channel topic. The length is limited to 1,024 bytes.
   */
  name?: string;

  /**
   * Specifies the unique URL of the cover image. The length is limited to 2,048 bytes.
   */
  cover_url?: string;

  /**
   * Uploads the cover image file for the channel.
   */
  cover_file?: any;

  /**
   * Specifies the custom channel type which is used for channel grouping. The length is limited to 128 bytes.
   */
  custom_type?: string;

  /**
   * Specifies additional data that you can store within a channel.
   */
  data?: string;

  /**
   * Determines whether to reuse an existing channel or create a new channel.
   * If set to `true`, returns a channel with the current channel members users or creates a new channel if no match is found.
   * SendBird server can also use the custom channel type in the custom_type property if specified along with the users to return the corresponding channel.
   * If set to `false`, SendBird server always creates a new channel with a combination of the users as well as the channel custom type if specified. (Default: `false`)
   *
   * * Under this property, SendBird server does not distinguish channels based on other properties such as channel URL or channel name.
   */
  is_distinct?: boolean;

  /**
   * Determines whether to allow a user to join the channel without an invitation. (Default: false)
   *
   * @default false
   */
  is_public?: boolean;

  /**
   * This property can be used only when the **channel operator** wants to set an access code for a public group channel.
   * If specified, the `is_access_code_required` property of the channel resource is then set to `true`,
   * and the channel begins to require the specified access code to a user who attempts to join.
   */
  access_code?: string;
}

export interface ListMembersOption extends ChannelUrlOption, BaseLimitTokenOption {
  /**
   * Determines whether to include information about the read receipts of each channel in the response body.
   * The read receipt indicates the timestamps of when each user has last read the messages in the channel, in Unix milliseconds. (Default: false)
   *
   * @default false
   */
  show_read_receipt?: boolean;

  /**
   * Specifies the method to sort a list of results. Currently, an acceptable value is `member_nickname_alphabetical` only.
   * If set to `member_nickname_alphabetical` or not specified, this parameter sorts a list of results in an alphabetical order. (Default: `member_nickname_alphabetical`)
   *
   * @default member_nickname_alphabetical
   */
  order?: 'member_nickname_alphabetical';

  /**
   * Restricts the search scope to only retrieve members who are the operators of the channel or not.
   * Acceptable values are `all`, `operator`, and `nonoperator`. (Default: `all`)
   */
  operator_filter?: 'all' | 'operator' | 'nonoperator';

  /**
   * Restricts the search scope to retrieve members based on whether or not they have accepted an invitation or whether or not they were invited by a friend.
   * Acceptable values are `invited_only`, `joined_only`, `invited_by_friend`, `invited_by_non_friend`, and `all`. (Default: `all`)
   */
  member_state_filter?:
    | 'all'
    | 'invited_only'
    | 'joined_only'
    | 'invited_by_friend'
    | 'invited_by_non_friend';

  /**
   * 	Restricts the search scope to retrieve members who are muted in the channel or not. Acceptable values are `all`, `muted`, and `unmuted`. (Default: `all`)
   */
  muted_member_filter?: 'all' | 'muted' | 'unmuted';

  /**
   * Searches for members whose nicknames start with the specified value. Urlencoding the value is recommended.
   */
  nickname_startswith?: string;
}

export interface ListMembersResult extends BaseNextOption {
  /**
   * A list of the users who are members of the channel.
   */
  members: User[];
}

export interface CheckIfMemberOption extends ChannelUrlOption, UserIdOption {}

export interface CheckIfMemberResult {
  /**
   * Indicates whether the user is a member of the channel.
   */
  is_member: boolean;
}

export interface InviteAsMembersOption extends ChannelUrlOption {
  /**
   * Specifies an array of one or more user IDs to invite into the channel.
   * The maximum number of users to be invited at once is `100`. The users can be used instead of this property.
   */
  user_ids: string[];
}

export interface AcceptInvitationOption extends ChannelUrlOption, UserIdOption {
  /**
   * This property should be specified if the private group channel to join requires an access code to the invited users,
   * which means that the `is_access_code_required` property of the channel resource is `true`.
   */
  access_code?: string;
}

export interface DeclineInvitationOption extends ChannelUrlOption, UserIdOption {}

export type JoinChannelOption = AcceptInvitationOption;

export interface LeaveChannelOption extends ChannelUrlOption {
  /**
   * Specifies an array of one or more IDs of the users to leave the channel.
   */
  user_ids?: string[];

  /**
   * Determines whether to make all members leave the channel. (Default: false)
   *
   * @default false
   */
  should_leave_all?: boolean;
}

export interface HideChannelOption extends ChannelUrlOption, UserIdOption {
  /**
   * Determines the state and operating behavior of the channel in the list.
   * If set to `true`, the channel is disappeared from the list but appears back when there is a new message,
   * which works like channel hiding (the value of the channel resource's hidden_state property is hidden_allow_auto_unhide).
   *
   * If set to `false`, the channel is disappeared from the list and never appears back unless the value of the property is changed to true by unarchiving,
   * which works like channel archiving (the value of the channel resource's hidden_state property is hidden_prevent_auto_unhide). (Default: `true`)
   *
   * @default true
   */
  allow_auto_unhide?: boolean;

  /**
   * Determines whether to make the channel disappear from the lists of all channel members. For this action,
   * you don't need to specify the required user_id property. (Default: `false`)
   *
   * @default false
   */
  should_hide_all?: boolean;

  /**
   * When the channel gets appeared back in either the list of the user in the user_id property or the lists of all channel members (should_hide_all = true),
   * determines whether to conceal the messages sent and received before hiding or archiving the channel. (Default: `false`)
   *
   * * This property is effective only when the value of the global application settings resource's display_past_message property is false.
   *
   * @default false
   */
  hide_previous_messages?: boolean;
}

export interface UnhideChannelOption extends ChannelUrlOption, UserIdOption {
  /**
   * Determines whether to make the channel appear back in the lists of all channel members.
   * For this action, you don't need to specify the required user_id property in the request. (Default: `false`)
   *
   * @default false
   */
  should_unhide_all?: boolean;
}

export interface ResetUserHistoryOption extends ChannelUrlOption {
  /**
   * Specifies the unique ID of the user whose chat history to reset in the channel. If this `user_id` property is specified, the `reset_all` property is not required.
   */
  user_id?: string;

  /**
   * Determines whether to reset all users' chat history in the channel. If this `reset_all` property is specified, the `user_id` property is not required.
   */
  should_unhide_all?: boolean;
}

export interface FreezeOption extends ChannelUrlOption {
  /**
   * Determines whether to freeze the channel. (Default: `false`)
   *
   * @default false
   */
  freeze?: boolean;
}

export type DeleteOption = ChannelUrlOption;

// ===================================================
// Operators of channels
// ===================================================

export interface ListOperatorsOption extends ChannelUrlOption, BaseLimitTokenOption {}

export interface ListOperatorsResult extends BaseNextOption {
  /**
   * A list of the users who are registered as the operators of the channel.
   */
  operators: User[];
}

export interface RegisterOperatorsOption extends ChannelUrlOption {
  /**
   * Specifies an array of one or more IDs of the users to register as operators to the channels with the specified custom type.
   * If the operators are not members of group channels yet, they need an invitation to join private group channels
   * while they don't need any to join public group channels. The maximum number of operators allowed per channel is **100**.
   */
  operator_ids: string[];
}

export interface UnregisterOperatorsOption extends ChannelUrlOption {
  /**
   * Specifies an array of one or more operator IDs to unregister from the channels with the specified custom type.
   * The operators in this array remain as the members of the channel after losing their operational roles.
   */
  operator_ids?: string[];

  /**
   * Determines whether to unregister all operators and remain them just as the members of the channel. (Default: `false`)
   */
  delete_all?: boolean;
}

// ###################################################
// Moderation for channels
// ###################################################

// ===================================================
// Banned User
// ===================================================
interface BannedUserIdOption {
  /**
   * Specifies the ID of the banned user to retrieve.
   */
  banned_user_id: string;
}

export interface ListBannedUsersOption extends ChannelUrlOption, BaseLimitTokenOption {}

export interface ListBannedUsersResult extends BaseNextOption {
  /**
   * A list of the bans which contain information on the user, ban period, and reason.
   */
  banned_list: Array<{
    /**
     * The user resource which contains the simplified information on the banned user.
     */
    user: User;

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
    description: number;
  }>;
}

export interface ViewBannedUserOption extends ChannelUrlOption, BannedUserIdOption {}

export interface BanUserOption extends ChannelUrlOption, UserIdOption {
  /**
   * Specifies the ID of the agent (operator) who bans the user.
   */
  agent_id?: string;

  /**
   * Specifies the ban duration. If set to **-1**, the user is banned permanently (10 years, technically). (Default: **-1**)
   */
  seconds?: number;

  /**
   * Specifies a reason for the banning. The length is limited to 250 bytes.
   */
  description?: string;
}

export interface BanUserResult {
  /**
   * The user resource which contains the simplified information on the banned user.
   */
  user: User;

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
}

export interface UpdateBannedUserOption extends ChannelUrlOption, BannedUserIdOption {
  /**
   * Specifies a new ban duration to update. If set to **-1**, the user is banned permanently (10 years, technically).
   */
  seconds?: number;

  /**
   * Specifies a new reason for the banning to update. The length is limited to 250 bytes.
   */
  description?: string;
}

export interface UnbanUserOption extends ChannelUrlOption, BannedUserIdOption {}

// ===================================================
// Muted User
// ===================================================

interface MutedUserIdOption {
  /**
   * Specifies the unique ID of the user to check.
   */
  muted_user_id: string;
}

export interface ListMutedUsersOption extends ChannelUrlOption, BaseLimitTokenOption {}

export interface ListMutedUsersResult extends BaseNextOption {
  /**
   * A list of the muted users
   */
  muted_list: User[];
}

export interface ViewMutedUserOption extends ChannelUrlOption, MutedUserIdOption {}

export interface ViewMutedUserResult {
  /**
   * Indicates whether the user is muted in the channel.
   */
  is_muted: boolean;

  /**
   * The remaining duration, measured in Unix milliseconds, from the start of the muting to the `end_at` below which indicates when the user gets unmuted in the channel. A value of **-1** indicates that no time limit is imposed on the muting. (Default: **-1**)
   */
  remaining_duration: number;

  /**
   * The time in seconds when the user gets muted in the channel. The value is in Unix milliseconds format.
   */
  start_at: number;

  /**
   * The time in seconds when the user gets unmuted in the channel. The value is in Unix milliseconds format. A value of -1 indicates that no time limit is imposed on the muting. (Default: -1)
   */
  end_at: number;

  /**
   * A reason for the muting.
   */
  description: string[];
}

export interface MuteUserOption extends ChannelUrlOption, UserIdOption {
  /**
   * Specifies the duration of mute status. If set to -1, the user is muted permanently (10 years, technically). (Default: -1)
   */
  seconds?: number;

  /**
   * Specifies a reason for the muting.
   */
  description?: string[];
}

export interface UnmuteUserOption extends ChannelUrlOption, MutedUserIdOption {}
