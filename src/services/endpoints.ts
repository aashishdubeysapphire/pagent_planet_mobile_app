export const API_VERSION = '/api/v1/';
export const PUBLIC_AUTH = 'oauth/token';
export const REGISTER = 'auth/signup';
export const OTP_VERIFICATION = 'auth/verify-otp';
export const RESEND_OTP = 'auth/resend-otp';
export const LOGIN = 'auth/login';
export const FORGOT = 'forgot-password';
export const PASSOWRD_CHANGE = 'change-password';
export const PASSOWRD_RESET = 'reset-password';
export const LOGOUT = 'auth/logout';
export const FORCEFULLY_LOGOUT = 'auth/logout?is_forcefully_logout=1';
export const CHECK_OLD_PASSWORD = 'check-old-password';
export const GET_CONTESTANT_DETAILS = 'get-contestant-details';
export const GET_MASTER_DATA = 'get-master-data';
export const GET_STATES = 'get-states?country_id=';
export const GET_CHAT_LIST = 'get-message-chat?parent_id=';
export const GET_BASIC_DETAILS = 'get-basic-details';
export const GET_BANK_DETAILS = 'get-bank-details?status=';
export const UPDATE_BASIC_DETAILS = 'update-basic-details';
export const UPLOADE_IMAGE = 'upload-image';
export const CREATE_PAGEANT = 'create-new-pageant';
export const UPDATE_CONTESTANT_DETAILS = 'update-contestant-fields';
export const UPDATE_CONTESTANT_EVENT = 'update-contestant';
export const CREATE_CONTESTANT_DETAILS = 'add-contestant';
export const GALLERY = 'my-galleries';
export const ADD_PRODUCT = 'add-to-cart';
export const GET_EVENT_LIST = 'get-contestant-events-list';
export const TRANSFER_REQUEST = 'update-transaction-status';
export const GET_EVENT_DATA =
  'get-contestant-event-details?pageant_contestant_id=';
export const SUB_GALLERY = 'fetch-images-by-album';
export const DELETE_EVENT = 'delete-contestant-from-event?pageant_id=';
export const REFERRAL_LEADERABOARD_EVENT = 'get-referal-leaderboard-event';
export const GET_PAGEANT_WON = 'get-pageants-won';
export const GET_AWARDS_WON_LIST = 'get-won-awards-list';
export const GET_CURRENT_PAGEANTS = 'get-current-pageants';
export const GET_GROUP_LIST = 'get-event-groups?event_id=';
export const REMOVE_GROUP = 'remove-pageant-group?group_id=';
export const GET_PAST_PAGEANTS = 'get-past-pageants';
export const GET_OUT_OF_STOCK = 'get-out-of-stock-products';
export const MY_LEAD_LIST = 'my-lead-list?profile_type=pageant&profile_id=';
export const CLAIM_LEAD = 'claim-lead';
export const GET_CONTESTANT_AWARDS = 'get-contestant-awards?contestant_id=';
export const GET_PAGEANT_AWARDS = 'pageants/get-bip-awards?pageant_id=';
export const GET_EVENT_AWARDS = 'events/get-bip-awards?event_id=';
export const EVENT_CONTESTANT_LIST = 'get-referal-leaderboard-detail?event_id=';
export const GET_CONTESTANT_ASSOCIATE_BUSINESS =
  'get-contestant-associated-businesses?contestant_id=';
export const GET_PAGEANT_NAME_LIST = 'get-pageants-list';
export const GET_PAGEANT_TITLE_LIST =
  'get-pageant-system-title-suggestion?pageant_system_title=';
export const GET_COUNTRY = 'get-countries';
export const GET_EVENT_LIST_BY_NAME_AND_YEAR = 'get-events-by-pageant-year';
export const GET_AGE_DEVISION_BY_PAGEANT = 'get-age-divisions-by-pageant';
export const UPDATE_EVENT_DETAILS = 'update-contestant-event';
export const ADD_EVENT_DETAILS = 'add-contestant-event';
export const ADD_GALLERY_IMAGES = 'add-gallery-images';
export const SAVE_MOVED_IMAGES = 'save-moved-images';
export const UPDATE_PAGEANT = 'update-pageant';
export const GET_AGE_DEVISION = 'get-age-divisions';
export const SAVE_PAGEANT_CREATE_REQUEST = 'save-pageant-create-request';

