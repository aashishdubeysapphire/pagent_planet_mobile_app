import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BottomModal from '../bottommodal';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import translations from '../../../assets/translations';
import AppImages from '../../../assets/images/AppImages';
import {FlatList} from 'react-native-gesture-handler';
import {color} from '../../../assets/colorConstant';
import {styles} from './styles';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  customStyles?: any;
  colorList: [];
  selectedColorItem: number;
  setSelectedColorItem: any;
  setSelectedSizeItem: any;
  setCurrentSlide: any;
  setAddToBag: any;
}
/* The code is defining a functional component called `ColorModal` that takes in several props as
arguments. These props include `isModalVisible`, `setIsModalVisible`, `colorList`,
`selectedColorItem`, `setSelectedColorItem`, `setCurrentSlide`, `setSelectedSizeItem`, and
`setAddToBag`. These props are used within the component to control the visibility of the modal,
handle color selection, and update state values. The component returns JSX code that renders a modal
with a heading, a list of color options, and a close button. */
const ColorModal = ({
  isModalVisible,
  setIsModalVisible,
  colorList,
  selectedColorItem,
  setSelectedColorItem,
  setCurrentSlide,
  setSelectedSizeItem,
  setAddToBag,
}: Props) => {
  /* The `onColorClick` function is a callback function that is triggered when a color option is
  clicked. It takes in two arguments, `item` and `index`, which represent the selected color option
  and its index in the `colorList` array, respectively. */
  const onColorClick = (item, index) => {
    setSelectedColorItem(item);
    setCurrentSlide(index + 1);
    setSelectedSizeItem(null);
    setIsModalVisible(false);
    setAddToBag(false);
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{
        height: moderateScaleVertical(171),
        paddingHorizontal: moderateScaleVertical(16),
      }}>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>
          {colorList?.length > 1 ? translations.COLORS : translations.COLOR}
        </Text>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setIsModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={colorList}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={{
                ...styles.colorRound,
                backgroundColor: item?.hex_code,
                borderColor:
                  selectedColorItem?.id === item?.id
                    ? color.P_PINK
                    : color.TRANSPARENT,
                borderWidth: moderateScale(2),
              }}
              onPress={() => onColorClick(item, index)}
            />
            <Text style={styles.colorName}>{item?.name}</Text>
          </View>
        )}
      />
    </BottomModal>
  );
};

export default ColorModal;
