import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import BottomModal from '../../../../common/bottommodal';
import {emptyFunction} from '../../../../utils/helperFunction';
import AppImages from '../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {POST_STATUS} from '../../../../utils/enum';
import { moderateScaleVertical } from '../../../../utils/responsiveSize';

const ThreeDotsModal = ({
  isOwnedByMe = true,
  isModalVisible = false,
  setIsModalVisible = emptyFunction,
  id,
  postStatus,
  onDeletePost = emptyFunction,
  onHidePost = emptyFunction,
  onEditPost = emptyFunction,
  onPressBlockUser = emptyFunction 
}) => {

  const navigation = useNavigation();

  const RowTouchView = (
    name = '',
    onPress = emptyFunction,
    image = <AppImages.CONVO.tpp_edit_pink />
  ) => {
    return (
      <TouchableOpacity
        style={styles.rowView}
        onPress={() => {
          onPress();
          setIsModalVisible(false);
        }}>
        <View style={styles.imageView}>{image}</View>
        <Text style={styles.textstyle}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const onPressReport = () => {
    navigation.navigate(SCREEN.REPORT_POST, {id: id});
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{height: 'auto',     paddingHorizontal:moderateScaleVertical(16)
    }}>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => setIsModalVisible(false)}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
        {isOwnedByMe ? (
          <>
            {RowTouchView(
              translations.EDIT_POST,
              onEditPost,
              <AppImages.CONVO.tpp_edit_pink />
            )}
            {RowTouchView(
              translations.DELETE_POST,
              onDeletePost,
              <AppImages.CONVO.tpp_delete_pink />
            )}
            {postStatus !== POST_STATUS.DRAFT &&
              RowTouchView(
                postStatus == POST_STATUS.HIDDEN_BY_OWNER
                  ? translations.SHOW_ON_TIMELINE
                  : translations.HIDE_FROM_TIMELINE,
                onHidePost,
                postStatus == POST_STATUS.HIDDEN_BY_OWNER ? (
                  <AppImages.CONVO.tpp_unhide_icon />
                ) : (
                  <AppImages.CONVO.tpp_eye_pink />
                )
              )}
          </>
        ) : (
          <>
            {RowTouchView(
              translations.REPORT_POST,
              onPressReport,
              <AppImages.CONVO.report />
            )}
            {RowTouchView(
              translations.BLOCK_USER,
              onPressBlockUser,
              <AppImages.CONVO.BlockUserIcon />
            )}
          </>
        )}
      </SafeAreaView>
    </BottomModal>
  );
};

export default ThreeDotsModal;
