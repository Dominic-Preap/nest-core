import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as soap from 'soap';

import {
  GetHolidayDateOptions,
  GetHolidaysAvailableOptions,
  GetHolidaysForDateRangeOptions,
  GetHolidaysForMonthOptions,
  GetHolidaysForYearOptions,
  HolidaySoapAPI
} from './holiday-soap.interfaces';

@Injectable()
export class HolidaySoapService {
  private url = `http://www.holidaywebservice.com/HolidayService_v2/HolidayService2.asmx?wsdl`;

  /**
   * Get the available countries.
   */
  async GetCountriesAvailable() {
    try {
      const client = await this.getClient();
      const [result] = await client.GetCountriesAvailableAsync();
      return result;
    } catch (error) {
      this.getError(error);
    }
  }

  /**
   * Get the date of a specific holiday.
   */
  async GetHolidayDate(opt: GetHolidayDateOptions) {
    try {
      const client = await this.getClient();
      const [result] = await client.GetHolidayDateAsync(opt);
      return result;
    } catch (error) {
      this.getError(error);
    }
  }

  /**
   * Get the available holidays for a specified country.
   */
  async GetHolidaysAvailable(opt: GetHolidaysAvailableOptions) {
    try {
      const client = await this.getClient();
      const [result] = await client.GetHolidaysAvailableAsync(opt);
      return result;
    } catch (error) {
      this.getError(error);
    }
  }

  /**
   * Get the holidays for a date range.
   */
  async GetHolidaysForDateRange(opt: GetHolidaysForDateRangeOptions) {
    try {
      const client = await this.getClient();
      const [result] = await client.GetHolidaysForDateRangeAsync(opt);
      return result;
    } catch (error) {
      this.getError(error);
    }
  }

  /**
   * Get the holidays for a specific month.
   */
  async GetHolidaysForMonth(opt: GetHolidaysForMonthOptions) {
    try {
      const client = await this.getClient();
      const [result] = await client.GetHolidaysForMonthAsync(opt);
      return result;
    } catch (error) {
      this.getError(error);
    }
  }

  /**
   * Get the holidays for an entire year.
   */
  async GetHolidaysForYear(opt: GetHolidaysForYearOptions) {
    try {
      const client = await this.getClient();
      const [result] = await client.GetHolidaysForYearAsync(opt);
      return result;
    } catch (error) {
      this.getError(error);
    }
  }

  private getError(err: any) {
    const message = _.get(err, 'root.Envelope.Body.Fault.faultstring') || err.message;
    throw new BadRequestException(message);
    // throw new BadRequestException(message.split(/\[(.*?)\]/g));
  }

  private getClient(): Promise<HolidaySoapAPI> {
    return soap.createClientAsync(this.url, {}) as any;
  }
}
