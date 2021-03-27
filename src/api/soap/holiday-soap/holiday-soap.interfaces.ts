import * as soap from 'soap';

type MethodResult<P> = [P, string, any, string];

export interface HolidaySoapAPI extends soap.Client {
  GetCountriesAvailableAsync(): Promise<MethodResult<GetCountriesAvailableResult>>;
  GetHolidayDateAsync(opt: GetHolidayDateOptions): Promise<MethodResult<GetHolidayDateResult>>;
  GetHolidaysAvailableAsync(
    opt: GetHolidaysAvailableOptions
  ): Promise<MethodResult<GetHolidaysAvailableResult>>;
  GetHolidaysForDateRangeAsync(opt: GetHolidaysForDateRangeOptions): Promise<MethodResult<GetHolidaysForDateRangeResult>>; // prettier-ignore
  GetHolidaysForMonthAsync(
    opt: GetHolidaysForMonthOptions
  ): Promise<MethodResult<GetHolidaysForMonthResult>>;
  GetHolidaysForYearAsync(
    opt: GetHolidaysForYearOptions
  ): Promise<MethodResult<GetHolidaysForYearResult>>;
}

// ================================================
// GetHolidaysAvailable
// ================================================
export interface GetCountriesAvailableResult {
  GetCountriesAvailableResult: {
    CountryCode: Array<{
      Code: string;
      Description: string;
    }>;
  };
}

// ================================================
// GetHolidayDate
// ================================================
export interface GetHolidayDateOptions {
  countryCode: string;
  holidayCode: string;
  year: number;
}

export interface GetHolidayDateResult {
  GetHolidayDateResult: string;
}
// ================================================
// GetHolidaysAvailable
// ================================================
export interface GetHolidaysAvailableOptions {
  countryCode: string;
}

export interface GetHolidaysAvailableResult {
  GetHolidaysAvailableResult: {
    HolidayCode: HolidayCode[];
  };
}

interface HolidayCode {
  Code: string;
  Description: string;
}
// ================================================
// GetHolidaysForDateRange
// ================================================
export interface GetHolidaysForDateRangeOptions {
  countryCode: string;
  startDate: string;
  endDate: string;
}

export interface GetHolidaysForDateRangeResult {
  GetHolidaysForDateRangeResult: {
    Holiday: Holiday[];
  };
}

interface Holiday {
  Country: string;
  HolidayCode: string;
  Descriptor: string;
  HolidayType: string;
  DateType: string;
  BankHoliday: string;
  Date: string;
  RelatedHolidayCode?: string;
  ApplicableRegions?: ApplicableRegions;
}

interface ApplicableRegions {
  RegionCode: RegionCode[];
}

interface RegionCode {
  Code: string;
  Description: string;
}

// ================================================
// GetHolidaysForMonth
// ================================================
export interface GetHolidaysForMonthOptions {
  countryCode: string;
  year: number;
  month: number;
}

export interface GetHolidaysForMonthResult {
  GetHolidaysForMonthResult: {
    Holiday: Holiday[];
  };
}

// ================================================
// GetHolidaysForYear
// ================================================
export interface GetHolidaysForYearOptions {
  countryCode: string;
  year: number;
}

export interface GetHolidaysForYearResult {
  GetHolidaysForYearResult: {
    Holiday: Holiday[];
  };
}
