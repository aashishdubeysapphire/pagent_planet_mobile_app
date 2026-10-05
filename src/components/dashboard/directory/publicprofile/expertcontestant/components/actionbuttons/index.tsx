import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import AppImages from '../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../assets/translations';
import {SCREEN} from '../../../../../../../root/screenname';
import {Param} from '../../../../../../../services/constants';
import {toast, toastType} from '../../../../../../common/commonalert';
import Shimmer from '../../../../../../common/shimmer';
import {
  ATTRIBUTE_ID,
  ROLES,
  SELL_PRODUCT,
  USER_DESHBOARD_TAB,
} from '../../../../../../utils/enum';
import {
  getSlugByRoleId,
  getTagTypeLable,
} from '../../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../utils/responsiveSize';
import {styles} from './styles';
import {UserContext} from '../../../../../../../store/userStore';

interface Props {
  buttonArray?: any;
  loading: boolean;
  fetching: boolean;
  screen: string;
  name?: string;
  profileId?: number;
  roleId?: number;
  isEvent: boolean;
  setIsPreviewModalVisible: Function;
}

const buttonsList = [
  translations.MESSAGE,
  translations.SHOP,
  translations.HIRE,
];

const buttonsListForPageant = [
  translations.MESSAGE,
  translations.SHOP,
  translations.ATTEND2,
  translations.COMPETE,
];

