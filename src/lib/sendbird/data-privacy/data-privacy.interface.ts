import { BaseLimitTokenOption, BaseNextOption } from '../_base';

export interface DataPrivacy {
  /**
   * The unique ID for a GDPR request.
   */
  request_id: string;

  /**
   * The type of a GDPR request.
   */
  action: string;

  /**
   * The current status of a GDPR request, which is represented in one of the following:
   * - **scheduled**: the request is scheduled to process.
   * - **processing**: the request is being processed.
   * - **done**: the request has been completed.
   * - **no_data**: no corresponding data because the user was already deleted, or there was an issue in the server
   */
  status: string;

  /**
   * The IDs of the deleted users to meet the GDPR's requirements. This is effective only when the value of the **action** property is **delete**.
   */
  user_ids: string[];

  /**
   * The ID of the accessed user to meet the GDPR's requirements. This is effective only when the value of the **action** property is **access**.
   */
  user_id: string;

  /**
   * The information of the zip file created from a GDRP request.
   */
  files: {
    /**
     * The URL of the zip file containing the result file and folders for downloading. The full name of the file is <user_name>.json and the names of the folders are channels and messages.
     */
    url: string;

    /**
     * The time at which the zip file expires. This indicates that the file will be valid for the next 7 days starting from the timestamp of file creation.
     */
    expires_at: number;
  };

  /**
   * The time in which a request was created, in Unix milliseconds format.
   */
  created_at: number;
}

export type LisOption = BaseLimitTokenOption;

export interface ListResult extends BaseNextOption {
  /**
   * A list of GDPR requests.
   */
  requests: DataPrivacy[];
}

export interface ViewOption {
  /**
   * Specifies the ID of the GDPR request to retrieve.
   */
  request_id: string;
}

export interface RegisterOption {
  /**
   * Determines the type of a GDPR request. Acceptable values are limited to `access` and `delete`.
   * If set to `access`, SendBird server generates a downloadable zip file containing the data of the specified user
   * with the `user_id` property to comply with GDPR's right to access of the data subject.
   * If set to `delete`, the specified users with the `user_ids` property will be permanently deleted from your
   * SendBird application to comply with GDPR's right to erasure of the data subject. (Default: `delete`)
   */
  action?: string;

  /**
   *  Specifies an array of the IDs of the users to delete in order to meet the GDPR's requirements.
   * The maximum number of users to be processed at once is 100.
   * This should be specified when the value of the action property is delete.
   */
  user_ids?: string[];

  /**
   * Determines the scope of group channels to delete in addition to deleting the specified users with the user_ids property.
   * Acceptable values are limited to the following:
   * - **do_not_delete** (default): the users will be deleted but their joined group channels will remain.
   * - **1_on_1**: only 1-on-1 group channels of the users will be deleted. (This option can be useful when eliminating spam users)
   * - **all**: all joined group channels of the users will be deleted.
   *
   * * This only works when the value of the action property is delete.
   */
  channel_delete_option?: string;

  /**
   * Specifies the ID of the user to meet the GDPR's requirements.
   */
  user_id: string;
}

export interface UnregisterOption {
  /**
   * Specifies the ID of the GDPR request to retrieve.
   */
  request_id: string;
}
