import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {styles} from './styles';
import FastImageView from '../../../../common/fastimageview';
import {moderateScale} from '../../../../utils/responsiveSize';
import AppImages from '../../../../../assets/images/AppImages';
import ThreeDotsModal from '../threedotsmodal';
import {ConvoListItem} from '../../../../../services/models/convo/convoListing';
import {
  checkIsConnected,
  getTagTypeLable,
} from '../../../../utils/helperFunction';
import {UserContext} from '../../../../../store/userStore';
import translations from '../../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import WarningModel from '../../../../common/warningmodel';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {
  DELETE_CONVO_POST,
  HIDE_CONVO_POST,
  BLOCK_USER,
} from '../../../../../services/endpoints';
import {POST_STATUS, ROLES} from '../../../../utils/enum';
import {toast, toastType} from '../../../../common/commonalert';

interface Props {
  item: ConvoListItem;
  refetch: any;
  prvScreen: string;
}

const Postheader = ({item, refetch, prvScreen}: Props) => {
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const [isHideConvoModal, setIsHideConvoModal] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const {storeData} = useContext(UserContext);

  const navigation = useNavigation();
  const {mutateAsync: hidePost} = useCgMutation<Base>({
    key: HIDE_CONVO_POST,
    url: HIDE_CONVO_POST,
    body: {
      post_id: item?.id,
      new_status:
        item?.status == POST_STATUS.HIDDEN_BY_OWNER
          ? POST_STATUS.PUBLISHED
          : POST_STATUS.HIDDEN_BY_OWNER,
    },
    disableLoader: true,
    offSuccessToast: true,
  });

  const {mutateAsync: deletePost} = useCgMutation<Base>({
    key: DELETE_CONVO_POST,
    url: DELETE_CONVO_POST,
    body: {
      post_id: item?.id,
    },
    offSuccessToast: true,
    disableLoader: true,
  });

  const {mutateAsync: hitBlockUserApi} = useCgMutation<Base>({
    key: BLOCK_USER,
    url: BLOCK_USER,
    body: {
      user_id: item?.user_id,
    },
    offSuccessToast: false,
    disableLoader: true,
  });

  const checkIsUserActive = () => {
    if (item?.convoUserTabsArr?.haveRole === 1) {
      if (item?.contestant?.is_minor == 'Yes') {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const isUserActive = checkIsUserActive();

  const getId = (tag: string) => {
    if (item?.convoUserTabsArr?.profileTabsArr[0].profile_id == 0) {
      return item?.convoUserTabsArr?.profileTabsArr[1][tag];
    } else {
      return item?.convoUserTabsArr?.profileTabsArr?.[0]?.[tag];
    }
  };

  const getHiddenText = () => {
    if (item?.status == POST_STATUS.HIDDEN_BY_OWNER) {
      return (
        <View style={styles.hiddenMessge}>
          <View style={styles.eyeIcon}>
            <AppImages.Common.EyeClose_ICON
              width={moderateScale(10)}
              height={moderateScale(10)}
            />
          </View>
          <Text style={styles.hiddenTextContainer}>
            {translations.HIDDEN_BY_YOU}
          </Text>
        </View>
      );
    } else if (item?.status == POST_STATUS.HIDDEN_BY_ADMIN) {
      return (
        <View style={styles.hiddenMessge}>
          <View style={styles.eyeIcon}>
            <AppImages.Common.EyeClose_ICON
              width={moderateScale(10)}
              height={moderateScale(10)}
            />
          </View>
          <Text style={styles.hiddenTextContainer}>
            {translations.HIDDEN_BY_PP}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const onPressName = () => {
    if (isUserActive) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: item?.user_id, //owner id
        profileId: getId('profile_id'),
        name: item?.owner?.first_name + ' ' + item?.owner?.last_name,
        category: getId('role_id'),
        key: new Date().getMilliseconds(),
        selectedTab: getTagTypeLable(getId('role_id'), ROLES.CONTESTANT),
      });
    } else {
      return null;
    }
  };

  const onDeletePost = () => {
    setIsActionModalVisible(false);
    setTimeout(() => {
      setIsWarningMoadlVisible(true);
    }, 400);
  };

  const onHidePost = () => {
    setIsActionModalVisible(false);
    setTimeout(() => {
      setIsHideConvoModal(true);
    }, 400);
  };

  const onBlockUser = () => {
    setIsActionModalVisible(false);
    setTimeout(() => {
      setIsBlockModalVisible(true);
    }, 400);
  };

  const hitDeleteApi = async () => {
    if (checkIsConnected()) {
      const res = await deletePost();
      if (res.success) {
        await refetch();
        prvScreen !== SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE &&
          navigation.goBack();
        toast(
          res?.message,
          res?.success ? toastType?.SUCESS_TOAST : toastType?.ERROR_TOAST,
        );
      }
    }
  };
  const hitHidePostAPi = async () => {
    if (checkIsConnected()) {
      const res = await hidePost();
      if (res.success) {
        await refetch();
        toast(
          res?.message,
          res?.success ? toastType?.SUCESS_TOAST : toastType?.ERROR_TOAST,
        );
      }
    }
  };

  const callBlockUserAPi = async () => {
    if (checkIsConnected()) {
      const res = await hitBlockUserApi();
      if (res.success) {
        await refetch();
      }
    }
  };

  const onEditPost = () => {
    setIsActionModalVisible(false);
    setTimeout(() => {
      navigation.navigate(SCREEN.ADD_CROWN_CONVO, {
        isAdd: false,
        postId: item?.id,
      });
    }, 400);
  };

  const checkIsPostEdited = () => {
    if (
      item?.status == POST_STATUS.PUBLISHED &&
      item?.owner?.id === storeData.data?.user?.id
    ) {
      if (item?.is_updated == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.imageView}
          onPress={onPressName}
          activeOpacity={0.6}>
          <FastImageView
            width={moderateScale(60)}
            height={moderateScale(60)}
            borderRadius={100}
            imageUrl={item?.thread_owner_image}
            isCircle
            isProfileImage
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text
            style={isUserActive ? styles.nameStylesActive : styles.nameStyles}
            numberOfLines={1}
            onPress={onPressName}>
            {item?.owner?.first_name + ' ' + item?.owner?.last_name}
          </Text>
          <Text style={styles.typeStyle} numberOfLines={1}>
            {translations.POSTE_A}
            {item?.post_category?.name}
          </Text>
          <View style={styles.rowView}>
            <Text style={styles.dateStyles} numberOfLines={1}>
              {item?.post_output_time_to_show}
            </Text>
            {item?.status == POST_STATUS.DRAFT && (
              <Text style={[styles.dateStyles, styles.saveAsDraftText]}>
                {translations.SAVED_AS_DRAFT}
              </Text>
            )}
            {checkIsPostEdited() && (
              <Text
                style={[
                  styles.dateStyles,
                  styles.saveAsDraftText,
                  styles.edited,
                ]}>
                {translations.EDITED}
              </Text>
            )}
          </View>
        </View>
        {item?.status !== POST_STATUS.HIDDEN_BY_ADMIN &&
          (prvScreen == SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE &&
          Number(storeData.data.user.id) === Number(item?.owner?.id) ? null : (
            <TouchableOpacity
              style={styles.dots}
              onPress={() => setIsActionModalVisible(true)}>
              <AppImages.Drawer.threeDotIcon />
            </TouchableOpacity>
          ))}
        <ThreeDotsModal
          isOwnedByMe={
            Number(storeData.data.user.id) === Number(item?.owner?.id)
          }
          isModalVisible={isActionModalVisible}
          setIsModalVisible={setIsActionModalVisible}
          id={item?.id}
          postStatus={item.status}
          onDeletePost={onDeletePost}
          onHidePost={onHidePost}
          onEditPost={onEditPost}
          onPressBlockUser={onBlockUser}
        />
      </View>
      {getHiddenText()}
      <WarningModel
        msg={translations.DELETE_POST_MODAL_MSG}
        isModalVisible={isWarningMoadlVisible}
        setConfirm={hitDeleteApi}
        setIsModalVisible={setIsWarningMoadlVisible}
        headingStyle={styles.modalHeading}
      />
      <WarningModel
        msg={
          item?.status == POST_STATUS.HIDDEN_BY_OWNER
            ? translations.UNHIDE_CONVO_MSG
            : translations.HIDE_CONVO_MSG
        }
        isModalVisible={isHideConvoModal}
        setConfirm={hitHidePostAPi}
        setIsModalVisible={setIsHideConvoModal}
        headingStyle={styles.modalHeading}
      />
      <WarningModel
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_BLOCK_THIS_USER}
        isModalVisible={isBlockModalVisible}
        setConfirm={callBlockUserAPi}
        setIsModalVisible={setIsBlockModalVisible}
        headingStyle={styles.modalHeading}
      />
    </>
  );
};

export default Postheader;
