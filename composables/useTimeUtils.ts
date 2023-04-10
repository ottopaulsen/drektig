import { Timestamp } from "firebase/firestore";
export default function useTimeUtils() {
  type PossibleDate = Date | undefined | null;

  /**
   * Get a firestore Timestamp that can be used as filter for getting
   * a date days from today.
   *
   * If end is false (default):
   *   days = 0 gives the start of today
   *   days = -1 gives the start of yesterday
   *   days = 1 gives the start of tomorrow
   * If end is true:
   *   days = 0 gives the end of today
   *   days = -1 gives the end of yesterday
   *   days = 1 gives the end of tomorrow
   *
   * @param days
   * @param end
   */
  function daysFromToday(days: number, end: boolean = false): Date {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() + days + (end ? 1 : 0));
    return day;
  }

  /**
   * Get a date that is x days after another date
   *
   * @param day The date to calculate from
   * @param days The number of days to add
   */
  function daysAfter(day: PossibleDate, days: number): Date | undefined {
    if (!day) {
      return undefined;
    }
    const res = new Date(day);
    res.setDate(res.getDate() + days);
    return res;
  }

  /**
   *   Return true if a and b are dates, and a is later than b, else false
   *
   * @param a The date that shall be latest
   * @param b The data that shall be first
   */
  function isAfter(a: PossibleDate, b: PossibleDate): boolean {
    if (!a || !b) {
      return false;
    }
    return a > b;
  }

  return { daysAfter, daysFromToday, isAfter };
}
