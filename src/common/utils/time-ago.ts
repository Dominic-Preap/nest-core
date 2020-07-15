import * as moment from 'moment-timezone';

enum UnitOfTimeAgo {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  THIS_WEEK = 'THIS-WEEK',
  PAST_WEEK = 'PAST-WEEK',
  LAST_MONTH = 'LAST-MONTH',
  PAST_MONTH = 'PAST-MONTH',
  LAST_YEAR = 'LAST-YEAR',
  PAST_YEAR = 'PAST-YEAR'
}
type Type = 'POST' | 'NOTIFICATION' | 'OTHER';
type DateTypeJson = { [key in UnitOfTimeAgo]: { [key in Type]: string } };

export class TimeAgo {
  /**
   * Calculate time ago from a date
   */
  static get(date: Date, type: Type, timezone: string) {
    const unit = this.getUnitOfTimeAgo(date, timezone);
    const format = this.DATE_TYPE[unit][type];

    // ! only this case, we use relative time
    if (type === 'NOTIFICATION' && unit === UnitOfTimeAgo.TODAY) return moment(date).fromNow();
    return moment(date).format(format);
  }

  // prettier-ignore
  private static DATE_TYPE: DateTypeJson = {
    'TODAY':       { POST: 'h:mm A',                     NOTIFICATION: '',                         OTHER: 'h:mm A' },
    'YESTERDAY':   { POST: 'ddd [at] h:mm A',            NOTIFICATION: '[Yesterday at] h:mm A',    OTHER: 'ddd [at] h:mm A' },
    'THIS-WEEK':   { POST: 'ddd [at] h:mm A',            NOTIFICATION: 'ddd [at] h:mm A',          OTHER: 'ddd [at] h:mm A' },
    'PAST-WEEK':   { POST: 'MMM D [at] h:mm A',          NOTIFICATION: 'MMM D [at] h:mm A',        OTHER: 'MMM D [at] h:mm A' },
    'LAST-MONTH':  { POST: 'MMM D, YYYY [at] h:mm A',    NOTIFICATION: 'MMM D, YYYY [at] h:mm A',  OTHER: 'MMM D, YYYY [at] h:mm A' },
    'PAST-MONTH':  { POST: 'MMM D, YYYY [at] h:mm A',    NOTIFICATION: 'MMM D, YYYY',              OTHER: 'MMM D, YYYY' },
    'LAST-YEAR':   { POST: 'MMM D, YYYY [at] h:mm A',    NOTIFICATION: 'MMM D, YYYY',              OTHER: 'MMM D, YYYY' },
    'PAST-YEAR':   { POST: 'MMM D, YYYY [at] h:mm A',    NOTIFICATION: 'MMM D, YYYY',              OTHER: 'MMM D, YYYY' }
  };

  private static getUnitOfTimeAgo(date: Date, timezone: string): UnitOfTimeAgo {
    const now = moment(date).tz(timezone || 'Asia/Bangkok');

    if (this.isToday(now))        return UnitOfTimeAgo.TODAY; // prettier-ignore
    if (this.isYesterday(now))    return UnitOfTimeAgo.YESTERDAY; // prettier-ignore
    if (this.isCurrentWeek(now))  return UnitOfTimeAgo.THIS_WEEK; // prettier-ignore
    if (this.isPastWeek(now))     return UnitOfTimeAgo.PAST_WEEK; // prettier-ignore
    if (this.isLastMonth(now))    return UnitOfTimeAgo.LAST_MONTH; // prettier-ignore
    if (this.isPastMonth(now))    return UnitOfTimeAgo.PAST_MONTH; // prettier-ignore
    if (this.isLastYear(now))     return UnitOfTimeAgo.LAST_YEAR; // prettier-ignore

    return UnitOfTimeAgo.PAST_YEAR;
  }

  private static isToday(date: moment.Moment) {
    const start = moment().startOf('day');
    const end = moment().endOf('day');

    return date.isBetween(start, end, undefined, '[]');
  }

  private static isYesterday(date: moment.Moment) {
    const start = moment().subtract(1, 'day').startOf('day'); // prettier-ignore
    const end = moment().subtract(1, 'day').endOf('day'); // prettier-ignore
    return date.isBetween(start, end, undefined, '[]');
  }

  private static isCurrentWeek(date: moment.Moment) {
    const start = moment().startOf('isoWeek');
    const end = moment().endOf('isoWeek');
    return date.isBetween(start, end, undefined, '[]');
  }

  /**
   * The last 4 weeks until last week.
   */
  private static isPastWeek(date: moment.Moment) {
    const start = moment().subtract(4, 'weeks').startOf('isoWeek'); // prettier-ignore
    const end = moment().subtract(1, 'week').endOf('isoWeek'); // prettier-ignore
    return date.isBetween(start, end, undefined, '[]');
  }

  private static isLastMonth(date: moment.Moment) {
    const start = moment().subtract(1, 'month').startOf('month'); // prettier-ignore
    const end = moment().subtract(1, 'month').endOf('month'); // prettier-ignore
    return date.isBetween(start, end, undefined, '[]');
  }

  /**
   * The last 12 months until last 2 months
   */
  private static isPastMonth(date: moment.Moment) {
    const start = moment().subtract(12, 'months').startOf('month'); // prettier-ignore
    const end = moment().subtract(2, 'months').endOf('month'); // prettier-ignore
    return date.isBetween(start, end, undefined, '[]');
  }

  private static isLastYear(date: moment.Moment) {
    const start = moment().subtract(1, 'year').startOf('year'); // prettier-ignore
    const end = moment().subtract(1, 'year').endOf('year'); // prettier-ignore
    return date.isBetween(start, end, undefined, '[]');
  }
}
