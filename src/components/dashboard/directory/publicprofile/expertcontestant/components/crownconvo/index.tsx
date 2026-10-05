import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { internetState } from '../../../../../../common/commonalert';
import { useIsFocused } from '@react-navigation/core';
import { useSetLoader } from '../../../../../../../store/useAppStore';
import { styles } from './styles';
import { Param } from '../../../../../../../services/constants';
import ConvoDescription from '../../../../../../common/crownconvocomponent';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import { CROWN_CONVO_MY_POSTED_LIST } from '../../../../../../../services/endpoints';
import { ConvoListing } from '../../../../../../../services/models/convo/convoListing';
import { color } from '../../../../../../../assets/colorConstant';
import ShimmerFeed from '../../../../../../common/shimmer/feedshimmer';
import { SCREEN } from '../../../../../../../root/screenname';
import { moderateScaleVertical } from '../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../assets/translations';
import { createFirebaseLog, trackScreenView } from '../../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../../assets/translations/analyticsscreenname';

const CrownConvo = ({ itemId }: Props) => {
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHtQuery<ConvoListing>({
    key: CROWN_CONVO_MY_POSTED_LIST + itemId,
    url: CROWN_CONVO_MY_POSTED_LIST + itemId,
    page: Param.PAGE_,
    getDataArray: page => page?.communityPostList?.data?.length,
    reverse: true,
  });

  let convoListData =
    paginatedData?.pages
      ?.map(page => {
        if (page?.data?.communityPostList.data != null) {
          return page?.data?.communityPostList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const isFocus = useIsFocused();
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();

  useEffect(() => {
    if (isFocus) {
      refetch();
    }
  }, [isFocus]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO)
  }, []);

  const onEndReached = async () => {
    createFirebaseLog(onEndReached?.name, CrownConvo?.name, false);
    if (convoListData !== undefined && convoListData.length > 9) {
      fetchNextPage();
    }
  };
  setTimeout(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        // empty
      } else {
        setLoader(false);
        internetState(netInfo.isConnected!!);
      }
    });
  }, 500);

  const itemSeparatorComponent = () => {
    createFirebaseLog(itemSeparatorComponent?.name, CrownConvo?.name, false);
    return <View style={styles.seperatorStyle} />;
  };

  const footerComponent = () => {
    createFirebaseLog(footerComponent?.name, CrownConvo?.name, false);
    return (
      <View style={styles.freeHeight}>
        {hasNextPage && (
          <>
            {isFetchingNextPage && (
              <ActivityIndicator size={'small'} color={color.P_PINK} />
            )}
          </>
        )}
      </View>
    );
  };

  const emptyComponent = () => {
    createFirebaseLog(emptyComponent?.name, CrownConvo?.name, false);
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: moderateScaleVertical(147),
        }}>
        <AppImages.Common.NoProfileIllustration />
        <Text style={styles.noConvo}>{translations.NO_CONVO_FOUND}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View>
        {isLoading ? (
          <>
            <ShimmerFeed />
          </>
        ) : (
          <View>
            <FlatList
              data={convoListData}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReached}
              ItemSeparatorComponent={itemSeparatorComponent}
              ListFooterComponent={footerComponent}
              ListEmptyComponent={emptyComponent}
              keyExtractor={item => item.id.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    refetch();
                  }}
                />
              }
              renderItem={item => (
                <ConvoDescription
                  item={item?.item}
                  pageantTitle={item?.item?.pageantSystemDetail?.title}
                  uri={item?.item?.video_url}
                  noComments={item?.item?.post_main_comment_count}
                  text={item?.item?.body}
                  videoId={item?.item?.video_id}
                  videoType={item?.item?.video_type}
                  eventTitle={item?.item?.post_event?.title}
                  imageUri={item?.item?.post_image_url}
                  noLikes={item?.item?.post_total_likes}
                  imageName={item?.item?.image_name}
                  name={item?.item?.postUsersWholikedList?.owner?.first_name}
                  prvScreen={SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE}
                  refetch={refetch}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CrownConvo;
