import moment, { MomentInput } from 'moment';
import { Errors, ListNeededMaskFields } from '@n-constants';
import { BaseException } from '../filter-exceptions';

export function isNotEmptyStr(s: string) {
  return s && s !== '';
}

export function parseToISODate(dateString: string, type: 'from' | 'to'): string | null {
  const isoDate = (date: moment.Moment) => {
    if (type === 'from') {
      return date.startOf('day').toISOString();
    }
    if (type === 'to') {
      return date.endOf('day').toISOString();
    }
    return date.toISOString();
  };

  const iso8601Date = moment(dateString, moment.ISO_8601, true);
  if (iso8601Date.isValid()) {
    return isoDate(iso8601Date);
  }

  const customFormatDate = moment(dateString, 'DD-MM-YYYY', true);
  if (customFormatDate.isValid()) {
    return isoDate(customFormatDate);
  }

  // Handle the error and return an appropriate message to the user
  throw new BaseException(Errors.INVALID_INPUT);
}

export function makePaginationResponse(
  data: any,
  page: number,
  pageSize: number,
  total: number,
) {
  return {
    page,
    pageSize,
    totalPage: Math.ceil(total / pageSize),
    total,
    data,
  };
}

export const allRecordsCondition = {
  OR: [
    { isActive: true },
    { isActive: false },
  ],
};

export function isDateRangeOverlapping(startDate1: MomentInput, endDate1: MomentInput, startDate2: MomentInput, endDate2: MomentInput): boolean {
  return !(
    moment(endDate1).isBefore(startDate2) ||
    moment(startDate1).isAfter(endDate2)
  );
}

export function maskString(
  hashCharacter: string,
  endingWith: number,
  originString: string,
  startWith?: number,
) {
  return startWith
    ? originString.slice(0, startWith) +
    originString
      .slice(startWith, -endingWith)
      .replace(/./g, hashCharacter) +
    originString.slice(-endingWith)
    : originString.slice(0, -endingWith).replace(/./g, hashCharacter) +
    originString.slice(-endingWith);
}

export function transformObject(obj: any, type: 'request' | 'response') {
  try {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (ListNeededMaskFields.COMPLETE.includes(key)) {
          if (type === 'request') {
            obj[key] = '********';
          } else {
            delete obj[key];
          }
        } else if (ListNeededMaskFields.SEMI.includes(key) && obj[key]) {
          const { length } = obj[key].toString();
          if (length > 8) {
            obj[key] = maskString('*', 3, obj[key], 3);
          } else if (length > 3) {
            obj[key] = maskString('*', 0, obj[key], 0);
          } else {
            obj[key] = '*'.repeat(length);
          }
        } else {
          obj[key] = transformObject(obj[key], type);
        }
      }
    });
    return obj;
  } catch (error) {
    return obj;
  }
}
