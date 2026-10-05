import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import SelectCategory from '../../../../../../../common/selectcategory';
import translations from '../../../../../../../../assets/translations';
import {
  DIRECTORY_ID,
  JUDGES_EMCEES,
  REFESH_SCREEN,
  ROLES,
} from '../../../../../../../utils/enum';
import AppImages from '../../../../../../../../assets/images/AppImages';
import { useNavigation } from '@react-navigation/core';
import { SCREEN } from '../../../../../../../../root/screenname';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import { Base } from '../../../../../../../../services/models/base';
import { GetAllJudgesEmcess } from '../../../../../../../../services/models/pageantsData/getAllJudgesEmcess';
import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../../services/constants';
import {
  GET_EVENT_EMCEES_LIST,
  GET_EVENT_JUDGES_LIST,
} from '../../../../../../../../services/endpoints';
import MultiSelectList from '../../../../../../../common/multiselectlist';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../../utils/responsiveSize';
import AddFirstRecord from '../../../../../../../common/addfirstrecord';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../common/commonalert';
import { useNetInfo } from '@react-native-community/netinfo';
import { createFirebaseLog, trackScreenView } from '../../../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../../../assets/translations/analyticsscreenname';

interface Props {
  eventId: number | undefined;
  isFlatListScroolEnable?: boolean;
  isReadOlny?: boolean;
  forPublicPage?: boolean;
}

