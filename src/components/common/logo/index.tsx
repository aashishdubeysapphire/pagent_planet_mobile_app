import React from 'react';
import images from '../../../assets/images/AppImages';

interface Props {
  width?: number;
  height?: number;
}

/* A React component that is using the AppLogo component from the images.ts file. */
const Logo = ({width, height}: Props) => {
  return <images.AppLogo.AppLogo.AppLogo width={width} height={height} />;
};

export default Logo;
