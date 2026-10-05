import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import {GET_RECEIVED_ORDERS_LIST} from '../../../../services/endpoints';
import {useNetInfo} from '@react-native-community/netinfo';
import {keyBoardManager, trackScreenView} from '../../../utils/helperFunction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from '../../../../assets/colorConstant';
import AppImages from '../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {Param} from '../../../../services/constants';
import NoRecord from '../../../common/norecord';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import {Filter} from '../../../../services/models/filterData';
import {internetState} from '../../../common/commonalert';
import {ORDER_FROM, REFESH_SCREEN} from '../../../utils/enum';
import useAppStore, {useSetScreenRefresh} from '../../../../store/useAppStore';
import DirectoryFilterModal, {FILTER_TYPE} from '../../directory/filtermodal';
import ProductView from '../components/productview';
import MyOrdersListShimmer from '../../../common/shimmer/myordershimmer';
import EmptyOrdersView from '../components/emptyordersview';
import {
  DressOrderDispute,
  MyOrdersData,
} from '../../../../services/models/myorders/myOrdersList';
import {checkIsNull} from '../../../utils/validations';
import RaiseConcernModal from '../components/raiseconcernmodal';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';

const ReceivedOrders = () => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);
  const [selectedFilterHeader] = useState(0);
  const [completeFilterQuery, setCompleteFilterQuery] = useState('');
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);
  const [filters] = useState<Filter[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const [viewConcernData, setViewConcernData] = useState<DressOrderDispute>();
  const {
    storeData: {refresh},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();

  //API RECEIVED ORDERS----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteHtQuery<MyOrdersData>({
    key: GET_RECEIVED_ORDERS_LIST + completeFilterQuery,
    url: GET_RECEIVED_ORDERS_LIST + completeFilterQuery,
    page:
      completeFilterQuery !== undefined && completeFilterQuery?.length > 0
        ? Param.PAGE_
        : Param.PAGE,
    getDataArray: page => {
      return page.data?.myOrders.data.length;
    },
  });

  const receivedOrderList =
    paginatedData?.pages
      ?.map((page: MyOrdersData) => {
        if (
          page.data?.myOrders?.data !== null &&
          page.data?.myOrders?.data !== undefined
        ) {
          return page.data?.myOrders.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  //API RECEIVED ORDERS ----------------------------------------- END

  useEffect(() => {
    keyBoardManager();
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    filters.push({
      title: 'Date',
      searchTitle: 'Orders Date',
      slug: ['start_date', 'end_date'],
      type: FILTER_TYPE.DATE_FROM_TO,
      currentMaxToDateActive: true,
      options: [],
    });
    trackScreenView(ANALYTICS_SCREEN.RECEIVED_ORDERS);
  }, []);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (REFESH_SCREEN.DIRECTORY === refresh) {
      refershList();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  useEffect(() => {
    if (completeFilterQuery !== undefined && !isLoading) {
      refershList();
    }
  }, [completeFilterQuery]);

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    if (receivedOrderList.length > 10) {
      fetchNextPage();
    }
  };

  /* *|CURSOR_MARCADOR|* */
  const createFilterQuery = () => {
    let filterQuery = '';
    if (filters[0]?.query!![0].includes('&start_date')) {
      filterQuery =
        filterQuery +
        filters[0]?.query!![0].replace('&start_date', '?start_date');
      filterQuery = filterQuery + filters[0]?.query!![1];
    } else {
      filterQuery =
        filterQuery +
        filters[0]?.query!![1].replace('&start_date', '?start_date');
      filterQuery = filterQuery + filters[0]?.query!![0];
    }
    setCompleteFilterQuery(filterQuery);
    setAllFillterApplied(filterQuery.length > 0);
  };

  /**
   * If the user is not connected to the internet, then show the internet state, otherwise refetch the
   * data
   * @returns a boolean value.
   */
  const refershList = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      await refetch();
    }
  };

  /**
   * It returns a View component with a style of staticHeight
   * @returns A view with a static height.
   */
  const listFooterComponent = () => {
    return (
      <View style={styles.loader}>
        {isFetchingNextPage && (
          <ActivityIndicator size="small" color={color.P_PINK} />
        )}
      </View>
    );
  };

  /**
   * A function that is called when the user clicks on the clear filter button. It resets the filter
   * query and the query.
   */
  const onClearFilterApply = () => {
    setAllFillterApplied(false);
    setCompleteFilterQuery('');
    filters.forEach(element => {
      element.query = [];
      element.tempQuery = [];
      element.selectedIndex = -1;
    });
  };

  const concernButtonClicked = (
    concern_type: string,
    product_id: number,
    indexx: number,
  ) => {
    setProductId(product_id);
    setModalVisible(true);
    setViewConcernData(receivedOrderList[indexx]?.dress_order_dispute);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header lable={translations.RECEIVED_ORDERS} isUnderLineRequired />
        <View style={styles.container}>
          {receivedOrderList !== undefined &&
          receivedOrderList?.length !== 0 ? (
            <FlatList
              key={'#'}
              data={receivedOrderList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={listFooterComponent}
              nestedScrollEnabled={true}
              onEndReached={onEndReached}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={1} // Increase time between renders
              windowSize={70} // Reduce the window size
              renderItem={({item, index}) => (
                <ProductView
                  index={index}
                  id={item?.id}
                  imagePath={item?.product?.product_img_url}
                  title={item?.product?.unique_style_number}
                  noOfLines={2}
                  price={item?.sub_total}
                  productQty={item?.quantity}
                  status={item?.shipping_status}
                  dateTime={item?.formatted_created_at}
                  orderId={item?.dress_order_id}
                  downloadLink={''}
                  viewConcern={checkIsNull(item?.dress_order_dispute)}
                  downloadType={''}
                  from={ORDER_FROM.SELLER}
                  handleConcernButton={(
                    type: string,
                    id: number,
                    indx: number,
                  ) => concernButtonClicked(type, id, indx)}
                />
              )}
            />
          ) : isLoading || isRefetching ? (
            <View style={styles.shimmerContainer}>
              <MyOrdersListShimmer />
            </View>
          ) : receivedOrderList?.length === 0 && !isLoading ? (
            <EmptyOrdersView
              showButton={false}
              mainText={
                completeFilterQuery !== undefined &&
                completeFilterQuery?.length > 0
                  ? translations.NO_RECEIVED_ORDER_FOUND
                  : translations.NO_ORDER_RECEIVED
              }
              subText={
                completeFilterQuery !== undefined &&
                completeFilterQuery?.length > 0
                  ? ''
                  : translations.YOULL_SEE_SOLD_PRODUCTS_HERE
              }
              imageIcon={<AppImages.MY_ORDERS.NoMyOrdersIcon />}
              flexCount={1}
            />
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
                    text={translations.NO_ORDER_RECEIVED}
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
          {filters !== undefined && filters?.length > 0 && (
            <View style={styles.bottomFilterShadowContainer}>
              <View style={styles.bottomFilterContainer}>
                <TouchableOpacity
                  style={styles.filterButtonContainer}
                  onPress={() => {
                    if (!isRefetching) {
                      setDirectoryFilterModalVisible(true);
                    }
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
        </View>

        {filters !== undefined && filters?.length > 0 && (
          <View>
            <DirectoryFilterModal
              isModalVisible={isDirectoryFilterModalVisible}
              setIsModalVisible={setDirectoryFilterModalVisible}
              filter={filters}
              sortByValue={''}
              selectedCetegoryIndix={selectedFilterHeader}
              onFilterApply={createFilterQuery}
              onClearFilterApply={onClearFilterApply}
              isAllFillterApplied={isAllFillterApplied}
            />
          </View>
        )}
      </View>
      {isModalVisible && (
        <RaiseConcernModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          type={translations.RAISED_CONCERN}
          productId={productId}
          viewConcernDetails={viewConcernData}
          refetchAPI={refetch}
        />
      )}
    </SafeAreaView>
  );
};

export default ReceivedOrders;
