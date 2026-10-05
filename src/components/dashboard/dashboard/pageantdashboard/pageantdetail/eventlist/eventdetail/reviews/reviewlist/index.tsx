import React, {useState, useContext, useCallback} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../../assets/translations';
import {ApiStatusType} from '../../../../../../../../../services/constants';
import {useSetLoader} from '../../../../../../../../../store/useAppStore';
import CustomRatings from '../../../../../../../../common/customratings';
import FastImageView from '../../../../../../../../common/fastimageview';
import {color} from '../../../../../../../../../assets/colorConstant';
import {UserContext} from '../../../../../../../../../store/userStore';
import ViewMoreModal from '../viewmoremodal';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import {internetState} from '../../../../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import {BUTTON_TYPE} from '../../../../../../../directory/publicprofile/expertcontestant/expertprofile/component/reviews/localenum';
import {checkIsNull} from '../../../../../../../../utils/validations';
import {
  TIME_FORMAT,
  getDateFormat,
} from '../../../../../../../../utils/datetimemanger';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import {POST_REPLY_TO_REVIEWS} from '../../../../../../../../../services/endpoints';
import { isIosDevice } from '../../../../../../../../utils/helperFunction';

interface Props {
  item: any;
  enableReply: boolean;
  onPressEditDelete: any;
  showEditDeleteButton: boolean;
  reviewId?: number;
  refetch: any;
  setReviewId: any;
  businessProfile: boolean;
  fromPublicProfile: boolean;
}

