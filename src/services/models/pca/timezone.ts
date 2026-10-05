interface Timezone {
  id: number;
  abbr: string;
  text: string;
  utc: string;
  offset: number;
  value: string;
}

export interface TimeZoneRes {
  timezone: Timezone[];
}
