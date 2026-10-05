import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../utils/responsiveSize';
import {
  GET_EXPERT_PUBLIC_PROFILE,
  GET_EXPERT_VIEWAL_ALL_AWARDS,
  GET_PAGEANT_PLAN,
} from '../../../../../../services/endpoints';
import {ScrollView} from 'react-native-gesture-handler';
import {SCREEN} from '../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import Bio from '../components/bio';
import AwardsList from '../components/awards';
import AlbumList from '../components/albumlist';
import ProfileDetails from '../components/profiledetails';
import ActionButtons from '../components/actionbuttons';
import useHtQuery from '../../../../../../services/api/useHtQuery';
import {PageantDataResponse} from '../../../../../../services/models/pageantdetails/contestantPublicDetails';
import ExpertLocation from './component/location';
import Reviews from './component/reviews';
import BannerSlider from '../components/bannerslider';
import Shimmer from '../../../../../common/shimmer';
import {
  DIRECTORY_ID,
  PROFILE_STATUS,
  REFESH_SCREEN,
  ROLES,
} from '../../../../../utils/enum';
import AppImages from '../../../../../../assets/images/AppImages';
import {
  MethodTypes,
  ProfileType,
  Public_Profile,
} from '../../../../../../services/constants';
import {AgeDivision} from '../../../../../../services/models/pageantdetails/ageDivision';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../common/commonalert';
import {UserLocationsData} from '../../../../../../services/models/publicRoles';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import {color} from '../../../../../../assets/colorConstant';
import {User} from '../../../../../../services/models/user/user';
import {useNetInfo} from '@react-native-community/netinfo';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {PlanData} from '../../../../../../services/models/planData';
import ViewPlanModal from '../../../../dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';
import {UserContext} from '../../../../../../store/userStore';
import {checkIsNull} from '../../../../../utils/validations';
import ViewMoreModal from '../../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/viewmoremodal';

interface Props {
  profileRole: number;
  role: AgeDivision | undefined;
  itemId: number;
  isRefresh: boolean;
  openProfileId: number;
  selectedTab: string;
  address: UserLocationsData | undefined;
  onDisplayNewProfile?: () => void;
  user: User | undefined;
}

