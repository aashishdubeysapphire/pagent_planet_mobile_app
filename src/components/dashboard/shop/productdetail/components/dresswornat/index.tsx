import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../productdetails/styles';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {styles as dressStyles} from './styles';
import {SCREEN} from '../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';

const DressWornAt = ({eventName, productDetail}) => {
  const navigation = useNavigation();
  return (
    <View style={{...styles.continer}}>
      <Text style={styles.heading}>{translations.DRESS_WORN}</Text>
      <TouchableOpacity
        style={dressStyles.centerImage}
        onPress={() => {
          navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE, {
            // roleId:  89174,
            profileId: productDetail?.worn_at_pageant_id,
            name: eventName,
          });
        }}>
        <AppImages.SHOP.dressWornAt />
        <Text style={dressStyles.eventname}>{eventName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DressWornAt;
