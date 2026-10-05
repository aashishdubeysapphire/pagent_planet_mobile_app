import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import CustomButton from '../../../../../common/button';
import {SCREEN} from '../../../../../../root/screenname';
import {ROLES, USER_DESHBOARD_TAB} from '../../../../../utils/enum';
import {useNavigation} from '@react-navigation/core';

const FunFactConfirmation = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.pinkHeading}>{translations.CHEERS}</Text>
        <Text style={styles.subHeading}>{translations.CONTESTANT_CREATED}</Text>
        <View style={styles.celebrationImage}>
          <AppImages.Common.congratulations_ICON />
        </View>
        <Text style={styles.boostProfileText}>
          {translations.BOOST_PROFILE}
        </Text>

        <CustomButton
          inactive
          label={translations.YES}
          onPress={() => {
            navigation.navigate(SCREEN.FUN_FACTS);
          }}
        />
        <View style={styles.buttonView}>
          <CustomButton
            inactive
            label={translations.NO_SKIP}
            border={true}
            textStyle={styles.borderButtonText}
            onPress={() => {
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
              }, 1);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FunFactConfirmation;
