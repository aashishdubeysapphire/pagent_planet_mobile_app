import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import translations from '../../../../../assets/translations';
import {styles} from './styles';
import useInfiniteHtQuery from '../../../../../services/api/useHtInfiniteQuery';
import {ExpertReview} from '../../../../../services/models/directory/expertprofile/review';
import {BUSINESS_PROFILE_GET_REVIEWS} from '../../../../../services/endpoints';
import useAppStore from '../../../../../store/useAppStore';
import {Base} from '../../../../../services/models/base';
import {Param} from '../../../../../services/constants';
import {REFESH_SCREEN} from '../../../../utils/enum';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import {moderateScale} from '../../../../utils/responsiveSize';
import ReviewsList from '../../pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/reviewlist';
import {SortedRolesForPublicScreen} from '../../../../../services/models/user/user';
import AppImages from '../../../../../assets/images/AppImages';

interface Props {
  sortedRolesForPublicScreen: SortedRolesForPublicScreen | undefined;
}

/* The code defines a functional component called `ExpertDashboardReviews`. It takes a prop called
`sortedRolesForPublicScreen` of type `SortedRolesForPublicScreen. */
const ExpertDashboardReviews = ({sortedRolesForPublicScreen}: Props) => {
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<Base<ExpertReview>>({
    key: BUSINESS_PROFILE_GET_REVIEWS + sortedRolesForPublicScreen?.id,
    url: BUSINESS_PROFILE_GET_REVIEWS + sortedRolesForPublicScreen?.id,
    page: Param.PAGE_,
    getDataArray: page => page.reviewRating?.data.length,
  });

  const {
    storeData: {refresh},
  } = useAppStore();
  useEffect(() => {
    refeshScreenList();
  }, [refresh]);
  const refeshScreenList = async () => {
    if (REFESH_SCREEN.PUBLIC_PROFILE_EXPERT === refresh) {
      await refetch();
    }
  };

  let reviewListData =
    paginatedData?.pages
      ?.map(page => {
        if (page.data?.reviewRating.data != null) {
          return page.data?.reviewRating.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  /**
   * The function `onEndReached` is used to fetch the next page of data asynchronously.
   */
  const onEndReached = async () => {
    fetchNextPage();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{translations.REVIEWS}</Text>
      {reviewListData !== undefined &&
      reviewListData.length > 0 &&
      !isLoading ? (
        <FlatList
          data={reviewListData}
          nestedScrollEnabled
          key={'*'}
          bounces={false}
          onEndReached={() => onEndReached()}
          ListFooterComponent={() => {
            return <View style={{height: 400}} />;
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ReviewsList
              item={item}
              enableReply={true}
              showEditDeleteButton={
                // item.user_rating_from_profile.id === storeData.data?.user.id
                false
              }
              onPressEditDelete={() => {}}
              refetch={refetch}
              businessProfile={true}
              fromPublicProfile={false}
            />
          )}
        />
      ) : !isLoading &&
        reviewListData !== undefined &&
        reviewListData.length === 0 ? (
        <View style={styles.emptycontainer}>
          <AppImages.Dashboard.Expertemptyreview />
        </View>
      ) : (
        <ShimmerList
          width={'95%'}
          height={moderateScale(150)}
          padding={15}
          numColumns={1}
        />
      )}
    </View>
  );
};

export default ExpertDashboardReviews;
