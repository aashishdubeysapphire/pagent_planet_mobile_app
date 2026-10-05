import React from 'react';
import {
  TouchableOpacity,
  View,
  GestureResponderEvent,
  Image,
} from 'react-native';
import images from '../../../assets/images/AppImages';
import AppImages from '../../../assets/images/AppImages';
import {FLOATING_ICON} from '../../utils/enum';
import useStyle from './styles';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  isInactive?: boolean;
  iconKey?: any;
  image?: any;
}

/* A function that returns a TouchableOpacity component. */
const NextButton = ({onPress, iconKey, isInactive, image}: Props) => {
  const styles = useStyle();
  return (
    <TouchableOpacity onPress={onPress}>
      {!!image ? (
        image
      ) : iconKey === FLOATING_ICON.PLUS ? (
        <Image
          source={AppImages.Common.AddIconPink}
          style={styles.imageStyles}
        />
      ) : iconKey === FLOATING_ICON.DELETE ? (
        <View style={styles.container}>
          <Image
            source={AppImages.ProfileImage.Tpp_remove_image_icon}
            style={styles.imageStyles}
          />
        </View>
      ) : iconKey === FLOATING_ICON.CAMERA ? (
        <View style={styles.container}>
          <Image
            source={AppImages.Common.CameraIconPink}
            style={styles.imageStyles}
          />
        </View>
      ) : iconKey === FLOATING_ICON.UPLOAD ? (
        <AppImages.Common.UploadIcon />
      ) : iconKey === FLOATING_ICON.MENU ? (
        <Image
          source={AppImages.Common.MenuIconPink}
          style={styles.imageStyles}
        />
      ) : isInactive ? (
        <images.Common.NextInactiveIcon_ICON />
      ) : (
        <images.Common.NextIcon_ICON />
      )}
    </TouchableOpacity>
  );
};

export default NextButton;
