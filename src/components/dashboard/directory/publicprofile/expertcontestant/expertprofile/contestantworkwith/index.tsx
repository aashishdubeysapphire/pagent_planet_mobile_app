import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Dimensions, Text, View} from 'react-native';
import AppImages from '../../../../../../../assets/images/AppImages';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  DIRECTORY_ID,
  PARAM_VALUE,
  PROFILE_STATUS,
  REFESH_SCREEN,
  ROLES,
  TAG_TYPE,
} from '../../../../../../utils/enum';
import Header from '../../../../../../common/header';
import {PageantResult} from '../../../../../../../services/models/pageantdetails/contestantPublicDetails';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {
  PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_FILTER,
  PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH,
} from '../../../../../../../services/endpoints';
import {DataFilter} from '../../../../../../../services/models/filterData';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DirectoryFilterModal from '../../../../filtermodal';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {ContestantWorkWithRequest} from '../../../../../../../services/models/contestantWorkWithRequest';
import {SCREEN} from '../../../../../../../root/screenname';
import {GalleryItem} from '../../../../../../../services/models/gallery/galleryItem';
import {internetState} from '../../../../../../common/commonalert';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../store/useAppStore';

const ExpertPublicProfileContestantWorkWith = ({route}) => {
  const navigation = useNavigation();
  const [isLoadMore, setLoadMore] = useState(true);
  const [itemSize, setItemSize] = useState(Number);
  const [totalCount, setTotalCount] = useState(Number);
  const [albumImages, setAlbumImages] = useState<GalleryItem[]>([]);
  const [requestBody] = useState<ContestantWorkWithRequest>({
    business_profile_id: route.params.profileId,
    page: 1,
  });
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);
  const netInfo = useNetInfo();
  const {
    storeData: {refresh},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();

  //API GALLERY----------------------------------------- START
  const {data: filters} = useHtQuery<DataFilter>({
    key:
      PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_FILTER +
      route.params.profileId,
    url:
      PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH_FILTER +
      route.params.profileId,
    offSuccessToast: true,
  });

  const {isLoading, mutateAsync: getContestWorkWithList} =
    useCgMutation<PageantResult>({
      key: PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH,
      url: PUBLIC_PROFILE_EXPERT_CONTESTANT_WORK_WITH,
      body: requestBody,
      offSuccessToast: true,
      disableLoader: true,
    });

  //API GALLERY----------------------------------------- END

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  useEffect(() => {
    if (albumImages.length === 0 && isLoadMore) {
      getList();
    }
    if (albumImages.length === 0 && !isLoadMore && !isAllFillterApplied) {
      navigation.goBack();
    }
  }, [albumImages]);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT_WORK_WITH_ALBUM === refresh) {
      setAlbumImages([]);
      requestBody.page = 1;
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EXPERT);
    }
  };

  const getList = async () => {
    var data = await getContestWorkWithList();
    if (data.data?.contestantsWorkedAlbums?.length === 0) {
      setLoadMore(false);
    }
    if (requestBody.page === 1) {
      setTotalCount(data?.data?.contesantsWorkedAlbumsCount);
    }
    setAlbumImages([...albumImages, ...data.data?.contestantsWorkedAlbums]);
  };
  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    if (albumImages.length > 10) {
      requestBody.page = requestBody.page + 1;
      getList();
    }
  };

  /**
   * OnItemClick is a function that takes a galleryItem as a parameter and returns a function that
   * navigates to the sub gallery screen
   * @param {number} galleryItem - The index of the item in the galleryList array.
   */
  const onItemClick = (galleryItem: number) => {
    if (albumImages[galleryItem].imagesCount > 0) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_WORK_WITH_ALBUM_IMAGES, {
        galleryItem: albumImages[galleryItem],
        role: route.params.role,
        tag: new Date().getMilliseconds(),
        profileId: route?.params?.profileId,
        isPublicProfileView: route?.params?.isPublicProfileView,
        isPublicProfileAlbumImage: route?.params?.isPublicProfileAlbumImage,
      });
    }
  };

  const onNameClick = (index: number) => {
    if (
      albumImages[index].contestantDetails !== undefined &&
      albumImages[index].contestantDetails.is_minor === translations.NO_SMALL &&
      albumImages[index].contestantDetails.status === PROFILE_STATUS.ACTIVE
    ) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: albumImages[index].contestantDetails.owner_id,
        profileId: albumImages[index].contestantDetails.id,
        name: albumImages[index].album_name,
        category: DIRECTORY_ID.CONTESTANT,
        selectedTab: ROLES.CONTESTANT,
        key: new Date().getMilliseconds(),
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
  const createFilterQuery = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoadMore(true);
      requestBody.selected_profiles = [];
      var count = 0;
      if (filters?.data?.contestantsWorkedAlbumsFilters !== undefined) {
        for (const filterOption of filters?.data
          ?.contestantsWorkedAlbumsFilters) {
          var key = [];
          for (const option of filterOption.options) {
            if (option?.isSelcted) {
              key.push(option.tag_profile_id);
            }
          }
          if (key?.length > 0) {
            count++;
            requestBody.selected_profiles.push({
              title: filterOption.title,
              keys: key,
            });
          } else if (
            filterOption?.query?.length > 0 &&
            filterOption.title === TAG_TYPE.TAGGED_IMAGES
          ) {
            count++;
            let value = filterOption?.query[0].split('=');
            requestBody.tagged_image = {value: value[1]};
          }
        }
      }

      setTimeout(() => {
        setAlbumImages([...[]]);
        setAllFillterApplied(count > 0);
      }, 650);
    }
  };

  const onClearFilterApply = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      requestBody.selected_profiles = [];
      requestBody.tagged_image = undefined;
      filters?.data?.contestantsWorkedAlbumsFilters.forEach(element => {
        element.query = [];
        element.tempQuery = [];
        element.selectedIndex = -1;
      });
      setLoadMore(true);
      setTimeout(() => {
        setAlbumImages([]);
        setAllFillterApplied(false);
      }, 600);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={translations.CONTESTANT_WORKED_WITH}
          isUnderLineRequired
          showImageCount={isLoading ? null : ' (' + totalCount + ')'}
        />
        <View style={styles.space} />
        {albumImages !== undefined && albumImages.length > 0 ? (
          <FlatList
            data={albumImages}
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
                imageUrl={item?.selectedImage}
                label={
                  item?.album_name === PARAM_VALUE.GENERAL
                    ? translations.EXTRA
                    : item?.album_name
                }
                isMinor={item.contestantDetails?.is_minor}
                ownerId={item.contestantDetails?.owner_id}
                status={item?.contestantDetails?.status}
                maxLines={1}
                onTextClickListener={onNameClick}
                onItemClickListener={onItemClick}
                size={itemSize}
                imageCount={item?.imagesCount}
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
            <View style={styles.container1}>
              <Text ellipsizeMode="tail" style={styles.noRecord}>
                {translations.NO_RESULT_FOR_SELECTED_FILTER}
              </Text>
            </View>
          )
        )}

        {filters?.data?.contestantsWorkedAlbumsFilters !== undefined &&
          filters?.data?.contestantsWorkedAlbumsFilters?.length > 0 && (
            <View style={styles.bottomFilterShadowContainer}>
              <View style={styles.bottomCWWFilterContainer}>
                <TouchableOpacity
                  style={styles.filterCWWButtonContainer}
                  onPress={() => {
                    setDirectoryFilterModalVisible(true);
                  }}>
                  <AppImages.Common.filter width={16} height={16} />
                  <Text style={styles.filterCWWTextContainer}>
                    {translations.FILTER}
                  </Text>
                  {isAllFillterApplied && (
                    <View style={styles.filterCWWAppliedCircleContainer} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        {filters !== undefined &&
          filters?.data?.contestantsWorkedAlbumsFilters !== undefined &&
          filters?.data?.contestantsWorkedAlbumsFilters?.length > 0 && (
            <View>
              <DirectoryFilterModal
                isModalVisible={isDirectoryFilterModalVisible}
                setIsModalVisible={setDirectoryFilterModalVisible}
                filter={filters?.data?.contestantsWorkedAlbumsFilters}
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

export default ExpertPublicProfileContestantWorkWith;
