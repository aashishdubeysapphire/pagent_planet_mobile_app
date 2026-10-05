import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import {styles} from './styles';
import {DrawerActions} from '@react-navigation/native';
import {color} from '../../../assets/colorConstant';
import {useSetSelectedRole} from '../../../store/useAppStore';
import CartNotication from '../cartnotification';
import {UserContext} from '../../../store/userStore';
import {emptyFunction} from '../../utils/helperFunction';

interface Props {
  label?: string | null;
  rightText: string;
  onPressLeftText: Function;
  onPressSearchIcon: Function;
  isUnderLineRequired: boolean;
  isLeftTextClicked?: boolean;
  onPressDrawer: Function;
  showCart: boolean;
  showMessageIcon: boolean;
  setIsModalVisible: Function;
  /** When true, shows a back arrow instead of the drawer hamburger. */
  showBackArrow?: boolean;
  /** Used when `showBackArrow` is true; defaults to `navigation.goBack()` after closing modals. */
  onPressBack?: () => void;
}

const DashboardHeader = ({
  label: lable = '',
  isUnderLineRequired,
  onPressLeftText = emptyFunction,
  onPressSearchIcon = emptyFunction,
  isLeftTextClicked = false,
  onPressDrawer = emptyFunction,
  showCart = false,
  showMessageIcon = false,
  setIsModalVisible = emptyFunction,
  showBackArrow = false,
  onPressBack,
}: Props) => {
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();

  const setSelectedRole = useSetSelectedRole();
  useEffect(() => {
    setSelectedRole(lable);
  }, [lable]);

  const handleBackPress = () => {
    setIsModalVisible(false);
    if (onPressBack) {
      onPressBack();
    } else {
      navigation.goBack();
    }
  };

  const renderLeadingControl = () => {
    if (showBackArrow) {
      return (
        <TouchableOpacity onPress={handleBackPress}>
          <AppImages.Common.Back_ICON style={styles.backIcon} />
        </TouchableOpacity>
      );
    }
    if (storeData?.data?.user != null) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
            // onPressDrawer();
            setSelectedRole(lable);
            setIsModalVisible(false);
          }}>
          <AppImages.Dashboard.HeaderSideBarIcon style={styles.drawerIcon} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.space} />;
  };

  return (
    <>
      <View style={styles.container}>
        {renderLeadingControl()}

        {lable === null ? (
          <View style={styles.logoArea}>
            <AppImages.Dashboard.headerLogo_ICON />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              onPressLeftText();
            }}
            style={styles.lableStyle}>
            {isLeftTextClicked ? (
              <>
                <Text style={{...styles.lableStyle, color: color.P_PINK}}>
                  {lable || "Welcome"}
                </Text>
                <AppImages.EditProfile.Tpp_dropdown_pink
                  style={styles.dropIcon}
                />
              </>
            ) : (
              <>
                <Text style={styles.lableStyle}>{lable || "Welcome"}</Text>
                <AppImages.Dashboard.HeaderDropdownIcon
                  style={styles.dropIcon}
                />
              </>
            )}
          </TouchableOpacity>
        )}

        <View style={styles.iconView}>
          {showMessageIcon && storeData?.data?.user != null ? (
            <CartNotication isMessage={showMessageIcon} />
          ) : (
            storeData?.data?.user != null && (
              <TouchableOpacity onPress={onPressSearchIcon}>
                <AppImages.Dashboard.HeaderSearchIcon
                  style={styles.otherIcon}
                />
              </TouchableOpacity>
            )
          )}

          {storeData?.data?.user != null && (
            <CartNotication
              isNotifiction={true}
              setIsModalVisible={setIsModalVisible}
            />
          )}

          <CartNotication isNotifiction={showCart} />
        </View>
      </View>
      {isUnderLineRequired ? <View style={styles.bottomLine} /> : <View />}
    </>
  );
};

export default DashboardHeader;
