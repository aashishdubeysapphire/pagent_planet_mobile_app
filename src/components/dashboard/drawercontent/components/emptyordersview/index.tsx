import React from 'react';
import {Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import CustomButton from '../../../../common/button';
import {moderateScale, width} from '../../../../utils/responsiveSize';
import {SCREEN} from '../../../../../root/screenname';
import { USER_DESHBOARD_TAB } from '../../../../utils/enum';

interface Props {
  mainText: string;
  subText: string;
  showButton: boolean;
  imageIcon: any;
  flexCount: number;
  isPng: boolean;
}

const EmptyOrdersView = ({
  mainText,
  subText,
  showButton,
  imageIcon,
  flexCount = 1,
  isPng = false,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={{...styles.emptyContainer, flex: flexCount}}>
      {isPng ? (
        <Image
          source={imageIcon}
          style={{width: width - moderateScale(70), height: width / 2}}
          resizeMode="contain"
        />
      ) : (
        imageIcon
      )}
      <Text style={styles.textualInfo}>{mainText}</Text>
      <Text style={styles.noOrderPlaced}>{subText}</Text>
      {showButton ? (
        <View style={styles.buttonStyles}>
          <CustomButton
            label={translations.SHOP_PRODUCTS}
            smallHeight
            onPress={() => {
              navigation.navigate(SCREEN.DASHBOARD_NAVIGATION, {
                screen: SCREEN.HOME,
                params: {
                  screen: USER_DESHBOARD_TAB.SHOP,
                },
              });
            }}
            inactive={true}
          />
        </View>
      ) : (
        <View style={styles.buttonStyles}></View>
      )}
    </View>
  );
};

export default EmptyOrdersView;
