import React, {useState} from 'react';
import {View} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical} from '../../utils/responsiveSize';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';
import {color} from '../../../assets/colorConstant';
import Shimmer from '../shimmer';
import ImagePlaceHolder from '../imageplaceholder';
import {emptyFunction} from '../../utils/helperFunction';

interface Props {
  imageUrl: string | undefined;
  width: number | undefined;
  height: number | undefined;
  borderRadius?: number;
  isCircle?: boolean;
  borderColor?: string;
  isProfileImage?: boolean;
  useWidth?: boolean;
}

/* A function that takes in the props and returns a view. */
const FastImageView = ({
  imageUrl,
  borderRadius = 0,
  width,
  height,
  isCircle,
  borderColor = color.S_GRAY_2,
  isProfileImage = false,
  useWidth = false,
  getCustomHeight = emptyFunction,
  resizeMode = FastImage.resizeMode.cover,
}: Props) => {
  const styles = useStyle();

  /* A state variable that is used to check if the image is found or not. */
  const [isImageFound, setImageFound] = useState(true);

  /* A state variable that is used to check if the image is loaded or not. */
  const [isImageLoaded, setImageLoaded] = useState(false);

  /**
   * OnLodingStart() is a function that sets the imageLoaded state to false.
   */
  const onLodingStart = () => {
    setImageLoaded(false);
  };

  /**
   * OnLoadEnd is a function that sets the imageLoaded state to true.
   */
  const onLoadEnd = () => {
    setImageLoaded(true);
  };

  /**
   * OnLoadError() is a function that sets the state of imageFound to false.
   */
  const onLoadError = () => {
    setImageFound(false);
  };
  const getImagePlaceholder = () => {
    if (isProfileImage) {
      return (
        <ImagePlaceHolder
          updateSize
          width={width}
          height={height}
          isProfileImage={isProfileImage}
        />
      );
    } else if (isCircle) {
      return (
        <ImagePlaceHolder updateSize width={width / 2} height={height / 2} />
      );
    } else {
      return <ImagePlaceHolder />;
    }
  };

  return (
    <View style={styles.imageSection}>
      {imageUrl === null ||
      !isImageFound ||
      imageUrl === '' ||
      imageUrl === undefined ? (
        <View
          style={{
            width: width,
            height: height,
            borderColor: color.S_GRAY_2,
            borderWidth: 1,
            marginTop: moderateScaleVertical(-1.5),
            backgroundColor: color.WHITE,
            borderRadius: moderateScaleVertical(borderRadius),
          }}>
          {getImagePlaceholder()}
        </View>
      ) : (
        <View>
          <FastImage
            style={{
              width: width,
              height: useWidth ? width : height,
              borderColor: borderColor,
              marginTop: moderateScaleVertical(-1.5),
              borderWidth: 1,
              borderRadius: moderateScaleVertical(borderRadius),
            }}
            source={{
              uri: imageUrl,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={resizeMode}
            onLoadStart={onLodingStart}
            onLoadEnd={onLoadEnd}
            onError={onLoadError}
            onProgress={e => {}}
            onLoad={e => {
              getCustomHeight(e?.nativeEvent);
            }}
          />
          {/* {!isImageLoaded && (
            <View style={styles.shimmer}>
              <Shimmer
                width={width}
                height={height}
                borderRadius={borderRadius}
                leftBottomSpace={0}
              />
            </View>
          )} */}
        </View>
      )}
    </View>
  );
};

export default FastImageView;
