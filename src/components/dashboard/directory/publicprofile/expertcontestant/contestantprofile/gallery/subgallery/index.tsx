import React, {useState, useEffect} from 'react';
import {FlatList, Text, SafeAreaView, Dimensions, View} from 'react-native';
import GalleryGridItem from '../../../../../../../common/gallerygriditem';
import {styles} from './styles';
import {
  GET_PUBLIC_PROFILE_SUB_GALLERY,
  PUBLIC_PROFILE_CONTESTANT_ALBUM_IMAGE_FILTER,
} from '../../../../../../../../services/endpoints';
import Header from '../../../../../../../common/header';
import NoRecord from '../../../../../../../common/norecord';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {SCREEN} from '../../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../../../../assets/translations';
import {Param} from '../../../../../../../../services/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DirectoryFilterModal, {FILTER_TYPE} from '../../../../../filtermodal';
import useHtQuery from '../../../../../../../../services/api/useHtQuery';
import {Filter} from '../../../../../../../../services/models/filterData';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import {ContestantWorkWithRequest} from '../../../../../../../../services/models/contestantworkwithrequest';
import {Image} from '../../../../../../../../services/models/gallery/image';
import {Base} from '../../../../../../../../services/models/base';
import {internetState} from '../../../../../../../common/commonalert';
import {
  IS_MINOR_VALUES,
  PARAM_VALUE,
  REFESH_SCREEN,
} from '../../../../../../../utils/enum';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../../store/useAppStore';

const PublicProfileSubGallery = ({route}) => {
  const [isTouchEnable, setTouchEnable] = useState(true);
  const [itemSize, setItemSize] = useState(Number);
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const {
    storeData: {refresh},
  } = useAppStore();
  const [albumImages, setAlbumImages] = useState<Image[]>([]);
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);
  const [isLoadMore, setLoadMore] = useState(true);
  const setScreenRefresh = useSetScreenRefresh();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [requestBody] = useState<ContestantWorkWithRequest>({
    gallery_id: route.params.galleryItem.id,
    profile_id: route.params.profileId,
    page: 1,
  });

  //API GALLERY----------------------------------------- START
  const {data: filters, isLoading: filterLoading} = useHtQuery<Filter[]>({
    key:
      PUBLIC_PROFILE_CONTESTANT_ALBUM_IMAGE_FILTER +
      Param.GALLERY_ID +
      route.params.galleryItem.id +
      Param.PROFILE_ID +
      route.params.galleryItem.profile_id,
    url:
      PUBLIC_PROFILE_CONTESTANT_ALBUM_IMAGE_FILTER +
      Param.GALLERY_ID +
      route.params.galleryItem.id +
      Param.PROFILE_ID +
      route.params.galleryItem.profile_id,
    offSuccessToast: true,
  });

  const {isLoading, mutateAsync: getAlbumImages} = useCgMutation<Base<Image[]>>(
    {
      key: GET_PUBLIC_PROFILE_SUB_GALLERY,
      url: GET_PUBLIC_PROFILE_SUB_GALLERY,
      body: requestBody,
      offSuccessToast: true,
      disableLoader: true,
    },
  );

  const onEndReached = async () => {
    if (albumImages.length > 10) {
      requestBody.page = requestBody.page + 1;
      getList();
    }
  };

  const onItemClick = (index: number, item: Image) => {
    if (isTouchEnable) {
      setTouchEnable(false);
      setTimeout(() => {
        setTouchEnable(true);
      }, 1000);
      navigation.navigate(SCREEN.ALBUM_DETAIL, {
        albumList: albumImages,
        index: index,
        displayKey:
          route.params.galleryItem.id + new Date().getMilliseconds() + '',
        albumId: route.params.galleryItem.id,
        album: route.params.galleryItem,
        galleryType: route.params.galleryType,
        profileId: route.params.galleryItem.profile_id,
        isPublicProfileView: true,
        isPublicProfileAlbumImage: true,
        isFeatured: item?.is_featured_image === IS_MINOR_VALUES.YES,
      });
    }
  };
  useEffect(() => {
    checkTagRefresh();
  }, [refresh]);

  const checkTagRefresh = async () => {
    if (
      REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_EXPERT_ALBUM_IMAGE === refresh
    ) {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_ALBUM);
      createFilterQuery();
    }
  };
  useEffect(() => {
    if (!filterLoading) {
      for (const filterOption of filters?.data) {
        filterOption.type = FILTER_TYPE.SELECT_MULTIPLE_OPTION;
      }
    }
  }, [filterLoading]);

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  useEffect(() => {
    if (albumImages.length === 0 && isLoadMore) {
      getList();
    }
  }, [albumImages]);

  const getList = async () => {
    let data = await getAlbumImages();
    if (data.data?.length === 0) {
      setLoadMore(false);
    }
    setAlbumImages([...albumImages, ...data.data]);
  };

  const createFilterQuery = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      requestBody.page = 1;
      setLoadMore(true);
      var count = 0;
      requestBody.selected_profiles = [];
      if (filters?.data !== undefined) {
        for (const filterOption of filters?.data) {
          var key = [];
          for (const option of filterOption.options) {
            if (option.isSelcted) {
              key.push(option.tag_profile_id);
            }
          }
          if (key.length > 0) {
            count++;
            requestBody.selected_profiles.push({
              title: filterOption.title,
              keys: key,
            });
          }
        }
      }

      setTimeout(() => {
        setAlbumImages([...[]]);
        setAllFillterApplied(count > 0);
      }, 600);
    }
  };

  const onClearFilterApply = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoadMore(true);
      requestBody.selected_profiles = [];

      setTimeout(() => {
        setAlbumImages([...[]]);
        setAllFillterApplied(false);
      }, 600);
    }
  };
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
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
              : ' (' + albumImages?.length + ')'
          }
          isUnderLineRequired
        />
        <View style={styles.gap} />

        {albumImages !== undefined && albumImages.length > 0 ? (
          <FlatList
            data={albumImages}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListFooterComponent={listFooterComponent}
            key={'#'}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item, index}) => (
              <GalleryGridItem
                position={index}
                imageId={item.id.toString()}
                imageUrl={'' + item.image_full_url}
                maxLines={1}
                onItemClickListener={() => {
                  onItemClick(index, item);
                }}
                editIcon={false}
                isFeaturedImage={item.is_featured_image === IS_MINOR_VALUES.YES}
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
        ) : (
          netInfo.isInternetReachable && (
            <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
          )
        )}

        {filters?.data !== undefined &&
          filters?.data?.length > 0 &&
          route.params.galleryItem.album_name !== PARAM_VALUE.GENERAL && (
            <View style={styles.bottomFilterShadowContainer}>
              <View style={styles.bottomFilterContainer}>
                <TouchableOpacity
                  style={styles.filterButtonContainer}
                  onPress={() => {
                    for (const filterOption of filters?.data) {
                      filterOption.type = FILTER_TYPE.SELECT_MULTIPLE_OPTION;
                    }
                    setDirectoryFilterModalVisible(true);
                  }}>
                  <AppImages.Common.filter width={16} height={16} />
                  <Text style={styles.filterTextContainer}>
                    {translations.FILTER}
                  </Text>
                  {isAllFillterApplied && (
                    <View style={styles.filterAppliedCircleContainer} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

        {filters !== undefined &&
          filters?.data !== undefined &&
          filters?.data?.length > 0 && (
            <View>
              <DirectoryFilterModal
                isModalVisible={isDirectoryFilterModalVisible}
                setIsModalVisible={setDirectoryFilterModalVisible}
                filter={filters?.data}
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

export default PublicProfileSubGallery;
