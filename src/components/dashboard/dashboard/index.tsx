import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import translations from '../../../assets/translations';
import {styles} from './styles';
import DashboardHeader from '../../common/dashboardheader';
import useAppStore, {
  useSetHideShowBottomBar,
  useSetScreenRefresh,
} from '../../../store/useAppStore';
import {UserContext} from '../../../store/userStore';
import {REFESH_SCREEN, ROLES, CONTESTANT_SUB_TAB} from '../../utils/enum';
import {SCREEN} from '../../../root/screenname';
import PageantDashboard from './pageantdashboard';
import HeaderDropdownMenu from '../../common/headerdropdownmenu';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../common/commonalert';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import ContestantDashboard from './contestantdashboard';
import ExpertDashboard from './expertdashboard';
import {SortedRolesForPublicScreen} from '../../../services/models/user/user';
import {hapticFeedBack, trackScreenView} from '../../utils/helperFunction';

const Dashboard = props => {
  const {storeData} = useContext(UserContext);
  const isFocused = useIsFocused();
  const setScreenRefresh = useSetScreenRefresh();
  const [tabIndeex, setTabIndex] = useState<number>(1);
  const [isAddNewRoleModalVisible, setIsAddNewRoleModalVisible] =
    useState(false);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [newSelectedRole, setNewSelectedRole] = useState('');
  const [newSelectedRoleData, setNewSelectedRoleData] =
    useState<SortedRolesForPublicScreen>();

  const setHideBottomBar = useSetHideShowBottomBar();
  const {
    storeData: {hideBottomBar},
  } = useAppStore();

  useEffect(() => {
    if (hideBottomBar) {
      setTimeout(() => {
        setHideBottomBar(false);
      }, 100);
    }
    setIsAddNewRoleModalVisible(false);
  }, []);

  useEffect(() => {
    if (newSelectedRoleData !== undefined) {
      updateDashboardTab();
    }
  }, [newSelectedRoleData]);
  const updateDashboardTab = () => {
    if (
      newSelectedRole === ROLES.CONTESTANT &&
      props?.route?.params?.tabIndex === undefined
    ) {
      setTabIndex(1);
    } else if (props?.route?.params?.tabIndex !== undefined) {
      setTabIndex(props?.route?.params?.tabIndex);
    } else {
      setTabIndex(0);
    }
  };
  const clearParams = () => {
    navigation.setParams({
      tabIndex: undefined,
      redirectedto: undefined,
      showToast: undefined,
      openPrimaryDashbord: undefined,
      clear: true,
    });
  };

  useEffect(() => {
    if (
      (props?.route?.params?.openPrimaryDashbord !== undefined &&
        props?.route?.params?.openPrimaryDashbord &&
        isFocused &&
        storeData?.data?.user?.primary_profile_type !== undefined) ||
      (props?.route?.params?.redirectedto === undefined &&
        isFocused &&
        newSelectedRoleData === undefined)
    ) {
      setNewSelectedRole(storeData?.data?.user?.primary_profile_type);
      setRoleDataAsPerDynmaickey(storeData?.data?.user?.primary_profile_type);
    } else if (props?.route?.params?.redirectedto !== undefined && isFocused) {
      if (props?.route?.params?.redirectedto === ROLES.EXPERT) {
        storeData.data?.user.sortedAllRolesForPublicScreen.forEach(element => {
          if (
            element.role !== ROLES.PAGEANT &&
            element.role !== ROLES.CONTESTANT
          ) {
            setNewSelectedRole(element.role);
            setRoleDataAsPerDynmaickey(element.role);
          }
        });
      } else {
        setNewSelectedRole(props?.route?.params?.redirectedto);
        setRoleDataAsPerDynmaickey(props?.route?.params?.redirectedto);
      }
    }
    if (!isFocused) {
      clearParams();
    }
  }, [props?.route]);

  const setRoleDataAsPerDynmaickey = (
    val = storeData?.data?.user?.primary_profile_type,
  ) => {
    if (storeData?.data?.user?.sortedAllRolesForPublicScreen) {
      storeData?.data?.user?.sortedAllRolesForPublicScreen?.forEach(element => {
        if (val === element.role) {
          setNewSelectedRoleData(element);
        }
      });
    }
  };
  const sliderIndexUpdate = (index: number) => {
    setTabIndex(index);
    if (CONTESTANT_SUB_TAB.MY_JOURNEY === index) {
      setScreenRefresh(REFESH_SCREEN.MY_JOURNEY);
    }
  };

  const addNewRoleButtonClicked = () => {
    setIsAddNewRoleModalVisible(false);
    props.navigation.navigate(SCREEN.CHOOSE_PROFILE_WITH_BACK, {
      name: translations.DASHBOARD,
      selectedRole: newSelectedRole,
    });
    hapticFeedBack();
  };

  const moveToDirectoryScreen = () => {
    setIsAddNewRoleModalVisible(false);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      props.navigation.navigate(SCREEN.DIRECTORY);
    }
  };

  const onRoleChanges = (
    sortedRolesForPublicScreen: SortedRolesForPublicScreen,
  ) => {
    setNewSelectedRoleData(sortedRolesForPublicScreen);
    trackScreenView(
      sortedRolesForPublicScreen?.role + ' ' + translations.DASHBOARD,
    );
  };

  const showHeaderBackArrow =
    navigation.canGoBack() ||
    Boolean(navigation.getParent?.()?.canGoBack?.());

  return (
    <SafeAreaView style={styles.wrapper}>
      <DashboardHeader
        label={newSelectedRole}
        onPressLeftText={() => {
          setIsAddNewRoleModalVisible(true);
        }}
        showMessageIcon
        onPressSearchIcon={moveToDirectoryScreen}
        isUnderLineRequired={true}
        isLeftTextClicked={isAddNewRoleModalVisible}
        showBackArrow={showHeaderBackArrow}
      />
      {isAddNewRoleModalVisible && (
        <HeaderDropdownMenu
          isAddNewRoleModalVisible={isAddNewRoleModalVisible}
          setIsAddNewRoleModalVisible={setIsAddNewRoleModalVisible}
          newSelectedRole={newSelectedRole}
          setNewSelectedRole={setNewSelectedRole}
          setNewSelectedRoleObject={onRoleChanges}
          sliderIndexUpdate={sliderIndexUpdate}
          addNewRoleButtonClicked={addNewRoleButtonClicked}
          activeRoles={storeData.data?.user.addedRolesListData}
          roles={storeData.data?.user.sortedAllRolesForPublicScreen}
          moveToDirectoryScreen={moveToDirectoryScreen}
          showBackArrow={showHeaderBackArrow}
        />
      )}

      {newSelectedRole === ROLES.PAGEANT ? (
        <PageantDashboard />
      ) : newSelectedRole === ROLES.CONTESTANT ? (
        <ContestantDashboard
          sliderIndexUpdate={sliderIndexUpdate}
          tabIndeex={tabIndeex}
        />
      ) : (
        newSelectedRole !== ROLES.PAGEANT &&
        newSelectedRole !== ROLES.CONTESTANT && (
          <ExpertDashboard
            sliderIndexUpdate={sliderIndexUpdate}
            tabIndeex={tabIndeex}
            sortedRolesForPublicScreen={newSelectedRoleData}
          />
        )
      )}
    </SafeAreaView>
  );
};

export default Dashboard;
