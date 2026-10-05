import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../productdetails/styles';
import {styles as localStyles} from './styles';
import translations from '../../../../../../assets/translations';
import SelectableCards from '../../../../../common/selectablecards';
import {moderateScale} from '../../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {DIRECTORY_ID, IS_MINOR_VALUES, ROLES} from '../../../../../utils/enum';
import {SCREEN} from '../../../../../../root/screenname';
import {checkIsNull} from '../../../../../utils/validations';
const BrandWornBy = ({brandsWornBy}) => {
  const navigation = useNavigation();
  const onNameClick = item => {
    if (item.is_minor == IS_MINOR_VALUES.NO && item.is_active == 1) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: item?.owner_id, //owner id
        profileId: item?.id,
        name: item?.name,
        key: new Date().getMilliseconds(),
        category: DIRECTORY_ID.CONTESTANT,
        selectedTab: ROLES.CONTESTANT,
      });
    }
  };
  return (
    checkIsNull(brandsWornBy) && (
      <View style={styles.continer}>
        <Text style={styles.heading}>{translations.BRAND_WORN_BY}</Text>
        <View style={localStyles.listView}>
          <FlatList
            data={brandsWornBy}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={localStyles.cardStyle}>
                  <SelectableCards
                    index={1}
                    item={item}
                    isDisplaiClaimButton={false}
                    onTextClickListener={() => onNameClick(item)}
                    isSelected={false}
                    areSelectable={false}
                    showRatings={false}
                    width={moderateScale(154)}
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

export default BrandWornBy;
