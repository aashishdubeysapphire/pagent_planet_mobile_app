import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import translations from '../../../../../../../assets/translations';
import AppImages from '../../../../../../../assets/images/AppImages';
import CustomButton from '../../../../../../common/button';
import {SCREEN} from '../../../../../../../root/screenname';
import {ROLES, USER_DESHBOARD_TAB} from '../../../../../../utils/enum';
import AnimatedLottieView from 'lottie-react-native';

const ExpertCelebration = ({selectedProfile, nameOfCompany}) => {
  const navigation = useNavigation();
  const getText = () => {
    if (selectedProfile.display_name == ROLES.PHOTOGRAPHER) {
      return translations.PER_PHOTOSHOOT;
    } else if (selectedProfile.display_name == ROLES.AESTHETICS) {
      return translations.ASTHETHIC_PAY;
    } else if (
      selectedProfile.display_name == ROLES.JUDGE ||
      selectedProfile.display_name == ROLES.EMCEE
    ) {
      return translations.CHARGE_TO + selectedProfile.display_name + '?';
    } else if (
      selectedProfile.display_name == ROLES.RETAILER ||
      selectedProfile.display_name == ROLES.DESIGNER
    ) {
      return translations.SELLING_LIST_THEM;
    } else if (selectedProfile.display_name == ROLES.PRODUCTION) {
      return translations.PRODUCTION_PRICE;
    } else if (selectedProfile.display_name == ROLES.PERSOANAL_TAINER) {
      return translations.PERSOLNAL_TRANING_PRICE;
    } else if (selectedProfile.display_name == ROLES.COACH) {
      return translations.COATCH_PRICE;
    } else if (selectedProfile.display_name == ROLES.HAIR_MAKEUP_ARTIST) {
      return translations.HAIR_PRICE;
    } else {
      return (
        translations.HOW_MUCH_DO_YOU_CHARGE + selectedProfile.display_name + '?'
      );
    }
  };
  const getSellBtnText = () => {
    if (
      selectedProfile.display_name == ROLES.RETAILER ||
      selectedProfile.display_name == ROLES.DESIGNER
    ) {
      return translations.SELL_YOUR_PRODUCTS;
    } else {
      return translations.SELL_YOUR_SERVICES;
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.animcontainer}>
        <AnimatedLottieView
          source={require('../../../../../../../assets/anim/confetti_congratulation.json')}
          autoPlay
          speed={1.2}
          loop={true}
          style={styles.animcontainer}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.pinkHeading}>{translations.SUCCESS}</Text>
        <Text style={styles.subHeading}>
          {nameOfCompany + translations.PROFILE_HAS_BEEN_CREATED}
        </Text>
        <View style={styles.celebrationImage}>
          <Image
            source={AppImages.Common.profileCreated}
            style={styles.pngImage}
          />
        </View>
        <Text style={styles.boostProfileText}>{getText()}</Text>
        <Text style={styles.addProduct}>
          {translations.ADD_A_PRODUCT_TO_SELL}
        </Text>

        <CustomButton
          inactive
          label={getSellBtnText()}
          onPress={() => {
            navigation?.reset({
              index: 0,
              routes: [
                {
                  name: SCREEN.DASHBOARD_NAVIGATION,
                },
              ],
            });

            navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
              redirectedto: selectedProfile.display_name,
            });
            navigation.navigate(SCREEN.SELL_ITEM_SERVICES);
          }}
        />
        <View style={styles.buttonView}>
          <CustomButton
            inactive
            label={translations.NO_DONE}
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
              navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
                redirectedto: selectedProfile.display_name,
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExpertCelebration;
