import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import {color} from '../../../../../assets/colorConstant';
import {AnimatedFAB} from 'react-native-paper';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {isIosDevice} from '../../../../utils/helperFunction';

interface Props {
  isExtended: boolean;
  showComposeIcon: boolean;
  topMargin: number;
}

const ComposeButton = ({isExtended, showComposeIcon, topMargin}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={{top: !!topMargin ? topMargin : null}}>
      <AnimatedFAB
        label={
          !isIosDevice()
            ? translations.COMPOSE
            : ' ' + translations.COMPOSE
        }
        uppercase={false}
        extended={isExtended}
        visible={true}
        animateFrom={'right'}
        iconMode={'dynamic'}
        variant='primary'
        theme={{colors: {primaryContainer: color.P_PINK}, isV3: false}}
        color={color.WHITE}
        style={styles.buttonStyle}
        onPress={() => navigation.navigate(SCREEN.COMPOSE)}
      />
      {!isExtended ? (
        <TouchableOpacity
          style={styles.buttonStyle1}
          onPress={() => navigation.navigate(SCREEN.COMPOSE)}>
          <AppImages.MESSAGES.ComposeIcon />
        </TouchableOpacity>
      ) : isExtended && showComposeIcon ? (
        <View style={styles.buttonStyle2}>
          <AppImages.MESSAGES.ComposeIcon />
        </View>
      ) : null}
    </View>
  );
};

export default ComposeButton;
