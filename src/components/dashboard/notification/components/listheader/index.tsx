import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppImages from '../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import {useNetInfo} from '@react-native-community/netinfo';
import {SCREEN} from '../../../../../root/screenname';
import {internetState} from '../../../../common/commonalert';
import translations from '../../../../../assets/translations';

interface Props {
  tabName: string | undefined;
  unReadCount: number | undefined;
  isNotificationEnable: boolean | undefined;
}

const ListHeader = ({tabName, unReadCount, isNotificationEnable}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const onMangaeNotificationClick = () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.MANAGE_NOTIFICATION);
    }
  };
  return (
    <View>
      <View style={styles.haaderBg}>
        <View style={styles.row}>
          <Text style={styles.heading}>
            {tabName !== undefined ? tabName : translations.WHAT_IS_NEW_HERE}
          </Text>
          {unReadCount !== undefined && unReadCount > 0 && (
            <Text style={styles.readCount}>
              {unReadCount + ' ' + translations.UNREAD}
            </Text>
          )}
        </View>
      </View>
      {isNotificationEnable !== undefined && !isNotificationEnable && (
        <View style={styles.haaderBg}>
          <View style={styles.notifcationOffContainer}>
            <AppImages.Dashboard.NotificationLogoICON />

            <View>
              <Text style={styles.agreeText}>
                {translations.THE_NOTIFICATION_HAVE_BEEN_TURNED_OFF_ACTIVATE}
              </Text>
              <View style={styles.noticationManagerRow}>
                <Text style={styles.agreeText}>{translations.THEM_UNDER}</Text>
                <TouchableOpacity onPress={onMangaeNotificationClick}>
                  <Text style={styles.link}>
                    {translations.MANAGE_NOTIFICATION}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ListHeader;
