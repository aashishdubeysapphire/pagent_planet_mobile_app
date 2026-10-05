import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';

const SelectCountries = props => {
  const {
    data,
    onChangeData,
    recivedLeades,
    selectedProfile,
    allCountries,
    selectedStatesIds,
    unselectedIds,
    isEdit,
    userSelectedData,
  } = props?.route?.params || {};
  const [selecteList, setSelecteList] = useState(recivedLeades);
  const [searchText] = useState('');
  const navigation = useNavigation();
  useEffect(() => {}, [selecteList]);

  const sectionListRef = useRef();
  const handleScrollToIndex = index => {
    if (!!sectionListRef?.current) {
      sectionListRef?.current?.scrollToIndex({
        animated: true,
        index: index,
      });
    }
  };
  const getIndex = (objct: {id: any}, arr = selecteList) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].id === objct.id) {
        return index;
      }
    }
  };
  const onMuiltipleSelect = item => {
    if (!doesArrayIncludesItem(item)) {
      setSelecteList([...selecteList, item]);
    } else if (doesArrayIncludesItem(item)) {
      const filterArray = selecteList.filter(i => {
        return selecteList.indexOf(i) !== getIndex(item);
      });
      setSelecteList(filterArray);
    }
  };
  const doesArrayIncludesItem = (obj: {id: any}, arry = selecteList) => {
    if (!!arry) {
      for (let index = 0; index < arry.length; index++) {
        if (arry?.[index]?.id === obj?.id) {
          return true;
        }
      }
    }
    return false;
  };
  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.heading}>{item.title}</Text>
        </View>
        {item.data.map(i => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onMuiltipleSelect(i)}>
              <Text
                style={
                  doesArrayIncludesItem(i) ? styles.selectedName : styles.name
                }>
                {i?.name}
              </Text>
              {doesArrayIncludesItem(i) && <AppImages.Common.PinkTickIcon />}
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  const renderSectionIndex = ({sections}) => {
    return (
      <View style={styles.sectionIndex}>
        {sections.map((section, index) => (
          <TouchableOpacity
            onPress={() => handleScrollToIndex(index)}
            style={styles.alpabetTouch}>
            <Text key={index} style={styles.indexItem}>
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const filteredData = data.map(section => {
    const filteredSectionData = section.data.filter(item =>
      item?.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return {...section, data: filteredSectionData};
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        lable={translations.SELECT_COUNTRY}
        isUnderLineRequired
        rightText={translations.NEXT}
        onPressRightText={() => {
          onChangeData(selecteList);
          navigation.navigate(SCREEN.SELECT_STATES, {
            selecteList: selecteList,
            selectedProfile: selectedProfile,
            selectedStatesIds: selectedStatesIds,
            unselectedIds: unselectedIds,
            isEdit: isEdit,
            userSelectedData,
          });
        }}
      />
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text
            style={{
              ...styles.touchableText,
              marginRight: 'auto',
              opacity: selecteList.length !== 0 ? 1 : 0.2,
              position: 'relative',
            }}
            onPress={() => {
              setSelecteList([]);
            }}>
            {translations.SELECT_NON}
          </Text>
          <Text style={styles.selectedText}>
            {selecteList.length} {translations.SELECTED}
          </Text>
          <Text
            style={{
              ...styles.touchableText,
              marginLeft: 'auto',
              opacity: selecteList.length !== data.length ? 1 : 0.2,
            }}
            onPress={() => {
              setSelecteList(allCountries);
            }}>
            {translations.SELECT_ALL}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            ref={sectionListRef}
            data={filteredData}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            initialNumToRender={1000}
          />
          <View style={styles.indexContainer}>
            {renderSectionIndex({sections: filteredData})}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectCountries;
