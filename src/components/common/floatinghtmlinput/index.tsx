import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  KeyboardTypeOptions,
  View,
  TouchableOpacity,
} from 'react-native';
import useStyle from './styles';
import {color} from '../../../assets/colorConstant';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import BottomModal from '../bottommodal';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import FloatingInput from '../floatinginput';
import CustomButton from '../button';
import {isIosDevice} from '../../utils/helperFunction';

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

const FloatingHtmlInput = ({
  floatingText = 'sddsfdsf',
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
  const [focus, setIsFocus] = React.useState(false);
  const styles = useStyle();
  const richText = useRef();
  const [isLinkmodalVisible, setIsLinkmodalVisible] = useState(false);
  const [addLinkData, setAddLinkData] = useState({
    title: '',
    link: '',
  });
  const [addLinkError, setAddLinkError] = useState({
    link: '',
  });
  useEffect(() => {
    if (focus) {
      _handleFocus();
    }
  }, [focus]);

  /**
   * _onChangeText is a function that takes an argument called updatedValue
   */
  const _onChangeText = updatedValue => {
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
    setTimeout(() => {
      if (!!richText?.current?.focus) {
        richText?.current?.focus();
      }
    }, 300);
  };

  /**
   * _handleBlur() is a function that sets isFocus to false and if isFieldActive is true and value is
   * false, then setFieldActive to false.
   */
  const _handleBlur = () => {
    setIsFocus(false);
  };
  const onAddLink = () => {
    if (addLinkData?.link.trim() == '') {
      setAddLinkError({link: translations.THIS_FIELD_REQUIRED});
      return;
    }

    richText.current &&
      richText.current?.insertLink(
        addLinkData?.title ? addLinkData?.title : addLinkData?.link,
        addLinkData?.link,
      );
    setIsLinkmodalVisible(false);
    setAddLinkError({link: ''});
    setAddLinkData({title: '', link: ''});
  };
  return (
    <View style={[styles.richTextContainer]}>
      {(focus || value?.length > 0) && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyles}>
            {focus || value?.length > 0 ? floatingText + '' : ''}
          </Text>
        </View>
      )}

      <View
        // nestedScrollEnabled={true}
        style={{
          top: 15,
          marginBottom: isIosDevice() ? 60 : 60,
          // height: 180,
          minHeight: moderateScaleVertical(180),
        }}>
        <RichEditor
          ref={richText}
          onChange={_onChangeText}
          initialContentHTML={`${value}`}
          placeholder={focus ? '' : floatingText + ''}
          androidHardwareAccelerationDisabled={true}
          style={styles.richTextEditorStyle}
          initialHeight={180}
          pasteAsPlainText={true}
          onFocus={_handleFocus}
          onBlur={_handleBlur}
        />
      </View>
      <RichToolbar
        editor={richText}
        selectedIconTint={color.P_PINK}
        iconTint={color.BLACK}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          // actions.keyboard,
          actions.setStrikethrough,
          actions.setUnderline,
          actions.removeFormat,
          // actions.checkboxList,
          actions.undo,
          actions.redo,
        ]}
        style={styles.richTextToolbarStyle}
        onInsertLink={() => {
          _handleFocus();
          setIsLinkmodalVisible(true);
        }}
      />
      <BottomModal
        isModalVisible={isLinkmodalVisible}
        setIsModalVisible={setIsLinkmodalVisible}
        customStyles={{
          height: 'auto',
          paddingHorizontal: moderateScaleVertical(16),
        }}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{translations.ADD_LINK}</Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsLinkmodalVisible(false);
              setAddLinkData({title: '', link: ''});
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>
        <FloatingInput
          floatingText={translations.TITLE}
          value={addLinkData.title}
          setText={val => {
            setAddLinkData({
              ...addLinkData,
              title: val,
            });
          }}
          // errorMsg={errorMsg.videoLink}
        />
        <FloatingInput
          floatingText={translations.LINK}
          isMandatory
          returnKeyType={'next'}
          value={addLinkData.link}
          setText={val => {
            setAddLinkData({
              ...addLinkData,
              link: val,
            });
          }}
          errorMsg={addLinkError.link}
        />
        <CustomButton
          label={translations.ADD_LINK}
          inactive
          onPress={() => {
            onAddLink();
          }}
        />
      </BottomModal>
    </View>
  );
};

export default FloatingHtmlInput;