export const GET_WISHLIST = 'get-wishlist';
export const GET_CONTESTENT_UPCOMING_EVENT =
  'get-contestant-upcoming-events?page=';
export const SAVE_FEATURED_IMAGE = 'save-featured-image';
export const DELETE_ALBUM_IMAGE = 'delete-gallery-image?image_id=';
export const GET_TODO_DATA = 'get-to-do-list-for-contestants?event_id=';
export const UPLOAD_IMAGE_DOCUMENT = 'upload-to-do-documents';
export const DELETE_IMAGE_DOCUMENT = 'remove-to-do-document?to_do_upload_id=';
export const MARK_TODO_DONE = 'mark-to-do-complete';
export const DELETE_TAGS = 'remove-tags';
export const GET_PROFILE_BY_TAG_TYPE = 'get-profiles-by-tag-type';
export const SAVE_TAGS = 'save-tags';
export const GET_TAG_TYPE = 'get-tag-types-list';
export const GET_TAG_OF_IMAGE = 'fetch-tags-by-image?image_id=';
export const GET_TODO_UPLOADED_FILES =
  'get-to-do-uploaded-documents-list?event_id=';
export const GET_TODO_UPLOADED_FILES_LIST =
  'get-to-do-uploaded-files?event_id=';
export const UPDATE_TODO_DOCS = 'update-to-do-documents';
export const GET_PAGEANT_AND_EVENT_DETAIL = 'get-pageant-by-id?pageant_id=';
export const GET_PAGEANT_PLAN = 'get-memberhsip-plans?profile_type=';
export const GET_PAGEANT_SYSTEM = 'get-pageant-systems';
export const REARRANGE_ALBUM = 'save-albums-sorting';
export const PURCHASE_REQUEST = 'request-to-upgrade-plan';
export const UPDATE_PAGENT_RULES = 'update-pageant-rules';
export const GET_TESTIMONIAL_DATA = 'get-pca-testimonials-data';
export const UPDATE_PAGENT_DESCRIPTION = 'update-pageant-description';
export const GET_PAGEANT_RULES_ASSOCIATED_DATA =
  'get-pageant-rules-associated-data?pageant_id=';
export const CREATE_NEW_PAGEANT_EVENT = 'create-new-event';
export const UPDATE_PAGENAT_EVENT = 'update-event';
export const GET_EVENT_CONTESTANT_LIST = 'get-event-contestants-list';
export const GET_EVENT_PUBLIC_PROFILE_CONTESTANT_LIST =
  'events/get-contestants-list-with-countdown';
export const ADD_EVENT_RESULTS = 'add-event-results';
export const ADD_EVENT_AWARD = 'add-event-awards';
export const GET_EVENT_RESULT_LIST = 'get-event-results-list';
export const GET_EVENT_AWARDS_LIST = 'get-event-awards-list';
export const GET_CONTESTANT_LIST = 'get-contestant-list?search=';
export const ADD_EVENT_COMPETITOTR = 'add-event-competitor';
export const CREATE_CONTESTANT_WORKWITH_ALBUM_EXPERT =
  'create-contestant-worked-album';
export const CREATE_PAGAENT_WORKWITH_ALBUM_EXPERT =
  'create-pageant-worked-album';
export const EDIT_EVENT_COMPETITOTR = 'edit-event-competitor';
export const GET_ALL_JUDGES = 'get-all-judges-list';
export const GET_ALL_EMCEES = 'get-all-emcees-list';
export const GET_ALL_REMAINING_CONTESTANTS =
  'get-remaining-group-contestants-list?group_id=';
