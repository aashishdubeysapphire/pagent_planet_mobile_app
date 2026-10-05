import {DrawerActions, useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, BackHandler} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {SCREEN} from '../../../root/screenname';
import {moderateScale} from '../../utils/responsiveSize';
import CartNotication from '../cartnotification';
import FastImageView from '../fastimageview';
import InfoModal from '../infoiconmodal';
import {styles} from './styles';
import {goBackOrNavigateToDashboard} from '../../utils/helperFunction';

interface Props {
  lable: string | undefined;
  rightText?: string;
  onPressRightText?: any;
  isUnderLineRequired?: boolean;
  onPressBack?: any;
  onCustomPressBack?: any;
  crossIcon?: boolean;
  onCrossIconClick?: any;
  isSaveActive?: boolean;
  onPressRightIcon1?: any;
  rightIcon1?: any;
  onPressRightIcon2?: any;
  rightIcon2?: any;
  infoIcon?: boolean;
  showCart?: boolean;
  showNotification?: boolean;
  showMessage?: boolean;
  infoDataArray?: any;
  buttonOnModal?: boolean;
  screenName?: string;
  onModalButtonPress?: any;
  menu?: boolean;
  onPressFilter?: any;
  isFilterClicked?: boolean;
  isFavorite?: boolean;
  leftIcon?: any;
  showImageCount?: string | null;
  /** When true and no custom back handler, back pops or resets to main dashboard (deep links). */
  fallbackToDashboardOnBack?: boolean;
}

/* A function component. */
const Header = ({
  lable = '',
  rightText = '',
  isUnderLineRequired,
  onPressRightText = () => {},
  onPressBack,
  onCustomPressBack,
  crossIcon,
  onCrossIconClick,
  isSaveActive = true,
  onPressRightIcon1 = () => {},
  rightIcon1,
  onPressRightIcon2 = () => {},
  rightIcon2,
  infoIcon,
  infoDataArray,
  buttonOnModal,
  screenName,
  onModalButtonPress,
  showCart,
  showNotification,
  showMessage,
  isFilterClicked = false,
  isFavorite,
  onPressFilter = () => {},
  menu = false,
  leftIcon = null,
  showImageCount,
  fallbackToDashboardOnBack = false,
}: Props) => {
  const {goBack} = useNavigation();
  const [isRightTextClicked, setIsRightTextClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  /**
   * If the save button is active, and the right text has not been clicked, then set the right text to
   * clicked, call the onPressRightText function, and after one second, set the right text to not
   * clicked.
   */
  const pressRightTextOnlyOnce = () => {
    if (isSaveActive) {
      if (!isRightTextClicked) {
        setIsRightTextClicked(true);
        onPressRightText();
        setTimeout(() => {
          setIsRightTextClicked(false);
        }, 1000);
      }
    }
  };

  const handleHeaderBack = useCallback(() => {
    if (onCustomPressBack !== undefined) {
      onCustomPressBack();
      return;
    }
    if (onPressBack !== undefined) {
      onPressBack();
      return;
    }
    if (fallbackToDashboardOnBack) {
      goBackOrNavigateToDashboard(navigation);
      return;
    }
    goBack();
  }, [
    onCustomPressBack,
    onPressBack,
    fallbackToDashboardOnBack,
    navigation,
    goBack,
  ]);

  useEffect(() => {
    if (menu || crossIcon) {
      return undefined;
    }
    if (
      !fallbackToDashboardOnBack &&
      onPressBack === undefined &&
      onCustomPressBack === undefined
    ) {
      return undefined;
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      handleHeaderBack();
      return true;
    });
    return () => sub.remove();
  }, [
    menu,
    crossIcon,
    fallbackToDashboardOnBack,
    onPressBack,
    onCustomPressBack,
    handleHeaderBack,
  ]);

  const infoButtonClicked = () => {
    setIsModalVisible(true);
  };
  const LableInfoIconCOunt = () => {
    return (
      <>
        <Text
          style={
            infoIcon || showImageCount
              ? styles.infoLabelStyle
              : rightText
              ? styles.shortLableStyle
              : styles.lableStyle
          }
          numberOfLines={1}
          ellipsizeMode="tail">
          {lable}
        </Text>
        {infoIcon ? (
          <TouchableOpacity
            style={styles.infoIcon}
            onPress={() => infoButtonClicked()}>
            <AppImages.Common.infoIcon />
          </TouchableOpacity>
        ) : null}
        {showImageCount ? (
          <Text style={styles.imageCountStyles}>{showImageCount}</Text>
        ) : null}
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        {menu ? (
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <AppImages.Dashboard.HeaderSideBarIcon style={styles.drawerIcon} />
          </TouchableOpacity>
        ) : crossIcon ? (
          <TouchableOpacity onPress={onCrossIconClick}>
            <AppImages.Common.crossIcon style={styles.backIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleHeaderBack();
            }}>
            <AppImages.Common.Back_ICON style={styles.backIcon} />
          </TouchableOpacity>
        )}
        {leftIcon != null ? (
          <View style={styles.leftImageIcon}>
            <FastImageView
              imageUrl={leftIcon}
              width={moderateScale(28)}
              height={moderateScale(28)}
              borderRadius={moderateScale(14)}
              isCircle
            />
          </View>
        ) : null}

        {isFilterClicked && lable !== undefined ? (
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              onPressFilter();
            }}>
            {LableInfoIconCOunt()}
            <AppImages.Dashboard.HeaderDropdownIcon style={styles.dropIcon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.row}>{LableInfoIconCOunt()}</View>
        )}

        {!!rightText && (
          <TouchableOpacity
            onPress={pressRightTextOnlyOnce}
            style={styles.rightTextTouch}
            activeOpacity={isSaveActive ? 0.5 : 1}>
            <Text
              style={
                isSaveActive
                  ? styles.rightText
                  : {...styles.rightText, opacity: 0.5}
              }>
              {rightText}
            </Text>
          </TouchableOpacity>
        )}
        {rightIcon1 && (
          <TouchableOpacity
            onPress={onPressRightIcon1}
            style={[styles.rightIcons, {marginRight: moderateScale(8)}]}>
            {rightIcon1}
          </TouchableOpacity>
        )}
        {rightIcon2 && (
          <TouchableOpacity
            onPress={onPressRightIcon2}
            style={styles.rightIcons}>
            {rightIcon2}
          </TouchableOpacity>
        )}
        {showMessage && (
          <TouchableOpacity onPress={() => navigation.navigate(SCREEN.MESSAGE)}>
            <AppImages.SHOP.MessageIcon style={styles.otherIcon} />
          </TouchableOpacity>
        )}
        {isFavorite && (
          <View style={styles.faveIcon}>
            <CartNotication isFavorite={isFavorite} />
          </View>
        )}

        {showNotification && (
          <CartNotication isNotifiction={showNotification} />
        )}
        {showCart && <CartNotication />}
      </View>
      {isUnderLineRequired ? <View style={styles.bottomLine} /> : <View />}

      <InfoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        data={infoDataArray}
        heading={translations.INFORMATION}
        button={buttonOnModal}
        screenName={screenName}
        onModalButtonPress={onModalButtonPress}
      />
    </>
  );
};

export default Header;
