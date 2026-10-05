import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {styles} from './styles';
import {toast, toastType, internetState} from '../../../../common/commonalert';
import translations from '../../../../../assets/translations';
import Header from '../../../../common/header';
import AppImages from '../../../../../assets/images/AppImages';
import {SCREEN} from '../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import {ProfileType} from '../../../../../services/constants';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {
  createFormData,
  formatPhoneNumber,
  keyBoardManager,
  onUnderDevlopment,
  openWebLink,
  trackScreenView,
} from '../../../../utils/helperFunction';
import {PageantDetailData} from '../../../../../services/models/pageantdetails/pageantDetailData';
import {
  GET_PAGEANT_AND_EVENT_DETAIL,
  UPLOADE_IMAGE,
  UPDATE_PAGENT_DESCRIPTION,
  GET_PAGEANT_PLAN,
  GET_PAGEANT_AWARDS,
} from '../../../../../services/endpoints';
import FastImageView from '../../../../../components/common/fastimageview';
import {
  REFESH_SCREEN,
  IMAGE_TYPE,
  ROLES,
  FLOATING_ICON,
  PARAM_VALUE,
  GALLERY_TYPE,
} from '../../../../utils/enum';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import ImagePickerModal from '../../../../common/imagepickermodal';
import CustomRatings from '../../../../common/customratings';
import FloatingButton from '../../../../common/floatingbutton';
import {UpgradPlan, Param} from '../../../../../services/constants';
import {PAGEANT_DETAIL_MENU_ID} from '../../../../dashboard/dashboard/pageantdashboard/pageantdetail/components/menu';
import {Base} from '../../../../../services/models/base';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
import useHtQuery from '../../../../../services/api/useHtQuery';
import PageantDetailMenu from './components/menu';
import PageantEventList from './eventlist';
import PageantRules from './pageantrules';
import {
  doesParaContainersURL,
  removeEmojis,
} from '../../../../utils/validations';
import UpgradePlanSlider from '../../../../common/upgradeplanslider';
import PeopleChoiceAward from './peoplechoiceawards';
import Gallery from '../../contestantdashboard/gallery';
import {MESSAGE_TYPE} from '../../../../common/localnotificationtoast';
import Shimmer from '../../../../common/shimmer';
import DetailShimmer from '../../../../common/shimmer/detailshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import PageantAdvertise from './advertise';
import {PlanData} from '../../../../../services/models/planData';
import RecruitContestant from './components/recruitcontestants';
import {useKeyboard} from '@react-native-community/hooks';
import Awards from './eventlist/eventdetail/awards';

