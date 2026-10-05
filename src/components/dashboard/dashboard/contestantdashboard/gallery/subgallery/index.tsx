import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  BackHandler,
  Dimensions,
  View,
} from 'react-native';
import GalleryGridItem from '../../../../../common/gallerygriditem';
import {styles} from './styles';
import {
  SAVE_MOVED_IMAGES,
  SUB_GALLERY,
} from '../../../../../../services/endpoints';
import {SubGalleryData} from '../../../../../../services/models/gallery/subGalleryData';
import FloatingButton from '../../../../../common/floatingbutton';
import Header from '../../../../../common/header';
import NoRecord from '../../../../../common/norecord';
import AppImages from '../../../../../../assets/images/AppImages';
import {FLOATING_ICON, GALLERY_TYPE} from '../../../../../utils/enum';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {SCREEN} from '../../../../../../root/screenname';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import translations from '../../../../../../assets/translations';
import useAppStore from '../../../../../../store/useAppStore';
import {MESSAGE_TYPE} from '../../../../../common/localnotificationtoast';
import {Base} from '../../../../../../services/models/base';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../common/commonalert';
import {REFESH_SCREEN} from '../../../../../utils/enum';
import {useSetScreenRefresh} from '../../../../../../store/useAppStore';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {Param} from '../../../../../../services/constants';
import {emptyFunction} from '../../../../../utils/helperFunction';

