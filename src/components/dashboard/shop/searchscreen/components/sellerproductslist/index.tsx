import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  BackHandler,
} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {Param} from '../../../../../../services/constants';
import {SHOP_PRODUCT_FILTER} from '../../../../../../services/endpoints';
import {FilterProductData} from '../../../../../../services/models/filterProductData';
import {ProductsData} from '../../../../../../services/models/shop/shopLandingDetails';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import Header from '../../../../../common/header';
import NoRecord from '../../../../../common/norecord';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {REFESH_SCREEN} from '../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../utils/responsiveSize';
import ProductsView from '../../../components/productview';
import {styles} from './styles';

const SellerProductsList = ({route}) => {
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const {
    storeData: {refresh},
  } = useAppStore();
  const baseUrl = SHOP_PRODUCT_FILTER + route?.params?.param;

  const urlWithSort = baseUrl.includes('?')
    ? `${baseUrl}&sort=mostRecent`
    : `${baseUrl}?sort=mostRecent`;

  const {
    data: paginatedData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<FilterProductData>({
    key: urlWithSort,
    url: urlWithSort,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.length,
    disableLoader: true,
  });

  const productsList =
    paginatedData?.pages
      ?.map((page: ProductsData) => {
        if (page?.data !== null && page?.data !== undefined) {
          return page?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    if (REFESH_SCREEN.PRODUCT_LISTING === refresh) {
      refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  const onEndReached = async () => {
    if (productsList.length > 10) {
      fetchNextPage();
    }
  };

  const listFooterComponent = () => {
    return (
      <View style={styles.loader}>
        {isFetchingNextPage && (
          <ActivityIndicator size="small" color={color.P_PINK} />
        )}
      </View>
    );
  };

  const onPressBack = async () => {
    if (route?.params?.backToSearch) {
      setScreenRefresh(REFESH_SCREEN.SEARCH_SCREEN);
    }
    navigation.goBack();
  };

  const onPressBackButton = () => {
    onPressBack();
    return true;
  };

  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBackButton,
    );
    return () => hardBack.remove();
  }, [onPressBackButton]);

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header
        lable={route?.params?.name}
        showCart={route?.params?.cart}
        isUnderLineRequired
        onPressBack={onPressBack}
      />
      <View style={styles.listContainer}>
        {isLoading ? (
          <ShimmerList
            width={width / 2 - moderateScaleVertical(24)}
            height={width / 2}
            borderRadius={moderateScale(20)}
            padding={moderateScale(15)}
            numColumns={2}
          />
        ) : productsList?.length > 0 ? (
          <FlatList
            data={productsList}
            nestedScrollEnabled={true}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={'#'}
            ListFooterComponent={listFooterComponent}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={[{marginStart: moderateScaleVertical(16)}]}>
                <ProductsView
                  title={item?.unique_style_number}
                  imageUrl={item?.featured_image_path}
                  width={width / 2 - moderateScaleVertical(24)}
                  sellingPrice={item?.selling_price}
                  maxPrice={item?.price}
                  showMRP={true}
                  marginBottomValue={moderateScaleVertical(14)}
                  showFavIcon={true}
                  id={item?.id}
                  isFav={item?.is_favourite === 1}
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.noRecordFound}>
            <NoRecord
              text={
                translations.NO_RESULT_FOUND +
                ' Named "' +
                route?.params?.name +
                '"'
              }
              rightIcon={
                <AppImages.Common.NO_FILTER_RESULT_FOUND_ICON
                  width={width - moderateScaleVertical(24)}
                />
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SellerProductsList;
