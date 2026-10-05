import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import AppImages from '../../../assets/images/AppImages';
import {styles} from './styles';

interface Props {
  data: any;
  selectedRadio: string;
  setSelectedRadio: () => {};
  customStyles: {flex: number};
  numColumns: number;
  showFirstWordOnly: boolean;
}
const DynamicradioButton = ({
  data,
  selectedRadio = data[0].lable,
  setSelectedRadio,
  customStyles = {flex: 0.5},
  numColumns = 2,
  showFirstWordOnly = false,
}: Props) => {
  const getLable = lable => {
    if (showFirstWordOnly) {
      let splitArr = (lable + '').split(' ');
      return splitArr[0];
    } else {
      return lable;
    }
  };
  const renderRadioButton = (index: {lable: string}) => {
    const {item} = index;

    return selectedRadio === item.lable ? (
      <View style={[styles.selected, {...customStyles}]}>
        <View style={styles.radioButtonImage}>
          <AppImages.Common.RadioButton />
        </View>
        <Text style={styles.selectedText}>{getLable(item.lable)}</Text>
      </View>
    ) : (
      <TouchableOpacity
        style={[styles.selected, {...customStyles}]}
        onPress={() => {
          setSelectedRadio(item.lable);
        }}
        activeOpacity={0.8}>
        <View style={styles.radioButtonImage}>
          <AppImages.Common.Ellipse />
        </View>
        <Text style={styles.unselectedText}>{getLable(item.lable)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View>
        <FlatList
          data={data}
          renderItem={index => renderRadioButton(index)}
          numColumns={numColumns}
        />
      </View>
    </View>
  );
};

export default DynamicradioButton;
