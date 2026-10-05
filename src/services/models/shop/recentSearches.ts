export interface RecentSearchedData {
    recentlyViewed: RecentlyViewed[]
    recentSearch: RecentSearch[]
    favoriteProducts: RecentlyViewed[]
    topSellers: TopSellers[]
  }
  
  export interface RecentlyViewed {
    id: number
    featured_image_path: string
    featured_image: string
    slug: string
    unique_style_number: string
    selling_price: number
    price: number;
    is_favorite : number | any;
  }
  
  export interface RecentSearch {
    id: number
    user_id: number
    searched_text: string
  }

  export interface TopSellers {
    business_role_id: number
    count: number
    id: number
    image: string
    name: string
    review_average: number
    review_count: number
    slug: string
    user_id: number
  }
