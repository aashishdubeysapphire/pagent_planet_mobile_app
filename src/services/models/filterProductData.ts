import {Base} from './base';
import {ProductsData} from './shop/shopLandingDetails';

export interface FilterProductData extends Base<DataFilter> {}

export interface DataFilter {
  data: ProductsData[];
}
