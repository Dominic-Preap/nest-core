export interface FacebookException {
  error: {
    message: string;
    type: string;
    code: number;
    fbtrace_id: string;
  };
}

export interface FacebookResult {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LinkedinException {
  errorCode: number;
  message: string;
  requestId: string;
  status: number;
  timestamp: number;
}

export interface LinkedinResult {
  id: string;
  firstName: string;
  formattedName: string;
  formattedPhoneticName: string;
  headline: string;
  lastName: string;
  maidenName: string;
  phoneticFirstName: string;
  phoneticLastName: string;
  pictureUrl: string;
  publicProfileUrl: string;
  // siteStandardProfileRequest
  // location;
  // industry;
  // positions;
}

export interface TwitterResult {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string | null;
  entities: {
    description: {
      urls: any[];
    };
  };
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: string | null;
  time_zone: string | null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: string;
  status: {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: {
      hashtags: any[];
      symbols: any[];
      user_mentions: any[];
      urls: any[];
    };
    source: string;
    in_reply_to_status_id: string | null;
    in_reply_to_status_id_str: string | null;
    in_reply_to_user_id: string | null;
    in_reply_to_user_id_str: string | null;
    in_reply_to_screen_name: string | null;
    geo: string | null;
    coordinates: string | null;
    place: string | null;
    contributors: string | null;
    retweeted_status: {
      created_at: string;
      id: number;
      id_str: string;
      text: string;
      truncated: boolean;
      entities: any[];
      source: string;
      in_reply_to_status_id: any | null;
      in_reply_to_status_id_str: any | null;
      in_reply_to_user_id: any | null;
      in_reply_to_user_id_str: any | null;
      in_reply_to_screen_name: any | null;
      geo: any | null;
      coordinates: any | null;
      place: any | null;
      contributors: any | null;
      is_quote_status: boolean;
      retweet_count: number;
      favorite_count: number;
      favorited: boolean;
      retweeted: boolean;
      possibly_sensitive: boolean;
      lang: string;
    };
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    lang: string;
  };
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string | null;
  profile_background_image_url_https: string | null;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: string;
  suspended: boolean;
  needs_phone_verification: boolean;
}
