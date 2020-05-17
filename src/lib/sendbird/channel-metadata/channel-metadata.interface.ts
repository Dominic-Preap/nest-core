import { Metacounter, Metadata } from '../_base';

interface ChannelOption {
  /**
   * Specifies the type of the channel. Either `open_channel` or `group_channel`.
   */
  channel_type: 'open_channels' | 'group_channels';

  /**
   * Specifies the URL of the channel where the reported message is in.
   */
  channel_url: string;
}

interface MetadataOption {
  /**
   * Specifies a JSON object that stores key-value items.
   * The key must not have a comma (,) and its length is limited to 128 bytes.
   * The value must be a string and its length is limited to 190 bytes. This property can have up to 5 items.
   */
  metadata: Metadata;
}

interface MetacounterOption {
  /**
   * Specifies a JSON object that stores key-value items.
   * The key must not have a comma (,) and its length is limited to 128 bytes.
   * The value must be a string and its length is limited to 190 bytes. This property can have up to 5 items.
   */
  metacounter: Metacounter;
}

interface KeyOption {
  /**
   * Specifies the key of metadata item to retrieve the values of.
   * If not specified, all items of the metadata are returned.
   * If specified, the item which matches the parameter value is returned. Urlencoding a key is recommended.
   */
  key?: string;
}

// ===============================
// Metadata
// ===============================

export interface ViewOption extends ChannelOption, KeyOption {
  /**
   * In a query string, specifies an array of one or more keys of metadata items to retrieve the values of.
   * If not specified, all items of the metadata are returned. If specified, the items which match the parameter values are returned.
   * Urlencoding each key is recommended (for example, `?keys=urlencoded_key_1, urlencoded_key_2`).
   */
  keys?: string;
}

export interface CreateOption extends ChannelOption, MetadataOption {}

export interface UpdateOption extends ChannelOption, MetadataOption, KeyOption {
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

export interface DeleteOption extends ChannelOption, KeyOption {}

// ===============================
// Metacounter
// ===============================

export interface ViewMetacounterOption extends ChannelOption, KeyOption {
  /**
   * In a query string, specifies an array of one or more keys of metadata items to retrieve the values of.
   * If not specified, all items of the metadata are returned. If specified, the items which match the parameter values are returned.
   * Urlencoding each key is recommended (for example, `?keys=urlencoded_key_1, urlencoded_key_2`).
   */
  keys?: string;
}

export interface CreateMetacounterOption extends ChannelOption, MetacounterOption {}

export interface UpdateMetacounterOption extends ChannelOption, MetacounterOption, KeyOption {
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

export interface DeleteMetacounterOption extends ChannelOption, KeyOption {}
