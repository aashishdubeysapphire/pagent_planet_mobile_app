import {
  getCustomDateFormat,
  TIME_FORMAT,
} from '../../../../../../../../../utils/datetimemanger';
import {getIDsArrayFromArray} from '../../../../../../../../../utils/helperFunction';

export const getCreateToDo = (data, eventId) => {
  return {
    to_do_age_divisions: getIDsArrayFromArray(data.ageDevision),
    to_do_contestants: getIDsArrayFromArray(data.contestants),
    to_do_groups: getIDsArrayFromArray(data.group),
    timezone: data.timeZone?.id,
    event_id: eventId,
    category_id: data.typeOfTodo?.id,
    wardrobe_text: data.egShoeSize,
    location_address: data.locationName,
    name: data.title,
    description: data.description,

    link: data.addLink,
    title_for_link: data.titleForLink,
    due_date: getCustomDateFormat(
      data.dueDateTime,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.MMslashDDslashYYYY
    ),
    to_do_endTime: getCustomDateFormat(
      data.dueDateTime,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.HH_MM_A
    ),
    start_due_date: getCustomDateFormat(
      data.startDate,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.MMslashDDslashYYYY
    ),
    start_to_do_endTime: getCustomDateFormat(
      data.startDate,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.HH_MM_A
    ),
  };
};

export const getEditTodoBody = (data, eventId, todoId) => {
  return {
    event_id: eventId,
    to_do_id:todoId,
    to_do_age_divisions: getIDsArrayFromArray(data.ageDevision),
    wardrobe_text: data.egShoeSize,
    location_address: data.locationName,
    name: data.title,
    description: data.description,
    to_do_groups: getIDsArrayFromArray(data.group),
    link: data.addLink,
    title_for_link: data.titleForLink,
    due_date: getCustomDateFormat(
      data.dueDateTime,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.MMslashDDslashYYYY
    ),
    to_do_endTime: getCustomDateFormat(
      data.dueDateTime,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.HH_MM_A
    ),
    to_do_contestants: getIDsArrayFromArray(data.contestants),
    start_due_date: getCustomDateFormat(
      data.startDate,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.MMslashDDslashYYYY
    ),
    start_to_do_endTime: getCustomDateFormat(
      data.startDate,
      TIME_FORMAT.DD_MM_YYYY_hhmmA,
      TIME_FORMAT.HH_MM_A
    ),
  };
};
