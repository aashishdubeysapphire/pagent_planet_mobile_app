import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import useStyle from './styles';
import {
  useSetImagePasteToast,
  useSetRearrangeAlbumToastToast,
} from '../../../store/useAppStore';
import AppImages from '../../../assets/images/AppImages';

interface Props {
  message: string;
  type: number | undefined;
}
export enum MESSAGE_TYPE {
  MOVE_EXTRA_ALBUM_MSG = 1,
  REARRANGE_ALBUM = 2,
}

/**
 * It's a React component that renders a message and a close button.
 * @param {Props}  - Props = {
 * @returns A function that returns a component.
 */
const LocalNotificationToast = ({message, type}: Props) => {
  const styles = useStyle();
  const setMoveImageToast = useSetImagePasteToast();
  const setRearrangeAlbumToast = useSetRearrangeAlbumToastToast();
  const markAsSeen = () => {
    if (type === MESSAGE_TYPE.MOVE_EXTRA_ALBUM_MSG) {
      setMoveImageToast(1);
    } else if (type === MESSAGE_TYPE.REARRANGE_ALBUM) {
      setRearrangeAlbumToast(1);
    }
  };
  return (
    <View style={styles.pasteMsgContainer}>
      <AppImages.Common.TPP_INFO_ICON />
      <Text style={styles.title}>{message}</Text>
      <TouchableOpacity onPress={markAsSeen}>
        <AppImages.CreateContestentProfile.tpp_cross_small_icon
          width={16}
          height={16}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LocalNotificationToast;