const EventJudgesEmcees = ({
  eventId,
  isFlatListScroolEnable,
  isReadOlny = false,
  forPublicPage = false,
}: Props) => {
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const internetStateInfo = useNetInfo();
  const {
    storeData: { refresh },
  } = useAppStore();
  const [isActive, setIsActive] = useState(JUDGES_EMCEES.JUDGES);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const [seletedEmcees, setseletedEmcees] = useState([]);
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
    }, 500);
  }, [refresh]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_JUDGE_EMCEES);
  }, []);
  const refreshScreen = () => {
    if (REFESH_SCREEN.JUDDGE_AND_EMCEES === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      hitGetselectedJudges();
      hitGetselectedEmcees();
      setShowWhiteScreen(false);
    }
  };

  const list = [
    {
      lable: JUDGES_EMCEES.JUDGES,
    },
    {
      lable: JUDGES_EMCEES.EMCEES,
    },
  ];

  const { mutateAsync: getselectedJudges } = useCgMutation<
    Base<GetAllJudgesEmcess[]>
  >({
    key: GET_EVENT_JUDGES_LIST,
    method: MethodTypes.GET,
    url: GET_EVENT_JUDGES_LIST + eventId,
    offSuccessToast: true,
  });
  const { mutateAsync: getselectedEmcees } = useCgMutation<
    Base<GetAllJudgesEmcess[]>
  >({
    key: GET_EVENT_EMCEES_LIST,
    method: MethodTypes.GET,
    url: GET_EVENT_EMCEES_LIST + eventId,
    offSuccessToast: true,
  });

  const hitGetselectedJudges = async () => {
    createFirebaseLog(hitGetselectedJudges.name, EventJudgesEmcees.name, false);
    setIsLoading(true);
    const res = await getselectedJudges();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setSelectedJudges(res.data);
    }
    setIsLoading(false);
  };
  const hitGetselectedEmcees = async () => {
    createFirebaseLog(hitGetselectedEmcees.name, EventJudgesEmcees.name, false);
    setIsLoading(true);
    const res = await getselectedEmcees();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setseletedEmcees(res.data);
    }
    setIsLoading(false);
  };

  /**
   * This function is used to navigate to the Expert Public Profile screen
   * @param {any} item - any - This is the item that is being passed to the function.
   */
  const moveToExpertPublicProfileScreen = (item: any) => {
    createFirebaseLog(moveToExpertPublicProfileScreen.name, EventJudgesEmcees.name, false);
    if (
      !internetStateInfo.isConnected &&
      !internetStateInfo.isInternetReachable
    ) {
      internetState(internetStateInfo.isConnected!!);
      return internetStateInfo.isConnected;
    } else if (item !== undefined && item !== null) {
      if (item.owner_id === ROLES.ADMIN_ID) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          key: new Date().getMilliseconds(),
          category:
            isActive === JUDGES_EMCEES.JUDGES
              ? DIRECTORY_ID.JUDGE
              : DIRECTORY_ID.EMCEE,
          roleId: item.owner_id,
          profileId: item.id,
          name: item.business_title,
          selectedTab:
            isActive === JUDGES_EMCEES.JUDGES ? ROLES.JUDGE : ROLES.EMCEE,
        });
      }
    }
  };

  const moveToClaimProfile = (item: any) => {
    createFirebaseLog(moveToClaimProfile.name, EventJudgesEmcees.name, false);
    if (
      !internetStateInfo.isConnected &&
      !internetStateInfo.isInternetReachable
    ) {
      internetState(internetStateInfo.isConnected!!);
      return false;
    } else if (item !== undefined) {
      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.BUSINESS,
        slug: item?.slug,
        role: item?.role,
      });
    }
  };

  const JudgesEmceesView = ({
    lable = '',
    onPressAdd = () => { },
    listData = [],
    length = 0,
  }) => {

    createFirebaseLog(JudgesEmceesView.name, EventJudgesEmcees.name, false);
    if (isLoading) {
      return (
        <>
          <View style={styles.topHeight} />
          <ShimmerList
            width={Dimensions.get('window').width / 2 - moderateScale(24)}
            height={moderateScaleVertical(189)}
            padding={15}
            numColumns={2}
          />
        </>
      );
    } else {
      if (listData.length > 0) {
        return (
          <View style={styles.mainView}>
            {!isReadOlny ? (
              <View
                style={{
                  ...styles.headingContainer,
                  marginBottom: moderateScaleVertical(16),
                }}>
                <Text style={styles.subHeading}>
                  {translations.EDIT} {lable}
                </Text>
                <TouchableOpacity onPress={onPressAdd}>
                  <AppImages.Dashboard.edit_ICON />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.topHeight} />
            )}

            <MultiSelectList
              displayData={listData}
              areSelectable={false}
              isLoading={isLoading}
              onClaimButtonClicked={moveToClaimProfile}
              onTextClickListener={moveToExpertPublicProfileScreen}
              showRatings={true}
              isReadOlny={isReadOlny}
              isFlatListScroolEnable={isFlatListScroolEnable}
            />
          </View>
        );
      } else {
        if (forPublicPage && !showWhiteScreen) {
          return getEmptyView();
        }
        return (
          !isReadOlny && (
            <AddFirstRecord
              label={translations.ADD + ' ' + lable}
              onPress={onPressAdd}
              bodyText={
                isActive === JUDGES_EMCEES.JUDGES
                  ? 'No Judge Added'
                  : 'No Emcee Added'
              }
            />
          )
        );
      }
    }
  };
  const onPressAddEditJudge = () => {

    createFirebaseLog(onPressAddEditJudge.name, EventJudgesEmcees.name, false);
    if (!isLoading) {
      if (selectedJudges.length > 0) {
        navigation.navigate(SCREEN.EDIT_JUDGES_EMCEES, {
          eventId: eventId,
          type: JUDGES_EMCEES.JUDGES,
          displayData: selectedJudges,
        });
      } else {
        navigation.navigate(SCREEN.ADD_JUDGES, {
          id: JUDGES_EMCEES.JUDGES,
          eventId: eventId,
        });
        setScreenRefresh(REFESH_SCREEN.ADD_JUDDGE);
      }
    }
  };
  const onPressAddEditEncees = () => {

    createFirebaseLog(onPressAddEditEncees.name, EventJudgesEmcees.name, false);
    if (!isLoading) {
      if (seletedEmcees.length > 0) {
        navigation.navigate(SCREEN.EDIT_JUDGES_EMCEES, {
          eventId: eventId,
          type: JUDGES_EMCEES.EMCEES,
          displayData: seletedEmcees,
        });
      } else {
        navigation.navigate(SCREEN.ADD_JUDGES, {
          id: JUDGES_EMCEES.EMCEES,
          eventId: eventId,
        });
        setScreenRefresh(REFESH_SCREEN.ADD_EMCEES);
      }
    }
  };
  const getEmptyView = () => {

    createFirebaseLog(getEmptyView.name, EventJudgesEmcees.name, false);
    return (
      <Image
        style={styles.noDataImg}
        source={AppImages.PUBLIC_PROFILE.noJudgeEmcee}
      />
    );
  };
  return (
    <View style={styles.tabContainer}>
      <View style={styles.mainView}>
        <SelectCategory
          isActive={isActive}
          setIsActive={setIsActive}
          list={list}
        />
      </View>
      {!showWhiteScreen &&
        (isActive === JUDGES_EMCEES.JUDGES ? (
          <>
            <JudgesEmceesView
              lable={translations.JUDGES}
              onPressAdd={onPressAddEditJudge}
              listData={selectedJudges}
              length={selectedJudges.length}
            />
          </>
        ) : (
          <>
            <JudgesEmceesView
              lable={translations.EMCEES}
              onPressAdd={onPressAddEditEncees}
              listData={seletedEmcees}
              length={seletedEmcees.length}
            />
          </>
        ))}
      <View style={styles.bottomHeight} />
    </View>
  );
};

export default EventJudgesEmcees;
