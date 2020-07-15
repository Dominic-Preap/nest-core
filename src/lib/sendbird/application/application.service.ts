import { SendBirdHelper } from '../sendbird.helper';
import * as I from './application.interface';

export class ApplicationService extends SendBirdHelper {
  // ===================================================
  // Actions that require HTTP Basic authentication
  // ===================================================

  /**
   * List applications
   *
   * ​@description Retrieves a list of all applications. You must use the **HTTP Basic authentication**.
   * @see https://docs.sendbird.com/platform/application#3_list_applications
   */
  async list(params?: I.ListApplicationOption) {
    return this.wrapper(this.http.get<I.ListApplicationResult>(`applications`, { params })); // prettier-ignore
  }

  /**
   * Create an application
   *
   * ​@description Creates an application. You must use the **HTTP Basic authentication**.
   * @see https://docs.sendbird.com/platform/application#3_create_an_application
   */
  async create(params: I.CreateApplicationOption) {
    return this.wrapper(this.http.post<I.Application>(`applications`, params));
  }

  /**
   * Delete all applications
   *
   * ​@description Deletes **all** applications. You must use the **HTTP Basic authentication**.
   * @see https://docs.sendbird.com/platform/application#3_delete_all_applications
   */
  async delete() {
    // return this.wrapper(this.http.delete(`applications`));
    throw new Error('Too dangerous to implement');
  }

  // ===================================================
  // Actions that require API token authentication
  // ===================================================

  /**
   * View an application
   *
   * ​@description Retrieves information about an application.
   * @see https://docs.sendbird.com/platform/application#3_view_an_application
   */
  async view() {
    return this.wrapper(this.http.get<I.Application>(`applications/info`));
  }

  /**
   * View number of concurrent connections
   *
   * ​@description Retrieves the number of devices and opened browser tabs which are currently connected to SendBird server.
   * @see https://docs.sendbird.com/platform/application#3_view_number_of_concurrent_connections
   */
  async ccu() {
    return this.wrapper(this.http.get<I.CCUResult>(`applications/ccu`));
  }

  /**
   * View number of monthly active users
   *
   * ​@description Retrieves the number of monthly active users of the application (MAU).
   * @see https://docs.sendbird.com/platform/application#3_view_number_of_monthly_active_users
   */
  async mau(params?: I.MAUOption) {
    return this.wrapper(this.http.get<I.MAUResult>(`applications/mau`, { params })); // prettier-ignore
  }

  /**
   * View number of daily active users
   *
   * ​@description Retrieves the number of daily active users of the application (DAU).
   * @see https://docs.sendbird.com/platform/application#3_view_number_of_daily_active_users
   */
  async dau(params?: I.DAUOption) {
    return this.wrapper(this.http.get<I.DAUResult>(`applications/dau`, { params })); // prettier-ignore
  }

  /**
   * View number of daily messages
   *
   * ​@description Retrieves the total number of messages sent on a given day for a range of dates.
   * @see https://docs.sendbird.com/platform/application#3_view_number_of_daily_messages
   */
  async messageDailyCount(params?: I.MessageDailyCountOption) {
    const url = `applications/messages/daily_count`;
    return this.wrapper(this.http.get<I.MessageDailyCountResult>(url, { params })); // prettier-ignore
  }

  /**
   * List push configurations
   *
   * ​@description Retrieves a list of an application's registered push configurations.
   * @see https://docs.sendbird.com/platform/application#3_list_push_configurations
   */
  async listPushConfigurations(params: I.ListPushConfigurationsOption) {
    const url = `applications/push/${params.push_type}`;
    return this.wrapper(this.http.get<I.ListPushConfigurationsResult>(url));
  }

  /**
   * View a push configuration
   *
   * ​@description Retrieves a specific push configuration of an application. The type of a push configuration is either `fcm` or `apns`.
   * @see https://docs.sendbird.com/platform/application#3_list_push_configurations
   */
  async viewPushConfiguration(params: I.ViewPushConfigurationOption) {
    const url = `applications/push/${params.push_type}/${params.provider_id}`;
    return this.wrapper(this.http.get<I.ListPushConfigurationsResult>(url));
  }

