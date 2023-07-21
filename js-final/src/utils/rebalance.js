import { differenceInDays, addDays, format, sub } from "date-fns";

/**
 * Automatically fills entries for days where user input is missing.
 * Dates between start date and current date, where current date >= start date, are filled.
 * @param {String} startDate Date when habit started
 * @param {[{date:String, value:integer}]} entryList list of all entries
 * @param {integer} defaultValue
 * @returns {[{date:String, value:integer}]}
 */
export default function rebalanceEntries(startDate, entryList, defaultValue) {
  console.log(startDate, entryList, defaultValue);
  const allDateEntries = entryList.map((e) => e.date);
  let dayCount = differenceInDays(new Date(), new Date(startDate)); // number of days since habit creation
  const newEntryList = [...entryList];

  // fill gaps between entries with default value up until today
  for (let day = 0; day <= dayCount; day++) {
    const date = format(addDays(new Date(startDate), day), "yyyy-MM-dd");
    if (!allDateEntries.includes(date)) {
      newEntryList.push({ date: date, value: defaultValue });
      allDateEntries.push(date);
    }
  }

  // initialise entry list for last 7 days including today
  for (let day = 6; day >= 0; day--) {
    const date = format(sub(new Date(), { days: day }), "yyyy-MM-dd");
    if (!allDateEntries.includes(date)) {
      newEntryList.push({ date: date, value: defaultValue });
      allDateEntries.push(date);
    }
  }

  // fill gaps between smallest date and start date
  const earliestDate = allDateEntries.sort((a, b) => a - b)[0];
  dayCount = differenceInDays(new Date(startDate), new Date(earliestDate));

  // console.log("Earliest date ", earliestDate);
  for (let day = 0; day <= dayCount; day++) {
    const date = format(addDays(new Date(earliestDate), day), "yyyy-MM-dd");

    if (!allDateEntries.includes(date)) {
      newEntryList.push({ date: date, value: defaultValue });
      allDateEntries.push(date);
    }
  }

  return newEntryList;
}
