import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../../../../common/header';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../assets/translations';
import {
  DIRECTORY_ID,
  JUDGES_EMCEES,
  REFESH_SCREEN,
  ROLES,
} from '../../../../../../../../utils/enum';
import MultiSelectList from '../../../../../../../../common/multiselectlist';
import {checkIsNull, onlyAlphabets} from '../../../../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {useSetScreenRefresh} from '../../../../../../../../../store/useAppStore';
import {useBackHandler} from '@react-native-community/hooks';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
const EditJugesEmcees = props => {
  const {type, eventId, displayData} = props?.route?.params;
  const [isSearcing, setIsSearcing] = useState(false);
  const [searchingList, setSearchingList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();
  const searchRef = useRef();
  const navigation = useNavigation();

  const netInfo = useNetInfo();
  useBackHandler(() => {
    if (isSearcing) {
      setIsSearcing(false);

      return true;
    }
    // let the default thing happen
    return false;
  });
  const popupMenuData = [
    {
      id: 1,
      title: translations.ADD_NEW,
      screen: () => {
        if (type === JUDGES_EMCEES.JUDGES) {
          setScreenRefresh(REFESH_SCREEN.ADD_JUDDGE);
        } else {
          setScreenRefresh(REFESH_SCREEN.ADD_EMCEES);
        }
        navigation.navigate(SCREEN.ADD_NEW_JUDGE_EMCEE, {
          id: type,
          eventId: eventId,
        });
      },
      cover: <AppImages.PAGEANT_DETAIL.tpp_add_pageant_small_icon />,
    },
    {
      id: 2,
      title: translations.REMOVE + ' ',
      screen: () => {
        navigation.navigate(SCREEN.REMOVE_JUDGES_EMCEES, {
          type: type,
          eventId: eventId,
          displayData: displayData,
        });
      },
      cover: <AppImages.PAGEANT_DETAIL.tpp_delete_small_icon />,
    },
  ];

  /**
   * The function takes in an item as a parameter and if the item is not undefined, it navigates to the
   * Claim Profile screen
   * @param {any} item - any - This is the item that is passed to the function.
   */
  const moveToClaimProfileScreen = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (item !== undefined) {
      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.BUSINESS,
        slug: item?.slug,
        role: item?.role,
      });
    }
  };

  const _onChangeSearchText = val => {
    if (!!val && checkIsNull(displayData)) {
      const filteredName = displayData.filter(item => {
        return String(item.business_title)
          .toLowerCase()
          .match(onlyAlphabets(val).trim().toLowerCase());
      });
      setSearchingList([...filteredName]);
    } else {
      setSearchingList(displayData);
    }
  };

  /**
   * It navigates to the ExpertPublicProfileScreen if the user is connected to the internet and the item
   * is not null or undefined
   * @param {any} item - any - This is the item that is being passed to the function.
   */
  const moveToExpertPublicProfile = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
    } else if (item !== undefined && item !== null) {
      if (item.owner_id === ROLES.ADMIN_ID) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId: item.owner_id,
          profileId: item.id,
          key: new Date().getMilliseconds(),
          name: item.business_title,
          category:
            type === JUDGES_EMCEES.JUDGES
              ? DIRECTORY_ID.JUDGE
              : DIRECTORY_ID.EMCEE,
          selectedTab:
            type === JUDGES_EMCEES.JUDGES ? ROLES.JUDGE : ROLES.EMCEE,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
      {!isSearcing && (
        <Header
          lable={
            type === JUDGES_EMCEES.JUDGES
              ? translations.EDIT + ' ' + translations.JUDGES
              : translations.EDIT + ' ' + translations.EMCEES
          }
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          rightIcon2={<AppImages.Dashboard.HeaderMenuIcon />}
          onPressRightIcon1={() => {
            setSearchingList(displayData);
            setIsSearcing(true);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
          onPressRightIcon2={() => {
            setModalVisible(true);
          }}
          onPressBack={() => {
            navigation.goBack();
          }}
          isUnderLineRequired
        />
      )}
      {isSearcing && (
        <View>
          <View style={styles.searchingViewcontainer}>
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
      <View style={styles.subViewContainer}>
        <MultiSelectList
          displayData={isSearcing ? searchingList : displayData}
          areSelectable={false}
          onClaimButtonClicked={moveToClaimProfileScreen}
          onTextClickListener={moveToExpertPublicProfile}
          isLoading={false}
        />
      </View>

      <Modal
        statusBarTranslucent={true}
        transparent={true}
        animationType="fade"
        visible={modalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.outerview}>
          <TouchableOpacity activeOpacity={1} style={styles.innerview}>
            <FlatList
              data={popupMenuData}
              showsVerticalScrollIndicator={false}
              initialNumToRender={100}
              keyExtractor={item => item.id.toString()}
              renderItem={item => (
                <TouchableOpacity
                  style={styles.cardTouch}
                  onPress={() => {
                    item.item.screen();
                    setModalVisible(false);
                  }}>
                  <View style={styles.cardRow}>
                    <View style={styles.staticCardImage}>
                      {item.item.cover}
                    </View>
                    <Text style={styles.staticCardLable}>
                      {item.item.title}
                      {type === JUDGES_EMCEES.JUDGES
                        ? translations.JUDGES
                        : translations.EMCEES}
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

export default EditJugesEmcees;
