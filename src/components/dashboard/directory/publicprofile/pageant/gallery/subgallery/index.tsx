import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Dimensions, View} from 'react-native';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {styles} from './styles';
import Header from '../../../../../../common/header';
import NoRecord from '../../../../../../common/norecord';
import AppImages from '../../../../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import {Param} from '../../../../../../../services/constants';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../store/useAppStore';
import {
  IS_MINOR_VALUES,
  PARAM_VALUE,
  REFESH_SCREEN,
} from '../../../../../../utils/enum';
import {Images} from '../../../../../../../services/models/gallery/subGalleryResponse';
import {Base} from '../../../../../../../services/models/base';
import translations from '../../../../../../../assets/translations';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {DataFilter} from '../../../../../../../services/models/filterData';
import {PAGEANT_EVENT_FILTERS} from '../../../../../../../services/endpoints';
import DirectoryFilterModal from '../../../../filtermodal';
import {internetState} from '../../../../../../common/commonalert';
import {Image} from '../../../../../../../services/models/gallery/image';

const PageantEventPublicProfileSubGallery = ({route}) => {
  const [itemSize, setItemSize] = useState(Number);
  const [isTouchEnable, setTouchEnable] = useState(true);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const {
    storeData: {refresh},
  } = useAppStore();

  const setScreenRefresh = useSetScreenRefresh();
  //API GALLERY Images ----------------------------------------- START

  const {data: filters} = useHtQuery<DataFilter>({
    key: PAGEANT_EVENT_FILTERS + route.params.profileId,
    url: PAGEANT_EVENT_FILTERS + route.params.profileId,
    offSuccessToast: true,
  });

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteHtQuery<Base<Images>>({
    key: route.params.url,
    url: route.params.url,
    page: Param.PAGE_,
    getDataArray: page => {
      return page.data?.length;
    },
    offSuccessToast: true,
  });

  const pageantSubGalleryAlbumList =
    paginatedData?.pages
      ?.map((page: Base<Images>) => {
        if (page?.data?.data !== null && page?.data !== undefined) {
          return page.data;
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
  const onItemClick = (index: number, item: Image) => {
    if (isTouchEnable) {
      setTouchEnable(false);
      setTimeout(() => {
        setTouchEnable(true);
      }, 1000);
      navigation.navigate(SCREEN.ALBUM_DETAIL, {
        albumList: pageantSubGalleryAlbumList,
        index: index,
        displayKey:
          route.params.galleryItem.gallery_id +
          new Date().getMilliseconds() +
          '',
        albumId: route.params.galleryItem.gallery_id,
        album: route.params.galleryItem,
        profileId: route.params.galleryItem.record_id,
        isPublicProfileView: true,
        isPublicProfileAlbumImage: true,
        isFeaturedImage: item?.is_featured_image === IS_MINOR_VALUES.YES,
      });
    }
  };

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (
      REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE === refresh
    ) {
      setScreenRefresh(REFESH_SCREEN.PAGEANT_EVENT_ALBUM);
      refetch();
    }
  };
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  const createFilterQuery = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setTimeout(() => {
        setAllFillterApplied(false);
      }, 600);
    }
  };

  const onClearFilterApply = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setAllFillterApplied(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={
            route.params.galleryItem.album_name === PARAM_VALUE.GENERAL
              ? translations.EXTRA
              : route.params.galleryItem.album_name
          }
          showImageCount={
            isLoading ||
            route.params.galleryItem.album_name === PARAM_VALUE.GENERAL
              ? null
              : ' (' + pageantSubGalleryAlbumList?.length + ')'
          }
          isUnderLineRequired
        />
        <View style={styles.gap} />

        {pageantSubGalleryAlbumList.length > 0 ? (
          <FlatList
            data={pageantSubGalleryAlbumList}
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
                isFeaturedImage={
                  item?.is_featured_image === IS_MINOR_VALUES.YES
                }
                onItemClickListener={() => {
                  onItemClick(index, item);
                }}
                editIcon={false}
                size={itemSize}
                imageId={item.id.toString()}
                imageUrl={'' + item?.image_full_url}
                maxLines={1}
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
        ) : (
          netInfo.isInternetReachable && (
            <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
          )
        )}

        {filters !== undefined &&
          filters?.data?.pageantAlbumsFilters !== undefined &&
          filters?.data?.pageantAlbumsFilters.length > 0 && (
            <View>
              <DirectoryFilterModal
                isModalVisible={isDirectoryFilterModalVisible}
                setIsModalVisible={setDirectoryFilterModalVisible}
                filter={filters?.data?.pageantAlbumsFilters}
                onFilterApply={createFilterQuery}
                onClearFilterApply={onClearFilterApply}
                isAllFillterApplied={isAllFillterApplied}
              />
            </View>
          )}
      </View>
    </SafeAreaView>
  );
};

export default PageantEventPublicProfileSubGallery;
