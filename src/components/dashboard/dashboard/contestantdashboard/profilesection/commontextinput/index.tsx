import React, {useState, useRef} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../../../../utils/responsiveSize';
import {
  doesParaContainersURL,
  removeEmojis,
} from '../../../../../utils/validations';
import {styles} from './styles';
import OpenChildAnimation from '../../../../../common/openchildanimation';

interface Props {
  label: string;
  setText: any;
  conditionVar: boolean;
  index: any;
  info: string;
  onPress: any;
  onSave: any;
  editable: boolean;
}
const CommonTextInput = ({
  label,
  setText,
  conditionVar,
  index,
  info,
  onPress,
  onSave,
  editable = true,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const makeEditable = () => {
    setEdit(!edit);
    setTimeout(() => {
      textInputRef?.current?.focus();
    }, 500);
  };

  const _onChangeText = (updatedValue: string) => {
    if (setText) {
      setText(removeEmojis(updatedValue));
    }
  };

  const checkValidField = (data: string) => {
    if (!!data) {
      if (doesParaContainersURL(data)) {
        setErrorMsg(translations.THIS_FILED_CANT_CONTAIN_A_LINK);
        return false;
      } else {
        setErrorMsg('');
        return true;
      }
    } else {
      setErrorMsg('');
      return true;
    }
  };

  const onSaveClick = () => {
    if (checkValidField(info)) {
      onSave();
      setEdit(!edit);
    }
  };

  const onArrowClick = () => {
    onPress();
    setErrorMsg('');
    if (edit) {
      setEdit(!edit);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={conditionVar ? styles.openContainer : styles.closedContainer}
        onPress={!conditionVar ? onPress : null}
        activeOpacity={conditionVar ? 1 : 0.2}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => onArrowClick()}>
          <Text
            style={{
              ...styles.subHeading,
              color: conditionVar ? color.P_PINK : color.INPUT_TEXT,
            }}>
            {label}
          </Text>
          {!conditionVar ? (
            <View style={styles.upArrowIcon}>
              <AppImages.Dashboard.DarkDownArrowIcon
                with={moderateScale(14)}
                height={moderateScaleVertical(14)}
                style={styles.arrowIcon}
              />
            </View>
          ) : (
            <View style={styles.upArrowIcon}>
              <AppImages.Dashboard.upArrow_ICON
                with={moderateScale(14)}
                height={moderateScaleVertical(14)}
                style={styles.arrowIcon}
              />
            </View>
          )}
        </TouchableOpacity>
        <OpenChildAnimation
          isVisible={conditionVar}
          child={
            <>
              <View style={styles.divider}></View>
              <View style={styles.editingArea}>
                <TextInput
                  ref={textInputRef}
                  style={editable ? styles.infoText : styles.textArea}
                  value={info}
                  multiline={true}
                  editable={edit}
                  onChangeText={_onChangeText}
                  returnKeyType={'done'}>
                  {/* {info} */}
                </TextInput>
                {editable ? (
                  edit ? (
                    <TouchableOpacity
                      style={styles.editSection}
                      onPress={onSaveClick}>
                      <AppImages.Dashboard.tickIcon_ICON
                        with={moderateScale(18)}
                        height={moderateScaleVertical(18)}
                        style={styles.editIcon}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.editSection}
                      onPress={() => {
                        makeEditable();
                      }}>
                      <AppImages.Dashboard.edit_ICON
                        with={moderateScale(18)}
                        height={moderateScaleVertical(18)}
                        style={styles.editIcon}
                      />
                    </TouchableOpacity>
                  )
                ) : null}
              </View>
            </>
          }
        />
      </TouchableOpacity>
      {errorMsg?.length!! > 0 && conditionVar ? (
        <View style={styles.row}>
          <AppImages.Common.Alert_ICON />
          <Text style={styles.error}> {errorMsg} </Text>
        </View>
      ) : (
        <Text style={styles.noError} />
      )}
    </>
  );
};

export default CommonTextInput;
