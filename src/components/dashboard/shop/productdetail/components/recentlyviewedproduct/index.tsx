import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../productdetails/styles';
import translations from '../../../../../../assets/translations';
import ProductsView from '../../../components/productview';
import {moderateScale} from '../../../../../utils/responsiveSize';
import {checkIsNull} from '../../../../../utils/validations';
import {color} from '../../../../../../assets/colorConstant';

const RecentlyViewedProduct = ({recentlyViewed}) => {
  return (
    checkIsNull(recentlyViewed) && (
      <View style={{...styles.continer, backgroundColor: color.S_GRAY_1}}>
        <Text style={styles.heading}>
          {translations.RECENTLY_VIEWED_PRODUCT}
        </Text>
        <View style={styles.listView}>
          <FlatList
            data={recentlyViewed}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={styles.cardStyle}>
                  <ProductsView
                    title={item?.unique_style_number}
                    imageUrl={item?.featured_image_path}
                    width={moderateScale(154)}
                    sellingPrice={item?.selling_price}
                    maxPrice={item?.price}
                    showMRP={true}
                    showFavIcon={false}
                    id={item?.id}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    )
  );
};

export default RecentlyViewedProduct;