export const CREATE_NEW_JUDGE = 'create-new-judge';
export const CREATE_NEW_EMCEES = 'create-new-emcee';
export const CREATE_NEW_GROUP = 'create-new-group';
export const EDIT_GROUP = 'update-pageant-group';
export const ADD_JUDGE_TO_EVENT = 'add-judges-to-event';
export const ADD_EMCEES_TO_EVENT = 'add-emcees-to-event';
export const GET_EVENT_JUDGES_LIST = 'get-event-judges-list?event_id=';
export const GET_EVENT_EMCEES_LIST = 'get-event-emcees-list?event_id=';
export const DELETE_EVENT_CONTESTANT = 'remove-contestant-from-event';
export const GET_AGE_DIVISION_BY_EVENTS =
  'get-age-divisions-by-event-have-contestants?event_id=';
export const REMOVE_JUDGES_FORM_EVENT = 'remove-judges-from-event';
export const REMOVE_EMCEES_FORM_EVENT = 'remove-emcees-from-event';
export const GET_GROUP_CONTESTANT_ADDED_LIST =
  'get-group-contestants?group_id=';
export const GET_REMAINING_EVENT_JUDGE =
  'get-remaining-event-judges-list?event_id=';
export const GET_REMAINING_EVENT_EMCEE =
  'get-remaining-event-emcees-list?event_id=';
export const GET_EVENT_REVIEWS = 'get-event-reviews';
export const POST_REPLY_TO_REVIEWS = 'reply-to-review';
export const ADD_CONTESTANTS_TO_GROUP = 'add-contestant-to-groups';
export const REMOVE_CONTESTANT_FROM_GROUP = 'remove-contestants-from-group';
export const GET_EVENT_BIP_AWARDS = 'get-event-bip-awards';
export const GET_ACTIVE_EVENT_BY_PAGEANT =
  'get-events-by-pageant-have-phase-of-competition';
export const GET_PRIZES_LIST = 'pageant-prizes/list';
export const GET_PRIZES_DETAILS = 'get-prize-details';
export const DELETE_PRIZE_FROM_PCA = 'pageant-prizes/delete';
export const CREATE_EVENT_PRIZE = 'pageant-prizes/store';
export const EDIT_EVENT_PRIZE = 'pageant-prizes/update';
export const GET_EVENT_PCA_VOTE_LIST = 'get-event-vote-list';
export const GET_PCA_TIMEZONE_DATA = 'get-pca-timezone-data';
export const UPDATE_PCA = 'update-people-choice-award';
export const DIRECTORY = 'directory/category?slug=';
export const SHOP_PRODUCT_FILTER = 'get-shop-products';
export const APP_VERSION = 'app-version';
export const DIRECTORY_FILTTER_BY_TYPE = 'directory/category-type';
export const GET_PRODUCT_FILTTER_BY_CATEGORY = 'get-shop-category-filters';
export const GET_CONTESTANT_SUBMISSION_TODOS =
  'event-director/get-contestant-submission-todos';
export const GET_CONTESTANT_TODOS_LIST =
  'event-director/my-contestant-to-do-list?event_id=';
export const GET_DIRECTOR_TODOS_LIST = 'event-director/my-to-do-list?event_id=';
export const TYPE_OF_TO_DO_LIST = 'to-do/get-type-category';
export const GET_EVENT_ASSOCIATED_DATA_FOR_TODO =
  'event-director/get-event-associated-data-for-to-do?event_id=';
export const GET_AGE_DIVISIONS_BY_EVENTS = 'get-age-divisions-by-event-todos';
export const GET_COMPLETED_CONTESTANT_LIST =
  'get-completed-contestant-list-by-pageant';
export const DELETE_TODO = 'event-director/delete-to-do?to_do_id=';
export const GET_TODO_DETILS = 'event-director/get-to-do-details?to_do_id=';
export const CREATE_TODO = 'event-director/create-to-do';
export const UPDTE_TODO = 'event-director/update-to-do';
export const GET_PENDING_CONTESTANT_LIST =
  'event-director/get-to-do-pending-contestants-list';
export const GET_PUBLIC_PROFILE = 'contestants/get-public-details';
export const GET_EXPERT_PUBLIC_PROFILE =
  'business-profiles/get-public-details?business_profile_id=';
export const GET_EXPERT_ALBUM =
  'get-expert-dashboard-albums?business_profile_id=';
