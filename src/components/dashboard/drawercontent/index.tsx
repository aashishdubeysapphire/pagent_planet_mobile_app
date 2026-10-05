import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useRef, useEffect} from 'react';
import {styles} from './styles';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import ExpandingView from './expandchildcomp';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {SCREEN} from '../../../root/screenname';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  DELETE_ACCOUNT,
  GET_EXPERT_PROFILE_DETAILS,
  GET_UPDATED_USERDATA,
  LOGOUT,
} from '../../../services/endpoints';
import {internetState, toast, toastType} from '../../common/commonalert';
import useCgMutation from '../../../services/api/useCgMutation';
import {UserContext} from '../../../store/userStore';
import {Base} from '../../../services/models/base';
import {
  useSetLoader,
  useSetRearrangeAlbumToastToast,
} from '../../../store/useAppStore';
import {MethodTypes} from '../../../services/constants';
import WarningModel from '../../common/warningmodel';
import DeviceInfo from 'react-native-device-info';
import {useDrawerStatus} from '@react-navigation/drawer';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import FastImageView from '../../common/fastimageview';
import SocailMediaLinks from '../../common/socialmedialinks';
import {DIRECTORY_ID, PROFILE_STATUS, ROLES} from '../../utils/enum';
import {UserUpdatedDetails} from '../../../services/models/user/userUpdatedDetails';
import {checkIsNull} from '../../utils/validations';
import {isIosDevice, openWebLink} from '../../utils/helperFunction';
import {CONTACT_US_LINK, HELP_LINK} from '../../../services/staticWebUrl';
import {getTagTypeLable} from '../../utils/helperFunction';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerListShimmer, PinkViewShimmer} from './components/pinkViewShimmer';
import {RootContext} from '../../../store/rootStore';

