import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import FastImageView from '../../../../common/fastimageview';
import useHtQuery from '../../../../../services/api/useHtQuery';
import {PageantDataResponse} from '../../../../../services/models/pageantdetails/contestantPublicDetails';
import {
  GET_EXPERT_PROFILE_DETAILS,
  GET_EXPERT_PUBLIC_PROFILE,
} from '../../../../../services/endpoints';
import {UserContext} from '../../../../../store/userStore';
import {
  formatPhoneNumber,
  getValidValue,
  openWebLink,
  trackScreenView,
} from '../../../../utils/helperFunction';
import {color} from '../../../../../assets/colorConstant';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import ExpertLocation from '../../../directory/publicprofile/expertcontestant/expertprofile/component/location';
import Bio from '../../../directory/publicprofile/expertcontestant/components/bio';
import translations from '../../../../../assets/translations';
import {SortedRolesForPublicScreen} from '../../../../../services/models/user/user';
import Shimmer from '../../../../common/shimmer';
import {EVENT_STATUS} from '../../../../utils/enum';
import ViewMoreModal from '../../pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/viewmoremodal';
import {ANALYTICS_SCREEN} from '../../../../../assets/translations/analyticsscreenname';

interface Props {
  setProfileInactive: any;
  sortedRolesForPublicScreen: SortedRolesForPublicScreen | undefined;
}
/* The above code is a TypeScript React component called `ExpertProfile`. It is responsible for
rendering the public profile of an expert. */
const ExpertProfile = ({
  sortedRolesForPublicScreen,
  setProfileInactive,
}: Props) => {
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const {data, isLoading, refetch, isRefetching} =
    useHtQuery<PageantDataResponse>({
      key: GET_EXPERT_PUBLIC_PROFILE + sortedRolesForPublicScreen?.id,
      url: GET_EXPERT_PUBLIC_PROFILE + sortedRolesForPublicScreen?.id,
      offSuccessToast: true,
    });

  /**
   * The function "clickedEditButton" navigates to a screen for creating or editing an expert profile
   * if certain conditions are met.
   * @returns The function `clickedEditButton` returns nothing if `isLoading` or `isRefetching` is
   * true. If `data?.data?.businessProfile` is truthy, it returns an object with properties `isEdit`,
   * `selectedProfile`, and `getExpertProfileLink`.
   */
  const clickedEditButton = () => {
    if (isLoading || isRefetching) {
      return;
    } else if (!!data?.data?.businessProfile) {
      navigation.navigate(SCREEN.CREATE_EXPERT_PROFILE, {
        isEdit: true,
        selectedProfile: {
          display_name: data?.data?.businessProfile.role?.display_name,
          name: data?.data?.businessProfile.role?.name,
        },
        getExpertProfileLink:
          GET_EXPERT_PROFILE_DETAILS +
          data?.data?.businessProfile.id +
          '&business_profile_name=' +
          data?.data?.businessProfile.role?.name,
      });
    }
  };

  /**
   * The function checks if a business profile is active or not.
   */
  const checkProfileActiveState = () => {
    setProfileInactive(
      data?.data?.businessProfile !== undefined &&
        data?.data?.businessProfile?.status !== undefined &&
        data?.data?.businessProfile?.status !== EVENT_STATUS.ACTIVE,
    );
  };
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.EXPERT_PROFILE);
  }, []);

  useEffect(() => {
    if (!isLoading || !isRefetching) {
      checkProfileActiveState();
    }
  }, [isLoading, isRefetching]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  /**
   * The onViewMoreClick function sets the viewMoreModalVisible state to true.
   */
  const onViewMoreClick = () => {
    setViewMoreModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.containerStyle}>
      <View style={styles.detailsArea}>
        {isLoading || isRefetching ? (
          <View style={styles.businessTitle}>
            <Shimmer
              width={moderateScale(120)}
              height={10}
              borderRadius={3}
              bottomSpace={6}
            />
          </View>
        ) : (
          <Text style={styles.businessTitle}>
            {data?.data?.businessProfile?.name !== undefined
              ? data?.data?.businessProfile?.name
              : data?.data?.businessProfile?.business_title}
          </Text>
        )}
        {isLoading || isRefetching ? (
          <View style={styles.businessSubTitle}>
            <Shimmer
              width={moderateScale(90)}
              borderRadius={3}
              height={7}
              bottomSpace={moderateScaleVertical(10)}
            />
          </View>
        ) : (
          !!data?.data?.businessProfile?.tagline && (
            <Text style={styles.businessSubTitle}>
              {data?.data?.businessProfile?.tagline + ''}
            </Text>
          )
        )}

        {isLoading || isRefetching ? (
          <View style={styles.businessSubTitle}>
            <Shimmer
              width={moderateScale(200)}
              borderRadius={3}
              height={7}
              bottomSpace={moderateScaleVertical(10)}
            />
          </View>
        ) : (
          data?.data?.businessProfile?.website !== undefined &&
          data?.data?.businessProfile?.website !== null && (
            <TouchableOpacity
              onPress={() => {
                openWebLink(data?.data?.businessProfile?.website);
              }}>
              <View style={styles.profileArea}>
                {
                  <AppImages.PAGEANT_DETAIL.TPP_WEBSITE_ICON
                    width={moderateScale(16)}
                    height={moderateScale(16)}
                  />
                }

                <Text style={styles.clickableLink} numberOfLines={1}>
                  {getValidValue(
                    data?.data?.businessProfile?.website?.toLowerCase(),
                    true,
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
        {isLoading || isRefetching ? (
          <View style={styles.businessSubTitle}>
            <Shimmer
              width={moderateScale(150)}
              borderRadius={3}
              height={moderateScaleVertical(7)}
              bottomSpace={moderateScaleVertical(10)}
            />
          </View>
        ) : (
          data?.data?.businessProfile?.phone !== undefined &&
          data?.data?.businessProfile.phone !== null && (
            <View style={styles.phoneContainer}>
              {<AppImages.PAGEANT_DETAIL.TPP_CALL_ICON />}
              <Text
                style={{
                  ...styles.phoneTitle,
                  color: color.BLACK,
                }}>
                {formatPhoneNumber(
                  getValidValue(data?.data?.businessProfile?.phone + '', true),
                )}
              </Text>
            </View>
          )
        )}
      </View>

      {isLoading || isRefetching ? (
        <View
          style={[
            styles.businessSubTitle,
            {marginTop: moderateScaleVertical(50)},
          ]}>
          <Shimmer
            width={moderateScale(150)}
            borderRadius={3}
            height={moderateScaleVertical(7)}
            bottomSpace={moderateScaleVertical(10)}
          />
          <Shimmer
            width={moderateScale(200)}
            borderRadius={3}
            height={moderateScaleVertical(7)}
            bottomSpace={moderateScaleVertical(50)}
          />
        </View>
      ) : (
        data?.data?.businessProfile?.operating_hour_multiple !== undefined &&
        data?.data?.businessProfile?.operating_hour_multiple.length > 0 &&
        !isRefetching && (
          <ExpertLocation
            contestant={data?.data?.businessProfile}
            selectedTab={sortedRolesForPublicScreen?.role}
            role={{
              slug: sortedRolesForPublicScreen?.role.toLowerCase(),
              profile_type: sortedRolesForPublicScreen?.role,
              profile_id: sortedRolesForPublicScreen?.id,
            }}
          />
        )
      )}

      {isLoading || isRefetching ? (
        <View style={styles.businessSubTitle}>
          <Shimmer
            width={moderateScale(150)}
            borderRadius={3}
            height={moderateScaleVertical(7)}
            bottomSpace={moderateScaleVertical(10)}
          />
          <Shimmer
            width={moderateScale(200)}
            borderRadius={3}
            height={moderateScaleVertical(7)}
            bottomSpace={moderateScaleVertical(50)}
          />
        </View>
      ) : (
        data?.data?.businessProfile?.bio !== undefined &&
        data?.data?.businessProfile?.bio !== null && (
          <View style={styles.moveAbove}>
            <Bio
              heading={translations.ABOUT}
              text={data?.data?.businessProfile?.bio}
              onViewMoreClick={onViewMoreClick}
              isAbout={true}
              numberOfLines={5}
            />
          </View>
        )
      )}

      {!isLoading &&
        !isRefetching &&
        data?.data?.businessProfile?.bio !== undefined && (
          <ViewMoreModal
            isModalVisible={viewMoreModalVisible}
            heading={translations.ABOUT}
            bodyText={data?.data?.businessProfile?.bio}
            closeModal={setViewMoreModalVisible}
            isReview={false}
          />
        )}

      <View style={styles.row}>
        <TouchableOpacity style={styles.demoImageContainer}>
          <FastImageView
            width={moderateScaleVertical(84)}
            height={moderateScaleVertical(84)}
            borderRadius={moderateScaleVertical(84)}
            imageUrl={
              data?.data?.businessProfile?.image_url !== undefined
                ? data?.data?.businessProfile?.image_url
                : data?.data?.businessProfile?.image_full_url
            }
            isCircle
          />

          <View>
            <TouchableOpacity
              style={styles.editIconTouch}
              onPress={() => {
                navigation.navigate(SCREEN.PROFLIE_IMAGE);
              }}>
              <AppImages.EditProfile.Tpp_edit_circle_icon
                width={moderateScale(24)}
                height={moderateScale(24)}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text style={styles.nameText} numberOfLines={1}>
          {'Hi, ' +
            storeData?.data?.user?.personal_details.first_name +
            ' ' +
            storeData?.data?.user?.personal_details.last_name}
        </Text>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => clickedEditButton()}>
          <AppImages.Dashboard.edit_ICON />
        </TouchableOpacity>
      </View>
      <View style={styles.whiteView} />
    </ScrollView>
  );
};

export default ExpertProfile;
