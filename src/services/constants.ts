import translations from '../assets/translations';

export const SUCCESS_STATUS_CODE = 200;
export const ERROR_STATUS_CODE = 111;
export const AUTHENTICATION_ERROR = 401;

export enum MethodTypes {
  GET = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export enum ApiStatusType {
  Success = 200,
  Error = 201,
  BlockedUser = 204,
  AuthenticationFail = 401,
  ClaimApproved = 403,
  SubscriptionExpire = 402,
  NOT_FOUND = 404,
  ERROR = 500
}

export enum Param {
  PAGE = '?page=',
  PAGE_ = '&page=',
  EVENT_ID = '?event_id=',
  EVENT_ID_ = '&event_id=',
  AGE_DIVISION_ID = '&age_division_id=',
  CONTESTANT_PARAM = '&contestant_id=',
  CONTESTANT_PARAM_ = '?contestant_id=',
  SEARCH = '&search=',
  PROFILE_TYPE = '?profile_type=',
  PROFILE_TYPE_ = '&profile_type=',
  PROFILE_ID = '&profile_id=',
  PAGAENT_ID = '?pageant_id=',
  GALLERY_ID = '?gallery_id=',
  GALLERY_ID_ = '&gallery_id=',
  TO_DO_ID = '&to_do_id=',
  TO_DO_ID_ = '?to_do_id=',
  STR = '&str=',
  STR_ = '?str=',
  YEAR_ID = '&year_id=',
  ALBUM_CREATED_BY = '&album_created_by=',
  PRODUCT_CATEOGRY_ID = '?category_id=',
  PRODUCT_DSIGNER_ID = 'designer_id',
  PARAM_VALUE = '?param_value=',
  ROLE_ID = '&role_id=',
  ATTR_TYPE = '&attr[ticket_type]=',
  CATEGORY_ID = '&category_id=',
  PROFILE_ID_ = '?profile_id=',
  OWNER_IN = '&owner_id=',
  ROLE_NAME = '&role_name=',
  AND_VALUE = '&value=',
  SHOW_IMG = '&show_image=',
  MSG_SEARCH = '&msg_search=',
  USER_OWNED = '&userOwned=',
  EXPERT_ID = '?business_profile_id=',
  CLEAR_CONVO_NOTIFICATION = '&from=notification_center',
  SHOW_BRANDS = '&showBrands=',
  TICKET_PAGEANT_ID = '?pageant_id=',
  TICKET_PROFILE_ID = '?profile_id=',
  TICKET_ROLE_ID = '&role_id=',
  TICKET_TYPE = '&ticket_type=',
  TICKET_CATEGORY = '&category=',
  VIEW_ALL = '&view_all=',
  ORDER_BY_TICKETS = '&order_by_tickets=',
  SORT = '&sort=',
  FILTER_BY = '&filterby=',
}

export enum UpgradPlan {
  YES = 'Yes',
}

export enum ImageExtensionTypes {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
}

export enum FileExtTypes {
  JPG = 'jpg',
  PNG = 'png',
  RAR = 'rar',
  PDF = 'pdf',
  MP3 = 'mp3',
  MP4 = 'mp4',
  DOC = 'doc',
  ZIP = 'zip',
  JPEG = 'jpeg',
}

export const buttonsList = [
  translations.MESSAGE,
  translations.SHOP,
  translations.HIRE,
];

export const Public_Profile = 'public profile';

export enum ProfileType {
  CONTESTANT = 'contestant',
  BUSINESS = 'business',
  PAGEANT = 'pageant',
  EVENT = 'event',
}
export enum CreditCardType {
  VISA = 'Visa',
}

export enum ConvoButtonTypes {
  PUBLISH = 'publish',
  SAVE_AS_DRAFT = 'saveDraft',
  UPDATE_POST = 'updatePost',
}
export enum COMPNAY_ENUM {
  IN_PERSON = 'In Person',
  OTHER = 'Other',
}
