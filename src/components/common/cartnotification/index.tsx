import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import {SCREEN} from '../../../root/screenname';
import {moderateScale} from '../../utils/responsiveSize';
import {styles} from './styles';
import GuestUserLoginSignModel from '../guestuserloginsignupmodal';
import {UserContext} from '../../../store/userStore';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../commonalert';
import {emptyFunction} from '../../utils/helperFunction';
import {RootContext} from '../../../store/rootStore';

interface Props {
  isNotifiction?: boolean;
  isMessage?: boolean;
  isFavorite?: boolean;
  setIsModalVisible?: Function;
}

/* A function component. */
const CartNotication = ({
  isNotifiction = false,
  isFavorite = false,
  isMessage = false,
  setIsModalVisible = emptyFunction,
}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [isGuestUserLoginModalVisinle, setGuestUserLoginModalVisinle] =
    useState(false);
  const {headerCountData} = useContext(RootContext);

  const {storeData} = useContext(UserContext);

  /* The `moveToScreen` function is a callback function that is called when the user presses the
  TouchableOpacity component. It is responsible for navigating to different screens based on the
  value of the `isFavorite`, `isNotifiction`, and `isMessage` props. */
  const moveToScreen = () => {
    setIsModalVisible(false);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return netInfo.isConnected;
    } else {
      if (
        storeData?.data?.user === null ||
        storeData?.data?.user === undefined
      ) {
        setGuestUserLoginModalVisinle(true);
      } else if (isFavorite) {
        navigation.navigate(SCREEN.FAVOURITES);
      } else if (isNotifiction) {
        navigation.navigate(SCREEN.NOTIFICATION);
      } else if (isMessage) {
        navigation.navigate(SCREEN.MESSAGE);
      } else {
        navigation.navigate(SCREEN.SHOPPING_BAG);
      }
    }
  };

  /* The `getCount` function is a helper function that takes a number `count` as a parameter. It is
  used to format the count value displayed in the red circle on the notification icon. */
  const getCount = (count: number) => {
    if (count > 99) {
      return count + '+';
    }
    return count + '';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={moveToScreen} style={styles.rightIcons}>
        {isFavorite ? (
          <AppImages.SHOP.boldHeart
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ) : isMessage ? (
          <AppImages.SHOP.MessageIcon
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ) : isNotifiction ? (
          <AppImages.Dashboard.bellNotification_ICON />
        ) : (
          <AppImages.Dashboard.ShopingBagIcon />
        )}

        {(headerCountData?.wishlist_count > 0 &&
          isFavorite &&
          !isNotifiction &&
          !isMessage &&
          storeData?.data?.user !== null &&
          storeData?.data?.user !== undefined) ||
        (headerCountData?.cart_count > 0 &&
          !isNotifiction &&
          !isFavorite &&
          !isMessage &&
          storeData?.data?.user !== null &&
          storeData?.data?.user !== undefined) ? (
          <View style={styles.redCircle}>
            <Text style={styles.redCircleText}>
              {getCount(
                isFavorite
                  ? headerCountData?.wishlist_count
                  : headerCountData?.unread_notifications_count > 0 &&
                    isNotifiction
                  ? headerCountData?.unread_notifications_count
                  : headerCountData?.cart_count,
              )}
            </Text>
          </View>
        ) : (headerCountData?.unread_notifications_count > 0 &&
            isNotifiction &&
            !isFavorite &&
            storeData?.data?.user !== null &&
            storeData?.data?.user !== undefined) ||
          (headerCountData?.unread_messages_count > 0 &&
            isMessage &&
            !isFavorite &&
            storeData?.data?.user !== null &&
            storeData?.data?.user !== undefined) ? (
          <View style={styles.redSmallCircle} />
        ) : null}
      </TouchableOpacity>

      <GuestUserLoginSignModel
        isModalVisible={isGuestUserLoginModalVisinle}
        setIsModalVisible={setGuestUserLoginModalVisinle}
      />
    </View>
  );
};

export default CartNotication;
