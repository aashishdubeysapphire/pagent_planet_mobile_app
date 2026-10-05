import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Dimensions, View} from 'react-native';
import GalleryGridItem from '../../../../../../../common/gallerygriditem';
import {styles} from './styles';
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
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../../store/useAppStore';
import {PARAM_VALUE, REFESH_SCREEN} from '../../../../../../../utils/enum';
import { trackScreenView } from '../../../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../../../assets/translations/analyticsscreenname';

const ExpertPublicProfilePageantWorkWithSubGallery = ({route}) => {
  const [itemSize, setItemSize] = useState(Number);
  const [isTouchEnable, setTouchEnable] = useState(true);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const {
    storeData: {refresh},
  } = useAppStore();

  const setScreenRefresh = useSetScreenRefresh();
  //API GALLERY Images ----------------------------------------- START

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteHtQuery<SubGalleryData>({
    key: route.params.url,
    url: route.params.url,
    page: Param.PAGE_,
    getDataArray: page => {
      return page.data?.images.data.length;
    },
    offSuccessToast: true,
  });

  const albumList =
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
    if (isTouchEnable) {
      setTouchEnable(false);
      setTimeout(() => {
        setTouchEnable(true);
      }, 1000);
      navigation.navigate(SCREEN.ALBUM_DETAIL, {
        albumList: albumList,
        index: index,
        displayKey:
          route.params.galleryItem.gallery_id +
          new Date().getMilliseconds() +
          '',
        albumId: route.params.galleryItem.gallery_id,
        album: route.params.galleryItem,
        galleryType: route.params.profile.slug,
        profileId: route.params.galleryItem.record_id,
        isPublicProfileView: true,
        isPublicProfileAlbumImage: true,
      });
    }
  };

  const refeshScreen = async () => {
    if (
      REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE === refresh
    ) {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_PAGEANT_WORK_WITH_ALBUM);
      refetch();
    }
  };
  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.EXPERT_PEGEANT_WORK_WITH_ALBUM_IMAGES)
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          isUnderLineRequired
          lable={route.params.galleryItem.album_name}
          showImageCount={
            isLoading ||
            route.params.galleryItem.album_name === PARAM_VALUE.GENERAL
              ? null
              : ' (' + albumList?.length + ')'
          }
        />
        <View style={styles.gap} />

        {albumList.length > 0 ? (
          <FlatList
            data={albumList}
            onEndReached={onEndReached}
            onEndReachedThreshold={2}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={'#'}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <GalleryGridItem
                position={index}
                imageId={item.id.toString()}
                maxLines={1}
                imageUrl={'' + item.image_full_url}
                isFeaturedImage={index === 0}
                editIcon={false}
                onItemClickListener={() => {
                  onItemClick(index);
                }}
                size={itemSize}
              />
            )}
          />
        ) : (isLoading && netInfo.isInternetReachable) ||
          (isFetching && netInfo.isInternetReachable) ? (
          <ShimmerList
            height={itemSize}
            width={itemSize}
            padding={15}
            numColumns={2}
          />
        ) : (
          netInfo.isInternetReachable && (
            <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default ExpertPublicProfilePageantWorkWithSubGallery;
