import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {styles} from './styles';
import {Param} from '../../../../services/constants';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {GET_NOTIFICATION_LIST} from '../../../../services/endpoints';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import AppImages from '../../../../assets/images/AppImages';
import translations from '../../../../assets/translations';
import NotficationListItem from './notificationlistitem';
import ListHeader from './listheader';
import {AgeDivision} from '../../../../services/models/pageantdetails/ageDivision';
import {NotificationData} from '../../../../services/models/notification/notificationData';
import {Base} from '../../../../services/models/base';
import ShimmerMessageList from '../../../common/shimmer/messagelistshimmer';
import {useIsFocused} from '@react-navigation/core';
import {color} from '../../../../assets/colorConstant';

interface Props {
  tabName: AgeDivision | undefined;
  unReadCount: number | undefined;
  currentTab: number | undefined;
  tabId: number | undefined;
  isNotificationEnable: boolean | undefined;
}

const NotificationList = ({
  tabName,
  unReadCount,
  isNotificationEnable,
  currentTab,
  tabId,
}: Props) => {
  const [type] = useState(tabName === undefined ? '' : tabName?.label);
  const isFocussed = useIsFocused();
  const {
    data: paginatedData,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
    isLoading,
  } = useInfiniteHtQuery<Base<NotificationData>>({
    key: GET_NOTIFICATION_LIST + type,
    url: GET_NOTIFICATION_LIST + type,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.data?.length,
  });

  let notificationListData =
    paginatedData?.pages
      ?.map(page => {
        if (page?.data?.data != null) {
          return page?.data?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const onEndReached = async () => {
    if (notificationListData !== undefined && notificationListData.length > 9) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (unReadCount !== undefined) {
      refetch();
    }
  }, [unReadCount]);

  useEffect(() => {
    if (notificationListData !== undefined && tabId === currentTab) {
      refetch();
    }
  }, [currentTab]);

  
  const itemSeparatorComponent = () => {
    return <View style={styles.seperatorStyle} />;
  };
  return (
    <View style={styles.wrapper}>
      <View>
        {isLoading || !isFocussed ? (
          <>
            <ShimmerMessageList />
          </>
        ) : (
          <View>
            <FlatList
              data={notificationListData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              ListHeaderComponent={() => {
                return (
                  <ListHeader
                    tabName={tabName?.name}
                    unReadCount={unReadCount}
                    isNotificationEnable={isNotificationEnable}
                  />
                );
              }}
              onEndReached={onEndReached}
              renderItem={({item, index}) => (
                <NotficationListItem item={item} isFetching={isFetching} />
              )}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={1} // Increase time between renders
              windowSize={70} // Reduce the window size
              onEndReachedThreshold={2}
              ListFooterComponent={() => {
                return (
                  <View style={styles.freeHeight}>
                    {isFetchingNextPage ? (
                      <ActivityIndicator size={'small'} color={color.P_PINK} />
                    ) : null}
                  </View>
                );
              }}
              ItemSeparatorComponent={itemSeparatorComponent}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: moderateScaleVertical(147),
                    }}>
                    <AppImages.Dashboard.EmptyNotificationImage />
                    <Text style={styles.noNotification}>
                      {translations.NO_NEW_NOTIFICATION}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default NotificationList;
