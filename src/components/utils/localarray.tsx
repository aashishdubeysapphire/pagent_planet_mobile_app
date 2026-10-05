import React from 'react';
import AppImages from '../../assets/images/AppImages';
import translations from '../../assets/translations';
import {DESCRIPTION, EVENT_TYPE, MESSAGE_MENU, PLACEMENT} from './enum';
import {moderateScale} from './responsiveSize';

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
export const eventType = [
  {
    lable: EVENT_TYPE.UPCOMING,
  },
  {
    lable: EVENT_TYPE.PAST,
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
export const descriptionWithAppointed = [
  {
    name: translations.APPOINTED,
    id: DESCRIPTION.APPOINTED,
  },
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

export const MessageFilterMenu = [
  {
    id: 1,
    label: translations.ALL + ' ' + translations.MESSAGES,
  },
  {
    id: 2,
    label: translations.RECEIVED + ' ' + translations.MESSAGES,
  },
  {
    id: 3,
    label: translations.SENT + ' ' + translations.MESSAGES,
  },
  {
    id: 4,
    label: translations.UNREAD + ' ' + translations.MESSAGES,
  },
];
export const MessageThreeDotMenu = [
  {
    id: MESSAGE_MENU.DELETE,
    label: translations.DELETE + ' ' + translations.MESSAGE,
    icon: <AppImages.CONVO.tpp_delete_pink width={moderateScale(16)} />,
  },
  {
    id: MESSAGE_MENU.MANANGE_NOTIFICATION,
    label: translations.MANAGE_NOTIFICATION,
    icon: (
      <AppImages.Dashboard.ManageNotificationIcon width={moderateScale(16)} />
    ),
  },
  {
    id: MESSAGE_MENU.CONTACT_US,
    label: translations.CONTACT_US,
    icon: <AppImages.MESSAGES.ContactUsIcon width={moderateScale(16)} />,
  },
];
export const shimmerListData = [
  {key: '1'},
  {key: '2'},
  {key: '3'},
  {key: '4'},
  {key: '5'},
  {key: '6'},
  {key: '7'},
  {key: '8'},
  {key: '9'},
  {key: '11'},
  {key: '12'},
  {key: '13'},
  {key: '24'},
  {key: '15'},
  {key: '16'},
  {key: '17'},
  {key: '18'},
  {key: '19'},
  {key: '20'},
  {key: '21'},
  {key: '22'},
  {key: '23'},
  {key: '24'},
  {key: '25'},
  {key: '26'},
  {key: '27'},
  {key: '28'},
  {key: '29'},
  {key: '30'},
];
