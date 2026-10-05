import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';
import {styles} from './styles';
import {color} from '../../../assets/colorConstant';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {moderateScaleVertical, textScale} from '../../utils/responsiveSize';
import {font} from '../../../assets/fonts/fontsConstant';
import {Picker} from '@react-native-picker/picker';
import translations from '../../../assets/translations';
import { isIosDevice } from '../../utils/helperFunction';

interface Props {
  onPress: any;
  modalVisible: boolean;
  onPressCancel: any;
  close: any;
  heightCallback: any;
  previousHeight: any;
}

const HeightModal = ({
  modalVisible,
  close,
  onPressCancel,
  heightCallback,
  previousHeight,
}: Props) => {
  const [feet, setFeet] = React.useState(0);
  const [inch, setInch] = React.useState(0);
  const [slug, setSlug] = React.useState('');

  const sendHeight = () => {
    heightCallback(slug);
  };

  React.useEffect(() => {
    if (previousHeight) {
      const myArray = previousHeight.split('-');

      const feet1 = myArray[0].match(/\d+/)[0];
      const feet2 = Number(feet1);

      setFeet(feet2 - 1);
      const inch1 = myArray[1].match(/\d+/)[0];
      const inch2 = Number(inch1);
      setInch(inch2);
    }
  }, [previousHeight]);

  const heightFeetArray = [
    '1 ft',
    '2 ft',
    '3 ft',
    '4 ft',
    '5 ft',
    '6 ft',
    '7 ft',
  ];
  const heightInchArray = [
    '0 in',
    '1 in',
    '2 in',
    '3 in',
    '4 in',
    '5 in',
    '6 in',
    '7 in',
    '8 in',
    '9 in',
    '10 in',
    '11 in',
  ];
  const onPress = () => {
    sendHeight();
    close();
  };
  React.useEffect(() => {
    setSlug(`${feet + 1}ft-${inch}inch`);
  }, [feet, inch]);

  return (
    <>
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => close()}
          style={styles.outerview}>
          <TouchableOpacity activeOpacity={1} style={styles.innerview}>
            <Text style={styles.modalHeading}>Height</Text>
            <View style={{...styles.wheelPicker}}>
              {!isIosDevice() ? (
                <>
                  <WheelPicker
                    style={{height: moderateScaleVertical(180), width: 40}}
                    isCyclic={true}
                    initPosition={feet}
                    data={heightFeetArray}
                    indicatorColor={color.BLACK}
                    indicatorWidth={4}
                    itemTextSize={textScale(16)}
                    itemTextColor={color.S_GRAY_3}
                    selectedItemTextFontFamily={font.RobotoRegular}
                    itemTextFontFamily={font.RobotoRegular}
                    selectedItemTextSize={textScale(16)}
                    onItemSelected={selectedItem => setFeet(selectedItem)}
                  />
                  <WheelPicker
                    style={{height: moderateScaleVertical(180), width: 40}}
                    isCyclic={true}
                    initPosition={inch}
                    data={heightInchArray}
                    indicatorColor={color.BLACK}
                    itemTextColor={color.S_GRAY_3}
                    indicatorWidth={4}
                    selectedItemTextFontFamily={font.RobotoRegular}
                    itemTextFontFamily={font.RobotoRegular}
                    itemTextSize={textScale(16)}
                    selectedItemTextSize={textScale(16)}
                    onItemSelected={inch => setInch(inch)}
                  />
                </>
              ) : (
                <>
                  <Picker
                    style={{width: 100, height: moderateScaleVertical(180)}}
                    selectedValue={feet}
                    itemStyle={{color: 'black', fontSize: textScale(16)}}
                    onValueChange={selectedItem => setFeet(selectedItem)}>
                    {heightFeetArray.map((value, i) => (
                      <Picker.Item label={value} value={i} key={i} />
                    ))}
                  </Picker>
                  <Picker
                    style={{width: 100, height: moderateScaleVertical(180)}}
                    selectedValue={inch}
                    itemStyle={{color: 'black', fontSize: textScale(16)}}
                    onValueChange={selectedItem => setInch(selectedItem)}>
                    {heightInchArray.map((value, i) => (
                      <Picker.Item label={value} value={i} key={i} />
                    ))}
                  </Picker>
                </>
              )}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={onPressCancel}>
                <Text style={styles.cancelHeading}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <Text style={{...styles.cancelHeading, color: color.P_PINK}}>
                  {translations.SAVE}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default HeightModal;
