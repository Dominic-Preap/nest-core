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
