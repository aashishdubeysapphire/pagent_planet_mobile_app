import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../../../common/header';
import {styles} from './styles';
import {DIRECTORY_ID, REFESH_SCREEN, ROLES} from '../../../../utils/enum';
import AppImages from '../../../../../assets/images/AppImages';
import useHtQuery from '../../../../../services/api/useHtQuery';
import {
  GET_PAGEANT_AWARDS,
  GET_PAGEANT_PLAN,
  GET_PAGEANT_PUBLIC_PROFILE_SUB_GALLERY,
  PAGEANT_PUBLIC_PROFILE,
  PAGEANT_PUBLIC_PROFILE_ALL_ALBUM,
} from '../../../../../services/endpoints';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import {UserContext} from '../../../../../store/userStore';
import BasicDetails from './components/basicdetail';
import {PageantPublicProfileResponse} from '../../../../../services/models/pageantdetails/pageantPublicProfile';
import translations from '../../../../../assets/translations';
import {checkIsNull} from '../../../../utils/validations';
import ActionButtons from '../expertcontestant/components/actionbuttons';
import {ScrollView} from 'react-native-gesture-handler';
import EventList from './components/eventlist';
import AwardsList from '../expertcontestant/components/awards';
import AlbumList from '../expertcontestant/components/albumlist';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import Bio from '../expertcontestant/components/bio';
import {color} from '../../../../../assets/colorConstant';
import CrownConvo from './components/crownconvo';
import Rules from './components/rules';
import {SCREEN} from '../../../../../root/screenname';
import Banners from './components/banners';
import {
  MethodTypes,
  ProfileType,
  Public_Profile,
} from '../../../../../services/constants';
import {ActivePcaEvent} from '../../../../../services/models/pca/activePcaEvent';
import {
  onShare,
  trackScreenView,
} from '../../../../utils/helperFunction';
import Shimmer from '../../../../common/shimmer';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {PlanData} from '../../../../../services/models/planData';
import ViewPlanModal from '../../../dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';
import {toast, toastType} from '../../../../common/commonalert';
import ViewMoreModal from '../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/viewmoremodal';
import {ANALYTICS_SCREEN} from '../../../../../assets/translations/analyticsscreenname';
import TicketsModal from './eventpublicprofile/components/ticketsmodal';
import ShopList from './eventpublicprofile/components/shoplist';

