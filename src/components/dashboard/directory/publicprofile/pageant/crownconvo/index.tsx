import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { internetState } from '../../../../../common/commonalert';
import { useIsFocused } from '@react-navigation/core';
import { useSetLoader } from '../../../../../../store/useAppStore';
import { styles } from './styles';
import { Param } from '../../../../../../services/constants';
import ConvoDescription from '../../../../../common/crownconvocomponent';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import { CROWN_CONVO_PROFILE_TYPE_LIST } from '../../../../../../services/endpoints';
import { ConvoListing } from '../../../../../../services/models/convo/convoListing';
import { color } from '../../../../../../assets/colorConstant';
import ShimmerFeed from '../../../../../common/shimmer/feedshimmer';
import { SCREEN } from '../../../../../../root/screenname';
import { moderateScaleVertical } from '../../../../../utils/responsiveSize';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import { createFirebaseLog, trackScreenView } from '../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../assets/translations/analyticsscreenname';

const PageantPublicProfileCrownConvo = ({ route }) => {
  const [isAllFetched, setAllFetched] = useState(false);
  const isFocus = useIsFocused();
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteHtQuery<ConvoListing>({
    key:
      CROWN_CONVO_PROFILE_TYPE_LIST +
      route.params.profileType +
      '&pageant_id=' +
      route.params.pageantId,
    url:
      CROWN_CONVO_PROFILE_TYPE_LIST +
      route.params.profileType +
      '&pageant_id=' +
      route.params.pageantId,
    page: Param.PAGE_,
    getDataArray: page => page?.communityPostList?.data?.length,
  });

  let convoListData =
    paginatedData?.pages
      ?.map(page => {
        if (page?.data?.communityPostList.data != null) {
          if (
            page?.data?.communityPostList?.data.length === 0 &&
            !isAllFetched
          ) {
            setAllFetched(true);
          }
          return page?.data?.communityPostList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const itemSeparatorComponent = () => {
    createFirebaseLog(itemSeparatorComponent.name, SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO);
    return <View style={styles.seperatorStyle} />;
  };
  const onEndReached = async () => {
    createFirebaseLog(onEndReached.name, SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO);
    if (!isAllFetched) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    if (isFocus) {
      setAllFetched(false);
      refetch();
    }
  }, [isFocus]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO)
  }, []);
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

  const getListView = () => {
    createFirebaseLog(getListView.name, SCREEN.PAGEANT_PUBLIC_PROFILE_CROWN_CONVO);
    return (
      <View>
        <FlatList
          data={convoListData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          onEndReached={onEndReached}
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
              text={item?.item?.body}
              noLikes={item?.item?.post_total_likes}
              videoType={item?.item?.video_type}
              eventTitle={item?.item?.post_event?.title}
              imageUri={item?.item?.post_image_url}
              imageName={item?.item?.image_name}
              videoId={item?.item?.video_id}
              uri={item?.item?.video_url}
              noComments={item?.item?.post_main_comment_count}
              name={item?.item?.postUsersWholikedList?.owner?.first_name}
              refetch={refetch}
              prvScreen={SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE}
            />
          )}
          ItemSeparatorComponent={itemSeparatorComponent}
          ListFooterComponent={() => {
            return (
              <View style={styles.freeHeight}>
                {
                  <>
                    {isFetching && (
                      <ActivityIndicator size={'small'} color={color.P_PINK} />
                    )}
                  </>
                }
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: moderateScaleVertical(147),
                }}>
                <AppImages.Common.NoProfileIllustration />
                <Text style={styles.noConvo}>
                  {translations.NO_CONVO_FOUND}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header lable={translations.CROWN_CONVO} isUnderLineRequired />
      <View>
        {isLoading ? (
          <>
            <ShimmerFeed />
          </>
        ) : (
          getListView()
        )}
      </View>
    </SafeAreaView>
  );
};

export default PageantPublicProfileCrownConvo;