const ActionButtons = ({
  buttonArray,
  loading,
  fetching,
  screen,
  name,
  profileId,
  roleId,
  isEvent = false,
  setIsPreviewModalVisible,
}: Props) => {
  const [buttonsData, setButtonData] = useState({});
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const {storeData} = useContext(UserContext);
  useEffect(() => {
    if (!(loading || fetching)) {
      if (screen === translations.PAGEANT) {
        let array = [
          translations.MESSAGE,
          translations.SHOP,
          translations.COMPETE,
        ];

        if (buttonArray?.length === 3) {
          array = buttonArray;
        } else if (
          buttonArray?.includes(translations.COMPETE) &&
          buttonArray?.length > 3
        ) {
          array = buttonsListForPageant;
        } else if (
          buttonArray?.includes(translations.COMPETE) &&
          buttonArray?.length < 3
        ) {
          array = [
            translations.MESSAGE,
            translations.SHOP,
            translations.COMPETE,
          ];
        } else {
          array = [
            translations.MESSAGE,
            translations.SHOP,
            translations.ATTEND2,
          ];
        }
        if (buttonArray?.includes(translations.UPGRADE_SMALL)) {
          array.splice(0, 1, translations.UPGRADE_SMALL);
        } else if (buttonArray?.includes(translations.MESSAGE)) {
          array.splice(0, 1, translations.MESSAGE);
        }
        setButtonData(array);
      } else {
        let array = [];
        array = buttonsList;
        if (buttonArray?.includes(translations.UPGRADE_SMALL)) {
          array.splice(0, 1, translations.UPGRADE_SMALL);
        } else if (buttonArray?.includes(translations.COMPETING)) {
          array.splice(0, 1, translations.COMPETING);
        } else if (buttonArray?.includes(translations.COMPETE)) {
          array.splice(0, 1, translations.COMPETE);
        } else if (buttonArray?.includes(translations.MESSAGE)) {
          array.splice(0, 1, translations.MESSAGE);
        }
        setButtonData(array);
      }
      setCount(count + 1);
    }
  }, [buttonArray, loading, fetching]);

  const handleButtonClick = (item: string) => {
    let attrId = 0;
    let params = '';
    if (item === translations.COMPETING) {
      toast(
        translations.MESSAGE_ON_COMPETING_BUTTON_CLCIK,
        toastType.SUCESS_TOAST,
      );
      return;
    } else if (item === translations.SHOP) {
      if (isEvent) {
        params = Param.PAGAENT_ID + profileId + Param.ROLE_ID + roleId;
      } else {
        params = Param.PROFILE_ID_ + profileId + Param.ROLE_ID + roleId;
      }
    } else if (item === translations.ATTEND2 || item === translations.COMPETE) {
      if (item === translations.ATTEND2) {
        attrId = ATTRIBUTE_ID.ATTEND;
      } else {
        attrId = ATTRIBUTE_ID.COMPETE;
      }
      if (isEvent) {
        params =
          Param.PAGAENT_ID +
          profileId +
          Param.ROLE_ID +
          roleId +
          Param.ATTR_TYPE +
          attrId;
      } else {
        params =
          Param.PROFILE_ID_ +
          profileId +
          Param.ROLE_ID +
          roleId +
          Param.ATTR_TYPE +
          attrId;
      }
    } else if (item === translations.HIRE) {
      params =
        Param.PROFILE_ID_ +
        profileId +
        Param.ROLE_ID +
        roleId +
        Param.CATEGORY_ID +
        SELL_PRODUCT.HIRE;
    } else if (item === translations.MESSAGE) {
      navigation.navigate(SCREEN.COMPOSE, {
        isCommingFormProductDetails: true,
        name: {
          id: profileId,
          text: name,
        },
        type: {
          id: roleId,
          name: getTagTypeLable(roleId),
          slug: getSlugByRoleId(roleId),
        },
      });

      return;
    } else if (item === translations.UPGRADE_SMALL) {
      if (storeData?.data?.user?.primary_profile_type !== ROLES.PAGEANT) {
        toast(
          translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE,
          toastType.ERROR_TOAST,
        );
      } else {
        toast(
          translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE,
          toastType.SUCESS_TOAST,
        );
      }
      navigation.reset({
        index: 0,
        routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
      });
      setTimeout(() => {
        navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
          openPrimaryDashbord: true,
        });
      }, 50);
      return;
    }
    navigation.navigate(SCREEN.SELLER_PRODUCTS, {
      name: name,
      param: params,
      uniqueKey: new Date().getMilliseconds(),
      backToSearch: false,
      cart: false,
    });
  };
  const multipleBtnUI = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          buttonArray?.includes(item) ? handleButtonClick(item) : null
        }
        activeOpacity={buttonArray?.includes(item) ? 0.2 : 1}>
        <View
          style={{
            ...styles.roleItemContainer1,
            width: index === 3 ? width - moderateScale(32) : moderateScale(106),
            marginTop: index === 3 ? moderateScale(12) : 0,
            opacity:
              item === translations.UPGRADE_SMALL
                ? 0.8
                : buttonArray?.includes(item)
                ? 1
                : 0.5,
            backgroundColor:
              item === translations.UPGRADE_SMALL
                ? color.BLACK
                : color.S_GRAY_1,
          }}>
          {item === translations.MESSAGE ? (
            <AppImages.PUBLIC_PROFILE.MessageDarkIcon />
          ) : item === translations.SHOP ? (
            <AppImages.PUBLIC_PROFILE.ShopDarkIcon />
          ) : item === translations.HIRE ? (
            <AppImages.PUBLIC_PROFILE.HireDarkIcon />
          ) : item === translations.ATTEND2 ? (
            <AppImages.PUBLIC_PROFILE.AttendDarkIcon />
          ) : item === translations.UPGRADE_SMALL ? (
            <AppImages.Common.WhiteLockIcon />
          ) : (
            <AppImages.PUBLIC_PROFILE.CompeteIconDark />
          )}
          <Text
            style={
              item === translations.UPGRADE_SMALL
                ? styles.upgradeLabelStyle
                : styles.roleTextStyles1
            }>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const singleBtnUI = (item, index) => {
    return item === translations.UPGRADE_SMALL ||
      item === translations.MESSAGE ? (
      <TouchableOpacity
        onPress={() =>
          buttonArray?.includes(item) ? handleButtonClick(item) : null
        }
        activeOpacity={buttonArray?.includes(item) ? 0.2 : 1}
        style={{flex: 1}}>
        <View
          style={{
            ...styles.roleItemContainer1,
            backgroundColor:
              item === translations.UPGRADE_SMALL
                ? color.BLACK
                : color.S_GRAY_1,
            opacity:
              item === translations.UPGRADE_SMALL
                ? 0.8
                : buttonArray?.includes(item)
                ? 1
                : 0.5,
            marginHorizontal: moderateScale(76),
          }}>
          {item === translations.UPGRADE_SMALL ? (
            <AppImages.Common.WhiteLockIcon />
          ) : (
            <AppImages.PUBLIC_PROFILE.MessageDarkIcon />
          )}
          <Text
            style={
              item === translations.UPGRADE_SMALL
                ? styles.upgradeLabelStyle
                : styles.roleTextStyles1
            }>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };
  return (
    <View style={styles.roleContainer1}>
      {!(loading || fetching) && buttonArray !== undefined && count !== 0 ? (
        buttonsData.map(
          screen === translations.PAGEANT ? singleBtnUI : multipleBtnUI,
        )
      ) : (
        <>
          <Shimmer
            width={moderateScale(100)}
            height={moderateScaleVertical(30)}
            borderRadius={moderateScale(18)}
          />
          <Shimmer
            width={moderateScale(100)}
            height={moderateScaleVertical(30)}
            borderRadius={moderateScale(18)}
          />
          <Shimmer
            width={moderateScale(100)}
            height={moderateScaleVertical(30)}
            borderRadius={moderateScale(18)}
          />
        </>
      )}
    </View>
  );
};

export default ActionButtons;