export const GET_CONTESTANT_PUBLIC_PROFILE_GALLERY =
  'contestants/get-public-albums?contestant_id=';
export const GET_PUBLIC_PROFILE_ROLE = 'get-user-roles?user_id=';
export const GET_PUBLIC_PROFILE_SUB_GALLERY = 'contestants/fetch-album-images';
export const NOMINATE_PROFILE = 'nominate-profile';
export const CLAIM_PROFILE = 'claim-profile';
export const BUSINESS_PROFILE_GET_REVIEWS =
  'business-profiles/get-reviews?business_profile_id=';
export const WRITE_A_REVIEW = 'write-a-review';
export const DELETE_REVIEW = 'delete-review';
export const GET_REVIEW_DETAILS = 'get-review-details?review_id=';
export const UPDATE_REVIEW = 'update-review';
export const PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH =
  'business-profiles/fetch-contestants-worked-with-albums';
export const PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_FILTER =
  'business-profiles/fetch-contestants-worked-with-albums-filters?business_profile_id=';
export const PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_FILTER =
  'business-profiles/fetch-pageants-worked-with-albums-filters?business_profile_id=';
export const PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_ALBUM =
  'business-profiles/fetch-contestant-worked-with-album-images';
export const PUBLIC_PROFILE_CONTESTANT_VOTE_DETAIL = 'pca/vote?event_id=';
export const PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH =
  'business-profiles/fetch-pageants-worked-with-albums?business_profile_id=';
export const PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_ALBUM_IMAGES =
  'business-profiles/fetch-pageant-worked-with-album-images';
export const PUBLIC_PROFILE_EXPERT_EXTRA_IMAGES =
  'business-profiles/fetch-extra-album-images?business_profile_id=';
export const PUBLIC_PROFILE_CONTESTANT_ALBUM_IMAGE_FILTER =
  'contestants/fetch-album-images-filters';
export const GET_EXPERT_VIEWAL_ALL_AWARDS =
  'business-profiles/get-bip-awards?business_profile_id=';
export const GET_UPDATED_USERDATA = 'auth/get-user-updated-info';
export const PAGEANT_PUBLIC_PROFILE = 'pageants/get-public-details?pageant_id=';
export const PAGEANT_PUBLIC_PROFILE_EVENT_LIST =
  'pageants/get-child-events?pageant_id=';
export const EVENT_PUBLIC_PROFILE_SPONSOR_LIST =
  'events/get-all-sponsors?event_id=';
export const PAGEANT_PUBLIC_PROFILE_CROWN_CONVO_LIST =
  'pageants/get-all-convos?pageant_id=';
export const PAGEANT_PUBLIC_PROFILE_STAFF =
  'pageants/get-staff-list?pageant_id=';
export const UPDATE_FUN_FACT = 'update-contestant-fun-facts';
export const PAGEANT_EVENT_PUBLIC_DETAIL =
  'events/get-public-details?event_id=';
export const PAGEANT_EVENT_PUBLIC_SLUG_DETAIL =
  'events/get-public-details?slug=';
export const GET_INACTIVE_CONTESTANT_LIST =
  'contestants/get-inactive-contestant-profiles?contestant_name=';
export const PAGEANT_PUBLIC_PROFILE_ALL_ALBUM =
  'pageants/get-all-albums?pageant_id=';
export const PAGEANT_EVENT_PUBLIC_ALL_ALBUM = 'events/get-all-albums?event_id=';
export const CROWN_CONVO_POSTED_LIST =
  'crown-convos/get-posted-convos-list?post_type=';
export const CONVO_POST_LIKED_USER_LIST =
  'crown-convos/get-post-liked-users-list?post_id=';
export const CROWN_CONVO_MY_POSTED_LIST =
  'crown-convos/get-my-community-post-list?user_id=';
export const CROWN_CONVO_PROFILE_TYPE_LIST =
  'crown-convos/get-posted-convos-list?type=';
export const EVENT_WRITE_A_REVIEW = 'events/write-a-review';
export const GET_REPORT_CATEGORY_LIST =
  'crown-convos/get-report-categories-list';
