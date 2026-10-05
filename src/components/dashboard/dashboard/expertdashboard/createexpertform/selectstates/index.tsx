import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import {styles} from './styles';
import {getIDsArrayFromArray} from '../../../../../utils/helperFunction';
import AppImages from '../../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {GET_STATES_LIST} from '../../../../../../services/endpoints';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {MethodTypes} from '../../../../../../services/constants';

const SelectStates = props => {
  const {selecteList, selectedProfile, isEdit, userSelectedData} =
    props?.route?.params || {};
  const setLoader = useSetLoader();
  const [country, setCountry] = useState(null);
  const [stateCountryList, setStateCountryList] = useState([]);
  const [showStateList, setShowStateList] = useState(false);
  const [data, setData] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getStateListDataFromBackend();
  }, [selecteList]);
  useEffect(() => {
    let arr = props?.route?.params?.selectedStatesIds;
    let stateArray = [...stateCountryList];
    let unselected = [];

    for (let i = 0; i < arr?.length; i++) {
      for (let j = 0; j < arr[i]?.states?.length; j++) {
        if (arr[i]?.states[j]?.isSelected === false) {
          unselected.push(arr[i]?.states[j]?.id);
        }
      }
    }

    for (let i = 0; i < stateArray?.length; i++) {
      for (let j = 0; j < stateArray[i]?.states?.length; j++) {
        if (unselected.includes(stateArray[i]?.states[j]?.id)) {
          stateArray[i].states[j].isSelected = false;
          stateArray[i].selectedCount = stateArray[i].selectedCount - 1;
        }
      }
    }
    setStateCountryList(stateArray);
  }, [props?.route?.params?.selectedStatesIds, data]);
  const onSaveClick = () => {
    const arr = stateCountryList;
    let selectedStatesIds = [];

    for (let i = 0; i < arr?.length; i++) {
      let tempData = {};

      tempData.id = arr[i]?.id;
      tempData.name = arr[i]?.name;
      tempData.selectedCount = arr[i]?.states?.length;
      tempData.states = [];

      for (let j = 0; j < arr[i]?.states?.length; j++) {
        if (arr[i]?.states[j]?.isSelected === false) {
          let stateList1 = {};
          stateList1.id = arr[i]?.states[j]?.id;
          stateList1.name = arr[i]?.states[j]?.name;
          stateList1.isSelected = arr[i]?.states[j]?.isSelected;
          tempData.states.push(stateList1);
        }
      }

      selectedStatesIds.push(tempData);
    }

    navigation.navigate(SCREEN.CREATE_EXPERT_PROFILE, {
      selectedProfile,
      selectedStatesIds,
      isEdit,
      userSelectedData,
      selecteList,
    });
  };
  const {mutateAsync: getStateList} = useCgMutation<[]>({
    key: GET_STATES_LIST,
    url: GET_STATES_LIST + getIDsArrayFromArray(selecteList),
    method: MethodTypes.GET,
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET MASTER DATA-------------------------------------------- END
  const getStateListDataFromBackend = async () => {
    setLoader(true);

    const res = await getStateList();

    setStateCountryList(res?.data);

    let arr = res?.data;

    let tempArray = [];
    for (let i = 0; i < arr?.length; i++) {
      let tempData = {};

      tempData.id = arr[i]?.id;
      tempData.name = arr[i]?.name;
      tempData.selectedCount = arr[i]?.states?.length;
      tempData.states = [];

      for (let j = 0; j < arr[i]?.states?.length; j++) {
        let stateList1 = {};
        stateList1.id = arr[i]?.states[j]?.id;
        stateList1.name = arr[i]?.states[j]?.name;
        stateList1.isSelected = true;
        tempData.states.push(stateList1);
      }
      tempArray.push(tempData);
    }
    setStateCountryList(tempArray);
    setData(true);
    setLoader(false);
  };

  const onMuiltipleSelect = (item, index) => {
    let stateArray = [...stateCountryList];
    if (item.isSelected === true) {
      stateArray[country].states[index].isSelected = false;
      stateArray[country].selectedCount = stateArray[country].selectedCount - 1;
    } else if (item.isSelected === false) {
      stateArray[country].states[index].isSelected = true;

      stateArray[country].selectedCount = stateArray[country].selectedCount + 1;
    }

    setStateCountryList(stateArray);
  };
  const onCountrySelected = (index, item) => {
    if (index === country && showStateList) {
      setShowStateList(false);
    } else {
      setCountry(index);
      setShowStateList(true);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.header}
          onPress={() => onCountrySelected(index, item)}>
          <View style={styles.row2}>
            <Text style={styles.heading}>{item.name}</Text>
            {stateCountryList[index].selectedCount !== 0 && (
              <AppImages.Common.StarIcon />
            )}
          </View>
          {index === country && showStateList ? (
            <AppImages.Common.PinkDropdown />
          ) : (
            <AppImages.Common.RightArrow1 />
          )}
        </TouchableOpacity>

        {index === country && showStateList ? (
          <View style={styles.statesContainer}>
            <FlatList
              data={item?.states}
              initialNumToRender={1000}
              renderItem={renderStates}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : null}
      </>
    );
  };

  const renderStates = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onMuiltipleSelect(item, index)}>
        {item?.isSelected ? (
          <AppImages.Common.SelectedSmallIcon />
        ) : (
          <View style={styles.circleView} />
        )}

        <Text style={item?.isSelected ? styles.selectedName : styles.name}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        lable={translations.SELECT_STATE}
        isUnderLineRequired
        rightText={translations.SAVE}
        onPressRightText={onSaveClick}
      />

      <Text style={styles.noteHeader}>
        {translations.NOTE}
        <Text style={styles.noteText}>{translations.NOTE_STATES}</Text>
      </Text>

      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={stateCountryList}
            initialNumToRender={1000}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectStates;
