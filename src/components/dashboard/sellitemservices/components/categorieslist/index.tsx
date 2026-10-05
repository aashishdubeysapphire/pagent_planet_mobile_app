import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import FastImageView from '../../../../common/fastimageview';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import {color} from '../../../../../assets/colorConstant';
import AppImages from '../../../../../assets/images/AppImages';

interface Props {
  onItemClickListener?: (param1: number) => void;
  label?: string;
  image?: string;
  id: number;
  selected: boolean;
  inactive: boolean;
}

const CategoriesList = ({
  label,
  onItemClickListener,
  image,
  id,
  selected = false,
  inactive = false,
}: Props) => {
  const onItemClick = (ids: number) => {
    if (onItemClickListener !== undefined && onItemClickListener !== null) {
      onItemClickListener(ids);
    }
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.topContainer,
        borderColor: selected ? color.P_PINK : color.WHITE,
        borderWidth: moderateScale(1),
      }}
      onPress={() => onItemClick(id)}>
      <View>
        {selected ? (
          <AppImages.Common.StarIcon
            width={moderateScale(14)}
            height={moderateScaleVertical(14)}
          />
        ) : inactive ? (
          <AppImages.Common.alertIcon1
            width={moderateScale(14)}
            height={moderateScaleVertical(14)}
          />
        ) : null}
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <FastImageView
          imageUrl={image}
          width={moderateScale(48)}
          height={moderateScale(48)}
          isCircle
          borderColor={color.TRANSPARENT}
          borderRadius={moderateScale(24)}
        />
      </View>
      <Text
        style={{
          ...styles.categoryLabel,
          color: inactive
            ? color.S_GRAY_4
            : selected
            ? color.P_PINK
            : color.INPUT_TEXT,
        }}
        numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesList;
