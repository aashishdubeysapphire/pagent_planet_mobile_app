import {useWindowDimensions} from 'react-native';

const useDynamicWidth = () => {
  const {width} = useWindowDimensions();
  const dW = (size: number) => {
    const multiplier = width / 350;
    return size * multiplier;
  };

  return dW;
};

export default useDynamicWidth;
