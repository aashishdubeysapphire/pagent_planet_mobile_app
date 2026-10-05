import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {emptyFunction} from '../../../../../utils/helperFunction';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {Param} from '../../../../../../services/constants';

const OvelButton = ({category, brandItem}) => {
  const navigation = useNavigation();
  const ButtonComp = ({
    onPress = emptyFunction,
    text = '',
    customStyles = {},
  }) => {
    return (
      <TouchableOpacity
        style={{...styles.ovelContainer, ...customStyles}}
        onPress={onPress}>
        <View style={styles.rowView}>
          <Text style={styles.textStyle}>{text}</Text>
          <AppImages.Common.tpp_dropdown_thick
            with={moderateScale(14)}
            height={moderateScaleVertical(14)}
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.continer}>
      <ButtonComp
        onPress={() => {
          navigation.navigate(SCREEN.FILTER_PRODUCT, {
            category: {
              id: category?.id,
              name: category?.name,
            },
            displayKey: category.id + new Date().getMilliseconds() + '',
          });
        }}
        text={
          category?.id == 12
            ? translations.VIEW_MORE + ' ' + translations.PROFILE
            : translations.VIEW_MORE + ' ' + category?.name
        }
      />
      {!!brandItem[0]?.values?.id && (
        <ButtonComp
          onPress={() =>
            navigation.navigate(SCREEN.FILTER_PRODUCT, {
              category: {
                id: brandItem[0]?.values.id,
                name: brandItem[0]?.values.name,
                param: Param.PRODUCT_DSIGNER_ID,
              },
              displayKey:
                brandItem[0]?.values.id + new Date().getMilliseconds() + '',
            })
          }
          text={translations.MORE_STYLES_BY_THIS_BRAND}
        />
      )}

      <ButtonComp
        onPress={() =>
          navigation.navigate(SCREEN.FILTER_PRODUCT, {
            category: {
              id: 0,
              name: translations.EXPLORE_ALL_CATEGORIES,
            },
            displayKey: new Date().getMilliseconds() + '',
          })
        }
        text={translations.EXPLORE_ALL_CATEGORIES}
        customStyles={{marginBottom: moderateScaleVertical(0)}}
      />
    </View>
  );
};

export default OvelButton;
