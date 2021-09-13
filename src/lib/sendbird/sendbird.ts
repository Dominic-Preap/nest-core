import { HttpService } from '@nestjs/axios';

import { ConfigService } from '../config';
import { ApplicationService, ChannelSettingService, GlobalSettingService } from './application';
import { ChannelMetacounterService, ChannelMetadataService } from './channel-metadata';
import { DataExportService } from './data-export';
import { DataPrivacyService } from './data-privacy';
import { GroupChannelService } from './group-channel';
import { MessageService } from './message';
import { OpenChannelService } from './open-channel';
import { ReportService } from './report';
import { SendBirdConfig } from './sendbird.dto';
import { UserService } from './user';
import { UserMetadataService } from './user-metadata';
import { WebhookService } from './webhook';

export class SendBird {
  /**
   * You can create one SendBird application per app for your chatting service, regardless of the platform.
   */
  public application: ApplicationService;

  /**
   * With channel metadata and channel metacounter, you can store additional information within a channel.
   */
  public channelMetacounter: ChannelMetacounterService;

  /**
   * With channel metadata and channel metacounter, you can store additional information within a channel.
   */
  public channelMetadata: ChannelMetadataService;

  /**
   * Custom channel types allow you to classify and apply customized settings to groups of channels.
   */
  public channelSetting: ChannelSettingService;

  /**
   * The Data Export API lets you pull out message, channel, and user data from your app, and output the results to CSV or JSON formatted files.
   */
  public dataExport: DataExportService;

  /**
   * For your application, SendBird provides a set of APIs to protect users' rights to privacy and personal data.
   */
  public dataPrivacy: DataPrivacyService;

  /**
   * These settings are applied to all channels within your application by default, unless the settings for channels with a custom channel type are specified otherwise.
   */
  public globalSetting: GlobalSettingService;

  /**
   * A group channel is a chat that allows close interactions among a limited number of users. It can be private or public.
   */
  public groupChannel: GroupChannelService;

  /**
   * The following APIs can help you manage messages from your server-side.
   */
  public message: MessageService;

  /**
   * An open channel is a public chat by nature that can handle a large number of online users.
   */
  public openChannel: OpenChannelService;

  /**
   * You can build your own in-app system for reporting and removal of objectionable content and subject when using our SDKs and API.
   */
  public report: ReportService;

  /**
   * Users can chat with each other by participating open channels and joining group channels.
   */
  public user: UserService;

  /**
   * With user metadata, you can store key-value of additional information to a user.
   */
  public userMetadata: UserMetadataService;

  /**
   * The webhooks can be useful when you build your own custom notification service, such as a SMS notification or an email system for your offline users.
   */
  public webhook: WebhookService;

  constructor(private readonly configService: ConfigService, private readonly http: HttpService) {
    const config = this.configService.validate('SendBirdModule', SendBirdConfig);

    this.http.axiosRef.defaults.baseURL = `https://api-${config.SENDBIRD_APP_ID}.sendbird.com/v3`;

    // tslint:disable-next-line: no-string-literal
    this.http.axiosRef.defaults.headers['Authorization'] = `Basic ${config.SENDBIRD_AUTHORIZATION}`;
    this.http.axiosRef.defaults.headers['Api-Token'] = config.SENDBIRD_API_TOKEN;
    this.http.axiosRef.defaults.headers['Content-Type'] = 'application/json, charset=utf8';

    // https://github.com/axios/axios/issues/1600#issuecomment-454013644
    this.http.axiosRef.interceptors.response.use(
      response => response, // response.data
      error => Promise.reject(error.response.data)
    );

    this.application        = new ApplicationService(this.http); // prettier-ignore
    this.channelMetacounter = new ChannelMetacounterService(this.http); // prettier-ignore
    this.channelMetadata    = new ChannelMetadataService(this.http); // prettier-ignore
    this.channelSetting     = new ChannelSettingService(this.http); // prettier-ignore
    this.dataPrivacy        = new DataPrivacyService(this.http); // prettier-ignore
    this.dataExport         = new DataExportService(this.http); // prettier-ignore
    this.globalSetting      = new GlobalSettingService(this.http); // prettier-ignore
    this.groupChannel       = new GroupChannelService(this.http); // prettier-ignore
    this.message            = new MessageService(this.http); // prettier-ignore
    this.openChannel        = new OpenChannelService(this.http); // prettier-ignore
    this.report             = new ReportService(this.http); // prettier-ignore
    this.user               = new UserService(this.http); // prettier-ignore
    this.userMetadata       = new UserMetadataService(this.http); // prettier-ignore
    this.webhook            = new WebhookService(this.http); // prettier-ignore
  }
}
