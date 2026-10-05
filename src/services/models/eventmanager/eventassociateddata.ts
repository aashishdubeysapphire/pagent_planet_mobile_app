interface PageantAgeDivisionList {
  id: number;
  name: string;
  slug: string;
  age_from?: any;
  age_to?: any;
  created_by_user_id: number;
  updated_by_user_id: number;
  status: number;
}

interface PageantContestantList {
  pageant_id: number;
  id: number;
  name: string;
  slug: string;
  image: string;
  status: string;
}

interface EventGroupList {
  id: number;
  event_id: number;
  name: string;
  description?: any;
  status: number;
  created_at: Date;
  updated_at: Date;
  group_contestants_count: number;
}

export interface EventAssociatedData {
  pageantAgeDivisionList: PageantAgeDivisionList[];
  pageantContestantList: PageantContestantList[];
  eventGroupList: EventGroupList[];
}
