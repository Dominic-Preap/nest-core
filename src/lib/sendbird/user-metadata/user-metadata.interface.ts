import { Metadata } from '../_base';

interface UserIdOption {
  /**
   * Specifies the ID of the user to retrieve the metadata in.
   */
  user_id: string;
}

interface MetadataOption {
  /**
   * Specifies a JSON object that stores key-value items.
   * The key must not have a comma (,) and its length is limited to 128 bytes.
   * The value must be a string and its length is limited to 190 bytes. This property can have up to 5 items.
   */
  metadata: Metadata;
}

interface MetadataKeyOption {
  /**
   * Specifies the key of metadata item to retrieve the values of.
   * If not specified, all items of the metadata are returned.
   * If specified, the item which matches the parameter value is returned. Urlencoding a key is recommended.
   */
  key?: string;
}

export interface ViewOption extends UserIdOption, MetadataKeyOption {
  /**
   * In a query string, specifies an array of one or more keys of metadata items to retrieve the values of.
   * If not specified, all items of the metadata are returned. If specified, the items which match the parameter values are returned.
   * Urlencoding each key is recommended (for example, `?keys=urlencoded_key_1, urlencoded_key_2`).
   */
  keys?: string;
}

export interface CreateOption extends UserIdOption, MetadataOption {}

export interface UpdateOption extends UserIdOption, MetadataOption, MetadataKeyOption {
  /**
   * When updating a specific item by its key
   */
  value?: any;

  /**
   * Determines whether to add new items in addition to updating existing items.
   * If `true`, new key-value items in the metadata property are added when there are no items with the keys.
   * The existing items are updated with new values when there are already items with the keys.
   * If `false`, only the items of which keys match the ones you specify are updated. (Default: `false`)
   */
  upsert?: boolean;
}

export interface DeleteOption extends UserIdOption, MetadataKeyOption {}
