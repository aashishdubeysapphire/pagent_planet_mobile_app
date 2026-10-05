import React, {useState, useEffect, useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import {styles} from './styles';
import CustomButton from '../../../../common/button';
import {SCREEN} from '../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import WelcomeModal from '../welcomemodal';
import {internetState} from '../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import WarningModel from '../../../../common/warningmodel';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import {EVENT_STATUS, ROLES, USER_DESHBOARD_TAB} from '../../../../utils/enum';
import useAppStore, {useSetLoader} from '../../../../../store/useAppStore';
import {UserContext} from '../../../../../store/userStore';
import {GET_CONTESTANT_DETAILS} from '../../../../../services/endpoints';
import {PageantDataResponse} from '../../../../../services/models/pageantdetails/contestantPublicDetails';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {MethodTypes} from '../../../../../services/constants';

interface Props {
  showModal: boolean;
  pageantProfile: boolean;
  expertProfile: boolean;
  selectedRole?: string;
}

const SelectProfile = ({
  showModal,
  expertProfile,
  pageantProfile,
  selectedRole,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isSkipButton] = useState(showModal);
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();
  const [message] = useState('');
  const [waringModal, setisWarningModal] = useState(false);
  const [contestantActiveState, setContestantActiveState] = useState(true);
  const [buttonLabel, setButtonlabel] = useState(translations.CONTINUE_AS);
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  useEffect(() => {
    setTimeout(() => {
      setisModalVisible(showModal);
    }, 600);
  }, [showModal]);

  const {
    storeData: {loader},
  } = useAppStore();

  const {
    data: contestantData,
    mutateAsync: getContestantDetail,
    isLoading: isLoadingContestant,
  } = useCgMutation<PageantDataResponse>({
    key: GET_CONTESTANT_DETAILS,
    url: GET_CONTESTANT_DETAILS,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });
  useEffect(() => {
    if (!isLoadingContestant) {
      if (
        contestantData?.data?.contestant?.status === undefined ||
        contestantData?.data?.contestant?.status === EVENT_STATUS.ACTIVE
      ) {
        setContestantActiveState(true);
      } else {
        setContestantActiveState(false);
      }
    }
  }, [isLoadingContestant]);

  const setSelectedIndexAndBtnLable = () => {
    setSelectedIndex(0);
    setButtonlabel(translations.CONTINUE_AS + translations.CAPITAL_CONTESTANT);
  };
  useEffect(() => {
    if (selectedRole === ROLES.CONTESTANT) {
      setSelectedIndexAndBtnLable();
    } else if (selectedRole === ROLES.PAGEANT) {
      setSelectedIndex(1);
      setButtonlabel(translations.CONTINUE_AS + translations.CAPITAL_PAGEANT);
    } else {
      setSelectedIndex(2);
      setButtonlabel(translations.CONTINUE_AS + translations.CAPITAL_EXPERT);
    }
    setTimeout(() => {
      if (loader) {
        setLoader(false);
      }
    }, 3000);

    if (storeData?.data?.user?.is_contestant_exist) {
      getContestantDetail();
    }
  }, []);

  const handleChange = index => {
    setSelectedIndex(index);
    if (index === 0) {
      setButtonlabel(
        translations.CONTINUE_AS + translations.CAPITAL_CONTESTANT,
      );
    } else if (index === 1) {
      setButtonlabel(translations.CONTINUE_AS + translations.CAPITAL_PAGEANT);
    } else if (index === 2) {
      setButtonlabel(translations.CONTINUE_AS + translations.CAPITAL_EXPERT);
    } else {
      setButtonlabel('');
    }
  };
  const skipButton = index => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: SCREEN.DASHBOARD_NAVIGATION,
        },
      ],
    });
  };
  const handleClick = index => {
    if (netInfo !== null && !netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (index === 0 && !storeData?.data?.user?.is_contestant_exist) {
        navigation.navigate(SCREEN.CREATE_CONTESTENT_PROFILE);
      } else if (index === 0) {
        navigateToRespectiveProfile();
      } else if (index === 1) {
        navigation.navigate(SCREEN.ADD_PAGEANT);
      } else if (index === 2) {
        navigation.navigate(SCREEN.CHOOSE_EXPERT_PROFILE);
      }
    }
  };

  const navigateToRespectiveProfile = () => {
    if (selectedIndex === 0) {
      navigation.reset({
        index: 0,
        routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
      });
      setTimeout(() => {
        navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
          redirectedto: ROLES.CONTESTANT,
          tabIndex:
            contestantData?.data?.contestant?.status === EVENT_STATUS.ACTIVE
              ? 1
              : 0,
        });
      }, 10);
    }
  };

  const showProfile = (
    label: string,
    index: number,
    isProfileExist: boolean,
    isProfileActive: boolean,
    selectedProfileIcon: any,
    unselectedProfileIcon: any,
  ) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.profileBox,
          borderColor: index === selectedIndex ? color.P_PINK : color.S_GRAY_2,
          backgroundColor: color.WHITE,
          justifyContent: !isProfileActive ? null : 'center',
        }}
        onPress={() => handleChange(index)}
        activeOpacity={0.5}>
        {!isProfileActive ? (
          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: moderateScale(12),
              marginTop: moderateScaleVertical(12),
            }}>
            <AppImages.Common.alertIcon1
              height={moderateScaleVertical(20)}
              width={moderateScale(20)}
            />
          </View>
        ) : isProfileExist ? (
          <AppImages.Dashboard.ExistingProfile_icon
            height={moderateScaleVertical(73)}
          />
        ) : (
          <View style={styles.emptySpace}></View>
        )}
        <View
          style={
            isProfileActive
              ? styles.activeProfileTitleView
              : styles.inactiveProfileTitleView
          }>
          {index === selectedIndex || (isProfileExist && isProfileActive)
            ? selectedProfileIcon
            : unselectedProfileIcon}
          <Text
            style={{
              ...styles.heading,
              color:
                index === selectedIndex
                  ? color.P_PINK
                  : !isProfileActive
                  ? color.S_GRAY_3
                  : isProfileExist
                  ? color.BLACK
                  : color.S_GRAY_3,
            }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subSection}>
          {showProfile(
            ROLES.CONTESTANT,
            0,
            contestantData?.data?.contestant?.status === EVENT_STATUS.ACTIVE,
            contestantActiveState,
            <AppImages.Dashboard.CreateContestant_ICON />,
            <AppImages.Dashboard.Unselected_contestant_ICON />,
          )}
          {showProfile(
            ROLES.PAGEANT,
            1,
            pageantProfile,
            true,
            <AppImages.Dashboard.CreateDirector_ICON />,
            <AppImages.Dashboard.Unselected_director_ICON />,
          )}
        </View>
        <View style={styles.subSection}>
          {showProfile(
            ROLES.EXPERT,
            2,
            expertProfile,
            true,
            <AppImages.Dashboard.CreateExpert_ICON />,
            <AppImages.Dashboard.Unselected_expert_ICON />,
          )}
        </View>
      </View>

      <View style={styles.button}>
        <CustomButton
          label={buttonLabel}
          inactive={true}
          onPress={() => handleClick(selectedIndex)}
        />
        {isSkipButton && (
          <View style={styles.containerLogin}>
            <CustomButton
              inactive
              label={translations.NO_SKIP_FOR_NOW}
              border={true}
              textStyle={styles.borderButtonText}
              onPress={() => skipButton(selectedIndex)}
            />
          </View>
        )}
      </View>

      {isModalVisible && (
        <WelcomeModal
          label={translations.CONGRATULATION}
          bodyText={translations.COMPLETING_FIRST_STEP}
          icon={<AppImages.Dashboard.Congratulation_ICON />}
          isModalVisible={isModalVisible}
          buttonText={translations.LETS_GET_STARTED}
          closeModal={setisModalVisible}
        />
      )}

      <WarningModel
        msg={message}
        isModalVisible={waringModal}
        setConfirm={navigateToRespectiveProfile}
        yesButtonText={translations.CONTINUE}
        setIsModalVisible={setisWarningModal}
        headingStyle={styles.modalLabel}
      />
    </>
  );
};

export default SelectProfile;
