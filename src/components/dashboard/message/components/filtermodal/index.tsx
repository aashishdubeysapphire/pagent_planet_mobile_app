import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import {color} from '../../../../../assets/colorConstant';
import {checkIsConnected, isIosDevice, openWebLink} from '../../../../utils/helperFunction';
import {CONTACT_US_LINK} from '../../../../../services/staticWebUrl';
import {MESSAGE_MENU} from '../../../../utils/enum';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {font} from '../../../../../assets/fonts/fontsConstant';

interface Props {
  modalVisible: boolean;
  setModalVisible: Function;
  type: string;
  menuList: any;
  selectedFilterItem?: number;
  setSelectedFilterItem?: Function;
  setDeleteClicked?: Function;
  disableDelete?: boolean;
}

const FilterModal = ({
  modalVisible,
  setModalVisible,
  type,
  menuList,
  selectedFilterItem,
  setSelectedFilterItem,
  setDeleteClicked,
  disableDelete,
}: Props) => {
  const navigation = useNavigation();

  const onManageNotificationClick = () => {
    if (checkIsConnected()) {
      navigation.navigate(SCREEN.MANAGE_NOTIFICATION);
    }
  };

  const onItemClick = (i: number, id: number) => {
    if (type === translations.FILTER && setSelectedFilterItem !== undefined) {
      setSelectedFilterItem(i);
    } else {
      if (
        id === MESSAGE_MENU.DELETE &&
        !disableDelete &&
        setDeleteClicked !== undefined
      ) {
        setDeleteClicked(true);
      } else if (id === MESSAGE_MENU.MANANGE_NOTIFICATION) {
        onManageNotificationClick();
      } else if (id === MESSAGE_MENU.CONTACT_US) {
        openWebLink(CONTACT_US_LINK);
      }
    }
    setModalVisible(false);
  };

  const isItemSelected = (indx: number) => {
    return selectedFilterItem === indx && type === translations.FILTER;
  };

  const getTopLength = (typ: string) => {
    if (typ === translations.FILTER) {
      if (isIosDevice()) {
        return moderateScaleVertical(145);
      } else {
        return moderateScaleVertical(135);
      }
    } else {
      if (isIosDevice()) {
        return moderateScaleVertical(95);
      } else {
        return moderateScaleVertical(85);
      }
    }
  };

  const getOpacity = (ids: number, types: string) => {
    if (types !== translations.FILTER) {
      if (ids === MESSAGE_MENU.DELETE && disableDelete) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}
      visible={modalVisible}>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={{
          ...styles.outerview,
          backgroundColor:
            type === translations.FILTER
              ? color.SHADOW_COLOR_LIGHT
              : color.TRANSPARENT,
        }}
        activeOpacity={0}>
        <TouchableOpacity
          style={{
            ...styles.innerview,
            top: getTopLength(type),
          }}>
          {menuList.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.cardTouch,
                  opacity: getOpacity(item?.id, type) ? 0.4 : 1,
                }}
                onPress={() => onItemClick(index, item?.id)}
                disabled={getOpacity(item?.id, type)}>
                {type === translations.THREEDOT_MENU && (
                  <View style={{marginRight: moderateScale(8)}}>
                    {item?.icon}
                  </View>
                )}
                <Text
                  style={{
                    ...styles.menuLable,
                    color: isItemSelected(index)
                      ? color.P_PINK
                      : color.INPUT_TEXT,
                    marginRight:
                      type === translations.FILTER ? moderateScale(24) : 0,
                    fontFamily: isItemSelected(index)
                      ? font.RobotoMedium
                      : font.RobotoRegular,
                  }}>
                  {item?.label}
                </Text>
                {isItemSelected(index) && (
                  <View style={styles.tickIconStyle}>
                    <AppImages.Dashboard.tick_ICON width={moderateScale(16)} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default FilterModal;
