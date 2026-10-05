import {View, Text, AppState} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import CustomButton from '../button';
import translations from '../../../assets/translations';
import BackgroundTimer from 'react-native-background-timer';
import {FORCEFULLY_LOGOUT} from '../../../services/endpoints';
import {internetState} from '../commonalert';
import useCgMutation from '../../../services/api/useCgMutation';
import {UserContext} from '../../../store/userStore';
import {Base} from '../../../services/models/base';
import {
  useSetLoader,
  useClaimAlertModalVisible,
} from '../../../store/useAppStore';
import {MethodTypes} from '../../../services/constants';
import {useNetInfo} from '@react-native-community/netinfo';
import AppImages from '../../../assets/images/AppImages';
import {styles} from './styles';
import ForceLogoutModal from '../forcelogoutmodal';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  customStyles?: any;
}
/* The `AlertBottomModal` function component is defined with destructuring the `isModalVisible` and
`setIsModalVisible` props from the `Props` interface. These props are used to control the visibility
of the modal. */
const AlertBottomModal = ({isModalVisible, setIsModalVisible}: Props) => {
  const netInfo = useNetInfo();
  const [globleTimer, setGlobleTimer] = React.useState(30);
  const {removeData} = useContext(UserContext);
  const setClaimAlertModalVisible = useClaimAlertModalVisible();
  const setLoader = useSetLoader();
  const {mutateAsync: logoutRequest} = useCgMutation<Base>({
    key: FORCEFULLY_LOGOUT,
    method: MethodTypes.GET,
    url: FORCEFULLY_LOGOUT,
    disableLoader: true,
  });

  useEffect(() => {
    // Subscribe
    const subscription = AppState.addEventListener('change', handleChange);

    // Unsubscribe on cleanup
    return () => {
      subscription.remove();
    };
  }, []);
  /**
   * The function `onLogout` checks if the device is connected to the internet, and if so, sends a
   * logout request and performs some actions based on the response.
   * @returns If the `netInfo.isConnected` is false, then the function will return `false`. Otherwise,
   * if the `logoutRequest` is successful, the function will return `undefined`.
   */
  const onLogout = async () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      const response = await logoutRequest();

      if (response.success) {
        setClaimAlertModalVisible(false);
        setTimeout(() => {
          removeData();
        }, 300);
      }
    }
  };

  /**
   * It starts a timer that counts down from the value of globleTimer to 0.
   */
  const timerFunc = () => {
    BackgroundTimer.stopBackgroundTimer();

    BackgroundTimer.runBackgroundTimer(() => {
      if (globleTimer === 0) {
        BackgroundTimer.stopBackgroundTimer();
      }
      setGlobleTimer(globleTimer - 1);
    }, 1000);
  };

  /**
   * The handleChange function sets the claimAlertModalVisible state to false if the newState is not
   * equal to 'active'.
   */
  const handleChange = newState => {
    if (newState !== 'active') {
      setClaimAlertModalVisible(false);
    }
  };
  useEffect(() => {
    if (globleTimer > 0) {
      timerFunc();
    } else {
      onLogout();
    }
  }, [globleTimer]);

  /**
   * It takes a number of seconds and returns a string in the format of mm:ss
   * @returns A string with the minutes and seconds of the time.
   */
  const getTimer = seconds => {
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor((seconds % 3600) % 60);

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return `${m}:${s}`;
  };

  return (
    <ForceLogoutModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{
        height: moderateScaleVertical(367),
        paddingHorizontal: moderateScaleVertical(16),
      }}>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>Alert</Text>
      </View>
      <Text style={styles.updatedDeshboardText}>
        {translations.UPDATE_DASHBOARD}
      </Text>
      <View style={styles.switchRow}>
        <View style={styles.icon}>
          <AppImages.Common.TPP_INFO_GREY />
        </View>
        <Text style={styles.donotswitch}>{translations.DONT_SWITCH}</Text>
      </View>
      <Text style={styles.autoLogoutText}>{translations.AUTO_LOGOUT}</Text>
      <Text style={styles.timertext}>{getTimer(globleTimer)}</Text>
      <View style={styles.containerConfirm}>
        <CustomButton
          inactive
          label={translations.LOGOUT_NOW}
          deleteModal
          smallHeight
          textStyle={styles.logoutButtonText}
          onPress={() => {
            onLogout();
          }}
        />
      </View>
    </ForceLogoutModal>
  );
};

export default AlertBottomModal;
