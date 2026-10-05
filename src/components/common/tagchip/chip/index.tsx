import React, {useContext, useState} from 'react';
import {View, Animated, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {Tag} from '../../../../services/models/gallery/tag';
import {UserContext} from '../../../../store/userStore';
import {useNavigation} from '@react-navigation/core';
import {useSetScreenRefresh} from '../../../../store/useAppStore';
import {
  PARAM_VALUE,
  PROFILE_STATUS,
  REFESH_SCREEN,
  ROLES,
  SLUG,
  TAG_TYPE,
} from '../../../utils/enum';
import translations from '../../../../assets/translations';
import {toast, toastType} from '../../commonalert';
import {getSlugByRoleId, getTagTypeLable} from '../../../utils/helperFunction';
import {SCREEN} from '../../../../root/screenname';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import FastImageView from '../../fastimageview';
import AppImages from '../../../../assets/images/AppImages';

interface Props {
  item: Tag;
  enableDelteTag?: boolean;
  isPublicProfileView?: boolean;
  onDeleteActive: (param1: number | undefined, index: number) => void;
  index: number;
}

/* A function that takes in a parameter of type Props. */
const Chip = ({
  item,
  enableDelteTag,
  onDeleteActive,
  isPublicProfileView,
  index,
}: Props) => {
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const [fadeAnim] = useState(new Animated.Value(1));
  const [isClickEnable, setClickEnable] = useState(true);
  /**
   * It deletes a tag from the list of tags.
   * @param {number} id - The id of the tag that was clicked.
   */
  const deleteTags = (id: number | undefined) => {
    onDeleteActive(id, index);
  };

  const moveToPublicProfile = (tagItem: any) => {
    if (
      tagItem?.status !== undefined &&
      tagItem?.status === PROFILE_STATUS.ACTIVE
    ) {
      if (
        tagItem?.tagName === TAG_TYPE.EVENT_YEAR ||
        tagItem?.tagName === TAG_TYPE.AGE_DIVISION ||
        tagItem?.tagName === TAG_TYPE.BEST_DESCIBE_THE_IMAGE ||
        tagItem?.tagName === TAG_TYPE.BEST_DESCIBE_THE_IMAGE_ ||
        !isClickEnable
      ) {
        return;
      }
      setClickEnable(false);
      setTimeout(() => {
        setClickEnable(true);
      }, 2000);
      if (
        tagItem?.is_minor !== undefined &&
        tagItem?.is_minor !== translations.NO_SMALL
      ) {
        toast(
          translations.YOU_CAN_NOT_SEE_MINOR_PRODILE,
          toastType.SUCESS_TOAST,
        );
        return;
      }

      if (
        tagItem?.role_id !== undefined &&
        getSlugByRoleId(tagItem?.role_id) !== SLUG.PAGEANT
      ) {
        setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EXPERT);
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          profileId: tagItem?.id,
          roleId:
            tagItem.owner_id === ROLES.ADMIN_ID
              ? tagItem?.id
              : tagItem.owner_id,
          name: tagItem?.name,
          category: tagItem?.role_id,
          key: new Date().getMilliseconds(),
          selectedTab: getTagTypeLable(tagItem?.role_id),
        });
      } else if (
        tagItem?.tag_profile_id !== undefined &&
        tagItem?.tagName !== ROLES.CONTESTANT
      ) {
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: tagItem?.tag_profile_id,
          name: tagItem?.name,
        });
      }
    } else if (tagItem?.status !== undefined) {
      toast(translations.NO_PROFILE_DETAIL, toastType.ERROR_TOAST);
    }
  };

  const isDeleteActive = (id: number | undefined) => {
    return (
      (enableDelteTag && isPublicProfileView === undefined) ||
      (enableDelteTag &&
        isPublicProfileView !== undefined &&
        id === storeData.data?.user.id)
    );
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      <TouchableOpacity
        activeOpacity={item.status === PARAM_VALUE.ACTIVE ? 0.4 : 1}
        style={
          isDeleteActive(item.owner_id)
            ? item.status === PARAM_VALUE.ACTIVE || item.status === undefined
              ? styles.chipClickableContainer
              : styles.inactiveClickable
            : item.status === PARAM_VALUE.ACTIVE || item.status === undefined
            ? styles.whiteClickable
            : styles.inactive
        }
        onPress={() => {
          moveToPublicProfile(item);
        }}>
        {item.localImagePath !== undefined && (
          <View style={styles.circleImageContainer}>
            <FastImageView
              width={moderateScaleVertical(34)}
              height={moderateScaleVertical(34)}
              borderRadius={moderateScaleVertical(34)}
              imageUrl={item.localImagePath}
              isCircle
            />
          </View>
        )}

        <Text
          numberOfLines={1}
          style={
            item.localImagePath !== undefined
              ? styles.imageAvaialbeName
              : styles.awardName
          }>
          {item?.name === undefined ? item + '' : item?.name}
        </Text>
        {isDeleteActive(item.owner_id) && (
          <TouchableOpacity
            onPress={() => {
              deleteTags(item.tagId);
            }}>
            <View style={styles.uploadImageInnerVIew}>
              <AppImages.CreateContestentProfile.tpp_cross_small_icon
                width={16}
                height={16}
              />
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Chip;
