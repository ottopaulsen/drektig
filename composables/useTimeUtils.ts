export default function useTimeUtils() {
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

  return { daysFromToday };
}
