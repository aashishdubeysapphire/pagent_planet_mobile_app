import React, {useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Pageant} from '../../../../../../../services/models/pageantdetails/pageant';
import CustomRatings from '../../../../../../common/customratings';
import FastImageView from '../../../../../../common/fastimageview';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import {styles} from './styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import {
  formatPhoneNumber,
  getValidValue,
  openDialScreen,
  openWebLink,
} from '../../../../../../utils/helperFunction';
import {
  getDateFormat,
  TIME_FORMAT,
} from '../../../../../../utils/datetimemanger';
import {color} from '../../../../../../../assets/colorConstant';
import Shimmer from '../../../../../../common/shimmer';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import {AdvertisingBannerData} from '../../../../../../../services/models/pageantdetails/pageantDetailData';
import {UpgradPlan} from '../../../../../../../services/constants';
import {UserContext} from '../../../../../../../store/userStore';
import {useNavigation} from '@react-navigation/core';
import { SCREEN } from '../../../../../../../root/screenname';

interface Props {
  pageant: Pageant | undefined;
  isLoadingDetail: boolean;
  isDateVisible: boolean;
  isEventPublicPage: boolean;
  advertisingBannerData: AdvertisingBannerData | undefined;
}

const BasicDetails = ({
  isLoadingDetail,
  pageant,
  advertisingBannerData,
  isEventPublicPage = false,
  isDateVisible = false,
}: Props) => {
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();

  const EventStartEndDate = () => {
    return (
      <View>
        {pageant?.start_date !== null && pageant?.end_date !== null ? (
          <View>
            <View style={styles.otherdetailcontainer}>
              <AppImages.Dashboard.DateIconMedium_ICON />
              <Text style={styles.lifetimeParticipantLabel}>
                {getDateFormat(pageant?.start_date, TIME_FORMAT.MMM_SPACE_DD) +
                  ' - ' +
                  getDateFormat(
                    pageant?.end_date,
                    TIME_FORMAT.MMM_SPACE_DD_COMMA_YYYYY
                  )}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const isOpen = () => {
    return (
      (advertisingBannerData?.is_active_advertiser !== undefined &&
        advertisingBannerData?.is_active_advertiser === UpgradPlan.YES) ||
      storeData?.data?.user?.id === pageant?.owner?.id
    );
  };

  return (
    <View>
      <View>
        {isLoadingDetail ? (
          <Shimmer
            width={Dimensions.get('window').width}
            height={moderateScaleVertical(160)}
            borderRadius={0}
          />
        ) : (
          <FastImageView
            width={Dimensions.get('window').width}
            height={moderateScaleVertical(157)}
            imageUrl={pageant?.banner_image_full_url}
          />
        )}

        {isLoadingDetail ? (
          <View style={styles.shimmer}>
            <Shimmer
              width={moderateScaleVertical(124)}
              height={moderateScaleVertical(124)}
              borderRadius={moderateScaleVertical(124)}
            />
          </View>
        ) : (
          <View style={styles.circleImageContainer}>
            <FastImageView
              width={moderateScaleVertical(124)}
              height={moderateScaleVertical(124)}
              borderRadius={moderateScaleVertical(124)}
              imageUrl={pageant?.main_image_full_url}
              isCircle
            />
          </View>
        )}

        {isLoadingDetail && (
          <View
            style={{
              paddingStart: moderateScale(16),
              paddingEnd: moderateScale(16),
              marginTop: moderateScaleVertical(-30),
            }}>
            <Shimmer
              width={Dimensions.get('window').width - moderateScale(30)}
              height={10}
              borderRadius={5}
              bottomSpace={15}
            />
            <Shimmer
              width={Dimensions.get('window').width - moderateScale(30)}
              height={10}
              borderRadius={5}
              bottomSpace={15}
            />
            <Shimmer
              width={Dimensions.get('window').width - moderateScale(30)}
              height={10}
              borderRadius={5}
              bottomSpace={15}
            />
            <View
              style={{
                marginStart: moderateScale(-16),
              }}>
              <ShimmerList
                width={Dimensions.get('window').width / 2 - moderateScale(24)}
                height={Dimensions.get('window').width / 2 - moderateScale(24)}
                padding={15}
                numColumns={2}
              />
            </View>
          </View>
        )}

        {!isLoadingDetail && (
          <Text style={styles.nameLabel}>{pageant?.title}</Text>
        )}

        {!isLoadingDetail &&
          pageant?.average_rating !== undefined &&
          pageant?.rating_count !== undefined && (
            <View style={styles.ratingArea}>
              <CustomRatings
                size={14}
                fontSize={10}
                ratingsValue={pageant?.average_rating}
                review_count={pageant?.rating_count}
              />
            </View>
          )}
        {!isLoadingDetail && isDateVisible && <EventStartEndDate />}

        {!isLoadingDetail &&
          isOpen() &&
          pageant?.website !== undefined &&
          pageant?.website !== null && (
            <TouchableOpacity
              onPress={() => {
                if (
                  advertisingBannerData?.is_active_advertiser !== undefined &&
                  advertisingBannerData?.is_active_advertiser ===
                    UpgradPlan.YES &&
                  pageant?.website !== undefined
                ) {
                  openWebLink(pageant?.website.toLowerCase());
                }
              }}>
              <View style={styles.websiteContainer}>
                {advertisingBannerData?.is_active_advertiser !== undefined &&
                advertisingBannerData?.is_active_advertiser ===
                  UpgradPlan.YES ? (
                  <AppImages.PAGEANT_DETAIL.TPP_WEBSITE_ICON
                    width={moderateScale(16)}
                    height={moderateScale(16)}
                  />
                ) : (
                  <AppImages.Common.LOCK_ICON />
                )}

                <Text
                  style={
                    advertisingBannerData?.is_active_advertiser !== undefined &&
                    advertisingBannerData?.is_active_advertiser ===
                      UpgradPlan.YES
                      ? styles.clickableLink
                      : {...styles.subHeadingLabel, marginTop: 0}
                  }
                  numberOfLines={2}>
                  {getValidValue(
                    pageant?.website?.toLowerCase(),
                    advertisingBannerData?.is_active_advertiser !== undefined &&
                      advertisingBannerData?.is_active_advertiser ===
                        UpgradPlan.YES
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          )}

        {!isLoadingDetail &&
          isOpen() &&
          pageant?.phone !== undefined &&
          pageant.phone !== null && (
            <TouchableOpacity
              onPress={() => {
                if (
                  advertisingBannerData?.is_active_advertiser !== undefined &&
                  advertisingBannerData?.is_active_advertiser ===
                    UpgradPlan.YES &&
                  pageant?.phone !== undefined
                ) {
                  openDialScreen(pageant?.phone);
                }
              }}>
              <View style={styles.phoneContainer}>
                {advertisingBannerData?.is_active_advertiser !== undefined &&
                advertisingBannerData?.is_active_advertiser ===
                  UpgradPlan.YES ? (
                  <AppImages.PAGEANT_DETAIL.TPP_CALL_ICON />
                ) : (
                  <AppImages.Common.LOCK_ICON />
                )}
                <Text
                  style={{
                    ...styles.phoneTitle,
                    color:
                      advertisingBannerData?.is_active_advertiser !==
                        undefined &&
                      advertisingBannerData?.is_active_advertiser ===
                        UpgradPlan.YES
                        ? color.P_PINK
                        : color.S_GRAY_4,
                  }}>
                  {advertisingBannerData?.is_active_advertiser !== undefined &&
                  advertisingBannerData?.is_active_advertiser === UpgradPlan.YES
                    ? formatPhoneNumber(
                        getValidValue(
                          pageant?.phone + '',
                          advertisingBannerData?.is_active_advertiser !==
                            undefined &&
                            advertisingBannerData?.is_active_advertiser ===
                              UpgradPlan.YES
                        )
                      )
                    : getValidValue(
                        pageant?.phone + '',
                        advertisingBannerData?.is_active_advertiser !==
                          undefined &&
                          advertisingBannerData?.is_active_advertiser ===
                            UpgradPlan.YES
                      )}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        {isEventPublicPage && pageant?.master_pageant?.title !== undefined && (
          <TouchableOpacity
            style={styles.phoneContainer}
            onPress={() => {
              navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE, {
                roleId: pageant?.master_pageant?.id,
                profileId: pageant?.master_pageant?.id,
                name: pageant?.master_pageant?.title,
              });
            }}>
            <Text
              style={{
                ...styles.phoneTitle,
                color: color.P_PINK,
              }}>
              {pageant?.master_pageant?.title}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {!isLoadingDetail && <View style={styles.separatorLine} />}
    </View>
  );
};

export default BasicDetails;
