import { WowzaHelper } from '../wowza.helper';
import * as I from './stream-target.interface';

export class StreamTargetService extends WowzaHelper {
  /**
   * Fetch all ultra low latency stream targets
   *
   * @see https://sandbox.cloud.wowza.com/api/current/docs#operation/listUllStreamTargets
   */
  async fetchAllULL(params?: I.FetchAllULLOption) {
    const url = `api/v1.3/stream_targets/ull`;
    return this.wrapper(this.http.get<I.FetchAllULLResult>(url, { params })); // prettier-ignore
  }

  /**
   * Fetch an ultra low latency stream target
   *
   * @see https://sandbox.cloud.wowza.com/api/current/docs#operation/showUllStreamTarget
   */
  async fetchULL(params: I.FetchULLOption) {
    const url = `api/v1.3/stream_targets/ull/${params.id}`;
    return this.wrapper(this.http.get<I.FetchULLResult>(url));
  }

  /**
   * Create an ultra low latency stream target
   *
   * @see https://sandbox.cloud.wowza.com/api/current/docs#operation/createUllStreamTarget
   */
  async createULL(params?: I.CreateULLOption) {
    const url = 'api/v1.3/stream_targets/ull';
    return this.wrapper(this.http.post<I.CreateULLResult>(url, params));
  }
}
