import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {categoryData} from '../../../../../services/models/convo/reportcategoryList';
import AppImages from '../../../../../assets/images/AppImages';
import {color} from '../../../../../assets/colorConstant';

interface Props {
  dropdownList?: categoryData;
  setReasonType: Function;
  setReasonId: Function;
  setDropdownVisible: Function;
  setReasonError: Function;
  selectedItem: number;
  setSelectedItem: Function;
}

const DisputeDropDown = ({
  dropdownList,
  setReasonType,
  setReasonId,
  setDropdownVisible,
  setReasonError,
  selectedItem,
  setSelectedItem,
}: Props) => {
  const onItemSelected = (item: categoryData, indx: number) => {
    setReasonType(item?.name);
    setReasonId(item?.id);
    setDropdownVisible(false);
    setReasonError('');
    setSelectedItem(indx);
  };

  return (
    <View style={styles.dropdownContainer}>
      <FlatList
        data={dropdownList}
        numColumns={1}
        key={'#'}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onItemSelected(item, index)}
            style={styles.itemView}>
            <Text
              style={{
                ...styles.selectedText,
                color: index === selectedItem ? color.P_PINK : color.INPUT_TEXT,
              }}>
              {item.name}
            </Text>
            {index === selectedItem ? <AppImages.Common.PinkTickIcon /> : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DisputeDropDown;
