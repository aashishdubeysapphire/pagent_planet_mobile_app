import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {TextInput} from 'react-native-gesture-handler';
import {styles} from './styles';
import {removeEmojis} from '../../../../../utils/validations';

enum STATE {
  INITIAL = 0,
  ADD_LINK_PRESSED = 1,
  LINK_ADDED = 2,
  FINAL = 3,
}

interface Props {
  lable: string;
  hint: string;
  errMsg: boolean;
  valueBack: string;
  image: React.ReactNode;
  onChageText: (param: string) => void;
}

const SocialLink = ({
  lable,
  hint,
  valueBack,
  errMsg,
  image,
  onChageText,
}: Props) => {
  const [state, setState] = useState(STATE.INITIAL);
  const [value, setvalue] = useState(valueBack);

  useEffect(() => {
    if (!!value) {
      setState(STATE.LINK_ADDED);
    } else {
      setState(STATE.INITIAL);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.mainIcon}>{image}</View>

        <Text style={styles.heading}>{lable}</Text>

        {state === STATE.INITIAL && (
          <TouchableOpacity
            style={styles.addLinkText}
            onPress={() => setState(STATE.ADD_LINK_PRESSED)}>
            <Text style={styles.addLinkText}>{translations.ADD_LINK}</Text>
          </TouchableOpacity>
        )}

        {state === STATE.LINK_ADDED && (
          <>
            <TouchableOpacity
              style={styles.Dots}
              onPress={() => {
                setState(STATE.FINAL);
              }}>
              <AppImages.EditProfile.Tpp_3_dot />
            </TouchableOpacity>
          </>
        )}

        {state === STATE.FINAL && (
          <>
            <View style={styles.finalStateView}>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => {
                  setState(STATE.INITIAL);
                  setvalue('');
                  onChageText('');
                }}>
                <AppImages.EditProfile.Tpp_delete_icon
                  width={moderateScale(18)}
                  height={moderateScaleVertical(18)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => {
                  setState(STATE.ADD_LINK_PRESSED);
                }}>
                <AppImages.EditProfile.Tpp_blackEdit
                  width={moderateScale(18)}
                  height={moderateScaleVertical(18)}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {state === STATE.ADD_LINK_PRESSED && (
        <>
          <TextInput
            style={styles.textInput}
            placeholder={hint}
            onChangeText={val => {
              setvalue(removeEmojis(val));
              onChageText(removeEmojis(val));
            }}
            value={value}
          />
          {errMsg ? (
            <View style={styles.row}>
              <AppImages.Common.Alert_ICON />
              <Text style={styles.error}>
                {' '}
                {translations.PLEASE_ENTER_A_VALID_LINK}{' '}
              </Text>
            </View>
          ) : (
            <Text style={styles.noError} />
          )}
        </>
      )}
    </View>
  );
};

export default SocialLink;
