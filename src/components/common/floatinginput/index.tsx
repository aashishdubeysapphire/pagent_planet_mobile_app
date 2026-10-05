import React, {useEffect} from 'react';
import {
  Text,
  Keyboard,
  KeyboardTypeOptions,
  TextInput,
  View,
  ReturnKeyTypeOptions,
} from 'react-native';
import images from '../../../assets/images/AppImages';
import {Pressable} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {checkIsNull} from '../../utils/validations';
import {
  capitalizeFirstLowercaseRest,
  emptyFunction,
  isIosDevice,
  removeMiddleSpaces,
} from '../../utils/helperFunction';
import useStyle from './styles';

interface Props {
  floatingText: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  setText: (param1: string) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  password?: boolean;
  isPassword?: boolean;
  onPasswordToglle?: (param: boolean) => void;
  isMandatory?: boolean;
  focus?: boolean;
  onEndEditing?: () => void;
  errorMsg?: string;
  nextField?: string;
  setRef?: (ref: any) => void;
  onDoneClick?: () => void;
  lengthCheck?: any;
  autoCapitalize?: string;
  isEditable?: boolean;
  rest?: any;
  customStyles?: any;
  laoutY?: any;
  onCustomFocus ?: () => void,
  onBlur ?: () => void,
  image ?: boolean,
}

const FloatingInput = ({
  floatingText,
  value,
  keyboardType,
  returnKeyType,
  maxLength = 100,
  onEndEditing,
  password,
  isPassword,
  errorMsg,
  isMandatory,
  nextField,
  setRef,
  setText,
  onDoneClick = () => {
    Keyboard.dismiss();
  },
  onPasswordToglle,
  lengthCheck = false,
  isEditable = true,
  autoCapitalize = 'words',
  onCustomFocus = emptyFunction,
  customStyles = {},
  onBlur,
  image,
  laoutY = emptyFunction,
  ...rest
}: Props) => {
  const [isActive, setFieldActive] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  const styles = useStyle();
  /* A react hook. It is used to run a function when a component is mounted. */
  useEffect(() => {
    if (isFocus) {
      _handleFocus();
    }
  }, [isFocus]);

  /**
   * _onChangeText is a function that takes an argument called updatedValue.
   * The function then sets the value of the variable value to the value of the argument updatedValue.
   * If the variable setText is true, then the function sets the value of the variable setText to the
   * value of the argument updatedValue.
   */
  const _onChangeText = updatedValue => {
    value = updatedValue;
    if (setText) {
      setText(updatedValue);
    }
  };

  /**
   * _handleFocus() is a function that sets the state of isFocus to true, and if onEndEditing is not
   * null, it will call onEndEditing(). If isFieldActive is false, it will set the state of isFieldActive
   * to true.
   */
  const _handleFocus = () => {
    setIsFocus(true);
    if (onEndEditing !== undefined && onEndEditing !== null) {
      onEndEditing();
    }
    if (!isActive) {
      setFieldActive(true);
    }
    onCustomFocus();
  };

  /**
   * _handleBlur() is a function that sets isFocus to false and if isFieldActive is true and value is
   * false, then setFieldActive to false.
   */
  const _handleBlur = () => {
    setIsFocus(false);
    !!onBlur && onBlur();
    if (isActive && !value) {
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
      !!nextField && nextField.focus();
    } else if (returnKeyType === 'done') {
      if (checkIsNull(onDoneClick)) {
        onDoneClick();
      }
      Keyboard.dismiss();
    }
  };

  return (
    <View
      style={[styles.rootContainer, {...customStyles}]}
      key={floatingText}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        !!laoutY && laoutY(layout.y, removeMiddleSpaces(floatingText));
      }}>
      <View
        style={
          isFocus && isActive
            ? styles.containerFocus
            : value?.length > 0
            ? styles.container
            : styles.containerEmpty
        }>
        <View
          style={
            !isIosDevice()
              ? styles.titleContainer
              : styles.titleContainerIos
          }>
          <Text style={styles.titleStyles} numberOfLines={1} >
            {isFocus || value?.length > 0
              ? capitalizeFirstLowercaseRest(floatingText) + ''
              : ''}
            <Text style={styles.titleMandetoryStyles}>
              {isFocus || value?.length > 0 ? (isMandatory ? '*' : '') : ''}
            </Text>
          </Text>
        </View>

        {lengthCheck && value?.length > 0 ? (
          <Text style={styles.lengthText}>{value?.length}/250</Text>
        ) : (
          <></>
        )}
        <View style={styles.inputRow}>
          <TextInput
            value={value}
            style={[
              isFocus || value?.length > 0
                ? !isIosDevice()
                  ? styles.textInput
                  : styles.textInputIOS
                : styles.textInputUnfocus,
            ]}
            placeholder={
              isMandatory && !isFocus
                ? capitalizeFirstLowercaseRest(floatingText) + '*'
                : capitalizeFirstLowercaseRest(floatingText)
            }
            onFocus={_handleFocus}
            onBlur={_handleBlur}
            ref={ref => {
              if (setRef) {
                setRef(ref);
              }
            }}
            placeholderTextColor={isFocus ? color.TRANSPARNT : color.S_GRAY_4}
            onSubmitEditing={_onSubmitEditing}
            autoFocus={isFocus}
            blurOnSubmit={false}
            editable={isEditable}
            selectionColor={color.P_PINK}
            secureTextEntry={isPassword && password ? true : false}
            onChangeText={_onChangeText}
            keyboardType={keyboardType}
            ellipsizeMode="tail"
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            {...rest}
          />
        </View>

        {password ? (
          <Pressable
            style={styles.eye}
            onPress={() => onPasswordToglle(!isPassword)}>
            {isPassword ? (
              <images.Common.EyeOpen_ICON />
            ) : (
              <images.Common.closedEye />
            )}
          </Pressable>
        ) : null}
        {image ? <View style={styles.eye}>{image}</View> : null}
      </View>
      {errorMsg?.length > 0 ? (
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

export default FloatingInput;
