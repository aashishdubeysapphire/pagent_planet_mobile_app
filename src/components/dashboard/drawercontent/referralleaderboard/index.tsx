import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, Dimensions} from 'react-native';
import GalleryGridItem from '../../../common/gallerygriditem';
import {styles} from './styles';
import useCgMutation from '../../../../services/api/useCgMutation';
import {REFERRAL_LEADERABOARD_EVENT} from '../../../../services/endpoints';
import images from '../../../../assets/images/AppImages';
import NoRecord from '../../../common/norecord';
import {ApiStatusType, MethodTypes} from '../../../../services/constants';
import ShimmerList from '../../../common/shimmer/listshimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import {checkIsConnected} from '../../../utils/helperFunction';
import Header from '../../../common/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import translations from '../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../root/screenname';

const ReferralLeaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [eventList, setEventList] = useState([]);
  const navigation = useNavigation();

  const {mutateAsync: referralLeaderboardEvent} = useCgMutation({
    key: REFERRAL_LEADERABOARD_EVENT,
    method: MethodTypes.GET,
    url: REFERRAL_LEADERABOARD_EVENT,
    offSuccessToast: true,
    disableLoader: true,
  });
  useEffect(() => {
    if (checkIsConnected()) {
      getreferalleaderboardevent();
    }
  }, []);

  const onItemClick = item => {
    navigation.navigate(SCREEN.CONTESTANT_LEADERBOARD_LIST, item.item.id);
  };
  const getreferalleaderboardevent = async () => {
    setLoading(true);
    const res = await referralLeaderboardEvent();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setEventList(res?.data);

      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.REFERRAL_LEADERABOARD} isUnderLineRequired />
      <Text style={styles.title}>{translations.EVENTS}</Text>
      {loading ? (
        <View style={styles.gap}>
          <ShimmerList
            width={Dimensions.get('window').width - moderateScale(32)}
            height={moderateScaleVertical(100)}
            padding={15}
            borderRadius={16}
          />
        </View>
      ) : (
        <>
          {eventList.length > 0 ? (
            <View style={styles.gap}>
              <FlatList
                data={eventList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                renderItem={item => (
                  <GalleryGridItem
                    imageUrl={item.item.main_image_full_url}
                    label={item.item.title}
                    onItemClickListener={() => onItemClick(item)}
                    isList={true}
                    maxLines={3}
                    editIcon={false}
                    ticket={item.item.totalEventReferrals}
                  />
                )}
              />
            </View>
          ) : (
            <NoRecord rightIcon={<images.Common.NO_PAGEANT_FOUND_ICON />} />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ReferralLeaderboard;
