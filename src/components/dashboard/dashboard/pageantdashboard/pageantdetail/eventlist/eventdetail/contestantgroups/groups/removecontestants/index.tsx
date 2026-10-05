import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import translations from '../../../../../../../../../../assets/translations';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import Header from '../../../../../../../../../common/header';
import {REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import FastImageView from '../../../../../../../../../common/fastimageview';
import MultiSelectList from '../../../../../../../../../common/multiselectlist';
import {checkIsNull} from '../../../../../../../../../utils/validations';
import {moderateScale} from '../../../../../../../../../utils/responsiveSize';
import FloatingButton from '../../../../../../../../../common/floatingbutton';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {REMOVE_CONTESTANT_FROM_GROUP} from '../../../../../../../../../../services/endpoints';
import {getIDsArrayFromArray} from '../../../../../../../../../utils/helperFunction';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../../store/useAppStore';
import {useNavigation} from '@react-navigation/core';
import {ApiStatusType} from '../../../../../../../../../../services/constants';
import WarningModel from '../../../../../../../../../common/warningmodel';
import {useBackHandler} from '@react-native-community/hooks';

const RemoveContestants = props => {
  const {type, groupId, displayData} = props?.route?.params;
  const [isSearcing, setIsSearcing] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [searchingList, setSearchingList] = useState([]);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const [deleteCOnfiramtionModalVisible, setDeleteCOnfiramtionModalVisible] =
    useState(false);
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const searchRef = useRef();
  const setScreenRefresh = useSetScreenRefresh();
  useBackHandler(() => {
    if (isSearcing) {
      onBack();

      return true;
    }
    // let the default thing happen
    return false;
  });
  const onBack = () => {
    setIsSearcing(false);
    return true;
  };
  const contestantUpdatedBody = {
    group_id: groupId,
    contestant_ids: getIDsArrayFromArray(selectedArray),
  };
  const {mutateAsync: removeContestants} = useCgMutation({
    key: REMOVE_CONTESTANT_FROM_GROUP,
    url: REMOVE_CONTESTANT_FROM_GROUP,
    body: contestantUpdatedBody,
  });
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.pinkRoundImage}
        activeOpacity={0.5}
        onPress={() => onPressCircleCard(item)}>
        <View style={styles.crossView}>
          <AppImages.CreateContestentProfile.tpp_cross_small_icon />
        </View>
        <FastImageView
          width={moderateScale(40)}
          height={moderateScale(40)}
          borderRadius={200}
          isCircle
          imageUrl={item.final_image_url}
        />
        <Text style={styles.selectedText} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const onPressCircleCard = item => {
    const filterArray = selectedArray.filter(i => {
      return selectedArray.indexOf(i) !== selectedArray.indexOf(item);
    });
    setSelectedArray(filterArray);
  };
  const _onChangeSearchText = val => {
    if (!!val && checkIsNull(displayData)) {
      const filteredName = displayData.filter(item => {
        return String(item.name).toLowerCase().match(val.trim().toLowerCase());
      });
      setSearchingList([...filteredName]);
    } else {
      setSearchingList(displayData);
    }
  };

  const _onPressFloatingButton = async () => {
    setLoader(true);
    const res = await removeContestants();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setScreenRefresh(REFESH_SCREEN.GROUP_CONTESTANT_LIST);
      setScreenRefresh(REFESH_SCREEN.GROUP_LIST);
      navigation.goBack();
    }
    setLoader(false);
  };
  return (
    <SafeAreaView style={styles.mainView}>
      {!isSearcing && (
        <Header
          lable={translations.REMOVE + ' ' + translations.CONTESTANTS}
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          onPressRightIcon1={() => {
            setSearchingList(displayData);
            setIsSearcing(true);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
          onPressBack={() => {
            selectedArray.length > 0
              ? setIsWarningMoadlVisible(true)
              : navigation.goBack();
          }}
          isUnderLineRequired
        />
      )}
      {isSearcing && (
        <View>
          <View style={styles.searchingView}>
            <TouchableOpacity
              onPress={() => {
                setIsSearcing(false);
              }}>
              <AppImages.Common.crossIcon />
            </TouchableOpacity>
            <TextInput
              placeholder={translations.SEARCH_HERE}
              style={styles.searchTextInput}
              ref={searchRef}
              onChangeText={_onChangeSearchText}
            />
          </View>
        </View>
      )}

      {selectedArray.length > 0 && !isSearcing && (
        <View style={styles.selectedList}>
          <FlatList
            data={selectedArray}
            horizontal={true}
            initialNumToRender={100}
            renderItem={_renderItem}
          />
        </View>
      )}

      {!isSearcing && displayData.length !== 0 ? (
        <View style={styles.textView}>
          <Text
            style={{
              ...styles.touchableText,
              marginRight: 'auto',
              opacity: selectedArray.length > 0 ? 1 : 0.2,
            }}
            onPress={() => {
              setSelectedArray([]);
            }}>
            {translations.SELECT_NON}
          </Text>

          {selectedArray.length > 0 && (
            <Text style={styles.textcenter}>
              {selectedArray.length}
              {translations.CAPITAL_SELECTED}
            </Text>
          )}
          <Text
            style={{
              ...styles.touchableText,
              marginLeft: 'auto',
              opacity: selectedArray.length === displayData.length ? 0.2 : 1,
            }}
            onPress={() => {
              setSelectedArray(displayData);
            }}>
            {translations.SELECT_ALL}
          </Text>
        </View>
      ) : null}
      <View style={styles.subView}>
        <MultiSelectList
          displayData={isSearcing ? searchingList : displayData}
          selectedArray={selectedArray}
          setSelectedArray={setSelectedArray}
          areSelectable={true}
          isLoading={false}
          isSearching={isSearcing}
          isContestantList={true}
        />
      </View>

      {!isSearcing && selectedArray.length > 0 && (
        <FloatingButton
          image={<AppImages.ProfileImage.Tpp_remove_image_icon />}
          onPress={() => {
            setDeleteCOnfiramtionModalVisible(true);
          }}
        />
      )}
      <WarningModel
        msg={translations.DELETE_EVENT_CONTESTANT_CONFIRM_MSG}
        isModalVisible={deleteCOnfiramtionModalVisible}
        setConfirm={() => {
          _onPressFloatingButton();
        }}
        setIsModalVisible={setDeleteCOnfiramtionModalVisible}
        headingStyle={styles.modalHeading}
      />

      <WarningModel
        msg={translations.THE_SELECTED_CONTESTANTS_WILL_NOT_BE_REMOVED}
        isModalVisible={isWarningMoadlVisible}
        setConfirm={() => {
          navigation.goBack();
        }}
        setIsModalVisible={setIsWarningMoadlVisible}
        headingStyle={styles.modalHeading}
      />
    </SafeAreaView>
  );
};

export default RemoveContestants;
