import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {PAGEANT_PUBLIC_PROFILE_EVENT_LIST} from '../../../../../../services/endpoints';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../../../../../root/screenname';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {Param} from '../../../../../../services/constants';
import UpcomingPageantGridListView from '../../../../../common/upcomingpageantgridlist';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../../../common/header';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../../common/commonalert';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {PageantDetailData} from '../../../../../../services/models/pageantdetails/pageantDetailData';
import {Base} from '../../../../../../services/models/base';
import NoRecord from '../../../../../common/norecord';
import DirectoryFilterModal, {FILTER_TYPE} from '../../../filtermodal';
import {Filter} from '../../../../../../services/models/filterData';

const PageantPublicProfileEvent = ({route}) => {
  const [isListActive, setListState] = useState(false);
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const [selectedYear, setSelectedYear] = useState('');
  const netInfo = useNetInfo();
  const [filter] = useState<Filter[]>([]);

  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);

  //API PAGEANT EVENT LIST ----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteHtQuery<Base<PageantDetailData>>({
    key:
      PAGEANT_PUBLIC_PROFILE_EVENT_LIST + route.params.pagentId + selectedYear,
    url:
      PAGEANT_PUBLIC_PROFILE_EVENT_LIST + route.params.pagentId + selectedYear,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.childPageants?.data?.length,
    reverse: true,
    disableLoader: true,
  });

  const pageantList =
    paginatedData?.pages
      ?.map((page: Base<PageantDetailData>) => {
        if (
          page?.data?.childPageants?.data !== null &&
          page?.data?.childPageants?.data !== undefined
        ) {
          if (
            page?.data?.yearsListArr !== undefined &&
            page?.data?.yearsListArr.length > 0 &&
            filter.length === 0
          ) {
            let item = {
              title: translations.YEAR,
              slug: ['year_id'],
              type: FILTER_TYPE.ARRAY,
              options: [],
            };
            filter.push(item);
            for (const year of page?.data?.yearsListArr) {
              item.options.push({
                id: year.id,
                name: year.name,
                value: year.id,
              });
            }
          }

          return page?.data?.childPageants?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  //API PAGEANT LIST ----------------------------------------- END

  const onListModeActive = () => {
    setListState(!isListActive);
  };

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);
  useEffect(() => {
    refeshScreenList();
  }, [selectedYear]);

  const refeshScreenList = async () => {
    await refetch();
  };

  const onItemClick = (index: number) => {
    navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
      eventId: pageantList[index].id,
      // eventId: '12836',
      name: pageantList[index].title,
    });
  };

  const createFilterQuery = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      var finalFilterquery = '';
      filter.forEach(element => {
        if (element?.query?.length > 0) {
          element?.query?.forEach(elementQuery => {
            if (elementQuery?.length > 0) {
              finalFilterquery = finalFilterquery + elementQuery;
            }
          });
        }
      });
      setSelectedYear(finalFilterquery);
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
      filter.forEach(element => {
        element.query = [];
        element.tempQuery = [];
        element.selectedIndex = -1;
      });
      setSelectedYear('');
      setAllFillterApplied(false);
    }
  };

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    fetchNextPage();
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
      <Header lable={translations.EVENTS} isUnderLineRequired />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.modeContainer}
          onPress={onListModeActive}>
          {isListActive ? (
            <AppImages.Gallery.GridActive_ICON />
          ) : (
            <AppImages.Gallery.ListActive_ICON />
          )}
        </TouchableOpacity>

        {pageantList?.length > 0 ? (
          <FlatList
            data={pageantList}
            showsVerticalScrollIndicator={false}
            numColumns={isListActive ? 1 : 2}
            key={isListActive ? '_' : '#'}
            onEndReached={onEndReached}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={listFooterComponent}
            renderItem={({item, index}) => (
              <UpcomingPageantGridListView
                position={index}
                imageUrl={item?.main_image_full_url}
                label={item?.title}
                maxLines={2}
                isDisplayYear
                eventYearName={item.eventYearName}
                isList={isListActive}
                onItemClickListener={onItemClick}
                size={itemSize}
                ratings={item?.average_rating}
                ratingsCount={item?.rating_count}
                participantsCount={item?.participants_count}
              />
            )}
          />
        ) : isLoading || isRefetching ? (
          <View style={[{flex: 1}]}>
            <ShimmerList
              width={itemSize}
              height={itemSize + moderateScaleVertical(20)}
              padding={15}
              numColumns={2}
            />
          </View>
        ) : (
          netInfo.isInternetReachable && (
            <View style={styles.container}>
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: moderateScaleVertical(90),
                  paddingHorizontal: moderateScaleVertical(8),
                }}>
                <NoRecord
                  text={translations.NO_EVENT_FOUND}
                  rightIcon={
                    <AppImages.Common.NO_FILTER_RESULT_FOUND_ICON
                      width={itemSize * 2 + 12}
                    />
                  }
                />
              </ScrollView>
            </View>
          )
        )}

        {filter.length > 0 && (
          <View style={styles.eventBottomFilterShadowContainer}>
            <View style={styles.eventBottomFilterContainer}>
              <TouchableOpacity
                style={styles.eventFilterButtonContainer}
                onPress={() => {
                  setDirectoryFilterModalVisible(true);
                }}>
                <AppImages.Common.filter width={16} height={16} />
                <Text style={styles.eventFilterTextContainer}>
                  {translations.FILTER}
                </Text>
                {isAllFillterApplied && (
                  <View style={styles.eventFilterAppliedCircleContainer} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {filter !== undefined && filter?.length > 0 && (
          <View>
            <DirectoryFilterModal
              isModalVisible={isDirectoryFilterModalVisible}
              setIsModalVisible={setDirectoryFilterModalVisible}
              filter={filter}
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

export default PageantPublicProfileEvent;
