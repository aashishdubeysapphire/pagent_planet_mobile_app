import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

interface Props {
  list ?: any,
  isActive ?: any,
  setIsActive ?: any
}

const SelectCategory = ({list, isActive, setIsActive} : Props) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={
          isActive === list[0].lable
            ? styles.activeButtonView
            : styles.inActiveButtonView
        }
        onPress={() => {
          setIsActive(list[0].lable);
        }}
        activeOpacity={1}>
        <Text
          style={
            isActive === list[0].lable
              ? styles.activeLabelStyles
              : styles.inActiveLabelStyles
          }>
          {list[0].lable}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          isActive === list[0].lable
            ? styles.inActiveButtonView
            : styles.activeButtonView
        }
        onPress={() => {
          setIsActive(list[1].lable);
        }}
        activeOpacity={1}>
        <Text
          style={
            isActive === list[0].lable
              ? styles.inActiveLabelStyles
              : styles.activeLabelStyles
          }>
          {list[1].lable}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectCategory;