export const REPORT_POST = 'crown-convos/create-report-on-post';
export const LIKE_DISLIKE_POST = 'crown-convos/like-dislike-post';
export const DELETE_CONVO_POST = 'crown-convos/delete-post';
export const HIDE_CONVO_POST = 'crown-convos/hide-post';
export const EVENT_PUBLIC_PROFILE_CROWN_CONVO_LIST =
  'events/get-all-convos?event_id=';
export const GET_CROWN_CONVO_CATEGORY_LIST =
  'crown-convos/get-post-categories-list';
export const GET_POST_DETAILS_FOR_COMMENT =
  'crown-convos/get-post-detail-for-comment?post_id=';
export const GET_POST_COMMENT_LIST =
  'crown-convos/get-post-comment-list?post_id=';
export const ADD_NEW_COMMENT = 'crown-convos/save-comment';
export const SAVE_CROWN_CONVO_POST = 'crown-convos/save-post';
export const DELETE_COMMENT = 'crown-convos/delete-comment';
export const EDIT_COMMENT = 'crown-convos/update-comment';
export const GET_COMMENT_REPLIES_LIST =
  'crown-convos/get-comment-reply-list?comment_id=';
export const ADD_NEW_REPLY = 'crown-convos/save-reply';
export const DELETE_REPLY = 'crown-convos/delete-reply';
export const CHECK_PAGEANT_EXISTENCE =
  'pageants/check-pageant-existance?pageant_title=';
export const EDIT_REPLY = 'crown-convos/update-reply';
export const GET_PAGEANT_PUBLIC_PROFILE_SUB_GALLERY =
  'pageants/fetch-album-images?gallery_id=';
export const GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY =
  'events/fetch-album-images?gallery_id=';
export const EDIT_CROWN_CONVO = 'crown-convos/get-post-detail?post_id=';
export const UPDATE_CROWN_CONVO_POST = 'crown-convos/update-post';
export const GET_SELL_COLOR = 'get-colors';
export const GET_SELL_ITEMS_CATEGORIES = 'get-categories';
export const GET_EXPERT_ROLES_CATEGORIES = 'get-expert-roles';
export const GET_MY_PRODUCTS_LIST = 'my-products';
export const DELETE_MY_PRODUCT = 'delete-product';
export const MARK_AS_SOLD_MY_PRODUCT = 'mark-as-sold-product';
export const UNPUBLISH_MY_PRODUCT = 'unpublish-product';
export const GET_LOGEDIN_USER_ROLES_LIST = 'get-loggedin-user-roles-list';
export const GET_CATEGORY_FIELDS = 'get-category-fields';
export const GET_PRODUCT_DETAIL = 'get-product-details';
export const GET_PROFILE_LIST = 'get-profile-list';
export const ADD_EDIT_PRODUCT = 'add-product';
export const PRODUCT_FEATURE_ADDITIONAL_IMAGE_UPLOAD = 'add-product-images';
export const GET_UPCOMING_EVENT_LIST = 'get-upcoming-event-list?pageant_id=';
export const GET_SHOP_LANDING_DETAILS = 'shop-landing-detail';
export const ADD_PRODUCT_AS_FAVORITE = 'add-favorite';
export const SIMILAR_PRODUCT = 'get-similar-products';
export const LIKE_PRODUCT = 'like-product';
export const GET_RECENT_SEARCHES = 'get-recent-searches';
export const GET_SEARCHED_SUGGESTIONS = 'get-product-search-suggestion?str=';

