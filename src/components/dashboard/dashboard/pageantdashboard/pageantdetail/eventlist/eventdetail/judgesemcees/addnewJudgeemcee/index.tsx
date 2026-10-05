import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../../../../../../common/header';
import {styles} from './styles';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../assets/translations';
import {moderateScale} from '../../../../../../../../utils/responsiveSize';
import MultiSelectList from '../../../../../../../../common/multiselectlist';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import {
  ADD_EMCEES_TO_EVENT,
  ADD_JUDGE_TO_EVENT,
  GET_REMAINING_EVENT_EMCEE,
  GET_REMAINING_EVENT_JUDGE,
} from '../../../../../../../../../services/endpoints';
import FastImageView from '../../../../../../../../common/fastimageview';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../store/useAppStore';
import {
  DIRECTORY_ID,
  JUDGES_EMCEES,
  REFESH_SCREEN,
  ROLES,
} from '../../../../../../../../utils/enum';
import {checkIsNull, onlyAlphabets} from '../../../../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {Base} from '../../../../../../../../../services/models/base';
import {GetAllJudgesEmcess} from '../../../../../../../../../services/models/pageantsData/getAllJudgesEmcess';
import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../../../services/constants';
import FloatingButton from '../../../../../../../../common/floatingbutton';
import {getIDsArrayFromArray} from '../../../../../../../../utils/helperFunction';
import WarningModel from '../../../../../../../../common/warningmodel';
import {useBackHandler} from '@react-native-community/hooks';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../common/commonalert';