const ReviewsList = ({
  item,
  enableReply = true,
  onPressEditDelete,
  showEditDeleteButton,
  refetch,
  setReviewId,
  businessProfile,
  fromPublicProfile = false,
}: Props) => {
  const setLoader = useSetLoader();
  const {storeData} = useContext(UserContext);
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreForReply, setViewMoreForReply] = useState(false);
  const [viewMoreReplyClicked, setViewMoreReplyClicked] = useState(false);
  const [editReplyClicked, setEditReplyClicked] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const netInfo = useNetInfo();
  const [replyText, setReplyText] = useState('');
  const replyBody = {
    review_id: item?.id,
    review_reply: replyText,
  };

  const {mutateAsync: saveReply} = useCgMutation({
    key: POST_REPLY_TO_REVIEWS,
    url: POST_REPLY_TO_REVIEWS,
    offSuccessToast: false,
    disableLoader: true,
    body: replyBody,
  });

  const saveButtonPressed = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      saveReply().then(res => {
        if (res.success || res.status_code === ApiStatusType.Success) {
          refetch();
          setEditReplyClicked(false);
        }
        setLoader(false);
      });
    }
  };

  const callApiToSaveReply = (id: number) => {
    if (replyText?.length > 0 && checkIsNull(replyText)) {
      if (setReviewId !== undefined) {
        setReviewId(id);
      }
      setShowErrorMsg(false);
      setTimeout(() => {
        saveButtonPressed();
      }, 1000);
    } else {
      setShowErrorMsg(true);
    }
  };

  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > 5) {
      setViewMore(true);
    } else {
      setViewMore(false);
    }
  }, []);

  const onTextLayoutIos = useCallback(e => {
    if (e.nativeEvent.lines.length >= 5) {
      setViewMore(true);
    } else {
      setViewMore(false);
    }
  }, []);

  const onTextLayoutForReply = useCallback(e => {
    if (e.nativeEvent.lines.length > 5) {
      setViewMoreForReply(true);
    } else {
      setViewMoreForReply(false);
    }
  }, []);

  const onTextLayoutIosForReply = useCallback(e => {
    if (e.nativeEvent.lines.length >= 5) {
      setViewMoreForReply(true);
    } else {
      setViewMoreForReply(false);
    }
  }, []);

  const replyToCommentTextInput = (id: number) => {
    return (
      <>
        <View
          style={[
            styles.replyContainer,
            {
              paddingVertical:
                replyText.length > 40 ? moderateScaleVertical(7) : 0,
            },
          ]}>
          <TextInput
            style={styles.aboutValueText}
            selectionColor={color.P_PINK}
            placeholderTextColor={color.S_GRAY_4}
            editable={true}
            value={replyText}
            placeholder={translations.REPLY_HERE}
            maxLength={1000}
            multiline={true}
            onChangeText={text => {
              setReplyText(text);
              if (text?.length > 0 && checkIsNull(text)) {
                setShowErrorMsg(false);
              } else {
                setShowErrorMsg(true);
              }
            }}
          />
        </View>
        {showErrorMsg && (
          <View style={styles.row}>
            <AppImages.Common.Alert_ICON />
            <Text style={styles.error}>
              {' '}
              {translations.THIS_FIELD_REQUIRED}{' '}
            </Text>
          </View>
        )}
        {replyText.length > 0 && (
          <TouchableOpacity
            style={styles.viewMoreArea}
            onPress={() => callApiToSaveReply(id)}>
            <Text style={styles.saveLabel}>{translations.SEND}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const showReplyText = (replyTxt: string, isEdited: number) => {
    return (
      <View>
        <Text
          style={styles.textInputStyles}
          numberOfLines={5}
          onTextLayout={
            !isIosDevice()
              ? onTextLayoutForReply
              : onTextLayoutIosForReply
          }>
          {replyTxt}
        </Text>
        <View style={styles.bottomArea}>
          {isEdited === 1 && (
            <Text style={styles.isEditedLabel}>{translations.EDITED}</Text>
          )}
          {viewMoreForReply && (
            <TouchableOpacity
              style={styles.viewMoreArea}
              onPress={() => onViewMoreClick('reply')}>
              <Text style={styles.viewMoreLabel}>{translations.VIEW_MORE}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const reviewsSection = (label: string, ratingValue: number) => {
    return (
      <View style={styles.horizontalView}>
        <Text style={styles.reviewsLabel}>{label}</Text>
        <CustomRatings
          size={14}
          fontSize={10}
          showRatingsReviewsCount={false}
          ratingsValue={ratingValue}
        />
      </View>
    );
  };

  const onViewMoreClick = (type: string) => {
    if (type === translations.REVIEWS) {
      setViewMoreReplyClicked(false);
    } else {
      setViewMoreReplyClicked(true);
    }
    setViewMoreModalVisible(true);
  };

  const showImage = () => {
    return (
      <View style={styles.replyImageSection}>
        <FastImageView
          width={moderateScaleVertical(32)}
          height={moderateScaleVertical(32)}
          borderRadius={moderateScaleVertical(32)}
          imageUrl={
            item?.get_reviews_reply === null
              ? storeData?.data?.user?.personal_details.profile_image_url
              : item?.get_reviews_reply?.user?.profile_image_full_url
          }
          isCircle
        />
      </View>
    );
  };

  const showCommentorName = () => {
    return (
      <Text style={styles.commenterNameStyles}>
        {item?.get_reviews_reply === null
          ? storeData?.data?.user?.personal_details.first_name
          : item?.get_reviews_reply?.user?.first_name}
      </Text>
    );
  };

  return (
    <View style={styles.reviewsContainer}>
      <View style={styles.headerArea}>
        <View style={styles.detailsSection}>
          <View style={styles.imageSection}>
            <FastImageView
              width={moderateScaleVertical(50)}
              height={moderateScaleVertical(50)}
              borderRadius={moderateScaleVertical(50)}
              imageUrl={item?.user_rating_from_profile?.profile_image_full_url}
              isCircle
            />
          </View>
          <View style={styles.nameAndReview}>
            <Text style={styles.reviewerNameStyles} numberOfLines={1}>
              {item?.user_rating_from_profile?.first_name +
                ' ' +
                item?.user_rating_from_profile?.last_name}
            </Text>
            <CustomRatings
              size={14}
              fontSize={10}
              showRatingsReviewsCount={false}
              ratingsValue={item?.average_rating}
            />
          </View>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          {showEditDeleteButton && (
            <View style={styles.editDeleteView}>
              <TouchableOpacity
                onPress={() => {
                  onPressEditDelete(BUTTON_TYPE.EDIT, item?.id);
                }}>
                <AppImages.Common.editCircle_ICON marginRight={8} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onPressEditDelete(BUTTON_TYPE.DELETE, item?.id);
                }}>
                <AppImages.Common.MyUploadsDelete width={23} height={23} />
              </TouchableOpacity>
            </View>
          )}

          <Text style={{...styles.reviewsLabel, color: color.S_GRAY_4}}>
            {getDateFormat(
              item?.created_at,
              TIME_FORMAT.MMM_SPACE_DD_COMMA_YYYYY,
            )}
          </Text>
        </View>
      </View>
      <View style={styles.reviewsBox}>
        {businessProfile &&
          reviewsSection(translations.KNOWLEGEABLE, item?.knowledgeable)}
        {!businessProfile &&
          reviewsSection(translations.EVENT_ORGANIZATION, item?.event_org)}
        {reviewsSection(translations.PROFESSIONALISM, item?.professionalism)}
        {!businessProfile &&
          reviewsSection(
            translations.PRODUCT_QUALITY,
            item?.production_quality,
          )}
        {businessProfile && reviewsSection(translations.COST, item?.cost)}
        {reviewsSection(translations.OVERALL_EXPERIENCE, item?.overall_exp)}
      </View>
      <Text
        style={styles.descriptionLabel}
        numberOfLines={5}
        onTextLayout={
          !isIosDevice() ? onTextLayout : onTextLayoutIos
        }>
        {item?.review}
      </Text>

      <View style={styles.bottomArea}>
        {item?.is_edited === 1 && showEditDeleteButton && (
          <Text style={styles.isEditedLabel}>{translations.EDITED}</Text>
        )}
        {viewMore && (
          <TouchableOpacity
            style={styles.viewMoreArea}
            onPress={() => onViewMoreClick(translations.REVIEWS)}>
            <Text style={styles.viewMoreLabel}>{translations.VIEW_MORE}</Text>
          </TouchableOpacity>
        )}
      </View>

      {fromPublicProfile && checkIsNull(item?.get_reviews_reply) && (
        <>
          <View style={styles.imageNameView}>
            {showImage()}
            <View style={styles.replyView}>
              {showCommentorName()}
              {!viewReply ? (
                <TouchableOpacity
                  onPress={() => setViewReply(true)}
                  style={styles.editTouchableArea}>
                  <Text style={styles.viewMoreLabel}>
                    {translations.VIEW_REPLY}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {viewReply &&
            showReplyText(
              item?.get_reviews_reply?.review_reply,
              item?.get_reviews_reply?.is_edited,
            )}
        </>
      )}

      {enableReply && (
        <>
          <View style={styles.imageNameView}>
            {showImage()}
            <View style={styles.replyView}>
              {enableReply && item?.get_reviews_reply !== null && (
                <>
                  {showCommentorName()}
                  <TouchableOpacity
                    style={styles.editTouchableArea}
                    onPress={() => {
                      setReplyText(item?.get_reviews_reply?.review_reply);
                      setEditReplyClicked(true);
                    }}>
                    <Text style={styles.viewMoreLabel}>
                      {translations.EDIT_REPLY}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {(enableReply && item?.get_reviews_reply === null) ||
              (editReplyClicked && item?.get_reviews_reply !== null)
                ? replyToCommentTextInput(item?.id)
                : null}
            </View>
          </View>
          {item?.get_reviews_reply !== null &&
            !editReplyClicked &&
            showReplyText(
              item?.get_reviews_reply?.review_reply,
              item?.get_reviews_reply?.is_edited,
            )}
        </>
      )}

      <ViewMoreModal
        isModalVisible={viewMoreModalVisible}
        averageRating={viewMoreReplyClicked ? null : item?.average_rating}
        reviewerImage={
          viewMoreReplyClicked
            ? item?.get_reviews_reply?.user?.profile_image_full_url
            : item?.user_rating_from_profile?.profile_image_full_url
        }
        reviewerName={
          viewMoreReplyClicked
            ? item?.get_reviews_reply?.user?.first_name
            : item?.user_rating_from_profile?.first_name +
              ' ' +
              item?.user_rating_from_profile?.last_name
        }
        bodyText={
          viewMoreReplyClicked
            ? item?.get_reviews_reply?.review_reply
            : item?.review
        }
        closeModal={setViewMoreModalVisible}
        isReview={true}
      />
    </View>
  );
};

export default ReviewsList;
