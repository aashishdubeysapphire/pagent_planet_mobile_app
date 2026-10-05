import {AssociateBusinessResponse} from '../associatebusiness/associateBusinessResponse';
import {Base} from '../base';
import {GalleryItem} from '../gallery/galleryItem';
import {ActivePcaEvent} from '../pca/activePcaEvent';
import {LinkedAccounts} from '../user/personalDetails';
import {Award} from './award';
import {Contestant} from './contestant';
import {Pageant} from './pageant';
import {PageantData} from './pageantData';

export interface PageantResult extends Base<PageantDataResponse> {}

export interface PageantDataResponse {
  contestant: Contestant;
  awards: Awards;
  pageant_details: PageantDetails;
  associated_business: AssociateBusinessResponse;
  activePcaEvents: ActivePcaEvent[];
  winningNominationsList: any[];
  activeNominationsList: ActiveNominationsList[];
  contestantGalleries: ContestantGalleries;
  extraContestantGalleries: ExtraContestantGalleries;
  is_message_button_disable: boolean;
  is_compete_button_display: boolean;
  is_claim_button_display: boolean;
  socialMedias: LinkedAccounts;
  galleryList: GalleryItem[];
  contesantsWorkedAlbums: GalleryItem[];
  contestantsWorkedAlbums: GalleryItem[];
  pageantsWorkedAlbumsCount: number;
  contesantsWorkedAlbumsCount: number;
  extraAlbumsCount: number;
  pageantsWorkedAlbums: GalleryItem[];
  expertAlbums: GalleryItem[];
  images: GalleryItem[];
  extraImages: ExtraImage[];
  productOnSale: number;
  productOnHire: number;
  businessProfile: Contestant;
  wonNominationsList: any[];
  activeNominationData: ActiveNominationsList[];
  contestantsWorkedAlbumsCount: number;
  is_fun_facts_empty: number;
}
export interface ExtraImage {
  image_id: number;
  gallery_record_id: number;
  imageAlbumId: number;
  imageAlbumType: string;
  recordImageTagId: string;
  general_album_id: number;
  imageSrc: string;
}
export interface ActiveNominationsList {
  id: number;
  title: string;
  business_type: number;
  year: number;
  status: string;
  leading_business: number;
  total_nominations: number;
  winning_business: any;
  created_by: number;
  start_date_time: string;
  end_date_time: string;
  year_id: number;
  speciality_pageant: string;
  gender: string;
  tag_type: number;
  is_international_pageant: number;
  guest_judgement_end_date: any;
  published_at: any;
  is_published: number;
  must_have_at_least_one_image: number;
  age_from: number;
  age_to: number;
  must_have_worked_with_contestant_in_year: number;
  must_have_worked_with_event_in_year: number;
  must_have_picture_tagged_to_phase_of_competition: number;
  is_notification_sent: number;
  mailer_image_name: string;
  is_married: string;
  have_kids: string;
  nomination_age_division_list: any[];
  nomination_phase_of_competition_list: NominationPhaseOfCompetitionList[];
  nomination_country_list: NominationCountryList[];
  nomination_state_list: any[];
  already_nominated: number;
  speciality: Speciality;
}

export interface Speciality {
  created_at: string;
  id: number;
  master_record_id: number;
  master_record_type_id: number;
  nomination_id: number;
  updated_at: string;
}

export interface NominationPhaseOfCompetitionList {
  id: number;
  nomination_id: number;
  competition_phase_id: number;
}

export interface NominationCountryList {
  id: number;
  nomination_id: number;
  country_id: number;
}

export interface ContestantGalleries {
  current_page: number;
  data: GalleryItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface ExtraContestantGalleries {
  current_page: number;
  data: GalleryItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Awards {
  current_page: number;
  data: Award[];
  first_page_url: string;
  from: any;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: any;
  total: number;
}

export interface PageantDetails {
  id: never;
  event_result_count: number;
  pageantsWon: PageantsWon;
  currentPageants: CurrentPageants;
  pastPageants: CurrentPageants;
  awardsWon: AwardsWon[];
}

export interface PageantsWon {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: any;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: any;
  total: number;
}

export interface CurrentPageants {
  current_page: number;
  data: PageantData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface AwardsWon {
  id: number;
  pageant_id: number;
  age_division_id: number;
  winner_id: any;
  first_runner_up_id: any;
  second_runner_up_id: any;
  type?: number;
  contestant_id: number;
  additional_title?: number;
  title_awarded_text: any;
  pageant_contestant_id: number;
  contestant_profile?: Contestant;
  pageant: Pageant;
  award_id?: number;
  award?: Award;
}
