export interface Webhook {
  /**
   * The information about the webhook configuration.
   */
  webhook: {
    /**
     * Indicates whether webhooks are turned on in your SendBird application or not. (Default: false)
     */
    enabled: boolean;

    /**
     * The URL of your webhook server to receive payloads for events.
     */
    url: string;

    /**
     * Indicates whether to include the information on the members of group channels in payloads. (Default: false)
     */
    include_members: boolean;

    /**
     * An array of subscribed events.
     */
    enabled_events: string[];

    /**
     * A list of all supported webhook events.
     */
    all_webhook_categories: string[];
  };
}

export interface LisOption {
  /**
   * Determines whether to include a list of all supported webhook events as the `all_webhook_categories` property in the response. (Default: false)
   */
  display_all_webhook_categories: boolean;
}

export interface UpdateOption {
  /**
   * Determines whether webhooks are turned on in your SendBird application or not. (Default: false)
   */
  enabled?: boolean;

  /**
   * Specifies the URL of your webhook server to receive payloads for events.
   */
  url?: string;

  /**
   * Determines whether to include the information on the members of group channels in payloads. (Default: false)
   */
  include_members?: boolean;

  /**
   * Specifies an array of one or more events for your webhook server to subscribe to.
   * If set to an asterisk (`*`) only, the server will subscribe to all supported events.
   * If set to an empty array, the server will unsubscribe from all (which indicates turning off webhooks).
   */
  enabled_events?: string[];
}