const PageantPublicProfile = ({route}) => {
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [buttonArray, setButtonArray] = React.useState([]);
  const {
    storeData: {refresh},
  } = useAppStore();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [selectedBannerdata, setselectedBannerData] = useState({});
  const [isTIcketsModalVisible, setIsTIcketsModalVisible] = useState(false);
  const [isTicketActive, setIsTicketActive] = useState(false);
  const [isClickToCompleteActive, setIsClickToCompleteActive] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();

  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- START
  const {data, isLoading, refetch, isRefetching} =
    useHtQuery<PageantPublicProfileResponse>({
      key: PAGEANT_PUBLIC_PROFILE + route.params.profileId,
      url: PAGEANT_PUBLIC_PROFILE + route.params.profileId,
      offSuccessToast: true,
    });

  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- END
 
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
    trackScreenView(ANALYTICS_SCREEN.PAGEANT_PUBLIC_PROFILE);
  }, []);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (
      REFESH_SCREEN.PUBLIC_PROFILE_PAGEANT === refresh ||
      REFESH_SCREEN.PAGEANT_EVENT_PROFILE === refresh
    ) {
      await refetch();

      setScreenRefresh(REFESH_SCREEN.DIRECTORY);
      setTimeout(() => {
        setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
      }, 300);
    }
  };
 
  const onViewMoreClick = () => {
    setViewMoreModalVisible(true);
  };

  useEffect(() => {
    createActiveButtonList(data?.data);
  }, [data]);

  const createActiveButtonList = (dataList: PageantPublicProfileResponse) => {
    const buttonList = [];
    if (
      dataList?.pageant?.owner_id !== ROLES.ADMIN_ID &&
      dataList?.pageant?.owner_id !== Number(storeData?.data?.user?.id) &&
      !dataList?.is_message_button_disable
    ) {
      buttonList.push(translations.MESSAGE);
    } else if (
      dataList?.pageant?.owner_id === ROLES.ADMIN_ID ||
      dataList?.pageant?.owner_id === Number(storeData?.data?.user?.id)
    ) {
      //disable message for admin & user own profile
    } else if (dataList?.is_message_button_disable) {
      buttonList.push(translations.UPGRADE_SMALL); //for unlock profiles ,who do not have membership
    }
    if (dataList?.product_total_count > 0) {
      buttonList.push(translations.SHOP);
    }
    if (dataList?.productsToAttend > 0) {
      buttonList.push(translations.ATTEND2);
    }
    if (dataList?.productsToCompete > 0) {
      buttonList.push(translations.COMPETE);
    }
    setButtonArray(buttonList);
  };

  const handleViewButtonClicked = (name: string, url: string) => {
    navigation.navigate(SCREEN.GRID_VIEWALL, {
      screenName: name,
      Url: url,
      contestantId: route.params.profileId,
      type: Public_Profile,
    });
  };

  const voteNowButtonPressed = (item: ActivePcaEvent) => {
    navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
      eventId: item?.id,
      name: item?.title,
    });
  };
  const onPressShareIcon = () => {
    if (
      data?.data?.pageant?.share_link !== undefined &&
      data?.data?.pageant?.share_link !== null
    ) {
      onShare('' + data?.data?.pageant?.share_link, '');
    } else {
      toast(translations.LINK_NOT_FOUND, toastType.ERROR_TOAST);
    }
  };

  const onPressGetYourTicket = item => {
    setselectedBannerData(item);
    setIsTicketActive(true);
    setIsTIcketsModalVisible(true);
  };

  const onPressClickToComplete = item => {
    setselectedBannerData(item);
    setIsClickToCompleteActive(true);
    setIsTIcketsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header
        lable={route?.params?.name}
        isUnderLineRequired
        rightIcon1={<AppImages.PUBLIC_PROFILE.ShareIcon />}
        onPressRightIcon1={onPressShareIcon}
        fallbackToDashboardOnBack
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: moderateScaleVertical(40)}}>
        <View style={{paddingBottom: moderateScaleVertical(24)}}>
          <BasicDetails
            isLoadingDetail={isLoading}
            pageant={data?.data?.pageant}
            advertisingBannerData={data?.data?.advertisingBannerData}
          />
        </View>

        {data?.data?.pageant?.owner_id === ROLES.ADMIN_ID &&
        data?.data?.pageant?.owner_id !== Number(storeData?.data?.user?.id) ? (
          <View style={{paddingHorizontal: moderateScale(16)}}>
            <View style={styles.claimProfileSection}>
              <TouchableOpacity
                style={styles.claimTouchableArea}
                onPress={() =>
                  navigation.navigate(SCREEN.CLAIM_PROFILE, {
                    profileType: translations.PAGEANT_SMALL,
                    slug: data?.data?.pageant?.slug,
                  })
                }>
                <AppImages.PUBLIC_PROFILE.ClaimProfile />
                <Text style={styles.claimProfileLabel}>
                  {translations.CLAIM_THIS_PROFILE}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: moderateScale(16),
              paddingBottom: moderateScaleVertical(22),
              marginTop: -moderateScaleVertical(24),
            }}>
            <ActionButtons
              loading={isLoading}
              fetching={isRefetching}
              buttonArray={buttonArray}
              screen={translations.PAGEANT}
              name={route?.params?.name}
              profileId={route.params.profileId}
              roleId={DIRECTORY_ID.PAGEANT}
              setIsPreviewModalVisible={setIsPreviewModalVisible}
            />
          </View>
        )}

        {isLoading || isRefetching ? (
          <View style={styles.shimmerList}>
            <Shimmer
              width={width - moderateScale(32)}
              height={moderateScale(124)}
              borderRadius={moderateScale(24)}
              bottomSpace={moderateScale(16)}
            />
          </View>
        ) : (
          (checkIsNull(data?.data?.pageantsWithActivePCA) ||
            checkIsNull(data?.data?.activeNominationsList) ||
            checkIsNull(data?.data?.productsToCompeteArray) ||
            checkIsNull(data?.data?.productsToAttendArray)) &&
          !isLoading &&
          !isRefetching && (
            // true &&
            <View style={{marginBottom: moderateScaleVertical(24)}}>
              <Banners
                pcaEventList={data?.data?.pageantsWithActivePCA}
                nominationList={data?.data?.activeNominationsList}
                entryFeeList={data?.data?.productsToCompeteArray} // will be used in  sprint 24
                ticketList={data?.data?.productsToAttendArray} // will be used in  sprint 24
                publicProfileType={ProfileType.PAGEANT}
                businessId={data?.data?.pageant?.id}
                refetchAPI={refetch}
                voteNowButtonClicked={(item: ActivePcaEvent) => {
                  voteNowButtonPressed(item);
                }}
                onPressClickToComplete={onPressClickToComplete}
                onPressGetYourTicket={onPressGetYourTicket}
              />
            </View>
          )
        )}

        {checkIsNull(data?.data?.events) &&
          data?.data?.events !== undefined &&
          data?.data?.events?.data.length > 0 && (
            <EventList
              eventData={data?.data?.events?.data}
              pagentId={data?.data?.pageant?.id}
              forPublicPage={true}

            />
          )}

        {true && (
          <ShopList
            isHorizontal={true}
            profileId={route.params.profileId}
            name={route?.params?.name}
            isPageant={true}
          />
        )}

        {checkIsNull(data?.data?.galleries?.galleryList) && (
          <AlbumList
            data={data?.data?.galleries?.galleryList}
            url={PAGEANT_PUBLIC_PROFILE_ALL_ALBUM + route.params.profileId}
            navigation={navigation}
            subUrl={GET_PAGEANT_PUBLIC_PROFILE_SUB_GALLERY}
            itemType={SCREEN.PAGEANT_PUBLIC_PROFILE}
            profileId={route.params.profileId}
            isPublicProfileView={true}
            isPublicProfileAlbumImage={true}
            title={translations.ALBUMS}
            backgroundColor={color.WHITE}
          />
        )}

        {checkIsNull(data?.data?.bipAwardsArr?.data) && (
          <View style={styles.topSection}>
            <View style={styles.rowSection}>
              <Text style={styles.heading}> {translations.AWARDS} </Text>
              <TouchableOpacity
                style={styles.viewStyles}
                onPress={() => {
                  handleViewButtonClicked(
                    translations.AWARDS,
                    GET_PAGEANT_AWARDS,
                  );
                }}>
                <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
              </TouchableOpacity>
            </View>
            <AwardsList data={data?.data?.bipAwardsArr?.data} />
          </View>
        )}

        {checkIsNull(data?.data?.pageantStaff?.data) && (
          <AlbumList
            data={data?.data?.pageantStaff?.data}
            navigation={navigation}
            itemType={SCREEN.PAGEANT_PUBLIC_PROFILE}
            profileId={route.params.profileId}
            title={translations.STAFF}
            backgroundColor={color.WHITE}
          />
        )}

        {checkIsNull(data?.data?.communityPosts?.data) && (
          <CrownConvo
            crownConvoData={data?.data?.communityPosts?.data}
            navigation={navigation}
            pageantId={route.params.profileId}
            profileType={ProfileType.PAGEANT}
          />
        )}

        {!isLoading && (
          <Rules
            pageant={data?.data?.pageant}
            forPublicPage={true}
            bgColor={color.S_GRAY_1}
          />
        )}

        {checkIsNull(data?.data?.pageant?.description) && (
          <Bio
            heading={translations.ABOUT}
            text={data?.data?.pageant?.description}
            onViewMoreClick={onViewMoreClick}
            isAbout={true}
            numberOfLines={8}
          />
        )}
        <ViewMoreModal
          isModalVisible={viewMoreModalVisible}
          heading={translations.ABOUT}
          bodyText={data?.data?.pageant?.description}
          closeModal={setViewMoreModalVisible}
          // isReview={false}
        />
        <ViewPlanModal
          isPreviewModalVisible={isPreviewModalVisible}
          pageantPlanDetail={membershipPlans?.data}
          setIsPreviewModalVisible={setIsPreviewModalVisible}
        />

        {isTIcketsModalVisible && (
          <TicketsModal
            isModalVisible={isTIcketsModalVisible}
            setIsModalVisible={setIsTIcketsModalVisible}
            closeModel={() => {
              setIsTIcketsModalVisible(false);
              setIsTicketActive(false);
              setIsClickToCompleteActive(false);
              setselectedBannerData({});
            }}
            isClickToCompleteActive={isClickToCompleteActive}
            isTicketActive={isTicketActive}
            profileId={route?.params?.profileId}
            isPageant={true}
            selectedBannerdata={selectedBannerdata}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageantPublicProfile;
