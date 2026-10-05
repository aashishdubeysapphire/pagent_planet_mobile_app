import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import translations from '../../../../../../../../assets/translations';
import {SCREEN} from '../../../../../../../../root/screenname';
import {Pageant} from '../../../../../../../../services/models/pageantdetails/pageant';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../common/commonalert';
import UpcomingPageantGridListView from '../../../../../../../common/upcomingpageantgridlist';
import {DIRECTORY_ID, ROLES} from '../../../../../../../utils/enum';
import {moderateScale} from '../../../../../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  eventId: number | undefined;
  judgesEmceeData: Pageant[] | undefined;
}

const JugdeEmceeList = ({judgesEmceeData, eventId}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const onItemClick = (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (
      judgesEmceeData !== undefined &&
      judgesEmceeData[index].owner_id === ROLES.ADMIN_ID
    ) {
      toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
    } else if (judgesEmceeData !== undefined) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: judgesEmceeData[index].owner_id,
        profileId: judgesEmceeData[index].id,
        name: judgesEmceeData[index].business_title,
        category:
          judgesEmceeData[index].business_role_id === DIRECTORY_ID.JUDGE
            ? DIRECTORY_ID.JUDGE
            : DIRECTORY_ID.EMCEE,
        key: new Date().getMilliseconds(),
        selectedTab:
          judgesEmceeData[index].business_role_id === DIRECTORY_ID.JUDGE
            ? ROLES.JUDGE
            : ROLES.EMCEE,
      });
    }
  };

  const moveToClaimProfile = (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (judgesEmceeData !== undefined) {
      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.BUSINESS,
        slug: judgesEmceeData[index]?.slug,
        role: judgesEmceeData[index]?.role,
      });
    }
  };

  return (
    <View style={styles.judgesSectionContainer}>
      <View style={styles.rowSection}>
        <Text style={styles.heading}>
          {translations.EVENT + ' ' + translations.JUDGES_EMCEES}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_JUDGE_EMCEES,
              {
                eventId: eventId,
              },
            );
          }}
          style={styles.viewStyles}>
          <Text style={styles.viewButtonContainer}>
            {translations.VIEW_ALL}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlistView}>
        <FlatList
          data={judgesEmceeData}
          numColumns={1}
          key={'#'}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <UpcomingPageantGridListView
              position={index}
              imageUrl={item?.image_full_url}
              label={item?.business_title}
              maxLines={1}
              isList={false}
              onTextClickListener={() => onItemClick(index)}
              size={moderateScale(154)}
              ratings={item?.review_count}
              participantsCount={0}
              horizontalView={true}
              textPaddingVertical={8}
              showRatingsCount={false}
              isProfileAdminOwned={item?.owner_id === ROLES.ADMIN_ID}
              onClaimButtonClicked={() => moveToClaimProfile(index)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default JugdeEmceeList;
