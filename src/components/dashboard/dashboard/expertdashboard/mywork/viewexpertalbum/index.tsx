import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  Dimensions,
  Text,
  BackHandler,
  TouchableOpacity,
  View,
} from 'react-native';
import GalleryGridItem from '../../../../../common/gallerygriditem';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../../assets/translations';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  DIRECTORY_ID,
  EXPERT_ALUM_TYPE,
  FLOATING_ICON,
  MESSAGE_MENU,
  PARAM_VALUE,
  PROFILE_STATUS,
  REFESH_SCREEN,
  ROLES,
} from '../../../../../utils/enum';
import Header from '../../../../../common/header';
import {PageantDataResponse} from '../../../../../../services/models/pageantdetails/contestantPublicDetails';
import {
  EXPERT_CONTESTANT_WORK_WITH_VIEW_ALL_ALBUM,
  EXPERT_EXTRA_VIEW_ALL_ALBUM,
  EXPERT_PAGEANT_WORK_WITH_VIEW_ALL_ALBUM,
  EXPERT_REMOVE_ALBUM,
  REARRANGE_ALBUM,
} from '../../../../../../services/endpoints';
import {SCREEN} from '../../../../../../root/screenname';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import useHtQuery from '../../../../../../services/api/useHtQuery';
import DeviceInfo from 'react-native-device-info';
import AppImages from '../../../../../../assets/images/AppImages';
import FloatingButton from '../../../../../common/floatingbutton';
import GalleryRearrage from '../../../contestantdashboard/gallery/galleryrearange';
import {GalleryItem} from '../../../../../../services/models/gallery/galleryItem';
import {internetState} from '../../../../../common/commonalert';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../services/models/base';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {ApiStatusType, Param} from '../../../../../../services/constants';
import FilterModal from '../../../../message/components/filtermodal';
import WarningModel from '../../../../../common/warningmodel';
import MoveOptionModal from './moveoptionmodal';
import {MESSAGE_TYPE} from '../../../../../common/localnotificationtoast';
import {isIosDevice} from '../../../../../utils/helperFunction';
export const menuData = [
  {
    title: translations.CONTESTANT_WORKED_WITH,
    id: EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH,
  },
  {
    title: translations.PAGEANT_WORKED_WITH,
    id: EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH,
  },
  {
    title: translations.EXTRA + 's',
    id: EXPERT_ALUM_TYPE.EXTRA,
  },
];

