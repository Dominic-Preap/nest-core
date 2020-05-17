import { SendBirdHelper } from '../sendbird.helper';
import * as I from './data-export.interface';

export class DataExportService extends SendBirdHelper {
  /**
   * List data exports by message, channel, or user
   *
   * ​@description Retrieves a list of message, channel or user data exports
   * @see https://docs.sendbird.com/platform/data_export#3_list_data_exports_by_message_channel_or_user
   */
  async list(params: I.ListOption) {
    const url = `export/${params.data_type}`;
    return this.wrapper(this.http.get<I.ListResult>(url, { params })); // prettier-ignore
  }

  /**
   * View a data export
   *
   * ​@description Retrieves information on a message, channel or user data export.
   * @see https://docs.sendbird.com/platform/data_export#3_view_a_data_export
   */
  async view(params: I.ViewOption) {
    const url = `export/${params.data_type}/${params.request_id}`;
    return this.wrapper(this.http.get<I.DataExport>(url));
  }

  /**
   * Register and schedule a data export
   *
   * ​@description Registers and schedules a message, channel, or user data export.
   * @see https://docs.sendbird.com/platform/data_export#3_register_and_schedule_a_data_export
   */
  async register(params: I.RegisterOption) {
    const url = `export/${params.data_type}`;
    return this.wrapper(this.http.post<I.DataExport>(url, params));
  }
}
