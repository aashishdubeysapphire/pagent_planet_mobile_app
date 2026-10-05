import {
  View,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Keyboard,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Header from '../../common/header';
import translations from '../../../assets/translations';
import {styles} from './styles';
import {
  DIRECTORY_FILTTER_BY_TYPE,
  DIRECTORY,
  GET_PAGEANT_PLAN,
} from '../../../services/endpoints';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {
  createFirebaseLog,
  getSlugByRoleId,
  getTagTypeLable,
  keyBoardManager,
  onUnderDevlopment,
  redirectWithToastMsg,
  trackScreenView,
} from '../../utils/helperFunction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {color} from '../../../assets/colorConstant';
import AppImages from '../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../services/api/useHtInfiniteQuery';
import {MethodTypes, Param} from '../../../services/constants';
import ShimmerList from '../../common/shimmer/listshimmer';
import NoRecord from '../../common/norecord';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import DirectoryFilterModal from './filtermodal';
import {DataFilter} from '../../../services/models/filterData';
import {useNavigation} from '@react-navigation/core';
import {
  DirectoryData,
  DirectoryItem,
} from '../../../services/models/directory/directorydata';
import {
  ATTRIBUTE_ID,
  DIRECTORY_ID,
  REFESH_SCREEN,
  ROLES,
  SELL_PRODUCT,
  USER_DESHBOARD_TAB,
} from '../../utils/enum';
import useHtQuery from '../../../services/api/useHtQuery';
import DirectoryGridList from '../../common/directorygridlist';
import {UserContext} from '../../../store/userStore';
import {internetState, toast, toastType} from '../../common/commonalert';
import {SCREEN} from '../../../root/screenname';
import useAppStore, {useSetScreenRefresh} from '../../../store/useAppStore';
import {checkIsNull} from '../../utils/validations';
import ViewPlanModal from '../dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';
import {PlanData} from '../../../services/models/planData';
import useCgMutation from '../../../services/api/useCgMutation';
import {ANALYTICS_SCREEN} from '../../../assets/translations/analyticsscreenname';

export enum ButtonTypes {
  HIRE = 'Hire Me',
  ATTEND = 'Attend',
  COMPETE = 'Compete',
  SHOP = 'Shop',
}
export enum PageantTypes {
  PAGEANT = 'Pageant',
  PAGEANT_SMALL = 'pageant',
  MASTER_PAGEANT = 'Master Pageant',
}

const Directory = ({route}) => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);
  const [selectedFilterHeader, setSelectedFilterHeader] = useState(0);
  const [selectedFilterRootCategory, setSelectedFilterRootCategory] = useState(
    PageantTypes.PAGEANT_SMALL + '',
  );
  const [completeFilterQuery, setCompleteFilterQuery] = useState(
    selectedFilterRootCategory + '',
  );
  const navigation = useNavigation();
  const showHeaderBackArrow =
    navigation.canGoBack() ||
    Boolean(navigation.getParent?.()?.canGoBack?.());
  const {storeData} = useContext(UserContext);
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isMessageButtonDisable, setMessageButtonDisable] = useState(false);
  const [inputBoxSearchText, setInputBoxSearchText] = useState('');
  const [sortByValue, setSortByValue] = useState('');
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);
  const [focus, setIsFocus] = useState(false);
  const flatList = useRef();
  const [offset, onOffSet] = useState(0);
  const [toggleSearchBar, setToggleSearchBar] = useState(true);
  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  const {
    storeData: {refresh},
  } = useAppStore();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

  const setScreenRefresh = useSetScreenRefresh();
  //API DIRECTORY FILTTER BY TYPE ----------------------------------------- START
  const {
    data: filtterList,
    isLoading: isFilterListLoading,
    refetch: filterRefetch,
  } = useHtQuery<DataFilter>({
    key: DIRECTORY_FILTTER_BY_TYPE,
    url: DIRECTORY_FILTTER_BY_TYPE,
    offSuccessToast: true,
  });

  //API DIRECTORY FILTTER BY TYPE ----------------------------------------- END

  //API GALLERY----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteHtQuery<DirectoryData>({
    key: DIRECTORY + completeFilterQuery,
    url: DIRECTORY + completeFilterQuery,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.list?.data?.length,
    disableLoader: true,
  });
  const directoryFoundItemResult =
    paginatedData?.pages
      ?.map((page: DirectoryData) => {
        if (
          page?.data?.list?.data !== null &&
          page?.data?.list?.data !== undefined
        ) {
          return page?.data?.list?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  //API GALLERY----------------------------------------- END

  /* The above code is using the `useCgMutation` hook from an unknown library to fetch data for
  membership plans. It is destructuring the `data` and `mutateAsync` properties from the hook's
  return value. The `data` property will hold the fetched membership plans, and the `mutateAsync`
  property is a function that can be used to trigger the data fetching process. */
  const {data: membershipPlans, mutateAsync: getPlanDetails} =
    useCgMutation<PlanData>({
      key: GET_PAGEANT_PLAN,
      method: MethodTypes.GET,
      url: GET_PAGEANT_PLAN,
      disableLoader: true,
      offSuccessToast: true,
    });

  /* This is a react hook that is called when the component is mounted. */
  useEffect(() => {
    keyBoardManager();
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    getPlanDetails();
    trackScreenView(ANALYTICS_SCREEN.DIRECTORY);
  }, []);

  useEffect(() => {
    if (paginatedData !== undefined) {
      updatedDirectory(paginatedData?.pages[0]);
    }
  }, [paginatedData]);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  /**
   * The function `refeshScreen` is used to refresh the screen based on different conditions.
   */
  const refeshScreen = async () => {
    createFirebaseLog(refeshScreen.name, SCREEN.DIRECTORY);
    if (REFESH_SCREEN.DIRECTORY === refresh) {
      refershList();
      setScreenRefresh(REFESH_SCREEN.NONE);
    } else if (REFESH_SCREEN.DIRECTORY_FILTER === refresh) {
      setSelectedFilterHeader(0);
      filterRefetch();
      refershList();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  /**
   * If the directoryData object has a data property, and that data property has an
   * is_message_button_disable property, and that is_message_button_disable property is not undefined,
   * then set the messageButtonDisable state to the value of the is_message_button_disable property
   * @param {DirectoryData} directoryData - DirectoryData
   */
  const updatedDirectory = (directoryData: DirectoryData) => {
    createFirebaseLog(updatedDirectory.name, SCREEN.DIRECTORY);
    if (directoryData?.data?.is_message_button_disable !== undefined) {
      setMessageButtonDisable(directoryData?.data?.is_message_button_disable);
    }
    if (
      directoryData?.data?.suggestion !== undefined &&
      directoryData?.data?.suggestion.length > 0
    ) {
      setSuggestion(directoryData?.data?.suggestion[0]);
    } else if (suggestion.length > 0) {
      setSuggestion('');
    }
  };

  useEffect(() => {
    if (selectedFilterRootCategory !== undefined && !isLoading) {
      createFilterQuery();
    }
  }, [selectedFilterRootCategory]);

  useEffect(() => {
    if (sortByValue !== undefined && !isLoading) {
      createFilterQuery();
    }
  }, [sortByValue]);

  useEffect(() => {
    if (completeFilterQuery !== undefined && !isLoading) {
      NetInfo.fetch().then(state => {
        if (state.isConnected || state.isInternetReachable) {
          refershList();
        }
      });
    }
  }, [completeFilterQuery]);
  /**
   * It filters the data based on the text entered in the search bar
   * @param {string} text - string - The text that is being searched for.
   */
  const searchFilterFunction = (text: string) => {
    createFirebaseLog(searchFilterFunction.name, SCREEN.DIRECTORY);
    if (text.trim().length > 0 || text.length === 0) {
      setInputBoxSearchText(text);
    }
  };

  /**
   * The `upgradePlan` function handles the logic for upgrading a user's plan and displaying
   * appropriate toast messages based on the user's primary profile type.
   */
  const upgradePlan = () => {
    createFirebaseLog(upgradePlan.name, SCREEN.DIRECTORY);
    setDirectoryFilterModalVisible(false);
    setTimeout(() => {
      // if (storeData?.data?.user?.primary_profile_type !== ROLES.PAGEANT) {
      //   toast(
      //     translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE,
      //     toastType.ERROR_TOAST,
      //   );
      // } else {
      //   toast(
      //     translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE,
      //     toastType.SUCESS_TOAST,
      //   );
      // }

      // navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: USER_DESHBOARD_TAB.DESHBOARD,
      //       params: {openPrimaryDashbord: true},
      //     },
      //   ],
      // });
      if (storeData?.data?.user?.primary_profile_type === ROLES.CONTESTANT) {
        redirectWithToastMsg(storeData, navigation);
      } else if (
        storeData?.data?.user?.primary_profile_type === ROLES.PAGEANT
      ) {
        toast(
          translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE,
          toastType.SUCESS_TOAST,
        );
        navigation.reset({
          index: 0,
          routes: [
            {
              name: USER_DESHBOARD_TAB.DESHBOARD,
              params: {openPrimaryDashbord: true},
            },
          ],
        });
      } else {
        toast(
          translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE,
          toastType.ERROR_TOAST,
        );
        navigation.reset({
          index: 0,
          routes: [
            {
              name: USER_DESHBOARD_TAB.DESHBOARD,
              params: {openPrimaryDashbord: true},
            },
          ],
        });
      }
    }, 100);
  };

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
    createFirebaseLog(onEndReached.name, SCREEN.DIRECTORY);
    if (directoryFoundItemResult.length > 10) {
      fetchNextPage();
    }
  };

  const getRoleId = (directoryId: number, directoryItem: DirectoryItem) => {
    createFirebaseLog(getRoleId.name, SCREEN.DIRECTORY);
    if (directoryId === DIRECTORY_ID.PAGEANT) {
      return DIRECTORY_ID.PAGEANT;
    } else if (directoryId === DIRECTORY_ID.CONTESTANT) {
      return DIRECTORY_ID.CONTESTANT;
    } else {
      return directoryItem?.business_role_id;
    }
  };

  /**
   * The function `onMessageButtonClick` handles different actions based on the value of the `items`
   * parameter and navigates to different screens accordingly.
   * @param {DirectoryItem} directoryItem - The `directoryItem` parameter is an object that represents
   * an item in a directory. It contains properties such as `master_pageant_id`, `id`, `title`, `name`,
   * and `business_title`.
   * @param {string} items - The `items` parameter is a string that represents the action to be
   * performed when a button is clicked. It can have the following values:
   * @param {number} directoryID - The `directoryID` parameter is a number that represents the ID of
   * the directory.
   * @returns The function does not have a return type specified, so it does not explicitly return
   * anything. However, it may return early if certain conditions are met, such as when `items` is
   * equal to `translations.COMPETING` and a toast message is displayed.
   */
  const onMessageButtonClick = (
    directoryItem: DirectoryItem,
    items: string,
    directoryID: number,
  ) => {
    createFirebaseLog(onMessageButtonClick.name, SCREEN.DIRECTORY);
    let isEvent = checkIsNull(directoryItem?.master_pageant_id) ? true : false;
    let attributeId = 0;
    let params = '';
    let roleId = getRoleId(directoryID, directoryItem);
    let profileId = directoryItem.id;
    let title =
      filtterList?.data?.businessTypes[selectedFilterHeader].id ===
      DIRECTORY_ID.PAGEANT
        ? directoryItem.title
        : filtterList?.data?.businessTypes[selectedFilterHeader].id ===
          DIRECTORY_ID.CONTESTANT
        ? directoryItem.name
        : directoryItem.business_title;
    if (items === translations.COMPETING) {
      toast(
        translations.MESSAGE_ON_COMPETING_BUTTON_CLCIK,
        toastType.SUCESS_TOAST,
      );
      return;
    } else if (items === translations.SHOP) {
      if (isEvent) {
        params = Param.PAGAENT_ID + profileId + Param.ROLE_ID + roleId;
      } else {
        params = Param.PROFILE_ID_ + profileId + Param.ROLE_ID + roleId;
      }
    } else if (
      items === translations.ATTEND2 ||
      items === translations.COMPETE
    ) {
      if (items === translations.ATTEND2) {
        attributeId = ATTRIBUTE_ID.ATTEND;
      } else {
        attributeId = ATTRIBUTE_ID.COMPETE;
      }
      if (isEvent) {
        params =
          Param.PAGAENT_ID +
          profileId +
          Param.ROLE_ID +
          roleId +
          Param.ATTR_TYPE +
          attributeId;
      } else {
        params =
          Param.PROFILE_ID_ +
          profileId +
          Param.ROLE_ID +
          roleId +
          Param.ATTR_TYPE +
          attributeId;
      }
    } else if (items === translations.HIRE) {
      params =
        Param.PROFILE_ID_ +
        profileId +
        Param.ROLE_ID +
        roleId +
        Param.CATEGORY_ID +
        SELL_PRODUCT.HIRE;
    } else if (items === translations.MESSAGE) {
      navigation.navigate(SCREEN.COMPOSE, {
        isCommingFormProductDetails: true,
        name: {
          id: profileId,
          text: title,
        },
        type: {
          id: roleId,
          name: getTagTypeLable(roleId),
          slug: getSlugByRoleId(roleId),
        },
      });
      return;
    } else {
      onUnderDevlopment();
      return;
    }
    navigation.navigate(SCREEN.SELLER_PRODUCTS, {
      name: title,
      param: params,
      uniqueKey: new Date().getMilliseconds(),
      backToSearch: false,
      cart: false,
    });
  };

  /**
   * The function `createFilterQuery` creates a filter query based on selected filter options and
   * search text, and updates the complete filter query state.
   */
  const createFilterQuery = () => {
    createFirebaseLog(createFilterQuery.name, SCREEN.DIRECTORY);
    var query = '';

    query = query + selectedFilterRootCategory;
    if (inputBoxSearchText.length > 0) {
      query = query + Param.STR + inputBoxSearchText.trim();
    }

    var finalFilterquery = '';
    filtterList?.data?.businessTypes[selectedFilterHeader].filters.forEach(
      element => {
        if (element?.query?.length > 0) {
          element?.query?.forEach(elementQuery => {
            if (elementQuery?.length > 0) {
              finalFilterquery = finalFilterquery + elementQuery;
            }
          });
        }
      },
    );

    setCompleteFilterQuery(query + finalFilterquery);
    if (finalFilterquery.length > 0) {
      setAllFillterApplied(true);
    } else {
      setAllFillterApplied(false);
    }

    setToggleSearchBar(true);
  };

  /**
   * It navigates to the public profile screen.
   * @param {DirectoryItem} directoryItem - DirectoryItem - This is the item that was clicked on.
   */
  const onItemClick = (directoryItem: DirectoryItem) => {
    createFirebaseLog(onItemClick.name, SCREEN.DIRECTORY);
    if (
      filtterList?.data?.businessTypes[selectedFilterHeader].id ===
      DIRECTORY_ID.PAGEANT
    ) {
      if (
        directoryItem.master_pageant_id !== undefined &&
        directoryItem.master_pageant_id !== null &&
        directoryItem.master_pageant_id != 0
      ) {
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: directoryItem.id,
          name: directoryItem.title,
        });
      } else {
        navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE, {
          roleId:
            directoryItem.owner_id !== ROLES.ADMIN_ID
              ? directoryItem.owner_id
              : directoryItem.id,
          profileId: directoryItem.id,
          name: directoryItem.title,
        });
      }
    } else {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        owner_id: directoryItem.owner_id,
        roleId:
          directoryItem.owner_id !== ROLES.ADMIN_ID
            ? directoryItem.owner_id
            : directoryItem.id,
        key: new Date().getMilliseconds(),
        profileId: directoryItem.id,
        name:
          filtterList?.data?.businessTypes[selectedFilterHeader].id ===
          DIRECTORY_ID.PAGEANT
            ? directoryItem.title
            : filtterList?.data?.businessTypes[selectedFilterHeader].id ===
              DIRECTORY_ID.CONTESTANT
            ? directoryItem.name
            : directoryItem.business_title,
        category: filtterList?.data?.businessTypes[selectedFilterHeader].id,
        selectedTab: getTagTypeLable(
          filtterList?.data?.businessTypes[selectedFilterHeader].id,
        ),
      });
    }
  };

  /**
   * It sets the selectedFilterRootCategory to the name of the business type.
   * @param {number} index - number - The index of the item clicked
   */
  const onRootFilterItemClick = (index: number) => {
    createFirebaseLog(onRootFilterItemClick.name, SCREEN.DIRECTORY);
    setSelectedFilterRootCategory(
      '' + filtterList?.data?.businessTypes[index].name.toLocaleLowerCase(),
    );
    setSelectedFilterHeader(index);
  };

  /**
   * If the user is not connected to the internet, then show the internet state, otherwise refetch the
   * data
   * @returns a boolean value.
   */
  const refershList = async () => {
    createFirebaseLog(refershList.name, SCREEN.DIRECTORY);
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
    createFirebaseLog(listFooterComponent.name, SCREEN.DIRECTORY);
    return (
      <View style={styles.loadMore}>
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
    createFirebaseLog(onClearFilterApply.name, SCREEN.DIRECTORY);
    setCompleteFilterQuery(selectedFilterRootCategory);
    resteQuery();
  };

  /**
   * It resets the query.
   */
  const resteQuery = () => {
    createFirebaseLog(resteQuery.name, SCREEN.DIRECTORY);
    setSortByValue('');
    setInputBoxSearchText('');
    setAllFillterApplied(false);
    filtterList?.data?.businessTypes[selectedFilterHeader].filters.forEach(
      element => {
        element.query = [];
        element.tempQuery = [];
        element.selectedIndex = -1;
      },
    );
  };

  const _handleBlur = () => {
    createFirebaseLog(_handleBlur.name, SCREEN.DIRECTORY);
    setIsFocus(false);
  };
  const _handleFocus = () => {
    createFirebaseLog(_handleFocus.name, SCREEN.DIRECTORY);
    setIsFocus(true);
  };

  useEffect(() => {
    if (toggleSearchBar) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -moderateScaleVertical(50),
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [toggleSearchBar]);

  /**
   * The scrollHandler function checks the scroll position and toggles the search bar based on the
   * scroll direction and distance.
   * @param event - The `event` parameter is an object that contains information about the scroll
   * event. It is of type `NativeSyntheticEvent<NativeScrollEvent>`.
   */
  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    createFirebaseLog(scrollHandler.name, SCREEN.DIRECTORY);
    if (
      event.nativeEvent.contentOffset.y > offset &&
      event.nativeEvent.contentOffset.y - offset > 15 &&
      toggleSearchBar
    ) {
      setToggleSearchBar(false);
    } else if (
      event.nativeEvent.contentOffset.y < offset &&
      offset - event.nativeEvent.contentOffset.y > 15 &&
      !toggleSearchBar
    ) {
      setToggleSearchBar(true);
    }

    onOffSet(event.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView style={styles.emptyContainer}>
      <View style={styles.emptyContainer}>
        <Header
          lable={translations.DIRECTORY}
          isUnderLineRequired
          showCart
          showNotification
          showMessage
          menu={!showHeaderBackArrow}
        />

        <View style={styles.emptyContainer}>
          <Animated.View style={{transform: [{translateY: searchBarAnim}]}}>
            <View style={styles.roleContainer}>
              {!isFilterListLoading ? (
                <FlatList
                  data={filtterList?.data?.businessTypes}
                  horizontal={true}
                  ref={flatList}
                  showsHorizontalScrollIndicator={false}
                  key={'#'}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={[
                        index === 0
                          ? styles.roleItemContainer2
                          : styles.roleMiddleItemContainer1,
                        {
                          backgroundColor:
                            index === selectedFilterHeader
                              ? color.P_PINK
                              : color.S_GRAY_2,
                        },
                      ]}
                      onPress={() => {
                        if (
                          !isLoading &&
                          !isRefetching &&
                          selectedFilterHeader !== index
                        ) {
                          trackScreenView(
                            item?.display_name +
                              ' ' +
                              ANALYTICS_SCREEN.DIRECTORY,
                          );
                          setInputBoxSearchText('');
                          onRootFilterItemClick(index);
                          flatList?.current?.scrollToIndex({
                            index: index,
                            animated: true,
                            viewPosition: 0,
                          });
                        }
                      }}>
                      <Text
                        style={{
                          ...styles.roleTextStyles2,
                          color:
                            index === selectedFilterHeader
                              ? color.WHITE
                              : color.S_GRAY_4,
                        }}>
                        {item?.display_name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <ShimmerList
                  width={100}
                  height={30}
                  padding={8}
                  horizontal={true}
                  numColumns={1}
                />
              )}

              {filtterList?.data?.businessTypes[selectedFilterHeader]
                ?.display_name && (
                <View style={styles.inputBoxComtainer}>
                  <View
                    style={focus ? styles.searchBoxActive : styles.searchBOx}>
                    <TextInput
                      placeholder={
                        'Search By ' +
                        filtterList?.data?.businessTypes[selectedFilterHeader]
                          ?.display_name
                      }
                      placeholderTextColor={color.S_GRAY_3}
                      selectionColor={color.P_PINK}
                      style={styles.searchTextinput}
                      value={inputBoxSearchText}
                      returnKeyType="search"
                      onFocus={_handleFocus}
                      onBlur={_handleBlur}
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
                    <View style={styles.searchImage}>
                      {inputBoxSearchText.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setInputBoxSearchText('');
                            Keyboard.dismiss();
                          }}>
                          <AppImages.Common.crossIcon
                            width={14.4}
                            height={14.4}
                          />
                        </TouchableOpacity>
                      ) : (
                        <AppImages.Common.tpp_search_small_icon />
                      )}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.filterButtonContainer}
                    onPress={() => {
                      if (!isRefetching) {
                        setDirectoryFilterModalVisible(true);
                      }
                    }}>
                    {isAllFillterApplied ? (
                      <View style={styles.filterAppliedCircleContainer} />
                    ) : (
                      <View style={styles.gap} />
                    )}

                    <View style={styles.bottomFilterContainer}>
                      <AppImages.Common.filter width={20} height={20} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {suggestion.length > 0 && inputBoxSearchText.length > 0 ? (
                <View>
                  <Text style={styles.hintTextContainer}>
                    {translations.SHOWINF_RESULT_FOR}
                    <Text style={styles.hintSearchTextContainer}>
                      {suggestion}
                    </Text>
                    <Text style={styles.hintTextContainer}>
                      {translations.INSTEAD_OF}
                    </Text>
                    <Text style={styles.hintSearchTextContainer}>
                      {inputBoxSearchText.trim()}
                    </Text>
                  </Text>
                </View>
              ) : null}
            </View>
          </Animated.View>

          {(directoryFoundItemResult.length > 0 &&
            !isLoading &&
            !isRefetching) ||
          (directoryFoundItemResult.length > 0 &&
            isFetchingNextPage &&
            isRefetching) ? (
            <Animated.FlatList
              data={directoryFoundItemResult}
              nestedScrollEnabled={true}
              onEndReached={onEndReached}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              key={'#'}
              bounces={false}
              alwaysBounceVertical={false}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={1} // Increase time between renders
              windowSize={70} // Reduce the window size
              onEndReachedThreshold={2}
              ListFooterComponent={listFooterComponent}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <DirectoryGridList
                  directoryItem={item}
                  itemSize={itemSize}
                  onItemClickListener={onItemClick}
                  directoryID={
                    filtterList?.data?.businessTypes[selectedFilterHeader].id
                  }
                  isMessageButtonDisable={isMessageButtonDisable}
                  user={storeData?.data?.user}
                  onMessageButtonClick={onMessageButtonClick}
                  setIsPreviewModalVisible={setIsPreviewModalVisible}
                />
              )}
              onScroll={scrollHandler}
              style={{
                transform: [{translateY: searchBarAnim}],
                paddingTop: 1,
              }}
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
              <View style={styles.emptyContainer}>
                <ScrollView
                  keyboardShouldPersistTaps={'handled'}
                  contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: moderateScaleVertical(8),
                    paddingBottom: moderateScaleVertical(90),
                  }}>
                  <NoRecord
                    text={
                      inputBoxSearchText.length > 0
                        ? 'No ' +
                          selectedFilterRootCategory +
                          ' found named “' +
                          inputBoxSearchText.trim() +
                          '"'
                        : 'No ' + selectedFilterRootCategory + ' found'
                    }
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
        </View>

        {filtterList?.data?.businessTypes !== undefined &&
          filtterList?.data?.businessTypes?.length > 0 && (
            <View>
              <DirectoryFilterModal
                isModalVisible={isDirectoryFilterModalVisible}
                setIsModalVisible={setDirectoryFilterModalVisible}
                filter={
                  filtterList?.data?.businessTypes[selectedFilterHeader].filters
                }
                upgradePlan={upgradePlan}
                sortByValue={sortByValue}
                selectedCetegoryIndix={selectedFilterHeader}
                onFilterApply={createFilterQuery}
                onClearFilterApply={onClearFilterApply}
                isAllFillterApplied={isAllFillterApplied}
                setIsPreviewModalVisible={setIsPreviewModalVisible}
                areAllLockedInContestant={
                  filtterList?.data?.businessTypes[selectedFilterHeader]?.id ===
                    DIRECTORY_ID.CONTESTANT &&
                  filtterList?.data?.businessTypes[selectedFilterHeader]
                    ?.is_locked == true
                }
              />
            </View>
          )}

        {isFilterListLoading && (
          <View style={styles.categoryShimmer}>
            <ShimmerList
              width={itemSize}
              height={itemSize + moderateScaleVertical(20)}
              padding={15}
              numColumns={2}
            />
          </View>
        )}
      </View>

      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={membershipPlans?.data}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </SafeAreaView>
  );
};

export default Directory;
