import {View, Text, GestureResponderEvent} from 'react-native';
import React, {useEffect} from 'react';
import translations from '../../../assets/translations';
import {styles} from './styles';
import Modal from 'react-native-modal';
import OvelContainer from '../ovelcontainer';
import CustomButton from '../button';
import {ScrollView} from 'react-native-gesture-handler';
import {ROLES} from '../../utils/enum';
import useAppStore, {useSetSelectedRole} from '../../../store/useAppStore';
import {REFESH_SCREEN} from '../../utils/enum';
import {useSetScreenRefresh} from '../../../store/useAppStore';
import CustomToast from '../toast';
import {
  AddedRolesListData,
  SortedRolesForPublicScreen,
} from '../../../services/models/user/user';
import DashboardHeader from '../dashboardheader';
import {color} from '../../../assets/colorConstant';

interface Props {
  isAddNewRoleModalVisible?: boolean;
  setIsAddNewRoleModalVisible: (param1: boolean) => void;
  newSelectedRole?: string;
  setNewSelectedRole: (param1: string) => void;
  addNewRoleButtonClicked: (event: GestureResponderEvent) => void;
  activeRoles?: AddedRolesListData;
  sliderIndexUpdate: any;
  roles?: SortedRolesForPublicScreen[];
  setNewSelectedRoleObject: (param1: SortedRolesForPublicScreen) => void;
  moveToDirectoryScreen: any;
  /** Match main dashboard header: back vs hamburger. */
  showBackArrow?: boolean;
}

const HeaderDropdownMenu = ({
  isAddNewRoleModalVisible,
  setIsAddNewRoleModalVisible,
  newSelectedRole,
  setNewSelectedRole,
  addNewRoleButtonClicked,
  setNewSelectedRoleObject,
  sliderIndexUpdate,
  activeRoles,
  roles,
  moveToDirectoryScreen,
  showBackArrow = false,
}: Props) => {
  const {
    storeData: {refresh},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();
  const setSelectedRole = useSetSelectedRole();

  const handleClick = (value: string) => {
    setNewSelectedRole(value);
    setSelectedRole(value);
    setIsAddNewRoleModalVisible(false);
  };

  useEffect(() => {
    if (REFESH_SCREEN.PAGEANT_ROLE_TYPE === refresh) {
      setNewSelectedRole(ROLES.PAGEANT);
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  }, [refresh]);
  const role = (roleItem: SortedRolesForPublicScreen) => {
    return (
      <OvelContainer
        lable={roleItem.role}
        conditionVar={roleItem.role === newSelectedRole}
        onPress={() => {
          handleClick(roleItem?.role);
          roleItem.role === ROLES.CONTESTANT
            ? sliderIndexUpdate(1)
            : sliderIndexUpdate(0);
          if (roleItem?.name !== undefined) {
            setNewSelectedRoleObject(roleItem);
          }
        }}
        showTick={true}
      />
    );
  };
  const getRoles = () => {
    let newRoles = roles.filter(i => {
      return i.role !== ROLES.CONTESTANT;
    });
    return newRoles;
  };
  return (
    <Modal
      isVisible={isAddNewRoleModalVisible}
      backdropOpacity={0}
      useNativeDriver={true}
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}
      onBackdropPress={() => setIsAddNewRoleModalVisible(false)}
      onBackButtonPress={() => setIsAddNewRoleModalVisible(false)}
      animationInTiming={500}
      animationOutTiming={500}
      style={{marginHorizontal: 0, backgroundColor: color.WHITE}}>
      <View style={styles.modalSafeArea}>
        <DashboardHeader
          label={newSelectedRole}
          setIsModalVisible={setIsAddNewRoleModalVisible}
          onPressLeftText={() => {
            setIsAddNewRoleModalVisible(!isAddNewRoleModalVisible);
          }}
          showMessageIcon
          onPressSearchIcon={moveToDirectoryScreen}
          isUnderLineRequired={true}
          isLeftTextClicked={isAddNewRoleModalVisible}
          showBackArrow={showBackArrow}
          onPressBack={showBackArrow ? () => {} : undefined}
        />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.chooseRole}>
            {translations.VIEW_YOUR_PROFILE_AS}
          </Text>
          {activeRoles?.pageant !== undefined &&
            role({role: activeRoles?.pageant})}
          {activeRoles?.contestant !== undefined &&
            role({role: activeRoles?.contestant})}
          {getRoles()?.map(i => {
            return role(i);
          })}
        </ScrollView>
        <View style={styles.buttonView}>
          <CustomButton
            inactive={true}
            label={translations.ADD_A_NEW_ROLE}
            onPress={addNewRoleButtonClicked}
          />
        </View>
      </View>
      <CustomToast />
    </Modal>
  );
};

export default HeaderDropdownMenu;
