import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NotificationCartFavMessageCount} from '../services/models/notification/notificationData';

const IS_WELCOME_MODEL_VIEWED = 'IS_WELCOME_MODEL_VIEWED';
const IS_USER_LOGGED_IN = 'IS_USER_LOGGED_IN';
const SHOPPING_BAG_WARNING_MODAL = 'SHOPPING_BAG_WARNING_MODAL';
export const RootContext = createContext({
  isWelcomePopViewed: Boolean,
  setWelcomePopViewed: (isWelcomePopViewed: boolean) => {},
  isUserSignUp: Boolean,
  setUserSignUp: (isUserSignUp: boolean) => {},
  showShoppingBagWarningModal: Boolean,
  setShoppingBagWarningModal: (isTicked: boolean) => {},
  headerCountData: {
    cart_count: 0,
    wishlist_count: 0,
    unread_notifications_count: 0,
    unread_messages_count: 0,
  },
  setCounter: (counter: NotificationCartFavMessageCount) => {},
});

const RootStore: React.FC = ({children}) => {
  const [isWelcomePopViewed, setWelcomePopViewedLocal] =
    useState<boolean>(false);
  const [isUserSignUp, setUserSignUp] = useState<boolean>(false);
  const [showShoppingBagWarningModal, setshowShoppingBagWarningModal] =
    useState(false);
  const [headerCountData, setHeaderCountData] =
    useState<NotificationCartFavMessageCount>();

  const getAsyncataWithKey = async KEY => {
    var val = await AsyncStorage.getItem(KEY);

    return JSON.parse(val);
  };
  const getStateFromPreference = async () => {
    var valueIsWelcomePopViewed = await AsyncStorage.getItem(
      IS_WELCOME_MODEL_VIEWED,
    );
    var parseIsWelcomePopViewedValue = JSON.parse(valueIsWelcomePopViewed);
    setWelcomePopViewedLocal(parseIsWelcomePopViewedValue);

    var valueIsUserLoggedIn = await AsyncStorage.getItem(IS_USER_LOGGED_IN);
    var parseIsUserLoggedInValue = JSON.parse(valueIsUserLoggedIn);
    setUserSignUp(parseIsUserLoggedInValue);
    var isTicked = await getAsyncataWithKey(SHOPPING_BAG_WARNING_MODAL);
    setshowShoppingBagWarningModal(isTicked);
  };

  // Get the token at app startup
  useEffect(() => {
    getStateFromPreference();
  }, []);

  // Save access token when user requests a change
  const setWelcomePopViewed = async (value: boolean) => {
    setWelcomePopViewedLocal(value);
    AsyncStorage.setItem(IS_WELCOME_MODEL_VIEWED, JSON.stringify(value));
  };

  const setShoppingBagWarningModal = async isTicked => {
    setshowShoppingBagWarningModal(isTicked);
    AsyncStorage.setItem(SHOPPING_BAG_WARNING_MODAL, JSON.stringify(isTicked));
  };
  const setCounter = async allValues => {
    setHeaderCountData(allValues);
  };
  return (
    <RootContext.Provider
      value={{
        isWelcomePopViewed,
        setWelcomePopViewed: setWelcomePopViewed,
        isUserSignUp,
        setUserSignUp: setUserSignUp,
        showShoppingBagWarningModal,
        setShoppingBagWarningModal: setShoppingBagWarningModal,
        headerCountData,
        setCounter: setCounter,
      }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootStore;