const ViewExpertAlbum = ({route}) => {
  const navigation = useNavigation();
  const reArrangeRef = useRef();
  const galleryListRef = React.useRef();
  const flatListRef = React.useRef();
  const [deleteCOnfiramtionModalVisible, setDeleteCOnfiramtionModalVisible] =
    useState(false);
  const [isExtraMoveOptionModalVisible, setExtraMoveOptionModalVisible] =
    useState(false);
  const [isRearrageModelVisible, setRearrageModelVisible] = useState(false);
  const [listRearrange, setListRearragne] = useState<GalleryItem[]>([]);
  const [indexRearrange, setIndexRearrange] = useState(-1);
  const [rearrangeAlbumId, setRearrangeAlbumId] = useState(-1);
  const setLoader = useSetLoader();
  const [threeDotMenuClicked, setThreeDotMenuClicked] = useState(false);
  const [isAlbumDeleteActive, setDeleteClicked] = useState(false);
  const [isExtraMoveActive, setExtraMoveActive] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([]);
  const [yOffSet, setYOffSet] = useState(0);
  const [isListActive, setListState] = useState(false);
  const [hasScreenNotch, sethasScreenNotch] = useState();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [isPasteAlbumActive, setPasteAlbumActive] = useState(false);
  const [itemSize, setItemSize] = useState(Number);
  const [activeAlbumId, setActiveAlbumId] = useState(route.params.albumId);
  const [label, setLabel] = useState(
    activeAlbumId === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
      ? translations.CONTESTANT_WORKED_WITH
      : activeAlbumId === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH
      ? translations.PAGEANT_WORKED_WITH
      : translations.EXTRA + 's',
  );
  const [menuList] = useState([
    {
      id: MESSAGE_MENU.DELETE,
      label: translations.REMOVE_ALBUM,
      icon: <AppImages.CONVO.tpp_delete_pink width={moderateScale(16)} />,
    },
  ]);
  const [totalCount, setTotalCount] = useState(Number);

  const netInfo = useNetInfo();
  const {
    storeData: {refresh, rearrangeAlbumToast, moveImageToast},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();

  /* The above code is using the `useCgMutation` hook to define a mutation function called
 `removeExpertAlbums`. This mutation function is used to remove albums from an expert's gallery. */
  const {mutateAsync: removeExpertAlbums} = useCgMutation<Base>({
    key: EXPERT_REMOVE_ALBUM,
    url: EXPERT_REMOVE_ALBUM,
    body: {
      business_profile_id: route.params.profileId,
      gallery_id: selectedIndexes.join(','),
    },
  });

  /* The above code is a TypeScript React code snippet. It is using the `useCgMutation` hook to make an
  asynchronous request to rearrange an album. */
  const {mutateAsync: albumRearrangeRequest} = useCgMutation<Base>({
    key: REARRANGE_ALBUM,
    body: {
      profile_type: route.params.role.slug,
      profile_id: route.params.profileId,
      gallery_id: rearrangeAlbumId,
      position: indexRearrange,
      to_type:
        activeAlbumId === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
          ? ROLES.CONTESTANT
          : ROLES.PAGEANT,
    },
    url: REARRANGE_ALBUM,
    disableLoader: true,
  });

  /**
   * The function `getAlbumUrl` returns a specific URL based on the value of `activeAlbumId`.
   * @returns The function `getAlbumUrl` returns a URL based on the value of the `activeAlbumId`
   * variable. If `activeAlbumId` is equal to `EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH`, it returns
   * `EXPERT_CONTESTANT_WORK_WITH_VIEW_ALL_ALBUM`. If `activeAlbumId` is equal to
   * `EXPERT_ALUM_TYPE.PAGEANT_WORKED
   */
  const getAlbumUrl = () => {
    if (activeAlbumId === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH) {
      return EXPERT_CONTESTANT_WORK_WITH_VIEW_ALL_ALBUM;
    } else if (activeAlbumId === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH) {
      return EXPERT_PAGEANT_WORK_WITH_VIEW_ALL_ALBUM;
    } else {
      return EXPERT_EXTRA_VIEW_ALL_ALBUM;
    }
  };

  //API GALLERY----------------------------------------- START
  const {data, isLoading, refetch, isRefetching} =
    useHtQuery<PageantDataResponse>({
      key:
        getAlbumUrl() +
        Param.EXPERT_ID +
        route.params.profileId +
        Param.PROFILE_TYPE_ +
        route.params.role.slug,
      url:
        getAlbumUrl() +
        Param.EXPERT_ID +
        route.params.profileId +
        Param.PROFILE_TYPE_ +
        route.params.role.slug,
      offSuccessToast: true,
    });

  //API GALLERY----------------------------------------- END

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    const hasNotch = DeviceInfo.hasNotch();
    sethasScreenNotch(String(hasNotch));
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);
  /**
   * It scrolls to the top of the FlatList
   */
  const scrollToTop = () => {
    flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
  };

  /* The above code is a useEffect hook in a TypeScript React component. It is used to update the total
 count based on the data received from an API call. */
  useEffect(() => {
    if (!isLoading && data?.data !== undefined) {
      if (
        data?.data?.expertAlbums !== undefined &&
        data?.data?.expertAlbums.length > 0
      ) {
        setTotalCount(data?.data?.expertAlbums?.length);
      } else if (
        data?.data?.images !== undefined &&
        data?.data?.images?.length > 0
      ) {
        setTotalCount(data?.data?.images?.length);
      } else {
        setTotalCount(0);
      }
    }
  }, [isLoading]);

  /*It is used to update the total
  count based on the data received from an API call. */
  useEffect(() => {
    if (!isRefetching && data?.data !== undefined) {
      if (
        data?.data?.expertAlbums !== undefined &&
        data?.data?.expertAlbums.length > 0
      ) {
        setTotalCount(data?.data?.expertAlbums?.length);
      } else if (
        data?.data?.images !== undefined &&
        data?.data?.images?.length > 0
      ) {
        setTotalCount(data?.data?.images?.length);
      }
    }
  }, [isRefetching]);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  /**
   * The function `refeshScreen` is used to refresh the screen and update various state variables.
   */
  const refeshScreen = async () => {
    if (REFESH_SCREEN.EXPERT_ALBUM_VIEW === refresh) {
      await refetch();
      setSelectedIndexes([]);
      setExtraMoveActive(false);
      setPasteAlbumActive(false);
      setScreenRefresh(REFESH_SCREEN.EXPERT_DASHBOARD_ALBUM);
    }
  };

  /**
   * The handleScroll function is called when the user scrolls the screen. It takes the event as an
   * argument and sets the yOffset state to the y-axis value of the event
   */
  const handleScroll = event => {
    setYOffSet(event.nativeEvent.contentOffset.y * 0.9);
  };

  /**
   * It takes an imageId as a parameter and checks if the selectedIndexes array contains the imageId. If
   * it does, it filters the array and removes the imageId from the array. If it doesn't, it adds the
   * imageId to the array
   * @param {string} imageId - The id of the image that is selected.
   */
  const selectImages = (imageId: string, isAllSelectActive: boolean) => {
    if (!selectedIndexes.includes(imageId)) {
      setSelectedIndexes(oldArray => [...oldArray, imageId]);
    } else if (!isAllSelectActive) {
      const filterArray = selectedIndexes.filter(i => {
        return selectedIndexes.indexOf(i) !== selectedIndexes.indexOf(imageId);
      });
      setSelectedIndexes(filterArray);
    }
  };

  /**
   * OnItemClick is a function that takes a galleryItem as a parameter and returns a function that
   * navigates to the sub gallery screen
   * @param {number} galleryItem - The index of the item in the galleryList array.
   */
  const onItemClick = (galleryItem: number) => {
    if (isAlbumDeleteActive || isExtraMoveActive) {
      if (data?.data?.expertAlbums !== undefined) {
        selectImages(
          data?.data?.expertAlbums[galleryItem].id.toString(),
          false,
        );
      } else if (data?.data?.images[galleryItem]?.id !== undefined) {
        selectImages(data?.data?.images[galleryItem]?.id?.toString(), false);
      }
    } else {
      if (activeAlbumId === EXPERT_ALUM_TYPE.EXTRA) {
        navigation.navigate(SCREEN.ALBUM_DETAIL, {
          albumList: data.data?.images,
          index: galleryItem,
          displayKey:
            data?.data?.images[galleryItem].id +
            new Date().getMilliseconds() +
            '',
          galleryType: route.params.role.slug,
          itemType: SCREEN.EXPERT_ALBUM,
          isPublicProfileAlbumImage: false,
          galleryParam: Param.PROFILE_TYPE + route.params.role.slug,
          profileId: route.params.profileId,
          expertAlbumType: route.params.activeAlbumId,
        });
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES, {
          galleryItem: data.data?.expertAlbums[galleryItem],
          role: route.params.role,
          profileId: route.params.profileId,
          itemType: SCREEN.EXPERT_ALBUM,
          expertAlbumType: activeAlbumId,
          galleryParam: Param.PROFILE_TYPE + route.params.role.slug,
          isPublicProfileView: false,
          isPublicProfileAlbumImage: false,
          tag: new Date().getMilliseconds(),
          selectedImageId: selectedIndexes,
          noOfItemSelected: selectedIndexes?.length,
          isPublicProfileView: route.params.isPublicProfileView,
          isPublicProfileView: route.params.isPublicProfileAlbumImage,
          isMoveImageActive:
            selectedIndexes !== undefined && selectedIndexes.length > 0,
        });
      }
    }
  };

  /**
   * The function `handleMenuOnPress` sets the label state to the provided title.
   * @param {string} title - The `title` parameter is a string that represents the title of a menu item.
   */
  const handleMenuOnPress = (title: string) => {
    setLabel(title);
  };

  /**
   * The function `onNameClick` navigates to a public profile page if certain conditions are met.
   * @param {number} index - The `index` parameter in the `onNameClick` function represents the index
   * of the item that was clicked. It is used to access specific data within the `data` and
   * `albumImages` arrays.
   */
  const onNameClick = (index: number) => {
    if (
      data !== undefined &&
      data.data?.expertAlbums[index].contestantDetails !== undefined &&
      data.data?.expertAlbums[index].contestantDetails.is_minor ===
        translations.NO_SMALL &&
      data.data?.expertAlbums[index].contestantDetails.status ===
        PROFILE_STATUS.ACTIVE
    ) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: albumImages[index].contestantDetails.owner_id,
        profileId: albumImages[index].contestantDetails.id,
        name: albumImages[index].album_name,
        category: DIRECTORY_ID.CONTESTANT,
        key: new Date().getMilliseconds(),
        selectedTab: ROLES.CONTESTANT,
      });
      setScreenRefresh(REFESH_SCREEN.EXPERT_AND_CONTESTENT_DASHBOARD);
    }
  };

  /**
   * It returns a View component with a style of staticHeight
   * @returns A view with a static height.
   */
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  /**
   * The function `onAddClick` navigates to a screen called `CREATE_EXPERT_ALBUM` with some parameters.
   */
  const onAddClick = () => {
    navigation.navigate(SCREEN.CREATE_EXPERT_ALBUM, {
      expert: route.params.expert,
      activeAlbumId: activeAlbumId,
      isAlbumView: true,
    });
  };

  /**
   * The function `onDeleteAlbumClick` sets the state variable `deleteConfirmationModalVisible` to
   * `true`.
   */
  const onDeleteAlbumClick = () => {
    setDeleteCOnfiramtionModalVisible(true);
  };

  /**
   * It rearranges the album.
   * @returns a boolean value.
   */
  const rearrangeAlbum = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      const response = await albumRearrangeRequest();
      if (response.success) {
        const res = await refetch();
        setScreenRefresh(REFESH_SCREEN.EXPERT_DASHBOARD_ALBUM);
        if (res.isSuccess) {
          scrollToTop();
        }
        setLoader(false);
      }
    }
  };

  /**
   * The onPressBack function calls the backButtonHandled function and returns true.
   * @returns The function `onPressBack` is returning `true`.
   */
  const onPressBack = () => {
    backButtonHandled();
    return true;
  };

  /**
   * The function `backButtonHandled` handles the logic for navigating back or performing specific
   * actions based on the current state of the application.
   */
  const backButtonHandled = async () => {
    if (isAlbumDeleteActive || isExtraMoveActive || isPasteAlbumActive) {
      if (isPasteAlbumActive) {
        setPasteAlbumActive(false);
        setExtraMoveActive(true);
        setActiveAlbumId(EXPERT_ALUM_TYPE.EXTRA);
        handleMenuOnPress(menuData[2].title);
        await refetch();
      } else if (isExtraMoveActive) {
        setExtraMoveActive(false);
        setActiveAlbumId(EXPERT_ALUM_TYPE.EXTRA);
        handleMenuOnPress(menuData[2].title);
        setSelectedIndexes([]);
        await refetch();
      } else {
        setSelectedIndexes([]);
        setDeleteClicked(false);
      }
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const hardwareBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () =>
      hardwareBack.remove();
  }, [onPressBack]);

  /**
   * The function `_onPressFloatingButton` sets a loader, removes expert albums, updates the screen
   * refresh, handles the back button, refetches data, and then sets the loader to false.
   */
  const _onPressFloatingButton = async () => {
    setLoader(true);
    const res = await removeExpertAlbums();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setScreenRefresh(REFESH_SCREEN.EXPERT_DASHBOARD_ALBUM);
      backButtonHandled();
      await refetch();
    }
    setLoader(false);
  };
  /**
   * It sets the state of the component to the initial state
   */
  const crossIconClicked = () => {
    setExtraMoveActive(false);
    setSelectedIndexes([]);
  };
  /**
   * The function `onAlbumTypeSelection` sets the visibility and activity of certain options based on
   * the selected album type, and then fetches albums based on the selected type.
   * @param {number} albumTypeId - The albumTypeId parameter is a number that represents the type of
   * album selected.
   */
  const onAlbumTypeSelection = (albumTypeId: number) => {
    setExtraMoveOptionModalVisible(false);
    setExtraMoveActive(false);
    setPasteAlbumActive(true);
    if (albumTypeId === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH) {
      refetechAlbums({
        title: translations.CONTESTANT_WORKED_WITH,
        id: EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH,
      });
    } else {
      if (albumTypeId === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH) {
        refetechAlbums({
          title: translations.PAGEANT_WORKED_WITH,
          id: EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH,
        });
      }
    }
  };

  /**
   * The function `refetechAlbums` sets various states and then calls the `refetch` function.
   * @param {any} item - The `item` parameter is an object that represents an album. It likely has
   * properties such as `id` and `title`.
   */
  const refetechAlbums = (item: any) => {
    setFilterModalVisible(false);
    setActiveAlbumId(item.id);
    handleMenuOnPress(item?.title);
    setTotalCount(0);
    refetch();
  };

  /**
   * `onListModeActive` is a function that sets the state of `isListActive` to the opposite of what it
   * currently is
   */
  const onListModeActive = () => {
    setListState(!isListActive);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Modal
          statusBarTranslucent={true}
          animationType="fade"
          transparent={true}
          visible={filterModalVisible}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setFilterModalVisible(false)}
            style={styles.outerview}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                ...styles.innerView,
                top: !isIosDevice()
                  ? moderateScaleVertical(105)
                  : hasScreenNotch === 'true'
                  ? moderateScaleVertical(102)
                  : moderateScaleVertical(70),
              }}>
              <FlatList
                data={menuData}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={item => (
                  <TouchableOpacity
                    style={styles.cardTouch}
                    onPress={() => {
                      setFilterModalVisible(false);
                      setActiveAlbumId(item?.item.id);
                      handleMenuOnPress(item?.item?.title);
                      setTotalCount(0);
                      refetch();
                    }}>
                    <View style={styles.cardRow}>
                      <Text
                        style={
                          label === item?.item?.title
                            ? styles.selectedFilterLable
                            : styles.filterText
                        }>
                        {item?.item?.title}
                      </Text>
                      {label === item?.item?.title ? (
                        <View style={{width: moderateScale(20)}}>
                          <AppImages.Dashboard.tick_ICON />
                        </View>
                      ) : (
                        <View style={{width: moderateScale(20)}} />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        {isAlbumDeleteActive || isPasteAlbumActive ? (
          <Header
            lable={isAlbumDeleteActive ? translations.REMOVE_ALBUM : label}
            isUnderLineRequired
            onCustomPressBack={backButtonHandled}
          />
        ) : (
          <Header
            lable={
              selectedIndexes.length > 0 && isExtraMoveActive
                ? selectedIndexes.length + translations.CAPITAL_SELECTED
                : label
            }
            crossIcon={isExtraMoveActive}
            isUnderLineRequired
            isFilterClicked={!isExtraMoveActive}
            onPressFilter={() => {
              setFilterModalVisible(true);
            }}
            onCrossIconClick={crossIconClicked}
            rightIcon2={
              activeAlbumId !== EXPERT_ALUM_TYPE.EXTRA ? (
                <AppImages.Dashboard.HeaderMenuIcon />
              ) : null
            }
            onPressRightIcon2={() =>
              setThreeDotMenuClicked(!threeDotMenuClicked)
            }
            showImageCount={isLoading ? null : ' (' + totalCount + ')'}
            rightText={isExtraMoveActive ? translations.MOVE : ''}
            onPressRightText={() => setExtraMoveOptionModalVisible(true)}
          />
        )}
        {activeAlbumId !== EXPERT_ALUM_TYPE.EXTRA && (
          <View style={styles.modeContainer}>
            <TouchableOpacity onPress={onListModeActive}>
              {isListActive ? (
                <AppImages.Gallery.GridActive_ICON />
              ) : (
                <AppImages.Gallery.ListActive_ICON />
              )}
            </TouchableOpacity>
          </View>
        )}

        {isAlbumDeleteActive && (
          <View style={styles.textView}>
            <Text
              style={{
                ...styles.touchableText,
                marginRight: 'auto',
                opacity: selectedIndexes.length !== 0 ? 1 : 0.2,
                position: 'relative',
              }}
              onPress={() => {
                setSelectedIndexes([]);
              }}>
              {translations.SELECT_NON}
            </Text>
            <Text style={styles.selectedText}>
              {selectedIndexes.length + ''} {translations.SELECTED}
            </Text>
            <Text
              style={{
                ...styles.touchableText,
                marginLeft: 'auto',
                opacity:
                  selectedIndexes.length !== data?.data?.expertAlbums?.length
                    ? 1
                    : 0.2,
              }}
              onPress={() => {
                data?.data?.expertAlbums.forEach(element => {
                  selectImages(element?.id?.toString(), true);
                });
              }}>
              {translations.SELECT_ALL}
            </Text>
          </View>
        )}

        <View style={styles.space} />
        {(data !== undefined &&
          data?.data?.expertAlbums?.length > 0 &&
          !isRefetching) ||
        (data !== undefined &&
          data?.data?.images?.length > 0 &&
          !isRefetching) ? (
          <FlatList
            data={
              data.data?.expertAlbums !== undefined
                ? data.data?.expertAlbums
                : data.data?.images
            }
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={isListActive ? 1 : 2}
            key={isListActive ? '_' : '#'}
            onScroll={handleScroll}
            ref={flatListRef}
            ListFooterComponent={listFooterComponent}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <GalleryGridItem
                position={index}
                ref={galleryListRef}
                imageId={item.id.toString()}
                maxLines={isListActive ? 3 : 1}
                isList={isListActive}
                imageUrl={
                  item?.selectedImage !== undefined
                    ? item?.selectedImage
                    : item?.imgSource
                }
                label={
                  item?.album_name === PARAM_VALUE.GENERAL
                    ? translations.EXTRA
                    : item?.album_name
                }
                isMinor={item.contestantDetails?.is_minor}
                ownerId={item.contestantDetails?.owner_id}
                status={item?.contestantDetails?.status}
                onTextClickListener={onNameClick}
                onItemClickListener={onItemClick}
                size={itemSize}
                itemSelectable={isAlbumDeleteActive || isExtraMoveActive}
                imageCount={item?.business_record_images_count}
                selectedItemIndexes={selectedIndexes}
                onLongPressItem={() => {
                  if (
                    activeAlbumId === EXPERT_ALUM_TYPE.EXTRA &&
                    data?.data?.images[index]?.id !== undefined
                  ) {
                    setExtraMoveActive(true);
                    selectImages(
                      data?.data?.images[index]?.id.toString(),
                      false,
                    );
                  } else if (
                    !isAlbumDeleteActive &&
                    data?.data?.expertAlbums !== undefined &&
                    data?.data?.expertAlbums?.length > 1
                  ) {
                    setRearrangeAlbumId(data?.data?.expertAlbums[index].id);
                    setListRearragne([]);
                    data?.data?.expertAlbums.forEach(element => {
                      setListRearragne(oldArray => [...oldArray, element]);
                    });
                    setIndexRearrange(index);
                    setRearrageModelVisible(true);
                    setTimeout(() => {
                      if (index > 3) {
                        reArrangeRef?.current?.scrollToOffset({
                          animated: true,
                          offset: yOffSet,
                        });
                      }
                    }, 300);
                  }
                }}
              />
            )}
          />
        ) : (isLoading && netInfo.isInternetReachable) ||
          (isRefetching && netInfo.isInternetReachable) ? (
          <ShimmerList
            width={itemSize}
            height={itemSize}
            padding={15}
            numColumns={2}
          />
        ) : (
          netInfo.isInternetReachable && (
            <View style={styles.container1}>
              <Text ellipsizeMode="tail" style={styles.noRecord}>
                {translations.NO_RESULT_FOR_SELECTED_FILTER}
              </Text>
            </View>
          )
        )}
      </View>
      {isAlbumDeleteActive && selectedIndexes.length > 0 ? (
        <FloatingButton
          image={<AppImages.ProfileImage.Tpp_remove_image_icon />}
          onPress={() => onDeleteAlbumClick()}
        />
      ) : !isExtraMoveActive &&
        activeAlbumId === EXPERT_ALUM_TYPE.EXTRA &&
        !isLoading &&
        !isAlbumDeleteActive ? (
        <FloatingButton
          iconId={FLOATING_ICON.CAMERA}
          onPress={() => onAddClick()}
          localMsg={
            moveImageToast === 0 && data?.data?.images?.length > 0
              ? translations.PRESS_CAN_NOT_TAGS_IN_EXTRA_ALBUM
              : ''
          }
          type={MESSAGE_TYPE.MOVE_EXTRA_ALBUM_MSG}
        />
      ) : (
        !isExtraMoveActive &&
        !isPasteAlbumActive &&
        !isAlbumDeleteActive &&
        !isLoading && (
          <FloatingButton
            iconId={FLOATING_ICON.PLUS}
            onPress={() => onAddClick()}
            localMsg={
              rearrangeAlbumToast === 0 && data?.data?.expertAlbums?.length > 3
                ? translations.LONG_HOLD_THE_ALBUM_TO_REARRANGE_POSITION
                : ''
            }
            type={MESSAGE_TYPE.REARRANGE_ALBUM}
          />
        )
      )}
      <GalleryRearrage
        reArrangeRef={reArrangeRef}
        isModalVisible={isRearrageModelVisible}
        setIsModalVisible={setRearrageModelVisible}
        galleryList={listRearrange}
        setIndexRearrange={setIndexRearrange}
        onConfirmClick={rearrangeAlbum}
        setListRearragne={setListRearragne}
        selectedIndex={indexRearrange}
      />
      {menuList !== undefined && (
        <FilterModal
          modalVisible={threeDotMenuClicked}
          setModalVisible={setThreeDotMenuClicked}
          type={translations.THREEDOT_MENU}
          setDeleteClicked={setDeleteClicked}
          menuList={menuList}
        />
      )}
      <WarningModel
        msg={translations.DO_YOU_WANT_TO_DELETE_THIS_ALBUM}
        isModalVisible={deleteCOnfiramtionModalVisible}
        setConfirm={() => {
          _onPressFloatingButton();
        }}
        setIsModalVisible={setDeleteCOnfiramtionModalVisible}
        headingStyle={styles.modalHeading}
      />
      <MoveOptionModal
        isModalVisible={isExtraMoveOptionModalVisible}
        setIsModalVisible={setExtraMoveOptionModalVisible}
        onAlbumTypeSelection={onAlbumTypeSelection}
      />
    </SafeAreaView>
  );
};

export default ViewExpertAlbum;