const AddNewjudgeEmcee = props => {
  const setScreenRefresh = useSetScreenRefresh();
  const setLoader = useSetLoader();
  const {
    storeData: {refresh},
  } = useAppStore();
  const navigation = useNavigation();
  const {id, eventId} = props?.route?.params;
  const [judgesList, setJudgesList] = useState<GetAllJudgesEmcess[]>([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearcing, setisSearcing] = useState(false);
  const [searchingList, setSearchingList] = useState([]);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const searchRef = useRef();
  const netInfo = useNetInfo();
  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
      setisSearcing(false);
      setShowWhiteScreen(false);
    }, 500);
  }, [refresh]);
  useBackHandler(() => {
    onBack();
    return true;
  });
  const onBack = () => {
    if (isSearcing) {
      setisSearcing(false);
    } else {
      selectedArray.length > 0
        ? setIsWarningMoadlVisible(true)
        : navigation.goBack();
    }
  };

  const refreshScreen = () => {
    if (REFESH_SCREEN.ADD_JUDDGE === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      getAllJudges();
    } else if (REFESH_SCREEN.ADD_EMCEES === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      getAllEmcees();
    }
  };
  const judgeupdatedBody = {
    event_id: eventId,
    judges: getIDsArrayFromArray(selectedArray),
  };
  const emceesupdatedBody = {
    event_id: eventId,
    emcees: getIDsArrayFromArray(selectedArray),
  };
  const {mutateAsync: getAllJudgesEmcees} = useCgMutation<
    Base<GetAllJudgesEmcess[]>
  >({
    key:
      id === JUDGES_EMCEES.JUDGES
        ? GET_REMAINING_EVENT_JUDGE + eventId
        : GET_REMAINING_EVENT_EMCEE + eventId,
    method: MethodTypes.GET,
    url:
      id === JUDGES_EMCEES.JUDGES
        ? GET_REMAINING_EVENT_JUDGE + eventId
        : GET_REMAINING_EVENT_EMCEE + eventId,
    offSuccessToast: true,
  });

  const {mutateAsync: postJudgesEmcees} = useCgMutation<
    Base<GetAllJudgesEmcess[]>
  >({
    key: id === JUDGES_EMCEES.JUDGES ? ADD_JUDGE_TO_EVENT : ADD_EMCEES_TO_EVENT,
    url: id === JUDGES_EMCEES.JUDGES ? ADD_JUDGE_TO_EVENT : ADD_EMCEES_TO_EVENT,
    offSuccessToast: true,
    body: id === JUDGES_EMCEES.JUDGES ? judgeupdatedBody : emceesupdatedBody,
  });

  const getAllJudges = async () => {
    setIsLoading(true);
    const res = await getAllJudgesEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setJudgesList(res.data);
      setSearchingList(res.data);
    }
    setIsLoading(false);
  };

  const getAllEmcees = async () => {
    setIsLoading(true);
    const res = await getAllJudgesEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setJudgesList(res.data);
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
  const _renderUserItem = ({item}) => {
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
          imageUrl={item.image}
        />
        <Text style={styles.selectedText} numberOfLines={1}>
          {item.business_title}
        </Text>
      </TouchableOpacity>
    );
  };

  const _onChangeSearchText = val => {
    if (!!val && checkIsNull(judgesList)) {
      const filteredName = judgesList.filter(item => {
        return String(item.business_title)
          .toLowerCase()
          .match(onlyAlphabets(val).trim().toLowerCase());
      });
      setSearchingList([...filteredName]);
    } else {
      setSearchingList(judgesList);
    }
  };

  const _onPressFloatingButton = async () => {
    setLoader(true);
    const res = await postJudgesEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      navigation.goBack();
      navigation.goBack();

      setScreenRefresh(REFESH_SCREEN.JUDDGE_AND_EMCEES);
    }
    setIsLoading(false);
  };
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
  const moveToExpertPublicProfileScreen = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
    } else if (item !== undefined && item !== null) {
      if (item.owner_id === ROLES.ADMIN_ID) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId: item.owner_id,
          name: item.business_title,
          profileId: item.id,
          key: new Date().getMilliseconds(),
          category:
            id === JUDGES_EMCEES.JUDGES
              ? DIRECTORY_ID.JUDGE
              : DIRECTORY_ID.EMCEE,
          selectedTab: id === JUDGES_EMCEES.JUDGES ? ROLES.JUDGE : ROLES.EMCEE,
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.mainView}>
      {!isSearcing && (
        <Header
          lable={
            id === JUDGES_EMCEES.JUDGES
              ? translations.ADD_NEW_JUDGE
              : translations.ADD_NEW_EMCEES
          }
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          rightIcon2={<AppImages.PAGEANT_DETAIL.ADD_JUDGE />}
          onPressRightIcon1={() => {
            setisSearcing(true);
            setSearchingList(judgesList);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
          onPressRightIcon2={() => {
            navigation.navigate(SCREEN.ADD_NEW_JUDGE, {id: id});
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
            renderItem={_renderUserItem}
          />
        </View>
      )}
      {!isSearcing && judgesList.length !== 0 && (
        <View style={styles.textSelectedView}>
          <Text
            style={{
              ...styles.touchableText,
              marginRight: 'auto',
              opacity: selectedArray.length !== 0 ? 1 : 0.2,
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
              opacity: selectedArray.length !== judgesList.length ? 1 : 0.2,
            }}
            onPress={() => {
              setSelectedArray(judgesList);
            }}>
            {translations.SELECT_ALL}
          </Text>
        </View>
      )}

      {isSearcing && !showWhiteScreen && (
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
          <TouchableOpacity
            style={styles.addNewJudgeView}
            onPress={() => {
              navigation.navigate(SCREEN.ADD_NEW_JUDGE, {id: id});
              setTimeout(() => {
                setisSearcing(false);
              }, 450);
            }}>
            <AppImages.PAGEANT_DETAIL.tpp_add_new_judge_big_icon />
            <Text style={styles.addJudgeText}>
              {id === JUDGES_EMCEES.JUDGES
                ? translations.ADD_A_NEW_JUDGE
                : translations.ADD_NEW_EMCEES}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          ...styles.submainView,
          paddingHorizontal: isLoading ? moderateScale(0) : moderateScale(16),
        }}>
        {!showWhiteScreen && (
          <MultiSelectList
            displayData={isSearcing ? searchingList : judgesList}
            selectedArray={selectedArray}
            setSelectedArray={setSelectedArray}
            areSelectable={true}
            onClaimButtonClicked={moveToClaimProfile}
            onTextClickListener={moveToExpertPublicProfileScreen}
            isLoading={isLoading}
          />
        )}
        {!isSearcing && selectedArray.length > 0 && (
          <FloatingButton
            image={<AppImages.Common.tickIcon />}
            onPress={_onPressFloatingButton}
          />
        )}
        <WarningModel
          msg={translations.THE_SELECTED_PROFILE_WILL_NOT_BE_ADDED}
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

export default AddNewjudgeEmcee;