const SubGallery = ({route}) => {
  const [itemSize, setItemSize] = useState(Number);
  const [makeItemSelectable, setMakeItemSelectable] = useState(false);
  const [noOfItemSelected, setNoOfItemSelected] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [isPasteSeccuss, setPasteSeccuss] = useState(false);
  const [isExtraAlbum, setIsExtraAlbum] = useState(false);

  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const setLoader = useSetLoader();
  const setScreenRefresh = useSetScreenRefresh();
  const isFocused = useIsFocused();
  const {
    storeData: {refresh, moveImageToast},
  } = useAppStore();

  //API GALLERY Images ----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteHtQuery<SubGalleryData>({
    key:
      SUB_GALLERY +
      route.params.galleryType +
      Param.GALLERY_ID +
      route.params.galleryItem.id,
    url: SUB_GALLERY + Param.GALLERY_ID + route.params.galleryItem.id,
    page: Param.PAGE_,
    getDataArray: page => {
      return page.data?.images.data.length;
    },
  });

  const albumList =
    paginatedData?.pages
      ?.map((page: SubGalleryData) => {
        if (
          page.data?.images?.data !== null &&
          page.data?.images?.data !== undefined
        ) {
          return page.data?.images.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const {mutateAsync: moveImagesRequest} = useCgMutation<Base>({
    key: SAVE_MOVED_IMAGES,
    url: SAVE_MOVED_IMAGES,
    body: {
      moved_to_gallery_id: route.params.galleryItem.id,
      imageIds: route.params.selectedImageId,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GALLERY Images ----------------------------------------- END

  const onEndReached = async () => {
    fetchNextPage();
  };

  /**
   * `onItemClick` is a function that takes an index as a parameter and navigates to the
   * `EventAlbumDetail` screen if the gallery type is `EVENT_GALLERY` or to the `AlbumDetail` screen if
   * the gallery type is `ALBUM_GALLERY`
   * @param {number} index - index of the album in the album list
   */
  const onItemClick = (index: number) => {
    navigation.navigate(
      route.params.galleryType === GALLERY_TYPE.EVENT_GALLERY
        ? SCREEN.EVENT_ALBUM_DETAIL
        : SCREEN.ALBUM_DETAIL,
      {
        albumList: albumList,
        index: index,
        displayKey:
          route.params.galleryItem.id + new Date().getMilliseconds() + '',
        albumId: route.params.galleryItem.id,
        album: route.params.galleryItem,
        galleryType: route.params.galleryType,
        plan: route.params.plan,
        pageantId: route.params.pageantId,
        galleryParam: route.params.galleryParam,
        parentImageUrl: route.params.parentImageUrl,
        parentBannerImageUrl: route.params.parentBannerImageUrl,
        parentWebsiteUrl: route.params.parentWebsiteUrl,
        parentTitle: route.params.parentTitle,
      },
    );
  };


  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    if (route.params.galleryItem.album_name === translations.EXTRA) {
      setIsExtraAlbum(true);
    }
  }, []);

  /**
   * It takes an imageId as a parameter and then checks if the selectedIndexes array contains the
   * imageId. If it does, it filters the array and removes the imageId from it. If it doesn't, it adds
   * the imageId to the array
   * @param {string} imageId - The id of the image that was long pressed.
   */
  const onLongPressItem = (imageId: string) => {
    setMakeItemSelectable(true);
    if (!selectedIndexes.includes(imageId)) {
      setSelectedIndexes([...selectedIndexes, imageId]);
      setNoOfItemSelected(selectedIndexes.length + 1);
    } else {
      const filterArray = selectedIndexes.filter(i => {
        return selectedIndexes.indexOf(i) !== selectedIndexes.indexOf(imageId);
      });
      setSelectedIndexes(filterArray);
      setNoOfItemSelected(filterArray.length);
      if (filterArray.length === 0) {
        crossIconClicked();
      }
    }
  };

  /**
   * It sets the state of the component to the initial state
   */
  const crossIconClicked = () => {
    setMakeItemSelectable(false);
    setNoOfItemSelected(0);
    setSelectedIndexes([]);
  };

  /**
   * `onAddClick` is a function that navigates to the `UPLOAD_PHOTOH_IN_ALBUM` screen, passing in the
   * `albumList`, `albumId`, `albumName`, `galleryType`, `pageantId`, and `isExtra` parameters
   */
  const onAddClick = () => {
    navigation.navigate(SCREEN.UPLOAD_PHOTOH_IN_ALBUM, {
      albumList: albumList,
      albumId: route.params.galleryItem.id,
      albumName: route.params.galleryItem.album_name,
      galleryType: route.params.galleryType,
      pageantId: route.params.pageantId,
      isExtra: route.params.isExtra,
    });
  };

  /**
   * It takes an imageId as a parameter and checks if the selectedIndexes array contains the imageId. If
   * it does, it filters the array and removes the imageId from the array. If it doesn't, it adds the
   * imageId to the array
   * @param {string} imageId - The id of the image that is selected.
   */
  const selectImages = (imageId: string) => {
    if (!selectedIndexes.includes(imageId)) {
      setSelectedIndexes([...selectedIndexes, imageId]);
      setNoOfItemSelected(selectedIndexes.length + 1);
    } else {
      const filterArray = selectedIndexes.filter(i => {
        return selectedIndexes.indexOf(i) !== selectedIndexes.indexOf(imageId);
      });
      setSelectedIndexes(filterArray);
      setNoOfItemSelected(filterArray.length);
      if (filterArray.length === 0) {
        crossIconClicked();
      }
    }
  };

  /**
   * A function that is called when the move button is clicked.
   */
  const moveButtonClick = () => {
    if (noOfItemSelected === 0) {
      toast(
        translations.PLEASE_SELECT_ATLEAST_ONE_ITEM,
        toastType.SUCESS_TOAST,
      );
    } else {
      navigation.navigate(SCREEN.SELECTABLE_ALBUM, {
        galleryType: route.params.galleryType,
        pageantId: route.params.pageantId,
        galleryParam: route.params.galleryParam,
        selectedImageId: selectedIndexes,
        noOfItemSelected: noOfItemSelected,
      });
    }
  };

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  /**
   * A function that is called when the screen is refreshed.
   */
  const refeshScreenList = async () => {
    if (REFESH_SCREEN.SUB_GALLERY === refresh) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  /**
   * A function that is used to move images from one folder to another.
   */
  const pasteImagesHere = async () => {
    if (netInfo.isInternetReachable && netInfo.isInternetReachable) {
      setLoader(true);
      const response = await moveImagesRequest();
      if (response.success) {
        toast(
          route.params.noOfItemSelected === 1
            ? route.params.noOfItemSelected + translations.IMAGE_WAS_ADDED
            : route.params.noOfItemSelected + translations.IMAGES_WERE_ADDED,
          toastType.SUCESS_TOAST,
        );
        setPasteSeccuss(true);
        await refetch();
        setLoader(false);
        setScreenRefresh(REFESH_SCREEN.GALLERY);
      } else {
        setLoader(false);
      }
    } else {
      internetState(netInfo.isConnected!!);
    }
  };

  const onPressBack = () => {
    backButtonHandled();
    return true;
  };

  useEffect(() => {
    const hardwareBack = BackHandler.addEventListener('hardwareBackPress', onPressBack);
    return () =>
      hardwareBack.remove();
  }, [onPressBack]);

  const backButtonHandled = () => {
    if (isPasteSeccuss) {
      navigation.goBack();
      navigation.goBack();
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };
  useEffect(() => {
    if (isFocused) {
      setSelectedIndexes([]);
      setMakeItemSelectable(false);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={
            selectedIndexes.length > 0
              ? noOfItemSelected + translations.CAPITAL_SELECTED
              : route.params.galleryItem.album_name
          }
          showImageCount={isLoading ? null : ' (' + albumList?.length + ')'}
          isUnderLineRequired
          crossIcon={selectedIndexes.length > 0}
          onCrossIconClick={crossIconClicked}
          rightText={
            makeItemSelectable && isExtraAlbum
              ? translations.MOVE
              : route.params.selectedImageId !== undefined &&
                route.params.selectedImageId.length > 0 &&
                !isPasteSeccuss
              ? translations.PASTE
              : ''
          }
          onPressRightText={() =>
            makeItemSelectable && isExtraAlbum
              ? moveButtonClick()
              : route.params.selectedImageId !== undefined &&
                route.params.selectedImageId.length > 0
              ? pasteImagesHere()
              : null
          }
          onCustomPressBack={backButtonHandled}
        />
        <View style={styles.gap} />

        {albumList.length > 0 ? (
          <FlatList
            data={albumList}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={2}
            numColumns={2}
            key={'#'}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item, index}) => (
              <GalleryGridItem
                position={index}
                imageId={item.id.toString()}
                imageUrl={'' + item.image_full_url}
                isLast={albumList?.length!! % 2 !== 0}
                maxLines={1}
                onItemClickListener={() => {
                  makeItemSelectable && isExtraAlbum
                    ? selectImages(item.id.toString())
                    : route.params.selectedImageId !== undefined &&
                      route.params.selectedImageId.length > 0 &&
                      !isPasteSeccuss
                    ? emptyFunction()
                    : onItemClick(index);
                }}
                editIcon={false}
                isFeaturedImage={index === 0}
                size={itemSize}
                onLongPressItem={() => {
                  isExtraAlbum
                    ? onLongPressItem(item.id.toString())
                    : emptyFunction();
                }}
                itemSelectable={
                  makeItemSelectable && isExtraAlbum ? true : false
                }
                selectedItemIndexes={selectedIndexes}
              />
            )}
          />
        ) : (isLoading && netInfo.isInternetReachable) ||
          (isFetching && netInfo.isInternetReachable) ? (
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

        {route.params.selectedImageId === undefined && !makeItemSelectable && (
          <FloatingButton
            iconId={FLOATING_ICON.CAMERA}
            onPress={() => onAddClick()}
            localMsg={
              moveImageToast === 0 && albumList.length > 0 && isExtraAlbum
                ? translations.PRESS_CAN_NOT_TAGS_IN_EXTRA_ALBUM
                : ''
            }
            type={MESSAGE_TYPE.MOVE_EXTRA_ALBUM_MSG}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SubGallery;
