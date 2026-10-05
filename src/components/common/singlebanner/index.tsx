import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {styles} from './styles';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';
import {checkIsNull} from '../../utils/validations';

interface Props {
  heading?: string;
  subHeading?: string;
  onPress: () => void;
  image: string;
  subImage: string;
}

const SingleBanner = ({
  heading,
  subHeading,
  onPress,
  image,
  subImage,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage style={styles.bgImageStyle} source={image}>
        <View style={styles.body}>
          {checkIsNull(heading) ? (
            <Text style={styles.headingStyles}>{heading}</Text>
          ) : (
            subImage
          )}
          <Text style={styles.subheadingStyles} numberOfLines={2}>
            {subHeading}
          </Text>
        </View>
      </FastImage>
    </TouchableOpacity>
  );
};

export default SingleBanner;
