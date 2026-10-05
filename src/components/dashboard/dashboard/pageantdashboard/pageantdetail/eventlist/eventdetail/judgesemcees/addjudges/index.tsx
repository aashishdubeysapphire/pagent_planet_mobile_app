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
  GET_ALL_EMCEES,
  GET_ALL_JUDGES,
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
import {
  checkIsNull,
  onlyAlphabets,
} from '../../../../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {Base} from '../../../../../../../../../services/models/base';
import {GetAllJudgesEmcess} from '../../../../../../../../../services/models/pageantsData/getAllJudgesEmcess';
import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../../../services/constants';
import {useBackHandler} from '@react-native-community/hooks';
import FloatingButton from '../../../../../../../../common/floatingbutton';
import {getIDsArrayFromArray} from '../../../../../../../../utils/helperFunction';
import WarningModel from '../../../../../../../../common/warningmodel';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../common/commonalert';

const AddJudges = props => {
  const setScreenRefresh = useSetScreenRefresh();
  const setLoader = useSetLoader();
  const {
    storeData: {refresh},
  } = useAppStore();
  const navigation = useNavigation();
  const searchRef = useRef();
  const netInfo = useNetInfo();
  const {id, eventId} = props?.route?.params;
  const [judgesList, setJudgesList] = useState<GetAllJudgesEmcess[]>([]);
  const [selectedJudgeArray, setSelectedJudgeArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearcing, setisSearcing] = useState(false);
  const [searchingList, setSearchingList] = useState([]);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
      setisSearcing(false);
      setShowWhiteScreen(false);
    }, 500);
  }, [refresh]);

  const onBack = () => {
    if (isSearcing) {
      setisSearcing(false);
    } else {
      selectedJudgeArray.length > 0
        ? setIsWarningMoadlVisible(true)
        : navigation.goBack();
    }
  };
  useBackHandler(() => {
    onBack();
    return true;
  });

  const judgeupdatedBody = {
    event_id: eventId,
    judges: getIDsArrayFromArray(selectedJudgeArray),
  };
  const emceesupdatedBody = {
    event_id: eventId,
    emcees: getIDsArrayFromArray(selectedJudgeArray),
  };
  const {mutateAsync: getAllJudgesEmcees} = useCgMutation<
    Base<GetAllJudgesEmcess[]>
  >({
    key: id === JUDGES_EMCEES.JUDGES ? GET_ALL_JUDGES : GET_ALL_EMCEES,
    method: MethodTypes.GET,
    url: id === JUDGES_EMCEES.JUDGES ? GET_ALL_JUDGES : GET_ALL_EMCEES,
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

  const onPressCircleCard = item => {
    const filterArray = selectedJudgeArray.filter(i => {
      return selectedJudgeArray.indexOf(i) !== selectedJudgeArray.indexOf(item);
    });
    setSelectedJudgeArray(filterArray);
  };

  const refreshScreen = () => {
    if (REFESH_SCREEN.ADD_JUDDGE === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      hitGetAllJudges();
    } else if (REFESH_SCREEN.ADD_EMCEES === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      hitGetAllEmcees();
    }
  };

  const hitGetAllJudges = async () => {
    setIsLoading(true);
    const res = await getAllJudgesEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setJudgesList(res.data);
      setSearchingList(res.data);
    }
    setIsLoading(false);
  };

  const hitGetAllEmcees = async () => {
    setIsLoading(true);
    const res = await getAllJudgesEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setJudgesList(res.data);
      setSearchingList(res.data);
    }
    setIsLoading(false);
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.pinkUserRoundImage}
        activeOpacity={0.5}
        onPress={() => onPressCircleCard(item)}>
        <View style={styles.crossView}>
          <AppImages.CreateContestentProfile.tpp_cross_small_icon />
        </View>
        <FastImageView
          width={moderateScale(40)}
          height={moderateScale(40)}
          isCircle
          borderRadius={200}
          imageUrl={item.image}
        />
        <Text style={styles.selectedText} numberOfLines={1}>
          {item.business_title}
        </Text>
      </TouchableOpacity>
    );
  };

  const _onSearchText = val => {
    setSearchText(onlyAlphabets(val));
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

  /**
   * MoveToExpertPublicProfileScreen is a function that takes in an item as a parameter and returns
   * nothing
   * @param {any} item - any - This is the item that is being passed to the function.
   */
  const moveToExpertPublicProfileScreen = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
    } else if (item !== undefined && item !== null) {
      //If valid detail
      if (item.owner_id === ROLES.ADMIN_ID) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        //move to expert profile
        redirectToExpertPublicPage(item);
      }
    }
  };

  const redirectToExpertPublicPage = item => {
    navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
      roleId: item.owner_id,
      profileId: item.id,
      key: new Date().getMilliseconds(),
      name: item.business_title,
      category:
        id === JUDGES_EMCEES.JUDGES ? DIRECTORY_ID.JUDGE : DIRECTORY_ID.EMCEE,
      selectedTab: id === JUDGES_EMCEES.JUDGES ? ROLES.JUDGE : ROLES.EMCEE,
    });
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
        slug: item?.slug,
        role: item?.role,
      });
    }
  };

  const _onPressFloatingButton = async () => {
    setLoader(true);
    const res = await postJudgesEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      navigation.goBack();
      setScreenRefresh(REFESH_SCREEN.JUDDGE_AND_EMCEES);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={styles.mainView}>
      {!isSearcing && (
        <Header
          lable={
            id === JUDGES_EMCEES.JUDGES
              ? translations.ADD_JUDGES
              : translations.ADD + ' ' + translations.EMCEES
          }
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          rightIcon2={<AppImages.PAGEANT_DETAIL.ADD_JUDGE />}
          onPressRightIcon1={() => {
            setSearchingList(judgesList);
            setisSearcing(true);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
          onPressRightIcon2={() => {
            navigation.navigate(SCREEN.ADD_NEW_JUDGE, {id: id});
          }}
          onPressBack={() => {
            selectedJudgeArray.length > 0
              ? setIsWarningMoadlVisible(true)
              : navigation.goBack();
          }}
          isUnderLineRequired
        />
      )}

      {selectedJudgeArray.length > 0 && !isSearcing && (
        <View style={styles.selectedList}>
          <FlatList
            data={selectedJudgeArray}
            horizontal={true}
            initialNumToRender={100}
            renderItem={_renderItem}
          />
        </View>
      )}
      {!isSearcing && (
        <View style={styles.textView}>
          <Text
            style={{
              ...styles.touchableText,
              marginRight: 'auto',
              opacity: selectedJudgeArray.length !== 0 ? 1 : 0.2,
            }}
            onPress={() => {
              setSelectedJudgeArray([]);
            }}>
            {translations.SELECT_NON}
          </Text>

          {selectedJudgeArray.length > 0 && (
            <Text style={styles.textcenter}>
              {selectedJudgeArray.length}
              {translations.CAPITAL_SELECTED}
            </Text>
          )}
          <Text
            style={{
              ...styles.touchableText,
              marginLeft: 'auto',
              opacity:
                selectedJudgeArray.length !== judgesList.length ? 1 : 0.2,
            }}
            onPress={() => {
              setSelectedJudgeArray(judgesList);
            }}>
            {translations.SELECT_ALL}
          </Text>
        </View>
      )}

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
              ref={searchRef}
              style={styles.searchTextInput}
              value={searchText}
              onChangeText={_onSearchText}
            />
          </View>
          <TouchableOpacity
            style={styles.addNewJudgeView}
            onPress={() => {
              navigation.navigate(SCREEN.ADD_NEW_JUDGE, {
                id: id,
              });
              setTimeout(() => {
                setisSearcing(false);
              }, 400);
            }}>
            <AppImages.PAGEANT_DETAIL.tpp_add_new_judge_big_icon />
            <Text style={styles.addJudge}>
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
            selectedArray={selectedJudgeArray}
            setSelectedArray={setSelectedJudgeArray}
            areSelectable={true}
            onClaimButtonClicked={moveToClaimProfile}
            onTextClickListener={moveToExpertPublicProfileScreen}
            isLoading={isLoading}
          />
        )}
        {!isSearcing && selectedJudgeArray.length > 0 && (
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

export default AddJudges;
