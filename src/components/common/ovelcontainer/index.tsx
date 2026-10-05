import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {color} from '../../../assets/colorConstant';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import {styles} from './styles';

interface Props {
  lable: string;
  conditionVar: boolean;
  showTick: boolean;
  onPress: any;
  isActive: boolean;
  clickable: boolean;
}

/**
 * This function is used to render a clickable text with a dropdown arrow
 */
const OvelContainer = ({
  lable = '',
  onPress = () => {},
  conditionVar = false,
  showTick = false,
  isActive = true,
  clickable = false,
}: Props) => {
  const onTouch = () => {
    if (isActive || clickable) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.subHeadingContainer,
        borderColor: conditionVar ? color.P_PINK : color.S_GRAY_2,
        opacity: isActive ? 1 : 0.5,
      }}
      activeOpacity={isActive ? 1 : 0.5}
      onPress={onTouch}>
      <Text
        style={{
          ...styles.subHeading,
          color: conditionVar ? color.P_PINK : color.INPUT_TEXT,
        }}>
        {lable}
      </Text>

      {showTick ? (
        <>
          {conditionVar ? (
            <AppImages.Common.PinkTickIcon
              with={moderateScale(20)}
              height={moderateScaleVertical(20)}
              style={{
                ...styles.arrowIcon,
              }}
            />
          ) : (
            <></>
          )}
        </>
      ) : !conditionVar ? (
        <AppImages.Common.tpp_dropdown_thick
          with={moderateScale(14)}
          height={moderateScaleVertical(14)}
          style={{
            ...styles.arrowIcon,
          }}
        />
      ) : (
        <AppImages.EditProfile.Tpp_dropdown_pink
          with={moderateScale(14)}
          height={moderateScaleVertical(14)}
          style={{
            ...styles.arrowIcon,
            transform: [{rotate: '360deg'}],
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default OvelContainer;
