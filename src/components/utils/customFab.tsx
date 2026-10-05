import React, {useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {styles} from './fabStyles';

const {width} = Dimensions.get('window');
const isSmallDevice = width <= 320;

const HEIGHT = 56;
const BORDER_RADIUS = 28;
const MIN_EXTENDED_WIDTH = isSmallDevice ? 140 : 180;
const EXPAND_DURATION = 380;
const COLLAPSE_DURATION = 320;

type CustomFABProps = {
  visible?: boolean;
  extended?: boolean;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  labelStyle?: StyleProp<TextStyle>;
};

const CustomFAB = ({
  visible = true,
  extended = true,
  label,
  icon,
  onPress,
  style,
  backgroundColor = '#FF4081',
  labelStyle,
}: CustomFABProps) => {
  const [labelWidth, setLabelWidth] = useState(0);

  const extendedProgress = useSharedValue(extended ? 1 : 0);
  const visibleProgress = useSharedValue(visible ? 1 : 0);

  const expandedWidth = useMemo(() => {
    const calculatedWidth = Math.ceil(labelWidth) + HEIGHT + BORDER_RADIUS;
    return Math.max(MIN_EXTENDED_WIDTH, calculatedWidth);
  }, [labelWidth]);

  const onLabelLayout = (event: LayoutChangeEvent) => {
    const nextWidth = Math.ceil(event.nativeEvent.layout.width);
    if (nextWidth > 0 && nextWidth !== labelWidth) {
      setLabelWidth(nextWidth);
    }
  };

  useEffect(() => {
    cancelAnimation(extendedProgress);
    extendedProgress.value = withTiming(extended ? 1 : 0, {
      duration: extended ? EXPAND_DURATION : COLLAPSE_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [extended, extendedProgress]);

  useEffect(() => {
    visibleProgress.value = withTiming(visible ? 1 : 0, {
      duration: visible ? 200 : 150,
      easing: Easing.out(Easing.cubic),
    });
  }, [visible, visibleProgress]);

  const wrapperAnimatedStyle = useAnimatedStyle(() => ({
    opacity: visibleProgress.value,
    transform: [{scale: interpolate(visibleProgress.value, [0, 1], [0.9, 1])}],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    width: interpolate(extendedProgress.value, [0, 1], [HEIGHT, expandedWidth]),
  }));

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    opacity: extendedProgress.value,
    transform: [
      {
        translateX: interpolate(extendedProgress.value, [0, 1], [-10, 0]),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.wrapper, wrapperAnimatedStyle, style]}>
      <Text
        numberOfLines={1}
        onLayout={onLabelLayout}
        style={[styles.label, styles.measureLabel, labelStyle]}>
        {label}
      </Text>
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <Animated.View
          style={[
            styles.container,
            containerAnimatedStyle,
            {
              backgroundColor,
            },
          ]}>
          {/* ICON LEFT */}
          <View style={styles.icon}>{icon}</View>

          {/* TEXT RIGHT */}
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.label,
              labelStyle,
              labelAnimatedStyle,
            ]}>
            {label}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomFAB;
