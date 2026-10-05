import React, {useEffect, useState} from 'react';
import {
  Text,
  KeyboardTypeOptions,
  TextInput,
  View,
} from 'react-native';
import useStyle from './styles';
import images from '../../../assets/images/AppImages';
import {color} from '../../../assets/colorConstant';
import {checkIsNull} from '../../utils/validations';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import {isIosDevice, removeMiddleSpaces} from '../../utils/helperFunction';

interface Props {
  floatingText: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  setText: (param1: string) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength: number;
  isMandatory: boolean;
  focus: boolean;
  onEndEditing: () => void;
  errorMsg: string;
  nextField: string;
  setRef: () => void;
  onDoneClick: () => void;
  autoCapitalize: string;
  limit: number;
  rest: any;
  isMoreThan250: boolean;
}

const FloatingBigInput = ({
  floatingText,
  value,
  keyboardType,
  returnKeyType,
  maxLength,
  onEndEditing,
  errorMsg,
  isMandatory,
  nextField,
  setRef,
  setText,
  onDoneClick,
  limit = 250,
  autoCapitalize = 'words',
  showLength = true,
  isMoreThan250 = false,
  laoutY,
  ...rest
}: Props) => {
  const [isFieldActive, setFieldActive] = React.useState(false);
  const [focus, setIsFocus] = React.useState(false);
  const styles = useStyle();

  useEffect(() => {
    if (focus) {
      _handleFocus();
    }
  }, [focus]);

  /**
   * _onChangeText is a function that takes an argument called updatedValue
   */
  const _onChangeText = updatedValue => {
    value = updatedValue;
    if (setText) {
      setText(updatedValue);
    }
  };

  /**
   * _handleFocus() is a function that sets the state of isFocus to true, and if onEndEditing is not
   * null, it will call onEndEditing(). If isFieldActive is false, it will set the state of
   * isFieldActive to true.
   */
  const _handleFocus = () => {
    setIsFocus(true);
    if (onEndEditing !== undefined && onEndEditing !== null) {
      onEndEditing();
    }
    if (!isFieldActive) {
      setFieldActive(true);
    }
    setselection(null);
  };

  /**
   * _handleBlur() is a function that sets isFocus to false and if isFieldActive is true and value is
   * false, then setFieldActive to false.
   */
  const _handleBlur = () => {
    setIsFocus(false);
    if (isFieldActive && !value) {
      setFieldActive(false);
    }
  };

  /**
   * _onSubmitEditing() is a function that calls the nextField.focus() function if the returnKeyType is
   * 'next' or calls the onDoneClick() function if the returnKeyType is 'done' and then calls the
   * Keyboard.dismiss() function.
   */
  const _onSubmitEditing = () => {
    if (returnKeyType === 'next') {
      nextField.focus();
    } else if (returnKeyType === 'done') {
      if (checkIsNull(onDoneClick)) {
        onDoneClick();
      }
    }
  };
  const [selection, setselection] = useState({start: 0});
  return (
    <View
      style={styles.rootContainer}
      key={floatingText}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        !!laoutY && laoutY(layout.y, removeMiddleSpaces(floatingText));
      }}>
      <View
        style={
          focus && isFieldActive
            ? {
                ...styles.containerFocus,
                minHeight: isMoreThan250
                  ? moderateScaleVertical(160)
                  : moderateScaleVertical(120),
                maxHeight: isMoreThan250
                  ? moderateScaleVertical(160)
                  : moderateScaleVertical(120),
              }
            : value?.length!! > 0
            ? {
                ...styles.container,
                minHeight: isMoreThan250
                  ? moderateScaleVertical(160)
                  : moderateScaleVertical(120),
                maxHeight: isMoreThan250
                  ? moderateScaleVertical(160)
                  : moderateScaleVertical(120),
              }
            : {
                ...styles.containerEmpty,
                height: isMoreThan250
                  ? moderateScaleVertical(160)
                  : moderateScaleVertical(120),
              }
        }>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyles}>
            {focus || value?.length!! > 0 ? floatingText + '' : ''}
            <Text style={styles.titleMandetoryStyles}>
              {focus || value?.length!! > 0 ? (isMandatory ? '*' : '') : ''}
            </Text>
          </Text>
          {showLength && (value?.length!! > 0 || focus) ? (
            <Text style={styles.lengthText}>{value?.length}/250</Text>
          ) : null}
        </View>

        <TextInput
          value={value}
          style={[
            focus || value?.length!! > 0
              ?  !isIosDevice()
                ? {
                    ...styles.textInput,
                    maxHeight: isMoreThan250
                      ? moderateScaleVertical(120)
                      : moderateScaleVertical(95),
                  }
                : {
                    ...styles.textInputIOS,
                    maxHeight: isMoreThan250
                      ? moderateScaleVertical(120)
                      : moderateScaleVertical(isIosDevice() ? 75 : 95),
                  }
              : {
                  ...styles.textInputUnfocus,
                  maxHeight: isMoreThan250
                    ? moderateScaleVertical(120)
                    : moderateScaleVertical(95),
                },
          ]}
          placeholder={
            isMandatory && !focus ? floatingText + '*' : floatingText
          }
          onFocus={_handleFocus}
          onBlur={_handleBlur}
          ref={ref => {
            if (setRef) {
              setRef(ref);
            }
          }}
          onSubmitEditing={_onSubmitEditing}
          autoFocus={focus}
          blurOnSubmit={false}
          placeholderTextColor={focus ? color.TRANSPARNT : color.S_GRAY_4}
          selectionColor={color.P_PINK}
          onChangeText={_onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          maxLength={maxLength}
          numberOfLines={4}
          returnKeyType={returnKeyType}
          selection={selection}
          {...rest}
        />
      </View>
      {errorMsg?.length!! > 0 ? (
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

export default FloatingBigInput;
