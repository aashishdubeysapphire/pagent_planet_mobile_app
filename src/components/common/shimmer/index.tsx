import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  width: number;
  height: number;
  borderRadius?: number;
  bottomSpace?: number;
  leftBottomSpace?: number;
}

const Shimmer = ({
  width,
  height,
  borderRadius = 12,
  bottomSpace = 0,
  leftBottomSpace = 0,
}: Props) => {
  const safeWidth = Number.isFinite(width) && width > 0 ? width : 1;

  const translateX = useSharedValue(-safeWidth);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(safeWidth * 2, {duration: 1200}),
      -1,
    );
  }, [safeWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          width: safeWidth,
          height,
          borderRadius,
          marginBottom: leftBottomSpace ? leftBottomSpace : bottomSpace,
          marginLeft: leftBottomSpace,
        },
      ]}>
      <Animated.View style={[styles.shimmer, animatedStyle]}>
        <LinearGradient
          colors={['#e0e0e0', '#c7c7c7', '#e0e0e0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1}}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Shimmer;
