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
import translations from '../../../../../../../../../assets/translations';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import Header from '../../../../../../../../common/header';
import {
  DIRECTORY_ID,
  JUDGES_EMCEES,
  REFESH_SCREEN,
  ROLES,
} from '../../../../../../../../utils/enum';
import FastImageView from '../../../../../../../../common/fastimageview';
import MultiSelectList from '../../../../../../../../common/multiselectlist';
import {
  checkIsNull,
  onlyAlphabets,
} from '../../../../../../../../utils/validations';
import {moderateScale} from '../../../../../../../../utils/responsiveSize';
import FloatingButton from '../../../../../../../../common/floatingbutton';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import {
  GET_EVENT_EMCEES_LIST,
  GET_EVENT_JUDGES_LIST,
  REMOVE_EMCEES_FORM_EVENT,
  REMOVE_JUDGES_FORM_EVENT,
} from '../../../../../../../../../services/endpoints';
import {getIDsArrayFromArray} from '../../../../../../../../utils/helperFunction';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../store/useAppStore';
import {useNavigation} from '@react-navigation/core';
import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../../../services/constants';
import WarningModel from '../../../../../../../../common/warningmodel';
import {useBackHandler} from '@react-native-community/hooks';
import {Base} from '../../../../../../../../../services/models/base';
import {GetAllJudgesEmcess} from '../../../../../../../../../services/models/pageantsData/getAllJudgesEmcess';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';

