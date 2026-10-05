import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import NoRecordView from '../../../../../../../common/noresultsview';
import {Param} from '../../../../../../../../services/constants';
import {
  DELETE_REVIEW,
  GET_EVENT_REVIEWS,
} from '../../../../../../../../services/endpoints';
import useInfiniteHtQuery from '../../../../../../../../services/api/useHtInfiniteQuery';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import ReviewsList from './reviewlist';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../root/screenname';
import {UserContext} from '../../../../../../../../store/userStore';
import {BUTTON_TYPE} from '../../../../../../directory/publicprofile/expertcontestant/expertprofile/component/reviews/localenum';
import {Base} from '../../../../../../../../services/models/base';
import {useSetScreenRefresh} from '../../../../../../../../store/useAppStore';
import {REFESH_SCREEN} from '../../../../../../../utils/enum';
import WarningModel from '../../../../../../../common/warningmodel';

interface Props {
  eventId?: number;
  isFlatListScroolEnable: boolean;
  enableReply: boolean;
  isDirector: string;
  showWriteReviewOption: boolean;
  upcomingEvent: boolean;
  publicProfile: boolean;
}
const EventReviews = ({
  eventId,
  isFlatListScroolEnable,
  enableReply,
  showWriteReviewOption,
  upcomingEvent,
  isDirector,
  publicProfile,
}: Props) => {
  const [params] = useState(Param.EVENT_ID + eventId);
  const [reviewId, setReviewId] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {storeData} = useContext(UserContext);
  const [detleteConfirationReview, setDetleteConfirationReview] =
    useState(false);
  const setScreenRefresh = useSetScreenRefresh();

  //API GET EVENT REVIEWS ----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteHtQuery({
    key: GET_EVENT_REVIEWS + params + '&is_director=' + isDirector,
    url: GET_EVENT_REVIEWS + params + '&is_director=' + isDirector,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.ratingData?.data?.length,
    disableLoader: true,
  });

  const dataList =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.ratingData?.data !== null &&
          page?.data?.ratingData?.data !== undefined
        ) {
          return page?.data?.ratingData?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  // API GET EVENT REVIEWS----------------------------------------- END

  const {mutateAsync: deleteReview} = useCgMutation<Base>({
    key: DELETE_REVIEW,
    url: DELETE_REVIEW,
    body: {review_id: reviewId},
    offSuccessToast: false,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const onEndReached = async () => {
    fetchNextPage();
  };

  const onPressEditDelete = (
    type: BUTTON_TYPE,
    reviewid: React.SetStateAction<string>,
  ) => {
    if (type === BUTTON_TYPE.EDIT) {
      navigation.navigate(SCREEN.WRITE_A_REVIEW, {
        business_profile_id: reviewid,
        isEditable: true,
      });
    } else if (type === BUTTON_TYPE.DELETE) {
      setReviewId(reviewid);
      setDetleteConfirationReview(true);
    }
  };

  const onDeleteConfirmation = async () => {
    setDetleteConfirationReview(false);
    const res = await deleteReview();
    if (res.success) {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EVENT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.reviewHeading}>{translations.REVIEWS}</Text>
      {showWriteReviewOption && upcomingEvent ? (
        <Text style={styles.ratingBody}>
          {translations.POST_YOUR_REVIEWS_ONCE_EVENT_STARTS}
        </Text>
      ) : paginatedData?.pages[0]?.data?.isMyReviewInCurrentYear === 1 ? (
        <Text style={styles.oneyearText}>
          {translations.YOU_HAVE_ALREADY_POSTED_A_REVIEW_FOR}
          {'this '}'{translations.PAGEANT}'{translations.YOU_MUST_WAIT}
        </Text>
      ) : showWriteReviewOption ? (
        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.writeReviewView}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate(SCREEN.WRITE_A_REVIEW, {
                business_profile_id: eventId,
                businessProfile: false,
              });
            }}>
            <AppImages.Common.Write />
            <Text style={styles.writeReviewText}>
              {translations.WRITE_A_REVIEW}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {dataList?.length > 0 && !upcomingEvent ? (
        <FlatList
          data={dataList}
          nestedScrollEnabled
          key={'*'}
          bounces={false}
          scrollEnabled={isFlatListScroolEnable}
          onEndReached={() => onEndReached}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ReviewsList
              item={item}
              refetch={refetch}
              reviewId={reviewId}
              setReviewId={setReviewId}
              enableReply={enableReply}
              businessProfile={false}
              onPressEditDelete={onPressEditDelete}
              showEditDeleteButton={
                item.user_rating_from_profile?.id === storeData.data?.user.id
              }
              fromPublicProfile={publicProfile}
            />
          )}
        />
      ) : isLoading || isRefetching ? (
        <ShimmerList
          width={Dimensions.get('window').width - moderateScale(24)}
          height={moderateScaleVertical(140)}
          padding={16}
          numColumns={1}
        />
      ) : !showWriteReviewOption ? (
        <NoRecordView text={translations.NO_REVIEWS_POSTED_YET} />
      ) : null}

      <WarningModel
        msg={translations.DELETE_REVIEW_CONFIRMATION}
        isModalVisible={detleteConfirationReview}
        setConfirm={onDeleteConfirmation}
        setIsModalVisible={setDetleteConfirationReview}
        headingStyle={styles.modalHeading}
      />
    </View>
  );
};

export default EventReviews;
