import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {memo} from 'react';
import {styles} from './styles';
import AppImages from '../../../assets/images/AppImages';
import FastImageView from '../fastimageview';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import CustomRatings from '../customratings';
import {ROLES} from '../../utils/enum';
import translations from '../../../assets/translations';
const windowDimensions = Dimensions.get('window').width;

interface Props {
  item: any;
  index: number;
  isSelected: boolean;
  areSelectable: boolean;
  showRatings: boolean;
  isDisplaiClaimButton: boolean;
  onTextClickListener: Function;
  onClaimButtonClicked: Function;
  width: number;
}

const SelectableCards = ({
  item,
  index,
  isSelected,
  areSelectable,
  showRatings = false,
  isDisplaiClaimButton = false,
  onTextClickListener,
  onClaimButtonClicked,
  width = windowDimensions / 2 - moderateScale(24),
}: Props) => {
  const onNameItemClick = () => {
    if (onTextClickListener !== undefined) {
      onTextClickListener(item);
    }
  };

  const onClaimButtonPressed = () => {
    if (onClaimButtonClicked !== undefined) {
      onClaimButtonClicked(item);
    }
  };

  return (
    <View
      style={
        index % 2 === 0
          ? {...styles.container, marginRight: moderateScale(16), width: width}
          : {...styles.container, width: width}
      }>
      {areSelectable && (
        <View style={styles.selectUnselectView}>
          {isSelected ? (
            <AppImages.Common.tickIcon
              width={moderateScale(20)}
              height={moderateScaleVertical(20)}
            />
          ) : (
            <AppImages.PAGEANT_DETAIL.unselectedCircle />
          )}
        </View>
      )}
      <View>
        <FastImageView
          width={width}
          height={width}
          borderRadius={20}
          imageUrl={item?.final_image_url ? item?.final_image_url : item?.image}
        />
        {isDisplaiClaimButton &&
          item?.owner_id !== undefined &&
          item?.owner_id === ROLES.ADMIN_ID && (
            <TouchableOpacity
              onPress={onClaimButtonPressed}
              style={{
                ...styles.claimSection,
                bottom: moderateScaleVertical(0),
              }}>
              <AppImages.PUBLIC_PROFILE.WhiteClaimProfile />
              <Text style={styles.claimLabel}>
                {translations.CLAIM_PROFILE_SMALL}
              </Text>
            </TouchableOpacity>
          )}
        {item?.owner_id !== undefined && item?.owner_id === ROLES.ADMIN_ID && (
          <View style={styles.noProfileSection}>
            <AppImages.PUBLIC_PROFILE.NoProfileIcon />
          </View>
        )}
      </View>

      <TouchableOpacity onPress={onNameItemClick} style={styles.lableView}>
        <Text style={styles.lableText} ellipsizeMode={'tail'} numberOfLines={1}>
          {item?.business_title ? item?.business_title : item?.name}
        </Text>
      </TouchableOpacity>

      {showRatings && (
        <View style={styles.centerView}>
          <CustomRatings
            ratingsValue={item.rating_average}
            review_count={0}
            showRatingsReviewsCount={false}
          />
        </View>
      )}
    </View>
  );
};

export default memo(SelectableCards);
