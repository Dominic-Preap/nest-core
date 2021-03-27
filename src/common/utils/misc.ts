import * as _moment from 'moment';

/**
 * Add st, nd, rd and th (ordinal) suffix to a number
 *
 * @see https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
 */
export const nth = (n: number) =>
  n + (['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th');

/**
 * Moment Helper
 *
 */
// prettier-ignore
export const moment = {
  dayStart:       (m: _moment.Moment) => m.startOf('day'),
  dayEnd:         (m: _moment.Moment) => m.endOf('day'),
  thisWeekStart:  (m: _moment.Moment) => m.startOf('isoWeek'),
  thisWeekEnd:    (m: _moment.Moment) => m.endOf('isoWeek'),
  thisMonthStart: (m: _moment.Moment) => m.startOf('month'),
  thisMonthEnd:   (m: _moment.Moment) => m.endOf('month'),
  yesterdayStart: (m: _moment.Moment) => m.subtract(1, 'day').startOf('day'),
  yesterdayEnd:   (m: _moment.Moment) => m.subtract(1, 'day').endOf('day'),
  lastWeekStart:  (m: _moment.Moment) => m.subtract(1, 'week').startOf('isoWeek'),
  lastWeekEnd:    (m: _moment.Moment) => m.subtract(1, 'week').endOf('isoWeek'),
  lastMonthStart: (m: _moment.Moment) => m.subtract(1, 'month').startOf('month'),
  lastMonthEnd:   (m: _moment.Moment) => m.subtract(1, 'month').endOf('month'),
}