const ExpertProfile = ({
  profileRole,
  role,
  itemId,
  address,
  selectedTab,
  isRefresh,
  openProfileId,
  user,
  onDisplayNewProfile,
}: Props) => {
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const [buttonArray, setButtonArray] = React.useState([]);
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const scrollRef = useRef();
  const {
    storeData: {refresh},
  } = useAppStore();
  const netInfo = useNetInfo();
  const setScreenRefresh = useSetScreenRefresh();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const {storeData} = useContext(UserContext);

  //API GET EXPERT PUBLIC DETAILS ----------------------------------------- START

  const {data, isLoading, isFetching, refetch} =
    useHtQuery<PageantDataResponse>({
      key: GET_EXPERT_PUBLIC_PROFILE + itemId,
      url: GET_EXPERT_PUBLIC_PROFILE + itemId,
      offSuccessToast: true,
    });
  //API GET EXPERT PUBLIC DETAILS ----------------------------------------- END

  const {data: membershipPlans, mutateAsync: getPlanDetails} =
    useCgMutation<PlanData>({
      key: GET_PAGEANT_PLAN,
      method: MethodTypes.GET,
      url: GET_PAGEANT_PLAN,
      disableLoader: true,
      offSuccessToast: true,
    });

  useEffect(() => {
    getPlanDetails();
  }, []);

  //isLoading
  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  useEffect(() => {
    scrollToTop();
  }, [isRefresh]);

  const scrollToTop = async () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const refeshScreen = async () => {
    if (REFESH_SCREEN.PUBLIC_PROFILE_EXPERT === refresh) {
      scrollToTop();
      refetch();
      setScreenRefresh(REFESH_SCREEN.DIRECTORY);
    }
  };

  const getActiveButtonList = (dataList: PageantDataResponse) => {
    const buttonList = [];
    if (
      dataList?.businessProfile?.owner_id !== ROLES.ADMIN_ID &&
      dataList?.businessProfile?.owner_id !==
        Number(storeData?.data?.user?.id) &&
      !dataList?.is_message_button_disable
    ) {
      buttonList.push(translations.MESSAGE);
    } else if (
      dataList?.businessProfile?.owner_id === ROLES.ADMIN_ID ||
      dataList?.businessProfile?.owner_id === Number(storeData?.data?.user?.id)
    ) {
      // show message disable for admin or user's own profile.
    } else if (dataList?.is_message_button_disable) {
      buttonList.push(translations.UPGRADE_SMALL); //for unlock profiles ,who do not have membership
    }

    if (dataList?.productOnSale > 0) {
      buttonList.push(translations.SHOP);
    }
    if (dataList?.productOnHire > 0) {
      buttonList.push(translations.HIRE);
    }
    setButtonArray(buttonList);
  };

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    getActiveButtonList(data?.data);
  }, [data?.data]);

  const onExtraViewAllClick = () => {
    navigation.navigate(SCREEN.EXPERT_PUBLIC_PROFILE_EXTRA_IMAGES, {
      screenName: translations.EXTRA,
      business_profile_id: itemId,
    });
  };

  const isBannerShown = (pageantData: PageantDataResponse) => {
    return (
      pageantData?.activeNominationData !== undefined &&
      pageantData?.activeNominationData?.length > 0 &&
      !isLoading &&
      !isFetching
    );
  };

  const handleViewButtonClicked = (name: string, url: string) => {
    navigation.navigate(SCREEN.GRID_VIEWALL, {
      screenName: name,
      Url: url,
      contestantId: data?.data?.businessProfile?.id,
      type: Public_Profile,
    });
  };

  const onViewMoreClick = () => {
    setViewMoreModalVisible(true);
  };

  const onContestantTextClicked = (indx: number) => {
    if (
      data?.data?.contesantsWorkedAlbums[indx].contestantDetails !==
        undefined &&
      data?.data?.contesantsWorkedAlbums[indx].contestantDetails.is_minor ===
        translations.NO_SMALL &&
      data?.data?.contesantsWorkedAlbums[indx].contestantDetails.status ===
        PROFILE_STATUS.ACTIVE
    ) {
      if (
        openProfileId ===
          data?.data?.contesantsWorkedAlbums[indx].contestantDetails.id &&
        onDisplayNewProfile !== undefined
      ) {
        onDisplayNewProfile();
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId:
            data?.data?.contesantsWorkedAlbums[indx].contestantDetails
              .owner_id !== ROLES.ADMIN_ID
              ? data?.data?.contesantsWorkedAlbums[indx].contestantDetails
                  .owner_id
              : data?.data?.contesantsWorkedAlbums[indx].contestantDetails.id,
          profileId:
            data?.data?.contesantsWorkedAlbums[indx].contestantDetails.id,
          name: data?.data?.contesantsWorkedAlbums[indx].album_name,
          category: DIRECTORY_ID.CONTESTANT,
          key: new Date().getMilliseconds(),
          selectedTab: ROLES.CONTESTANT,
        });
      }
    } else {
      toast(translations.NO_PROFILE_DETAIL, toastType.ERROR_TOAST);
    }
  };

  const onPageantTextClicked = (indxx: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (
        data?.data?.pageantsWorkedAlbums[indxx].status === PROFILE_STATUS.ACTIVE
      ) {
        let pageantId = data?.data?.pageantsWorkedAlbums[indxx].pageant_id;
        let eventId = data?.data?.pageantsWorkedAlbums[indxx].id;
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: checkIsNull(pageantId) ? pageantId : eventId,
          name: data?.data?.pageantsWorkedAlbums[indxx].title,
        });
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView ref={scrollRef}>
        <View style={styles.topContainer}>
          <View style={styles.profileArea}>
            <ProfileDetails
              directoryID={profileRole}
              contestant={data?.data?.businessProfile}
              isLoadingDetail={isLoading}
              address={address}
              socialMediaData={data?.data?.businessProfile?.social_media}
            />
            {data?.data?.businessProfile?.owner_id === ROLES.ADMIN_ID ? (
              <View style={styles.claimProfileSection}>
                <TouchableOpacity
                  style={styles.claimTouchableArea}
                  onPress={() =>
                    navigation.navigate(SCREEN.CLAIM_PROFILE, {
                      profileType: translations.BUSINESS,
                      slug: data?.data?.businessProfile?.slug,
                      role: data?.data?.businessProfile?.business_role?.name,
                    })
                  }>
                  <AppImages.PUBLIC_PROFILE.ClaimProfile />
                  <Text style={styles.claimProfileLabel}>
                    {translations.CLAIM_THIS_PROFILE}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : data?.data !== undefined &&
              data?.data?.businessProfile !== undefined ? (
              <ActionButtons
                buttonArray={buttonArray}
                loading={isLoading}
                fetching={isFetching}
                screen={''}
                name={
                  data?.data?.businessProfile.name !== undefined
                    ? data?.data?.businessProfile?.name
                    : data?.data?.businessProfile?.business_title
                }
                profileId={data?.data?.businessProfile?.id}
                roleId={data?.data?.businessProfile?.business_role_id}
                setIsPreviewModalVisible={setIsPreviewModalVisible}
              />
            ) : null}
          </View>

          {isBannerShown(data?.data) ? (
            <BannerSlider
              nominationList={data?.data?.activeNominationData}
              publicProfileType={ProfileType.BUSINESS}
              businessId={data?.data?.businessProfile?.id}
              refetchAPI={refetch}
            />
          ) : isLoading || isFetching ? (
            <View
              style={{...styles.shimmerList, marginLeft: moderateScale(16)}}>
              <Shimmer
                width={width - moderateScale(32)}
                height={moderateScale(124)}
                borderRadius={moderateScale(24)}
                bottomSpace={moderateScale(16)}
              />
            </View>
          ) : null}

          {!isLoading &&
            data?.data?.businessProfile?.operating_hour_multiple !==
              undefined &&
            data?.data?.businessProfile?.operating_hour_multiple.length > 0 && (
              <ExpertLocation
                contestant={data?.data?.businessProfile}
                selectedTab={selectedTab}
                role={role}
              />
            )}

          {data?.data?.businessProfile?.owner?.bio !== undefined &&
            !isLoading &&
            data?.data?.businessProfile?.owner?.bio !== null &&
            data?.data?.businessProfile?.owner?.bio !== '' && (
              <Bio
                heading={translations.BIO}
                text={data?.data?.businessProfile?.owner?.bio}
              />
            )}
          <View style={styles.shimmerList} />
          {(data?.data?.contesantsWorkedAlbums !== undefined &&
            data?.data?.contesantsWorkedAlbums?.length) > 0 && (
            <AlbumList
              data={data?.data?.contesantsWorkedAlbums}
              itemSize={itemSize}
              maxNoOfLines={1}
              navigation={navigation}
              profileId={itemId}
              role={role}
              isPublicProfileView={true}
              isPublicProfileAlbumImage={true}
              backgroundColor={color.S_GRAY_1}
              onTextClickListener={(index: number) =>
                onContestantTextClicked(index)
              }
              itemType={SCREEN.EXPERT_PUBLIC_CONTESTANT_WORK_WITH}
              title={
                translations.CONTESTANT_WORKED_WITH +
                ' (' +
                data?.data?.contesantsWorkedAlbumsCount +
                ')'
              }
            />
          )}

          {(data?.data?.pageantsWorkedAlbums !== undefined &&
            data?.data?.pageantsWorkedAlbums?.length) > 0 && (
            <AlbumList
              data={data?.data?.pageantsWorkedAlbums}
              itemSize={itemSize}
              navigation={navigation}
              maxNoOfLines={2}
              isPublicProfileView={true}
              isPublicProfileAlbumImage={true}
              backgroundColor={color.WHITE}
              onTextClickListener={(index: number) =>
                onPageantTextClicked(index)
              }
              profileId={itemId}
              role={role}
              itemType={SCREEN.EXPERT_PEGEANT_WORK_WITH}
              title={
                translations.PAGEANT_WORKED_WITH +
                ' (' +
                data?.data?.pageantsWorkedAlbumsCount +
                ')'
              }
            />
          )}

          {data?.data?.awards?.data?.length !== 0 &&
            data?.data?.awards?.data !== undefined && (
              <View style={styles.awardSection}>
                <View style={styles.rowSection}>
                  <Text style={styles.heading}> {translations.AWARDS} </Text>
                  <TouchableOpacity
                    style={styles.viewStyles}
                    onPress={() => {
                      handleViewButtonClicked(
                        translations.AWARDS,
                        GET_EXPERT_VIEWAL_ALL_AWARDS,
                      );
                    }}>
                    <Text style={styles.viewButton}>
                      {translations.VIEW_ALL}
                    </Text>
                  </TouchableOpacity>
                </View>
                <AwardsList data={data?.data?.awards?.data} />
              </View>
            )}

          {data?.data?.extraImages !== undefined &&
            data?.data?.extraImages !== null &&
            data?.data?.extraImages?.length !== 0 && (
              <View style={styles.awardSection}>
                <View style={styles.rowSection}>
                  <Text style={styles.heading}> {translations.EXTRA} </Text>
                  <TouchableOpacity
                    style={styles.viewStyles}
                    onPress={() => {
                      onExtraViewAllClick();
                    }}>
                    <Text style={styles.viewButton}>
                      {translations.VIEW_ALL}
                    </Text>
                  </TouchableOpacity>
                </View>
                <AwardsList data={data?.data?.extraImages} />
              </View>
            )}

          {data?.data?.businessProfile?.bio !== undefined &&
            data?.data?.businessProfile?.bio !== null && (
              <Bio
                heading={translations.ABOUT}
                text={data?.data?.businessProfile?.bio}
                onViewMoreClick={onViewMoreClick}
                isAbout={true}
                numberOfLines={5}
              />
            )}
          <ViewMoreModal
            isModalVisible={viewMoreModalVisible}
            heading={translations.ABOUT}
            bodyText={data?.data?.businessProfile?.bio}
            closeModal={setViewMoreModalVisible}
            isReview={false}
          />
          <Reviews businessId={itemId} />
          <View style={styles.bottomHieght} />
        </View>
        <ViewPlanModal
          isPreviewModalVisible={isPreviewModalVisible}
          pageantPlanDetail={membershipPlans?.data}
          setIsPreviewModalVisible={setIsPreviewModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpertProfile;
