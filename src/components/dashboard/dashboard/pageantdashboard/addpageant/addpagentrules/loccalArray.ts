import translations from '../../../../../../assets/translations';
import {GENDER} from '../../../../../utils/enum';

export const THREE_OPTIONS = [
  {
    lable: translations.YES,
  },
  {
    lable: translations.NO_SMALL,
  },
  {
    lable: translations.BOTH,
  },
];
export const TWO_OPTIONS = [
  {
    lable: translations.YES,
  },
  {
    lable: translations.NO_SMALL,
  },
];
export const ADDITIONL_REQUIRMENTS_LIST = [
  {
    lable: translations.ETHNICITY,
    placeholder: translations.BLACK_ASIAN,
    backendKey: 137202,
  },
  {
    lable: translations.SEXUAL_PREFERENCE,
    placeholder: translations.GAY_TRANSGENDER,
    backendKey: 1087,
  },
  {
    lable: translations.MEDICAL_CONDITION,
    placeholder: translations.CANCER_ALBINO,
    backendKey: 1088,
  },
  {
    lable: translations.APPEARANCE,
    placeholder: translations.PLUS_SIZE_HEIGHT,
    backendKey: 1089,
  },
  {
    lable: translations.ANIMAL,
    placeholder: translations.DOG_PAGEANT,
    backendKey: 1090,
  },
  {
    lable: translations.SPORT,
    placeholder: translations.SCUBA,
    backendKey: 1092,
  },
];
export const GENDER_LIST = [
  {
    name: GENDER.MALE,
    title: GENDER.MALE,
    id: GENDER.MALE,
  },
  {
    name: GENDER.FEMALE,
    title: GENDER.FEMALE,
    id: GENDER.FEMALE,
  },
  {
    name: GENDER.BOTH,
    title: GENDER.BOTH,
    id: GENDER.BOTH,
  },
];

export const PAGEANT_RULES_INFO_ARRAY = [
  {
    label: translations.WHAT_ARE_YOUR_AGE_DIVISIONS,
    info: translations.YOUR_SELECTION_CREATS_CONTESTANT_TABS,
  },
  {
    label: translations.WHAT_ARE_YOUR_PHASE_OF_COMPETITION,
    info: translations.LIST_THE_PHASES_THAT_ARE_SCORED_BY_JUDEGS,
  },
  {
    label: translations.WHO_CAN_COMPETE_FOR_THIS_EVENT,
    info: translations.THIS_SECTION_DETERMINE_YOUR_DIR_RESULTS,
  },
  {
    label: translations.COUNTRY,
    info: translations.SELECT_THE_COUNTRIES_WHERE_CONTESTANTS_NEED_TO_LIVE,
  },
  {
    label: translations.STATE,
    info: translations.IF_YOU_ACCEPT_CONTESTANTS_FROM_EVERY_STATE,
  },
  {
    label: translations.ARE_YOU_A_SPECIALITY_PAGEANT,
    info: translations.IF_YOU_SELECT_YES,
  },
];
export const BANK_DETAIL_ARRAY = [
  {
    label: translations.SHOP,
    info: translations.SHOP_INFO,
  },
  {
    label: translations.GO_CROWN_ME_INFO,
    info: translations.CROWN_INFO,
  },
  {
    label: translations.PCA_TRANSACTIONS,
    info: translations.PCA_INFO,
  },
];

export const IMAGE_DETAIL = [
  {
    label: translations.VIEW_MORE_IMAGE,
    info: translations.SWIPE_LEFT_TO_VIEW_MORE_IMAGES,
  },
];
export const CONTESTANT_WORK_WITH_IMAGE_DETAIL = [
  {
    label: translations.TAG_INFO,
    info: translations.TAG_THE_EVENT_ASSOCOATED_WITH_THE_CNTESTANT_YOU_HAVE_WORKED_WITH_TO_GET_NOMIATED_FOR_THE_BEST_IN_PAGEANTRY_AWARD,
  },
];
