import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';
import {styles} from './styles';
import {color} from '../../../assets/colorConstant';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import {font} from '../../../assets/fonts/fontsConstant';
import {Picker} from '@react-native-picker/picker';
import translations from '../../../assets/translations';
import { isIosDevice } from '../../utils/helperFunction';

interface Props {
  onPress: any;
  modalVisible: boolean;
  onPressCancel: any;
  onPressSave: any;
  close: any;
  heightCallback: any;
  previousHeight: any;
  data: any;
}

const WeightModal = ({
  modalVisible,
  close,
  onPressCancel,
  heightCallback,
  previousHeight = '',
  data = [],
}: Props) => {
  const [slug, setSlug] = React.useState(1);
  const [preSelected, setPreSelected] = React.useState(1);

  React.useEffect(() => {
    if (!isIosDevice()) {
      if (previousHeight) {
        setPreSelected(Number(previousHeight.slice(0, -3)));
      } else {
        setPreSelected(1);
      }
    } else {
      setSlug(previousHeight);
    }
  }, [previousHeight]);

  const onPress = () => {
    if (!isIosDevice()) {
      if (slug === 0) {
        heightCallback(slug + 1 + 'lb');
      } else {
        heightCallback(slug + 1 + 'lbs');
      }
    } else {
      heightCallback(slug);
    }

    close();
  };

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
            <Text style={styles.modalHeading}>
              {translations.COMPITION_WEIGHT}
            </Text>
            <View style={{...styles.wheelPicker}}>
              {!isIosDevice() ? (
                <>
                  <WheelPicker
                    style={{
                      height: moderateScaleVertical(180),
                      width: moderateScale(125),
                    }}
                    isCyclic={true}
                    initPosition={Number(preSelected - 1)}
                    data={data}
                    indicatorColor={color.BLACK}
                    indicatorWidth={4}
                    itemTextSize={textScale(20)}
                    itemTextColor={color.S_GRAY_3}
                    selectedItemTextFontFamily={font.RobotoRegular}
                    itemTextFontFamily={font.RobotoRegular}
                    selectedItemTextSize={textScale(20)}
                    onItemSelected={selectedItem => setSlug(selectedItem)}
                  />
                </>
              ) : (
                <>
                  <Picker
                    style={{
                      width: moderateScale(120),
                      height: moderateScaleVertical(180),
                    }}
                    selectedValue={slug}
                    itemStyle={{color: 'black', fontSize: textScale(16)}}
                    onValueChange={(itemValue, itemIndex) =>
                      setSlug(itemValue)
                    }>
                    {data.map((value, i) => (
                      <Picker.Item label={value} value={value} key={i} />
                    ))}
                  </Picker>
                </>
              )}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={onPressCancel}>
                <Text style={styles.buttonHeading}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPress}>
                <Text style={{...styles.buttonHeading, color: color.P_PINK}}>
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

export default WeightModal;
