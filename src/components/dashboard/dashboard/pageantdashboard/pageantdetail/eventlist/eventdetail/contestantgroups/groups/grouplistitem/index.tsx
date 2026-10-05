import React, {useState} from 'react';
import {Text, View} from 'react-native';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import {styles} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import {GROUP} from '../../../../../../../../../utils/enum';
import WarningModel from '../../../../../../../../../common/warningmodel';
import translations from '../../../../../../../../../../assets/translations';

interface Props {
  memberCount: number;
  heading: string;
  eventId: number;
  groupId: number;
  text: string;
  onPressConfirm: any;
}
const GroupListItem = ({
  heading,
  eventId,
  groupId,
  text,
  memberCount,
  onPressConfirm,
}: Props) => {
  const navigation = useNavigation();

  const [deleteCOnfiramtionModalVisible, setDeleteCOnfiramtionModalVisible] =
    useState(false);
  const setConfirm = () => {
    setDeleteCOnfiramtionModalVisible(false);
    onPressConfirm();
  };
  return (
    <>
      <TouchableOpacity
        style={styles.closedContainer}
        onPress={() => {
          navigation.navigate(SCREEN.EDIT_GROUP, {
            eventId: eventId,
            name: heading,
            description: text,
            groupId: groupId,
          });
        }}>
        <View style={styles.column}>
          <View style={styles.topRow}>
            <Text numberOfLines={1} style={styles.toDoHeading}>
              {heading}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() =>
                  navigation.navigate(SCREEN.ADD_GROUP, {
                    id: GROUP.EDIT_GROUP,
                    name: heading,
                    description: text,
                    eventId: eventId,
                    groupId: groupId,
                  })
                }>
                <AppImages.EditProfile.Tpp_edit_circle_icon />
              </TouchableOpacity>

              {memberCount === 0 && (
                <TouchableOpacity
                  onPress={() => setDeleteCOnfiramtionModalVisible(true)}>
                  <AppImages.Common.MyUploadsDelete />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.iconRow}>
            <View style={styles.infoView}>
              <AppImages.Common.Group />
              <Text style={styles.infoText}>
                {memberCount} {translations.CONTESTANTS}
              </Text>
            </View>
          </View>
          {text && <Text style={styles.toDoText}>{text}</Text>}
        </View>
        <WarningModel
          msg={translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_GROUP}
          isModalVisible={deleteCOnfiramtionModalVisible}
          setConfirm={setConfirm}
          setIsModalVisible={setDeleteCOnfiramtionModalVisible}
          headingStyle={styles.modalHeading}
        />
      </TouchableOpacity>
    </>
  );
};

export default GroupListItem;
