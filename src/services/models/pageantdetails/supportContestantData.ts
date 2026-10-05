import {Contestant} from './contestant';

export interface SupportContestantData {
  event: Event;
  contestants: Contestant[];
  quantity: number;
  order_item_id: number;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
}
