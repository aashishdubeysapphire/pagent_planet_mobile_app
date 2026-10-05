import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';

interface Props {
  isVisible: boolean;
  child?: any;
  durationHeight?: number;
  durationFade?: number;
}

const OpenChildAnimation = ({
  isVisible,
  child,
  durationHeight = 1200,
  durationFade = 1000,
}: Props) => {
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [height, setHeight] = useState(new Animated.Value(0));
  const [maxHeight, setMaxHeight] = useState(0);

  const showContent = () => {
    const maxheight = height.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1000], // <-- value that larger than your content's height
    });
    setMaxHeight(maxheight);
    Animated.timing(height, {
      toValue: 1,
      duration: durationHeight,
      easing: Easing.bounce,
      useNativeDriver: false, // <-- neccessary
    }).start(() => {
      //
    });
    Animated.timing(opacity, {
      toValue: 1,
      duration: durationFade,
      easing: Easing.bounce,
      useNativeDriver: false, // <-- neccessary
    }).start();
  };
  useEffect(() => {
    if (!isVisible) {
      setOpacity(new Animated.Value(0));
      setHeight(new Animated.Value(0));
      setMaxHeight(0);
    } else {
      showContent();
    }
  }, [isVisible]);

  return (
    <Animated.View style={{opacity: opacity, maxHeight: maxHeight}}>
      {isVisible && <>{child}</>}
    </Animated.View>
  );
};

export default OpenChildAnimation;
