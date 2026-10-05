import React from 'react';
import {
  TouchableOpacity,
  Animated,
  Text,
  GestureResponderEvent,
} from 'react-native';
import useStyle from './styles';
import {hapticFeedBack} from '../../utils/helperFunction';

interface Props {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  border?: boolean;
  inActiveBorder?: boolean;
  inactive?: boolean;
  textStyle?: any;
  deleteModal?: boolean;
  smallHeight?: boolean;
  upload?: boolean;
  enableHaptic?: boolean;
}
/**
 * Const CustomButton
 *
 * @param {Props}  - Props) => {
 * @returns A TouchableOpacity component with a Text component inside of it.
 */

const CustomButton = ({
  label,
  border,
  inactive,
  inActiveBorder,
  textStyle,
  deleteModal,
  onPress,
  smallHeight,
  upload,
  enableHaptic = false,
}: Props) => {
  /* A function that returns an object. */
  const styles = useStyle();
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.97];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    enableHaptic && hapticFeedBack();
  };
  /**
   * If the button is inactive, return false. If the button is active, run the onPress function.
   * @returns The function onButtonPress is being returned.
   */
  const onButtonPress = () => {
    if (!inactive) {
      return false;
    } else {
      setTimeout(() => {
        onPress();
      }, 200);
    }
  };
  return (
    <Animated.View
      style={[
        smallHeight && !border
          ? styles.smallButonBg
          : upload
          ? styles.uploadButonBg
          : inactive && deleteModal && inActiveBorder
          ? styles.borderDelete
          : border
          ? inActiveBorder
            ? styles.inActiveBorderButtonBg
            : deleteModal
            ? styles.borderEdit
            : styles.borderButtonBg
          : !inactive
          ? styles.inactiveButtonBg
          : styles.buttonBg,
        {transform: [{scale}]},
      ]}>
      <TouchableOpacity
        style={[
          {width: '100%', alignItems: 'center', justifyContent: 'center'},
        ]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onButtonPress}>
        <Text
          style={[
            border
              ? inActiveBorder
                ? styles.inActiveBorderButtonText
                : textStyle
              : smallHeight || upload
              ? styles.smallButtonText
              : styles.buttonText,
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomButton;
