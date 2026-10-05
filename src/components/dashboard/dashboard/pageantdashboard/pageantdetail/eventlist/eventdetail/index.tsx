import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Keyboard,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {styles} from './styles';
import {
  toast,
  toastType,
  internetState,
} from '../../../../../../common/commonalert';
import translations from '../../../../../../../assets/translations';
import Header from '../../../../../../common/header';
import AppImages from '../../../../../../../assets/images/AppImages';
import {
  REFESH_SCREEN,
  IMAGE_TYPE,
  PARAM_VALUE,
  GALLERY_TYPE,
  FLOATING_ICON,
  SELL_PRODUCT,
} from '../../../../../../utils/enum';

import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import useAppStore, {
  useSetScreenRefresh,
  useSetLoader,
} from '../../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {
  createFormData,
  formatPhoneNumber,
  onUnderDevlopment,
  keyBoardManager,
  openWebLink,
} from '../../../../../../utils/helperFunction';
import {
  UPLOADE_IMAGE,
  GET_PAGEANT_AND_EVENT_DETAIL,
  UPDATE_PAGENT_DESCRIPTION,
  GET_AGE_DIVISION_BY_EVENTS,
  UPDATE_EVENT_SHOW_HIDE_EVENT,
  GET_PAGEANT_PLAN,
  GET_EVENT_BIP_AWARDS,
} from '../../../../../../../services/endpoints';
import {Base} from '../../../../../../../services/models/base';
import EventDetailMenu, {EVENT_DETAIL_MENU_ID} from './components/menu';
import FastImageView from '../../../../../../common/fastimageview';
import ImagePickerModal from '../../../../../../common/imagepickermodal';
import {useNetInfo} from '@react-native-community/netinfo';
import CustomRatings from '../../../../../../common/customratings';
import FloatingButton from '../../../../../../common/floatingbutton';
import {
  getDateFormat,
  TIME_FORMAT,
} from '../../../../../../utils/datetimemanger';
import {Pageant} from '../../../../../../../services/models/pageantdetails/pageant';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {PageantDetailData} from '../../../../../../../services/models/pageantdetails/pageantDetailData';
import {
  height,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import UpgradePlanSlider from '../../../../../../common/upgradeplanslider';
import {
  UpgradPlan,
  Param,
  ProfileType,
} from '../../../../../../../services/constants';
import {
  checkIsNull,
  doesParaContainersURL,
  isValueNull,
  removeEmojis,
} from '../../../../../../utils/validations';
import EventJudgesEmcees from './judgesemcees';
import {AgeDivision} from '../../../../../../../services/models/pageantdetails/ageDivision';
import ContestantsAndGroups from './contestantgroups';
import EventReviews from './reviews';
import Awards from './awards';
import Gallery from '../../../../contestantdashboard/gallery';
import PeopleChoiceAndPrize from '../../peoplechoiceawards/pcaandprize';
import {MESSAGE_TYPE} from '../../../../../../common/localnotificationtoast';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import Todos from './todos';
import Shimmer from '../../../../../../common/shimmer';
import ResultsAwards from './resultaward';
import WarningModel from '../../../../../../common/warningmodel';
import {PlanData} from '../../../../../../../services/models/planData';
import {MethodTypes} from '../../../../../../../services/constants';
import {useKeyboard} from '@react-native-community/hooks';

const EventDetail = ({route}) => {
  const setLoader = useSetLoader();
  const [hideunhideEventModal, setHideunhideEventModal] = useState(false);
  const [selectedMenuTitle, setSelectedMenuTitle] = useState(
    route.params.tabTitle !== undefined ? route.params.tabTitle : '',
  );
  const [pricePackage, setPricePackage] = useState('');
  const [pricePackageErr, setPricePckageErr] = useState('');
  const [eventImageUrl, setEventImageUrl] = useState('');
  const [eventWAllImageUrl, setWallEventImageUrl] = useState('');
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [isAboutEditActive, setPricePackageEditActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [isPlanActive, setPlanActive] = useState(false);
  const [isImagePickerId, setImagePickerId] = useState(-1);
  const [updateImageBody, setUpdateImageBody] = useState({});
  const [resultButtonClicked, setResultButtonClicked] = useState(true);
  const [isFlatListScroolEnable, setFlatListScroolEnable] = useState(false);
  const [galleryCount, setGalleryCount] = useState(0);
  const [eventDetail, setEventDetail] = useState<Pageant | undefined>(
    route.params.pageantEventDetail,
  );
  const [isModalAddResultVisible, setIsModalAddResultVisible] = useState(false);
  const [itemSize, setItemSize] = useState(Number);
  const [selectedMenuId, setSelectedMenuId] = useState(
    route.params.tab !== undefined
      ? route.params.tab
      : EVENT_DETAIL_MENU_ID.CONTESTANTS,
  );
  const {
    storeData: {refresh, rearrangeAlbumToast},
  } = useAppStore();
  const [selectedTodoTab, setSelectedToDoTab] = useState(1); //1 for Director's Timelne  2 for Contetsant schedule.
  const {keyboardShown} = useKeyboard();

  //API GET PAGEANT DETAIL----------------------------------------- START
  const {
    data: pageantEventDetail,
    refetch,
    isLoading: isEventDetailloading,
    isFetching: isRefetchingDetail,
  } = useHtQuery<PageantDetailData>({
    key: GET_PAGEANT_AND_EVENT_DETAIL + route?.params?.pageantEventDetailId,
    url: GET_PAGEANT_AND_EVENT_DETAIL + route?.params?.pageantEventDetailId,
    offSuccessToast: true,
  });
  //API  GET PAGEANT DETAIL ----------------------------------------- END

  //API UPLOAD IMAGES ----------------------------------------- START
  const {mutateAsync: uploadHeatShotImage} = useCgMutation<Base>({
    key: UPLOADE_IMAGE,
    url: UPLOADE_IMAGE,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
  });
  //API UPLOAD IMAGES ----------------------------------------- START
  const {data: pageantPlanDetail, mutateAsync: getPlanDetail} =
    useCgMutation<PlanData>({
      key:
        GET_PAGEANT_PLAN +
        ProfileType.PAGEANT +
        Param.PROFILE_ID +
        pageantEventDetail?.data?.pageant_details?.master_pageant_id,
      url:
        GET_PAGEANT_PLAN +
        ProfileType.PAGEANT +
        Param.PROFILE_ID +
        pageantEventDetail?.data?.pageant_details?.master_pageant_id,
      method: MethodTypes.GET,
      offSuccessToast: true,
    });
  //API Update Price Package ----------------------------------------- START
  const pricePackageRequestBody = {
    description: pricePackage + ''.trim(),
    id: route?.params?.pageantEventDetailId,
  };
  const {mutateAsync: updatePricePackageRequest} = useCgMutation<Base>({
    key: UPDATE_PAGENT_DESCRIPTION,
    url: UPDATE_PAGENT_DESCRIPTION,
    body: pricePackageRequestBody,
    disableLoader: true,
  });
  //API Update Price Package ----------------------------------------- START

  //API Age Division ----------------------------------------- START
  const {
    data: ageDivisionList,
    isLoading,
    refetch: refetchAgeDivisionAPI,
    isFetching: isAgeDivisionFetching,
  } = useHtQuery<AgeDivision[]>({
    key: GET_AGE_DIVISION_BY_EVENTS + route?.params?.pageantEventDetailId,
    url: GET_AGE_DIVISION_BY_EVENTS + route?.params?.pageantEventDetailId,
    offSuccessToast: true,
  });
  //API Age Division  ----------------------------------------- END

  /* The above code is using the useEffect hook to call the keyBoardManager function and set the
eventImageUrl state to the route params. */
  useEffect(() => {
    keyBoardManager();
    if (route?.params?.pageantImageUrl !== undefined) {
      setEventImageUrl(route?.params?.pageantImageUrl);
    }
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  useEffect(() => {
    setPlanActive(route?.params?.plan?.is_active_advertiser === UpgradPlan.YES);
    if (!isEventDetailloading || !isRefetchingDetail) {
      displayScreenValues();
      getPlanDetailPageant();
    } else {
      if (
        eventDetail !== undefined &&
        eventDetail?.main_image_full_url !== undefined
      ) {
        setEventImageUrl(eventDetail?.main_image_full_url + '');
        setWallEventImageUrl(eventDetail?.banner_image_full_url + '');
      } else {
        if (route?.params?.parentImageUrl !== undefined) {
          setEventImageUrl(route?.params?.parentImageUrl);
          setWallEventImageUrl(route.params.parentBannerImageUrl);
        }
      }
    }
  }, [isEventDetailloading, isRefetchingDetail]);
  const getPlanDetailPageant = async () => {
    if (pageantPlanDetail === undefined) {
      await getPlanDetail();
    }
  };
  const displayScreenValues = () => {
    if (pageantEventDetail !== null) {
      setEventDetail(pageantEventDetail?.data?.pageant_details);
      displayLogoImageOfEVent();
      displayBannerImageOfEVent();
      if (
        pageantEventDetail?.data?.pageant_details?.description !== undefined &&
        pageantEventDetail?.data?.pageant_details?.description !== null
      ) {
        setPricePackage(pageantEventDetail?.data?.pageant_details?.description);
      }

      if (selectedMenuId === -1) {
        activeMenuOption();
      }
    }
  };

  const displayBannerImageOfEVent = () => {
    if (
      (pageantEventDetail?.data?.pageant_details?.banner_image_full_url ===
        undefined &&
        route.params.parentBannerImageUrl !== undefined) ||
      (pageantEventDetail?.data?.pageant_details?.banner_image_full_url ===
        null &&
        route.params.parentBannerImageUrl !== undefined) ||
      (pageantEventDetail?.data?.pageant_details?.banner_image === null &&
        route.params.parentBannerImageUrl !== undefined)
    ) {
      if (eventWAllImageUrl.includes('http')) {
        setWallEventImageUrl(route.params.parentBannerImageUrl);
      } else {
        setWallEventImageUrl(
          '' + pageantEventDetail?.data?.pageant_details?.banner_image_full_url,
        );
      }
    } else {
      setTimeout(() => {
        setWallEventImageUrl(
          pageantEventDetail?.data?.pageant_details?.banner_image_full_url + '',
        );
      }, 1000);
    }
  };

  const displayLogoImageOfEVent = () => {
    if (
      pageantEventDetail?.data?.pageant_details?.main_image_full_url !==
        undefined &&
      pageantEventDetail?.data?.pageant_details?.main_image_full_url !== null
    ) {
      setEventImageUrl(
        pageantEventDetail?.data?.pageant_details?.main_image_full_url + '',
      );
    } else if (route?.params?.parentImageUrl !== undefined) {
      setEventImageUrl(route?.params?.parentImageUrl);
    }
  };

  const activeMenuOption = () => {
    //
  };

  /**
   * It sets the imagePickerId to the id passed in and sets the isModalVisible to true.
   * @param {number} id - The id of the image picker.
   */
  const openModel = (id: number) => {
    setImagePickerId(id);
    setIsModalVisible(true);
  };

  /**
   * It takes a string and a pattern and returns a new string with the pattern replaced by a string of
   * asterisks
   * @param {string} value - The string that you want to hide a substring from.
   * @param {string} pattern - The pattern to be hidden.
   * @returns A function that takes two parameters, value and pattern.
   */
  const hideSubString = (value: string, pattern: string) => {
    let hideLength = '';
    let length = pattern.length;
    if (length > 10) {
      length = 10;
    }
    for (let index = 0; index < length; index++) {
      hideLength = hideLength + '*';
    }
    return value.replace(pattern, hideLength);
  };

  /**
   * It returns the value if it's not null, undefined, or empty. If it is, it returns the value
   * @param {string} value - The value of the field.
   * @returns The value is being returned.
   */
  const getValidValue = (value: string) => {
    if (
      value === null ||
      value === undefined ||
      value.length === 0 ||
      value === 'null'
    ) {
      return '';
    }
    if (isPlanActive) {
      return value;
    } else {
      return hideSubString(
        value.toLocaleLowerCase(),
        value.substring(2, value.length).toLocaleLowerCase(),
      );
    }
  };

  /**
   * A callback function that is called when the user selects an image from the image picker.
   * @param {any} data - The image data.
   * @returns The imagePickerResult function is being returned.
   */
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

  /**
   * When the user clicks the "Add Event Detail" button, the menu modal is set to visible
   */
  const onAddEventDetailClick = () => {
    setMenuModalVisible(true);
  };

  /**
   * It uploads an image to the server.
   * @param {any} data - any - this is the image data that is returned from the image picker.
   */
  const uploadImage = async (data: any) => {
    setUpdateImageBody({
      type: data.id,
      profile_image: data,
      pageant_id: route?.params?.pageantEventDetailId,
    });
    await uploadHeatShotImage();
    await refetch();
    setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
  };

  useEffect(() => {
    setTimeout(() => {
      refeshScreenList();
    }, 500);
  }, [refresh]);

  /**
   * A function that is called when the user clicks on the "Refresh" button.
   */
  const refeshScreenList = async () => {
    await refetch();
    if (REFESH_SCREEN.PAGEANT_EVENT_DETAIL === refresh) {
      setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
    } else if (REFESH_SCREEN.UPDATE_EVENT_DETAIL_AGE_DIVISIONS === refresh) {
      refetchAgeDivisionAPI();
      setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
      setScreenRefresh(REFESH_SCREEN.NONE);
    } else if (REFESH_SCREEN.ACTIVATE_PCA_EVENT_SECTION === refresh) {
      setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
      setTimeout(() => {
        setSelectedMenuId(EVENT_DETAIL_MENU_ID.PEOPLE_CHOICE_AWARD);
      }, 600);
    }
  };

  /**
   * A function that is called when a user clicks on a menu item.
   */
  const onMenuNavigationClick = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (selectedMenuId === EVENT_DETAIL_MENU_ID.PRICE_PACKAGE) {
      if (
        pricePackage.trim()?.length > 0 &&
        doesParaContainersURL(pricePackage?.trim())
      ) {
        setPricePackageEditActive(true);
        setPricePckageErr(translations.THIS_FILED_CANT_CONTAIN_A_LINK);
        return false;
      } else if (pricePackage?.trim()?.length > 0) {
        setPricePackageEditActive(!isAboutEditActive);
        if (
          isAboutEditActive &&
          pricePackage?.trim() !==
            pageantEventDetail?.data?.pageant_details?.description
        ) {
          updatePricePackageContent();
        }
      } else {
        setPricePackageEditActive(true);
        if (isAboutEditActive) {
          setPricePckageErr(translations.PLEASE_ENTER_PRIZE_PACKAGE);
        }
      }
      Keyboard.dismiss();
    }
  };

  /**
   * It updates the price package content and then refetches the data and then sets the selected menu
   * title and id
   */
  const updatePricePackageContent = async () => {
    setLoader(true);
    setPricePckageErr('');
    await updatePricePackageRequest();
    await refetch();
    setTimeout(() => {
      setSelectedMenuTitle(translations.PRIZE_PACKAGE);
      setSelectedMenuId(EVENT_DETAIL_MENU_ID.PRICE_PACKAGE);
    }, 100);
    setLoader(false);
  };

  /**
   * OnMenuClick is a function that takes in two parameters, title and id, and returns nothing
   * @param {string} title - string - The title of the menu item
   * @param {number} id - The id of the menu item.
   */
  const onMenuClick = (title: string, id: number) => {
    if (
      id === EVENT_DETAIL_MENU_ID.RESULTS_AND_AWARDS ||
      id === EVENT_DETAIL_MENU_ID.PRICE_PACKAGE ||
      id === EVENT_DETAIL_MENU_ID.REVIEWS ||
      id === EVENT_DETAIL_MENU_ID.JUDGES_EMCEES ||
      id === EVENT_DETAIL_MENU_ID.CONTESTANTS ||
      id === EVENT_DETAIL_MENU_ID.AWARD ||
      id === EVENT_DETAIL_MENU_ID.GALLERY ||
      id === EVENT_DETAIL_MENU_ID.EVENT_MANAGER
    ) {
      if (id === EVENT_DETAIL_MENU_ID.JUDGES_EMCEES) {
        setScreenRefresh(REFESH_SCREEN.JUDDGE_AND_EMCEES);
      } else if (id === EVENT_DETAIL_MENU_ID.EVENT_MANAGER) {
        setSelectedToDoTab(1);
      }
      setSelectedMenuTitle(title);
      setSelectedMenuId(id);
    } else if (id === EVENT_DETAIL_MENU_ID.SELL_TICKETS_ENTRY_FEE) {
      navigation.navigate(SCREEN.SELL_TWO_STEP, {
        categery: {
          id: SELL_PRODUCT.TICKETS_ENTRY,
          name: translations.SELL_TICKETS_ENTRY_FEES.replace('Sell', ''),
        },
      });
    } else if (id === EVENT_DETAIL_MENU_ID.PEOPLE_CHOICE_AWARD) {
      if (
        pageantEventDetail?.data?.pageant_details?.is_pca_activated ===
        translations.YES
      ) {
        setSelectedMenuId(id);
      } else {
        navigation.navigate(SCREEN.PCA_FORM, {
          eventId: route?.params?.pageantEventDetailId,
          isCommingFormPagentDetails: true,
        });
      }
    } else if (id === EVENT_DETAIL_MENU_ID.VIEW_PUBLIC_PAGE) {
      if (eventDetail?.status === PARAM_VALUE.ACTIVE) {
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: route?.params?.pageantEventDetailId,
          name: eventDetail?.title,
        });
      } else {
        toast(translations.EVENT_PUBLIC_MSG, toastType.SUCESS_TOAST);
        navigation.navigate(SCREEN.ADD_PAGENT_EVENT, {
          isEditting: true,
          pageantDetail: pageantEventDetail?.data?.pageant_details,
          pageantPlanDetail: pageantPlanDetail.data,
        });
      }
    } else {
      onUnderDevlopment();
    }
    //reset About
    if (
      pageantEventDetail?.data?.pageant_details?.description !== undefined &&
      pageantEventDetail?.data?.pageant_details?.description !== null
    ) {
      setPricePackage(
        isValueNull(pageantEventDetail?.data?.pageant_details?.description),
      );
    }
    setGalleryCount(0);
    setPricePackageEditActive(false);
    setPricePckageErr('');
    setMenuModalVisible(false);
  };

  /* A functional component that returns a view. */
  const TabHeader = () => {
    return (
      <View
        style={[
          styles.pageantDetailsArea,
          {
            marginTop:
              selectedMenuId === EVENT_DETAIL_MENU_ID.GALLERY
                ? moderateScaleVertical(20)
                : moderateScaleVertical(8),
          },
        ]}>
        {selectedMenuId === EVENT_DETAIL_MENU_ID.PRICE_PACKAGE ? (
          <Text style={styles.name}>{selectedMenuTitle}</Text>
        ) : null}
        <TouchableOpacity onPress={onMenuNavigationClick}>
          {selectedMenuId === EVENT_DETAIL_MENU_ID.PRICE_PACKAGE &&
          !isAboutEditActive ? (
            <AppImages.Dashboard.edit_ICON width={18} height={18} />
          ) : selectedMenuId === EVENT_DETAIL_MENU_ID.PRICE_PACKAGE &&
            isAboutEditActive ? (
            <AppImages.Common.TICK_ICON width={18} height={18} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  /* A functional component that returns a view. */
  const EventStartEndDate = () => {
    return (
      <View>
        {eventDetail?.start_date !== null && eventDetail?.end_date !== null ? (
          <View>
            <View style={styles.otherdetailcontainer}>
              <AppImages.Dashboard.DateIconMedium_ICON />

              <Text style={styles.lifetimeParticipantLabel}>
                {getDateFormat(
                  eventDetail?.start_date,
                  TIME_FORMAT.MMM_SPACE_DD,
                ) +
                  ' - ' +
                  getDateFormat(
                    eventDetail?.end_date,
                    TIME_FORMAT.MMM_SPACE_DD_COMMA_YYYYY,
                  )}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  /* A functional component that is returning a view. */
  const EventWebSite = () => {
    return (
      <View>
        {(eventDetail?.website !== undefined &&
          eventDetail?.website !== null) ||
        (route.params.parentWebsiteUrl !== undefined &&
          route.params.parentWebsiteUrl !== null &&
          route.params?.parentWebsiteUrl !== 'null') ? (
          <TouchableOpacity
            onPress={() => {
              if (
                (isPlanActive && eventDetail?.website !== undefined) ||
                (isPlanActive && route.params.parentWebsiteUrl !== undefined)
              ) {
                openWebLink(
                  eventDetail?.website === null
                    ? route.params.parentWebsiteUrl.toLowerCase()
                    : eventDetail?.website + ''.toLowerCase(),
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
                  eventDetail?.website === null
                    ? route.params.parentWebsiteUrl.toLowerCase()
                    : eventDetail?.website?.toLowerCase() + '',
                )}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const onScrollScreen = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y > (height * 15) / 100) {
      setFlatListScroolEnable(true);
    } else {
      setFlatListScroolEnable(false);
    }
  };

  const isDislayingPlan = () => {
    return (
      (!isPlanActive &&
        getValidValue(
          eventDetail?.phone === null
            ? route.params.pageantEventDetail?.phone
            : eventDetail?.phone + '',
        )?.length > 0) ||
      (!isPlanActive &&
        getValidValue(
          eventDetail?.website === null
            ? route.params.parentWebsiteUrl
            : eventDetail?.website,
        )?.length > 0)
    );
  };

  const onPageantTilteClick = () => {
    if (route?.params?.pageantDetail?.status === PARAM_VALUE.ACTIVE) {
      navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE, {
        profileId: route?.params?.pageantDetail.id,
        name: route.params.pageantDetail.title,
      });
    } else {
      toast(translations.PAGENT_PUBLIC_MSG, toastType.SUCESS_TOAST);
      navigation.navigate(SCREEN.ADD_PAGENT_RULES, {
        pageantId: route?.params?.pageantDetail?.id,
        isEditing: true,
        pageantDetail: route?.params?.pageantDetail,
      });
    }
  };
  const {mutateAsync: updateEventShowHide} = useCgMutation<Base>({
    key: UPDATE_EVENT_SHOW_HIDE_EVENT,
    url: UPDATE_EVENT_SHOW_HIDE_EVENT,
    body: {
      event_id: route?.params?.pageantEventDetailId,
      event_hide_show_status:
        pageantEventDetail?.data?.pageant_details?.event_pb_hide_show_status ===
        1
          ? 0
          : 1,
    },
    disableLoader: true,
  });

  const onConfirmHideUnhideEvent = async () => {
    setLoader(true);
    let res = await updateEventShowHide();
    if (res.success) {
      await refetch();
    }
    setLoader(false);
  };

  const conditionalRenderindViewAsPerSelectedMenuId = () => {
    switch (selectedMenuId) {
      case EVENT_DETAIL_MENU_ID.RESULTS_AND_AWARDS:
        return (
          <View>
            {ageDivisionList?.data !== undefined &&
              !isLoading &&
              !isEventDetailloading &&
              !isAgeDivisionFetching && (
                <ResultsAwards
                  eventTitle={eventDetail?.title}
                  eventId={route?.params?.pageantEventDetailId}
                  isFlatListScroolEnable={isFlatListScroolEnable}
                  ageDivisionList={ageDivisionList?.data}
                  eventTenseStatus={
                    pageantEventDetail?.data?.pageant_details
                      ?.event_tense_status
                  }
                  addedResultCount={
                    pageantEventDetail?.data?.pageant_details
                      ?.event_result_count
                  }
                  activeTabState={resultButtonClicked}
                  tabSetter={setResultButtonClicked}
                  setIsModalAddResultVisible={setIsModalAddResultVisible}
                  isModalAddResultVisible={isModalAddResultVisible}
                />
              )}
          </View>
        );

      case EVENT_DETAIL_MENU_ID.PRICE_PACKAGE:
        return (
          <View style={styles.aboutRootContainer}>
            <View style={styles.aboutContainer}>
              <TextInput
                style={styles.aboutValueText}
                editable={isAboutEditActive}
                multiline={true}
                numberOfLines={3}
                onChangeText={val => setPricePackage(removeEmojis(val))}
                value={pricePackage + ''}
              />
            </View>
            {!!pricePackageErr && (
              <View style={styles.row}>
                <AppImages.Common.Alert_ICON />
                <Text style={styles.error}> {pricePackageErr} </Text>
              </View>
            )}
          </View>
        );

      case EVENT_DETAIL_MENU_ID.CONTESTANTS:
        return (
          <View>
            {ageDivisionList?.data !== undefined &&
            !isLoading &&
            !isAgeDivisionFetching ? (
              <ContestantsAndGroups
                eventTitle={eventDetail?.title}
                eventId={route?.params?.pageantEventDetailId}
                isFlatListScroolEnable={isFlatListScroolEnable}
                ageDivisionList={ageDivisionList?.data}
                callAgeDivisionAPI={refetchAgeDivisionAPI}
                eventTenseStatus={
                  pageantEventDetail?.data?.pageant_details?.event_tense_status
                }
                setSelectedMenuId={setSelectedMenuId}
                setSelectedToDoTab={setSelectedToDoTab}
              />
            ) : (
              <ShimmerList
                width={itemSize}
                height={itemSize}
                padding={15}
                numColumns={2}
              />
            )}
          </View>
        );

      case EVENT_DETAIL_MENU_ID.JUDGES_EMCEES:
        return (
          <EventJudgesEmcees
            isFlatListScroolEnable={isFlatListScroolEnable}
            eventId={route?.params?.pageantEventDetailId}
          />
        );

      case EVENT_DETAIL_MENU_ID.EVENT_MANAGER:
        return (
          <Todos
            eventId={route?.params?.pageantEventDetailId}
            isFlatListScroolEnable={isFlatListScroolEnable}
            selectedToDoTab={selectedTodoTab}
            pageantId={
              pageantEventDetail?.data?.pageant_details.master_pageant_id
            }
            pageantPlanDetail={pageantPlanDetail?.data}
          />
        );

      case EVENT_DETAIL_MENU_ID.REVIEWS:
        return (
          <EventReviews
            eventId={
              eventDetail?.id !== undefined
                ? eventDetail?.id
                : route?.params?.pageantEventDetailId
            }
            isFlatListScroolEnable={isFlatListScroolEnable}
            enableReply={true}
            isDirector={'Yes'}
            showWriteReviewOption={false}
            publicProfile={false}
          />
        );

      case EVENT_DETAIL_MENU_ID.AWARD:
        return (
          <Awards
            isFlatListScrollEnable={isFlatListScroolEnable}
            url={
              GET_EVENT_BIP_AWARDS +
              Param.EVENT_ID +
              route?.params?.pageantEventDetailId
            }
            isPageant={false}
          />
        );

      case EVENT_DETAIL_MENU_ID.GALLERY:
        if (!isLoading && !isAgeDivisionFetching && !isRefetchingDetail) {
          return (
            <View style={styles.tabContainer}>
              <Gallery
                param={
                  Param.PROFILE_TYPE +
                  PARAM_VALUE.EVENT +
                  Param.PROFILE_ID +
                  route?.params?.pageantEventDetailId
                }
                isFlatListScroolEnable={isFlatListScroolEnable}
                isComingFromPageantAlbum={
                  route?.params?.isComingFromPageantAlbum
                }
                pageantId={route?.params?.pageantEventDetailId}
                galleryType={GALLERY_TYPE.EVENT_GALLERY}
                title={translations.EVENT + ' ' + translations.GALLERY}
                setGalleryCount={setGalleryCount}
              />
            </View>
          );
        }
        break;

      case EVENT_DETAIL_MENU_ID.PEOPLE_CHOICE_AWARD:
        return (
          <PeopleChoiceAndPrize
            ageDivisionList={ageDivisionList?.data}
            callAgeDivisionAPI={undefined}
            eventTitle={eventDetail?.title}
            eventId={route?.params?.pageantEventDetailId}
            isPlanActive={isPlanActive}
          />
        );

      default:
        return (
          <ShimmerList
            width={itemSize}
            height={itemSize}
            padding={15}
            numColumns={2}
          />
        );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={eventDetail?.title !== undefined ? eventDetail?.title : ''}
          isUnderLineRequired
        />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollScreen}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            {isLoading ? (
              <Shimmer
                width={Dimensions.get('window').width}
                height={moderateScaleVertical(160)}
                borderRadius={0}
              />
            ) : (
              <FastImageView
                width={Dimensions.get('window').width}
                height={moderateScaleVertical(160)}
                imageUrl={
                  pageantEventDetail?.data?.pageant_details?.banner_image !==
                  null
                    ? pageantEventDetail?.data?.pageant_details
                        ?.banner_image_full_url
                    : eventWAllImageUrl
                }
              />
            )}
            <View style={styles.editIconView}>
              <TouchableOpacity
                style={styles.editPageantDetailIcon}
                onPress={() => {
                  if (!isEventDetailloading) {
                    navigation.navigate(SCREEN.ADD_PAGENT_EVENT, {
                      isEditting: true,
                      pageantPlanDetail: pageantPlanDetail?.data,
                      pageantDetail: pageantEventDetail?.data?.pageant_details,
                    });
                    if (!isModalAddResultVisible) {
                      setIsModalAddResultVisible(true);
                      setTimeout(() => {
                        setIsModalAddResultVisible(false);
                      }, 2000);
                    }
                  }
                }}>
                <AppImages.Dashboard.edit_ICON width={18} height={18} />
              </TouchableOpacity>
              {pageantEventDetail?.data?.pageant_details
                ?.allow_show_hide_event === 1 && (
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => {
                    setHideunhideEventModal(true);
                  }}>
                  {pageantEventDetail?.data?.pageant_details
                    ?.event_pb_hide_show_status === 0 ? (
                    <AppImages.EVENT_DETAIL_MENU.tpp_unhide_pagent
                      width={18}
                      height={18}
                    />
                  ) : (
                    <AppImages.EVENT_DETAIL_MENU.tpp_hide_icon
                      width={18}
                      height={18}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.heading}>
                {eventDetail?.title !== undefined ? eventDetail?.title : ''}
              </Text>
              <View style={styles.otherdetailcontainer}>
                <CustomRatings
                  size={14}
                  fontSize={10}
                  ratingsValue={eventDetail?.rating_average}
                  review_count={eventDetail?.rating_count}
                />
              </View>
              {eventDetail?.address !== undefined &&
              eventDetail?.address !== null &&
              eventDetail?.address.length > 0 ? (
                <View style={styles.otherdetailcontainer}>
                  {isPlanActive ? (
                    <AppImages.Common.ADDRESS_ICON />
                  ) : (
                    <AppImages.Common.LOCK_ICON />
                  )}

                  <Text style={styles.lifetimeParticipantLabel}>
                    {getValidValue(eventDetail?.address)}
                  </Text>
                </View>
              ) : null}
              <EventWebSite />
              {checkIsNull(eventDetail?.phone) &&
              checkIsNull(route?.params?.pageantEventDetail?.phone) ? (
                <View style={styles.otherdetailcontainer}>
                  {isPlanActive ? (
                    <AppImages.PAGEANT_DETAIL.TPP_CALL_ICON />
                  ) : (
                    <AppImages.Common.LOCK_ICON />
                  )}

                  <Text style={styles.lifetimeParticipantLabel}>
                    {isPlanActive
                      ? formatPhoneNumber(
                          eventDetail?.phone === null ||
                            eventDetail?.phone === undefined
                            ? route?.params?.pageantEventDetail?.phone
                            : eventDetail?.phone + '',
                        )
                      : getValidValue(
                          eventDetail?.phone === null ||
                            eventDetail?.phone === undefined
                            ? route?.params?.pageantEventDetail?.phone
                            : eventDetail?.phone + '',
                        )}
                  </Text>
                </View>
              ) : null}
              <EventStartEndDate />
              <TouchableOpacity
                onPress={() => {
                  if (eventDetail?.status === PARAM_VALUE.ACTIVE) {
                    onPageantTilteClick();
                  }
                }}>
                <Text
                  style={
                    eventDetail?.status === PARAM_VALUE.ACTIVE
                      ? styles.pageamTitleLink
                      : styles.pageamInactiveTitleLink
                  }>
                  {route.params?.parentTitle}
                </Text>
              </TouchableOpacity>
              {!isPlanActive && (
                <UpgradePlanSlider
                  plan={route.params.plan}
                  isContentedAdd={isDislayingPlan()}
                  pageantId={
                    pageantEventDetail?.data?.pageant_details.master_pageant_id
                  }
                  pageantPlanDetail={pageantPlanDetail?.data}
                />
              )}

              {!isAgeDivisionFetching &&
              !isLoading &&
              !isEventDetailloading &&
              eventDetail?.status !== PARAM_VALUE.ACTIVE ? (
                <View style={styles.inactiveMessageStyle}>
                  <Text style={styles.inactiveMessageLabel}>
                    {
                      translations.PLEASE_FILL_ALL_REQUIRED_DETAILS_OF_EVENT_TO_MAKE_IT_ACTIVE
                    }
                  </Text>
                </View>
              ) : null}
              <TabHeader />
              {conditionalRenderindViewAsPerSelectedMenuId()}
            </View>

            <View style={styles.circleImageContainer}>
              <FastImageView
                width={moderateScaleVertical(84)}
                height={moderateScaleVertical(84)}
                borderRadius={moderateScaleVertical(84)}
                imageUrl={
                  eventImageUrl === null ||
                  eventImageUrl.length === 0 ||
                  eventImageUrl === 'null'
                    ? route?.params?.pagentLogo
                    : eventImageUrl
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
            <TouchableOpacity
              style={styles.coverImage}
              onPress={() => {
                openModel(IMAGE_TYPE.BANNER_IMAGE);
              }}>
              <AppImages.ProfileImage.Tpp_camera_icon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {!isMenuModalVisible &&
          !isAgeDivisionFetching &&
          !isLoading &&
          !keyboardShown && (
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
          )}

        <ImagePickerModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          onImageFound={imagePickerResult}
          cropperCircleOverlay={isImagePickerId === IMAGE_TYPE.MAIN_IMAGE}
          id={isImagePickerId}
          note={
            isImagePickerId === IMAGE_TYPE.MAIN_IMAGE
              ? translations.FOR_BETTER_SIZE
              : translations.PAGEANT_BANNER
          }
        />
        {pageantEventDetail !== undefined && (
          <EventDetailMenu
            isMenuModalVisible={isMenuModalVisible}
            setMenuModalVisible={setMenuModalVisible}
            selectedMenuId={selectedMenuId}
            onMenuClick={onMenuClick}
            tense={
              pageantEventDetail?.data?.pageant_details?.event_tense_status
            }
            isAwardAvailable={
              pageantEventDetail?.data?.pageant_details?.bip_awards_count !==
                undefined &&
              pageantEventDetail?.data?.pageant_details?.bip_awards_count > 0
            }
            isActivePageant={eventDetail?.status === PARAM_VALUE.ACTIVE}
          />
        )}
      </View>
      <WarningModel
        msg={
          pageantEventDetail?.data?.pageant_details
            ?.event_pb_hide_show_status == 0
            ? translations.HIDE_EVENT_CONFIRMATION
            : translations.UNHIDE_EVENT_CONFIRMATION
        }
        isModalVisible={hideunhideEventModal}
        setConfirm={() => {
          onConfirmHideUnhideEvent();
        }}
        setIsModalVisible={setHideunhideEventModal}
        headingStyle={{
          ...styles.modalHeading,
          textAlign:
            pageantEventDetail?.data?.pageant_details
              ?.event_pb_hide_show_status == 0
              ? 'left'
              : 'center',
        }}>
        {eventDetail?.event_pb_hide_show_status === 0 && (
          <View style={styles.rowView}>
            <Text style={styles.note}>{translations.NOTE} </Text>
            <Text style={styles.noteText}>{translations.HIDE_NOTE}</Text>
          </View>
        )}
      </WarningModel>
    </SafeAreaView>
  );
};

export default EventDetail;
