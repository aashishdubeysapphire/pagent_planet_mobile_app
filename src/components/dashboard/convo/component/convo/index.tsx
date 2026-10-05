import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import translations from '../../../../../assets/translations';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../common/commonalert';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import DashboardHeader from '../../../../common/dashboardheader';
import {SCREEN} from '../../../../../root/screenname';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import {styles} from '../../styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import AppImages from '../../../../../assets/images/AppImages';
import {MethodTypes, Param} from '../../../../../services/constants';
import ConvoDescription from '../../../../common/crownconvocomponent';
import {
  CROWN_CONVO_POSTED_LIST,
  GET_CART_COUNT,
} from '../../../../../services/endpoints';
import {ConvoListing} from '../../../../../services/models/convo/convoListing';
import {
  checkIsConnected,
  createFirebaseLog,
  isIosDevice,
} from '../../../../utils/helperFunction';
import {color} from '../../../../../assets/colorConstant';
import ShimmerFeed from '../../../../common/shimmer/feedshimmer';
import {REFESH_SCREEN, USER_DESHBOARD_TAB} from '../../../../utils/enum';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {User} from '../../../../../services/models/user/user';
import {checkIsNull} from '../../../../utils/validations';
import useInfiniteHtQuery from '../../../../../services/api/useHtInfiniteQuery';
import {RootContext} from '../../../../../store/rootStore';
import {UserContext} from '../../../../../store/userStore';
import CustomFAB from '../../../../utils/customFab';

