import React, {useState, useContext, useEffect, useRef} from 'react';
import {FlatList, Text, Dimensions, View, TouchableOpacity} from 'react-native';
import AppImages from '../../../../../assets/images/AppImages';
import GalleryGridItem from '../../../../common/gallerygriditem';
import {MESSAGE_TYPE} from '../../../../common/localnotificationtoast';
import {styles} from './styles';
import {GALLERY, REARRANGE_ALBUM} from '../../../../../services/endpoints';
import {GalleryData} from '../../../../../services/models/gallery/galleryData';
import useInfiniteHtQuery from '../../../../../services/api/useHtInfiniteQuery';
import {SCREEN} from '../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
import NoRecord from '../../../../common/norecord';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import {internetState} from '../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import useAppStore from '../../../../../store/useAppStore';
import {useSetScreenRefresh} from '../../../../../store/useAppStore';
import FloatingButton from '../../../../common/floatingbutton';
import {
  FLOATING_ICON,
  PARAM_VALUE,
  ROLES,
  REFESH_SCREEN,
  GALLERY_TYPE,
} from '../../../../utils/enum';
import {toast, toastType} from '../../../../common/commonalert';
import {Param} from '../../../../../services/constants';
import GalleryRearrage from './galleryrearange';
import {GalleryItem} from '../../../../../services/models/gallery/galleryItem';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {useSetLoader} from '../../../../../store/useAppStore';
import {UserContext} from '../../../../../store/userStore';
import {Pageant} from '../../../../../services/models/pageantdetails/pageant';
import {AdvertisingBannerData} from '../../../../../services/models/pageantdetails/pageantDetailData';

