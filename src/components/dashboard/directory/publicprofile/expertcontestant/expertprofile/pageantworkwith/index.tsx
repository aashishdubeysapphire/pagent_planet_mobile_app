import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, Dimensions, View} from 'react-native';
import AppImages from '../../../../../../../assets/images/AppImages';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {styles} from './styles';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  PARAM_VALUE,
  PROFILE_STATUS,
  REFESH_SCREEN,
} from '../../../../../../utils/enum';
import {Param} from '../../../../../../../services/constants';
import Header from '../../../../../../common/header';
import {PageantResult} from '../../../../../../../services/models/pageantdetails/contestantPublicDetails';
import {
  PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH,
  PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_ALBUM_IMAGES,
  PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_FILTER,
} from '../../../../../../../services/endpoints';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../common/commonalert';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../store/useAppStore';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {DataFilter} from '../../../../../../../services/models/filterData';
import DirectoryFilterModal from '../../../../filtermodal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkIsNull} from '../../../../../../utils/validations';

const ExpertPublicProfilePageantWorkWith = ({route}) => {
  const navigation = useNavigation();
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);
  const [itemSize, setItemSize] = useState(Number);
  const netInfo = useNetInfo();
  const [completeFilterQuery, setCompleteFilterQuery] = useState('');
  const {
    storeData: {refresh},
  } = useAppStore();
  const [totalCount, setTotalCount] = useState(Number);
  const setScreenRefresh = useSetScreenRefresh();

  //API GALLERY----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    refetch,
    isLoading,
  } = useInfiniteHtQuery<PageantResult>({
    key:
      PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH +
      route.params.profileId +
      completeFilterQuery,
    url:
      PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH +
      route.params.profileId +
      completeFilterQuery,
    page: Param.PAGE_,
    getDataArray: page =>
      page?.data?.contestantsWorkedAlbums !== undefined
        ? page?.data?.contestantsWorkedAlbums.length
        : page?.data?.pageantsWorkedAlbums.length,
    disableLoader: true,
  });

  const galleryList =
    paginatedData?.pages
      ?.map((page: PageantResult) => {
        if (
          (page?.data?.contestantsWorkedAlbums !== null &&
            page?.data?.contestantsWorkedAlbums) !== undefined
        ) {
          return page?.data?.contestantsWorkedAlbums;
        } else if (
          (page?.data?.pageantsWorkedAlbums !== null &&
            page?.data?.pageantsWorkedAlbums) !== undefined
        ) {
          return page?.data?.pageantsWorkedAlbums;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const {data: filters} = useHtQuery<DataFilter>({
    key:
      PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_FILTER + route.params.profileId,
    url:
      PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_FILTER + route.params.profileId,
    offSuccessToast: true,
  });

  useEffect(() => {
    if (completeFilterQuery !== undefined && !isLoading) {
      refetch();
    }
  }, [completeFilterQuery]);

  //API GALLERY----------------------------------------- END

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  useEffect(() => {
    setTotalCount(paginatedData?.pages[0]?.data?.pageantsWorkedAlbumsCount);
  }, [paginatedData]);

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    fetchNextPage();
  };

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (REFESH_SCREEN.PUBLIC_PROFILE_PAGEANT_WORK_WITH_ALBUM === refresh) {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EXPERT);
      refetch();
    }
  };

  /**
   * OnItemClick is a function that takes a galleryItem as a parameter and returns a function that
   * navigates to the sub gallery screen
   * @param {number} galleryItem - The index of the item in the galleryList array.
   */
  const onItemClick = (galleryItem: number) => {
    if (
      galleryList[galleryItem].inactive_tag === undefined ||
      !galleryList[galleryItem].inactive_tag
    ) {
      if (galleryList[galleryItem].imagesCount > 0) {
        let url =
          PUBLIC_PROFILE_EXPERT_PAGEANT_WORK_WITH_ALBUM_IMAGES +
          Param.GALLERY_ID;

        if (galleryList[galleryItem].gallery_id !== undefined) {
          url =
            url +
            galleryList[galleryItem].gallery_id +
            Param.ALBUM_CREATED_BY +
            galleryList[galleryItem].record_id +
            Param.PROFILE_ID +
            route.params.profileId +
            Param.PROFILE_TYPE_ +
            route.params.role.slug;
        } else {
          url =
            url +
            galleryList[galleryItem].id +
            Param.ALBUM_CREATED_BY +
            galleryList[galleryItem].record_id +
            Param.PROFILE_ID +
            route.params.profileId +
            Param.PROFILE_TYPE_ +
            route.params.role.slug;
        }
        if (galleryList[galleryItem].imagesCount > 0) {
          navigation.navigate(SCREEN.EXPERT_PEGEANT_WORK_WITH_ALBUM_IMAGES, {
            galleryItem: galleryList[galleryItem],
            profile: route.params.profileId,
            url: url,
          });
        } else {
          toast(translations.NO_IMAGES_FOUND, toastType.ERROR_TOAST);
        }
      } else {
        toast(translations.NO_PROFILE_DETAIL, toastType.ERROR_TOAST);
      }
    }
  };

  const onTextItemClick = (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (galleryList[index].status === PROFILE_STATUS.ACTIVE) {
        let pageantId = galleryList[index].pageant_id;
        let eventId = galleryList[index].id;
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: checkIsNull(pageantId) ? pageantId : eventId,
          name: galleryList[index].title,
        });
      }
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
      var finalFilterquery = '';
      filters?.data?.contestantsWorkedAlbumsFilters.forEach(element => {
        if (element?.query?.length > 0) {
          element?.query?.forEach(elementQuery => {
            if (elementQuery?.length > 0) {
              finalFilterquery = finalFilterquery + elementQuery;
            }
          });
        }
      });

      setCompleteFilterQuery(finalFilterquery);
      if (finalFilterquery.length > 0) {
        setAllFillterApplied(true);
      } else {
        setAllFillterApplied(false);
      }
    }
  };

  const onClearFilterApply = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setCompleteFilterQuery('');
      setAllFillterApplied(false);
      filters?.data?.contestantsWorkedAlbumsFilters.forEach(element => {
        element.query = [];
        element.tempQuery = [];
        element.selectedIndex = -1;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header
          lable={translations.PAGEANT_WORKED_WITH}
          isUnderLineRequired
          showImageCount={isLoading ? null : ' (' + totalCount + ')'}
        />
        <View style={styles.space} />
        {galleryList !== undefined && galleryList.length > 0 ? (
          <FlatList
            data={galleryList}
            nestedScrollEnabled={true}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={'#'}
            ListFooterComponent={listFooterComponent}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <GalleryGridItem
                position={index}
                onTextClickListener={onTextItemClick}
                imageUrl={item?.selectedImage}
                label={
                  item?.album_name === PARAM_VALUE.GENERAL
                    ? translations.EXTRA
                    : item?.album_name
                }
                maxLines={2}
                onItemClickListener={onItemClick}
                size={itemSize}
                imageCount={item?.imagesCount}
                status={item?.status}
                isMinor={translations.NO_SMALL}
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
            <View style={styles.emptyContainer}>
              <Text ellipsizeMode="tail" style={styles.noRecord}>
                {translations.NO_RESULT_FOR_SELECTED_FILTER}
              </Text>
            </View>
          )
        )}

        {filters?.data?.contestantsWorkedAlbumsFilters !== undefined &&
          filters?.data?.contestantsWorkedAlbumsFilters?.length > 0 && (
            <View style={styles.shadowContainer}>
              <View style={styles.bottomFilterContainer}>
                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => {
                    setDirectoryFilterModalVisible(true);
                  }}>
                  <AppImages.Common.filter width={16} height={16} />
                  <Text style={styles.filterTitle}>{translations.FILTER}</Text>
                  {isAllFillterApplied && (
                    <View style={styles.filterAppliedCircleContainer} />
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
                onFilterApply={createFilterQuery}
                setIsModalVisible={setDirectoryFilterModalVisible}
                isAllFillterApplied={isAllFillterApplied}
                filter={filters?.data?.contestantsWorkedAlbumsFilters}
                onClearFilterApply={onClearFilterApply}
              />
            </View>
          )}
      </View>
    </SafeAreaView>
  );
};

export default ExpertPublicProfilePageantWorkWith;
