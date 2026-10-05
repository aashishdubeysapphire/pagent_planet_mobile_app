import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {color} from '../../../../../../../assets/colorConstant';
import AppImages from '../../../../../../../assets/images/AppImages';
import {UpgradPlan} from '../../../../../../../services/constants';
import {Contestant} from '../../../../../../../services/models/pageantdetails/contestant';
import {UserLocationsData} from '../../../../../../../services/models/publicRoles';
import {LinkedAccounts} from '../../../../../../../services/models/user/personalDetails';
import CustomRatings from '../../../../../../common/customratings';
import FastImageView from '../../../../../../common/fastimageview';
import ShimmerProfile from '../../../../../../common/shimmer/profileshimmer';
import {DIRECTORY_ID} from '../../../../../../utils/enum';
import {
  formatPhoneNumber,
  getValidValue,
  openDialScreen,
  openWebLink,
} from '../../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import SocialMediaIcons from '../socialmediaicons';
import {styles} from './styles';
import {UserContext} from '../../../../../../../store/userStore';

interface Props {
  directoryID: number;
  contestant: Contestant | undefined;
  isLoadingDetail: boolean;
  address: UserLocationsData | undefined;
  socialMediaData: LinkedAccounts | undefined;
}

const ProfileDetails = ({
  directoryID,
  contestant,
  isLoadingDetail,
  socialMediaData,
  address,
}: Props) => {
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  const {storeData} = useContext(UserContext);
  const getText = (str: string, str1: string) => {
    if (
      str !== undefined &&
      str.length > 0 &&
      str1 !== undefined &&
      str1.length > 0
    ) {
      return str + ', ' + str1;
    } else if (str !== undefined && str.length > 0) {
      return str;
    }
    return str1;
  };

  useEffect(() => {
    if (socialMediaData !== undefined && socialMediaData !== null) {
      const keys = Object.keys(socialMediaData);
      keys.forEach((key, index) => {
        if (
          socialMediaData[key] !== null &&
          socialMediaData[key] !== '' &&
          socialMediaData[key] !== undefined &&
          key !== 'id'
        ) {
          setShowSocialIcons(true);
          return false;
        }
      });
    }
  }, [socialMediaData]);

  const isOpen = () => {
    return (
      (contestant?.is_active_advertiser !== undefined &&
        contestant?.is_active_advertiser === UpgradPlan.YES) ||
      storeData?.data?.user?.id === contestant?.owner_id
    );
  };
  return (
    <View style={styles.container}>
      {isLoadingDetail ? (
        <ShimmerProfile
          isDisplayLines={
            directoryID !== DIRECTORY_ID.CONTESTANT &&
            directoryID !== DIRECTORY_ID.PAGEANT
          }
        />
      ) : (
        <View>
          <View style={styles.circleImageContainer}>
            <FastImageView
              width={moderateScaleVertical(124)}
              height={moderateScaleVertical(124)}
              borderRadius={moderateScaleVertical(124)}
              imageUrl={
                contestant?.image_url !== undefined
                  ? contestant?.image_url
                  : contestant?.image_full_url
              }
              isCircle
            />
          </View>

          <Text style={styles.nameLabel}>
            {contestant?.name !== undefined
              ? contestant?.name
              : contestant?.business_title}
          </Text>
          {contestant?.tagline !== undefined &&
            contestant?.tagline !== null && (
              <Text
                style={[styles.tagLabel, {marginTop: moderateScaleVertical(8)}]}
                ellipsizeMode="tail">
                {contestant?.tagline}
              </Text>
            )}

          {contestant?.final_rating_average !== undefined && (
            <View style={styles.ratingArea}>
              <CustomRatings
                size={14}
                fontSize={10}
                ratingsValue={
                  contestant?.final_rating_average === undefined
                    ? 0
                    : contestant?.final_rating_average
                }
                review_count={contestant?.total_user_rating}
              />
            </View>
          )}

          {directoryID !== DIRECTORY_ID.PAGEANT &&
            (address?.state?.name !== undefined || address?.country?.name) && (
              <View style={styles.profileArea}>
                <View style={styles.locationArea}>
                  <AppImages.Dashboard.LocationIcon
                    width={moderateScale(11)}
                    height={moderateScale(13)}
                  />
                </View>
                <Text
                  style={styles.subHeadingLabel}
                  numberOfLines={
                    directoryID === DIRECTORY_ID.CONTESTANT ? 1 : 2
                  }
                  ellipsizeMode="tail">
                  {getText(address?.state?.name, address?.country?.name)}
                </Text>
              </View>
            )}

          {contestant?.website !== undefined &&
            contestant?.website !== null &&
            isOpen() && (
              <TouchableOpacity
                onPress={() => {
                  if (
                    contestant?.is_active_advertiser !== undefined &&
                    contestant?.is_active_advertiser === UpgradPlan.YES &&
                    contestant?.website !== undefined
                  ) {
                    openWebLink(contestant?.website);
                  }
                }}>
                <View style={styles.profileArea}>
                  {contestant?.is_active_advertiser !== undefined &&
                  contestant?.is_active_advertiser === UpgradPlan.YES ? (
                    <AppImages.PAGEANT_DETAIL.TPP_WEBSITE_ICON
                      width={moderateScale(16)}
                      height={moderateScale(16)}
                    />
                  ) : (
                    <AppImages.Common.LOCK_ICON />
                  )}

                  <Text
                    style={
                      contestant?.is_active_advertiser !== undefined &&
                      contestant?.is_active_advertiser === UpgradPlan.YES
                        ? styles.clickableLink
                        : {...styles.subHeadingLabel, marginTop: 0}
                    }
                    numberOfLines={1}>
                    {getValidValue(
                      contestant?.website?.toLowerCase(),
                      contestant?.is_active_advertiser !== undefined &&
                        contestant?.is_active_advertiser === UpgradPlan.YES
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

          {contestant?.phone !== undefined &&
            contestant.phone !== null &&
            isOpen() && (
              <TouchableOpacity
                onPress={() => {
                  if (
                    contestant?.is_active_advertiser !== undefined &&
                    contestant?.is_active_advertiser === UpgradPlan.YES &&
                    contestant?.phone !== undefined
                  ) {
                    openDialScreen(contestant?.phone);
                  }
                }}>
                <View style={styles.phoneContainer}>
                  {contestant?.is_active_advertiser !== undefined &&
                  contestant?.is_active_advertiser === UpgradPlan.YES ? (
                    <AppImages.PAGEANT_DETAIL.TPP_CALL_ICON />
                  ) : (
                    <AppImages.Common.LOCK_ICON />
                  )}
                  <Text
                    style={{
                      ...styles.phoneTitle,
                      color:
                        contestant?.is_active_advertiser !== undefined &&
                        contestant?.is_active_advertiser === UpgradPlan.YES
                          ? color.P_PINK
                          : color.S_GRAY_4,
                    }}>
                    {contestant?.is_active_advertiser !== undefined &&
                    contestant?.is_active_advertiser === UpgradPlan.YES
                      ? formatPhoneNumber(
                          getValidValue(
                            contestant?.phone + '',
                            contestant?.is_active_advertiser !== undefined &&
                              contestant?.is_active_advertiser ===
                                UpgradPlan.YES
                          )
                        )
                      : getValidValue(
                          contestant?.phone + '',
                          contestant?.is_active_advertiser !== undefined &&
                            contestant?.is_active_advertiser === UpgradPlan.YES
                        )}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

          {socialMediaData !== undefined && showSocialIcons && (
            <SocialMediaIcons dataList={socialMediaData} />
          )}
        </View>
      )}

      <View style={styles.separatorLine} />
    </View>
  );
};

export default ProfileDetails;
