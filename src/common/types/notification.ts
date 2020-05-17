import { tuple } from './base';

export type NotificationType = typeof NotificationTypeEnum[number];
export const NotificationTypeEnum = tuple(
  'AUS', // AUCTION_START
  'AUE', // AUCTION_END
  'AUO' // AUCTION_OUTBID
);

export type NotificationUserType = typeof NotificationUserTypeEnum[number];
export const NotificationUserTypeEnum = tuple(
  'NCT', // Notification Creator
  'NRV', // Notification Receiver
  'NIR' // Notification Indirect Receiver
);

export type NotificationPhotoType = typeof NotificationPhotoTypeEnum[number];
export const NotificationPhotoTypeEnum = tuple(
  'ORG', // Organization
  'USR' // User
);
