import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../../../../../../../common/header';
import {styles} from './styles';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../assets/translations';
import {moderateScale} from '../../../../../../../../../utils/responsiveSize';
import MultiSelectList from '../../../../../../../../../common/multiselectlist';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {
  ADD_CONTESTANTS_TO_GROUP,
  GET_ALL_REMAINING_CONTESTANTS,
} from '../../../../../../../../../../services/endpoints';
import FastImageView from '../../../../../../../../../common/fastimageview';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../../store/useAppStore';
import {GROUP, REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import {checkIsNull} from '../../../../../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../../root/screenname';

import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../../../../services/constants';
import FloatingButton from '../../../../../../../../../common/floatingbutton';
import {getIDsArrayFromArray} from '../../../../../../../../../utils/helperFunction';
import WarningModel from '../../../../../../../../../common/warningmodel';
import {useBackHandler} from '@react-native-community/hooks';

const AddContestants = props => {
  const setScreenRefresh = useSetScreenRefresh();
  const setLoader = useSetLoader();
  const {
    storeData: {refresh},
  } = useAppStore();
  const navigation = useNavigation();
  const {eventId, groupId} = props?.route?.params;
  const [contestantsList, setContestantsList] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearcing, setisSearcing] = useState(false);
  const [searchingList, setSearchingList] = useState([]);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const searchRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
      setShowWhiteScreen(false);
    }, 500);
  }, [refresh]);
  useBackHandler(() => {
    if (isSearcing) {
      onBack();
      return true;
    }
    // let the default thing happen
    return false;
  });
  const onBack = () => {
    setisSearcing(false);
    return true;
  };
  const refreshScreen = () => {
    if (REFESH_SCREEN.ADD_JUDDGE === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      hitGetAllRemainingContestants();
    }
  };
  const contestantsUpdatedBody = {
    event_id: eventId,
    group_id: groupId,
    contestant_ids: getIDsArrayFromArray(selectedArray),
  };

  const {mutateAsync: getAllRemainingContestants} = useCgMutation({
    key: GET_ALL_REMAINING_CONTESTANTS,
    method: MethodTypes.GET,
    url: GET_ALL_REMAINING_CONTESTANTS + `${props.route.params.groupId}`,
    offSuccessToast: true,
  });

  const {mutateAsync: addContestants} = useCgMutation({
    key: ADD_CONTESTANTS_TO_GROUP,
    url: ADD_CONTESTANTS_TO_GROUP,
    body: contestantsUpdatedBody,
  });

  const hitGetAllRemainingContestants = async () => {
    setIsLoading(true);
    const res = await getAllRemainingContestants();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setContestantsList(res.data);
      setSearchingList(res.data);
    }
    setIsLoading(false);
  };

  const onPressCircleCard = item => {
    const filterArray = selectedArray.filter(i => {
      return selectedArray.indexOf(i) !== selectedArray.indexOf(item);
    });
    setSelectedArray(filterArray);
  };
  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.pinkRoundImage}
        activeOpacity={0.5}
        onPress={() => onPressCircleCard(item)}>
        <View style={styles.closeImageView}>
          <AppImages.CreateContestentProfile.tpp_cross_small_icon />
        </View>
        <FastImageView
          isCircle
          width={moderateScale(40)}
          height={moderateScale(40)}
          borderRadius={200}
          imageUrl={item.final_image_url}
        />
        <Text style={styles.selectedText} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const _onChangeSearchText = val => {
    if (!!val && checkIsNull(contestantsList)) {
      const filteredName = contestantsList.filter(item => {
        return String(item.name).toLowerCase().match(val.trim().toLowerCase());
      });
      setSearchingList([...filteredName]);
    } else {
      setSearchingList(contestantsList);
    }
  };

  const _onPressFloatingButton = async () => {
    setLoader(true);
    const res = await addContestants();
    if (res.success || res.status_code === ApiStatusType.Success) {
      navigation.goBack();
      setScreenRefresh(REFESH_SCREEN.GROUP_CONTESTANT_LIST);
      setScreenRefresh(REFESH_SCREEN.GROUP_LIST);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={styles.mainView}>
      {!isSearcing && (
        <Header
          lable={translations.ADD_CONSTESANT}
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          onPressRightIcon1={() => {
            setSearchingList(contestantsList);
            setisSearcing(true);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
          onPressRightIcon2={() => {
            navigation.navigate(SCREEN.ADD_NEW_GROUP, {id: GROUP.ADD_GROUP});
          }}
          onPressBack={() => {
            selectedArray.length > 0
              ? setIsWarningMoadlVisible(true)
              : navigation.goBack();
          }}
          isUnderLineRequired
        />
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
      {!isSearcing && contestantsList.length !== 0 ? (
        <View style={styles.textView}>
          <Text
            style={{
              ...styles.touchableTextcontainer,
              marginRight: 'auto',
              opacity: selectedArray.length > 0 ? 1 : 0.2,
            }}
            onPress={() => {
              setSelectedArray([]);
            }}>
            {translations.SELECT_NON}
          </Text>

          {selectedArray.length > 0 && (
            <Text style={styles.textCentercontainer}>
              {selectedArray.length}
              {translations.CAPITAL_SELECTED}
            </Text>
          )}
          <Text
            style={{
              ...styles.touchableTextcontainer,
              marginLeft: 'auto',
              opacity:
                selectedArray.length === contestantsList.length ? 0.2 : 1,
            }}
            onPress={() => {
              setSelectedArray(contestantsList);
            }}>
            {translations.SELECT_ALL}
          </Text>
        </View>
      ) : null}

      {isSearcing && (
        <View>
          <View style={styles.searchingView}>
            <TouchableOpacity
              onPress={() => {
                setisSearcing(false);
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
      <View
        style={{
          ...styles.submainView,
          paddingHorizontal: isLoading ? moderateScale(0) : moderateScale(16),
        }}>
        {!showWhiteScreen && (
          <MultiSelectList
            displayData={isSearcing ? searchingList : contestantsList}
            selectedArray={selectedArray}
            setSelectedArray={setSelectedArray}
            areSelectable={true}
            isLoading={isLoading}
            isSearching={isSearcing}
            isContestantList={true}
          />
        )}
        {selectedArray.length > 0 && !isSearcing ? (
          <FloatingButton
            image={<AppImages.Common.tickIcon />}
            onPress={_onPressFloatingButton}
          />
        ) : null}
        <WarningModel
          msg={translations.THE_SELECTED_CONTESTANT_WILL_NOT_BE_ADDED}
          isModalVisible={isWarningMoadlVisible}
          setConfirm={() => {
            navigation.goBack();
          }}
          setIsModalVisible={setIsWarningMoadlVisible}
          headingStyle={styles.modalHeading}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddContestants;
