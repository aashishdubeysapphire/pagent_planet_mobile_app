import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Dimensions, View} from 'react-native';
import AppImages from '../../../../../../assets/images/AppImages';
import GalleryGridItem from '../../../../../common/gallerygriditem';
import {styles} from './styles';
import {GalleryData} from '../../../../../../services/models/gallery/galleryData';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import NoRecord from '../../../../../common/norecord';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {PARAM_VALUE, REFESH_SCREEN} from '../../../../../utils/enum';
import {Param} from '../../../../../../services/constants';
import Header from '../../../../../common/header';
import {SCREEN} from '../../../../../../root/screenname';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';

const PagentEventPublicProfileGallery = ({route}) => {
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const {
    storeData: {refresh},
  } = useAppStore();

  const setScreenRefresh = useSetScreenRefresh();
  const netInfo = useNetInfo();

  //API GALLERY----------------------------------------- START
  const {
    data: paginatedData,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<GalleryData>({
    key: route.params.url,
    url: route.params.url,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.galleryList?.length,
    disableLoader: true,
  });

  const pagentGalleryList =
    paginatedData?.pages
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
    navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_SUB_GALLERY, {
      galleryItem: pagentGalleryList[galleryItem],
      profileId: route.params.profileId,
      url:
        route.params.subUrl +
        pagentGalleryList[galleryItem].id +
        Param.PROFILE_ID +
        pagentGalleryList[galleryItem].profile_id,
    });
  };

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (REFESH_SCREEN.PAGEANT_EVENT_ALBUM === refresh) {
      setScreenRefresh(REFESH_SCREEN.PAGEANT_EVENT_PROFILE);
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
      {pagentGalleryList !== undefined && pagentGalleryList.length > 0 ? (
        <FlatList
          data={pagentGalleryList}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          key={'#'}
          ListFooterComponent={listFooterComponent}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <GalleryGridItem
              position={index}
              imageUrl={item?.image_full_url}
              label={
                item?.album_name === PARAM_VALUE.GENERAL
                  ? translations.EXTRA
                  : item?.album_name
              }
              maxLines={1}
              onItemClickListener={onItemClick}
              size={itemSize}
              customStyles={styles.customTitleStyles}
              imageCount={
                item?.album_name === PARAM_VALUE.GENERAL
                  ? undefined
                  : item?.imagesCount
              }
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
    </SafeAreaView>
  );
};

export default PagentEventPublicProfileGallery;
