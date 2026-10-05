import React from 'react';
import images from '../../../assets/images/AppImages';
import {View} from 'react-native';
import useStyle from './styles';

interface Props {
  width?: number;
  height?: number;
  updateSize?: boolean;
  isProfileImage?: boolean;
}

/* A function that returns a view with a image. */
const ImagePlaceHolder = ({
  width,
  height,
  updateSize,
  isProfileImage = false,
}: Props) => {
  const styles = useStyle();
  const getImage = () => {
    if (isProfileImage) {
      return <images.Common.smallUserProfile width={width} height={height} />;
    } else if (updateSize) {
      return <images.Common.NoImageFound_ICON width={width} height={height} />;
    } else {
      return <images.Common.NoImageFound_ICON />;
    }
  };
  return <View style={styles.continer}>{getImage()}</View>;
};

export default ImagePlaceHolder;
