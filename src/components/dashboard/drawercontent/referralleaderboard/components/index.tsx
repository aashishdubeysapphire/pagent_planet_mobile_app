import React from 'react';
import {FlatList, Dimensions, View, Text} from 'react-native';
import {styles} from './styles';
import {EVENT_CONTESTANT_LIST} from '../../../../../services/endpoints';
import images from '../../../../../assets/images/AppImages';
import NoRecord from '../../../../common/norecord';
import {Param} from '../../../../../services/constants';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
import Header from '../../../../common/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import translations from '../../../../../assets/translations';
import LinearGradient from 'react-native-linear-gradient';
import FastImageView from '../../../../common/fastimageview';
import useInfiniteHtQuery from '../../../../../services/api/useHtInfiniteQuery';
import {color} from '../../../../../assets/colorConstant';

const ReferralLeaderboardList = ({route}) => {
  const {
    data: paginatedData,
    isLoading,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteHtQuery({
    key: EVENT_CONTESTANT_LIST + route.params,
    url: EVENT_CONTESTANT_LIST + route.params,
    page: Param.PAGE_,
    getDataArray: page => page?.getEventReferrals?.data?.length,
    disableLoader: true,
  });

  const contestantList =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.getEventReferrals?.data !== null &&
          page?.data?.getEventReferrals?.data !== undefined
        ) {
          return page?.data?.getEventReferrals?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const isEvenNumber = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={paginatedData?.pages[0]?.data?.eventData?.title}
        isUnderLineRequired
      />

      <LinearGradient
        colors={[
          'rgba(211, 156, 110, 0.1)',
          'rgba(212, 150, 111, 0.08)',
          'rgba(230, 66, 122, 0.23)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradientStyles}
        locations={[0.2, 0.5, 1]}>
        <FastImageView
          width={moderateScaleVertical(124)}
          height={moderateScaleVertical(124)}
          borderRadius={moderateScaleVertical(60)}
          isCircle
          imageUrl={
            paginatedData?.pages[0]?.data?.eventData?.main_image_full_url
          }
        />
        <Text style={styles.eventName}>
          {paginatedData?.pages[0]?.data?.eventData?.title}
        </Text>
      </LinearGradient>
      <Text style={styles.heading}>{translations.REFERRAL_LEADERABOARD}</Text>
      {(contestantList.length > 0 && !isLoading) ||
      (contestantList.length > 0 && isFetchingNextPage && isRefetching) ? (
        <View style={styles.gap}>
          <FlatList
            data={contestantList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item, index}) => (
              <View
                style={{
                  ...styles.listRow,
                  backgroundColor: isEvenNumber(index)
                    ? color.S_GRAY_1
                    : color.WHITE,
                }}>
                <View style={styles.imageSection}>
                  <FastImageView
                    width={moderateScaleVertical(48)}
                    height={moderateScaleVertical(48)}
                    borderRadius={moderateScaleVertical(24)}
                    imageUrl={item?.contestantdata?.main_image_full_url}
                  />
                </View>
                <View style={styles.listRow1}>
                  <View>
                    <Text style={styles.contestantName}>
                      {' '}
                      {item?.contestantdata?.name}
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.referral}> {'Referrals'}</Text>
                    <Text style={styles.referralCount}>
                      {' '}
                      {item?.total_referal}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      ) : isLoading || isRefetching ? (
        <View style={styles.gap}>
          <ShimmerList
            width={Dimensions.get('window').width}
            height={moderateScaleVertical(72)}
            padding={5}
            borderRadius={0}
          />
        </View>
      ) : (
        <NoRecord rightIcon={<images.Common.NO_PAGEANT_FOUND_ICON />} />
      )}
    </SafeAreaView>
  );
};

export default ReferralLeaderboardList;
