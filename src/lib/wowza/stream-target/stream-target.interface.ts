import { BasePaginationResult } from '../_base';

interface StreamTargetULL {
  /**
   * A six-character, alphanumeric string that allows the Wowza GoCoder app to send an encoded stream to an ultra low latency stream target. The code can be used once and expires 24 hours after it's created.
   */
  connection_code: string;

  /**
   * The date and time that the connection_code expires.
   */
  connection_code_expires_at: string;

  /**
   * The date and time that the ultra low latency stream target was created.
   */
  created_at: string;

  /**
   * If true (the default), the source stream is ready to be ingested. If false, the source stream won't be ingested by the target's origin server.
   */
  enabled: boolean;

  /**
   * If true, creates an HLS URL for playback on iOS devices. The default is false. The HLS stream has the convertAMFData stream target property enabled by default.
   */
  enabled_hls: boolean;

  /**
   * The unique alphanumeric string that identifies the ultra low latency stream target
   */
  id: string;

  /**
   * Only for ultra low latency stream targets whose source_delivery_method is push. An array of IP addresses in dot-decimal notation that can be used to connect to the target's origin server. Wildcards (*) are accepted for the final value in the IP address only.
   */
  ingest_ip_whitelist: string;

  /**
   * A descriptive name for the ultra low latency stream target. Maximum 255 characters
   */
  name: string;

  /**
   * A hash of `hls`, `wowz`, and `ws` URLs that can be used by the player.
   */
  playback_urls: {
    /**
     * The web address that the ultra low latency target can use to play the HLS stream.
     */
    hls: string[];

    /**
     * The wowz and wowzs web addresses that the ultra low latency target can use to play WOWZ streams.
     */
    wowz: string[];

    /**
     * The ws and wss web addresses that the ultra low latency target can use to play the WebSocket stream.
     */
    ws: string[];
  };

  /**
   * Only for ultra low latency stream targets whose source_delivery_method is push.The primary ingest URL of the target.
   */
  primary_url: string;

  /**
   * Only for ultra low latency stream targets whose source_delivery_method is pull. The location of the ultra low latency stream target's origin server. If unspecified, Wowza Streaming Cloud determines the optimal region for the origin server.
   */
  region_override: string;

  /**
   * The type of connection between the stream source and the ultra low latency stream target. push instructs the source to push the stream to the stream target. pull instructs the stream target to pull the stream from the source.
   */
  source_delivery_method: 'push' | 'pull';

  /**
   * The state of the ultra low latency stream target.
   */
  state: 'started' | 'stopped' | 'error';

  /**
   * The name of the stream being ingested into the target. Returned only for ultra low latency stream targets whose source_delivery_method is push.
   */
  stream_name: string;

  /**
   * The date and time that the ultra low latency stream target was updated.
   */
  updated_at: string;
}

export interface FetchAllULLOption {
  /**
   * Returns a paginated view of results from the HTTP request. Specify a positive integer to indicate which page of the results should be displayed. The default is 1.
   */
  page?: number;

  /**
   * For use with the page parameter. Indicates how many records should be included in a page of results. A valid value is any positive integer. The default and maximum value is 1000.
   */
  per_page?: number;
}

export interface FetchAllULLResult {
  stream_targets_ull: Array<{
    /**
     * The unique alphanumeric string that identifies the ultra low latency stream target.
     */
    id: string;

    /**
     * The date and time that the ultra low latency stream target was created.
     */
    created_at: string;

    /**
     * A descriptive name for the ultra low latency stream target. Maximum 255 characters.
     */
    name: string;

    /**
     * The date and time that the ultra low latency stream target was updated.
     */
    updated_at: string;
  }>;
}

export interface FetchULLOption {
  /**
   * The unique alphanumeric string that identifies the ultra low latency stream target.
   */
  id: string;
}

export interface FetchULLResult extends BasePaginationResult {
  stream_target_ull: StreamTargetULL;
}

export interface CreateULLOption {
  /**
   * A descriptive name for the ultra low latency stream target. Maximum 255 characters.
   */
  name: string;

  /**
   * The type of connection between the stream source and the ultra low latency stream target. push instructs the source to push the stream to the stream target. pull instructs the stream target to pull the stream from the source.
   */
  source_delivery_method: 'push' | 'pull';

  /**
   * Only for ultra low latency stream targets whose source_delivery_method is pull. The URL of a source IP camera or encoder connecting to the stream target.
   */
  source_url: string;

  /**
   * If true, creates an HLS URL for playback on iOS devices. The default is false. The HLS stream has the convertAMFData stream target property enabled by default
   */
  enable_hls?: boolean;

  /**
   * If true (the default), the source stream is ready to be ingested. If false, the source stream won't be ingested by the target's origin server.
   */
  enabled?: boolean;

  /**
   * Only for ultra low latency stream targets whose source_delivery_method is push. An array of IP addresses in dot-decimal notation that can be used to connect to the target's origin server. Wildcards (*) are accepted for the final value in the IP address only.
   */
  ingest_ip_whitelist?: string[];

  /**
   * Only for ultra low latency stream targets whose source_delivery_method is pull. The location of the ultra low latency stream target's origin server. If unspecified, Wowza Streaming Cloud determines the optimal region for the origin server.
   */
  region_override?: string;
}

export type CreateULLResult = FetchULLResult;
