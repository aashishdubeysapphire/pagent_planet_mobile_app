import React from 'react';
import {Text, TouchableOpacity, TextInput, View} from 'react-native';
import useStyle from './styles';
import images from '../../../assets/images/AppImages';
import {color} from '../../../assets/colorConstant';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import useDynamicWidth from '../../utils/useDynamicWidth';
import {
  capitalizeFirstLowercaseRest,
  isIosDevice,
  removeMiddleSpaces,
} from '../../utils/helperFunction';
interface Props {
  floatingText: string;
  value: string | undefined;
  setText?: (param1: string) => void;
  maxLength?: number;
  isMandatory?: boolean;
  hideRightIcon?: boolean;
  errorMsg?: string;
  onFieldFocus?: () => void;
  rightIcon?: React.ReactNode;
  opacity?: number;
  maxHeightBox?: number;
  fontSize?: number;
  placeHolderBottomMargin?: number;
  inputBottomMarginTop?: number;
  leftIconWidth?: number;
  paddingHorizontalCustom?: number;
  titleLaftMargin?: number;
  laoutY?: any;
  customStyles?: any;
}

/* A function that returns a component. */
const FloatingDropdown = ({
  floatingText,
  value,
  maxLength = 100,
  errorMsg,
  isMandatory,
  setText,
  hideRightIcon,
  onFieldFocus = () => {},
  rightIcon = <images.Dashboard.HeaderDropdownIcon />,
  opacity = 1,
  maxHeightBox = 60,
  placeHolderBottomMargin = 6,
  leftIconWidth = 65,
  titleLaftMargin = 13,
  customStyles = {},
  laoutY,
}: Props) => {
  const [isFieldActive, setFieldActive] = React.useState(false);
  const dW = useDynamicWidth();
  const styles = useStyle();

  /* Updating the value of the text input. */
  const _onChangeText = (updatedValue: string) => {
    value = updatedValue;
    if (setText) {
      setText(updatedValue);
    }
  };

  /**
   * If the field is not active and the value is greater than 0, set the field to active and call the
   * onFieldFocus function.
   */
  const _handleFocus = () => {
    if (!isFieldActive && value?.length!! > 0) {
      setFieldActive(true);
    }
    onFieldFocus();
  };

  return (
    <View
      style={{...styles.rootContainer, ...customStyles, opacity: opacity}}
      key={floatingText}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        !!laoutY && laoutY(layout.y, removeMiddleSpaces(floatingText));
      }}>
      <TouchableOpacity
        onPress={() => {
          _handleFocus();
        }}>
        <View
          style={[
            isFieldActive
              ? styles.focusStyle
              : value?.length!! > 0
              ? styles.container
              : styles.containerEmpty,
            {
              maxHeight: moderateScaleVertical(maxHeightBox),
              minHeight: moderateScaleVertical(maxHeightBox),
            },
          ]}>
          <View
            style={[
              styles.titleContainerStyle,
              {
                marginBottom: moderateScaleVertical(placeHolderBottomMargin),
              },
            ]}>
            <Text style={[styles.titleStyles, {left: dW(titleLaftMargin)}]}>
              {value?.length!! > 0 ? floatingText + '' : ''}
              <Text style={styles.titleMandetoryStyles}>
                {value?.length!! > 0 ? (isMandatory ? '*' : '') : ''}
              </Text>
            </Text>
          </View>

          <View style={styles.inputRow} pointerEvents="none">
            <TextInput
              value={value}
              style={[
                value?.length!! > 0
                  ? !isIosDevice()
                    ? styles.textInput
                    : styles.textInputIOS
                  : styles.textInputUnfocus,
              ]}
              placeholder={
                isMandatory
                  ? capitalizeFirstLowercaseRest(floatingText) + '*'
                  : capitalizeFirstLowercaseRest(floatingText)
              }
              blurOnSubmit={true}
              selectionColor={color.WHITE}
              onChangeText={_onChangeText}
              focusable={false}
              editable={false}
              placeholderTextColor={color.S_GRAY_4}
              selection={{start: 0}}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={maxLength}
            />
          </View>
          {!hideRightIcon && (
            <View style={[styles.arrowContainer, {width: dW(leftIconWidth)}]}>
              {rightIcon}
            </View>
          )}
        </View>
      </TouchableOpacity>
      {errorMsg !== null && errorMsg?.length > 0 ? (
        <View style={styles.row}>
          <images.Common.Alert_ICON />
          <Text style={styles.error}> {errorMsg} </Text>
        </View>
      ) : (
        <Text style={styles.noError} />
      )}
    </View>
  );
};

export default FloatingDropdown;