const RemoveJudgesEmcees = props => {
  const {type, eventId, displayData} = props?.route?.params;
  const [isSearcing, setIsSearcing] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [searchingList, setSearchingList] = useState([]);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const [deleteCOnfiramtionModalVisible, setDeleteCOnfiramtionModalVisible] =
    useState(false);

  const netInfo = useNetInfo();
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const searchRef = useRef();

  useBackHandler(() => {
    onBack();
    return true;
  });

  const onBack = () => {
    if (isSearcing) {
      setIsSearcing(false);
    } else {
      selectedArray.length > 0
        ? setIsWarningMoadlVisible(true)
        : navigation.goBack();
    }
    return true;
  };
  const judgeupdatedBody = {
    event_id: eventId,
    judges: getIDsArrayFromArray(selectedArray),
  };
  const emceesupdatedBody = {
    event_id: eventId,
    emcees: getIDsArrayFromArray(selectedArray),
  };

  const {mutateAsync: getselectedJudgesEmcees} = useCgMutation<
    Base<GetAllJudgesEmcess[]>
  >({
    key:
      type === JUDGES_EMCEES.JUDGES
        ? GET_EVENT_JUDGES_LIST
        : GET_EVENT_EMCEES_LIST,
    method: MethodTypes.GET,

    url:
      type === JUDGES_EMCEES.JUDGES
        ? GET_EVENT_JUDGES_LIST + eventId
        : GET_EVENT_EMCEES_LIST + eventId,
    offSuccessToast: true,
  });

  const {mutateAsync: removeJudgesEmcees} = useCgMutation({
    key:
      type === JUDGES_EMCEES.JUDGES
        ? REMOVE_JUDGES_FORM_EVENT
        : REMOVE_EMCEES_FORM_EVENT,
    url:
      type === JUDGES_EMCEES.JUDGES
        ? REMOVE_JUDGES_FORM_EVENT
        : REMOVE_EMCEES_FORM_EVENT,
    body: type === JUDGES_EMCEES.JUDGES ? judgeupdatedBody : emceesupdatedBody,
  });
  const _renderItemUser = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.pinkCircleImage}
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
          imageUrl={item.image}
        />
        <Text style={styles.selectedTitel} numberOfLines={1}>
          {item.business_title}
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
   * The function takes in an item as a parameter and if the item is not undefined, it navigates to the
   * claim profile screen
   * @param {any} item - any - This is the item that is passed to the function.
   */
  const moveToClaimProfile = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (item !== undefined) {
      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.BUSINESS,
        role: item?.role,
        slug: item?.slug,
      });
    }
  };

  const _onPressFloatingButton = async () => {
    setLoader(true);
    const res = await removeJudgesEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setScreenRefresh(REFESH_SCREEN.JUDDGE_AND_EMCEES);
      const res = await getselectedJudgesEmcees();
      if (res.success || res.status_code === ApiStatusType.Success) {
        type === JUDGES_EMCEES.JUDGES
          ? navigation.navigate(SCREEN.EDIT_JUDGES_EMCEES, {
              eventId: eventId,
              type: JUDGES_EMCEES.JUDGES,
              displayData: res.data,
            })
          : navigation.navigate(SCREEN.EDIT_JUDGES_EMCEES, {
              eventId: eventId,
              type: JUDGES_EMCEES.EMCEES,
              displayData: res.data,
            });

        res.data?.length === 0 && navigation.goBack();
      }
    }
    setLoader(false);
  };

  const moveToExpertPublicProfileScreen = (item: any) => {
    //check internet state.
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
    } else if (item !== undefined && item !== null) {
      if (item.owner_id === ROLES.ADMIN_ID) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          category:
            type === JUDGES_EMCEES.JUDGES
              ? DIRECTORY_ID.JUDGE
              : DIRECTORY_ID.EMCEE,
          selectedTab:
            type === JUDGES_EMCEES.JUDGES ? ROLES.JUDGE : ROLES.EMCEE,
          roleId: item.owner_id,
          key: new Date().getMilliseconds(),
          name: item.business_title,
          profileId: item.id,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainView}>
      {!isSearcing && (
        <Header
          isUnderLineRequired
          lable={
            type === JUDGES_EMCEES.JUDGES
              ? translations.REMOVE + ' ' + translations.JUDGES
              : translations.REMOVE + ' ' + translations.EMCEES
          }
          onPressBack={() => {
            selectedArray.length > 0
              ? setIsWarningMoadlVisible(true)
              : navigation.goBack();
          }}
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          onPressRightIcon1={() => {
            setSearchingList(displayData);
            setIsSearcing(true);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
        />
      )}
      {isSearcing && (
        <View>
          <View style={styles.searchingViewContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsSearcing(false);
              }}>
              <AppImages.Common.crossIcon />
            </TouchableOpacity>
            <TextInput
              ref={searchRef}
              placeholder={translations.SEARCH_HERE}
              style={styles.searchTextInput}
              onChangeText={_onChangeSearchText}
            />
          </View>
        </View>
      )}

      {selectedArray.length > 0 && !isSearcing && (
        <View style={styles.selectedList}>
          <FlatList
            data={selectedArray}
            initialNumToRender={100}
            renderItem={_renderItemUser}
            horizontal={true}
          />
        </View>
      )}

      {!isSearcing && displayData.length !== 0 && (
        <View style={styles.textView}>
          <Text
            style={{
              ...styles.touchableText,
              opacity: selectedArray.length !== 0 ? 1 : 0.2,
              marginRight: 'auto',
            }}
            onPress={() => {
              setSelectedArray([]);
            }}>
            {translations.SELECT_NON}
          </Text>

          {selectedArray.length > 0 && (
            <Text style={styles.selectTextCenter}>
              {selectedArray.length}
              {translations.CAPITAL_SELECTED}
            </Text>
          )}
          <Text
            style={{
              ...styles.touchableText,
              marginLeft: 'auto',
              opacity: selectedArray.length !== displayData.length ? 1 : 0.2,
            }}
            onPress={() => {
              setSelectedArray(displayData);
            }}>
            {translations.SELECT_ALL}
          </Text>
        </View>
      )}
      <View style={styles.subView}>
        <MultiSelectList
          displayData={isSearcing ? searchingList : displayData}
          selectedArray={selectedArray}
          setSelectedArray={setSelectedArray}
          areSelectable={true}
          onClaimButtonClicked={moveToClaimProfile}
          onTextClickListener={moveToExpertPublicProfileScreen}
          isLoading={false}
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
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_PROFILE}
        isModalVisible={deleteCOnfiramtionModalVisible}
        setConfirm={() => {
          _onPressFloatingButton();
        }}
        setIsModalVisible={setDeleteCOnfiramtionModalVisible}
        headingStyle={styles.modalHeading}
      />

      <WarningModel
        msg={translations.THE_SELECTED_PROFILE_WILL_NOT_BE_REMOVED}
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

export default RemoveJudgesEmcees;
