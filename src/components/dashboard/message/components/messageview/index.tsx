import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import FastImageView from '../../../../common/fastimageview';
import {color} from '../../../../../assets/colorConstant';
import {moderateScale, width} from '../../../../utils/responsiveSize';
import AppImages from '../../../../../assets/images/AppImages';
import {MSG_TYPE} from '../../../../utils/enum';
import {compareDates} from '../../../../utils/datetimemanger';
import {MessageContent} from '../../../../../services/models/messagesData';
import {checkIsNull} from '../../../../utils/validations';

interface Props {
  item: MessageContent;
  isDeleteClicked: boolean;
  selectedItems: any;
  onItemClicked: Function;
  param: string;
}

const MessageView = ({
  item,
  isDeleteClicked,
  selectedItems,
  onItemClicked,
  param,
}: Props) => {
  const isMessageRead = (
    id: number,
    status: string,
    msgSharedStatus: string,
    senderId: number,
    receiverId: number
  ) => {
    if (isDeleteClicked) {
      if (selectedItems.includes(id)) {
        return (
          <View style={styles.selectedIcon}>
            <AppImages.Common.selectedIcon_ICON />
          </View>
        );
      } else {
        return <View style={styles.emptyCircle} />;
      }
    } else if (
      status === MSG_TYPE.UNREAD &&
      param !== MSG_TYPE.SENT &&
      (msgSharedStatus !== MSG_TYPE.SENT || senderId === receiverId)
    ) {
      return <View style={styles.unreadMessagesCircle} />;
    } else {
      return (
        <View
          style={{
            ...styles.unreadMessagesCircle,
            backgroundColor: color.TRANSPARENT,
          }}
        />
      );
    }
  };

  const getName = (userDetail: MessageContent) => {
    if (checkIsNull(userDetail?.message_to_myself)) {
      return userDetail?.message_to_myself;
    } else {
      if (userDetail?.message_shared_status === MSG_TYPE.SENT) {
        if (checkIsNull(userDetail?.receiver_name)) {
          return userDetail?.receiver_name?.receiver_full_name;
        } else {
          return userDetail?.not_application_name;
        }
      } else {
        if (checkIsNull(userDetail?.sender_name)) {
          return userDetail?.sender_name?.full_name;
        } else {
          return userDetail?.not_application_name;
        }
      }
    }
  };

  const getImagePath = (userDetail: any) => {
    if (userDetail?.message_shared_status === MSG_TYPE.SENT) {
      if (checkIsNull(userDetail?.receiver_name)) {
        return userDetail?.receiver_name?.profile_image_url;
      } else {
        return userDetail?.not_application_image_url;
      }
    } else {
      if (checkIsNull(userDetail?.sender_name)) {
        return userDetail?.sender_name?.profile_image_url;
      } else {
        return userDetail?.not_application_image_url;
      }
    }
  };

  const isUnread = (
    msgReadStatus: string,
    msgShareStatus: string,
    sender_id: number,
    receiver_id: number
  ) => {
    if (
      msgReadStatus === MSG_TYPE.UNREAD &&
      param !== MSG_TYPE.SENT &&
      (msgShareStatus !== MSG_TYPE.SENT || receiver_id === sender_id)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{
          ...styles.container,
          backgroundColor: selectedItems.includes(item?.id)
            ? color.S_PINK
            : color.WHITE,
        }}
        onPress={() => onItemClicked(item?.id)}>
        {isMessageRead(
          item?.id,
          item?.msg_type_read_status,
          item?.message_shared_status,
          item?.sender_id,
          item?.receiver_id
        )}
        <View style={styles.imageView}>
          <FastImageView
            imageUrl={getImagePath(item)}
            width={moderateScale(60)}
            height={moderateScale(60)}
            borderRadius={moderateScale(30)}
            borderColor={color.S_GRAY_2}
            isCircle
          />
        </View>
        <View
          style={{
            ...styles.middleSection,
            width: isDeleteClicked
              ? width - moderateScale(120)
              : width - moderateScale(90),
          }}>
          <View style={styles.infoSection}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                paddingRight: moderateScale(16),
                alignSelf: 'stretch',
              }}>
              <Text
                style={styles.nameStyles}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {getName(item)}
              </Text>
              <View style={{width: moderateScale(8)}} />
              <Text
                style={styles.profileNameStyle}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {item?.profile_type}
              </Text>
            </Text>
          </View>
          <View style={styles.incomingSection}>
            {item?.message_shared_status === MSG_TYPE.SENT ? (
              <AppImages.MESSAGES.SentArrow />
            ) : (
              <AppImages.MESSAGES.IncomingIcon />
            )}
            <Text
              style={{
                ...styles.dateTimeStyle,
                color: isUnread(
                  item?.msg_type_read_status,
                  item?.message_shared_status,
                  item?.sender_id,
                  item?.receiver_id
                )
                  ? color.P_PINK
                  : color.S_GRAY_4,
              }}>
              {compareDates(item?.message_create_at)}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text
              style={{
                ...styles.textMsg,
                width: isDeleteClicked
                  ? width - moderateScale(120)
                  : width - moderateScale(92),
                color: isUnread(
                  item?.msg_type_read_status,
                  item?.message_shared_status,
                  item?.sender_id,
                  item?.receiver_id
                )
                  ? color.INPUT_TEXT
                  : color.S_GRAY_4,
              }}
              numberOfLines={1}>
              {item?.message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default MessageView;
