import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {moderateScale} from '../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import FastImageView from '../../../../common/fastimageview';
import translations from '../../../../../assets/translations';
import {Notification} from '../../../../../services/models/notification/notificationData';
import {
  capitalizeFirstLowercaseRest,
  getSlugByRoleId,
  getTagTypeLable,
} from '../../../../utils/helperFunction';
import {
  DIRECTORY_ID,
  EXPERT_ALBUM_TYPE,
  IS_MINOR_VALUES,
  NOTIFICATION_TYPE,
  ROLES,
  USER_DESHBOARD_TAB,
} from '../../../../utils/enum';
import {PAGEANT_DETAIL_MENU_ID} from '../../../dashboard/pageantdashboard/pageantdetail/components/menu';
import {EVENT_DETAIL_MENU_ID} from '../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/components/menu';
import {
  GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY,
  PAGEANT_EVENT_PUBLIC_ALL_ALBUM,
} from '../../../../../services/endpoints';

interface Props {
  item: Notification;
  isFetching: boolean;
}

const NotficationListItem = ({item, isFetching}: Props) => {
  const navigation = useNavigation();
  const [isRead, setResetRead] = useState(item.is_read === IS_MINOR_VALUES.YES);

  useEffect(() => {
    if (!isFetching) {
      setTimeout(() => {
        setResetRead(item.is_read === IS_MINOR_VALUES.YES);
      }, 1000);
    }
  }, [isFetching]);

  const onItemClick = () => {
    if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.VOTE_PURCHASE
    ) {
      navigation?.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
        eventId: item.recipient_id,
        name: item.profile_name,
      });
    } else if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.LEAD
    ) {
      //recruit message
      navigation.navigate(SCREEN.PAGEANT_DETAIL, {
        pageantId: item.recipient_id,
        tab: PAGEANT_DETAIL_MENU_ID.POTENTIAL_CONSTESTANT,
        profileType: item.recipient_profile_type,
        notificastionType: item.notification_type,
      });
    } else if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.MESSAGE
    ) {
      //message
      if (item.record_id === null || item.record_id === undefined) {
        navigation.navigate(SCREEN.MESSAGE);
      } else {
        navigation.navigate(SCREEN.CHAT_SCREEN, item.record_id);
      }
    } else if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.REVIEW
    ) {
      //event detail review
      if (item.recipient_profile_type === DIRECTORY_ID.PAGEANT) {
        navigation.navigate(SCREEN.EVENT_DETAIL, {
          pageantEventDetailId: item.recipient_id,
          tab: EVENT_DETAIL_MENU_ID.REVIEWS,
          tabTitle: translations.REVIEWS,
          profileType: item.recipient_profile_type,
          notificastionType: item.notification_type,
        });
      } else {
        navigation?.reset({
          index: 0,
          routes: [
            {
              name: SCREEN.DASHBOARD_NAVIGATION,
            },
          ],
        });
        setTimeout(() => {
          navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
            redirectedto: getTagTypeLable(Number(item.recipient_profile_type)),
            tabIndex: 4,
          });
        }, 100);
      }
    } else if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.REVIEW_REPLY
    ) {
      //event detail review
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        owner_id: item.user_id,
        roleId: item.user_id,
        profileId: item.recipient_id,
        name: item.profile_name,
        key: new Date().getMilliseconds(),
        category: item.recipient_profile_type,
        selectedTab: getTagTypeLable(Number(item.recipient_profile_type)),
      });
    } else if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.CONVO_COMMENT
    ) {
      //event detail review
      navigation?.navigate(SCREEN.CONVO_COMMENTS, {
        id: item.record_id,
        autoSelect: true,
      });
    } else if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.CONVO_NEW_COMMENT
    ) {
      //event detail review

      navigation.reset({
        index: 0,
        routes: [
          {
            name: SCREEN.DASHBOARD_NAVIGATION,
          },
        ],
      });
      navigation.navigate(USER_DESHBOARD_TAB.CONVO, {
        clearConvoNotification: true,
      });
    } else if (
      item.notification_type !== undefined &&
      item.notification_type === NOTIFICATION_TYPE.TAGGED_IMAGE
    ) {
      //contestant public gallery
      if (item.recipient_profile_type === DIRECTORY_ID.CONTESTANT) {
        navigation.navigate(SCREEN.PUBLIC_PROFILE_GALLERY, {
          profileId: item.recipient_id,
          profileType: item.recipient_profile_type,
          notificastionType: item.notification_type,
          role: {
            slug: ROLES.CONTESTANT.toLowerCase(),
            profile_type: ROLES.CONTESTANT,
            profile_id: item.recipient_id,
          },
        });
      } else if (item.recipient_profile_type === DIRECTORY_ID.PAGEANT) {
        //pagent public gallery
        // PAGEANT_EVENT_PUBLIC_ALL_ALBUM;
        //PAGEANT_PUBLIC_PROFILE_ALL_ALBUM
        //GET_PAGEANT_PUBLIC_PROFILE_SUB_GALLERY
        //GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE_GALLERY, {
          url: PAGEANT_EVENT_PUBLIC_ALL_ALBUM + item.recipient_id,
          subUrl: GET_EVENT_PUBLIC_PROFILE_SUB_GALLERY,
          profileType: item.recipient_profile_type,
          notificastionType: item.notification_type,
        });
      } else if (item.sender_profile_type === ROLES.CONTESTANT) {
        //EXPERT_PUBLIC_CONTESTANT_WORK_WITH
        navigation.navigate(SCREEN.EXPERT_PUBLIC_CONTESTANT_WORK_WITH, {
          profileId: item.recipient_id,
          profileType: item.recipient_profile_type,
          notificastionType: item.notification_type,
          tag: new Date().getMilliseconds(),
          role: {
            slug: getTagTypeLable(item.recipient_profile_type),
            profile_type: getSlugByRoleId(item.recipient_profile_type),
            profile_id: item.recipient_id,
          },
        });
      } else {
        //EXPERT_PEGEANT_WORK_WITH
        if (item.sender_profile_type === EXPERT_ALBUM_TYPE.EXTRA_) {
          navigation?.navigate(SCREEN.EXPERT_PUBLIC_PROFILE_EXTRA_IMAGES, {
            screenName: translations.EXTRA,
            business_profile_id: item.recipient_id,
          });
        } else {
          navigation.navigate(SCREEN.EXPERT_PEGEANT_WORK_WITH, {
            profileId: item.recipient_id,
            role: {
              profile_id: item.recipient_id,
              profile_type: getTagTypeLable(item.recipient_profile_type),
              slug: getSlugByRoleId(item.recipient_profile_type),
            },
          });
        }
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => onItemClick()}>
      {isRead ? (
        <View style={styles.circleGap} />
      ) : (
        <View style={styles.circle} />
      )}

      <View style={styles.imageView}>
        <FastImageView
          width={moderateScale(48)}
          height={moderateScale(48)}
          borderRadius={48}
          imageUrl={item?.image}
          isCircle
          isProfileImage
        />
      </View>
      <View style={styles.headerText}>
        <Text
          style={isRead ? styles.typeStyle : styles.textUnreadStyle}
          numberOfLines={2}>
          {capitalizeFirstLowercaseRest(item.title)}
        </Text>
        <Text
          style={isRead ? styles.readStyle : styles.unreadStyle}
          numberOfLines={1}>
          {'' + item?.post_output_time_to_show}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotficationListItem;
