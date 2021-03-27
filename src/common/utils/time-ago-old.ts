import * as moment from 'moment-timezone';

/**
 * Calculate time ago from a date
 */
export const getTimeAgoX = (date: Date, timezone = 'Asia/Bangkok') => {
  const p = (v: number, type: 'second' | 'minute' | 'hour') =>
    `${v} ${type}${v > 1 ? 's' : ''} ago`; // pluralize

  const now = moment.tz(timezone); // present
  const past = moment.tz(date, timezone); // past

  const seconds = now.diff(past, 'seconds');
  const minutes = now.diff(past, 'minutes');
  const hours = now.diff(past, 'hours');
  const days = now.toDate().getDate() - 1 === past.toDate().getDate(); // compare after 24hour

  if (seconds < 60) {
    return p(seconds, 'second');
  } else if (minutes < 60) {
    return p(minutes, 'minute');
  } else if (now.isSame(past, 'day')) {
    return p(hours, 'hour');
  } else if (days) {
    return past.format('[Yesterday at] h:mm A'); // EX: Yesterday at 2:04 PM
  } else if (isCurrentWeek(past)) {
    return past.format('ddd [at] h:mm A'); // In the same week EX: Wed at 7:00 AM
  } else {
    return past.format('MMM DD [at] h:mm A'); // Otherwise EX: Jul 16 at 7:00 AM
  }
};

/**
 * Check if date is in current week
 */
function isCurrentWeek(date: moment.Moment) {
  const startOfWeek = moment().startOf('isoWeek');
  const endOfWeek = moment().endOf('isoWeek');
  return startOfWeek.isSameOrBefore(date) && endOfWeek.isSameOrAfter(date);
}
