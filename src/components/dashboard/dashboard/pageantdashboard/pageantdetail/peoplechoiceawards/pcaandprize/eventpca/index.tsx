/* A function component , which shows the events People's Choice Awards List .
   It shows the no of total votes, total amount on a particular Age Division,
   also the winner name and Contestant list on the screen  */

import React, {useEffect} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import {GET_EVENT_PCA_VOTE_LIST} from '../../../../../../../../services/endpoints';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {color} from '../../../../../../../../assets/colorConstant';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';
import useInfiniteHtQuery from '../../../../../../../../services/api/useHtInfiniteQuery';
import {Param} from '../../../../../../../../services/constants';
import {EVENT_VOTE_LIST} from '../../../../../../../../services/models/event/eventVoteList';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';

interface Props {
  eventId?: number;
  ageId: string;
  setPCAState?: any;
  setPerVotePrice: any;
  setPromotionApply: any;
  setOneWinnerForAll: any;
  setTotalVotes: any;
}

const EventPCA = ({
  eventId,
  ageId,
  setPCAState,
  setPerVotePrice,
  setPromotionApply,
  setOneWinnerForAll,
  setTotalVotes,
}: Props) => {
  //API GET EVENT PCA_VOTE LIST----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteHtQuery<EVENT_VOTE_LIST>({
    key: GET_EVENT_PCA_VOTE_LIST + eventId + ageId,
    url:
      GET_EVENT_PCA_VOTE_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.voteList?.data?.length,
    reverse: true,
    disableLoader: true,
  });

  const voteListData =
    paginatedData?.pages
      ?.map((page: EVENT_VOTE_LIST) => {
        if (
          page?.data?.voteList?.data !== null &&
          page?.data?.voteList?.data !== undefined
        ) {
          return page?.data?.voteList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const dataList = paginatedData?.pages[0].data;

  //API GET EVENT PCA_VOTE LIST----------------------------------------- END

  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  useEffect(() => {
    if (dataList?.event?.per_vote_price !== undefined) {
      setPerVotePrice(dataList?.event?.per_vote_price);
    }
    if (dataList?.event?.is_pca_activated === translations.YES) {
      setPCAState(translations.ACTIVE);
    } else if (dataList?.event?.is_pca_activated === translations.NO_SMALL) {
      setPCAState(translations.INACTIVE);
    }
    if (
      dataList?.discounted_totals !== null &&
      dataList?.discounted_totals !== undefined
    ) {
      setPromotionApply(true);
    }
    if (dataList?.event?.one_winner_only === 1) {
      setOneWinnerForAll(true);
    }
    if (
      dataList?.total_votes_count !== null &&
      dataList?.total_votes_count !== undefined
    ) {
      setTotalVotes(dataList?.total_votes_count);
    }
  }, [dataList]);

  const onEndReached = () => {
    fetchNextPage();
  };

  const showVotes = (index: number, noOfVotes: number, amount: number) => {
    return (
      <View style={styles.voteListContainer}>
        <View
          style={{
            ...styles.voteSection,
            backgroundColor: index !== 1 ? color.S_GRAY_1 : color.S_PINK,
            borderColor: index !== 1 ? color.S_GRAY_2 : color.TRANSPARENT,
          }}>
          <AppImages.PCA.TOTAL_VOTES_ICON />
          <View style={styles.marginForVotes}>
            <Text style={styles.totalVotesLabel}>
              {translations.TOTAL_VOTES}
            </Text>
            <Text
              style={{
                ...styles.totalCountLabel,
                color: index === 1 ? color.P_PINK : color.INPUT_TEXT,
              }}
              numberOfLines={1}>
              {noOfVotes === undefined ? 0 : noOfVotes}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.voteSection,
            backgroundColor: index !== 1 ? color.S_GRAY_1 : color.S_PINK,
            borderColor: index !== 1 ? color.S_GRAY_2 : color.TRANSPARENT,
          }}>
          <AppImages.PCA.TOTAL_AMOUNT_ICON />
          <View style={styles.marginForVotes}>
            <Text style={styles.totalVotesLabel}>
              {translations.TOTAL_AMOUNT}
            </Text>
            <Text
              style={{
                ...styles.totalCountLabel,
                color: index === 1 ? color.P_PINK : color.INPUT_TEXT,
              }}
              numberOfLines={1}>
              ${amount === undefined ? 0.0 : amount?.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const showHeaderPromotional = (heading: string, price) => {
    return (
      <View style={styles.promotionVotesArea}>
        <Text style={styles.promotionalLabel}>{heading}</Text>
        <Text style={styles.votesValueLabel}>
          $
          {heading === translations.WITH_PROMOTION_VOTES
            ? (price / 2).toFixed(2)
            : price.toFixed(2)}
        </Text>
      </View>
    );
  };

  const showContestantInfo = (
    index: number,
    contestantName: string,
    totalVotes: any,
    amount: any
  ) => {
    return (
      <View
        style={{
          ...styles.contestantList,
          backgroundColor:
            index === -1
              ? color.S_PINK
              : index % 2 === 0
              ? color.WHITE
              : color.S_GRAY_1,
        }}>
        <Text
          style={{
            ...styles.contestantNameLabel,
            width: '50%',
            fontWeight: index === -1 ? '500' : '400',
          }}
          numberOfLines={1}>
          {contestantName}
        </Text>
        <Text
          style={{
            ...styles.contestantNameLabel,
            fontWeight: index === -1 ? '500' : '400',
          }}
          numberOfLines={1}>
          {totalVotes}
        </Text>
        <Text
          style={{
            ...styles.contestantNameLabel,
            paddingRight: 0,
            fontWeight: index === -1 ? '500' : '400',
          }}
          numberOfLines={1}>
          {index === -1 ? amount : '$' + amount?.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isLoading && dataList !== undefined ? (
        <>
          <View style={{marginHorizontal: moderateScale(16)}}>
            <View style={styles.votesArea}>
              {showVotes(
                1,
                dataList?.total_votes_count,
                dataList?.total_votes_amount
              )}
              {dataList?.discounted_totals
                ? showHeaderPromotional(
                    translations.WITH_PROMOTION_VOTES,
                    dataList?.event?.per_vote_price
                  )
                : null}
              {dataList?.discounted_totals
                ? showVotes(
                    2,
                    dataList?.discounted_totals?.total_votes_count,
                    dataList?.discounted_totals?.total_votes_amount
                  )
                : null}
              {dataList?.without_discounted_totals
                ? showHeaderPromotional(
                    translations.WITHOUT_PROMOTION_VOTES,
                    dataList?.event?.per_vote_price
                  )
                : null}
              {dataList?.without_discounted_totals
                ? showVotes(
                    3,
                    dataList?.without_discounted_totals?.total_votes_count,
                    dataList?.without_discounted_totals?.total_votes_amount
                  )
                : null}
            </View>
            {dataList?.awardWinner !== undefined &&
            dataList?.awardWinner !== null ? (
              <View style={{marginTop: moderateScaleVertical(24)}}>
                <FastImage
                  style={styles.awardWinnerArea}
                  source={AppImages.PCA.VOTES_BG_ICON}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.awardWinnerLabel}>
                  <Text style={styles.promotionalLabel}>
                    {translations.WINNING_CONTESTANT}
                  </Text>
                  <Text style={styles.totalCountLabel} numberOfLines={2}>
                    {dataList?.awardWinner}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>

          {voteListData?.length !== 0 ? (
            <View style={styles.flatListView}>
              {showContestantInfo(
                -1,
                translations.CONTESTANT_NAME,
                translations.TOTAL_VOTES,
                translations.AMOUNT
              )}
              <FlatList
                data={voteListData}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                key={'*'}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={listFooterComponent}
                scrollEnabled={true}
                onEndReached={onEndReached}
                renderItem={({item, index}) =>
                  showContestantInfo(
                    index,
                    item?.contestantProfile?.name,
                    item?.votes,
                    item?.total_pageant_votes
                  )
                }
              />
            </View>
          ) : null}
        </>
      ) : isLoading || isFetching ? (
        <View style={{marginTop: moderateScaleVertical(24)}}>
          <ShimmerList
            width={Dimensions.get('window').width / 2 - moderateScale(24)}
            height={moderateScaleVertical(70)}
            numColumns={2}
            padding={16}
          />
        </View>
      ) : (
        <View style={styles.emptyState}>{showVotes(1, 0, 0)}</View>
      )}
    </View>
  );
};

export default EventPCA;
