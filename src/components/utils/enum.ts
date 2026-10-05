import translations from '../../assets/translations';

export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female',
  TRANSGENDER = 'Transgender',
  OTHER = 'Other',
  BOTH = 'Both',
}
export enum PHONE_NUMBER {
  MAX_LENGTH = 15,
}

export enum MASTERDATA {
  HAIR_COLOR = 2,
  EYE_COLOR = 19,
  ZODIAC_SIGN = 21,
  HEIGHT = 9,
  YEARS = 5,
  WEIGHT = 20,
  AWARDS = 27,
  PHASES_OF_COMPETETION = 7,
}

export enum ROLES {
  PAGEANT = 'Pageant',
  CONTESTANT = 'Contestant',
  AESTHETICS = 'Aesthetics',
  COACHE = 'Coache',
  DESIGNER = 'Designer',
  EMCEE = 'Emcee',
  HAIR_MAKEUP_ARTIST = 'Hair & Makeup Artist',
  JUDGE = 'Judge',
  PERSOANAL_TAINER = 'Personal Trainer',
  EXPERT = 'Expert',
  PHOTOGRAPHER = 'Photographer',
  PRODUCTION = 'Production',
  RETAILER = 'Retailer',
  FAN = 'Fan',
  CROWN_CONVO = 'Crown Convo',
  ADMIN_ID = 1,
  COACH = 'Coach',
}

export enum SOCIAL_HINT_LINK {
  FACEBOOK = 'https://www.facebook.com/pageantplanet',
  INSTAGRAM = 'https://www.instagram.com/pageantplanet',
  YOUTUBE = 'https://www.youtube.com/pageantplanet',
  TWEETER = 'https://www.twitter.com/pageantplanet',
  PINTEREST = 'https://www.pinterest.com/pageantplanet',
  LINKEDIN = 'https://www.lindedin.com/pageantplanet',
  TIKTOK = 'https://www.tiktok.com/pageantplanet',
}

export enum USER_DESHBOARD_TAB {
  CONVO = 'Convo',
  SHOP = 'Shop',
  DIRECTORY = 'Directory',
  ASK_QUESTIONS = 'Ask Questions',
  DESHBOARD = 'Dashboard',
  SELL_ITEMS = 'Sell Items',
  SELL_ITEM_SERVICES = 'Sell Items',
}

export enum CONTESTANT_SUB_TAB {
  PROFILE = 0,
  MY_JOURNEY = 1,
  GALLERY = 2,
  MEMBERSHIP = 3,
  GO_CROWN_ME = 4,
  RESOURCE = 5,
  PODCAST = 6,
  STATISTICS = 7,
}
export enum EXPERT_SUB_TAB {
  PROFILE = 0,
  MY_WORK = 1,
  CLIENT = 2,
  ADVERTISE = 3,
  REVIEW = 4,
}
export enum SELL_PRODUCT_ATTRIBUTES {
  SELL_SIZE = 12,
  SELL_PAGEANT_SWAG_SIZE = 8,
  SELL_SHOES_SIZE = 18,
  SELL_SWIMSUITS_BOTTOM_SIZE = 26,
  SELL_SWIMSUITS_TOP_SIZE = 27,
  SELL_CROWNS_SASHES_MORE_SIZE = 25,
  SELL_JEWELRY_SIZE = 11,
  SELL_JEWELRY_AB_SIZE = 29,
  SELL_PRODUCT_COLOR = 13,
  SELL_JEWELRY_COLOR = 28,
}

export enum SELL_PRODUCT {
  DRESSES = 1,
  INTERVIEW_APPEARANNCE = 2,
  FUN_FASHION = 3,
  SWIMSUITS = 4,
  COSTUME_TALENT = 5,
  PAGENT_SWAG = 6,
  SHOES = 7,
  JEWELRY = 8,
  CROWN_SASHES = 9,
  BEAUTY = 10,
  DIGITAL_PAINT = 11,
  HIRE = 12,
  TICKETS_ENTRY = 13,
}
export enum EXPERT_ALUM_TYPE {
  CONTESTANT_WORKED_WITH = 1,
  PAGEANT_WORKED_WITH = 2,
  EXTRA = 3,
}
export enum EVENT_TYPE {
  UPCOMING = 'Upcoming Event',
  PAST = 'Past Event',
}

