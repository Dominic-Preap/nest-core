import * as _ from 'lodash';
import { extendMoment } from 'moment-range';
import * as Moment from 'moment-timezone';

const moment = extendMoment(Moment as any);

type WorkSchedule = { [key in Day]: Schedule[] };

type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

interface Schedule {
  works: Time[];
  breaks: Time[];
}

interface Time {
  start: string;
  end: string;
}

interface GetScheduleHourOptions {
  day: Day;
  date: string;
  first: boolean;
  last: boolean;
}

interface GetHourOptions {
  time: Time;
  date: string;
  first: boolean;
  last: boolean;
}

/**
 * finds the intersection of working hours and dayoff hour in a simple fashion
 *
 * EXAMPLE
 *  A - working time  | start = 08:00 / end = 17:00
 *  B - breaking time | start = 12:00 / end = 13:00
 *  C - dayoff time   | start = 12:00 / end = 20:00
 *
 *  A compare C = 5H
 *  B compare C = 1H
 *  Total: 5H - 1H = 4H
 *
 *       08:00             12:00                    17:00
 *  =======|#################|########################|======
 *  A \\\\\\\\\\\\\\\\\\\\\\\|            5H          |\\\\\\
 *  =========================|###############################
 *  C \\\\\\\\\\\\\\\\\\\\\\\|  1H  |\\\\\\\\\\\\\\\\\\\\\\\\
 *  =========================|######|========================
 *  B \\\\\\\\\\\\\\\\\\\\\\\|\\\\\\|------- 4H ------|\\\\\\
 *  =========================|======|========================
 *                         12:00  13:00
 *
 */
export class DayOffCalculation {
  /**
   * Holiday used bypass working hour
   */
  private holidays: Date[];
  /**
   * Day off start date
   */
  private startDate: Date;
  /**
   * Day off end date
   */
  private endDate: Date;
  /**
   * Working Schedule including working hour and breaking hour
   */
  private schedule!: WorkSchedule;

  constructor() {
    this.holidays = [];
    this.startDate = new Date();
    this.endDate = new Date();
    this.schedule = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    };
  }

  setSchedule(schedule: WorkSchedule) {
    this.schedule = { ...this.schedule, ...schedule };
  }

  setHolidays(holidays: Date[]) {
    // Remove timezone and set zero second
    this.holidays = holidays.map(x => moment(x).utcOffset(0, true).second(0).toDate());
  }

  setDayOffs(startDate: Date, endDate: Date, timezone: string) {
    // Remove timezone and set zero second
    // https://stackoverflow.com/questions/28198626/display-datetime-with-momentjs-without-timezone-conversion
    const start = (moment(startDate) as unknown as Moment.Moment)
      .tz(timezone)
      .utcOffset(0, true)
      .second(0);
    const end = (moment(endDate) as unknown as Moment.Moment)
      .tz(timezone)
      .utcOffset(0, true)
      .second(0);

    // Set minutes to the nearest 30
    // https://stackoverflow.com/questions/25323823/round-moment-js-object-time-to-nearest-30-minute-interval/25323966
    // const startRemainder = 30 - (start.minute() % 30);
    // const endRemainder = 30 - (end.minute() % 30);

    this.startDate = start.add(0, 'minute').toDate();
    this.endDate = end.add(0, 'minute').toDate();
  }

  calculate() {
    let finalHour = 0;
    const dateRange = this.getDateRange();

    // https://flaviocopes.com/how-to-get-index-in-for-of-loop/
    for (const [i, date] of dateRange.entries()) {
      const first = i === 0;
      const last = i === dateRange.length - 1;

      const m = moment(date);
      const hasHoliday = this.holidays.some(x => m.isSame(x, 'day'));
      if (hasHoliday) continue;

      const day: Day = m.format('ddd').toLowerCase() as any;
      // console.log(day);
      // console.log(first);
      // console.log(last);
      const { breakHour, workHour } = this.getScheduleHour({ day, date, first, last });
      finalHour += Math.max(0, workHour - breakHour);
    }
    return { dateRange, finalHour };
  }

  private getDateRange() {
    const dates: string[] = [];
    const now = moment(this.startDate);
    const end = moment(this.endDate);

    while (now.isSameOrBefore(end, 'days')) {
      dates.push(now.toISOString());
      now.add(1, 'days');
    }
    return dates;
  }

  private getScheduleHour(opt: GetScheduleHourOptions) {
    const { day, date, first, last } = opt;
    const schedules = this.schedule[day];

    let workHour = 0;
    let breakHour = 0;
    for (const schedule of schedules) {
      const workHours = schedule.works.map(time =>
        this.getIntersectHour({ time, date, first, last })
      );
      const breakHours = schedule.breaks.map(time =>
        this.getIntersectHour({ time, date, first, last })
      );

      workHour += _.sum(workHours);
      breakHour += _.sum(breakHours);
    }

    return { workHour, breakHour };
  }

  private getIntersectHour(opt: GetHourOptions) {
    const { time, date, first, last } = opt;

    const { end, start } = time;
    const [startHour, startMinute] = start.split(':');
    const [endHour, endMinute] = end.split(':');

    const officeStartDate = moment(date)
      .startOf('day')
      .hour(+startHour)
      .minute(+startMinute);

    const officeEndDate = moment(date)
      .startOf('day')
      .hour(+endHour)
      .minute(+endMinute);

    const dayOffStartDate = first
      ? moment(date)
          .startOf('day')
          .hour(this.startDate.getUTCHours())
          .minute(this.startDate.getUTCMinutes())
      : officeStartDate;

    const dayOffEndDate = last
      ? moment(date)
          .startOf('day')
          .hour(this.endDate.getUTCHours())
          .minute(this.endDate.getUTCMinutes())
      : officeEndDate;

    const officeRange = moment.range(officeStartDate, officeEndDate);
    const dayOffRange = moment.range(dayOffStartDate, dayOffEndDate);
    const range = officeRange.intersect(dayOffRange);
    const hour = range ? range.duration('hour') : 0;

    // console.log(officeRange);
    // console.log(dayOffRange);
    // console.log(hour);
    return hour;
  }
}