const PageantDetail = ({route}) => {
  const setLoader = useSetLoader();
  const [eventImageUrl, setEventImageUrl] = useState('');
  const [eventWAllImageUrl, setWallEventImageUrl] = useState('');
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(
    PAGEANT_DETAIL_MENU_ID.EVENT,
  );
  const [selectedMenuTitle, setSelectedMenuTitle] = useState(
    translations.EVENTS,
  );
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [isRefreshingScreen, setRefreshingScreen] = useState(false);
  const [isAboutEditActive, setAboutEditActive] = useState(false);
  const [isPlanActive, setPlanActive] = useState(false);
  const [about, setAbout] = useState('');
  const [ageErr, setAgeErr] = useState('');
  const [isImagePickerId, setImagePickerId] = useState(-1);
  const [galleryCount, setGalleryCount] = useState(0);
  const [updateImageBody, setUpdateImageBody] = useState({});
  const [isFlatListScroolEnable, setFlatListScroolEnable] = useState(false);
  const {
    storeData: {refresh, rearrangeAlbumToast},
  } = useAppStore();
  const {keyboardShown} = useKeyboard();
  const setScreenRefresh = useSetScreenRefresh();

  //API GET PAGEANT DETAIL----------------------------------------- START
  const {
    data: pageantDetail,
    refetch,
    isLoading: isLoadingDetail,
    isFetching,
  } = useHtQuery<PageantDetailData>({
    key: GET_PAGEANT_AND_EVENT_DETAIL + route.params.pageantId,
    url: GET_PAGEANT_AND_EVENT_DETAIL + route.params.pageantId,
    offSuccessToast: true,
  });
  //API  GET PAGEANT DETAIL ----------------------------------------- END

  //API GET PAGEANT PLAN----------------------------------------- START
  const {
    data: pageantPlanDetail,
    isLoading: isLoadingPlanDetail,
    refetch: planRefetch,
    isRefetching: isRefetchPlanDetail,
  } = useHtQuery<PlanData>({
    key:
      GET_PAGEANT_PLAN +
      ProfileType.PAGEANT +
      Param.PROFILE_ID +
      route.params.pageantId,
    url:
      GET_PAGEANT_PLAN +
      ProfileType.PAGEANT +
      Param.PROFILE_ID +
      route.params.pageantId,
    offSuccessToast: true,
  });
  //API  GET PAGEANT PLAN ----------------------------------------- END

  //API GET IMAGES ----------------------------------------- START
  const {mutateAsync: uploadHeatShotImage} = useCgMutation<Base>({
    key: UPLOADE_IMAGE,
    url: UPLOADE_IMAGE,
    body: createFormData(updateImageBody),
    isJson: false,
    disableLoader: true,
    customHeader: {'Content-Type': 'multipart/form-data'},
  });
  //API UPLOAD IMAGES ----------------------------------------- START

  //API Update About ----------------------------------------- START
  const aboutRequestBody = {
    description: about + ''.trim(),
    id: route.params.pageantId,
  };
  const {mutateAsync: updateAbout} = useCgMutation<Base>({
    key: UPDATE_PAGENT_DESCRIPTION,
    url: UPDATE_PAGENT_DESCRIPTION,
    body: aboutRequestBody,
    disableLoader: true,
  });
  //API Update About ----------------------------------------- START

  useEffect(() => {
    keyBoardManager();
    if (route?.params?.pageantImageUrl !== undefined) {
      setEventImageUrl(route?.params?.pageantImageUrl);
    }
    planRefetch();
  }, []);

  useEffect(() => {
    if (
      route.params.tab !== undefined &&
      route.params.tab === PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT
    ) {
      setSelectedMenuTitle('');
      if (isPlanActive !== undefined && isPlanActive) {
        setSelectedMenuId(route.params.tab);
      } else {
        setSelectedMenuId(PAGEANT_DETAIL_MENU_ID.ADVERTISE);
      }
    } else if (
      route.params.tab !== undefined &&
      route.params.tab === PAGEANT_DETAIL_MENU_ID.ADVERTISE
    ) {
      setSelectedMenuTitle('');
      setSelectedMenuId(route.params.tab);
    }
  }, [isPlanActive]);

  useEffect(() => {
    if (pageantDetail !== null) {
      setRefreshingScreen(true);

      setEventImageUrl(
        pageantDetail?.data?.pageant_details?.main_image_full_url,
      );
      setWallEventImageUrl(
        pageantDetail?.data?.pageant_details.banner_image_full_url,
      );

      if (pageantDetail?.data?.pageant_details?.description?.length === 0) {
        if (route.params.tab === undefined) {
          setSelectedMenuId(
            pageantDetail?.data?.pageant_details?.status === PARAM_VALUE.ACTIVE
              ? PAGEANT_DETAIL_MENU_ID.EVENT
              : PAGEANT_DETAIL_MENU_ID.RULES,
          );
        }
        setSelectedMenuTitle(
          pageantDetail?.data?.pageant_details?.status === PARAM_VALUE.ACTIVE
            ? translations.EVENTS
            : translations.RULES,
        );
      }
      setAbout(pageantDetail?.data?.pageant_details?.description + '');
      setPlanActive(
        pageantDetail?.data?.advertisingBannerData?.is_active_advertiser ===
          UpgradPlan.YES,
      );

      setTimeout(() => {
        setRefreshingScreen(false);
      }, 100);
    }
  }, [pageantDetail]);

  const hideSubString = (value: string, pattern: string) => {
    let hideStringLength = '';
    let length = pattern.length;
    if (length > 10) {
      length = 10;
    }
    for (let index = 0; index < length; index++) {
      hideStringLength = hideStringLength + '*';
    }
    return value.replace(pattern, hideStringLength);
  };

  const getValidValue = (value: string) => {
    if (value === null || value === undefined || value.length === 0) {
      return value;
    }
    if (isPlanActive) {
      return value;
    } else {
      return hideSubString(value, value.substring(2, value.length));
    }
  };

  const imagePickerResult = (data: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      if (data.id === IMAGE_TYPE.BANNER_IMAGE) {
        setWallEventImageUrl(data.uri);
      } else if (data.id === IMAGE_TYPE.MAIN_IMAGE) {
        setEventImageUrl(data.uri);
      }
      uploadImage(data);
    }
    setImagePickerId(-1);
  };
  const openModel = (id: number) => {
    setImagePickerId(id);
    setIsModalVisible(true);
  };

  const uploadImage = async (data: any) => {
    setLoader(true);
    setUpdateImageBody({
      type: data.id,
      profile_image: data,
      pageant_id: pageantDetail?.data?.pageant_details.id,
    });
    await uploadHeatShotImage();
    await refetch();
    setLoader(true);
    setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);
  };
  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  const refeshScreenList = async () => {
    if (REFESH_SCREEN.PAGEANT_DETAIL === refresh) {
      setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    } else if (REFESH_SCREEN.ACTIVE_PAGEANT_EVENT_SECTION === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      setSelectedMenuId(PAGEANT_DETAIL_MENU_ID.EVENT);
      setSelectedMenuTitle(translations.EVENTS);
    }
  };

  const onMenuNavigationClick = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      switch (selectedMenuId) {
        case PAGEANT_DETAIL_MENU_ID.EVENT: {
          navigation.navigate(SCREEN.ADD_PAGENT_EVENT, {
            pageantDetail: pageantDetail?.data?.pageant_details,
            pageantPlanDetail: pageantPlanDetail.data,
          });
          break;
        }
        case PAGEANT_DETAIL_MENU_ID.RULES: {
          navigation.navigate(SCREEN.ADD_PAGENT_RULES, {
            pageantId: route.params.pageantId,
            isEditing: true,
            pageantDetail: pageantDetail?.data?.pageant_details,
          });

          break;
        }
        case PAGEANT_DETAIL_MENU_ID.TPP_PCA_ICON: {
          //

          break;
        }
        case PAGEANT_DETAIL_MENU_ID.ABOUT: {
          if (
            about.trim()?.length > 0 &&
            doesParaContainersURL(about?.trim())
          ) {
            setAboutEditActive(true);
            setAgeErr(translations.THIS_FILED_CANT_CONTAIN_A_LINK);
            return false;
          } else if (about?.trim()?.length > 0) {
            setAboutEditActive(!isAboutEditActive);
            if (
              isAboutEditActive &&
              about?.trim() !==
                pageantDetail?.data?.pageant_details?.description
            ) {
              updateAboutContent();
            }
          } else {
            setAboutEditActive(true);
            setAgeErr(translations.PLEASE_ENTER_DESCRIPTION);
          }
          Keyboard.dismiss();
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    }
  };

  const updateAboutContent = async () => {
    setLoader(true);
    setAgeErr('');
    await updateAbout();
    await refetch();
    setTimeout(() => {
      setSelectedMenuTitle(translations.ABOUT);
      setSelectedMenuId(PAGEANT_DETAIL_MENU_ID.ABOUT);
    }, 100);

    setLoader(false);
  };

  const onMenuClick = (title: string, id: number) => {
    if (
      id === PAGEANT_DETAIL_MENU_ID.EVENT ||
      id === PAGEANT_DETAIL_MENU_ID.RULES ||
      id === PAGEANT_DETAIL_MENU_ID.ABOUT ||
      id === PAGEANT_DETAIL_MENU_ID.GALLERY ||
      id === PAGEANT_DETAIL_MENU_ID.ADVERTISE ||
      id === PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT ||
      id === PAGEANT_DETAIL_MENU_ID.AWARD
    ) {
      if (
        id === PAGEANT_DETAIL_MENU_ID.GALLERY ||
        id === PAGEANT_DETAIL_MENU_ID.ADVERTISE ||
        id === PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT ||
        id === PAGEANT_DETAIL_MENU_ID.AWARD
      ) {
        setSelectedMenuTitle('');
      } else {
        setSelectedMenuTitle(title);
      }
      setSelectedMenuId(id);
    } else if (id === PAGEANT_DETAIL_MENU_ID.TPP_PCA_ICON) {
      if (!pageantDetail?.data?.pageant_details?.have_upcoming_events) {
        setSelectedMenuTitle(translations.START_A_PEOPLE_CHOICE_CONTEST);
        setSelectedMenuId(id);
      } else if (
        pageantDetail?.data?.pageant_details?.upcomingOrOngoingEventData
          ?.is_pca_activated === translations.NO_SMALL
      ) {
        navigation.navigate(SCREEN.PCA_FORM, {
          eventId:
            pageantDetail?.data?.pageant_details?.upcomingOrOngoingEventData
              ?.id,
          plan: pageantDetail?.data?.advertisingBannerData,
          parentImageUrl: eventImageUrl,
          parentBannerImageUrl: eventWAllImageUrl,
          parentWebsiteUrl: pageantDetail?.data?.pageant_details?.website + '',
          parentTitle: pageantDetail?.data?.pageant_details?.title,
          isCommingFormPagentDetails: true,
        });
      } else {
        setSelectedMenuId(id);
        setSelectedMenuTitle('');
      }
    } else if (id === PAGEANT_DETAIL_MENU_ID.VIEW_PUBLIC_PAGE) {
      if (pageantDetail?.data?.pageant_details?.status === PARAM_VALUE.ACTIVE) {
        navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE, {
          roleId: route.params.pageantId,
          profileId: route.params.pageantId,
          name: pageantDetail?.data?.pageant_details.title,
        });
      } else {
        toast(translations.PAGENT_PUBLIC_MSG_, toastType.SUCESS_TOAST);
        navigation.navigate(SCREEN.ADD_PAGENT_RULES, {
          pageantId: route.params.pageantId,
          isEditing: true,
          pageantDetail: pageantDetail?.data?.pageant_details,
        });
      }
    } else {
      onUnderDevlopment();
    }

    //reset About
    setGalleryCount(0);
    setAbout(pageantDetail?.data?.pageant_details?.description + '');
    setAboutEditActive(false);
    setAgeErr('');
    setMenuModalVisible(false);
    trackScreenView();
  };
  const onAddEventDetailClick = () => {
    setMenuModalVisible(true);
  };
  const moveToEditPageantDetail = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (!isLoadingDetail && !isLoadingPlanDetail) {
      setTimeout(() => {
        navigation.navigate(SCREEN.ADD_PAGEANT, {
          pageantEventDetail: pageantDetail?.data?.pageant_details,
          pageantId: route.params.pageantId,
          isEdit: true,
          pageantPlanDetail: pageantPlanDetail?.data,
          isPlanActive: pageantDetail?.data?.advertisingBannerData,
        });
      }, 200);
    }
  };

  const isDislayingPlan = () => {
    return (
      (!isPlanActive &&
        pageantDetail !== null &&
        pageantDetail?.data?.pageant_details?.website !== null &&
        getValidValue(pageantDetail?.data?.pageant_details?.website + '')
          .length > 0) ||
      (!isPlanActive &&
        pageantDetail !== null &&
        pageantDetail?.data?.pageant_details?.phone !== null &&
        getValidValue(pageantDetail?.data?.pageant_details?.phone + '').length >
          0)
    );
  };

  const onScrollScreen = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y > 250) {
      setFlatListScroolEnable(true);
    } else {
      setFlatListScroolEnable(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={pageantDetail?.data?.pageant_details.title}
          isUnderLineRequired
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps={'handled'}
          onScroll={onScrollScreen}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            {isLoadingDetail ? (
              <Shimmer
                width={Dimensions.get('window').width}
                height={moderateScaleVertical(160)}
                borderRadius={0}
              />
            ) : (
              <FastImageView
                width={Dimensions.get('window').width}
                height={moderateScaleVertical(160)}
                imageUrl={eventWAllImageUrl}
              />
            )}

            <View style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.editPageantDetailIcon}
                onPress={moveToEditPageantDetail}>
                <AppImages.Dashboard.edit_ICON width={18} height={18} />
              </TouchableOpacity>
              <Text style={styles.heading}>
                {pageantDetail?.data?.pageant_details.title}
              </Text>
              {isLoadingDetail ? (
                <DetailShimmer />
              ) : (
                <View style={styles.otherdetailcontainer}>
                  <CustomRatings
                    size={14}
                    fontSize={10}
                    ratingsValue={
                      pageantDetail?.data?.pageant_details?.average_rating
                    }
                    review_count={
                      pageantDetail?.data?.pageant_details?.rating_count
                    }
                  />
                </View>
              )}

              {pageantDetail?.data?.pageant_details?.website !== null && (
                <TouchableOpacity
                  onPress={() => {
                    if (
                      isPlanActive &&
                      pageantDetail?.data?.pageant_details?.website !==
                        undefined
                    ) {
                      openWebLink(
                        pageantDetail?.data?.pageant_details?.website,
                      );
                    }
                  }}>
                  <View style={styles.otherdetailcontainer}>
                    {isPlanActive ? (
                      <AppImages.PAGEANT_DETAIL.TPP_WEBSITE_ICON />
                    ) : (
                      <AppImages.Common.LOCK_ICON />
                    )}

                    <Text
                      style={
                        isPlanActive
                          ? styles.clickableLink
                          : styles.lifetimeParticipantLabel
                      }>
                      {getValidValue(
                        pageantDetail?.data?.pageant_details?.website.toLocaleLowerCase(),
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {pageantDetail?.data?.pageant_details?.phone !== undefined &&
                pageantDetail?.data?.pageant_details?.phone !== null &&
                pageantDetail?.data?.pageant_details?.phone?.toString().length >
                  0 && (
                  <View style={styles.otherdetailcontainer}>
                    {isPlanActive ? (
                      <AppImages.PAGEANT_DETAIL.TPP_CALL_ICON />
                    ) : (
                      <AppImages.Common.LOCK_ICON />
                    )}

                    <Text style={styles.lifetimeParticipantLabel}>
                      {isPlanActive
                        ? formatPhoneNumber(
                            pageantDetail?.data?.pageant_details?.phone + '',
                          )
                        : getValidValue(
                            pageantDetail?.data?.pageant_details?.phone + '',
                          )}
                    </Text>
                  </View>
                )}
              {selectedMenuId !== PAGEANT_DETAIL_MENU_ID.ADVERTISE &&
              !isPlanActive &&
              pageantDetail?.data?.advertisingBannerData !== undefined &&
              pageantPlanDetail !== undefined ? (
                <UpgradePlanSlider
                  plan={pageantDetail?.data?.advertisingBannerData}
                  isContentedAdd={isDislayingPlan()}
                  pageantId={route.params.pageantId}
                  pageantPlanDetail={pageantPlanDetail?.data}
                />
              ) : (
                <View
                  style={[
                    styles.upgradeButtonContainer,
                    {
                      height:
                        selectedMenuId ===
                        PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT
                          ? 0
                          : moderateScaleVertical(24),
                    },
                  ]}
                />
              )}

              {pageantDetail !== undefined ||
              selectedMenuId === PAGEANT_DETAIL_MENU_ID.TPP_PCA_ICON ? (
                <View style={styles.pageantDetailsArea}>
                  {selectedMenuTitle.length > 0 && (
                    <Text style={styles.name}>{selectedMenuTitle}</Text>
                  )}

                  <TouchableOpacity onPress={onMenuNavigationClick}>
                    {selectedMenuId === PAGEANT_DETAIL_MENU_ID.EVENT ? (
                      <AppImages.Dashboard.addPageant_ICON />
                    ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.RULES ? (
                      <AppImages.Dashboard.edit_ICON width={18} height={18} />
                    ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.ABOUT &&
                      !isAboutEditActive ? (
                      <AppImages.Dashboard.edit_ICON width={18} height={18} />
                    ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.ABOUT &&
                      isAboutEditActive ? (
                      <AppImages.Common.TICK_ICON width={18} height={18} />
                    ) : null}
                  </TouchableOpacity>
                </View>
              ) : null}

              {selectedMenuId === PAGEANT_DETAIL_MENU_ID.RULES &&
              pageantDetail?.data?.pageant_details.status !==
                PARAM_VALUE.ACTIVE ? (
                <View style={styles.inactiveMessageStyle}>
                  <Text style={styles.inactiveMessageLabel}>
                    {
                      translations.PLEASE_UPDARTE_PAGEANT_RULES_TO_MAKE_IT_ACTIVE
                    }
                  </Text>
                </View>
              ) : null}

              {selectedMenuId === PAGEANT_DETAIL_MENU_ID.EVENT &&
              pageantDetail?.data?.events !== undefined &&
              pageantDetail?.data?.events.length > 0 &&
              !isRefreshingScreen ? (
                <View style={styles.eventContainer}>
                  <PageantEventList
                    list={pageantDetail?.data?.events}
                    plan={pageantDetail?.data?.advertisingBannerData}
                    parentImageUrl={eventImageUrl}
                    parentBannerImageUrl={eventWAllImageUrl}
                    isFlatListScroolEnable={isFlatListScroolEnable}
                    parentWebsiteUrl={
                      pageantDetail?.data?.pageant_details?.website + ''
                    }
                    pageantPlanDetail={pageantPlanDetail?.data}
                    pageantDetail={pageantDetail?.data?.pageant_details}
                    parentTitle={pageantDetail?.data?.pageant_details?.title}
                  />
                </View>
              ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.RULES &&
                pageantDetail !== null &&
                pageantDetail?.data?.pageant_details !== undefined &&
                !isFetching ? (
                <PageantRules
                  rules={pageantDetail?.data?.pageant_details}
                  isActive={
                    pageantDetail?.data?.pageant_details?.status ===
                    PARAM_VALUE.ACTIVE
                  }
                />
              ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.ABOUT ? (
                <View style={styles.aboutRootContainer}>
                  <View style={styles.aboutContainer}>
                    <TextInput
                      style={styles.aboutValueText}
                      editable={isAboutEditActive}
                      multiline={true}
                      numberOfLines={3}
                      onChangeText={val => setAbout(removeEmojis(val))}
                      value={about + ''}
                    />
                  </View>
                  {!!ageErr && (
                    <View style={styles.row}>
                      <AppImages.Common.Alert_ICON />
                      <Text style={styles.error}> {ageErr} </Text>
                    </View>
                  )}
                </View>
              ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.TPP_PCA_ICON ? (
                <PeopleChoiceAward
                  pageantDetail={pageantDetail?.data?.pageant_details}
                />
              ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.GALLERY &&
                !isFetching ? (
                <View style={styles.tabContainer}>
                  <Gallery
                    param={
                      Param.PROFILE_TYPE +
                      ROLES.PAGEANT.toLocaleLowerCase() +
                      Param.PROFILE_ID +
                      route.params.pageantId
                    }
                    isFlatListScroolEnable={isFlatListScroolEnable}
                    galleryType={GALLERY_TYPE.PAGEANT_GALLERY}
                    title={translations.PAGEANT + ' ' + translations.GALLERY}
                    pageantId={route.params.pageantId}
                    pageantDetail={pageantDetail?.data?.pageant_details}
                    plan={pageantDetail?.data?.advertisingBannerData}
                    parentImageUrl={eventImageUrl}
                    parentBannerImageUrl={eventWAllImageUrl}
                    parentWebsiteUrl={
                      pageantDetail?.data?.pageant_details?.website + ''
                    }
                    parentTitle={pageantDetail?.data?.pageant_details?.title}
                    setGalleryCount={setGalleryCount}
                  />
                </View>
              ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.ADVERTISE &&
                pageantPlanDetail !== undefined &&
                !isLoadingPlanDetail &&
                !isRefetchPlanDetail ? (
                <PageantAdvertise
                  pageantPlanDetail={pageantPlanDetail?.data}
                  pageantId={route.params.pageantId}
                />
              ) : selectedMenuId === PAGEANT_DETAIL_MENU_ID.AWARD ? (
                <Awards
                  isFlatListScrollEnable={isFlatListScroolEnable}
                  url={GET_PAGEANT_AWARDS + route.params.pageantId}
                  isPageant={true}
                />
              ) : selectedMenuId ===
                PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT ? (
                <RecruitContestant
                  pageantId={route.params.pageantId}
                  pageantPlanDetail={pageantPlanDetail?.data}
                  contact_list_count={
                    pageantDetail?.data?.pageant_details?.my_leads_count
                  }
                  my_leads_count={
                    pageantDetail?.data?.pageant_details?.contact_list_count
                  }
                />
              ) : null}
            </View>

            {isLoadingDetail ? (
              <View style={styles.circleImageContainer}>
                <Shimmer
                  width={moderateScaleVertical(84)}
                  height={moderateScaleVertical(84)}
                  borderRadius={moderateScaleVertical(84)}
                />
              </View>
            ) : (
              <View style={styles.circleImageContainer}>
                <FastImageView
                  width={moderateScaleVertical(84)}
                  height={moderateScaleVertical(84)}
                  borderRadius={moderateScaleVertical(84)}
                  imageUrl={
                    pageantDetail?.data?.pageant_details?.main_image_full_url
                  }
                  isCircle
                />

                <TouchableOpacity
                  style={styles.editIconTouch}
                  onPress={() => {
                    openModel(IMAGE_TYPE.MAIN_IMAGE);
                  }}>
                  <AppImages.ProfileImage.Tpp_camera_icon
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.coverImage}
              onPress={() => {
                openModel(IMAGE_TYPE.BANNER_IMAGE);
              }}>
              <AppImages.ProfileImage.Tpp_camera_icon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {!isMenuModalVisible && !isLoadingDetail && !keyboardShown ? (
          <FloatingButton
            iconId={FLOATING_ICON.MENU}
            onPress={() => onAddEventDetailClick()}
            localMsg={
              rearrangeAlbumToast === 0 && galleryCount > 3
                ? translations.LONG_HOLD_THE_ALBUM_TO_REARRANGE_POSITION
                : ''
            }
            type={MESSAGE_TYPE.REARRANGE_ALBUM}
          />
        ) : null}

        <ImagePickerModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          onImageFound={imagePickerResult}
          hideModelEarly
          cropperCircleOverlay={isImagePickerId === IMAGE_TYPE.MAIN_IMAGE}
          id={isImagePickerId}
          note={
            isImagePickerId === IMAGE_TYPE.MAIN_IMAGE
              ? translations.FOR_BETTER_SIZE
              : translations.PAGEANT_BANNER
          }
        />
        <PageantDetailMenu
          isMenuModalVisible={isMenuModalVisible}
          setMenuModalVisible={setMenuModalVisible}
          selectedMenuId={selectedMenuId}
          onMenuClick={onMenuClick}
          isActivePageant={
            pageantDetail?.data?.pageant_details.status === PARAM_VALUE.ACTIVE
          }
          isAwardAvailable={
            pageantDetail?.data?.pageant_details?.bip_awards_count > 0
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PageantDetail;
