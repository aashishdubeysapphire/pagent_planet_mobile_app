import React, {useState, useEffect} from 'react';
import {
  FlatList,
  BackHandler,
  SafeAreaView,
  Dimensions,
  View,
} from 'react-native';
import GalleryGridItem from '../../../../../../../common/gallerygriditem';
import {styles} from './styles';
import {
  PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_ALBUM,
  SAVE_MOVED_IMAGES,
} from '../../../../../../../../services/endpoints';
import {SubGalleryData} from '../../../../../../../../services/models/gallery/subGalleryData';
import Header from '../../../../../../../common/header';
import NoRecord from '../../../../../../../common/norecord';
import AppImages from '../../../../../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../../../../../services/api/useHtInfiniteQuery';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {SCREEN} from '../../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import {Param} from '../../../../../../../../services/constants';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../common/commonalert';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../store/useAppStore';
import {
  FLOATING_ICON,
  PARAM_VALUE,
  REFESH_SCREEN,
} from '../../../../../../../utils/enum';
import FloatingButton from '../../../../../../../common/floatingbutton';
import translations from '../../../../../../../../assets/translations';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../../../services/models/base';
import {
  createFirebaseLog,
  trackScreenView,
} from '../../../../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../../../../assets/translations/analyticsscreenname';

const ExpertPublicProfileContestWorkWithSubGallery = ({route}) => {
  const [itemSize, setItemSize] = useState(Number);
  const [isTouchEnable, setTouchEnable] = useState(true);
  const [isMoveImaged, setMoveImaged] = useState(false);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const setLoader = useSetLoader();
  const {
    storeData: {refresh},
  } = useAppStore();

  const setScreenRefresh = useSetScreenRefresh();
  //API GALLERY Images ----------------------------------------- START

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

  const getDashboardFlag = async () => {
    createFirebaseLog(
      getDashboardFlag.name,
      SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES,
    );
    if (route.params.itemType === SCREEN.EXPERT_ALBUM) {
      return '&from_dashboard=true';
    } else {
      return '&from_dashboard=false';
    }
  };
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useInfiniteHtQuery<SubGalleryData>({
    key:
      PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_ALBUM +
      Param.GALLERY_ID +
      route.params.galleryItem.id +
      Param.PROFILE_ID +
      route.params.galleryItem.record_id +
      '&profile_type=' +
      route.params.galleryItem.type +
      '&album_created_by=' +
      route.params.galleryItem.record_id +
      '&current_business_profile_id=' +
      route.params.profileId +
      '&current_business_profile_type=' +
      route.params.role.slug +
      getDashboardFlag(),
    url:
      PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_ALBUM +
      Param.GALLERY_ID +
      route.params.galleryItem.id +
      Param.PROFILE_ID +
      route.params.galleryItem.record_id +
      '&profile_type=' +
      route.params.galleryItem.type +
      '&album_created_by=' +
      route.params.galleryItem.record_id +
      '&current_business_profile_id=' +
      route.params.profileId +
      '&current_business_profile_type=' +
      route.params.role.slug +
      getDashboardFlag(),
    page: Param.PAGE_,
    getDataArray: page => {
      return page.data?.images.data.length;
    },
    offSuccessToast: true,
  });

  const contestantWorkWithAlbumList =
    paginatedData?.pages
      ?.map((page: SubGalleryData) => {
        if (
          page?.data?.images?.data !== null &&
          page?.data?.images?.data !== undefined
        ) {
          return page.data?.images.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const onEndReached = async () => {
    createFirebaseLog(
      onEndReached.name,
      SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES,
    );
    fetchNextPage();
  };

  const refeshScreen = async () => {
    createFirebaseLog(
      refeshScreen.name,
      SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES,
    );
    if (
      REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE === refresh
    ) {
      if (
        route.params.itemType !== undefined &&
        route.params.itemType === SCREEN.EXPERT_ALBUM
      ) {
        setScreenRefresh(REFESH_SCREEN.EXPERT_ALBUM_VIEW);
        setTimeout(() => {
          setScreenRefresh(REFESH_SCREEN.EXPERT_DASHBOARD_ALBUM);
        }, 1000);
      } else {
        setScreenRefresh(
          REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_WORK_WITH_ALBUM,
        );
      }
      refetch();
    }
  };
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES);
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  const onItemClick = (index: number) => {
    createFirebaseLog(
      onItemClick.name,
      SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES,
    );
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (isTouchEnable) {
        setTouchEnable(false);
        setTimeout(() => {
          setTouchEnable(true);
        }, 1000);

        navigation.navigate(SCREEN.ALBUM_DETAIL, {
          albumList: contestantWorkWithAlbumList,
          index: index,
          album: route.params.galleryItem,
          albumId: route.params.galleryItem.id,
          displayKey:
            route.params.galleryItem.id + new Date().getMilliseconds() + '',
          album: route.params.galleryItem,
          itemType: route.params.itemType,
          galleryParam: route.params.galleryParam,
          galleryType: route.params.role.role,
          profileId: route.params.galleryItem.record_id,
          expertAlbumType: route.params.expertAlbumType,
          isPublicProfileView: route?.params?.isPublicProfileView,
          isPublicProfileAlbumImage: route?.params?.isPublicProfileAlbumImage,
        });
      }
    }
  };
  /**
   * `onAddClick` is a function that navigates to the `UPLOAD_PHOTOH_IN_ALBUM` screen, passing in the
   * `albumList`, `albumId`, `albumName`, `galleryType`, `pageantId`, and `isExtra` parameters
   */
  const onAddClick = () => {
    createFirebaseLog(
      onAddClick.name,
      SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES,
    );
    navigation.navigate(SCREEN.UPLOAD_PHOTOH_IN_ALBUM, {
      albumId: route.params.galleryItem.id,
      albumName: route.params.galleryItem.album_name,
      galleryType: '',
      isExtra: false,
      itemType: route.params.itemType,
      expert: route.params.expert,
      expertAlbumType: route.params.expertAlbumType,
    });
  };
  const onPasteClick = async () => {
    createFirebaseLog(
      onPasteClick.name,
      SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES,
    );
    if (netInfo.isConnected && !isMoveImaged) {
      setLoader(true);
      const response = await moveImagesRequest();
      if (response.success) {
        toast(
          route.params.noOfItemSelected === 1
            ? route.params.noOfItemSelected + translations.IMAGE_WAS_ADDED
            : route.params.noOfItemSelected + translations.IMAGES_WERE_ADDED,
          toastType.SUCESS_TOAST,
        );
        setMoveImaged(true);
        await refetch();
        setScreenRefresh(REFESH_SCREEN.EXPERT_ALBUM_VIEW);
      }
      setLoader(false);
    } else {
      internetState(netInfo.isConnected!!);
    }
  };
  const onPressBack = () => {
    createFirebaseLog(
      onPressBack.name,
      SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES,
    );
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, [onPressBack]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={route.params.galleryItem.album_name}
          isUnderLineRequired
          showImageCount={
            isLoading ||
            route.params.galleryItem.album_name === PARAM_VALUE.GENERAL
              ? null
              : ' (' + contestantWorkWithAlbumList?.length + ')'
          }
          rightText={
            route.params.isMoveImageActive && !isMoveImaged
              ? translations.PASTE
              : ''
          }
          onPressRightText={() => onPasteClick()}
        />
        <View style={styles.gap} />

        {contestantWorkWithAlbumList.length > 0 ? (
          <FlatList
            data={contestantWorkWithAlbumList}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            key={'#'}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            onEndReachedThreshold={2}
            renderItem={({item, index}) => (
              <GalleryGridItem
                position={index}
                imageUrl={'' + item.image_full_url}
                isFeaturedImage={index === 0}
                imageId={item.id.toString()}
                onItemClickListener={() => {
                  onItemClick(index);
                }}
                maxLines={1}
                editIcon={false}
                size={itemSize}
              />
            )}
          />
        ) : (isLoading && netInfo.isInternetReachable) ||
          (isFetching && netInfo.isInternetReachable) ? (
          <ShimmerList
            width={itemSize}
            height={itemSize}
            numColumns={2}
            padding={15}
          />
        ) : (
          netInfo.isInternetReachable && (
            <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
          )
        )}
        {route.params.itemType === SCREEN.EXPERT_ALBUM &&
          route.params.isMoveImageActive !== undefined &&
          !route.params.isMoveImageActive && (
            <FloatingButton
              iconId={FLOATING_ICON.CAMERA}
              onPress={() => onAddClick()}
            />
          )}
      </View>
    </SafeAreaView>
  );
};

export default ExpertPublicProfileContestWorkWithSubGallery;
