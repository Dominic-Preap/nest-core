import { SendBirdHelper } from '../sendbird.helper';
import * as I from './report.interface';

export class ReportService extends SendBirdHelper {
  /**
   * List reports on a message
   *
   * ​@description Retrieves a list of reports on a message which contains suspicious, harassing, or inappropriate content.
   * @see https://docs.sendbird.com/platform/report_content_and_subject#3_list_reports_on_a_message
   */
  async listReportsOnMessage(params: I.ListReportsOnMessageOption) {
    const url = `report/${params.channel_type}/${params.channel_url}/messages/${params.message_id}`;
    return this.wrapper(this.http.get<I.ListReportsOnMessageResult>(url, { params })); // prettier-ignore
  }

  /**
   * Report a message
   *
   * ​@description Reports a message which contains suspicious, harassing, or inappropriate content.
   * @see https://docs.sendbird.com/platform/report_content_and_subject#3_report_a_message
   */
  async reportMessage(params: I.ReportMessageOption) {
    const url = `report/${params.channel_type}/${params.channel_url}/messages/${params.message_id}`;
    return this.wrapper(this.http.post<I.Report>(url, params));
  }

  /**
   * List reports on a user
   *
   * ​@description Retrieves a list of reports on a user who sends an offensive message.
   * @see https://docs.sendbird.com/platform/report_content_and_subject#3_list_reports_on_a_user
   */
  async listReportsOnUser(params: I.ListReportsOnUserOption) {
    const url = `report/users/${params.offending_user_id}`;
    return this.wrapper(this.http.get<I.ListReportsOnUserResult>(url, { params })); // prettier-ignore
  }

  /**
   * Report a user
   *
   * ​@description Reports a user who sends an offensive message in a channel.
   * @see https://docs.sendbird.com/platform/report_content_and_subject#3_report_a_user
   */
  async reportUser(params: I.ReportUserOption) {
    const url = `report/users/${params.offending_user_id}`;
    return this.wrapper(this.http.post<I.Report>(url, params));
  }

  /**
   * List reports on a channel
   *
   * ​@description Retrieves a list of reports on a channel that has offensive messages or abusive activities.
   * @see https://docs.sendbird.com/platform/report_content_and_subject#3_list_reports_on_a_channel
   */
  async listReportsOnChannel(params: I.ListReportsOnChannelOption) {
    const url = `report/${params.channel_type}/${params.channel_url}`;
    return this.wrapper(this.http.get<I.ListReportsOnChannelResult>(url, { params })); // prettier-ignore
  }

  /**
   * Report a channel
   *
   * ​@description Reports a channel that has offensive messages or abusive activities.
   * @see https://docs.sendbird.com/platform/report_content_and_subject#3_report_a_channel
   */
  async reportChannel(params: I.ReportChannelOption) {
    const url = `report/${params.channel_type}/${params.channel_url}`;
    return this.wrapper(this.http.post<I.Report>(url, params));
  }
}
