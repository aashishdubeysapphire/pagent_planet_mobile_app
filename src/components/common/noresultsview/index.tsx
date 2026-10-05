import React from 'react';
import {Text, View} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import {styles} from './styles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../utils/responsiveSize';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';

interface Props {
  text: string;
  review_count?: number;
  size?: number;
  fontSize?: number;
}

/**
 * This function is used to display a message when there is no data to display
 * @param {Props}  - Props
 * @returns A view with a view with an image and a text
 */
const NoRecordView = ({text}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageArea}>
        <FastImage
          style={{
            width: width - moderateScale(32),
            height: moderateScaleVertical(110),
            borderRadius: moderateScale(16),
          }}
          source={AppImages.PAGEANT_DETAIL.NO_RESULT_BG}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textArea}>
          <AppImages.Common.blackAlert />
          <Text style={styles.textStyle}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default NoRecordView;
