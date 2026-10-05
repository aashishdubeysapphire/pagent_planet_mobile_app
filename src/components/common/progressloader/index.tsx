import React from 'react';
import {View, Text} from 'react-native';
import useStyle from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import {color} from '../../../assets/colorConstant';
import * as Progress from 'react-native-progress';
import translations from '../../../assets/translations';

interface Props {
  imageLoadedCounter: number;
  totalToUpload: number;
  progress: number;
}

/**
 * ProgressLoader is a function that takes in an object with three properties: imageLoadedCounter,
 * progress, and totalToUpload. It returns a View component with a Spinner component inside of it. The
 * Spinner component has a customIndicator property that returns a View component with a View component
 * and a Progress.Pie component inside of it. The Progress.Pie component has a progress property that
 * is equal to the progress property of the ProgressLoader function.
 * @param {Props}  - Props = {
 * @returns A component that is a view with a spinner.
 */
const ProgressLoader = ({
  imageLoadedCounter,
  progress,
  totalToUpload,
}: Props) => {
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <Spinner
        animation={'fade'}
        visible={true}
        overlayColor={color.OPACITY}
        customIndicator={
          <View style={styles.loaderRoot}>
            <View style={styles.borderButtonBg} />
            <View style={styles.taj}>
              <Progress.Pie
                progress={progress}
                size={35}
                unfilledColor={color.WHITE}
                color={color.P_PINK}
              />

              <Text style={styles.counterText}>{translations.UPLOADING}</Text>
              <Text style={styles.counterText}>
                {imageLoadedCounter + translations.OUT_OF + totalToUpload}
              </Text>
            </View>
          </View>
        }
        color={color.P_PINK}
      />
    </View>
  );
};

export default ProgressLoader;
