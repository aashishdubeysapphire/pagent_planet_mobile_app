import translations from '../../../../../../assets/translations';
import {DESCRIPTION, EVENT_TYPE, PLACEMENT} from '../../../../../utils/enum';

export const description = [
  {
    name: translations.ADVANCED,
    id: DESCRIPTION.ADVANCED,
  },
  {
    name: translations.DETHRONED,
    id: DESCRIPTION.DETHRONED,
  },
  {
    name: translations.RESIGEND,
    id: DESCRIPTION.RESIGEND,
  },
  {
    name: translations.TITLE_AWARDED,
    id: DESCRIPTION.TITLE_AWARDED,
  },
];
export const placement = [
  {
    lable: PLACEMENT.NONE,
  },
  {
    lable: PLACEMENT.WINNER,
  },
  {
    lable: PLACEMENT.RUNNER_UP1,
  },
  {
    lable: PLACEMENT.RUNNER_UP2,
  },
  {
    lable: PLACEMENT.RUNNER_UP3,
  },
  {
    lable: PLACEMENT.RUNNER_UP4,
  },
];
export const eventType = [
  {
    lable: EVENT_TYPE.UPCOMING,
  },
  {
    lable: EVENT_TYPE.PAST,
  },
];
