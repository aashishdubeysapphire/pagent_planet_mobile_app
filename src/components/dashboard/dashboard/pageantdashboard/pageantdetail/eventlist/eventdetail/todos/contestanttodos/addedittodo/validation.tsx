import translations from '../../../../../../../../../../assets/translations';
import {TODO_CATEGORY, TODO_TYPE} from '../../../../../../../../../utils/enum';
import {isURL} from '../../../../../../../../../utils/validations';
import {dateDifference} from '../../../../../../../../../utils/datetimemanger';

const lengthValidation = (data: string | any[], minlen = 1) => {
  if (data.length >= minlen) {
    return true;
  } else {
    return translations.THIS_FIELD_REQUIRED;
  }
};
const dataAvilableValidation = (data: any) => {
  if (!!data) {
    return true;
  } else {
    return translations.THIS_FIELD_REQUIRED;
  }
};

const linkValidation = data => {
  if (!!data) {
    if (isURL(data)) {
      return true;
    } else {
      return translations.PLEASE_ENTER_A_VALID_LINK;
    }
  } else {
    return true;
  }
};
const checkif_age_contestent_grp_isValid = todoData => {
  if (todoData.category?.text === TODO_CATEGORY.AGE_DEVISION) {
    return lengthValidation(todoData.ageDevision);
  } else if (todoData.category?.text === TODO_CATEGORY.CONTESTANTS) {
    return lengthValidation(todoData.contestants);
  } else if (todoData.category?.text === TODO_CATEGORY.GROUPS) {
    return lengthValidation(todoData.group);
  } else {
    return true;
  }
};
const startDateTimeValidation = todoData => {
  if (
    (todoData.typeOfTodo?.id === TODO_TYPE.OTHER &&
      todoData?.location === translations.YES) ||
    todoData.typeOfTodo?.id === TODO_TYPE.REHERSALS ||
    todoData.typeOfTodo?.id === TODO_TYPE.SCHEDULE
  ) {
    if (!!todoData?.startDate) {
      let diffrence = dateDifference(
        todoData?.startDate,
        todoData?.dueDateTime
      );
      if (diffrence < 0) {
        return translations.DATE_INVALID;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
};

const commonValidations = todoData => {
  return (
    dataAvilableValidation(todoData.timeZone?.id) === true &&
    dataAvilableValidation(todoData.dueDateTime) === true &&
    dataAvilableValidation(todoData.category?.id) === true &&
    checkif_age_contestent_grp_isValid(todoData) === true &&
    lengthValidation(todoData.description, 2) === true &&
    linkValidation(todoData.addLink) === true
  );
};

const locationNameVal = todoData => {
  if (
    todoData.typeOfTodo?.id === TODO_TYPE.OTHER &&
    todoData?.location === translations.YES
  ) {
    return lengthValidation(todoData.locationName, 1);
  } else {
    return true;
  }
};
export const isValid = (todoData, setToDoErrorMsg) => {
  setToDoErrorMsg({
    timeZone: dataAvilableValidation(todoData.timeZone?.id),
    typeOfTodo: dataAvilableValidation(todoData.typeOfTodo?.id),
    dueDateTime: dataAvilableValidation(todoData.dueDateTime),
    category: dataAvilableValidation(todoData.category?.id),
    ageDevision:
      todoData.category?.text === TODO_CATEGORY.AGE_DEVISION
        ? lengthValidation(todoData.ageDevision)
        : '',
    contestants:
      todoData.category?.text === TODO_CATEGORY.CONTESTANTS
        ? lengthValidation(todoData.contestants)
        : '',
    group:
      todoData.category?.text === TODO_CATEGORY.GROUPS
        ? lengthValidation(todoData.group)
        : '',
    description: lengthValidation(todoData.description, 2),
    addLink: linkValidation(todoData.addLink),
    titleForLink: '',
    locationName: lengthValidation(todoData.locationName, 1),
    egShoeSize:
      todoData.typeOfTodo?.id === TODO_TYPE.WARDROBE
        ? lengthValidation(todoData.egShoeSize, 2)
        : '',
    title: lengthValidation(todoData.title, 2),
    startDate: startDateTimeValidation(todoData),
  });

  if (todoData.typeOfTodo?.id === TODO_TYPE.WARDROBE) {
    return (
      lengthValidation(todoData.egShoeSize, 2) === true &&
      commonValidations(todoData)
    );
  } else if (
    todoData.typeOfTodo?.id === TODO_TYPE.OTHER ||
    todoData.typeOfTodo?.id === TODO_TYPE.REHERSALS ||
    todoData.typeOfTodo?.id === TODO_TYPE.SCHEDULE
  ) {
    return (
      locationNameVal(todoData) === true &&
      lengthValidation(todoData.title, 2) === true &&
      commonValidations(todoData) &&
      startDateTimeValidation(todoData) === true
    );
  } else {
    return commonValidations(todoData);
  }
};
