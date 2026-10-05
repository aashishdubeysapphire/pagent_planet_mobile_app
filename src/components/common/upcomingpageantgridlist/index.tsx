import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import useStyle from './styles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import FastImageView from '../../../components/common/fastimageview';
import CustomRatings from '../customratings';
import translations from '../../../assets/translations';
import {checkIsNull} from '../../utils/validations';
import Tooltip from 'react-native-walkthrough-tooltip';
import {color} from '../../../assets/colorConstant';
interface Props {
  position?: number;
  label?: string;
  eventYearName?: number;
  imageUrl?: string;
  isList?: boolean;
  isDisplayYear?: boolean;
  isLast?: boolean;
  maxLines?: number;
  size?: number;
  isInactive?: boolean;
  ratings?: number;
  ratingsCount?: number;
  horizontalView?: boolean;
  participantsCount?: number;
  textPaddingVertical?: number;
  showRatingsCount?: boolean;
  isProfileAdminOwned?: boolean;
  onItemClickListener?: (param1: number) => void;
  onClaimButtonClicked?: (index: number) => void;
  onTextClickListener?: (index: number) => void;
}

const UpcomingPageantGridListView = ({
  position = -1,
  label,
  eventYearName,
  maxLines = 1,
  imageUrl,
  isDisplayYear = false,
  isList,
  ratings,
  ratingsCount,
  participantsCount,
  isInactive,
  size,
  horizontalView = false,
  textPaddingVertical,
  showRatingsCount = true,
  isProfileAdminOwned,
  onItemClickListener,
  onClaimButtonClicked,
  onTextClickListener,
}: Props) => {
  const styles = useStyle();
  const [isToolVisible, setToolVisible] = useState(false);
  const onItemClick = () => {
    if (onItemClickListener !== undefined) {
      onItemClickListener(position);
    }
  };

  const onClaimButtonPressed = () => {
    if (onClaimButtonClicked !== undefined) {
      onClaimButtonClicked(position);
    }
  };
  const onNameClick = () => {
    if (isDisplayYear) {
      setToolVisible(true);
    } else if (onTextClickListener !== undefined) {
      onTextClickListener(position);
    }
  };
  const ratingSection = () => {
    return (
      <>
        <View
          style={{...styles.ratingArea, marginTop: moderateScaleVertical(6)}}>
          <CustomRatings
            ratingsValue={ratings}
            review_count={ratingsCount}
            showRatingsReviewsCount={showRatingsCount}
          />
        </View>
        {participantsCount === 0 ? null : (
          <View style={styles.ratingArea}>
            <AppImages.Common.PinkProfile_ICON />
            <Text style={styles.lifetimeParticipantLabel}>
              {participantsCount + ' ' + translations.LIFETIME_PARTICIPANT}
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View
      style={{
        ...styles.gridStyle,
        marginStart: horizontalView ? 0 : moderateScale(16),
        marginRight: horizontalView ? moderateScale(12) : 0,
      }}>
      {isList ? (
        <TouchableOpacity onPress={onItemClick} style={[styles.listContainer]}>
          <View style={styles.circleContainer}>
            <FastImageView
              width={moderateScaleVertical(60)}
              height={moderateScaleVertical(60)}
              borderRadius={moderateScaleVertical(60)}
              imageUrl={imageUrl}
              isCircle
            />
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.listTitleSection}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  ...styles.listTitle,
                  lineHeight: moderateScaleVertical(18),
                }}>
                {label}
              </Text>
            </View>

            {ratingSection()}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onItemClick}
          style={[styles.gridContainer, {width: size}]}>
          <FastImageView
            width={size}
            height={size}
            borderRadius={moderateScaleVertical(20)}
            imageUrl={imageUrl}
          />
          {isInactive ? (
            <View style={styles.inactiveEventLogo}>
              <AppImages.PAGEANT_DETAIL.INACTIVE_EVENT />
            </View>
          ) : (
            <View />
          )}
          {isDisplayYear && (
            <View style={styles.eventYear}>
              <AppImages.PAGEANT_DETAIL.BG_YEAR_ICON />
            </View>
          )}
          {isDisplayYear && (
            <View style={styles.eventYearTitle}>
              <Text style={styles.titleYear}>{eventYearName}</Text>
            </View>
          )}

          {isProfileAdminOwned && (
            <TouchableOpacity
              onPress={onClaimButtonPressed}
              style={{
                ...styles.claimSection,
                top: size - moderateScale(31),
              }}>
              <AppImages.PUBLIC_PROFILE.WhiteClaimProfile />
              <Text style={styles.claimLabel}>
                {translations.CLAIM_PROFILE_SMALL}
              </Text>
            </TouchableOpacity>
          )}
          {isProfileAdminOwned && (
            <View style={styles.noProfileSection}>
              <AppImages.PUBLIC_PROFILE.NoProfileIcon />
            </View>
          )}
          {checkIsNull(label) ? (
            <View
              style={{
                ...styles.gridTitleSection,
                paddingVertical: textPaddingVertical
                  ? moderateScaleVertical(8)
                  : participantsCount === 0
                  ? moderateScaleVertical(18.5)
                  : moderateScaleVertical(8),
                height: maxLines === 2 ? moderateScaleVertical(85) : null,
              }}>
              <TouchableOpacity onPress={onNameClick}>
                <Tooltip
                  isVisible={isToolVisible}
                  disableShadow={false}
                  backgroundColor={color.MODEL_BG}
                  content={<Text style={styles.title}>{label}</Text>}
                  placement="top"
                  onClose={() => {
                    setToolVisible(false);
                  }}>
                  <Text
                    style={styles.title}
                    numberOfLines={maxLines}
                    ellipsizeMode="tail"
                    textBreakStrategy="simple">
                    {label}
                  </Text>
                </Tooltip>
              </TouchableOpacity>
              {ratingSection()}
            </View>
          ) : (
            <View />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UpcomingPageantGridListView;