export const menuData = [
  {
    title: translations.TIMELINE,
    id: 0,
  },
  {
    title: translations.ALL_CONVOS,
    id: 1,
  },
  {
    title: translations.MY_CONVOS,
    id: 2,
  },
  {
    title: translations.DRAFT_CONVOS,
    id: 3,
  },
];
let timeoutId;
const debounce = (func: Function, delay: number) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
const GET_MY_CONVOS = 'my-post';
const GET_DRAFT_CONVOS = 'my-draft';
const GET_ALL_CONVOS = 'all';
const TIMELINE = 'timeline';
const FAB_SCROLL_TOGGLE_THRESHOLD = 8;
export const Canvo = ({clearConvoNotification, dependency}) => {
  const [url, setUrl] = useState(GET_ALL_CONVOS);

  const {
    storeData: {refresh},
  } = useAppStore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [hasScreenNotch, sethasScreenNotch] = useState();
  const [isFiltering, setIsFiltering] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const isFocus = useIsFocused();
  const [label, setLabel] = useState(translations.ALL_CONVOS);
  const [clearNotification, setClearNotification] = useState('');
  const scrollOffsetRef = React.useRef(0);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const flatListRef = React.useRef();

  const setLoader = useSetLoader();
  const setScreenRefresh = useSetScreenRefresh();
  const {setCounter} = useContext(RootContext);
  const {storeData} = React.useContext(UserContext);
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteHtQuery<ConvoListing>({
    key: CROWN_CONVO_POSTED_LIST + url + clearNotification,
    url: CROWN_CONVO_POSTED_LIST + url + clearNotification,
    page: Param.PAGE_,
    getDataArray: page => page?.communityPostList?.data?.length,
    disableLoader: false,
  });
  const debounceRefetch = debounce(refetch, 600);
  const convoListData =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.communityPostList?.data !== null &&
          page?.data?.communityPostList?.data !== undefined
        ) {
          return page?.data?.communityPostList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const {mutateAsync: viewProducts} = useCgMutation<Base<User>>({
    key: GET_CART_COUNT,
    method: MethodTypes.GET,
    url: GET_CART_COUNT,
    offSuccessToast: true,
  });

  const getCartCountApi = async () => {
    createFirebaseLog(getCartCountApi.name, USER_DESHBOARD_TAB.CONVO, false);
    if (checkIsConnected()) {
      const productAllDetail = await viewProducts();
      if (productAllDetail?.success && productAllDetail?.data !== undefined) {
        setCounter(productAllDetail?.data);
      }
    }
  };

  useEffect(() => {
    const hasNotch = DeviceInfo.hasNotch();
    sethasScreenNotch(String(hasNotch));
    setTimeout(() => {
      setLoader(false);
    }, 3000);
    getCartCountApi();

    createFirebaseLog(
      useEffect.name,
      'userID',
      false,
      storeData?.data?.user?.id,
    );
  }, []);

  const scrollToTop = (navigationScroll, ref) => {
    createFirebaseLog(scrollToTop.name, USER_DESHBOARD_TAB.CONVO, false);
    navigationScroll.setParams({
      scrollToTop: () => ref?.current?.scrollToOffset(0, 0, true),
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      scrollToTop(navigation, flatListRef);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const scrollToTop1 = () => {
    createFirebaseLog(scrollToTop1.name, USER_DESHBOARD_TAB.CONVO, false);
    flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
  };

  const refeshScreen = () => {
    createFirebaseLog(refeshScreen.name, USER_DESHBOARD_TAB.CONVO, false);
    if (REFESH_SCREEN.CROWN_CONVO === refresh) {
      scrollToTop1();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };
  useEffect(() => {
    if (checkIsNull(clearConvoNotification)) {
      setClearNotification(Param.CLEAR_CONVO_NOTIFICATION);
      setTimeout(() => {
        reload();
        setTimeout(() => {
          setClearNotification('');
        }, 2000);
      }, 1000);
    }
  }, [dependency]);

  useEffect(() => {
    if (isFocus) {
      reload();
    } else {
      setIsFiltering(false);
    }
  }, [isFocus]);

  const moveToDirectoryScreen = () => {
    createFirebaseLog(
      moveToDirectoryScreen.name,
      USER_DESHBOARD_TAB.CONVO,
      false,
    );
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.DIRECTORY);
    }
  };

  const reload = () => {
    createFirebaseLog(reload.name, USER_DESHBOARD_TAB.CONVO, false);
    setRefreshing(true);
    debounceRefetch();

    setRefreshing(false);
  };
  const onEndReached = async () => {
    createFirebaseLog(onEndReached.name, USER_DESHBOARD_TAB.CONVO, false);
    if (convoListData?.length > 9) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (checkIsConnected()) {
      reload();
      setIsFiltering(false);
    }
  }, [url]);

  const handleMenuOnPress = (title: string) => {
    createFirebaseLog(handleMenuOnPress.name, USER_DESHBOARD_TAB.CONVO, false);
    setLabel(title);
    setIsFiltering(true);
    if (title === translations.MY_CONVOS) {
      setUrl(GET_MY_CONVOS);
    } else if (title === translations.DRAFT_CONVOS) {
      setUrl(GET_DRAFT_CONVOS);
    } else if (title === translations.ALL_CONVOS) {
      setUrl(GET_ALL_CONVOS);
    } else if (title === translations.TIMELINE) {
      setUrl(TIMELINE);
    }
  };

  const onScroll = ({nativeEvent}) => {
    const currentOffset = nativeEvent?.contentOffset?.y ?? 0;
    const scrollDelta = currentOffset - scrollOffsetRef.current;

    if (
      scrollDelta > FAB_SCROLL_TOGGLE_THRESHOLD &&
      isExtended
    ) {
      setIsExtended(false);
    } else if (
      scrollDelta < -FAB_SCROLL_TOGGLE_THRESHOLD &&
      !isExtended
    ) {
      setIsExtended(true);
    }
    scrollOffsetRef.current = currentOffset;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <DashboardHeader
          label={translations.CROWN_CONVO}
          onPressLeftText={() => {
            setFilterModalVisible(true);
          }}
          showMessageIcon
          onPressSearchIcon={moveToDirectoryScreen}
          isUnderLineRequired={true}
          isLeftTextClicked={filterModalVisible}
        />
        {!isLoading ? (
          <View>
            <Modal
              statusBarTranslucent={true}
              animationType="fade"
              transparent={true}
              visible={filterModalVisible}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setFilterModalVisible(false)}
                style={styles.outerview}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    ...styles.innerView,
                    top: !isIosDevice()
                      ? moderateScaleVertical(70)
                      : hasScreenNotch === 'true'
                      ? moderateScaleVertical(92)
                      : moderateScaleVertical(60),
                  }}>
                  <FlatList
                    data={menuData}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={item => (
                      <TouchableOpacity
                        style={styles.cardTouch}
                        onPress={() => {
                          setFilterModalVisible(false);
                          handleMenuOnPress(item?.item?.title);
                        }}>
                        <View style={styles.cardRow}>
                          <Text
                            style={
                              label === item.item.title
                                ? styles.staticSelectedCardLable
                                : styles.staticCardText
                            }>
                            {item?.item?.title}
                          </Text>
                          {label === item.item.title ? (
                            <View style={{width: moderateScale(20)}}>
                              <AppImages.Dashboard.tick_ICON />
                            </View>
                          ) : (
                            <View style={{width: moderateScale(20)}}></View>
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>

            <View
              style={{
                height: '100%',
              }}>
              {(convoListData.length > 0 && !isLoading && !isFiltering) ||
              (convoListData.length > 0 &&
                isFetchingNextPage &&
                isRefetching) ||
              (convoListData.length > 0 && isFiltering && !isRefetching) ? (
                <FlatList
                  data={convoListData}
                  showsHorizontalScrollIndicator={false}
                  overScrollMode="never"
                  nestedScrollEnabled={true}
                  removeClippedSubviews={true}
                  initialNumToRender={2}
                  maxToRenderPerBatch={1}
                  updateCellsBatchingPeriod={1}
                  windowSize={70}
                  showsVerticalScrollIndicator={false}
                  ref={flatListRef}
                  keyExtractor={item => item.id.toString()}
                  onEndReached={onEndReached}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                        reload();
                      }}
                    />
                  }
                  onScroll={onScroll}
                  scrollEventThrottle={16}
                  refreshing={false}
                  renderItem={item =>
                    item?.item?.crownConvoLinkings?.skipPosts === false ? (
                      <ConvoDescription
                        item={item?.item}
                        pageantTitle={item?.item?.pageantSystemDetail?.title}
                        uri={item?.item?.video_url}
                        noComments={item?.item?.post_main_comment_count}
                        noLikes={item?.item?.post_total_likes}
                        eventTitle={item?.item?.post_event?.title}
                        name={
                          item?.item?.postUsersWholikedList?.owner?.first_name
                        }
                        imageUri={item?.item?.post_image_url}
                        text={item?.item?.body}
                        videoId={item?.item?.video_id}
                        videoType={item?.item?.video_type}
                        imageName={item?.item?.image_name}
                        refetch={debounceRefetch}
                      />
                    ) : null
                  }
                  ListFooterComponent={() => {
                    return (
                      <View style={styles.freeHeight}>
                        {isFetchingNextPage ? (
                          <ActivityIndicator
                            size={'small'}
                            color={color.P_PINK}
                          />
                        ) : null}
                      </View>
                    );
                  }}
                />
              ) : isLoading || (isRefetching && isFiltering) ? (
                <>
                  <ShimmerFeed />
                </>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: moderateScaleVertical(147),
                  }}>
                  <AppImages.Common.NoProfileIllustration />
                  <Text style={styles.noConvo}>No Convo Found!</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <ShimmerFeed />
        )}
      </View>
      {!isLoading && (
        <CustomFAB
          extended={isExtended}
          visible={true}
          label={translations.CROWN_CONVO}
          icon={<AppImages.Common.WhitePlusIcon />}
          onPress={() =>
            navigation.navigate(SCREEN.ADD_CROWN_CONVO, {
              isAdd: true,
            })
          }
          style={[
            styles.fabStyle,
            {backgroundColor: 'transparent'}, // 👈 ADD THIS
          ]}
          labelStyle={{}}
          backgroundColor={color.P_PINK}
        />
      )}
    </SafeAreaView>
  );
};

export default Canvo;
