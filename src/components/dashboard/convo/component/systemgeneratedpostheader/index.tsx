import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {styles} from '../postheader/styles';
import FastImageView from '../../../../common/fastimageview';
import {moderateScale} from '../../../../utils/responsiveSize';
import AppImages from '../../../../../assets/images/AppImages';
import ThreeDotsModal from '../threedotsmodal';
import {ConvoListItem} from '../../../../../services/models/convo/convoListing';
import {
  checkIsConnected,
  emptyFunction,
} from '../../../../utils/helperFunction';
import translations from '../../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {
  DIRECTORY_ID,
  POST_STATUS,
  SystemGeneratedPostTypes,
} from '../../../../utils/enum';
import {systemGeneratedFunctions} from './systemgeneratedpostFunc';
import WarningModel from '../../../../common/warningmodel';
import {BLOCK_USER} from '../../../../../services/endpoints';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {UserContext} from '../../../../../store/userStore';
import {toast, toastType} from '../../../../common/commonalert';

interface Props {
  item: ConvoListItem;
  refetch: any;
  prvScreen: string;
}

const SystemGeneratedPostHeader = ({item, refetch, prvScreen}: Props) => {
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const navigation = useNavigation();
  const {UiView, onImageClickNav} = systemGeneratedFunctions(item, navigation);
  const {storeData} = useContext(UserContext);

  const {mutateAsync: hitBlockUserApi} = useCgMutation<Base>({
    key: BLOCK_USER,
    url: BLOCK_USER,
    body: {
      user_id: item?.user_id,
    },
    offSuccessToast: false,
    disableLoader: true,
  });

  const callBlockUserAPi = async () => {
    if (checkIsConnected()) {
      const res = await hitBlockUserApi();
      if (res.success) {
        await refetch();
      }
    }
  };

  const getHiddenText = () => {
    if (item?.status == POST_STATUS.HIDDEN_BY_ADMIN) {
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
    } else if (item?.status == POST_STATUS.HIDDEN_BY_OWNER) {
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
    } else {
      return null;
    }
  };

  const getImageUrl = () => {
    if (
      item?.post_category?.slug ==
      SystemGeneratedPostTypes.NAME_listed_PRODUCT_NAME_for_sale
    ) {
      if (
        item?.crownConvoLinkings?.productDetail?.role_id == DIRECTORY_ID.PAGEANT
      ) {
        return item?.product_profile_data?.main_image_full_url;
      } else {
        return item?.thread_owner_image;
      }
    }
    if (
      item?.post_category.slug ==
        SystemGeneratedPostTypes.EVENT_NAME_updated_their_result ||
      item?.post_category.slug == SystemGeneratedPostTypes.EVENT_won_award_title
    ) {
      return item?.crownConvoLinkings?.eventImageUrl;
    } else {
      return item?.thread_owner_image;
    }
  };

  const onBlockUser = () => {
    setIsActionModalVisible(false);
    if (Number(storeData.data.user.id) === Number(item?.owner?.id)) {
      toast(
        translations.YOU_CANNOT_BLOCK_YOUR_OWN_PROFILE,
        toastType?.ERROR_TOAST,
      );
    } else {
      setTimeout(() => {
        setIsBlockModalVisible(true);
      }, 400);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.imageView}
          onPress={onImageClickNav}
          activeOpacity={0.6}>
          <FastImageView
            width={moderateScale(60)}
            height={moderateScale(60)}
            borderRadius={100}
            imageUrl={getImageUrl()}
            isCircle
            isProfileImage
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          {UiView()}
          <View style={styles.rowView}>
            <Text style={styles.dateStyles} numberOfLines={1}>
              {item?.post_output_time_to_show}
            </Text>
          </View>
        </View>
        {item?.status !== POST_STATUS.HIDDEN_BY_ADMIN && (
          <TouchableOpacity
            style={styles.dots}
            onPress={() => {
              setIsActionModalVisible(true);
            }}>
            <AppImages.Drawer.threeDotIcon />
          </TouchableOpacity>
        )}
        <ThreeDotsModal
          isOwnedByMe={false}
          isModalVisible={isActionModalVisible}
          setIsModalVisible={setIsActionModalVisible}
          id={item?.id}
          postStatus={item?.status}
          onDeletePost={emptyFunction}
          onHidePost={emptyFunction}
          onEditPost={emptyFunction}
          onPressBlockUser={onBlockUser}
        />
        <WarningModel
          msg={translations.ARE_YOU_SURE_YOU_WANT_TO_BLOCK_THIS_USER}
          isModalVisible={isBlockModalVisible}
          setConfirm={callBlockUserAPi}
          setIsModalVisible={setIsBlockModalVisible}
          headingStyle={styles.modalHeading}
        />
      </View>
      {getHiddenText()}
    </>
  );
};

export default SystemGeneratedPostHeader;
