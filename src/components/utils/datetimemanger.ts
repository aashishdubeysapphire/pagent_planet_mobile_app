import moment from 'moment';
import momentTZ from 'moment-timezone';

export enum BACKEND_NULL_VAR {
  ALL_ZEROS = '0000-00-00 00:00:00',
}
export enum TIME_FORMAT {
  MM_DD_YYYY = 'MM-DD-YYYY',
  MMM_SPACE_DD = 'MMM DD',
  MMM_SPACE_DD_COMMA_YYYYY = 'MMM DD, YYYY',
  DD_MM_YYYY_HHmmA = 'DD-MM-YYYY HH:mmA',
  DD_MM_YYYY_hhmmA = 'DD-MM-YYYY hh:mmA',
  MM_DD_YYYY_hhmmA = 'MM-DD-YYYY hh:mm A',
  MMslashDDslashYYYY_hhmmA = 'MM/DD/YYYY hh:mmA',
  DDslashMMslashYYYY_hhmmA = 'DD/MM/YYY hh:mmA',
  MMDDYYYY = 'MM-DD-YYYY',
  YYYYMMDD = 'YYYY-MM-DD',
  YYYY = 'YYYY',
  DDMMYYYY = 'DD/MM/YYYY',
  DDMMMYYYY = 'DD MMM YYYY',
  YYYYMMDDHHMM = 'YYYY-MM-DD HH:mm',
  DDMMYYYYHHMMA = 'DD/MM/YYYY hh:mm A',
  YYYYDDMMhhmmA = 'YYYY-MM-DD hh:mm A',
  HH_MM_A = 'hh:mm A',
  MMslashDDslashYYYY = 'MM/DD/YYYY',
  DDmilnusMMmilusYYYY = 'DD-MM-YYYY',
  Utc_format = 'YYYY-MM-DD hh:mm:ssA',
  Utc_format1 = 'YYYY-MM-DD hh:mm:ss',
  MM_YY = 'MM/YY',
  DD_MMM = 'DD MMM',
  DDMMYY = 'DD/MM/YY',
  HH_MM = 'HH:mm',
  MM="MM",
  DD="DD"
}

export const getDateFormat = (date: any, format: string) => {
  return moment(date).format(format);
};
export const getCustomDateFormat = (
  date1: moment.MomentInput,
  date1Format: string | undefined,
  returnDateFormat: string | undefined,
) => {
  if (moment(date1, date1Format).format(returnDateFormat) === 'Invalid date') {
    return '';
  } else {
    return moment(date1, date1Format).format(returnDateFormat);
  }
};

export const getLocalTime = (time: string) => {
  let date = new Date(time);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );

  return new Date(milliseconds);
};

export const getESTDateTime = (
  dateTime: moment.MomentInput,
  timeZone: string | undefined,
) => {
  let date = moment(dateTime, TIME_FORMAT.DD_MM_YYYY_HHmmA).format(
    TIME_FORMAT.MM_DD_YYYY_hhmmA,
  );
  const fmt = TIME_FORMAT.MM_DD_YYYY_hhmmA;
  const m = momentTZ.tz(date, fmt, timeZone);
  m.utc().tz('America/New_York');
  const s = m.format(TIME_FORMAT.DD_MM_YYYY_hhmmA);
  return s;
};

export const dateDifference = (
  startDate: moment.MomentInput,
  endDate: moment.MomentInput,
  dateformat = TIME_FORMAT.DDMMYYYYHHMMA,
) => {
  const a = moment(startDate, dateformat);
  const b = moment(endDate, dateformat);

  const diffDays = (b - a) / (1000 * 60 * 60 * 24);

  return diffDays;
};

export const verifyIfDateLiesBtw = (
  startDate: moment.MomentInput,
  endDate: moment.MomentInput,
  testDate: moment.MomentInput,
) => {
  return (
    dateDifference(testDate, endDate) < 0 ||
    dateDifference(startDate, testDate) < 0
  );
};

export const checkIfDatesAreupcomingCurrent = (
  endDate: moment.MomentInput,
  format = TIME_FORMAT.MM_DD_YYYY,
) => {
  return dateDifference(new Date(), endDate, format) >= 0;
};

export const compareDates = (UTCDate: string) => {
  const date = new Date(UTCDate);
  const currentDate = new Date();
  const yesterday = 'Yesterday';
  if (date.getDate() === currentDate.getDate()) {
    return moment(date).format(TIME_FORMAT.HH_MM_A);
  } else if (date.getDate() < currentDate.getDate()) {
    if (currentDate.getDate() - date.getDate() === 1) {
      return yesterday;
    } else {
      return moment(date).format(TIME_FORMAT.MMslashDDslashYYYY);
    }
  } else {
    return moment(date).format(TIME_FORMAT.MMslashDDslashYYYY);
  }
};
