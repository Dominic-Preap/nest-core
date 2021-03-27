import { BaseLimitTokenOption, BaseNextOption } from '../_base';
import { GroupChannel } from '../group-channel';
import { Message } from '../message';
import { OpenChannel } from '../open-channel';
import { User } from '../user';

export interface Report {
  /**
   * The user who reports offensive and abusive messages, users, and channels.
   */
  reporting_user: User;

  /**
   * An object type which is reported by the reporting_user. Valid values are **message**, **user**, and **channel**.
   */
  report_type: 'message' | 'user' | 'channel';

  /**
   * A report category which indicates the reason for reporting. Valid values are **suspicious**, **harassing**, **inappropriate**, and **spam**.
   */
  report_category: 'suspicious' | 'harassing' | 'inappropriate' | 'spam';

  /**
   * The message which is reported for its suspicious, harassing, or inappropriate content.
   */
  reported_message: Message;

  /**
   * The user who is reported for using offensive or abusive language such as sending explicit messages or inappropriate comments.
   */
  offending_user: User;

  /**
   * Either an open or a group channel which is reported for offensive messages or inappropriate activities within the channel.
   */
  channel: OpenChannel | GroupChannel;

  /**
   * Additional information included in the report.
   */
  report_description: string;

  /**
   * The time that the report was created, in Unix seconds format.
   */
  created_at: number;
}

interface ChannelOption {
  /**
   * Specifies the type of the channel. Either `open_channel` or `group_channel`.
   */
  channel_type: 'open_channel' | 'group_channel';

  /**
   * Specifies the URL of the channel where the reported message is in.
   */
  channel_url: string;
}

interface MessageIdOption {
  /**
   * Specifies the unique ID of the reported message.
   */
  message_id: string;
}

interface OffendUserIdOption {
  /**
   * Specifies the unique ID of the user to report for using offensive or abusive language such as sending explicit messages or inappropriate comments.
   */
  offending_user_id: string;
}

interface ReportCategoryOption {
  /**
   * Specifies the category which indicates the reason for reporting. Valid values are **suspicious**, **harassing**, **inappropriate**, and **spam**.
   */
  report_category: 'suspicious' | 'harassing' | 'inappropriate' | 'spam';
}

interface ReportUserDescOption {
  /**
   * Specifies the unique ID of the user who reports the message.
   */
  reporting_user?: string;

  /**
   * Specifies additional information to be included in the report.
   */
  report_description?: string;
}

interface ListReportResult extends BaseNextOption {
  /**
   * A list of reports on the message.
   */
  report_logs: Report[];
}
// ===================================
// Report Message
// ===================================

export interface ListReportsOnMessageOption
  extends ChannelOption,
    MessageIdOption,
    BaseLimitTokenOption {}

export type ListReportsOnMessageResult = ListReportResult;

export interface ReportMessageOption extends ChannelOption, MessageIdOption, OffendUserIdOption, ReportCategoryOption, ReportUserDescOption {} // prettier-ignore

// ===================================
// Report User
// ===================================

export interface ListReportsOnUserOption extends OffendUserIdOption, BaseLimitTokenOption {}

export type ListReportsOnUserResult = ListReportResult;

export interface ReportUserOption extends OffendUserIdOption, ChannelOption, ReportCategoryOption, ReportUserDescOption {} // prettier-ignore

// ===================================
// Report Channel
// ===================================

export interface ListReportsOnChannelOption extends ChannelOption, BaseLimitTokenOption {}

export type ListReportsOnChannelResult = ListReportResult;

export interface ReportChannelOption extends ChannelOption, ReportCategoryOption, ReportUserDescOption {} // prettier-ignore
