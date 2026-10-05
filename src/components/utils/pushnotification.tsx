// src/utils/pushNotification.ts

import React from 'react';
import {Image} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {color} from '../../assets/colorConstant';
import translations from '../../assets/translations';
import {navigationRef} from '../../root/navigatorref';
import {SCREEN} from '../../root/screenname';
import {
  GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY,
  PAGEANT_EVENT_PUBLIC_ALL_ALBUM,
} from '../../services/endpoints';
import {Notification} from '../../services/models/notification/notificationData';
import {PAGEANT_DETAIL_MENU_ID} from '../dashboard/dashboard/pageantdashboard/pageantdetail/components/menu';
import {EVENT_DETAIL_MENU_ID} from '../dashboard/dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/components/menu';
import {
  DIRECTORY_ID,
  EXPERT_ALBUM_TYPE,
  NOTIFICATION_TYPE,
  ROLES,
  USER_DESHBOARD_TAB,
} from './enum';
import {getSlugByRoleId, getTagTypeLable} from './helperFunction';
import {moderateScale, moderateScaleVertical} from './responsiveSize';

/**
 * Request permission for push notifications
 */
export async function requestUserPermission() {
  try {
    const {default: messaging} = await import(
      '@react-native-firebase/messaging'
    );

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await notificationListner();
    }
  } catch (error) {
    console.log('Push permission request failed:', error);
  }
}

/**
 * Subscribe to foreground notifications
 */
export const subscribeToForegroundNotifications = async () => {
  const {default: messaging} = await import('@react-native-firebase/messaging');
  return messaging().onMessage(onNotification);
};

/**
 * Full subscription setup (foreground only for now)
 */
export const subscribeToNotifications = async () => {
  const unsubscribe = await subscribeToForegroundNotifications();
  return () => unsubscribe();
};

/**
 * Handle navigation based on notification data
 */
