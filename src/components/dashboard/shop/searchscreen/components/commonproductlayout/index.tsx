import React from 'react';
import {View, Text, FlatList} from 'react-native';
import translations from '../../../../../../assets/translations';
import {
  RecentlyViewed,
  TopSellers,
} from '../../../../../../services/models/shop/recentSearches';
import {moderateScale} from '../../../../../utils/responsiveSize';
import ProductsView from '../../../components/productview';
import TopSellerView from '../../../components/topsellerview';
import {styles} from './styles';

var SELLER: 'seller';

interface Props {
  type: string;
  heading: string;
  list: TopSellers[] | RecentlyViewed[];
}

const CommonProductLayout = ({type, heading, list}: Props) => {
  const isFavProduct=(items : any)=>{
    if(heading === translations.YOUR_FAV_PRODUCTS){
       if(items?.is_favourite?.length > 0){
        return true
       }else{
        return false
       }
    }else{
      if(items?.is_favorite === 1){
        return true
       }else{
        return false
       }
    }
  }

  return (
    <View style={styles.productContainer}>
      <Text style={styles.headingStyles}>{heading}</Text>
      <FlatList
        data={list}
        keyExtractor={item => item?.id?.toString()}
        horizontal={type === SELLER ? false : true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) =>
          type === SELLER ? (
         
            <TopSellerView
              title={item?.name}
              ratings={item?.review_average === null ? 0 : item?.review_average}
              image={item?.image}
              noOfProducts={item?.count}
              item={item}
            />
          ) : (
            <ProductsView
              id={item?.id}
              title={item?.unique_style_number}
              sellingPrice={item?.selling_price}
              imageUrl={item?.featured_image_path}
              width={moderateScale(154)}
              marginBottomValue={0}
              marginRightValue={moderateScale(12)}
              showFavIcon={true}
              showMRP={true}
              maxPrice={item?.price}
              isFav={isFavProduct(item)}
            />
          )
        }
      />
    </View>
  );
};

export default CommonProductLayout;
