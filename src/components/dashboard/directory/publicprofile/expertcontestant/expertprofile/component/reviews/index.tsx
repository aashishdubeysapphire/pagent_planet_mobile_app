import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import translations from '../../../../../../../../assets/translations';
import {styles} from './styles';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../root/screenname';
import useInfiniteHtQuery from '../../../../../../../../services/api/useHtInfiniteQuery';
import {ExpertReview} from '../../../../../../../../services/models/directory/expertprofile/review';
import {
  BUSINESS_PROFILE_GET_REVIEWS,
  DELETE_REVIEW,
} from '../../../../../../../../services/endpoints';
import {Param} from '../../../../../../../../services/constants';
import ReviewsList from '../../../../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/reviewlist';
import {emptyFunction} from '../../../../../../../utils/helperFunction';
import {BUTTON_TYPE} from './localenum';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {moderateScale} from '../../../../../../../utils/responsiveSize';
import {UserContext} from '../../../../../../../../store/userStore';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import WarningModel from '../../../../../../../common/warningmodel';
import useAppStore, {
  useSetScreenRefresh,
  useSetLoader
} from '../../../../../../../../store/useAppStore';
import {REFESH_SCREEN} from '../../../../../../../utils/enum';
import {Base} from '../../../../../../../../services/models/base';

interface Props {
  businessId: number | undefined;
}

const Reviews = ({businessId}: Props) => {
  const navigation = useNavigation();
  const setLoader = useSetLoader();
  const {storeData} = useContext(UserContext);
  const [detleteConfirationReview, setDetleteConfirationReview] =
    useState(false);
  const [reviewId, setReviewId] = useState('');
  const setScreenRefresh = useSetScreenRefresh();
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<Base<ExpertReview>>({
    key: BUSINESS_PROFILE_GET_REVIEWS + businessId,
    url: BUSINESS_PROFILE_GET_REVIEWS + businessId,
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
  const {mutateAsync: deleteReview} = useCgMutation<Base>({
    key: DELETE_REVIEW,
    url: DELETE_REVIEW,
    body: {review_id: reviewId},
    offSuccessToast: false,
  });

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
        businessProfile: true,
      });
    } else if (type === BUTTON_TYPE.DELETE) {
      setReviewId(reviewid);
      setDetleteConfirationReview(true);
    }
  };

  const onDeleteConfirmation = async () => {
    setLoader(true);
    let deleteRes = await deleteReview();
    setLoader(false);
    if (deleteRes.success) {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EXPERT);
      refetch();
    }
  };

  return (
    <View>
      <View style={styles.mainView}>
        <Text style={styles.heading}>{translations.REVIEWS}</Text>
      </View>

      {isLoading ? (
        <>
          <View style={styles.aboveFlatlist} />
          <ShimmerList
            width={'95%'}
            height={moderateScale(200)}
            padding={15}
            numColumns={1}
          />
        </>
      ) : (
        <>
          {paginatedData?.pages[0]?.data?.isMyReviewInCurrentYear !== 1 ? (
            <View style={styles.mainView}>
              <TouchableOpacity
                style={styles.writeReviewView}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate(SCREEN.WRITE_A_REVIEW, {
                    business_profile_id: businessId,
                    businessProfile: true,
                  });
                }}>
                <AppImages.Common.Write />
                <Text style={styles.writeReviewText}>
                  {translations.WRITE_A_REVIEW}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.oneyearText}>
              {translations.YOU_HAVE_ALREADY_POSTED_A_REVIEW_FOR}'
              <Text style={styles.oneyearTextBold}>
                {paginatedData?.pages[0].data.role_name}
              </Text>
              '{translations.YOU_MUST_WAIT}
            </Text>
          )}
          <View style={styles.aboveFlatlist} />
          <FlatList
            data={reviewListData}
            nestedScrollEnabled
            key={'*'}
            bounces={false}
            onEndReached={() => onEndReached()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <ReviewsList
                item={item}
                enableReply={false}
                onPressEditDelete={onPressEditDelete}
                showEditDeleteButton={
                  item.user_rating_from_profile.id === storeData.data?.user.id
                }
                refetch={emptyFunction}
                setReviewId={emptyFunction}
                businessProfile={true}
                fromPublicProfile={true}
              />
            )}
          />
        </>
      )}

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

export default Reviews;
