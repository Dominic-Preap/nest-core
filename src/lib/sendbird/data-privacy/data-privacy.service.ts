import { SendBirdHelper } from '../sendbird.helper';
import * as I from './data-privacy.interface';

export class DataPrivacyService extends SendBirdHelper {
  /**
   * List GDPR requests
   *
   * ​@description Retrieves a list of GDPR requests of all types.
   * @see https://docs.sendbird.com/platform/data_privacy#3_list_gdpr_requests
   */
  async list(params?: I.LisOption) {
    const url = `privacy/gdpr`;
    return this.wrapper(this.http.get<I.ListResult>(url, { params })); // prettier-ignore
  }

  /**
   * View a GDPR request
   *
   * ​@description Retrieves a specific GDPR request.
   * @see https://docs.sendbird.com/platform/data_privacy#3_view_a_gdpr_request
   */
  async view(params: I.ViewOption) {
    const url = `privacy/gdpr/${params.request_id}`;
    return this.wrapper(this.http.get<I.DataPrivacy>(url));
  }

  /**
   * Register a GDPR request
   *
   * ​@description Registers a specific type of GDPR request to meet the GDPR's requirements.
   * @see https://docs.sendbird.com/platform/data_privacy#3_register_a_gdpr_request
   */
  async register(params: I.RegisterOption) {
    const url = `privacy/gdpr`;
    return this.wrapper(this.http.post<I.DataPrivacy>(url, params));
  }

  /**
   * Unregister a GDPR request
   *
   * ​@description Unregisters a specific GDPR request.
   * @see https://docs.sendbird.com/platform/data_privacy#3_unregister_a_gdpr_request
   */
  async unregister(params: I.UnregisterOption) {
    const url = `privacy/gdpr/${params.request_id}`;
    return this.wrapper(this.http.delete(url));
  }
}
