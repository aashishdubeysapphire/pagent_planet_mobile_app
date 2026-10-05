import {LocalImage} from '../../localimage';
import {MasterRecordsItem} from '../../masterData';

interface CatgoryTxt {
  category_txt: string;
}

export interface VariableField {
  id?: number;
  name?: string;
  hex_code?: string;
  image?: string;
  ab?: string;
  isInactive?: number;
  imageUrlError?: string;
  productSizeError?: string;
  imageName?: string;
  localImage?: LocalImage;
  productVariantSizeList?: ProductVariantSizeList[];
  values?: MasterRecordsItem[];
  label?: string;
}

export interface ProductVariantSizeList {
  product_id?: number;
  selling_price?: string;
  size?: Size;
  id?: number;
  inventory?: string;
  inStockError?: string;
  price?: string;
  priceError?: string;
  isDiffPrice?: boolean;
  isCompleted?: boolean;
  isActive?: boolean;
}

export interface Size {
  attribute_id?: number;
  id?: number;
  name?: any;
}

export interface SellAttributes {
  catgoryTxt?: CatgoryTxt;
  variable_fields?: VariableField[];
  subcategory?: VariableField[];
  non_variable_fields?: VariableField[];
}

export interface SellAttributeData {
  result: SellAttributes;
}

export interface CatgoryFields {
  success: boolean;
  status_code: number;
  message: string;
  data: SellAttributeData;
}
