import {SafeAreaView, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../common/header';
import {styles} from './styles';
// Removed: import messaging from '@react-native-firebase/messaging';
import AppImages from '../../../assets/images/AppImages';
import useHtQuery from '../../../services/api/useHtQuery';
import NetInfo from '@react-native-community/netinfo';
import {
  GET_CART_COUNT,
  GET_NOTIFICATION_TYPE,
} from '../../../services/endpoints';
import DynamicTabs from '../../common/dynamictabs';
import {moderateScale} from '../../utils/responsiveSize';
import translations from '../../../assets/translations';
import NotificationList from './components';
import FilterModal from '../message/components/filtermodal';
import {AgeDivision} from '../../../services/models/pageantdetails/ageDivision';
import ShimmerMessageList from '../../common/shimmer/messagelistshimmer';
import {MESSAGE_MENU, ONN_OFF} from '../../utils/enum';
import {useIsFocused} from '@react-navigation/core';
import useCgMutation from '../../../services/api/useCgMutation';
import {MethodTypes} from '../../../services/constants';
import {internetState} from '../../common/commonalert';
import {User} from '../../../services/models/user/user';
import {Base} from '../../../services/models/base';
import {RootContext} from '../../../store/rootStore';

const NotificationCenter = ({route}) => {
  const isFocussed = useIsFocused();
  const [currentTab, setCurrentTab] = useState(0);

  const {setCounter} = useContext(RootContext);
  const [menuList] = useState([
    {
      id: MESSAGE_MENU.MANANGE_NOTIFICATION,
      label: translations.MANAGE_NOTIFICATION,
      icon: (
        <AppImages.Dashboard.ManageNotificationIcon width={moderateScale(16)} />
      ),
    },
  ]);

  const [threeDotMenuClicked, setThreeDotMenuClicked] = useState(false);

  //API GET NOTIFICATION TYPES
  const {data, isLoading, refetch} = useHtQuery<AgeDivision[]>({
    key: GET_NOTIFICATION_TYPE,
    url: GET_NOTIFICATION_TYPE,
    offSuccessToast: true,
  });

  const {mutateAsync: viewProducts} = useCgMutation<Base<User>>({
    key: GET_CART_COUNT,
    method: MethodTypes.GET,
    url: GET_CART_COUNT,
    disableLoader: true,
    offSuccessToast: true,
  });

  const getCartCountApi = async () => {
    const productAllDetail = await viewProducts();
    if (productAllDetail?.success && productAllDetail?.data !== undefined) {
      setCounter(productAllDetail?.data);
    }
  };

  // Foreground message listener – now safely deferred
  useEffect(() => {
    const setupForegroundListener = async () => {
      const {default: messaging} = await import(
        '@react-native-firebase/messaging'
      );

      const unsubscribe = messaging().onMessage(async () => {
        filterAndRefresh();
      });

      return unsubscribe;
    };

    let unsubscribe: (() => void) | undefined;

    setupForegroundListener().then(unsub => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filterAndRefresh = async () => {
    refetch();
  };

  useEffect(() => {
    if (data?.data !== undefined) {
      NetInfo.fetch().then(state => {
        if (!state.isConnected && !state.isInternetReachable) {
          internetState(state.isConnected!!);
          return false;
        } else {
          if (!isFocussed) {
            setTimeout(() => {
              refetch();
              if (getAllUnreadNotificationCount() < 5) {
                getCartCountApi();
              }
            }, 2000);
          } else {
            refetch();
            if (getAllUnreadNotificationCount() < 5) {
              getCartCountApi();
            }
          }
        }
      });
    }
  }, [isFocussed]);

  const renderSceneAward = (page: any, index: number) => {
    let position = Number(page.key);
    if (!isLoading && data?.data !== undefined) {
      return (
        <NotificationList
          tabName={position === -1 ? undefined : data?.data[position]}
          unReadCount={
            position === -1
              ? getAllUnreadNotificationCount()
              : data?.data[position].unread_count
          }
          tabId={position + 1}
          currentTab={currentTab}
          isNotificationEnable={
            position === -1
              ? undefined
              : data?.data[position].notification_setting === ONN_OFF.ON
          }
        />
      );
    } else {
      return (
        <View>
          <ShimmerMessageList />
        </View>
      );
    }
  };

  const getAllUnreadNotificationCount = () => {
    var count = 0;
    data?.data?.forEach(element => {
      count = count + element.unread_count;
    });
    return count;
  };

  const handleIndexChange = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header
        lable={translations.NOTIFICATION}
        isUnderLineRequired
        rightIcon2={<AppImages.Dashboard.HeaderMenuIcon />}
        onPressRightIcon2={() => setThreeDotMenuClicked(!threeDotMenuClicked)}
      />
      {!isLoading && data?.data !== undefined && data?.data?.length > 0 && (
        <DynamicTabs
          tabScreen={renderSceneAward}
          ageDivisionList={data?.data}
          isAllTabRequired={true}
          customStylesForContainer={{
            marginLeft: moderateScale(0),
            marginTop: moderateScale(0),
          }}
          indexChanged={handleIndexChange}
        />
      )}

      {menuList !== undefined && (
        <FilterModal
          modalVisible={threeDotMenuClicked}
          setModalVisible={setThreeDotMenuClicked}
          type={translations.THREEDOT_MENU}
          menuList={menuList}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationCenter;
