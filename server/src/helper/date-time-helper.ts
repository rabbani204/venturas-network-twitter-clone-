import * as moment from 'moment';
import * as momentTimeZone from 'moment-timezone';

//get current date time or format a date time
export const DateTime = (dateTime?: Date) => {
  const dateTimeData = dateTime ?? new Date();

  const dateTimeResult = moment(dateTimeData).format('YYYY-MM-DD HH:mm:ss');

  return dateTimeResult;
};
//get current date or format a date
export const CurrentDate = (date?: any) => {
  const dateData = date ?? new Date();

  const dateResult = moment(dateData).format('YYYY-MM-DD');

  return dateResult;
};
//add hours to a date time
export const AddHoursIntoDateTime = (hours: number, dateTime?: Date) => {
  const dateTimeData = dateTime ?? new Date();

  const dateTimeResult = moment(dateTimeData).format('YYYY-MM-DD HH:mm:ss');
  const expected = moment(dateTimeResult)
    .add(hours, 'hours')
    .format('YYYY-MM-DD HH:mm:ss');
  return expected;
};

//check a date is same or after current date time
export const checkIsSameOrAfterNowDateTime = (checkingDate: Date) => {
  const checking = moment().isSameOrAfter(checkingDate);

  return checking;
};

//convert time to a timezone
export const toTimeZone = (time, zone) => {
  const format = 'HH:mm';
  return momentTimeZone(time, 'HH:mmZ').tz(zone).format(format);
};

export const toDateTimeZone = (time, zone) => {
  const format = 'YYYY-MM-DD HH:mm:ss';
  return momentTimeZone(time, 'HH:mmZ').tz(zone).format(format);
};

export const intakeYearByMonthName = (intakeMonth: string) => {
  const monthNo = new Date(Date.parse(intakeMonth + ' 1, 2012')).getMonth() + 1;
  // console.log(monthNo, '---M', intakeMonth);
  const intakeDataMonth = CurrentDate(
    new Date(`${new Date().getFullYear()}-${monthNo}-01`),
  );
  // console.log(intakeDataMonth, '-----C', CurrentDate());
  let year = new Date().getFullYear();
  if (moment(intakeDataMonth).isBefore(CurrentDate()) === true) {
    year = year + 1;
  }

  return year;
};