  /**
   * Add a FCM push configuration
   *
   * ​@description Registers a FCM (Firebase Cloud Messaging) push configuration for your client app. To send push notifications to Android devices, you should first register the FCM push configuration.
   * @see https://docs.sendbird.com/platform/application#3_add_a_fcm_push_configuration
   */
  async addFCMPushConfiguration(params: I.AddFCMPushConfigurationOption) {
    const url = `applications/push/fcm`;
    return this.wrapper(this.http.post<I.ListPushConfigurationsResult>(url, params));
  }

  /**
   * Update a FCM push configuration
   *
   * ​@description Updates a specific FCM (Firebase Cloud Messaging) push configuration for your client app.
   * @see https://docs.sendbird.com/platform/application#3_update_a_fcm_push_configuration
   */
  async updateFCMPushConfiguration(params: I.UpdateFCMPushConfigurationOption) {
    const url = `applications/push/fcm/${params.provider_id}`;
    return this.wrapper(this.http.put<I.UpdateFCMPushConfigurationResult>(url, params));
  }

  /**
   * Add an APNs push configuration
   *
   * ​@description Registers an APNs (Apple Push Notification service) push configuration for your client app. To send push notifications to iOS devices, your should first register the APNs push configuration.
   * @see https://docs.sendbird.com/platform/application#3_add_an_apns_push_configuration
   */
  async addAPNsPushConfiguration(params: I.AddAPNsPushConfigurationOption) {
    const url = `applications/push/apns`;
    // return this.wrapper(this.http.post<I.ListPushConfigurationsResult>(url, params));

    const config = this.getFormData(params, 'apns_cert');
    return this.wrapper(this.http.post<I.ListPushConfigurationsResult>(url, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * Update an APNs push configuration
   *
   * ​@description Updates a specific APNs (Apple Push Notification service) push configuration for your client app.
   * @see https://docs.sendbird.com/platform/application#3_update_an_apns_push_configuration
   */
  async updateAPNsPushConfiguration(params: I.UpdateAPNsPushConfigurationOption) {
    const url = `applications/push/apns/${params.provider_id}`;
    // return this.wrapper(this.http.put<I.UpdateApnsPushConfigurationResult>(url, params));

    const config = this.getFormData(params, 'apns_cert');
    return this.wrapper(this.http.put<I.ListPushConfigurationsResult>(url, config.data, { headers: config.headers })); // prettier-ignore
  }

  /**
   * Remove a push configuration
   *
   * ​@description Unregisters a specific push configuration of an application. The type of a push configuration is either `fcm` or `apns`.
   * @see https://docs.sendbird.com/platform/application#3_remove_a_push_configuration
   */
  async removePushConfiguration(params: I.RemovePushConfigurationOption) {
    const url = `applications/push/${params.push_type}/${params.provider_id}`;
    return this.wrapper(this.http.delete<I.RemovePushConfigurationResult>(url));
  }

  /**
   * Delete an APNs certificate
   *
   * ​@description Deletes a specific APNs certificate.
   * @see https://docs.sendbird.com/platform/application#3_delete_an_apns_certificate
   */
  async deleteAPNsCertificate(params: I.DeleteAPNsCertificateOption) {
    const url = `applications/push/apns/cert/${params.provider_id}`;
    return this.wrapper(this.http.delete<I.DeleteAPNsCertificateResult>(url));
  }

  /**
   * List push notification templates
   *
   * ​@description Retrieves a list of push notification templates of an application.
   * @see https://docs.sendbird.com/platform/application#3_list_push_notification_templates
   */
  async listPushMessageTemplates() {
    const url = `applications/push/message_templates`;
    return this.wrapper(this.http.get<I.ListPushMessageTemplatesResult>(url));
  }

  /**
   * View a push notification template
   *
   * ​@description Retrieves information on a specific push notification templates of an application. The name of a push notification template is either `default` or `alternative`.
   * @see https://docs.sendbird.com/platform/application#3_view_a_push_notification_template
   */
  async viewPushMessageTemplate(params: I.ViewPushMessageTemplateOption) {
    const url = `applications/push/message_templates/${params.template_name}`;
    return this.wrapper(this.http.get<I.PushMessageTemplate>(url));
  }

  /**
   * Update a push notification template
   *
   * ​@description Updates a specific push notification template of an application. The name of a push notification template is either `default` or `alternative`.
   * @see https://docs.sendbird.com/platform/application#3_update_a_push_notification_template
   */
  async updatePushMessageTemplate(params: I.UpdatePushMessageTemplateOption) {
    const url = `applications/push/message_templates/${params.template_name}`;
    return this.wrapper(this.http.put<I.UpdatePushMessageTemplateResult>(url, params));
  }

  /**
   * View default channel invitation preference
   *
   * ​@description Retrieves the default channel invitation preference of an application.
   * @see https://docs.sendbird.com/platform/application#3_view_default_channel_invitation_preference
   */
  async viewDefaultChannelInvitationPreference() {
    const url = `applications/default_channel_invitation_preference`;
    return this.wrapper(this.http.get<I.DefaultChannelInvitationPreference>(url));
  }

  /**
   * Update default channel invitation preference
   *
   * ​@description Updates the default channel invitation preference of an application.
   * @see https://docs.sendbird.com/platform/application#3_update_default_channel_invitation_preference
   */
  async updateDefaultChannelInvitationPreference(params: I.DefaultChannelInvitationPreference) {
    const url = `applications/default_channel_invitation_preference`;
    return this.wrapper(this.http.put<I.DefaultChannelInvitationPreference>(url, params));
  }

  // ===============================================================
  // Actions that require only master API token authentication
  // ===============================================================

  /**
   * List secondary API tokens (Request **master API token**)
   *
   * ​@description Retrieves a list of secondary API tokens.
   * @see https://docs.sendbird.com/platform/application#3_list_secondary_api_tokens
   */
  async listApiTokens() {
    return this.wrapper(this.http.get<I.ListApiTokenResult>(`applications/api_tokens`));
  }

  /**
   * View a secondary API token (Request **master API token**)
   *
   * ​@description Retrieves the information on a secondary API token.
   * @see https://docs.sendbird.com/platform/application#3_view_a_secondary_api_token
   */
  async viewApiToken(apiToken: string) {
    return this.wrapper(this.http.get<I.ApiTokenResult>(`applications/api_tokens/${apiToken}`));
  }

  /**
   * Generate a secondary API token (Request **master API token**)
   *
   * ​@description Generates a new secondary API token.
   * @see https://docs.sendbird.com/platform/application#3_generate_a_secondary_api_token
   */
  async generateApiToken() {
    const data = { HTTP_API_TOKEN: this.http.axiosRef.defaults.headers['Api-Token'] };
    return this.wrapper(this.http.post<I.ApiTokenResult>(`applications/api_tokens`, data));
  }

  /**
   * Revoke a secondary API token (Request **master API token**)
   *
   * ​@description Revokes a secondary API token.
   * @see https://docs.sendbird.com/platform/application#3_revoke_a_secondary_api_token
   */
  async revokeApiToken(apiToken: string) {
    // return this.wrapper(this.http.delete(`applications/api_tokens/${apiToken}`));
    throw new Error('Too dangerous to implement');
  }
}

export class GlobalSettingService extends SendBirdHelper {
  /**
   * View the global application settings
   *
   * ​@description Retrieves the global application settings that are applied to all channels within the application.
   * @see https://docs.sendbird.com/platform/global_application_settings#3_view_the_global_application_settings
   */
  async get() {
    const url = `applications/settings_global`;
    return this.wrapper(this.http.get<I.GlobalSetting>(url));
  }

  /**
   * Update the global application settings
   *
   * ​@description Updates the global application settings that are applied to all channels within the application.
   * @see https://docs.sendbird.com/platform/global_application_settings#3_update_the_global_application_settings
   */
  async update(data: I.UpdateOption) {
    const url = `applications/settings_global`;
    return this.wrapper(this.http.put<I.GlobalSetting>(url, data));
  }
}

export class ChannelSettingService extends SendBirdHelper {
  // =============================================================
  // Managing settings for channels with a custom channel type
  // =============================================================

  /**
   * List all settings for custom channel types
   *
   * ​@description Retrieves a list of all settings for custom channel types.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_list_all_settings_for_custom_channel_types
   */
  async listSettingsByChannelCustomType(params?: I.ListSettingsByChannelCustomTypeOption) {
    const url = `applications/settings_by_channel_custom_type`;
    return this.wrapper(this.http.get<I.ListSettingsByChannelCustomTypeResult>(url, { params })); // prettier-ignore
  }

  /**
   * View settings for a custom channel type
   *
   * ​@description Retrieves settings for a specific custom channel type.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_view_settings_for_a_custom_channel_type
   */
  async getSettingsByChannelCustomType(params: I.GetSettingsByChannelCustomTypeOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}`;
    return this.wrapper(this.http.get<I.GlobalSetting>(url));
  }

  /**
   * Create settings for a custom channel type
   *
   * ​@description Creates settings for a custom channel type which apply to channels with the type.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_create_settings_for_a_custom_channel_type
   */
  async createSettingsByChannelCustomType(data: I.CreateSettingsByChannelCustomTypeOption) {
    const url = `applications/settings_by_channel_custom_type`;
    return this.wrapper(this.http.post<I.GlobalSetting>(url, data));
  }

  /**
   * Update settings for a custom channel type
   *
   * ​@description Updates settings for a specific custom channel type.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_update_settings_for_a_custom_channel_type
   */
  async updateSettingsByChannelCustomType(params: I.CreateSettingsByChannelCustomTypeOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}`;
    return this.wrapper(this.http.put<I.GlobalSetting>(url, params));
  }

  /**
   * Delete settings for a custom channel type
   *
   * ​@description Deletes settings for a specific custom channel type.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_delete_settings_for_a_custom_channel_type
   */
  async deleteSettingsByChannelCustomType(params: I.DeleteSettingsByChannelCustomTypeOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}`;
    return this.wrapper(this.http.delete(url));
  }

  // =============================================================
  // Operators of channels with a custom channel type
  // =============================================================

  /**
   * List operators
   *
   * ​@description Retrieves a list of the operators of channels with a custom channel type.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_list_all_settings_for_custom_channel_types
   */
  async listOperators(params: I.ListOperatorsOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/operators`;
    return this.wrapper(this.http.get<I.ListOperatorsResult>(url, { params })); // prettier-ignore
  }

  /**
   * Register operators
   *
   * ​@description Registers one or more users as the operators of channels with a custom channel type at once.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_register_operators
   */
  async registerOperators(params: I.RegisterOperatorsOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/operators`;
    return this.wrapper(this.http.post(url, params));
  }

  /**
   * Unregister operators
   *
   * ​@description Unregisters one or more operators from channels with a custom channel type at once.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_unregister_operators
   */
  async unregisterOperators(params: I.UnregisterOperatorsOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/operators`;
    return this.wrapper(this.http.delete(url, { data: params })); // prettier-ignore
  }

  // =============================================================
  // Moderation in channels with a custom channel type
  // =============================================================

  /**
   * List banned users
   *
   * ​@description Retrieves a list of the banned users from channels with a custom channel type.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_list_banned_users
   */
  async listBannedUsers(params: I.ListBannedUsersOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/ban`;
    return this.wrapper(this.http.get<I.ListBannedUsersResult>(url, { params })); // prettier-ignore
  }

  /**
   * Ban users
   *
   * ​@description Bans users from channels with a custom channel type at once.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_ban_users
   */
  async banUsers(params: I.BanUsersOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/ban`;
    return this.wrapper(this.http.post(url, params));
  }

  /**
   * Unban users
   *
   * ​@description Unbans users from channels with a custom channel type at once.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_unban_users
   */
  async unbanUsers(params: I.UnbanUsersOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/ban`;
    return this.wrapper(this.http.delete(url, { data: params })); // prettier-ignore
  }

  /**
   * List muted users
   *
   * ​@description Retrieves a list of the muted users in channels with a custom channel type.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_list_muted_users
   */
  async listMutedUsers(params: I.ListMutedUsersOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/mute`;
    return this.wrapper(this.http.get<I.ListMutedUsersResult>(url, { params })); // prettier-ignore
  }

  /**
   * Mute users
   *
   * ​@description Mutes users in channels with a custom channel type at once.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_mute_users
   */
  async muteUsers(params: I.MuteUsersOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/mute`;
    return this.wrapper(this.http.post(url, params));
  }

  /**
   * Unmute users
   *
   * ​@description Unmutes users in channels with a custom channel type at once.
   * @see https://docs.sendbird.com/platform/custom_channel_settings#3_unmute_users
   */
  async unmuteUsers(params: I.UnmuteUsersOption) {
    const url = `applications/settings_by_channel_custom_type/${params.custom_type}/mute`;
    return this.wrapper(this.http.delete(url, { data: params })); // prettier-ignore
  }
}
