import { Metadata } from '../_base';
import { SendBirdHelper } from '../sendbird.helper';
import * as I from './user-metadata.interface';

export class UserMetadataService extends SendBirdHelper {
  /**
   * View a user metadata
   *
   * ​@description Retrieves a user metadata's one or more items that are stored in a user.
   * @see https://docs.sendbird.com/platform/user_metadata#3_view_a_user_metadata
   */
  async view(params: I.ViewOption) {
    const url = `users/${params.user_id}/metadata/${params.key || ''}`;
    return this.wrapper(this.http.get<Metadata>(url, { params })); // prettier-ignore
  }

  /**
   * Create a user metadata
   *
   * ​@description Creates a user metadata's items to store in a user.
   * @see https://docs.sendbird.com/platform/user_metadata#3_create_a_user_metadata
   */
  async create(params: I.CreateOption) {
    const url = `users/${params.user_id}/metadata`;
    return this.wrapper(this.http.post<Metadata>(url, params));
  }

  /**
   * Update a user metadata
   *
   * ​@description Updates existing items of a user metadata by their keys, or adds new items to the metadata.
   * @see https://docs.sendbird.com/platform/user_metadata#3_update_a_user_metadata
   */
  async update(params: I.UpdateOption) {
    const url = `users/${params.user_id}/metadata/${params.key || ''}`;
    return this.wrapper(this.http.put<Metadata>(url, params));
  }

  /**
   * Delete a user metadata
   *
   * ​@description Deletes a user metadata's one or all items that are stored in a user.
   * @see https://docs.sendbird.com/platform/user_metadata#3_delete_a_user_metadata
   */
  async delete(params: I.DeleteOption) {
    const url = `users/${params.user_id}/metadata`;
    return this.wrapper(this.http.delete(url));
  }
}
