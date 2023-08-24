import { differenceInDays, addDays, format, sub } from "date-fns";

export default function habitCalculator(habit) {
  // console.log(habit);
  /**
   * Returns current streak of habit
   * @returns {int}
   */
  function getCurrentStreak() {
    let streak = 0;
    let dayCount = differenceInDays(new Date(), new Date(habit.startDate)); // number of days since habit creation
    const dayInterval = parseInt(habit.schedule.day, 10);

    for (let day = 0; day <= dayCount; day += dayInterval) {
      const currentDate = format(sub(new Date(), { days: day }), "yyyy-MM-dd");

      // get entry for current date
      const value = habit.entries.filter((e) => e.date === currentDate)[0]
        .value;
      if (value >= habit.target.value) {
        streak++;
      } else {
        return streak;
      }
    }

    return streak;
  }

  /**
   * Returns the best streak
   * @returns {int}
   */
  function getBestStreak() {
    let streak = 0;
    let bestStreak = 0;
    let dayCount = differenceInDays(new Date(), new Date(habit.startDate)); // number of days since habit creation
    const dayInterval = parseInt(habit.schedule.day, 10);

    for (let day = 0; day <= dayCount; day += dayInterval) {
      const currentDate = format(
        addDays(new Date(habit.startDate), day),
        "yyyy-MM-dd"
      );
      // get entry for current date
      const value = habit.entries.filter((e) => e.date === currentDate)[0]
        .value;

      if (value >= habit.target.value) {
        streak++;
        bestStreak = Math.max(bestStreak, streak);
      } else {
        streak = 0;
      }
    }

    return bestStreak;
  }

  /**
   * Returns a percentage representing the habit strength of a habit
   * @returns {Int} habit strength
   */
  function getStrength(lastDate = new Date()) {
    let success = 0;
    const dayCount = differenceInDays(lastDate, new Date(habit.startDate)); // number of days since habit creation
    const dayInterval = parseInt(habit.schedule.day, 10);

    for (let day = 0; day <= dayCount; day += dayInterval) {
      const currentDate = format(
        addDays(new Date(habit.startDate), day),
        "yyyy-MM-dd"
      );
      // get entry for current date
      const value = habit.entries.filter((e) => e.date === currentDate)[0]
        .value;

      if (value >= habit.target.value) {
        success++;
      }
    }
    // console.log(success, dayCount);

    if (dayCount === 0) {
      return success === 1 ? 100 : 0;
    }
    return parseInt((100.0 * success) / dayCount, 10);
  }

  function getStrengthData() {
    const [dataArray, labelsArray] = [[], []];
    const dayInterval = 31;
    const dayCount = differenceInDays(new Date(), new Date(habit.startDate)); // number of days since habit creation

    for (let day = 0; day <= dayCount; day += dayInterval) {
      const currentDate = format(
        addDays(new Date(habit.startDate), day),
        "yyyy-MM-dd"
      );
      // get entry for current date
      const value = habit.entries.filter((e) => e.date === currentDate)[0]
        .value;

      dataArray.push(getStrength(new Date(currentDate)));
      labelsArray.push(format(new Date(currentDate), "MM-yy"));
    }

    return [dataArray, labelsArray];
  }

  return { getStrength, getBestStreak, getCurrentStreak, getStrengthData };
}