export enum FLOATING_ICON {
  PLUS = 0,
  CAMERA = 1,
  MENU = 2,
  UPLOAD = 3,
  DELETE = 4,
}
export enum PLACEMENT {
  NONE = 'None',
  WINNER = 'Winner',
  RUNNER_UP1 = '1st Runner Up',
  RUNNER_UP2 = '2nd Runner Up',
  RUNNER_UP3 = '3rd Runner Up',
  RUNNER_UP4 = '4th Runner Up',
}
export enum DESCRIPTION {
  APPOINTED = 1,
  ADVANCED = 2,
  DETHRONED = 3,
  RESIGEND = 4,
  TITLE_AWARDED = 5,
}

export enum TAB_KEYS {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
  FOURTH = 'fourth',
}
export enum PARAM_VALUE {
  ACTIVE = 'Active',
  GENERAL = 'General',
  EVENT = 'event',
}

export enum IMAGE_TYPE {
  PROFILE = 1,
  HEADSHOT_IMAGE = 2,
  MAIN_IMAGE = 3,
  BANNER_IMAGE = 4,
}

export enum REFESH_SCREEN {
  NONE = 0,
  GALLERY = 1,
  SUB_GALLERY = 2,
  MY_JOURNEY = 3,
  UPDATE_IMAGE_TAG = 4,
  PAGEANT_DETAIL = 5,
  PAGEANT_LIST = 6,
  PAGEANT_EVENT_DETAIL = 7,
  PAGEANT_ROLE_TYPE = 8,
  ADD_JUDDGE = 9,
  ADD_EMCEES = 10,
  JUDDGE_AND_EMCEES = 11,
  UPDATE_EVENT_DETAIL_AGE_DIVISIONS = 12,
  EDIT_CONTASTENT_IN_EVENT = 13,
  GROUP_LIST = 14,
  GROUP_CONTESTANT_LIST = 15,
  EVENT_PRIZE_LIST = 16,
  ACTIVE_PAGEANT_EVENT_SECTION = 17,
  ACTIVATE_PCA_EVENT_SECTION = 18,
  CONTESTANT_TODOS = 19,
  PUBLIC_PROFILE_CONTESTANT_ALBUM = 20,
  PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE = 21,
  EXPERT_AND_CONTESTENT_DASHBOARD = 22,
  DIRECTORY = 23,
  PUBLIC_PROFILE_CONTESTANT_WORK_WITH_ALBUM = 24,
  PUBLIC_PROFILE_PAGEANT_WORK_WITH_ALBUM = 25,
  PUBLIC_PROFILE_EXPERT = 26,
  PUBLIC_PROFILE_CONTESTANT = 27,
  PUBLIC_PROFILE_EVENT = 28,
  PUBLIC_PROFILE_PAGEANT = 29,
  CROWN_CONVO = 30,
  PAGEANT_EVENT_ALBUM = 31,
  PAGEANT_EVENT_PROFILE = 32,
  CONTESTANT_DASHBOARD = 33,
  SHOP_DASHBOARD = 34,
  SEARCH_SCREEN = 35,
  ADDRESS = 36,
  CHANGE_ADDRESS = 37,
  CONTESTANT_VOTE_SCREEN = 38,
  PRODUCT_LISTING = 39,
  DISPLAY_PAGEANT_DESBOARD = 40,
  PCA_ADDRESS = 41,
  DIRECTORY_FILTER = 42,
  EXPERT_DASHBOARD_ALBUM = 43,
  EXPERT_ALBUM_VIEW = 44,
}

export enum PageantTypes {
  ACTIVE_PAGEANT = 'Active Pageants',
  INACTIVE_PAGEANT = 'Inactive Pageants',
}

export enum GALLERY_TYPE {
  CONTESTANT_GALLERY = 1,
  PAGEANT_GALLERY = 2,
  EVENT_GALLERY = 3,
  EXPERT_GALLERY = 3,
}

export enum EVENT_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PAST = 'past',
  ON_GOING = 'ongoing',
  UP_COMING = 'upcoming',
}
export enum GROUP {
  ADD_GROUP = 1,
  EDIT_GROUP = 2,
}

export enum DIRECTORY_ID {
  PAGEANT = 3,
  CONTESTANT = 13,
  AESTHETICS = 21,
  COACH = 7,
  DESIGNER = 5,
  EMCEE = 19,
  HAIR_AND_MAKEUP_ARTIST = 9,
  JUDGE = 20,
  PERSONAL_TRAINER = 12,
  PHOTOGRAPHER = 11,
  PRODUCTION = 15,
  RETAILER = 6,
}