const DrawerContent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isOrderViewExpanded, setIsOrderViewExpanded] = useState(false);
  const [isAboutViewExpanded, setIsAboutViewExpanded] = useState(false);
  const [orderListArray, setOrderListArray] = useState([]);
  const [isReferralViewVisible, setIsReferralViewVisible] = useState(false);
  const [isAccountViewExanded, setIsAccountViewExanded] = useState(false);
  const [isLogout, setLogoutVisible] = useState(false);
  const [hasScreenNotch, sethasScreenNotch] = useState('');
  const [res, setRes] = useState<UserUpdatedDetails>();
  const [isViewProfileButtonViasible, setIsViewProfileButtonViasible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {storeData} = useContext(UserContext);
  const {removeData} = useContext(UserContext);
  const setRearrangeAlbumToast = useSetRearrangeAlbumToastToast();
  const [modalText, setModalText] = useState('');
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const isDrawerOpen = useDrawerStatus();
  const scrollRef = useRef();
  const {setCounter} = useContext(RootContext);
  useEffect(() => {
    const hasNotch = DeviceInfo.hasNotch();
    sethasScreenNotch(String(hasNotch));
  }, [hasScreenNotch]);
  useEffect(() => {
    isDrawerOpen == 'open' && getUpdateduserData();

    setIsViewProfileButtonViasible(false);
  }, [isDrawerOpen]);

  useEffect(() => {
    setIsAboutViewExpanded(false);
    setIsAccountViewExanded(false);
    setIsOrderViewExpanded(false);
  }, [isDrawerOpen]);

  useEffect(() => {
    isReferralViewVisible
      ? setOrderListArray([
          {
            lable: translations.MY_ORDER,
            onPress: () => onMyOrderClick(),
          },
          {
            lable: translations.RECEIVED_ORDERS,
            onPress: () => onReceivedOrderClick(),
          },
          {
            lable: translations.REFERRAL_LEADERABOARD,
            onPress: () => onReferralClick(),
          },
        ])
      : setOrderListArray([
          {
            lable: translations.MY_ORDER,
            onPress: () => onMyOrderClick(),
          },
          {
            lable: translations.RECEIVED_ORDERS,
            onPress: () => onReceivedOrderClick(),
          },
        ]);
  }, [isReferralViewVisible]);

  //API logout................................................... START
  const {mutateAsync: logoutRequest} = useCgMutation<Base>({
    key: LOGOUT,
    method: MethodTypes.GET,
    url: LOGOUT,
    disableLoader: true,
  });
  //API logout..................................................... END

  const {mutateAsync: getUpdatedData} = useCgMutation<UserUpdatedDetails>({
    key: GET_UPDATED_USERDATA,
    method: MethodTypes.GET,
    url: GET_UPDATED_USERDATA,
    offSuccessToast: true,
  });

  const {mutateAsync: deleteAccountAPI} = useCgMutation<Base>({
    key: DELETE_ACCOUNT,
    url: DELETE_ACCOUNT,
    method: MethodTypes.GET,
    disableLoader: true,
  });

  const onLogoutPress = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    setModalText(translations.ARE_YOU_SURE_YOU_WANT_TO_LOGOUT);
    setLogoutVisible(true);
  };

  const onLogout = async () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      const response = await logoutRequest();
      if (response.success) {
        setCounter({
          wishlist_count: 0,
          unread_messages_count: 0,
          cart_count: 0,
          unread_notifications_count: 0,
        });
        setRearrangeAlbumToast(0);
        setTimeout(() => {
          removeData();
        }, 300);
      }
    }
  };

  const onDeleteAccountPress = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    setModalText(translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_ACCOUNT);
    setLogoutVisible(true);
  };

  const onDeleteAccount = async () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      const response = await deleteAccountAPI();
      if (response.success) {
        setTimeout(() => {
          removeData();
        }, 300);
      }
    }
  };

  const StaticCards = ({lable, leftActiveImage, onPress}) => {
    return (
      <TouchableOpacity style={styles.cardTOuch} onPress={onPress}>
        <View style={styles.staticCadImage}>{leftActiveImage}</View>
        {lable === translations.LOADING ? (
          <View></View>
        ) : (
          <Text style={styles.staticCardLable}>{lable}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const onPressAccount = () => {
    setIsAboutViewExpanded(false);
    // setIsExploreViewExpanded(false);
    setIsOrderViewExpanded(false);
    setIsAccountViewExanded(false);
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({animated: true});
    }, 50);
  };

  const onMyOrderClick = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(SCREEN.MY_ORDERS);
  };
  const onBlockedAccountsClick = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(SCREEN.BLOCKED_USERS);
  };
  const onReceivedOrderClick = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(SCREEN.RECEIVED_ORDERS);
  };
  const onReferralClick = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(SCREEN.REFERRAL_LEADERABOARD);
  };
  const goToManageAddress = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(SCREEN.MANAGE_ADDRESSES);
  };

  // const exploreList = [
  //   {
  //     lable: translations.STYLE_CHECK,
  //     onPress: () => onUnderDevlopment(),
  //   },
  //   {
  //     lable: translations.PAGIENT_MATCH,
  //     onPress: () => onUnderDevlopment(),
  //   },
  //   {
  //     lable: translations.GO_CROWN_ME,
  //     onPress: () => onUnderDevlopment(),
  //   },
  //   {
  //     lable: translations.ARTICLES,
  //     onPress: () => onUnderDevlopment(),
  //   },
  // ];

  const aboutList = [
    // {
    //   lable: translations.ABOUT_US,
    //   onPress: () => onUnderDevlopment(),
    // },
    {
      lable: translations.CONTACT_US,
      onPress: () => openWebLink(CONTACT_US_LINK),
    },
    // {
    //   lable: translations.PAGEANT_ADV,
    //   onPress: () => onUnderDevlopment(),
    // },
    // {
    //   lable: translations.BISINESS_ADV,
    //   onPress: () => onUnderDevlopment(),
    // },
    // {
    //   lable: translations.JOB_OPER,
    //   onPress: () => onUnderDevlopment(),
    // },
    // {
    //   lable: translations.MEDIA,
    //   onPress: () => onUnderDevlopment(),
    // },
  ];

  const accountList = [
    {
      lable: translations.PROFILE_DETAIL,
      onPress: () => _onPressEditIcon(),
    },
    {
      lable: translations.MANAGE_NOTIFICATION,
      onPress: () => onManageNotification(),
    },
    // {
    //   lable: translations.MEMBERSHIP_OPTION,
    //   onPress: () => onUnderDevlopment(),
    // },
    {
      lable: translations.MANAGE_ADDESSESS,
      onPress: () => goToManageAddress(),
    },
    {
      lable: translations.ADD_A_NEW_ROLE,
      onPress: () => addNewRole(),
    },
    {
      lable: translations.BANK_DETAIL,
      onPress: () =>
        res?.data?.user?.bank_details == 0
          ? navigation.navigate(SCREEN.ADD_EDIT_BANK_DETAILS, {
              isEdit: false,
              bankDetails: {},
            })
          : navigation.navigate(SCREEN.BANK_DETAILS),
    },
    {
      lable: translations.CHANGE_PASSWORD,
      onPress: () => onChangePasswordClick(),
    },
    {
      lable: translations.BLOCKED_ACCOUNTS,
      onPress: () => onBlockedAccountsClick(),
    },
    {
      lable: translations.HELP,
      onPress: () => openWebLink(HELP_LINK),
    },
    {
      lable: translations.DELETE + ' ' + translations.ACCOUNT,
      onPress: () => onDeleteAccountPress(),
    },
  ];

  const onManageNotification = () => {
    navigation.navigate(SCREEN.MANAGE_NOTIFICATION);
  };
  const onChangePasswordClick = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(SCREEN.CHANGE_PASSWORD);
  };

  const addNewRole = () => {
    navigation.navigate(SCREEN.CHOOSE_PROFILE_WITH_BACK, {
      name: translations.DRAWER,
    });
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const _onPressEditIcon = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    if (
      storeData?.data?.user?.primary_profile_type === undefined ||
      storeData?.data?.user?.primary_profile_type === null
    ) {
      navigation.navigate(SCREEN.EDIT_PROFILE, {name: translations.FAN});
    } else {
      navigation.navigate(SCREEN.EDIT_PROFILE);
    }
  };
  const _onSellItemServicesClick = () => {
    navigation.dispatch(DrawerActions.closeDrawer());

    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.SELL_ITEM_SERVICES);
    }
  };

  const onDashboardClick = () => {
    navigation.navigate(SCREEN.DASHBOARD);
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  /** TODO: remove — local dev only: open event public profile by slug (no push / universal link). */
  const onTestSlugEventDevPress = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
      slugId: 'miss-georgia-beauty-2026',
    });
  };
  const onViewPublicProfile = () => {
    redirectionFunction(res?.data.user.primary_profile_type);
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const viewProfileBtnShowConditons = responce => {
    console.log(responce.data.user, 'this is response');
    if (
      responce.data.user?.is_expert_exist === false &&
      responce.data.user?.is_contestant_exist === false &&
      responce.data.user?.is_pageant_exist === false
    ) {
      setIsViewProfileButtonViasible(false);
    } else if (
      responce.data.user?.is_expert_exist === false &&
      responce.data.user?.is_contestant_exist === false &&
      responce.data.user?.is_pageant_exist === true
    ) {
      setIsViewProfileButtonViasible(false);
    } else {
      setIsViewProfileButtonViasible(true);
    }
  };
  const getUpdateduserData = async () => {
    setIsLoading(true);
    const responce = await getUpdatedData();
    if (responce.success) {
      if (responce.data.user?.isEventTicketVote > 0) {
        setIsReferralViewVisible(true);
      }
      viewProfileBtnShowConditons(responce);
      setRes(responce);
    }
    setIsLoading(false);
  };
  const redirectionFunction = key => {
    if (key === ROLES.CONTESTANT) {
      if (res?.data?.user?.contestant?.status === PROFILE_STATUS.ACTIVE) {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          profileId: res?.data?.user?.contestant.id,
          roleId: res?.data?.user?.id,
          name:
            res?.data?.user.personal_details?.first_name +
            ' ' +
            res?.data?.user.personal_details.last_name,
          category: DIRECTORY_ID.CONTESTANT,
          key: new Date().getMilliseconds(),
          selectedTab: res?.data?.user?.sortedRolesForPublicScreen[0]?.role,
        });
      } else if (
        res?.data?.user?.contestant?.status === PROFILE_STATUS.INACTIVE
      ) {
        let activeExpertList = res?.data?.user.sortedRolesForPublicScreen;
        if (activeExpertList.length === 0) {
          toast(translations.CONTESTENT_PUBLIC__MSG, toastType.SUCESS_TOAST);
          navigation.navigate(SCREEN.EDIT_CONTESTANT_DETAILS, {
            preSelectedTab: translations.CONTESTANT_DETAILS,
          });
        } else {
          goToExpert();
        }
      }
    } else {
      goToExpert(); // in case of Pagent we will go to expert only
    }
  };

  const goToExpert = () => {
    let expertData = res?.data?.user.sortedRolesForPublicScreen[0];

    if (expertData?.status === PROFILE_STATUS.ACTIVE) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        profileId: expertData?.id,
        roleId: res?.data?.user.id,
        name:
          res?.data?.user.personal_details?.first_name +
          ' ' +
          res?.data?.user.personal_details.last_name,
        category: expertData?.role_id,
        key: new Date().getMilliseconds(),
        selectedTab: expertData?.role,
      });
    } else {
      let inactiveExpertData = res?.data?.user.sortedAllRolesForPublicScreen[0];
      toast(translations.EXPERT_PUBLIC_MSG, toastType.SUCESS_TOAST);
      navigation.navigate(SCREEN.CREATE_EXPERT_PROFILE, {
        isEdit: true,
        selectedProfile: {
          display_name: getTagTypeLable(inactiveExpertData?.role_id),
          name: inactiveExpertData?.role,
        },
        getExpertProfileLink:
          GET_EXPERT_PROFILE_DETAILS +
          inactiveExpertData?.id +
          '&business_profile_name=' +
          inactiveExpertData?.role,
      });
    }
  };
  return (
    <View style={styles.safeAreaView}>
      <View style={styles.continaer}>
        <View
          style={[
            styles.topContiner,
            {
              paddingTop: isIosDevice()
                ? insets.top + moderateScaleVertical(8)
                : 0,
            },
          ]}>
          {isLoading ? (
            <PinkViewShimmer />
          ) : (
            <>
              <View
                style={
                  hasScreenNotch === 'true'
                    ? styles.dpContinerIos
                    : styles.dpContiner
                }>
                {storeData?.data?.user?.personal_details.profile_image_url ==
                  null ||
                storeData?.data?.user?.personal_details.profile_image_url ===
                  '' ? (
                  <TouchableOpacity onPress={_onPressEditIcon}>
                    <AppImages.Common.UserPlaceHolder_ICON />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={_onPressEditIcon}>
                    <FastImageView
                      width={moderateScaleVertical(100)}
                      height={moderateScaleVertical(100)}
                      borderRadius={moderateScaleVertical(100)}
                      imageUrl={
                        storeData?.data?.user?.personal_details
                          .profile_image_url
                      }
                      isCircle
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.editPen}
                  onPress={_onPressEditIcon}>
                  <AppImages.Drawer.EditPen_ICON />
                </TouchableOpacity>
              </View>
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail">
                {storeData?.data?.user?.personal_details.first_name +
                  ' ' +
                  storeData?.data?.user?.personal_details.last_name}
              </Text>
              {storeData?.data?.user?.country !== null ? (
                <Text
                  style={styles.countryStateTitle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {storeData?.data?.user?.country?.name +
                    ', ' +
                    storeData?.data?.user?.state?.name}
                </Text>
              ) : null}

              <Text
                style={styles.headerline}
                numberOfLines={2}
                ellipsizeMode="tail">
                {storeData?.data?.user?.bio}
              </Text>
              {storeData?.data?.user?.bio && (
                <View style={styles.emptyHeight} />
              )}
            </>
          )}
          {/* {isLoading && (
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="small" color={color.WHITE} />
            </View>
          )}
          {!isViewProfileButtonViasible ? (
            <View style={styles.emptyHeight} />
          ) : (
            <TouchableOpacity
              style={styles.viewProfileButton}
              onPress={onViewPublicProfile}>
              <Text style={styles.topButton}>
                {translations.VIEW_PUBLIC_PROFILE}
              </Text>
            </TouchableOpacity>
          )} */}
        </View>
        {isLoading ? (
          <DrawerListShimmer />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            style={{height: '55%', marginTop: 12}}>
            {/* <StaticCards
            lable={translations.MANAGE_PROFILE}
            leftActiveImage={<AppImages.Drawer.ProfileIcon />}
            onPress={_onPressEditIcon}
          /> */}
            {isViewProfileButtonViasible && (
              <StaticCards
                lable={translations.VIEW_PUBLIC_PROFILE}
                leftActiveImage={<AppImages.Drawer.tpp_view_public_page_icon />}
                onPress={onViewPublicProfile}
              />
            )}
            {/* {isViewProfileButtonViasible && ( */}
            <StaticCards
              lable={translations.VIEW_DASHBOARD}
              leftActiveImage={
                <View style={styles.dashboardIcon}>
                  <AppImages.Dashboard.DashboardIcon />
                </View>
              }
              // onPress={onViewPublicProfile}
              onPress={onDashboardClick}
            />

            {/* )} */}
            {/* {__DEV__ && (
                <StaticCards
                  lable="Test slug event (dev)"
                  leftActiveImage={
                    <View style={styles.dashboardIcon}>
                      <AppImages.Dashboard.DashboardIcon />
                    </View>
                  }
                  onPress={onTestSlugEventDevPress}
                />
              )} */}
            {/* <StaticCards
              lable={
                isLoading
                  ? translations.LOADING
                  : res?.data?.user.product_count > 0 &&
                    checkIsNull(res?.data?.user.product_count)
                  ? translations.MANAGE_PRODUCT
                  : translations.SELL_ITEMS_SERVICES
              }
              leftActiveImage={<AppImages.Drawer.Package />}
              onPress={_onSellItemServicesClick}
            /> */}

            <ExpandingView
              lable={translations.MANAGE_ORDERS}
              list={orderListArray}
              isViewExpanded={isOrderViewExpanded}
              setIsViewExpanded={setIsOrderViewExpanded}
              leftActiveImage={<AppImages.Drawer.Bag_ICON />}
              onPressExpnadView={onPressAccount}
            />

            {/* <ExpandingView
              lable={translations.ABOUT}
              list={aboutList}
              isViewExpanded={isAboutViewExpanded}
              setIsViewExpanded={setIsAboutViewExpanded}
              leftActiveImage={<AppImages.Drawer.About_ICON />}
              onPressExpnadView={onPressAccount}
            /> */}
            <ExpandingView
              lable={translations.ACCOUNT}
              list={accountList}
              isViewExpanded={isAccountViewExanded}
              setIsViewExpanded={setIsAccountViewExanded}
              leftActiveImage={<AppImages.Drawer.Account_ICON />}
              onPressExpnadView={onPressAccount}
            />
            <StaticCards
              lable={translations.LOGOUT}
              leftActiveImage={<AppImages.Drawer.Logout_ICON />}
              onPress={onLogoutPress}
            />
            <View style={styles.socialLinks}>
              <SocailMediaLinks />
            </View>
          </ScrollView>
        )}

        <WarningModel
          msg={modalText}
          isModalVisible={isLogout}
          setConfirm={
            modalText === translations.ARE_YOU_SURE_YOU_WANT_TO_LOGOUT
              ? onLogout
              : onDeleteAccount
          }
          setIsModalVisible={setLogoutVisible}
          headingStyle={styles.modalHeading}
        />
      </View>
    </View>
  );
};

export default DrawerContent;
