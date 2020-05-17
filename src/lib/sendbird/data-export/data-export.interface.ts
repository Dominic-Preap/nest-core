import { BaseLimitTokenOption, BaseNextOption } from '../_base';

export interface DataExport {
  /**
   * The timestamp of the starting point of the exported messages, in the Unix milliseconds format.
   */
  start_ts: number;

  /**
   * The timestamp of the ending point of the exported messages, in the Unix milliseconds format.
   */
  end_ts: number;

  /**
   * The current status of a data export, which is represented in **scheduled**, **exporting**, **done**, **failed**, or **no data**.
   */
  report_type: 'scheduled' | 'exporting' | 'done' | 'failed' | 'no data';

  /**
   * The unique ID for a data export.
   */
  request_id: string;

  /**
   * The format of the file to export the messages to. The supported formats are **json** and **csv**. (Default: **json**)
   */
  format: 'csv' | 'json';

  /**
   * A single character delimiter to separate the values in each row of the csv file which stores two-dimensional arrays of the exported message data. (Default: ,)
   */
  csv_delimiter: string;

  /**
   * The timezone to be applied to a data export, such as **UTC**, **Asia/Seoul**, **Europe/London**, etc. (Default: **UTC**)
   */
  timezone: string;

  /**
   * The time in which a data export was created, in Unix milliseconds format.
   */
  created_at: number;

  /**
   * One or more URLs of channels to export the messages from. This property is available when the type of data to export is either **messages** or **channels**.
   * If the type is users, this property is not available. (Default: **all channels**)
   */
  channel_urls: string[];

  /**
   * The IDs of the users which are used to filter the messages by its sender for the export.
   * This property is available when the type of data to export is **messages**, and can be specified up to **10** IDs in the request.
   * (Default: **all messages sent by any user**)
   */
  sender_ids: string[];

  /**
   * The IDs of the users which are used to export their information. This property is available when the type of data to export is **users**. (Default: **all users**)
   */
  user_ids: string[];

  /**
   * The information of the zip file created from a data export.
   */
  file: {
    /**
     * The URL of the zip file containing the result files for downloading.
     */
    url: string;

    /**
     * The time at which the zip file expires, in Unix milliseconds format. (Default: 7 days starting from the timestamp of file creation)
     */
    channel_url: number;
  };
}

interface DataTypeOption {
  /**
   * Specifies the type of a data export to retrieve. Acceptable values are `messages`, `channels`, and `users`.
   */
  data_type: 'messages' | 'channels' | 'users';
}

export interface ListOption extends DataTypeOption, BaseLimitTokenOption {}

export interface ListResult extends BaseNextOption {
  /**
   * A list of data exports.
   */
  exported_data: DataExport[];
}

export interface ViewOption extends DataTypeOption {
  /**
   * Specifies the unique ID of a data export to retrieve.
   */
  request_id: string;
}

export interface RegisterOption extends DataTypeOption {
  /**
   * Specifies the timestamp of the starting point of the exported messages, in the Unix milliseconds format.
   */
  start_ts: number;

  /**
   * Specifies the timestamp of the ending point of the exported messages, in the Unix milliseconds format.
   */
  end_ts: number;

  /**
   * 	Specifies the format of the file to export the messages to. Acceptable values are json and csv. (Default: json)
   */
  format?: 'csv' | 'json';

  /**
   * Sets a single character delimiter to separate the values in each row of the csv file which stores two-dimensional arrays of the exported message data. You can also set a horizontal tab (\t), a line feed (\n), or a space (' ') as a delimiter. This property is only effective when the value of the format is csv. (Default: ,)
   */
  csv_delimiter?: string;

  /**
   * Specifies the timezone to be applied to the timestamp of the exported messages. For example, US/Pacific, Asia/Seoul, Europe/London, etc. (Default: UTC)
   */
  timezone?: string;

  /**
   * Specifies an array of the IDs of the users which are used to filter the messages by its sender for the export.
   * This property is available when the data_type parameter is set to messages, and can be specified up to 10 IDs in the request.
   * (Default: all messages sent by any user)
   */
  sender_ids: string[];

  /**
   * Specifies an array of the IDs of the users which are used to exclude their sent messages from the export.
   * This property is available when the data_type parameter is set to messages, and can be specified up to 10 IDs.
   * (Default: all messages sent by any user)
   */
  exclude_sender_ids?: string[];

  /**
   * Specifies an array of one or more URLs of channels to export the messages from.
   * This property is available when the data_type parameter is set to messages or channels. (Default: all channels)
   */
  channel_urls?: string[];

  /**
   * Specifies an array of one or more URLs of channels to exclude when exporting the messages.
   * This property is available when the data_type parameter is set to messages or channels. (Default: include all channels)
   */
  exclude_channel_urls?: string[];

  /**
   * Specifies an array of the IDs of the users to export their information.
   * This property is available when the data_type parameter is set to users. (Default: all users)
   */
  user_ids?: string[];

  /**
   * Determines whether to include information about the read receipts of each channel in the exported data.
   * The read receipt indicates the timestamps of when each user has last read the messages in the channel, in Unix milliseconds. (Default: false)
   */
  show_read_receipt?: boolean;

  /**
   * Specifies the maximum number of other users’ messages to be exported, which took place after the specified message of a user filtered
   * by the sender_ids property. Even if there may be more messages that took place, if the quantity exceeds the number of the neighboring_message_limit,
   * they are omitted. Only the messages that took place right after the specified message will be counted and exported.
   * This can be used to better analyze the context. Acceptable values are 1 to 10, inclusive. (Default: 0)
   */
  neighboring_message_limit?: number;
}
