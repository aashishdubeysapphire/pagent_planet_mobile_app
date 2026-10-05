
export interface UnavailableProducts {
  id: number
  name: string
  image: string
  attributes: Attributes
}

export interface Attributes {
  resultSet: ResultSet[]
  imageArr: number[]
}

export interface ResultSet {
  id: number
  name: string
  hex_code: string
  productVariantSizeList: ProductVariantSizeList[]
  image?: string
}

export interface ProductVariantSizeList {
  product_id: number
  isDiffPrice: boolean
  inventory: number
  price: number
  selling_price: number
  id: number
  size: Size
}

export interface Size {
  attribute_id: number
  id: number
  name: number
}
