import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import translations from '../../../../../../../../assets/translations';
import { SCREEN } from '../../../../../../../../root/screenname';
import { UpgradPlan } from '../../../../../../../../services/constants';
import { Contestant } from '../../../../../../../../services/models/pageantdetails/contestant';
import { Pageant } from '../../../../../../../../services/models/pageantdetails/pageant';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../common/commonalert';
import {
  DIRECTORY_ID,
  PROFILE_STATUS,
  ROLES,
} from '../../../../../../../utils/enum';
import { checkIsNull } from '../../../../../../../utils/validations';
import ContestantsList from '../contestantlist';
import { styles } from './styles';

// Define the Props interface for TotalContestants component
interface Props {
  contestantData: Contestant[] | undefined;
  itemSize: number;
  eventID: number;
  eventDetail: Pageant | undefined;
  toalNoOfContestant: number | undefined;
}

const TotalContestants = ({
  contestantData,
  itemSize,
  eventID,
  eventDetail,
  toalNoOfContestant,
}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  // Function to navigate to a contestant's public profile
  const moveToConstestantPublicProfileScreen = (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (contestantData !== undefined) {
      if (
        contestantData[index]?.is_minor !== translations.NO_SMALL ||
        contestantData[index]?.status !== PROFILE_STATUS.ACTIVE
      ) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId:
            contestantData[index].owner_id === 1
              ? contestantData[index].contestant_id
              : contestantData[index].owner_id,
          profileId: contestantData[index].contestant_id,
          name: contestantData[index].name,
          key: new Date().getMilliseconds(),
          category: DIRECTORY_ID.CONTESTANT,
          selectedTab: ROLES.CONTESTANT,
        });
      }
    }
  };

  // Function to navigate to the claim profile screen
  const moveToClaimProfileScreen = (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (contestantData !== undefined) {
      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.SMALL_CONTESTANT,
        slug: contestantData[index]?.slug,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowSection}>
        <Text style={styles.heading}>
          {translations.CONTESTANTS + '(' + toalNoOfContestant + ')'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT,
              {
                eventId: eventID,
                key: new Date().getMilliseconds() + '',
                isPcaActivated: eventDetail?.is_pca_activated,
                isPageantCompleted: eventDetail?.is_pageant_completed,
                hideContestantLastName: eventDetail?.hide_contestant_last_name,
              },
            );
          }}
          style={styles.viewStyles}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlistView}>
        <FlatList
          data={contestantData}
          numColumns={1}
          key={'#'}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item, index }) => (
            <ContestantsList
              position={index}
              imagePath={item?.final_image_url}
              itemSize={itemSize}
              onTextClickListener={moveToConstestantPublicProfileScreen}
              ownerId={item?.owner_id}
              contestantName={
                checkIsNull(item?.contestant_name)
                  ? item?.contestant_name
                  : eventDetail?.hide_contestant_last_name === UpgradPlan.YES
                    ? checkIsNull(item?.first_name)
                      ? item?.first_name
                      : item?.name
                    : item?.name
              }
              title={item?.contestant_title}
              numberOfLinesForName={1}
              numberOfLinesForTitle={1}
              horizontalView={true}
              isMinor={item?.is_minor !== translations.NO_SMALL}
              isActive={item?.status === PROFILE_STATUS.ACTIVE}
              onClaimButtonPress={moveToClaimProfileScreen}
            />
          )}
        />
      </View>
    </View>
  );
};

export default TotalContestants;
