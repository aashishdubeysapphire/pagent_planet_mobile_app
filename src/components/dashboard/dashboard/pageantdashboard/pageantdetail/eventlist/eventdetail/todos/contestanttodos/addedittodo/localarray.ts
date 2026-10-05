import translations from '../../../../../../../../../../assets/translations';
import {TODO_CATEGORY} from '../../../../../../../../../utils/enum';

export const todoCategory = [
  {id: 'All', text: TODO_CATEGORY.ALL},
  {id: 1, text: TODO_CATEGORY.AGE_DEVISION},
  {id: 2, text: TODO_CATEGORY.CONTESTANTS},
  {id: 3, text: TODO_CATEGORY.GROUPS},
];
export const location = [
  {
    lable: translations.YES,
  },
  {
    lable: translations.NO_SMALL,
  },
];

export const TODO_INFO_ARRAY = [
  {
    label: translations.ADD_NEW_TODO,
    info: translations.ADD_NEW_TODO_DESCRIPTION,
  },
  {
    label: translations.SELECT_CATEGORIES_TODO_APPLIES_TO,
    info: translations.SELECT_CATEGORIES_TODO_APPLIES_TO_DESCRIPTION,
  },
];