interface Props {
  param: string;
  title?: string;
  galleryType: number;
  pageantId?: number;
  pageantDetail?: Pageant | undefined;
  plan?: AdvertisingBannerData | undefined;
  parentImageUrl?: string;
  parentBannerImageUrl?: string;
  parentWebsiteUrl?: string;
  parentTitle?: string | undefined;
  setGalleryCount?: any;
  isComingFromPageantAlbum?: boolean;
  isFlatListScroolEnable: boolean;
}
const Gallery = ({
  param,
  title,
  galleryType,
  pageantId,
  pageantDetail,
  plan,
  parentImageUrl,
  parentBannerImageUrl,
  parentWebsiteUrl,
  parentTitle,
  setGalleryCount,
  isComingFromPageantAlbum,
  isFlatListScroolEnable,
}: Props) => {
  const reArrangeRef = useRef();
  const [isRearrageModelVisible, setRearrageModelVisible] = useState(false);
  const [indexRearrange, setIndexRearrange] = useState(-1);
  const [rearrangeAlbumId, setRearrangeAlbumId] = useState(-1);
  const [isListActive, setListState] = useState(false);
  const [listRearrange, setListRearragne] = useState<GalleryItem[]>([]);
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const [yOffSet, setYOffSet] = useState(0);
  const setScreenRefresh = useSetScreenRefresh();
  const netInfo = useNetInfo();

  const galleryListRef = React.useRef();
  const flatListRef = React.useRef();
  const setLoader = useSetLoader();
  const {
    storeData: {refresh, rearrangeAlbumToast},
  } = useAppStore();
  const {storeData} = useContext(UserContext);

  //API GALLERY----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<GalleryData>({
    key: GALLERY + galleryType + param,
    url: GALLERY + param,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.galleryList?.length,
    disableLoader: true,
  });
  const galleryList =
    paginatedData?.pages
      ?.map((page: GalleryData) => {
        if (
          page?.data?.galleryList != null &&
          page?.data?.galleryList !== undefined
        ) {
          return page?.data?.galleryList;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  //API GALLERY----------------------------------------- END

  //API REARRANGE ALBUM ----------------------------------------- START
  const albumRearrangeRequestBody = {
    profile_type:
      galleryType === GALLERY_TYPE.PAGEANT_GALLERY
        ? ROLES.PAGEANT.toLocaleLowerCase()
        : galleryType === GALLERY_TYPE.EVENT_GALLERY
        ? PARAM_VALUE.EVENT
        : ROLES.CONTESTANT.toLocaleLowerCase(),
    profile_id:
      galleryType === GALLERY_TYPE.CONTESTANT_GALLERY
        ? storeData?.data?.user?.contestant.id
        : pageantId,
    gallery_id: rearrangeAlbumId,
    position: indexRearrange,
  };
  const {mutateAsync: albumRearrangeRequest} = useCgMutation<Base>({
    key: REARRANGE_ALBUM,
    body: albumRearrangeRequestBody,
    url: REARRANGE_ALBUM,
    disableLoader: true,
  });
  //API REARRANGE ALBUM----------------------------------------- START

  /**
   * `onListModeActive` is a function that sets the state of `isListActive` to the opposite of what it
   * currently is
   */
  const onListModeActive = () => {
    setListState(!isListActive);
  };

  useEffect(() => {
    if (!isLoading && setGalleryCount !== undefined) {
      setGalleryCount(galleryList.length);
    }
  }, [isLoading]);

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  const refeshScreenList = async () => {
    if (REFESH_SCREEN.GALLERY === refresh) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  /**
   * It scrolls to the top of the FlatList
   */
  const scrollToTop = () => {
    flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
  };

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    fetchNextPage();
  };

  /**
   * OnItemClick is a function that takes a galleryItem as a parameter and returns a function that
   * navigates to the sub gallery screen
   * @param {number} galleryItem - The index of the item in the galleryList array.
   */
  const onItemClick = (galleryItem: number) => {
    if (galleryList[galleryItem].album_name === PARAM_VALUE.GENERAL) {
      galleryList[galleryItem].album_name = translations.EXTRA;
    }

    navigation.navigate(
      galleryType !== undefined &&
        galleryType === GALLERY_TYPE.EVENT_GALLERY &&
        isComingFromPageantAlbum !== undefined &&
        isComingFromPageantAlbum
        ? SCREEN.EVENT_SUB_GALLERY
        : SCREEN.SUB_GALLERY,
      {
        galleryItem: galleryList[galleryItem],
        galleryType: galleryType,
        pageantId: pageantId,
        plan: plan,
        isMoveImage: false,
        isExtra: galleryList[galleryItem].album_name === translations.EXTRA,
        parentImageUrl: parentImageUrl,
        parentBannerImageUrl: parentBannerImageUrl,
        parentWebsiteUrl: parentWebsiteUrl,
        parentTitle: parentTitle,
        galleryParam: param,
      },
    );
  };

  /**
   * OnAddEventDetailClick() is a function that navigates to the AddEventDetail screen when the user
   * clicks the AddEventDetail button
   */
  const onAddEventDetailClick = () => {
    toast(
      translations.TAG_A_PAGEANT_YOU_COMPLETE_IN_TO_CREATE_NEW_ALNU,
      toastType.SUCESS_TOAST,
    );
    navigation.navigate(SCREEN.ADD_EVENT_DETAIL);

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
        if (res.isSuccess) {
          scrollToTop();
        }
        setLoader(false);
      }
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
   * It returns a View component with a style of staticHeight
   * @returns A view with a static height.
   */
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  /**
   * This function is used to navigate to the Add Pageant Rules screen
   */
  const moveToPageantRule = () => {
    toast(
      translations.ADD_ADDITIONAL_PHASES_OF_COMPETITION_TO_CREATE_NEW_A_ALBUM,
      toastType.SUCESS_TOAST,
    );
    navigation.navigate(SCREEN.ADD_PAGENT_RULES, {
      pageantId: pageantId,
      isEditing: true,
      pageantDetail: pageantDetail,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.modeContainer}>
        <Text style={styles.titleContainer}>{title}</Text>
        <View style={styles.modeContainer}>
          {galleryType === GALLERY_TYPE.PAGEANT_GALLERY ? (
            <TouchableOpacity
              style={styles.addPageantRuleontainer}
              onPress={moveToPageantRule}>
              <AppImages.Dashboard.addPageant_ICON />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity onPress={onListModeActive}>
            {isListActive ? (
              <AppImages.Gallery.GridActive_ICON />
            ) : (
              <AppImages.Gallery.ListActive_ICON />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {galleryList.length > 0 ? (
        <FlatList
          data={galleryList}
          onScroll={handleScroll}
          nestedScrollEnabled={true}
          ref={flatListRef}
          scrollEnabled={isFlatListScroolEnable}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          numColumns={isListActive ? 1 : 2}
          key={isListActive ? '_' : '#'}
          ListFooterComponent={listFooterComponent}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <GalleryGridItem
              position={index}
              ref={galleryListRef}
              imageUrl={item?.original_image}
              imageCount={item?.imagesCount}
              label={
                item?.album_name === PARAM_VALUE.GENERAL
                  ? translations.EXTRA
                  : item?.album_name
              }
              maxLines={isListActive ? 3 : 1}
              isList={isListActive}
              onItemClickListener={onItemClick}
              onLongPressItem={() => {
                setRearrangeAlbumId(galleryList[index].id);
                setListRearragne([]);
                setListRearragne(galleryList);
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
              }}
              size={itemSize}
            />
          )}
        />
      ) : isLoading && netInfo.isInternetReachable ? (
        <ShimmerList
          width={itemSize}
          height={itemSize}
          padding={15}
          numColumns={2}
        />
      ) : netInfo.isInternetReachable ? (
        <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
      ) : (
        <View />
      )}
      {galleryType === GALLERY_TYPE.CONTESTANT_GALLERY && (
        <FloatingButton
          iconId={FLOATING_ICON.PLUS}
          onPress={() => onAddEventDetailClick()}
          localMsg={
            rearrangeAlbumToast === 0 && galleryList?.length > 3
              ? translations.LONG_HOLD_THE_ALBUM_TO_REARRANGE_POSITION
              : ''
          }
          type={MESSAGE_TYPE.REARRANGE_ALBUM}
        />
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
    </View>
  );
};

export default Gallery;
