import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../assets/translations';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../../common/commonalert';
import FastImageView from '../../../../../../../../../common/fastimageview';
import {
  DIRECTORY_ID,
  PLACEMENT,
  PROFILE_STATUS,
  ROLES,
} from '../../../../../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';
import {checkIsNull} from '../../../../../../../../../utils/validations';
import {styles} from './styles';

interface Props {
  data: any;
  numberOfLinesForSubTitle?: number;
  numberOfLinesForTitle?: number;
  itemSize: number;
  horizontal: boolean;
}
const EventResultGridView = ({
  data,
  numberOfLinesForTitle,
  numberOfLinesForSubTitle,
  itemSize,
  horizontal,
}: Props) => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();


  const onClaimProfileClicked = (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (data !== undefined) {
      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.SMALL_CONTESTANT,
        slug: data[index]?.contestant_slug,
      });
    }
  };

  const moveTOContestantPublicProfile = (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (data !== undefined) {
      if (
        data[index].owner_id === ROLES.ADMIN_ID ||
        data[index]?.is_minor === translations.YES ||
        data[index]?.contestant_status !== PROFILE_STATUS.ACTIVE
      ) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId: data[index].owner_id,
          profileId: data[index].contestant_id,
          name: data[index].contestant_name,
          key: new Date().getMilliseconds(),
          category: DIRECTORY_ID.CONTESTANT,
          selectedTab: ROLES.CONTESTANT,
        });
      }
    }
  };

  return (
    <View style={{marginRight: horizontal ? 0 : moderateScale(16)}}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        key={horizontal ? '*' : '$'}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={horizontal ? true : false}
        horizontal={horizontal}
        numColumns={horizontal ? 0 : 2}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({item, index}) => (
          <View style={{...styles.container, width: itemSize}}>
            <View style={styles.awardSection}>
              <View style={styles.imageSection}>
                <FastImageView
                  width={itemSize}
                  height={itemSize}
                  borderRadius={moderateScaleVertical(24)}
                  imageUrl={item?.contestant_image_url}
                />
                {item?.owner_id === ROLES.ADMIN_ID && (
                  <TouchableOpacity
                    style={{
                      ...styles.claimSection,
                      top: itemSize - moderateScale(31),
                    }}
                    onPress={() => onClaimProfileClicked(index)}>
                    <AppImages.PUBLIC_PROFILE.WhiteClaimProfile />
                    <Text style={styles.claimLabel}>
                      {translations.CLAIM_PROFILE_SMALL}
                    </Text>
                  </TouchableOpacity>
                )}
                {item?.owner_id === ROLES.ADMIN_ID ||
                item?.is_minor === translations.YES ||
                item?.contestant_status !== PROFILE_STATUS.ACTIVE ? (
                  <View style={styles.noProfileSection}>
                    <AppImages.PUBLIC_PROFILE.NoProfileIcon />
                  </View>
                ) : null}
              </View>
              <View style={styles.awardLabelArea}>
                <Text
                  style={styles.awardLabel}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {checkIsNull(item?.award_title)
                    ? item?.award_title
                    : item?.type === 1
                    ? PLACEMENT.WINNER
                    : item?.type === 2
                    ? PLACEMENT.RUNNER_UP1
                    : item?.type === 3
                    ? PLACEMENT.RUNNER_UP2
                    : item?.type === 4
                    ? PLACEMENT.RUNNER_UP3
                    : item?.type === 5
                    ? PLACEMENT.RUNNER_UP4
                    : null}
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.titleSection,
                height:
                  numberOfLinesForSubTitle === 1
                    ? moderateScaleVertical(66)
                    : moderateScaleVertical(78),
              }}>
              <TouchableOpacity
                onPress={() => moveTOContestantPublicProfile(index)}>
                <Text
                  style={styles.title}
                  numberOfLines={numberOfLinesForTitle}
                  ellipsizeMode="tail">
                  {item?.contestant_name}
                </Text>
              </TouchableOpacity>
              {checkIsNull(item?.contestant_title) && (
                <Text
                  style={styles.infoLabel}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item?.contestant_title}
                </Text>
              )}
              {checkIsNull(item?.additional_title) && (
                <Text
                  style={styles.additionalTitleLabel}
                  numberOfLines={numberOfLinesForSubTitle}
                  ellipsizeMode="tail">
                  {item?.additional_title_value}
                </Text>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default EventResultGridView;
