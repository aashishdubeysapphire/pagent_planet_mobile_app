import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import translations from '../../../../../assets/translations';
import {SCREEN} from '../../../../../root/screenname';
import {Param} from '../../../../../services/constants';
import {TopSellers} from '../../../../../services/models/shop/recentSearches';
import {internetState} from '../../../../common/commonalert';
import CustomRatings from '../../../../common/customratings';
import FastImageView from '../../../../common/fastimageview';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  title?: string;
  ratings?: number;
  noOfProducts: number;
  image: string;
  item: TopSellers;
}

const TopSellerView = ({title, ratings, noOfProducts, image, item}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const onPressCategory = (productItem: TopSellers) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.SELLER_PRODUCTS, {
        name: productItem?.name,
        param:
          Param.PROFILE_ID_ +
          productItem?.id +
          Param.ROLE_ID +
          productItem?.business_role_id,
        uniqueKey: new Date().getMilliseconds(),
        backToSearch: true,
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.rectangularView}
      onPress={() => onPressCategory(item)}>
      <View>
        <FastImageView
          imageUrl={image}
          width={moderateScaleVertical(60)}
          height={moderateScaleVertical(60)}
          borderRadius={moderateScaleVertical(60)}
          isCircle
        />
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {title}
        </Text>
        {ratings !== 0 ? (
          <CustomRatings
            ratingsValue={ratings}
            showRatingsReviewsCount={false}
            enableTouch={false}
            size={moderateScale(13)}
          />
        ) : null}
      </View>
      <View style={styles.viewProductArea}>
        <TouchableOpacity onPress={() => onPressCategory(item)}>
          <Text style={styles.viewProductLabel} numberOfLines={1}>
            {translations.VIEW_PRODUCTS}
          </Text>
        </TouchableOpacity>
        <Text style={styles.noOfProduct} numberOfLines={1}>
          {noOfProducts}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopSellerView;
