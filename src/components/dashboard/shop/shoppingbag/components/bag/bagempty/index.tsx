import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {styles} from './styles';
import {checkIsNull} from '../../../../../../utils/validations';
import translations from '../../../../../../../assets/translations';
import CommonProductLayout from '../../../../searchscreen/components/commonproductlayout';
import AppImages from '../../../../../../../assets/images/AppImages';
import CustomButton from '../../../../../../common/button';
import {useNavigation} from '@react-navigation/core';
import {USER_DESHBOARD_TAB} from '../../../../../../utils/enum';

var SELLER: 'seller';

const BagEmpty = ({recentlyViewed, topSellers}) => {
  const naigation = useNavigation();

  return (
    <View style={styles.bgColor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageView}>
          <AppImages.Common.EmptyCart />
          <Text style={styles.heading}>Hey! It Feels So Light!</Text>
          <Text style={styles.headingStyles}>{translations.NOTHING}</Text>
          <View style={styles.customButtonStyles}>
            <CustomButton
              label={translations.SHOP_PRODUCTS}
              smallHeight
              onPress={() => naigation.navigate(USER_DESHBOARD_TAB.SHOP)}
              inactive={true}
            />
          </View>
        </View>
        {checkIsNull(recentlyViewed) && (
          <CommonProductLayout
            heading={translations.RECENTLY_VIEWED_PRODUCTS}
            list={recentlyViewed}
            type={''}
          />
        )}

        {checkIsNull(topSellers) && (
          <CommonProductLayout
            heading={translations.SHOP_FROM_TOP_SELLERS}
            list={topSellers}
            type={SELLER}
          />
        )}
        <View style={styles.bottomEmptySpace}></View>
      </ScrollView>
    </View>
  );
};

export default BagEmpty;