export enum JUDGES_EMCEES {
  JUDGES = translations.JUDGES,
  EMCEES = translations.EMCEES,
}
export enum TODOS {
  MY_TODOS = translations.MY_TODOS,
  CONTESTANT_TODOS = translations.CONTESTANT_TODOS,
}

export enum VALIDATION {
  FRONETEND = 1,
  BACKEND = 2,
}

export enum PRIZE {
  ADD_PRIZE = 1,
  EDIT_PRIZE = 2,
}
export enum EXPERT_ALBUM_TYPE {
  EXTRA = 'extra',
  EXTRA_ = 'Extra',
  CONTESTANT_ALBUM = 'contestant-album',
  PAGEANT_ALBUM = 'pageant-album',
}
export enum ADD_TAG_OPTIONS {
  IMAGE_CATEGORY = 'Best describes the image',
  PHOTO_TAKEN_BY = 'Photo taken by',
  IMAGE_CATEGORY2 = 'Image category',
}
export enum TODO_CATEGORY {
  ALL = 'All Contestants',
  AGE_DEVISION = 'Age Division',
  CONTESTANTS = 'Contestant',
  GROUPS = 'Group',
}
export enum TODO_TYPE {
  PAPER_RESUMES = 1,
  ENTRY_FEES = 2,
  HEADSHOT = 3,
  TALENT_MUSIC = 4,
  AD_PAGES = 5,
  WARDROBE = 6,
  REHERSALS = 7,
  SCHEDULE = 8,
  OTHER = 9,
}
export enum PROFILE_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum SELL_COLOR {
  MULTI_COLOR = 'Multi',
}

export enum POST_STATUS {
  PUBLISHED = 1,
  DRAFT = 2,
  HIDDEN_BY_OWNER = 3,
  HIDDEN_BY_ADMIN = 4,
}

export enum FileSize {
  FiveMB = 5.12,
}

export enum SystemGeneratedPostTypes {
  NAME_Joined_PP = 'sign_up', //12
  CONTESTANT_started_a_GO_CROWN_ME = 'start_fundraiser', //13
  NAME_listed_PRODUCT_NAME_for_sale = 'sell_items_services', //14
  CONTESTANT_reserved_an_item_using_STYLE_CHECK = 'style_check', //15,
  CONTESTANT_is_competing_in_EVENT_NAME = 'admin_add_contestant_ongoing_upcoming_event', //16
  CONTESTANT_competed_in_EVENT_NAME = 'admin_add_contestant_past_event', //17
  EVENT_NAME_updated_their_result = 'add_update_event_results', //18
  CONTESTANT_won_EVENT_NAME = 'event_contestant_winner_by_admin', //20
  CONTESTANT_won_an_award_at_EVENT_NAME = 'admin_adds_award_results', //21,
  EXPERT_worked_with_CONTESTANT = 'experts_worked_with_contestant', //22
  EXPERT_worked_with_EVENT_NAME = 'experts_worked_with_event', //23,
  EVENT_won_award_title = 'event_wins_award_best_in_pageantry', // 24
  CONTESTANT_won_award_title = 'contestant_wins_award_best_in_pageantry', //25
  EXPERT_won_award_title = 'expert_wins_award_best_in_pageantry', //26
}

export enum RecordType {
  PRODUCT = 'Product',
}

export enum SUB_CATEGORY_VALUES {
  ENTRY_FEE = 'Entry Fees',
  EVENT = 'Tickets', // this was changed on client feedback so key value pair can miss match
}
export enum IS_MINOR_VALUES {
  YES = 'Yes',
  NO = 'No',
  SMALL_NO = 'no',
  SMALL_YES = 'yes',
}

export enum FORM_TYPE {
  ADD = 'Add',
  EDIT = 'Edit',
}
export enum ADDRESS_TYPE {
  SHIPPING = 'Shipping',
  BILLING = 'Billing',
}

