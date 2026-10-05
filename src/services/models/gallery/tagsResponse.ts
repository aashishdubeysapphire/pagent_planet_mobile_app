import {Base} from '../base';
import {TagData} from './tagsData';

export interface TagsResponse extends Base<ImageAllTags> {}

export interface ImageAllTags {
  tags: TagData[];
  is_my_profile_tagged: boolean;
}
