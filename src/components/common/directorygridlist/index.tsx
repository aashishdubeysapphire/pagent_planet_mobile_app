import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical, moderateScale} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import FastImageView from '../../../components/common/fastimageview';
import CustomRatings from '../customratings';
import {PageantTypes} from '../../dashboard/directory';
import {DirectoryItem} from '../../../services/models/directory/directorydata';
import {DIRECTORY_ID, ROLES, USER_DESHBOARD_TAB} from '../../utils/enum';
import {User} from '../../../services/models/user/user';
import {color} from '../../../assets/colorConstant';
import {toast, toastType} from '../commonalert';
import {
  getSlugByRoleId,
  getTagTypeLable,
  getText,
  redirectWithToastMsg,
} from '../../utils/helperFunction';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../root/screenname';
import {UserContext} from '../../../store/userStore';

interface Props {
  directoryID?: number;
  itemSize: number;
  directoryItem: DirectoryItem;
  user: User | undefined;
  isMessageButtonDisable: boolean;
  onItemClickListener: (directoryItem: DirectoryItem) => void;
  onMessageButtonClick: (
    directoryItem: DirectoryItem,
    item: string,
    directoryID: number,
  ) => any;
}

const DirectoryGridList = ({
  itemSize,
  onItemClickListener,
  onMessageButtonClick,
  directoryItem,
  directoryID,
  user,
  isMessageButtonDisable,
}: Props) => {
  const styles = useStyle();
  const [secondButtonName, setSecondButtonName] = useState('');
  const navigation = useNavigation();
  const {storeData} = useContext(UserContext);
  const isSecondButtonExist = () => {
    if (
      (directoryItem?.productsToCompete !== undefined &&
        directoryItem?.productsToCompete) ||
      (directoryItem?.productsToAttend !== undefined &&
        directoryItem?.productsToAttend) ||
      (directoryItem?.productOnSale !== undefined &&
        directoryItem?.productOnSale > 0) ||
      (directoryItem?.productsOnSale !== undefined &&
        directoryItem?.productsOnSale > 0) ||
      (directoryItem?.productOnHire !== undefined &&
        directoryItem?.productsOnHire > 0) ||
      (directoryItem?.productsOnHire !== undefined &&
        directoryItem?.productOnHire > 0)
    ) {
      if (directoryID === DIRECTORY_ID.PAGEANT) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getSecondButtonName();
  }, []);

  const getRoleId = (directoryId: number, directoryItm: DirectoryItem) => {
    if (directoryId === DIRECTORY_ID.PAGEANT) {
      return DIRECTORY_ID.PAGEANT;
    } else if (directoryId === DIRECTORY_ID.CONTESTANT) {
      return DIRECTORY_ID.CONTESTANT;
    } else {
      return directoryItm?.business_role_id;
    }
  };

  const handleButtonClick = () => {
    let roleId = getRoleId(directoryID, directoryItem);
    let profileId = directoryItem.id;
    let title =
      roleId === DIRECTORY_ID.PAGEANT
        ? directoryItem.title
        : roleId === DIRECTORY_ID.CONTESTANT
        ? directoryItem?.name
        : directoryItem.business_title;

    if (
      directoryItem?.is_compete_button_display &&
      directoryItem?.is_compete_button_display !== undefined &&
      directoryID === DIRECTORY_ID.CONTESTANT
    ) {
      toast(
        translations.MESSAGE_ON_COMPETING_BUTTON_CLCIK,
        toastType.SUCESS_TOAST,
      );
    } else if (isMessageButtonDisable) {
      if (user?.primary_profile_type === ROLES.CONTESTANT) {
        redirectWithToastMsg(storeData, navigation);
      } else if (user?.primary_profile_type === ROLES.PAGEANT) {
        toast(
          translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE,
          toastType.SUCESS_TOAST,
        );

        //Navigation to pagaent dashboard
        navigation.reset({
          index: 0,
          routes: [
            {
              name: USER_DESHBOARD_TAB.DESHBOARD,
              params: {openPrimaryDashbord: true},
            },
          ],
        });
      } else {
        toast(
          translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE,
          toastType.ERROR_TOAST,
        );
        navigation.reset({
          index: 0,
          routes: [
            {
              name: USER_DESHBOARD_TAB.DESHBOARD,
              params: {openPrimaryDashbord: true},
            },
          ],
        });
      }
    } else {
      navigation.navigate(SCREEN.COMPOSE, {
        isCommingFormProductDetails: true,
        name: {
          id: profileId,
          text: title,
        },
        type: {
          id: roleId,
          name: getTagTypeLable(roleId),
          slug: getSlugByRoleId(roleId),
        },
      });
    }
  };

  const getSecondButtonName = () => {
    if (
      (directoryItem?.productOnHire !== undefined &&
        directoryItem?.productOnHire > 0) ||
      (directoryItem?.productsOnHire !== undefined &&
        directoryItem?.productsOnHire > 0)
    ) {
      setSecondButtonName(translations.HIRE);
    } else if (
      (directoryItem?.productOnSale !== undefined &&
        directoryItem?.productOnSale) ||
      (directoryItem?.productsOnSale !== undefined &&
        directoryItem?.productsOnSale)
    ) {
      setSecondButtonName(translations.SHOP);
    } else if (
      directoryItem?.productsToAttend !== undefined &&
      directoryItem?.productsToAttend
    ) {
      setSecondButtonName(translations.ATTEND2);
    } else if (
      directoryItem?.productsToCompete !== undefined &&
      directoryItem?.productsToCompete
    ) {
      if (directoryID === DIRECTORY_ID.CONTESTANT) {
        setSecondButtonName(translations.COMPETING);
      } else {
        setSecondButtonName(translations.COMPETE);
      }
    }
  };

  const onSecondButtonClick = (directoryItems: DirectoryItem) => {
    onMessageButtonClick(directoryItems, secondButtonName, directoryID);
  };

  const messageButtonView = () => {
    return (
      <TouchableOpacity style={styles.row} onPress={() => handleButtonClick()}>
        <AppImages.Dashboard.email_ICON height={moderateScaleVertical(9)} />
        <Text style={{...styles.messageLabel, marginLeft: 0}}>
          {' '}
          {translations.MESSAGE}{' '}
        </Text>
      </TouchableOpacity>
    );
  };

  const getFirstButton = () => {
    if (
      directoryItem.owner_id !== ROLES.ADMIN_ID &&
      directoryItem.owner_id !== Number(user?.id) &&
      directoryItem.hide_message_me === translations.NO_SMALL &&
      !isMessageButtonDisable &&
      !directoryItem?.is_compete_button_display &&
      directoryItem?.is_compete_button_display === undefined
    ) {
      return messageButtonView();
    } else if (
      directoryItem.owner_id === ROLES.ADMIN_ID ||
      directoryItem.owner_id === Number(user?.id)
    ) {
      return (
        <View style={{...styles.row, opacity: 0.4}}>
          <AppImages.Dashboard.email_ICON height={moderateScaleVertical(9)} />
          <Text style={{...styles.messageLabel, marginLeft: 0}}>
            {' '}
            {translations.MESSAGE}{' '}
          </Text>
        </View>
      );
    } else if (isMessageButtonDisable) {
      return (
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleButtonClick()}>
          <AppImages.Common.WhiteLockIcon />
          <Text style={styles.unlockLabel}>
            {isSecondButtonExist()
              ? translations.UPGRADE_SMALL
              : translations.UPGRADE_TO_UNLOCK}
          </Text>
        </TouchableOpacity>
      );
    } else if (
      directoryItem?.is_compete_button_display &&
      directoryItem?.is_compete_button_display !== undefined
    ) {
      return (
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleButtonClick()}>
          <View style={styles.iconStyles}>
            <AppImages.Dashboard.CompeteIcon />
          </View>
          <Text style={styles.messageLabel}>
            {directoryID === DIRECTORY_ID.CONTESTANT
              ? translations.COMPETING
              : translations.COMPETE}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return messageButtonView();
    }
  };

  return (
    <View style={{...styles.topContainer, width: itemSize}}>
      <View
        style={{
          ...styles.container,
          borderColor:
            directoryItem.owner_id !== ROLES.ADMIN_ID &&
            directoryItem.owner_id !== Number(user?.id) &&
            directoryItem.hide_message_me === translations.NO_SMALL
              ? color.S_GRAY_2
              : color.GREY_WITH_OPACITY,
          width: isSecondButtonExist() ? itemSize / 2 : itemSize,
          borderBottomRightRadius: isSecondButtonExist() ? 0 : null,
          borderLeftWidth: 1,
          borderRightWidth: isSecondButtonExist() ? 0 : 1,
          borderWidth: 0,
          backgroundColor:
            isMessageButtonDisable &&
            directoryItem.owner_id !== ROLES.ADMIN_ID &&
            directoryItem.owner_id !== Number(user?.id)
              ? color.SHADOW_COLOR
              : color.WHITE,
        }}>
        <View style={{...styles.middleSection, width: itemSize}}>
          <TouchableOpacity
            style={styles.imageSection}
            onPress={() => onItemClickListener(directoryItem)}>
            <FastImageView
              width={itemSize}
              height={itemSize + 0.5} //Size Ratio is 1:1 , Added 2 to remove empty view from top
              borderRadius={moderateScale(20)}
              imageUrl={directoryItem.image_full_url}
            />
          </TouchableOpacity>

          <View
            style={{
              ...styles.titleSection,
              height:
                directoryID === DIRECTORY_ID.CONTESTANT
                  ? moderateScaleVertical(52)
                  : directoryID === DIRECTORY_ID.PAGEANT
                  ? moderateScaleVertical(106)
                  : moderateScaleVertical(120),
              width: itemSize,
            }}>
            <View style={styles.headingArea}>
              <Text
                style={styles.title}
                numberOfLines={directoryID === DIRECTORY_ID.CONTESTANT ? 1 : 2}>
                {directoryID === DIRECTORY_ID.PAGEANT
                  ? directoryItem.title
                  : directoryID === DIRECTORY_ID.CONTESTANT
                  ? directoryItem?.name
                  : directoryItem.business_title}
              </Text>
            </View>

            {(directoryID !== DIRECTORY_ID.PAGEANT &&
              directoryItem?.address !== undefined &&
              directoryItem?.address.length > 0) ||
            (directoryID !== DIRECTORY_ID.PAGEANT &&
              directoryItem?.country_name !== undefined &&
              directoryItem?.country_name.length > 0) ? (
              <View style={styles.lifeTimeParticipantArea}>
                <View style={styles.locationArea}>
                  <AppImages.Dashboard.LocationIcon />
                </View>
                <Text
                  style={styles.subHeadingLabel}
                  numberOfLines={
                    directoryID === DIRECTORY_ID.CONTESTANT ? 1 : 2
                  }
                  textBreakStrategy="simple"
                  ellipsizeMode="tail">
                  {directoryItem?.address?.length > 0
                    ? directoryItem?.address
                    : getText(
                        directoryItem?.state_name,
                        directoryItem?.country_name,
                      )}
                </Text>
              </View>
            ) : null}

            {directoryID !== DIRECTORY_ID.CONTESTANT ? (
              <View style={styles.ratingArea}>
                <CustomRatings
                  ratingsValue={
                    directoryItem?.type === PageantTypes.MASTER_PAGEANT
                      ? directoryItem?.final_rating
                      : directoryItem?.rating_average
                  }
                  review_count={
                    directoryItem.review_count === null
                      ? 0
                      : directoryItem.review_count
                  }
                />
                {directoryID === DIRECTORY_ID.PAGEANT &&
                directoryItem.contestants_count > 0 ? (
                  <View style={styles.lifeTimeParticipantArea}>
                    <AppImages.Common.PinkProfile_ICON />
                    <Text style={styles.subHeadingLabel} numberOfLines={1}>
                      {directoryItem.contestants_count +
                        ' ' +
                        translations.LIFETIME_PARTICIPANT}
                    </Text>
                  </View>
                ) : directoryItem.contestants_count > 0 ||
                  directoryItem.pageant_count > 0 ? (
                  <View style={styles.lifeTimeParticipantArea}>
                    {directoryItem.contestants_count > 0 ? (
                      <View style={styles.bottomSection}>
                        <AppImages.Common.groupParticipantIcon />
                        <Text style={styles.showCountLabel} numberOfLines={1}>
                          {directoryItem.contestants_count}
                        </Text>
                      </View>
                    ) : null}
                    {directoryItem.pageant_count > 0 ? (
                      <View style={styles.bottomSection}>
                        <AppImages.Common.pagentLine />
                        <Text style={styles.showCountLabel} numberOfLines={1}>
                          {directoryItem.pageant_count}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
            ) : null}
            {directoryID === DIRECTORY_ID.PAGEANT &&
              directoryItem?.entry_fees_status === translations.YES && (
                <View style={styles.entryFeeView}>
                  <View style={styles.entryFeeIcon}>
                    <AppImages.Common.entryFeeIcon />
                  </View>
                  <Text style={styles.entryFee}>
                    {translations.ENTRY_FEE_DIRECTORY}
                    {directoryItem?.entry_fees_value}
                  </Text>
                </View>
              )}
          </View>
        </View>
        <View
          style={{
            ...styles.buttonArea,
            width: isSecondButtonExist() ? '200%' : '100%',
          }}>
          {getFirstButton()}

          {isSecondButtonExist() ? (
            <View style={styles.row}>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                style={styles.row}
                onPress={() => onSecondButtonClick(directoryItem)}>
                {(directoryItem?.productOnHire !== undefined &&
                  directoryItem?.productOnHire > 0) ||
                (directoryItem?.productsOnHire !== undefined &&
                  directoryItem?.productsOnHire > 0) ? (
                  <View style={styles.secondRow}>
                    <AppImages.Dashboard.HireMeIcon />
                    <Text style={styles.messageLabel}>{translations.HIRE}</Text>
                  </View>
                ) : (directoryItem?.productOnSale !== undefined &&
                    directoryItem?.productOnSale) ||
                  (directoryItem?.productsOnSale !== undefined &&
                    directoryItem?.productsOnSale) ? (
                  <View style={styles.secondRow}>
                    <View style={styles.iconStyles}>
                      <AppImages.Dashboard.ShopIcon />
                    </View>
                    <Text style={styles.messageLabel}>{translations.SHOP}</Text>
                  </View>
                ) : directoryItem?.productsToAttend !== undefined &&
                  directoryItem?.productsToAttend ? (
                  <View style={styles.secondRow}>
                    <View style={styles.iconStyles}>
                      <AppImages.Dashboard.AttendIcon />
                    </View>
                    <Text style={styles.messageLabel}>
                      {translations.ATTEND2}
                    </Text>
                  </View>
                ) : directoryItem?.productsToCompete !== undefined &&
                  directoryItem?.productsToCompete ? (
                  <View style={styles.secondRow}>
                    <View style={styles.iconStyles}>
                      <AppImages.Dashboard.CompeteIcon />
                    </View>
                    <Text style={styles.messageLabel}>
                      {directoryID === DIRECTORY_ID.CONTESTANT
                        ? translations.COMPETING
                        : translations.COMPETE}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DirectoryGridList;
