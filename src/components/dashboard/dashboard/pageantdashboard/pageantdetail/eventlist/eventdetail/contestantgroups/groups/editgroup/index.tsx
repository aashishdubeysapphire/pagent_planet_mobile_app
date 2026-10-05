import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../../../../../common/header';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../assets/translations';
import {GROUP, REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import MultiSelectList from '../../../../../../../../../common/multiselectlist';
import {checkIsNull} from '../../../../../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../../../../store/useAppStore';
import {GET_GROUP_CONTESTANT_ADDED_LIST} from '../../../../../../../../../../services/endpoints';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {moderateScale} from '../../../../../../../../../utils/responsiveSize';
import {useBackHandler} from '@react-native-community/hooks';
import {MethodTypes} from '../../../../../../../../../../services/constants';
const EditGroup = props => {
  const {eventId, displayData, groupId, name, description} =
    props?.route?.params;
  const [isSearcing, setIsSearcing] = useState(false);
  const [searchingList, setSearchingList] = useState([]);
  const [listData, setListData] = useState([]);
  const [groupName, setGroupName] = useState(name);
  const [modalVisible, setModalVisible] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();

  const navigation = useNavigation();
  const searchRef = useRef();
  const {
    storeData: {refresh},
  } = useAppStore();
  const {mutateAsync: getGroupContestantAddedList, isLoading} = useCgMutation({
    key: GET_GROUP_CONTESTANT_ADDED_LIST,
    url: GET_GROUP_CONTESTANT_ADDED_LIST + `${groupId}`,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
    }, 500);
  }, [refresh]);
  const refreshScreen = () => {
    if (REFESH_SCREEN.GROUP_CONTESTANT_LIST === refresh) {
      getContestantList();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };
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
  useEffect(() => {
    getContestantList();
  }, []);
  const getContestantList = async () => {
    const res = await getGroupContestantAddedList();
    if (res.success) {
      setListData(res.data);
    }
  };
  const popupMenuData = [
    {
      id: 1,
      title: translations.ADD + ' ' + translations.CONTESTANTS,
      screen: () => {
        setScreenRefresh(REFESH_SCREEN.ADD_JUDDGE);

        navigation.navigate(SCREEN.ADD_CONTESTANTS, {
          eventId: eventId,
          name: props.route.params.name,
          groupId: props.route.params.groupId,
        });
      },
      cover: <AppImages.PAGEANT_DETAIL.tpp_add_pageant_small_icon />,
    },
    {
      id: 2,
      title: translations.REMOVE + ' ' + translations.CONTESTANTS,
      screen: () => {
        navigation.navigate(SCREEN.REMOVE_CONTESTANT, {
          type: '',
          groupId: groupId,
          displayData: listData,
        });
      },
      cover: <AppImages.PAGEANT_DETAIL.tpp_delete_small_icon />,
    },
    {
      id: 3,
      title: translations.EDIT_GROUP_NAME,
      screen: () => {
        navigation.navigate(SCREEN.ADD_GROUP, {
          id: GROUP.EDIT_GROUP,
          name: name,
          description: description,
          eventId: eventId,
          groupId: groupId,
          setGroupName: setGroupName,
        });
      },
      cover: <AppImages.Common.EditSmall_ICON />,
    },
  ];
  const _onChangeSearchText = val => {
    if (!!val && checkIsNull(listData)) {
      const filteredName = listData.filter(item => {
        return String(item.name).toLowerCase().match(val.trim().toLowerCase());
      });
      setSearchingList([...filteredName]);
    } else {
      setSearchingList(listData);
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
      {!isSearcing && (
        <Header
          lable={groupName}
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          rightIcon2={<AppImages.Dashboard.HeaderMenuIcon />}
          onPressRightIcon1={() => {
            setSearchingList(listData);
            setIsSearcing(true);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
          onPressRightIcon2={() => {
            setModalVisible(true);
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
              onChangeText={_onChangeSearchText}
              ref={searchRef}
            />
          </View>
        </View>
      )}
      <View
        style={{
          ...styles.subView,
          paddingHorizontal: isLoading ? moderateScale(0) : moderateScale(16),
        }}>
        <MultiSelectList
          displayData={isSearcing ? searchingList : listData}
          areSelectable={false}
          isLoading={isLoading}
          isSearching={isSearcing}
          isContestantList={true}
        />
      </View>

      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.outerview}>
          <TouchableOpacity activeOpacity={1} style={styles.innerview}>
            <FlatList
              data={popupMenuData}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              initialNumToRender={100}
              renderItem={item => (
                <TouchableOpacity
                  style={styles.cardTouch}
                  onPress={() => {
                    item.item.screen();
                    setModalVisible(false);
                  }}>
                  <View style={styles.cardRow}>
                    <View style={styles.staticCadImage}>{item.item.cover}</View>
                    <Text style={styles.staticCardLable}>
                      {item.item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default EditGroup;