export const PRODUCT_NEAR_YOU = 'product-near-you';
export const GET_RECENTLY_VIEWED = 'get-recently-viewed';
export const VIEW_PRODUCTS = 'view-cart';
export const CART_CHECK_PRODUCTS = 'view-updated-cart';
export const EDIT_PRODUCTS = 'edit-cart';
export const DELETE_PRODUCTS = 'delete-cart-item';
export const SEND_INQUIRY = 'directory/send-inquiry';
export const GET_ADDRESS_LIST = 'get-address-list';
export const ADD_EDIT_ADDRESS = 'add-address';
export const GET_ADDRESS_DETILS = 'get-address-detail?address_id=';
export const DELETE_ADDRESS = 'delete-address';
export const GET_CART_COUNT = 'get-cart-item-count';
export const GET_PRODUCT_UNAVAILABILITY = 'get-product-unavailable-in-country';
export const GET_INFUSION_TOKON = 'get-infusion-access-token';
export const GET_TICKET_CONTESTANT = 'get-ticket-contestants?order_id=';
export const SUBMIT_CONTESTANT_SUPPORT = 'submit-contestant-support';
export const CREATE_ORDER = 'create-order-braintree';
export const UPDATE_ORDER_BY_IS_INVOICE = 'update-order-by-is-invoice';
export const IS_PCA_ACTIVE = 'is-pca-active?event_id=';
export const GET_PAGEANT_TICKET_TYPE_PRODUCTS =
  'get-pageant-ticket-type-products';
export const GET_PAGEANT_SHOP_PRODUCTS = 'get-pageant-shop-products';
export const GET_MY_ORDERS_LIST = 'get-my-order';
export const GET_RECEIVED_ORDERS_LIST = 'get-received-orders';
export const GET_DISPUTE_REASON = 'get-dispute-reason';
export const RAISE_DISPUTE_ON_PRODUCT = 'raise-dispute';
export const GET_ORDER_ITEM_DETAILS = 'get-order-item-details?order_item_id=';
export const GET_SHIPPING_SERVICES_LIST = 'get-shipping-service-list';
export const ADD_SHIPPING_DETAILS = 'add-shipping-details';
export const GET_DROPDOWN_VALUES = 'get-dropdown-values';
export const SAVE_BANK_DETAILS = 'save-bank-details';
export const UPDATE_SHIPPING_STATUS = 'update-order-status';
export const MARK_AS_DEFAULT_ADDRESS = 'mark-as-default-address';
export const DELETE_ACCOUNT = 'delete-user';
export const MY_CONTACT_LIST = 'my-contact-list';
export const MY_LEAD_LIST_FILTERS = 'my-lead-list-filters';
export const VIEW_LEADS = 'view-lead?id=';
export const UPDATE_EVENT_SHOW_HIDE_EVENT = 'update-event-show-hide-status';
export const MANAGE_NOTIFICATION_STATUS = 'manage-notifications-status';
export const UPDATE_NOTIFICATION_SETTING = 'update-notification-settings?key=';
export const MESSAGE_LIST = 'message-list?msg_type=';
export const BLOCKED_LIST = 'get-blocked-user-list?search=';
export const GET_NOTIFICATION_TYPE = 'get-notification-types';
export const GET_NOTIFICATION_LIST = 'get-notifications?type=';
export const DELETE_THREAD = 'delete-thread';
export const COMPOSE_MESSAGE = 'compose-message';
export const PAGEANT_EVENT_FILTERS =
  'pageants/fetch-album-images-filters?pageant_id=';
export const BLOCK_USER = 'add-block-user';
export const CEHCK_CARD = 'validate-credit-card';

export const GET_MASTER_DATA_BY_NAME = 'get-master-data-by-name?name=';
export const ADD_EXPERT_PROFILE = 'add-expert-profile';
export const GET_STATES_LIST = 'get-states-by-countries?country_id=';
export const GET_EXPERT_PROFILE_DETAILS =
  'get-expert-profile-details?business_profile_id=';
export const EXPERT_CONTESTANT_WORK_WITH_VIEW_ALL_ALBUM =
  'get-expert-contestant-worked-with-albums-view-all';
export const EXPERT_PAGEANT_WORK_WITH_VIEW_ALL_ALBUM =
  'get-expert-pageant-worked-with-albums-view-all';
export const EXPERT_EXTRA_VIEW_ALL_ALBUM = 'get-expert-extra-album-view-all';
export const EXPERT_UPLOAD_IMAGE_IN_ALBUM = 'upload-expert-album-image';
export const EXPERT_REMOVE_ALBUM = 'remove-expert-album';
export const GET_BRAINTREE_TOKEN = 'get-braintree-token';
