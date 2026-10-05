import React from 'react';
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import CustomButton from '../../../../../common/button';
import {EVENT_TYPE, ROLES, USER_DESHBOARD_TAB} from '../../../../../utils/enum';
import {SCREEN} from '../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {color} from '../../../../../../assets/colorConstant';
import Lottie from 'lottie-react-native';
const ConfirmationStep = props => {
  const {eventName = '', eventType = ''} = props?.route?.params;
  const navigation = useNavigation();

  const noDone = () => {
    navigation?.reset({
      index: 0,
      routes: [
        {
          name: SCREEN.DASHBOARD_NAVIGATION,
        },
      ],
    });
    setTimeout(() => {
      navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
        redirectedto: ROLES.CONTESTANT,
        tabIndex: 1,
      });
    }, 300);
  };

  const onPressBack = () => {
    noDone();

    return true;
  };

  React.useEffect(() => {
    const handwareBack = BackHandler.addEventListener('hardwareBackPress', onPressBack);
    return () =>
      handwareBack.remove();
  }, [onPressBack]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.animcontainer}>
          <Lottie
            source={require('../../../../../../assets/anim/confetti.json')}
            autoPlay
            speed={1.2}
            loop={true}
          />
        </View>

        <Text style={styles.title}>{eventName}</Text>
        {eventType === EVENT_TYPE.UPCOMING ? (
          <Text style={styles.msgLabel}>
            {translations.COMPLETION_MESSAGE_UPCOMING}
          </Text>
        ) : (
          <Text style={styles.msgLabel}>{translations.COMPLETION_MESSAGE}</Text>
        )}
      </View>

      {eventType === EVENT_TYPE.UPCOMING ? (
        <View style={styles.touchContiner}>
          <TouchableOpacity
            style={{...styles.rectangular, marginRight: 'auto'}}
            onPress={() => {
              noDone()
            }}>
            <View style={styles.clock}>
              <AppImages.Common.clock_ICON />
            </View>
            <Text style={styles.insideButtonText}>
              {translations.SEE_PREP_TIMELINE}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.rectangular,
              marginLeft: 'auto',
              borderColor: color.S_GRAY_1,
            }}>
            <ImageBackground
              source={AppImages.Common.coming_soon}
              borderRadius={20}
              style={{height: '100%', width: '100%'}}>
              <Text
                style={{
                  marginTop: 'auto',
                  textAlign: 'center',
                  marginBottom: moderateScaleVertical(8),
                }}>
                {translations.GO_CROWN_ME}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.touchContiner}>
          <TouchableOpacity
            style={{...styles.rectangular, marginRight: 'auto'}}
            onPress={() => {
              props.navigation.navigate(SCREEN.ADD_EVENT_DETAIL);
            }}>
            <View style={styles.clock}>
              <AppImages.Common.add_ICON />
            </View>
            <Text style={styles.insideButtonText}>
              {translations.ADD_ANOTHER}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.rectangular, marginLeft: 'auto'}}
            onPress={() => {
              navigation.navigate(SCREEN.SELL_ITEM_SERVICES);
            }}>
            <View style={styles.clock}>
              <AppImages.Common.dress_ICON />
            </View>
            <Text style={styles.insideButtonText}>
              {translations.SELL_DRESSES}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          inactive
          label={translations.NO_IM_DONE}
          onPress={noDone}
        />
      </View>
    </View>
  );
};

export default ConfirmationStep;