export const pushNavigation = (item: Notification) => {
  if (
    navigationRef.current?.getState()?.routes.length !== undefined &&
    navigationRef.current?.getState()?.routes.length > 1
  ) {
    navigationRef.current?.reset({
      index: 0,
      routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
    });
  }

  if (!item.notification_type || !navigationRef.current) return;

  const type = item.notification_type;
  if (type === NOTIFICATION_TYPE.LEAD) {
    navigationRef.current.navigate(SCREEN.PAGEANT_DETAIL, {
      pageantId: item.recipient_id,
      tab: PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT,
      profileType: item.recipient_profile_type,
      notificastionType: type,
    });
  } else if (type === NOTIFICATION_TYPE.CONTESTANT_TO_DO) {
    setTimeout(() => {
      navigationRef.current?.navigate(SCREEN.CONTESTANT_DASHBOARD, {
        redirectedto: ROLES.CONTESTANT,
      });
    }, 1000);
  } else if (type === NOTIFICATION_TYPE.DIRECTOR_MEMBERSHIP) {
    navigationRef.current.navigate(SCREEN.PAGEANT_DETAIL, {
      pageantId: item.recipient_id,
      tab: PAGEANT_DETAIL_MENU_ID.ADVERTISE,
      profileType: item.recipient_profile_type,
      notificastionType: type,
    });
  } else if (type === NOTIFICATION_TYPE.PCA_DIRECTOR) {
    navigationRef.current.navigate(SCREEN.PAGEANT_DETAIL, {
      pageantId: item.recipient_id,
      tab: PAGEANT_DETAIL_MENU_ID.TPP_PCA_ICON,
      profileType: item.recipient_profile_type,
      notificastionType: type,
    });
  } else if (type === NOTIFICATION_TYPE.VOTE_PURCHASE) {
    navigationRef.current.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
      eventId: item.recipient_id,
      name: item.profile_name,
    });
  } else if (type === NOTIFICATION_TYPE.MESSAGE) {
    if (item.record_id) {
      navigationRef.current.navigate(SCREEN.CHAT_SCREEN, item.record_id);
    } else {
      navigationRef.current.navigate(SCREEN.MESSAGE);
    }
  } else if (
    type === NOTIFICATION_TYPE.PCA_EVENT_DESHBOARD ||
    type === NOTIFICATION_TYPE.VOTE_DESHBOARD
  ) {
    navigationRef.current.navigate(SCREEN.EVENT_DETAIL, {
      pageantEventDetailId: item.recipient_id,
      tab: EVENT_DETAIL_MENU_ID.PEOPLE_CHOICE_AWARD,
      profileType: item.recipient_profile_type,
      notificastionType: type,
    });
  } else if (type === NOTIFICATION_TYPE.EVENT_DESHBOARD) {
    navigationRef.current.navigate(SCREEN.EVENT_DETAIL, {
      pageantEventDetailId: item.recipient_id,
      tabTitle: translations.REVIEWS,
      profileType: item.recipient_profile_type,
      notificastionType: type,
    });
  } else if (type === NOTIFICATION_TYPE.REVIEW) {
    try {
      if (Number(item.recipient_profile_type) === DIRECTORY_ID.PAGEANT) {
        navigationRef.current.navigate(SCREEN.EVENT_DETAIL, {
          pageantEventDetailId: item.recipient_id,
          tab: EVENT_DETAIL_MENU_ID.REVIEWS,
          tabTitle: translations.REVIEWS,
          profileType: item.recipient_profile_type,
          notificastionType: type,
        });
      } else {
        navigationRef.current?.reset({
          index: 0,
          routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
        });
        setTimeout(() => {
          navigationRef.current?.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
            redirectedto: getTagTypeLable(Number(item.recipient_profile_type)),
            tabIndex: 4,
          });
        }, 150);
      }
    } catch (error) {
      console.error(error);
    }
  } else if (type === NOTIFICATION_TYPE.REVIEW_REPLY) {
    try {
      navigationRef.current.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        owner_id: item.user_id,
        roleId: item.user_id,
        profileId: item.recipient_id,
        key: new Date().getMilliseconds(),
        name: item.profile_name,
        category: item.recipient_profile_type,
        selectedTab: getTagTypeLable(Number(item.recipient_profile_type)),
      });
    } catch (error) {
      console.error(error);
    }
  } else if (type === NOTIFICATION_TYPE.TAGGED_IMAGE) {
    try {
      const recipientType = Number(item.recipient_profile_type);

      if (recipientType === DIRECTORY_ID.CONTESTANT) {
        navigationRef.current.navigate(SCREEN.PUBLIC_PROFILE_GALLERY, {
          profileId: item.recipient_id,
          profileType: item.recipient_profile_type,
          notificastionType: type,
          role: {
            slug: ROLES.CONTESTANT.toLowerCase(),
            profile_type: ROLES.CONTESTANT,
            profile_id: item.recipient_id,
          },
        });
      } else if (recipientType === DIRECTORY_ID.PAGEANT) {
        navigationRef.current.navigate(
          SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_GALLERY,
          {
            url: PAGEANT_EVENT_PUBLIC_ALL_ALBUM + item.recipient_id,
            subUrl: GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY,
            profileType: item.recipient_profile_type,
            notificastionType: type,
          },
        );
      } else if (item.sender_profile_type === ROLES.CONTESTANT) {
        navigationRef.current.navigate(
          SCREEN.EXPERT_PUBLIC_CONTESTANT_WORK_WITH,
          {
            profileId: item.recipient_id,
            profileType: item.recipient_profile_type,
            notificastionType: type,
            tag: new Date().getMilliseconds(),
            role: {
              slug: getTagTypeLable(item.recipient_profile_type),
              profile_type: getSlugByRoleId(item.recipient_profile_type),
              profile_id: item.recipient_id,
            },
          },
        );
      } else {
        if (item.sender_profile_type === EXPERT_ALBUM_TYPE.EXTRA_) {
          navigationRef.current.navigate(
            SCREEN.EXPERT_PUBLIC_PROFILE_EXTRA_IMAGES,
            {
              screenName: translations.EXTRA,
              business_profile_id: item.recipient_id,
            },
          );
        } else {
          navigationRef.current.navigate(SCREEN.EXPERT_PEGEANT_WORK_WITH, {
            profileId: item.recipient_id,
            role: {
              profile_id: item.recipient_id,
              profile_type: getTagTypeLable(item.recipient_profile_type),
              slug: getSlugByRoleId(item.recipient_profile_type),
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else if (type === NOTIFICATION_TYPE.CONVO_COMMENT) {
    navigationRef.current.navigate(SCREEN.CONVO_COMMENTS, {
      id: item.record_id,
      autoSelect: true,
    });
  } else if (type === NOTIFICATION_TYPE.NEW_PRODUCT) {
    if (item.record_id) {
      navigationRef.current.navigate(SCREEN.PRODUCT_DETAIL, {
        productId: item.record_id,
      });
    } else {
      navigationRef.current.navigate(USER_DESHBOARD_TAB.SHOP);
    }
  } else if (type === NOTIFICATION_TYPE.CONVO_NEW_COMMENT) {
    // navigationRef.current.navigate(USER_DESHBOARD_TAB.CONVO, {
    //   clearConvoNotification: true,

    // });
    navigationRef.current.navigate(SCREEN.CONVO_COMMENTS, {
      id: item.record_id,
      autoSelect: true,
    });
  } else if (type === NOTIFICATION_TYPE.CART_LEFT) {
    navigationRef.current.navigate(SCREEN.SHOPPING_BAG);
  } else if (type === NOTIFICATION_TYPE.SHOP_ORDER_RECEVIED) {
    navigationRef.current.navigate(SCREEN.RECEIVED_ORDERS);
  } else if (type === NOTIFICATION_TYPE.SHOP_ORDER_PLACED) {
    navigationRef.current.navigate(SCREEN.MY_ORDERS);
  }
};

/**
 * Set up listeners for when app is opened from notification
 */
export const notificationListner = async () => {
  try {
    const {default: messaging} = await import(
      '@react-native-firebase/messaging'
    );

    // App opened from background by tapping notification
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data) {
        pushNavigation(remoteMessage.data as Notification);
      }
    });

    // App opened from quit state
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification?.data) {
      pushNavigation(initialNotification.data as Notification);
    }
  } catch (error) {
    console.log('Notification listener setup failed:', error);
  }
};

/**
 * Display in-app notification banner
 */
export const onNotification = async (message: any) => {
  showMessage({
    message: message?.notification?.title || translations.NOTIFICATION,
    description: message?.notification?.body,
    type: 'success',
    backgroundColor: color.S_GRAY_1,
    color: color.BLACK,
    duration: 5000,
    onPress: () => {
      if (message?.data) {
        pushNavigation(message.data as Notification);
      }
    },
    icon: () => (
      <Image
        source={require('../../assets/images/common/ic_launcher_foreground.png')}
        style={{
          height: moderateScaleVertical(40),
          width: moderateScale(40),
          marginRight: moderateScale(8),
        }}
      />
    ),
  });
};
