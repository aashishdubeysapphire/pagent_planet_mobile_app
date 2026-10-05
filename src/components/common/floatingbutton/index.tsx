import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import useStyle from './styles';
import NextButton from '../../../components/common/nextbutton';
import LocalNotificationToast from '../../common/localnotificationtoast';
import AppImages from '../../../assets/images/AppImages';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  iconId?: any;
  isRotate?: boolean;
  localMsg?: string;
  type?: number;
  image?: any;
  isAnimatedButton?: boolean;
  toggleButton?: boolean;
}

/**
 * This function takes in a bunch of props, and returns a view with a button and a toast notification.
 * @param {Props}  - Props) => {
 * @returns A view with a button and a toast.
 */
const FloatingButton = ({
  onPress,
  iconId,
  isRotate = false,
  localMsg = '',
  type,
  image,
  isAnimatedButton = false,
  toggleButton = false,
}: Props) => {
  const styles = useStyle();
  const [progress] = useState(new Animated.Value(0));
  const [isDisplayCircle, setDisplayCircle] = useState(false);
  const [isCircleButtonLabelVisible, setCircleButtonLabelVisible] =
    useState(true);

  useEffect(() => {
    if (!toggleButton) {
      setCircleButtonLabelVisible(false);
    } else {
      setCircleButtonLabelVisible(true);
      setDisplayCircle(false);
    }
  }, [toggleButton]);

  useEffect(() => {
    if (!isDisplayCircle) {
      openButton();
    }
  }, [isDisplayCircle]);

  const openButton = () => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: 0.36,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // empty;
    });
  };

  useEffect(() => {
    if (!isCircleButtonLabelVisible) {
      closeButton();
    }
  }, [isCircleButtonLabelVisible]);

  const closeButton = () => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        setDisplayCircle(true);
      }, 200);
    });
  };

  const progressAnim = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['17%', '100%'],
  });

  const barWidth = {
    width: progressAnim,
  };

  return (
    <View style={styles.container}>
      {isAnimatedButton && !isDisplayCircle ? (
        <Animated.View style={[styles.textPlusContainer, barWidth]}>
          <TouchableOpacity onPress={onPress}>
            <View style={[styles.text1PlusContainer]}>
              <AppImages.Common.WhitePlusIcon />
              {isCircleButtonLabelVisible && (
                <Text numberOfLines={1} style={styles.text}>
                  {'   Crown Convo'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={isRotate ? styles.rotate : styles.none}>
          <NextButton iconKey={iconId} onPress={onPress} image={image} />
        </View>
      )}

      {localMsg.length > 0 && (
        <LocalNotificationToast message={localMsg} type={type} />
      )}
    </View>
  );
};

export default FloatingButton;
