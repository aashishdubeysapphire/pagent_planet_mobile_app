import {
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import {styles} from './styles';
import {GET_WISHLIST} from '../../../../../services/endpoints';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from '../../../../../assets/colorConstant';
import AppImages from '../../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../../services/api/useHtInfiniteQuery';
import {Param} from '../../../../../services/constants';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import NoRecord from '../../../../common/norecord';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
import {internetState} from '../../../../common/commonalert';
import ProductsView from '../../components/productview';
import {useIsFocused} from '@react-navigation/core';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {trackScreenView} from '../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../assets/translations/analyticsscreenname';
const Favourites = ({route}) => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);

  const isFocused = useIsFocused();

  //API GALLERY----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteHtQuery<undefined>({
    key: GET_WISHLIST,
    url: GET_WISHLIST,
    page: Param.PAGE,
    getDataArray: page => page?.data?.length,
    disableLoader: true,
  });
  const directoryFoundItemResult =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.products !== null &&
          page?.data?.products !== undefined
        ) {
          return page?.data?.products;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  //API GALLERY----------------------------------------- END

  /* This is a react hook that is called when the component is mounted. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    trackScreenView(ANALYTICS_SCREEN.FAVOURITES);
  }, []);

  useEffect(() => {
    if (
      directoryFoundItemResult !== undefined &&
      directoryFoundItemResult.length > 0
    ) {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          refershList();
        } else {
          internetState(netInfo.isConnected!!);
        }
      });
    }
  }, [isFocused]);

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    if (directoryFoundItemResult.length > 7) {
      fetchNextPage();
    }
  };

  /**
   * If the user is not connected to the internet, then show the internet state, otherwise refetch the
   * data
   * @returns a boolean value.
   */
  const refershList = async () => {
    await refetch();
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

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topContainer}>
        <Header lable={translations.MY_FAVORITES} isUnderLineRequired />

        <View style={styles.listContainer}>
          {directoryFoundItemResult.length > 0 && !isLoading ? (
            <FlatList
              data={directoryFoundItemResult}
              nestedScrollEnabled={true}
              onEndReached={onEndReached}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              key={'#'}
              onEndReachedThreshold={2}
              ListFooterComponent={listFooterComponent}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={[{marginStart: moderateScaleVertical(16)}]}>
                  <ProductsView
                    title={item?.unique_style_number}
                    imageUrl={item?.featured_image_path}
                    width={itemSize}
                    sellingPrice={item?.selling_price}
                    maxPrice={item?.price}
                    showMRP={true}
                    marginBottomValue={moderateScaleVertical(14)}
                    showFavIcon={true}
                    id={item?.id}
                    isFav={true}
                    onfavPress={refershList}
                    isFavScreen={true}
                    item={item}
                  />
                </View>
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
              <View style={styles.topContainer}>
                <ScrollView
                  keyboardShouldPersistTaps={'handled'}
                  contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: moderateScaleVertical(90),
                    paddingHorizontal: moderateScaleVertical(8),
                  }}>
                  <NoRecord
                    text={'No Favorite Product Added'}
                    rightIcon={
                      <AppImages.Common.noFavIllustration
                        width={itemSize * 2 + 12}
                      />
                    }
                  />
                </ScrollView>
              </View>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Favourites;
