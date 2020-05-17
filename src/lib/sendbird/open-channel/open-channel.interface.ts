import { BaseLimitTokenOption, BaseNextOption } from '../_base';
import { User, UserIdOption } from '../user';

export interface OpenChannel {
  /**
   * The channel topic, or the name of the channel.
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
   * Indicates whether to preserve the messages in the channel for the purpose of retrieving chat history.
   */
  is_ephemeral: boolean;

  /**
   * The number of participants in the channel.
   */
  participant_count: number;

  /**
   * The maximum length of a message allowed to be sent within the channel. If set to `-1`, the length is unlimited.
   */
  max_length_message: number;

  /**
   * The list of users registered as operators of the channel. Operators can delete any messages in the channel. They also view all messages in the channel without any filtering or throttling.
   */
  operators: User[];

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

// ===================================================
// Managing channels
// ===================================================

export interface ListOption extends BaseLimitTokenOption {
  /**
   * Specifies a comma-separated string of one or more custom types to filter the open channels with the corresponding types.
   * Urlencoding each type is recommended (for example, **?custom_types=urlencoded_type_1,urlencoded_type_2**).
   * If not specified, all channels are returned, regardless of their custom type.
   */
  custom_types?: string;

  /**
   * Searches for open channels containing the specified value in their channel name. Urlencoding the value is recommended.
   */

  name_contains?: string;

  /**
   * Searches for open channels containing the specified value in their channel URL. Urlencoding the value is recommended.
   */
  url_contains?: string;
}

export interface ListResult extends BaseNextOption {
  /**
   * A list of group channels that match the specified optional parameters.
   */
  channels: OpenChannel[];
}

export type ViewOption = ChannelUrlOption;

export interface CreateOption {
  /**
   * Specifies the channel topic, or the name of the channel. The length is limited to 1,024 bytes. (Default: `open channel`)
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
   * Determines whether to preserve the messages in the channel for the purpose of retrieving chat history or not.
   * It set to `true`, the messages in the channel are not saved in the SendBird database and the chat history can't be retrieved. (Default: `false`)
   *
   * @default false
   */
  is_ephemeral?: boolean;

  /**
   * Specifies an array of one or more user IDs to register as operators to the channel.
   * Operators can delete any messages in the channel, and can also view all messages without any filtering or throttling.
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
   * Specifies an array of one or more user IDs to register as operators to the channel.
   * Operators can delete any messages in the channel, and can also view all messages without any filtering or throttling.
   *
   * * Updating this property overwrites previous operators of the channel. If you want to add an operator, include all previous operators as well as the user to be added.
   */
  operator_ids?: string[];
}

export interface ListParticipantsOption extends ChannelUrlOption, BaseLimitTokenOption {}

export interface ListParticipantsResult extends BaseNextOption {
  /**
   * A list of users who are participating in the open channel.
   */
  participants: User[];
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
  seconds: number;

  /**
   * Specifies a reason for the muting.
   */
  description: string[];
}

export interface UnmuteUserOption extends ChannelUrlOption, MutedUserIdOption {}
