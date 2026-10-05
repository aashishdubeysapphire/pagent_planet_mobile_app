import {
  View,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import {
  GET_PRODUCT_FILTTER_BY_CATEGORY,
  SHOP_PRODUCT_FILTER,
} from '../../../../services/endpoints';
import {keyBoardManager} from '../../../utils/helperFunction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from '../../../../assets/colorConstant';
import AppImages from '../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {Param} from '../../../../services/constants';
import ShimmerList from '../../../common/shimmer/listshimmer';
import NoRecord from '../../../common/norecord';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import {FilterData} from '../../../../services/models/filterData';
import {DirectoryData} from '../../../../services/models/directory/directorydata';
import useHtQuery from '../../../../services/api/useHtQuery';
import {internetState} from '../../../common/commonalert';
import DirectoryFilterModal, {ITEM_KEY} from '../../directory/filtermodal';
import SortMoal from '../../directory/sortmodal';
import ProductsView from '../components/productview';
import {FilterProductData} from '../../../../services/models/filterProductData';
import {checkIsNull} from '../../../utils/validations';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

/* The FilterProduct that takes a prop called
route and filter product on the basis of query */
const FilterProduct = ({route}) => {
  const netInfo = useNetInfo();
  const [itemWidth, setItemSize] = useState(Number);
  const [completeFilterQuery, setCompleteFilterQuery] = useState(
    checkIsNull(route?.params?.category?.param)
      ? '?' + route?.params?.category?.param + '=' + route?.params?.category?.id
      : Param.PRODUCT_CATEOGRY_ID + route?.params?.category?.id,
  );
  const [isSearcing, setisSearcing] = useState(false);
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const [isSorByFillterVisible, setSorByFillterVisible] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const [inputBoxSearchText, setInputBoxSearchText] = useState('');
  const [sortByValue, setSortByValue] = useState('mostRecent');
  console.log('sortByValue', sortByValue);
  const [isSortFillterApplied, setSortFillterApplied] = useState(true);
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);

  //API DIRECTORY FILTTER BY TYPE ----------------------------------------- START
  const {data: filtterList, isLoading: isFilterListLoading} =
    useHtQuery<FilterData>({
      key:
        GET_PRODUCT_FILTTER_BY_CATEGORY +
        Param.PRODUCT_CATEOGRY_ID +
        route?.params?.category?.id,
      url:
        GET_PRODUCT_FILTTER_BY_CATEGORY +
        Param.PRODUCT_CATEOGRY_ID +
        route?.params?.category?.id,
      offSuccessToast: true,
    });
  //API DIRECTORY FILTTER BY TYPE ----------------------------------------- END

  //API GALLERY----------------------------------------- START
  const baseUrl = SHOP_PRODUCT_FILTER + completeFilterQuery;
  const {
    data: paginatedData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteHtQuery<FilterProductData>({
    key: baseUrl,
    url: baseUrl,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.length,
    disableLoader: true,
  });
  const productFoundItemResult =
    paginatedData?.pages
      ?.map((page: FilterProductData) => {
        if (page?.data !== null && page?.data !== undefined) {
          return page?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  //API GALLERY----------------------------------------- END

  /* This is a react hook that is called when the component is mounted. */
  useEffect(() => {
    keyBoardManager();
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  /**
   * It filters the data based on the text entered in the search bar
   * @param {string} text - string - The text that is being searched for.
   */
  const searchFilterFunction = (text: string) => {
    if (text.trim().length > 0 || text.length === 0) {
      setInputBoxSearchText(text);
    }
  };
  useEffect(() => {
    if (paginatedData !== undefined) {
      updatedDirectory(paginatedData?.pages[0]);
    }
  }, [paginatedData]);

  /* The above code is using the useEffect hook in a React component. It is triggered whenever the
  value of the sortByValue variable changes. Inside the useEffect callback function, it checks if
  sortByValue is not undefined and isLoading is false. If both conditions are true, it calls the
  createFilterQuery function. */
  useEffect(() => {
    if (sortByValue !== undefined && !isLoading) {
      createFilterQuery();
    }
  }, [sortByValue]);

  /* The above code is using the `useEffect` hook in a React component. It is triggered whenever the
`completeFilterQuery` variable changes. */
  useEffect(() => {
    if (completeFilterQuery !== undefined && !isLoading) {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          refershList();
        } else {
          internetState(netInfo.isConnected!!);
        }
      });
    }
  }, [completeFilterQuery]);
  /**
   * If the directoryData object has a data property, and that data property has an
   * is_message_button_disable property, and that is_message_button_disable property is not undefined,
   * then set the messageButtonDisable state to the value of the is_message_button_disable property
   * @param {DirectoryData} directoryData - DirectoryData
   */
  const updatedDirectory = (directoryData: DirectoryData) => {
    if (
      directoryData?.data?.suggestion !== undefined &&
      directoryData?.data?.suggestion.length > 0
    ) {
      setSuggestion(directoryData?.data?.suggestion[0]);
    } else if (suggestion.length > 0) {
      setSuggestion('');
    }
  };
  /* The above code is using the useEffect hook in a React component. It is setting up a side effect
  that will be triggered whenever the value of the inputBoxSearchText variable changes. */
  useEffect(() => {
    if (
      inputBoxSearchText !== undefined &&
      inputBoxSearchText.length === 0 &&
      !isLoading
    ) {
      createFilterQuery();
    }
  }, [inputBoxSearchText]);

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    if (productFoundItemResult.length > 10) {
      fetchNextPage();
    }
  };

  /* *|CURSOR_MARCADOR|* */
  const createFilterQuery = () => {
    var query = '';
    var sortActive = -1;
    let params = checkIsNull(route?.params?.category?.param)
      ? '?' + route?.params?.category?.param + '='
      : Param.PRODUCT_CATEOGRY_ID;
    query = query + params + route?.params?.category?.id;
    if (inputBoxSearchText.length > 0) {
      query = query + Param.STR + encodeURIComponent(inputBoxSearchText.trim());
    }
    var finalFilterquery = '';
    filtterList?.data?.forEach(element => {
      if (element?.query?.length > 0) {
        element?.query?.forEach(elementQuery => {
          if (elementQuery?.length > 0) {
            finalFilterquery = finalFilterquery + elementQuery;
            if (elementQuery.includes(ITEM_KEY.SORT.toLocaleLowerCase())) {
              sortActive = 1;
              setSortFillterApplied(true);
            }
          }
        });
      }
    });

    setCompleteFilterQuery(query + finalFilterquery);
    if (finalFilterquery.length > 0) {
      setAllFillterApplied(true);
    } else {
      setAllFillterApplied(false);
    }
    if (sortActive < 0) {
      setSortFillterApplied(false);
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

  /**
   * A function that is called when the user clicks on the clear filter button. It resets the filter
   * query and the query.
   */
  const onClearFilterApply = () => {
    let params = checkIsNull(route?.params?.category?.param)
      ? '?' + route?.params?.category?.param + '='
      : Param.PRODUCT_CATEOGRY_ID;

    setCompleteFilterQuery(params + route?.params?.category?.id);
    resteQuery();
  };

  /**
   * It resets the query.
   */
  const resteQuery = () => {
    setSortByValue('');
    setInputBoxSearchText('');
    setAllFillterApplied(false);
    setSortFillterApplied(false);
    filtterList?.data?.forEach(element => {
      element.query = [];
      element.tempQuery = [];
      element.selectedIndex = -1;
    });
  };

  /**
   * It sets the value of the sortByValue state variable to the value of the value parameter, sets the
   * value of the sortByFilterVisible state variable to false, and if the value of the value parameter
   * is greater than 0, sets the value of the sortFilterApplied state variable to true, otherwise sets
   * the value of the sortFilterApplied state variable to false
   * @param {string} value - string - The value of the selected item.
   */
  const onSortItemSelection = (value: string) => {
    setSortByValue(value);
    setSorByFillterVisible(false);
    if (value.length > 0) {
      setSortFillterApplied(true);
    } else {
      setSortFillterApplied(false);
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topContainer}>
        {!isSearcing ? (
          <Header
            lable={route?.params?.category?.name}
            rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
            showCart
            onPressRightIcon1={() => {
              setisSearcing(true);
            }}
            isFavorite
            isUnderLineRequired
          />
        ) : (
          <View>
            <View style={styles.searchBOx}>
              <View style={styles.searchImage}>
                <TouchableOpacity
                  onPress={() => {
                    setInputBoxSearchText('');
                    setisSearcing(false);
                    Keyboard.dismiss();
                  }}>
                  <AppImages.Common.crossIcon />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder={translations.SEARCH_HERE}
                selectionColor={color.P_PINK}
                style={styles.searchTextinput}
                value={inputBoxSearchText}
                autoFocus={true}
                returnKeyType="search"
                onChangeText={val => {
                  searchFilterFunction(
                    val.replace(
                      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                      '',
                    ),
                  );
                }}
                onSubmitEditing={val => {
                  searchFilterFunction(inputBoxSearchText.trim());
                  createFilterQuery();
                }}
              />
            </View>
            <View style={styles.bottomLine} />
          </View>
        )}

        <View style={styles.listContainer}>
          {(productFoundItemResult.length > 0 && !isLoading && !isRefetching) ||
          (productFoundItemResult.length > 0 &&
            isFetchingNextPage &&
            isRefetching) ? (
            <FlatList
              data={productFoundItemResult}
              nestedScrollEnabled={true}
              onEndReached={onEndReached}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              initialNumToRender={100}
              key={'#'}
              onEndReachedThreshold={2}
              ListFooterComponent={listFooterComponent}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={[{marginStart: moderateScaleVertical(16)}]}>
                  <ProductsView
                    title={item?.unique_style_number}
                    imageUrl={item?.featured_image_path}
                    width={itemWidth}
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
          ) : isLoading || isRefetching ? (
            <View style={[{flex: 1}]}>
              <ShimmerList
                width={itemWidth}
                height={itemWidth + moderateScaleVertical(20)}
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
                    text={translations.NO_PRODUCT_FOUND}
                    rightIcon={
                      <AppImages.Common.NO_FILTER_RESULT_FOUND_ICON
                        width={itemWidth * 2 + 12}
                      />
                    }
                  />
                </ScrollView>
              </View>
            )
          )}

          {!isFilterListLoading && (
            <View style={styles.bottomFilterShadowContainer}>
              <View style={styles.bottomFilterContainer}>
                <TouchableOpacity
                  style={styles.filterButtonContainer}
                  onPress={() => {
                    if (!isRefetching) {
                      setSorByFillterVisible(true);
                    }
                  }}>
                  <AppImages.Common.sortFilterIcon />
                  <Text style={styles.filterTextContainer}>
                    {translations.SORT}
                  </Text>
                  {isSortFillterApplied && (
                    <View style={styles.filterAppliedCircle} />
                  )}
                </TouchableOpacity>
                <View style={styles.filterButtonDividerContainer} />
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
                    <View style={styles.filterAppliedCircle} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {filtterList?.data !== undefined && filtterList?.data?.length > 0 && (
          <View>
            <SortMoal
              setSorByFillterVisible={setSorByFillterVisible}
              isSorByFillterVisible={isSorByFillterVisible}
              filter={filtterList?.data[0]}
              onItemSelect={onSortItemSelection}
            />
            <DirectoryFilterModal
              isModalVisible={isDirectoryFilterModalVisible}
              setIsModalVisible={setDirectoryFilterModalVisible}
              filter={filtterList?.data}
              sortByValue={sortByValue}
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

export default FilterProduct;
