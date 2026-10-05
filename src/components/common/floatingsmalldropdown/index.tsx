import React from 'react';
import {Text, TouchableOpacity, TextInput, View} from 'react-native';
import {styles} from './styles';
import images from '../../../assets/images/AppImages';
import {color} from '../../../assets/colorConstant';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import useDynamicWidth from '../../utils/useDynamicWidth';
import { isIosDevice } from '../../utils/helperFunction';
interface Props {
  floatingText: string;
  isMandatory?: boolean;
  value: string | undefined;
  setText?: (param1: string) => void;
  maxLength?: number;
  hideRightIcon?: boolean;
  onFieldFocus?: () => void;
  errorMsg?: string;
  rightIcon?: React.ReactNode;
  opacity?: number;
  fontSize?: number;
  placeHolderBottomMargin?: number;
  maxHeightBox?: number;
  inputBottomMarginTop?: number;
  paddingHorizontalCustom?: number;
  titleLaftMargin?: number;
  leftIconWidth?: number;
}

/* A function that returns a component. */
const FloatingSmallDropdown = ({
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
  fontSize = !isIosDevice() ? 11 : 15,
  placeHolderBottomMargin = 6,
  inputBottomMarginTop = 0,
  leftIconWidth = 65,
  paddingHorizontalCustom = 12,
  titleLaftMargin = 13,
}: Props) => {
  const [isFieldActive, setFieldActive] = React.useState(false);
  const dW = useDynamicWidth();

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

  /* Updating the value of the text input. */
  const _onChangeText = (updatedValue: string) => {
    value = updatedValue;
    if (setText) {
      setText(updatedValue);
    }
  };

  return (
    <View style={{...styles.rootContainer, opacity: opacity}}>
      <TouchableOpacity
        onPress={() => {
          _handleFocus();
        }}>
        <View
          style={[
            isFieldActive
              ? styles.containerFocus
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
              styles.titleContainer,
              {
                marginBottom: moderateScaleVertical(placeHolderBottomMargin),
              },
            ]}>
            <Text style={[styles.titleStyles, {left: dW(titleLaftMargin)}]}>
              {value?.length!! > 0 ? floatingText + '' : ''}
              <Text style={styles.titleMandetory}>
                {value?.length!! > 0 ? (isMandatory ? '*' : '') : ''}
              </Text>
            </Text>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              value={value}
              style={[
                value?.length!! > 0
                  ? !isIosDevice()
                    ? styles.textInputAndroid
                    : styles.textInputIOS
                  : styles.textInputUnfocus,

                {
                  fontSize: dW(value?.length!! > 0 ? 12 : fontSize),
                  marginTop: dW(inputBottomMarginTop),
                  paddingHorizontal: dW(paddingHorizontalCustom),
                },
              ]}
              placeholder={isMandatory ? floatingText + '*' : floatingText}
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
          {!hideRightIcon ? (
            <View style={[styles.arrowContainer, {width: dW(leftIconWidth)}]}>
              {rightIcon}
            </View>
          ) : null}
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

export default FloatingSmallDropdown;