export enum NOTIFICATION_TYPE {
  MESSAGE = 'new_message',
  TAGGED_IMAGE = 'tagged_images',
  LEAD = 'send_inquiry',
  REVIEW = 'my_review',
  REVIEW_REPLY = 'my_review_reply',
  CONVO_COMMENT = 'crown_convo',
  CONVO_NEW_COMMENT = 'new_convos',
  NEW_PRODUCT = 'new_product',
  SHOP_ORDER_RECEVIED = 'shop_order_received',
  SHOP_ORDER_PLACED = 'shop_order_placed',
  PAGEANT_TAG_CONVO = 'pageant_tag_convo',
  VOTE_PURCHASE = 'pca_notifications',
  EVENT_DESHBOARD = 'event_dashboard',
  PCA_EVENT_DESHBOARD = 'pca_event_dashboard',
  VOTE_DESHBOARD = 'vote_dashboard',
  PCA_DIRECTOR = 'pca_director',
  DIRECTOR_MEMBERSHIP = 'director_member',
  CONTESTANT_TO_DO = 'todo_push',
  CART_LEFT = "cart_left",
}

export enum PRODUCT_STATUS {
  IN_PROCESS = 0,
  SHIPPED = 1,
  DELIVERED = 2,
  DISPUTED = 3,
  RETURNED = 4,
  REFUNDED = 5,
  FAILED = 6,
}

export enum PRODUCT_STATUS_NAME {
  IN_PROCESS = 'In Process',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  DISPUTED = 'Disputed',
  REFUNDED = 'Refunded',
  RETURNED = 'Returned',
  FAILED = 'Failed',
}

export enum PAYMENT_FOR {
  BUY_BAG_PRODUCT = 1,
  BUY_VOTE_FOR_CONTESTANT = 2,
  BUY_PAGEANT_PLAN = 3,
  BUY_CONTESTANT_CLAIM_LEAD = 4,
}
export enum ORDER_FROM {
  BUYER = 'buyer',
  SELLER = 'seller',
}

export enum ATTRIBUTE_ID {
  ATTEND = 283,
  COMPETE = 284,
}

export enum ONN_OFF {
  OFF = 0,
  ON = 1,
}
export enum TAG_TYPE {
  EVENT_YEAR = 'Event Year',
  AGE_DIVISION = 'Age Divisions',
  BEST_DESCIBE_THE_IMAGE = 'Best Describes The Image',
  BEST_DESCIBE_THE_IMAGE_ = 'Image category',
  TAGGED_IMAGES = 'Tagged Photos',
}
export enum MSG_TYPE {
  ALL = 'all',
  SENT = 'sent',
  RECEIVED = 'received',
  UNREAD = 'unread',
  READ = 'read',
}
export enum FILE_TYPE {
  png = 'image/png',
  gif = 'image/gif',
  jpeg = 'image/jpeg',
  zip = 'application/zip',
  rar = 'application/rar',
  doc = 'application/msword',
  pdf = 'application/pdf',
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  mpeg = 'audio/mpeg',
}
export enum PROFILE_SELECTION_TYPE {
  ONE_OR_MORE = 'rd_profile_mulitple',
  ALL_USER = 'rd_profile_all',
}
export enum SLUG {
  PAGEANT = 'pageant',
  CONTESTANT = 'contestant',
  AESTHETICS = 'aesthetics',
  COACHE = 'coach',
  DESIGNER = 'designer',
  EMCEE = 'emcee',
  HAIR_MAKEUP_ARTIST = 'hair-makeup-artist',
  JUDGE = 'judge',
  PERSOANAL_TAINER = 'personal-trainer',
  PHOTOGRAPHER = 'photographer',
  PRODUCTION = 'production',
  RETAILER = 'retailer',
  COACH = 'coach',
}

export enum MESSAGE_MENU {
  DELETE = 1,
  MANANGE_NOTIFICATION = 2,
  CONTACT_US = 3,
  BLOCK = 4,
}
export enum FILE_EXT {
  png = 'png',
  gif = 'gif',
  jpeg = 'jpeg',
  zip = 'zip',
  rar = 'rar',
  doc = 'doc',
  pdf = 'pdf',
  docx = 'docx',
}

export enum TICKET_DATA {
  TICKET_ROLE_ID = '3',
  TICKET_TYPE_ENTRY = '284',
  TICKET_TYPE = '283',
  TICKET_CATEGORY = 'tickets',
  VIEW_ALL = 'No',
  ORDER_BY_TICKETS = 'Yes',
  TICKET_PAGEANT_ID = '16312',
}

export enum ADD_TO_WISHLIST {
  TRUE = '1',
  FALSE = '0',
}
export enum ASPECT_RATIO {
  REQUIRED = "0",
  NOT_REQUIRED = "1"
}

export enum IMAGES {
  noImage = 'https://tpp-tppmobil.agilecollab.com/images/front/common/no-image.jpg',
}