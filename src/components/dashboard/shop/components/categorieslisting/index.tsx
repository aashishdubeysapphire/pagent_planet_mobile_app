import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {SCREEN} from '../../../../../root/screenname';
import {Category} from '../../../../../services/models/shop/shopLandingDetails';
import {internetState} from '../../../../common/commonalert';
import FastImageView from '../../../../common/fastimageview';
import {moderateScale} from '../../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  categoryList?: Category;
  columns?: number;
  verticalPadding: number;
  bgColor: string;
}

const CategoriesListing = ({
  categoryList,
  columns,
  verticalPadding,
  bgColor,
}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const onPressCategory = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.FILTER_PRODUCT, {
        category: item,
        displayKey: item.id + new Date().getMilliseconds() + '',
      });
    }
  };

  return (
    <View
      style={{
        ...styles.categoriesView,
        paddingVertical: verticalPadding,
        backgroundColor: bgColor,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <FlatList
          data={categoryList}
          scrollEnabled={false}
          contentContainerStyle={{
            alignSelf: 'flex-start',
          }}
          numColumns={columns}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.circularView}
              onPress={() => onPressCategory(item)}>
              <FastImageView
                imageUrl={item?.image_path}
                width={moderateScale(48)}
                height={moderateScale(48)}
                isCircle
                borderColor={color.TRANSPARENT}
                borderRadius={moderateScale(24)}
              />
              <Text style={styles.categoryLabel} numberOfLines={2}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default CategoriesListing;
