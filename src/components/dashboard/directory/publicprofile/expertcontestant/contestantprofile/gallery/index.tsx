import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Dimensions, View} from 'react-native';
import AppImages from '../../../../../../../assets/images/AppImages';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {styles} from './styles';
import {GET_CONTESTANT_PUBLIC_PROFILE_GALLERY} from '../../../../../../../services/endpoints';
import {GalleryData} from '../../../../../../../services/models/gallery/galleryData';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import NoRecord from '../../../../../../common/norecord';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  PARAM_VALUE,
  PROFILE_STATUS,
  REFESH_SCREEN,
} from '../../../../../../utils/enum';
import {Param} from '../../../../../../../services/constants';
import Header from '../../../../../../common/header';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../store/useAppStore';
import {internetState} from '../../../../../../common/commonalert';
import {checkIsNull} from '../../../../../../utils/validations';

const PublicProfileGallery = ({route}) => {
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const netInfo = useNetInfo();
  const {
    storeData: {refresh},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();

  //API GALLERY----------------------------------------- START
  const {
    data: contestantPaginatedData,
    fetchNextPage,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<GalleryData>({
    key: GET_CONTESTANT_PUBLIC_PROFILE_GALLERY + route.params.profileId,
    url: GET_CONTESTANT_PUBLIC_PROFILE_GALLERY + route.params.profileId,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.galleryList?.length,
    reverse: true,
    disableLoader: true,
  });

  const constentantPublicProfileAlbums =
    contestantPaginatedData?.pages
      ?.map((page: GalleryData) => {
        if (
          page?.data?.galleryList !== null &&
          page?.data?.galleryList !== undefined
        ) {
          return page?.data?.galleryList;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  //API GALLERY----------------------------------------- END

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    fetchNextPage();
  };

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  /**
   * OnItemClick is a function that takes a galleryItem as a parameter and returns a function that
   * navigates to the sub gallery screen
   * @param {number} galleryItem - The index of the item in the galleryList array.
   */
  const onItemClick = (galleryItem: number) => {
    navigation.navigate(SCREEN.PUBLIC_PROFILE_SUB_GALLERY, {
      galleryItem: constentantPublicProfileAlbums[galleryItem],
      profileId: route.params.profileId,
    });
  };

  const onTextClicked = (items: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (items?.status === PROFILE_STATUS.ACTIVE) {
        let pageantId = items?.pageant_id;
        let eventId = items?.id;
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: checkIsNull(pageantId) ? pageantId : eventId,
          name: items?.album_name,
        });
      }
    }
  };

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_ALBUM === refresh) {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT);
      refetch();
    }
  };
  /**
   * It returns a View component with a style of staticHeight
   * @returns A view with a static height.
   */
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.ALBUMS} isUnderLineRequired />
      <View style={styles.space} />
      {constentantPublicProfileAlbums !== undefined &&
      constentantPublicProfileAlbums.length > 0 ? (
        <FlatList
          data={constentantPublicProfileAlbums}
          nestedScrollEnabled={true}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          key={'#'}
          ListFooterComponent={listFooterComponent}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <GalleryGridItem
              position={index}
              imageUrl={item?.original_image}
              label={
                item?.album_name === PARAM_VALUE.GENERAL
                  ? translations.EXTRA
                  : item?.album_name
              }
              maxLines={1}
              onItemClickListener={onItemClick}
              size={itemSize}
              imageCount={
                item?.album_name === PARAM_VALUE.GENERAL
                  ? undefined
                  : item?.imagesCount
              }
              onTextClickListener={() => onTextClicked(item)}
              isMinor={translations.NO_SMALL}
              status={item?.status}
            />
          )}
        />
      ) : isLoading && netInfo.isInternetReachable ? (
        <ShimmerList
          width={itemSize}
          height={itemSize}
          padding={16}
          numColumns={2}
        />
      ) : (
        netInfo.isInternetReachable && (
          <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
        )
      )}
    </SafeAreaView>
  );
};

export default PublicProfileGallery;
