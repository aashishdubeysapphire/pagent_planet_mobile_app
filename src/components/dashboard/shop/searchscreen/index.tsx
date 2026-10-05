import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import {GET_RECENT_SEARCHES} from '../../../../services/endpoints';
import useHtQuery from '../../../../services/api/useHtQuery';
import SearchTextInput from '../components/searchbar';
import CategoriesListing from '../components/categorieslisting';
import {checkIsNull} from '../../../utils/validations';
import {color} from '../../../../assets/colorConstant';
import ShopSearchShimmer from '../../../common/shimmer/shopsearchshimmer';
import CommonProductLayout from './components/commonproductlayout';
import AppImages from '../../../../assets/images/AppImages';
import {Category} from '../../../../services/models/shop/shopLandingDetails';
import {
  RecentSearch,
  RecentSearchedData,
} from '../../../../services/models/shop/recentSearches';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../root/screenname';
import {Suggestionresponse} from '../../../../services/models/shop/suggestionResult';
import useAppStore, {useSetScreenRefresh} from '../../../../store/useAppStore';
import {REFESH_SCREEN} from '../../../utils/enum';

var SELLER: 'seller';

const SearchSreen = props => {
  const [searchText, setSearchText] = useState('');
  const [categoriesData, setCategoriesData] = useState<Category>();
  const navigation = useNavigation();
  const [suggestedData, setSuggestedData] = useState<Suggestionresponse>();
  const setScreenRefresh = useSetScreenRefresh();
  const {
    storeData: {refresh},
  } = useAppStore();

  const {data, isLoading, refetch, isRefetching} =
    useHtQuery<RecentSearchedData>({
      key: GET_RECENT_SEARCHES,
      url: GET_RECENT_SEARCHES,
      offSuccessToast: true,
      offErrorToast: true,
    });

  const navigateToProductList = (category: RecentSearch) => {
    navigation.navigate(SCREEN.SELLER_PRODUCTS, {
      name: category?.searched_text,
      param: '?str=' + category?.searched_text,
      uniqueKey: new Date().getMilliseconds(),
    });
  };

  const recentSearchSection = (item: RecentSearch) => {
    return (
      <TouchableOpacity
        style={styles.searchSection}
        onPress={() => navigateToProductList(item)}>
        <Text style={styles.recentSearchText} numberOfLines={1}>
          {item?.searched_text}
        </Text>
        <AppImages.SHOP.DarkSearchIcon />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setCategoriesData(props?.route?.params?.categories);
  }, [categoriesData]);

  const refeshScreenList = async () => {
    if (REFESH_SCREEN.SEARCH_SCREEN === refresh) {
      setSearchText('');
      setSuggestedData();
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  const onPressBack = () => {
    backButtonHandled();
    return true;
  };

  const backButtonHandled = () => {
    if (searchText?.length > 0) {
      setSearchText('');
      setSuggestedData();
      refetch();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );

    return () => subscription.remove();
  }, [onPressBack]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {isLoading || isRefetching ? (
        <ShopSearchShimmer />
      ) : (
        <View style={styles.bgColor}>
          <SearchTextInput
            inputBoxSearchText={searchText}
            setInputBoxSearchText={setSearchText}
            refetchAPI={refetch}
            suggestedData={suggestedData}
            setSuggestedData={setSuggestedData}
          />

          {checkIsNull(data?.data) && searchText?.length === 0 && (
            <ScrollView showsVerticalScrollIndicator={false}>
              {checkIsNull(data?.data?.recentSearch) && (
                <View style={styles.recentSearchArea}>
                  <Text style={styles.heading}>
                    {translations.RECENT_SEARCH}
                  </Text>
                  <FlatList
                    data={data?.data?.recentSearch}
                    keyExtractor={(x, i) => i.toString()}
                    horizontal={false}
                    scrollEnabled={false}
                    renderItem={({item}) => recentSearchSection(item)}
                  />
                </View>
              )}
              {checkIsNull(data?.data?.recentlyViewed) && (
                <CommonProductLayout
                  heading={translations.RECENTLY_VIEWED_PRODUCTS}
                  list={data?.data?.recentlyViewed}
                  type={''}
                />
              )}
              {checkIsNull(data?.data?.favoriteProducts) && (
                <CommonProductLayout
                  heading={translations.YOUR_FAV_PRODUCTS}
                  list={data?.data?.favoriteProducts}
                  type={''}
                />
              )}
              {checkIsNull(categoriesData) && (
                <View
                  style={{
                    ...styles.productContainer,
                    marginTop:
                      !checkIsNull(data?.data?.recentlyViewed) &&
                      !checkIsNull(data?.data?.recentSearch) &&
                      !checkIsNull(data?.data?.favoriteProducts)
                        ? 0
                        : moderateScaleVertical(12),
                  }}>
                  <Text style={styles.headingStyles}>
                    {translations.CATEGORIES}
                  </Text>
                  <View style={styles.categoryContainer}>{newFunction()}</View>
                </View>
              )}
              {checkIsNull(data?.data?.topSellers) && (
                <CommonProductLayout
                  heading={translations.SHOP_FROM_TOP_SELLERS}
                  list={data?.data?.topSellers}
                  type={SELLER}
                />
              )}
              <View style={styles.bottomEmptySpace}></View>
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );

  function newFunction() {
    return (
      <CategoriesListing
        categoryList={categoriesData}
        columns={Math.ceil(categoriesData?.length / 2)}
        verticalPadding={moderateScaleVertical(16)}
        bgColor={color.WHITE}
      />
    );
  }
};

export default SearchSreen;
