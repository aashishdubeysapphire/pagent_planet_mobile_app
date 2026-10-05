import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../../../../common/header';
import {styles} from './styles';
import {DIRECTORY_ID, REFESH_SCREEN, ROLES} from '../../../../../utils/enum';
import AppImages from '../../../../../../assets/images/AppImages';
import useHtQuery from '../../../../../../services/api/useHtQuery';
import {
  GET_EVENT_AWARDS,
  GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY,
  GET_PAGEANT_PLAN,
  PAGEANT_EVENT_PUBLIC_ALL_ALBUM,
  PAGEANT_EVENT_PUBLIC_DETAIL,
  PAGEANT_EVENT_PUBLIC_SLUG_DETAIL,
} from '../../../../../../services/endpoints';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import BasicDetails from '../components/basicdetail';
import translations from '../../../../../../assets/translations';
import {checkIsNull} from '../../../../../utils/validations';
import AlbumList from '../../expertcontestant/components/albumlist';
import Bio from '../../expertcontestant/components/bio';
import Rules from '../components/rules';
import {color} from '../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {PageantPublicProfileResponse} from '../../../../../../services/models/pageantdetails/pageantPublicProfile';
import TotalContestants from './components/totalcontestant';
import SponsorsList from './components/sponsors';
import AwardsList from '../../expertcontestant/components/awards';
import EventResultGridView from '../../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/resultaward/resultview/resultgridview';
import BannerSlider from '../../expertcontestant/components/bannerslider';
import {
  MethodTypes,
  ProfileType,
  Public_Profile,
} from '../../../../../../services/constants';
import Banners from '../components/banners';
import EventReviews from '../../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/reviews';
import {SCREEN} from '../../../../../../root/screenname';
import {
  createFirebaseLog,
  onShare,
  openWebLink,
  trackScreenView,
} from '../../../../../utils/helperFunction';
import JugdeEmceeList from './components/judgesemcees';
import Shimmer from '../../../../../common/shimmer';
import {ActivePcaEvent} from '../../../../../../services/models/pca/activePcaEvent';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../common/commonalert';
import CrownConvo from '../components/crownconvo';
import ActionButtons from '../../expertcontestant/components/actionbuttons';
import {UserContext} from '../../../../../../store/userStore';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {PlanData} from '../../../../../../services/models/planData';
import ViewPlanModal from '../../../../dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';
import ViewMoreModal from '../../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/viewmoremodal';
import {ANALYTICS_SCREEN} from '../../../../../../assets/translations/analyticsscreenname';
import TicketsModal from './components/ticketsmodal';
import ShopList from './components/shoplist';
const BANNER_TYPE = {
  TICKET: 'TICKET',
  COMPETE: 'COMPETE',
};
const EventPublicProfile = ({route}) => {
  const navigation = useNavigation();
  /** Universal links use `event/:slugId` (see linking.ts); in-app uses `eventId`. */
  const slugId = route.params?.slugId;
  const eventId = route.params?.eventId;
  const isFromDeepLinkSlug = slugId != null && String(slugId).trim() !== '';
  const eventPublicDetailUrl = isFromDeepLinkSlug
    ? PAGEANT_EVENT_PUBLIC_SLUG_DETAIL +
      encodeURIComponent(String(slugId).trim())
    : PAGEANT_EVENT_PUBLIC_DETAIL + eventId;

  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [prizeClicked, setPrizeClicked] = useState(false);
  const [isUpcomingeEvent, setUpcomingEvent] = useState(false);
  const [pcaBannerDetails, setPcaBannerDetails] = useState();
  const netInfo = useNetInfo();
  const [buttonArray, setEventButtonArray] = React.useState([]);
  const {
    storeData: {refresh},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();
  const {storeData} = useContext(UserContext);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isTIcketsModalVisible, setIsTIcketsModalVisible] = useState(false);
  const [isTicketActive, setIsTicketActive] = useState(false);
  const [isClickToCompleteActive, setIsClickToCompleteActive] = useState(false);
  const [selectedBannerdata, setselectedBannerData] = useState({});

  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- START
  const {data, isLoading, refetch, isRefetching} =
    useHtQuery<PageantPublicProfileResponse>({
      key: eventPublicDetailUrl,
      url: eventPublicDetailUrl,
      offSuccessToast: true,
    });

  const effectiveEventId =
    data?.data?.event?.id ?? (!isFromDeepLinkSlug ? eventId : undefined);

  const {data: membershipPlans, mutateAsync: getPlanDetails} =
    useCgMutation<PlanData>({
      key: GET_PAGEANT_PLAN,
      method: MethodTypes.GET,
      url: GET_PAGEANT_PLAN,
      disableLoader: true,
      offSuccessToast: true,
    });

  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE);
    getPlanDetails();
  }, []);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    createFirebaseLog(refeshScreen.name, SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE);
    if (
      REFESH_SCREEN.PUBLIC_PROFILE_EVENT === refresh ||
      REFESH_SCREEN.PAGEANT_EVENT_PROFILE === refresh
    ) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_PAGEANT);
    }
  };
  const onViewMoreClick = () => {
    createFirebaseLog(
      onViewMoreClick.name,
      SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
    );
    setViewMoreModalVisible(true);
  };

  const onPressWebsiteButton = (index: number) => {
    createFirebaseLog(
      onPressWebsiteButton.name,
      SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
    );
    if (checkIsNull(data?.data?.sponsers[index]?.link)) {
      openWebLink(data?.data?.sponsers[index]?.link);
    }
  };

  const handleViewButtonClicked = (name: string = '', url: string = '') => {
    createFirebaseLog(
      handleViewButtonClicked.name,
      SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
    );
    navigation.navigate(SCREEN.GRID_VIEWALL, {
      screenName: name,
      Url: url,
      contestantId: effectiveEventId ?? route?.params?.eventId,
      type: Public_Profile,
    });
  };
  const onPressShareIcon = () => {
    createFirebaseLog(
      onPressShareIcon?.name,
      SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
    );
    if (
      data?.data?.event?.share_link !== undefined &&
      data?.data?.event?.share_link !== null
    ) {
      onShare('' + data?.data?.event?.share_link, '');
    } else {
      toast(translations.LINK_NOT_FOUND, toastType.ERROR_TOAST);
    }
  };
  const moveToViewAllSponsorScreen = () => {
    createFirebaseLog(
      moveToViewAllSponsorScreen.name,
      SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
    );
    navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_SPONSORS, {
      eventId: effectiveEventId ?? route.params.eventId,
    });
  };

  useEffect(() => {
    let event_date = new Date(data?.data?.event?.start_date);
    let current_date = new Date();
    if (checkIsNull(event_date) && checkIsNull(current_date)) {
      if (current_date.getTime() > event_date.getTime()) {
        setUpcomingEvent(false);
      } else {
        setUpcomingEvent(true);
      }
    }
    if (data?.data?.is_pca_banner_display) {
      let pcaObj = [{title: route?.params?.name}];
      setPcaBannerDetails(pcaObj);
    } else {
      setPcaBannerDetails([]);
    }
    getActiveButtonList(data?.data);
  }, [data]);

  const getActiveButtonList = (dataList: PageantPublicProfileResponse) => {
    createFirebaseLog(
      getActiveButtonList.name,
      SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
    );
    const eventButtonList = [];
    if (
      dataList?.event?.owner_id !== ROLES.ADMIN_ID &&
      dataList?.event?.owner_id !== Number(storeData?.data?.user?.id) &&
      !dataList?.is_message_button_disable
    ) {
      eventButtonList.push(translations.MESSAGE);
    } else if (
      dataList?.event?.owner_id === ROLES.ADMIN_ID ||
      dataList?.event?.owner_id === Number(storeData?.data?.user?.id)
    ) {
      //show message disable for admin user or for user's own profile
    } else if (dataList?.is_message_button_disable) {
      eventButtonList.push(translations.UPGRADE_SMALL); //for unlock profiles ,who do not have membership
    }
    if (dataList?.product_total_count > 0) {
      eventButtonList.push(translations.SHOP);
    }
    if (dataList?.productsToAttend > 0) {
      eventButtonList.push(translations.ATTEND2);
    }
    if (dataList?.productsToCompete > 0) {
      eventButtonList.push(translations.COMPETE);
    }
    setEventButtonArray(eventButtonList);
  };

  const voteNowButtonPressed = (item: ActivePcaEvent) => {
    createFirebaseLog(
      voteNowButtonPressed.name,
      SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE,
    );
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT, {
        eventId: data?.data?.event?.id,
        key: new Date().getMilliseconds() + '',
        isPcaActivated: data?.data?.event?.is_pca_activated,
        isPageantCompleted: data?.data?.event?.is_pageant_completed,
        hideContestantLastName: data?.data?.event?.hide_contestant_last_name,
      });
    }
  };
  const setBannerTypeAndItem = (item, bannerType) => {
    if (bannerType == BANNER_TYPE.TICKET) {
      setselectedBannerData(item);
      setIsTicketActive(true);
      setIsTIcketsModalVisible(true);
    } else if (bannerType == BANNER_TYPE.COMPETE) {
      setselectedBannerData(item);
      setIsClickToCompleteActive(true);
      setIsTIcketsModalVisible(true);
    }
  };
  const onPressGetYourTicket = item => {
    setBannerTypeAndItem(item, BANNER_TYPE.TICKET);
  };

  const onPressClickToComplete = item => {
    setBannerTypeAndItem(item, BANNER_TYPE.COMPETE);
  };
  return (
    <SafeAreaView style={styles.topContainer}>
      <Header
        onPressRightIcon1={onPressShareIcon}
        isUnderLineRequired
        rightIcon1={<AppImages.PUBLIC_PROFILE.ShareIcon />}
        lable={route?.params?.name}
        fallbackToDashboardOnBack
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: moderateScaleVertical(40)}}>
        <View style={{paddingBottom: moderateScaleVertical(24)}}>
          <BasicDetails
            isLoadingDetail={isLoading}
            pageant={data?.data?.event}
            isDateVisible={true}
            isEventPublicPage={true}
            advertisingBannerData={data?.data?.advertisingBannerData}
          />
        </View>

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
            profileId={effectiveEventId ?? route.params.eventId}
            roleId={DIRECTORY_ID.PAGEANT}
            isEvent={true}
            setIsPreviewModalVisible={setIsPreviewModalVisible}
          />
        </View>

        {checkIsNull(data?.data?.pageantPrizes) &&
          data?.data?.is_prize_banner_display && (
            <>
              <TouchableOpacity
                style={{
                  ...styles.prizeClosed,
                  backgroundColor: prizeClicked ? color.S_PINK : color.S_GRAY_1,
                  marginBottom: prizeClicked
                    ? moderateScaleVertical(16)
                    : moderateScaleVertical(24),
                }}
                onPress={() => setPrizeClicked(!prizeClicked)}>
                <Text
                  style={{
                    ...styles.prizeTitle,
                    color: prizeClicked ? color.P_PINK : color.INPUT_TEXT,
                  }}>
                  {translations.VIEW_PRIZE_TITLE}
                </Text>
                <View
                  style={
                    prizeClicked ? styles.downArrowIcon : styles.arrowIcon
                  }>
                  {prizeClicked ? (
                    <AppImages.Dashboard.upArrow_ICON />
                  ) : (
                    <AppImages.Dashboard.downArrow_ICON />
                  )}
                </View>
              </TouchableOpacity>

              {prizeClicked && (
                <View
                  style={{
                    ...styles.prizeBannerArea,
                    marginBottom:
                      data?.data?.pageantPrizes?.length === 1 &&
                      !checkIsNull(pcaBannerDetails) &&
                      !checkIsNull(data?.data?.activeNominationList)
                        ? -moderateScaleVertical(20)
                        : 0,
                  }}>
                  <BannerSlider
                    prizeList={data?.data?.pageantPrizes}
                    showPrizes={true}
                  />
                </View>
              )}
            </>
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
          (checkIsNull(pcaBannerDetails) ||
            checkIsNull(data?.data?.activeNominationList) ||
            checkIsNull(data?.data?.productsForAttendEvent) ||
            checkIsNull(data?.data?.productsForCompeteEntryFees)) &&
          !isLoading &&
          !isRefetching && (
            // true &&
            <View
              style={{
                marginBottom: moderateScaleVertical(24),
                marginTop:
                  (prizeClicked && data?.data?.pageantPrizes?.length > 1) ||
                  !prizeClicked
                    ? 0
                    : -moderateScaleVertical(24),
              }}>
              <Banners
                pcaEventList={
                  data?.data?.is_pca_banner_display == true
                    ? [{title: route?.params?.name}]
                    : []
                }
                ticketList={data?.data?.productsForAttendEvent}
                entryFeeList={data?.data?.productsForCompeteEntryFees}
                nominationList={data?.data?.activeNominationList}
                publicProfileType={ProfileType.PAGEANT}
                businessId={data?.data?.event?.id}
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

        {checkIsNull(data?.data?.event?.address) && (
          <View
            style={{
              ...styles.topSection,
              backgroundColor: color.WHITE,
              paddingHorizontal: moderateScale(16),
              paddingTop: 0,
            }}>
            <Text style={styles.heading}> {translations.LOCATION} </Text>
            <View style={styles.locationSection}>
              <AppImages.Dashboard.LocationIcon
                width={moderateScale(11)}
                height={moderateScaleVertical(13)}
              />
              <Text style={styles.locationLabel}>
                {data?.data?.event?.address}
              </Text>
            </View>
          </View>
        )}

        {data?.data?.is_contestant_section_display &&
        checkIsNull(data?.data?.totalContestants?.data) ? (
          <TotalContestants
            contestantData={data?.data?.totalContestants?.data}
            itemSize={moderateScale(154)}
            eventID={effectiveEventId ?? route.params.eventId}
            eventDetail={data?.data?.event}
            toalNoOfContestant={data?.data?.totalContestants?.total}
          />
        ) : null}

        {effectiveEventId != null && (
          <ShopList
            isHorizontal={true}
            eventID={effectiveEventId}
            name={route?.params?.name}
          />
        )}
        {checkIsNull(data?.data?.galleryList) && (
          <AlbumList
            data={data?.data?.galleryList}
            url={PAGEANT_EVENT_PUBLIC_ALL_ALBUM + effectiveEventId}
            navigation={navigation}
            isPublicProfileView={true}
            isPublicProfileAlbumImage={true}
            subUrl={GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY}
            itemType={SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE}
            profileId={effectiveEventId ?? route.params.eventId}
            title={translations.ALBUMS}
            backgroundColor={color.WHITE}
          />
        )}

        {checkIsNull(data?.data?.pageantResults) && (
          <View style={styles.topSection}>
            <View
              style={{
                ...styles.rowSection,
                marginBottom: moderateScaleVertical(24),
              }}>
              <Text style={styles.heading}> {translations.RESULTS} </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_RESULT,
                    {
                      eventId: effectiveEventId ?? route.params.eventId,
                    },
                  );
                }}
                style={styles.viewStyles}>
                <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
              </TouchableOpacity>
            </View>
            <EventResultGridView
              horizontal={true}
              data={data?.data?.pageantResults}
              itemSize={moderateScale(154)}
              numberOfLinesForTitle={1}
              numberOfLinesForSubTitle={1}
            />
          </View>
        )}

        {checkIsNull(data?.data?.judgesAndEmcess) && (
          <JugdeEmceeList
            judgesEmceeData={data?.data?.judgesAndEmcess}
            eventId={data?.data?.event?.id}
          />
        )}

        {checkIsNull(data?.data?.sponsers) && (
          <View style={styles.topSection}>
            <View style={styles.rowSection}>
              <Text style={styles.heading}> {translations.SPONSORS} </Text>
              <TouchableOpacity
                style={styles.viewStyles}
                onPress={moveToViewAllSponsorScreen}>
                <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
              </TouchableOpacity>
            </View>
            <SponsorsList
              dataList={data?.data?.sponsers}
              buttonLabel={translations.VIEW_WEBSITE}
              itemSize={moderateScale(154)}
              numberOfLines={2}
              buttonImage={<AppImages.PUBLIC_PROFILE.GreyWebsiteIcon />}
              onButtonClick={(index: number) => {
                onPressWebsiteButton(index);
              }}
            />
          </View>
        )}

        {checkIsNull(data?.data?.awards?.data) && (
          <View style={{...styles.topSection, backgroundColor: color.WHITE}}>
            <View style={styles.rowSection}>
              <Text style={styles.heading}> {translations.AWARDS} </Text>
              <TouchableOpacity
                style={styles.viewStyles}
                onPress={() => {
                  handleViewButtonClicked(
                    translations.AWARDS,
                    GET_EVENT_AWARDS,
                  );
                }}>
                <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
              </TouchableOpacity>
            </View>
            <AwardsList data={data?.data?.awards?.data} />
          </View>
        )}

        {checkIsNull(data?.data?.communityPosts?.data) && (
          <CrownConvo
            crownConvoData={data?.data?.communityPosts?.data}
            navigation={navigation}
            pageantId={effectiveEventId ?? route.params.eventId}
            profileType={ProfileType.EVENT}
          />
        )}

        {!isLoading && (
          <Rules pageant={data?.data?.event} bgColor={color.S_GRAY_1} />
        )}

        {checkIsNull(data?.data?.event?.description) && (
          <Bio
            heading={translations.ABOUT}
            text={data?.data?.event?.description}
            onViewMoreClick={onViewMoreClick}
            isAbout={true}
            numberOfLines={8}
          />
        )}

        {/* {data?.data?.event?.is_verified !== translations.YES && (
          <View style={styles.carouselContainer}>
            <FastImage
              style={styles.image}
              source={AppImages.PUBLIC_PROFILE.CompeteNowBanner}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.headerSection}>
              <Text style={styles.headerTitle} numberOfLines={2}>
                {translations.I_WANT_TO_COMPETE_IN_THIS_PAGEANT}
              </Text>
              <TouchableOpacity
                style={styles.buttonAreaStyles}
                onPress={() => onUnderDevlopment()}>
                <Text style={styles.buttonStyles} numberOfLines={1}>
                  {translations.COMPETE_NOW}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */}

        {checkIsNull(data?.data?.event) && !isLoading && !isRefetching ? (
          <View style={{marginTop: moderateScaleVertical(24)}}>
            <EventReviews
              isFlatListScroolEnable={false}
              eventId={data?.data?.event?.id}
              enableReply={false}
              isDirector={'No'}
              showWriteReviewOption={true}
              upcomingEvent={isUpcomingeEvent}
              publicProfile={true}
            />
          </View>
        ) : (
          (isLoading || isRefetching) && (
            <ShimmerList
              width={width - moderateScale(24)}
              height={moderateScaleVertical(140)}
              padding={16}
              numColumns={1}
            />
          )
        )}

        <ViewMoreModal
          isModalVisible={viewMoreModalVisible}
          heading={translations.ABOUT}
          bodyText={data?.data?.event?.description}
          closeModal={setViewMoreModalVisible}
          isReview={false}
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
            }}
            isClickToCompleteActive={isClickToCompleteActive}
            isTicketActive={isTicketActive}
            pageantId={selectedBannerdata?.id}
            selectedBannerdata={selectedBannerdata}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventPublicProfile;
