/* The Pageant Planet Mobile App.
 * Copyright (C) 2022 The Pageant Planet Mobile App
 *
 * This file is licensed under the BSD 3-Clause (the "License").
 * You may not use this file except in compliance with the License.
 */
// A Component Used for creating custom textInput, it is fully Customisable

import React, {useEffect} from 'react';
import {
  Text,
  Keyboard,
  KeyboardTypeOptions,
  TextInput,
  View,
} from 'react-native';
import useStyle from './styles';
import images from '../../../assets/images/AppImages';
import {color} from '../../../assets/colorConstant';
import {checkIsNull} from '../../utils/validations';
import { isIosDevice } from '../../utils/helperFunction';

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
}

const CustomInput = ({
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
  ...rest
}: Props) => {
  const [isFieldActive, setFieldActive] = React.useState(false);
  const [focus, setIsFocus] = React.useState(false);
  const styles = useStyle();

  /**
   * _onChangeText is a function that takes an argument called updatedValue and returns a function that
   *
   */
  const _onChangeText = updatedValue => {
    value = updatedValue;
    if (setText) {
      setText(updatedValue);
    }
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

  useEffect(() => {
    if (focus) {
      _handleFocus();
    }
  }, [focus]);

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
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View
        style={
          focus && isFieldActive
            ? styles.containerFocus
            : value?.length!! > 0
            ? styles.container
            : styles.containerEmpty
        }>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyles}>
            {focus || value?.length!! > 0 ? floatingText + '' : ''}
            <Text style={styles.titleMandetoryStyles}>
              {focus || value?.length!! > 0 ? (isMandatory ? '*' : '') : ''}
            </Text>
          </Text>
          {showLength && (value?.length!! > 0 || focus) ? (
            <Text style={styles.textLength}>{value?.length}/250</Text>
          ) : null}
        </View>

        <TextInput
          value={value}
          style={[
            focus || value?.length!! > 0
              ?  !isIosDevice
                ? styles.textInput
                : styles.textInputIOS
              : styles.textInputUnfocus,
          ]}
          onFocus={_handleFocus}
          onBlur={_handleBlur}
          placeholder={
            isMandatory && !focus ? floatingText + '*' : floatingText
          }
          ref={ref => {
            if (setRef) {
              setRef(ref);
            }
          }}
          onSubmitEditing={_onSubmitEditing}
          autoFocus={focus}
          placeholderTextColor={focus ? color.TRANSPARNT : color.S_GRAY_4}
          selectionColor={color.P_PINK}
          onChangeText={_onChangeText}
          blurOnSubmit={false}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          numberOfLines={4}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
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

export default CustomInput;
