import dayjs, { OpUnitType, QUnitType } from 'dayjs';
// import JapaneseHolidays from 'japanese-holidays';
import { DISCOUNT_TIME, DATE, MONTHS, TIMEZONE } from '../../constants/rules';
import { badImplementationException, validationException } from './apiErrorHandler';
import pluginTz from 'dayjs/plugin/timezone';
import pluginUtc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Months } from '../../@types/validation';

dayjs.extend(pluginTz);
dayjs.extend(pluginUtc);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// export const checkHoliday = (time: string) => {
//   if (JapaneseHolidays.isHolidayAt(new Date(time))) {
//     return true;
//   } else {
//     if (dayjs(time).tz(TIMEZONE, true).day() === 0 || dayjs(time).tz(TIMEZONE, true).day() === 6) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// };

export const getTotalPrices = (
  startTime: string,
  endTime: string,
  isApplyDiscountOnWeekend: boolean,
  keepLocalTime?: boolean,
) => {
  const start = getTime(startTime, keepLocalTime);
  const startDate = start.format(DATE);

  const end = getTime(endTime, keepLocalTime);
  const endDate = end.format(DATE);

  const discountStartAt = getTime(`${startDate} ${DISCOUNT_TIME.startTime}`, true);
  const discountEndAt = getTime(`${endDate} ${DISCOUNT_TIME.endTime}`, true);

  let totalBase = 0;
  let totalDiscount = 0;
  let totalExtraCharge = 0;
  let totalDiscountOnWeekend = 0;

  let time = start;
  while (!time.isSame(end)) {
    let isExtraCharge = false;
    let isDiscount = false;
    // if (checkHoliday(time.format())) {
    //   isExtraCharge = true;
    // }
    if (time.isBetween(get1msBefore(discountStartAt.format()), get1msAfter(discountEndAt.format()))) {
      if ((isExtraCharge && isApplyDiscountOnWeekend) || !isExtraCharge) {
        isDiscount = true;
      }
    }

    if (isExtraCharge && isDiscount) {
      totalDiscountOnWeekend++;
    } else if (isExtraCharge && !isDiscount) {
      totalExtraCharge++;
    } else if (!isExtraCharge && isDiscount) {
      totalDiscount++;
    } else {
      totalBase++;
    }
    time = time.add(30, 'm');
  }

  return { totalBase, totalDiscount, totalExtraCharge, totalDiscountOnWeekend };
};

export const getTime = (time: string | undefined, keepLocalTime?: boolean) => {
  const dayTime = keepLocalTime ? dayjs(time).tz(TIMEZONE, true) : dayjs(time).tz(TIMEZONE);

  return dayTime;
};

export const getStartOf = (time: string, unit: OpUnitType, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  const startOf = dayTime.startOf(unit);

  return startOf;
};

export const getEndOf = (time: string, unit: OpUnitType, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  return dayTime.endOf(unit);
};

export const get1msBefore = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  return dayTime.subtract(1, 'millisecond');
};

export const get1msAfter = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  return dayTime.add(1, 'millisecond');
};

export const getNextDay = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  const endOfDay = dayTime.endOf('day');

  return endOfDay.add(1, 'millisecond');
};

export const getNextMonth = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  const endOfMonth = dayTime.endOf('month');

  return endOfMonth.add(1, 'millisecond');
};

export const getNext = (time: string, number: number, unit: any, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  return dayTime.add(number, unit);
};

export const getCurrentTime = (keepLocalTime?: boolean) => {
  const dayCurrentTime = getTime(undefined, keepLocalTime);

  return dayCurrentTime;
};

export const isTimeSameOrBeforeUnitTime = (time: string, num: number, unit: any, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  const dayCurrentTime = getTime(undefined, keepLocalTime);

  const substractTime = dayTime.subtract(num, unit);

  return substractTime.isSameOrBefore(dayCurrentTime);
};

export const compareAIsAfterB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isAfter(dayTime2);
};

export const compareAIsSameOrAfterB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isSameOrAfter(dayTime2);
};

export const compareAIsBeforeTimeB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isBefore(dayTime2);
};

export const compareAIsSameOrBeforeTimeB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isSameOrBefore(dayTime2);
};

/**
 *
 * @param time1 bigger than time2
 * @param time2 bigger than time1
 * @param {QUnitType | OpUnitType} unit
 * @param {boolean} keepLocalTime
 * @returns
 */
export const getTimeDifference = (
  time1: string,
  time2: string,
  unit: QUnitType | OpUnitType,
  keepLocalTime?: boolean,
) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  const diff = dayTime1.diff(dayTime2, unit, true);

  if (diff < 0) throw badImplementationException(new Error('time2 should be bigger than time1'));

  return diff;
};

export const getSpecificMonth = (month: Months) => {
  const index = MONTHS.indexOf(month);
  if (index === -1) throw validationException(new Error('You must send month in English'));
  return dayjs().tz(TIMEZONE).month(index);
};

export const isSame = (time1: string, time2: string, unit: OpUnitType) => {
  return dayjs(time1).tz(TIMEZONE).isSame(time2, unit);
};
