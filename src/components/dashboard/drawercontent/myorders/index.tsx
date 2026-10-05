import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import translations from '../../../../assets/translations';
import {GET_MY_ORDERS_LIST} from '../../../../services/endpoints';
import {Param} from '../../../../services/constants';
import Header from '../../../common/header';
import ProductView from '../components/productview';
import MyOrdersListShimmer from '../../../common/shimmer/myordershimmer';
import EmptyOrdersView from '../components/emptyordersview';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {
  MyOrdersData,
  DressOrderDispute,
} from '../../../../services/models/myorders/myOrdersList';
import {checkIsNull} from '../../../utils/validations';
import {color} from '../../../../assets/colorConstant';
import RaiseConcernModal from '../components/raiseconcernmodal';
import {useIsFocused} from '@react-navigation/core';
import AppImages from '../../../../assets/images/AppImages';
import {trackScreenView} from '../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';

const MyOrders = () => {
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const [concernType, setConcernType] = useState('');
  const [productId, setProductId] = useState(0);
  const [viewConcernData, setViewConcernData] = useState<DressOrderDispute>();

  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.MY_ORDERS);
  }, []);

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteHtQuery<MyOrdersData>({
    key: GET_MY_ORDERS_LIST,
    url: GET_MY_ORDERS_LIST,
    page: Param.PAGE,
    getDataArray: page => {
      return page.data?.myOrders.data.length;
    },
  });

  const myOrderList =
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

  const listFooterComponent = () => {
    return (
      <View style={styles.staticHeight}>
        {isFetchingNextPage ? (
          <ActivityIndicator size={'small'} color={color.P_PINK} />
        ) : null}
      </View>
    );
  };

  const onEndReached = async () => {
    fetchNextPage();
  };

  const concernButtonClicked = (
    concern_type: string,
    product_id: number,
    indexx: number,
  ) => {
    setProductId(product_id);
    setConcernType(concern_type);
    setModalVisible(true);
    setViewConcernData(myOrderList[indexx]?.dress_order_dispute);
  };

  const getDownloadFileType = (fileInfo: any) => {
    if (fileInfo?.name?.includes(translations.SMALL_TICKET)) {
      return translations.TICKET;
    } else if (fileInfo?.values?.name == translations.OTHER.trim()) {
      return translations.FILE;
    } else {
      return fileInfo?.values?.name;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.MY_ORDERS} isUnderLineRequired />
      <View style={styles.wrapper}>
        {myOrderList !== undefined && myOrderList?.length !== 0 ? (
          <FlatList
            key={'#'}
            data={myOrderList}
            ListFooterComponent={listFooterComponent}
            onEndReached={onEndReached}
            nestedScrollEnabled={true}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={2} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={1} // Increase time between renders
            windowSize={70} // Reduce the window size
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={100}
            renderItem={({item, index}) => (
              <ProductView
                index={index}
                status={item?.shipping_status}
                id={item?.id}
                noOfLines={2}
                imagePath={item?.product?.product_img_url}
                price={item?.sub_total}
                productQty={item?.quantity}
                title={item?.product?.unique_style_number}
                dateTime={item?.formatted_created_at}
                orderId={item?.dress_order_id}
                raiseConcern={checkIsNull(item?.allow_dispute)}
                downloadLink={item?.download_file_path}
                viewConcern={checkIsNull(item?.dress_order_dispute)}
                downloadType={getDownloadFileType(
                  item?.product?.subcategory[0],
                )}
                handleConcernButton={(type: string, id: number, indx: number) =>
                  concernButtonClicked(type, id, indx)
                }
              />
            )}
          />
        ) : isLoading || isRefetching ? (
          <View style={styles.shimmerContainer}>
            <MyOrdersListShimmer />
          </View>
        ) : myOrderList?.length === 0 && !isLoading ? (
          <EmptyOrdersView
            showButton={true}
            mainText={translations.NO_ORDER_PLACED}
            subText={translations.SHOP_WITH_PAGEANT_PLANET}
            imageIcon={<AppImages.MY_ORDERS.NoMyOrdersIcon />}
            flexCount={1}
          />
        ) : null}
      </View>
      {isModalVisible && (
        <RaiseConcernModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          type={concernType}
          productId={productId}
          viewConcernDetails={viewConcernData}
          refetchAPI={refetch}
        />
      )}
    </SafeAreaView>
  );
};

export default MyOrders;
