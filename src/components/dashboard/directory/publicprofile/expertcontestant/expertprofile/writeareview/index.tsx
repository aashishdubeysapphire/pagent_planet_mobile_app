import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../../common/header';
import translations from '../../../../../../../assets/translations';
import GetUserRating from './component/getuserrating';
import FloatingBigInput from '../../../../../../common/floatingbiginput';
import {
  checkIsConnected,
  keyBoardManager,
} from '../../../../../../utils/helperFunction';
import CustomButton from '../../../../../../common/button';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {
  EVENT_WRITE_A_REVIEW,
  GET_REVIEW_DETAILS,
  UPDATE_REVIEW,
  WRITE_A_REVIEW,
} from '../../../../../../../services/endpoints';
import {isValueNull} from '../../../../../../utils/validations';
import {Base} from '../../../../../../../services/models/base';
import Loader from '../../../../../../common/customloader';
import {useNavigation} from '@react-navigation/core';
import {MethodTypes} from '../../../../../../../services/constants';
import {useSetScreenRefresh} from '../../../../../../../store/useAppStore';
import {GetReviewDetails} from '../../../../../../../services/models/directory/reviews/getreviewdetails';
import {REFESH_SCREEN} from '../../../../../../utils/enum';
import {useKeyboard} from '@react-native-community/hooks';
import {toastError} from '../../../../../../common/commonalert';

const WriteAReview = (props: {
  route: {
    params: {
      business_profile_id: number;
      businessProfile: boolean;
      isEditable: boolean;
    };
  };
}) => {
  const {business_profile_id, isEditable, businessProfile} =
    props?.route?.params;
  const navigation = useNavigation();
  const [knowlegdeablerating, setKnowlegdeablerating] = useState(5);
  const [professionalism, setProfessionalism] = useState(5);
  const [cost, setCost] = useState(5);
  const [overallExp, setOverallExp] = useState(5);
  const [eventOrg, setEventOrg] = useState(5);
  const [prodQuality, setProdQuality] = useState(5);
  const [feedBack, setFeedBack] = useState('');
  const [feedbackErr, setFeedbackErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {keyboardShown} = useKeyboard();
  const setScreenRefresh = useSetScreenRefresh();

  useEffect(() => {
    keyBoardManager();
    if (isEditable) {
      hitGetReviewDetails();
    }
  }, []);

  const bussinessReviewBody = {
    business_profile_id: business_profile_id,
    review: feedBack,
    rating_to_type: 'Business',
    rating_from_type: 'User',
    knowledgeable: knowlegdeablerating,
    professionalism: professionalism,
    cost: cost,
    overall_exp: overallExp,
  };

  const eventReviewBody = {
    event_id: business_profile_id,
    review: feedBack,
    rating_to_type: 'Pageant',
    rating_from_type: 'User',
    event_org: eventOrg,
    professionalism: professionalism,
    production_quality: prodQuality,
    overall_exp: overallExp,
  };

  const businessEditReviewBody = {
    review_id: business_profile_id,
    review: feedBack,
    knowledgeable: knowlegdeablerating,
    professionalism: professionalism,
    cost: cost,
    overall_exp: overallExp,
  };

  const eventEditReviewBody = {
    review_id: business_profile_id,
    review: feedBack,
    event_org: eventOrg,
    professionalism: professionalism,
    production_quality: prodQuality,
    overall_exp: overallExp,
  };

  const {mutateAsync: writeAreview} = useCgMutation<Base>({
    key: WRITE_A_REVIEW,
    url: WRITE_A_REVIEW,
    body: bussinessReviewBody,
    disableLoader: true,
    offSuccessToast: false,
  });

  const {mutateAsync: eventWriteAreview} = useCgMutation<Base>({
    key: EVENT_WRITE_A_REVIEW,
    url: EVENT_WRITE_A_REVIEW,
    body: eventReviewBody,
    disableLoader: true,
    offSuccessToast: false,
  });

  const {mutateAsync: updateReview} = useCgMutation<Base>({
    key: UPDATE_REVIEW,
    url: UPDATE_REVIEW,
    body: businessProfile ? businessEditReviewBody : eventEditReviewBody,
    disableLoader: true,
    offSuccessToast: false,
  });

  const {mutateAsync: getReviewDetails} = useCgMutation<GetReviewDetails>({
    key: GET_REVIEW_DETAILS,
    url: GET_REVIEW_DETAILS + business_profile_id,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });

  const hitGetReviewDetails = async () => {
    if (checkIsConnected()) {
      setIsLoading(true);
      const revireDetailsRes = await getReviewDetails();

      if (revireDetailsRes.success) {
        setKnowlegdeablerating(revireDetailsRes.data.knowledgeable);
        setProfessionalism(revireDetailsRes.data.professionalism);
        setCost(revireDetailsRes.data.cost);
        setOverallExp(revireDetailsRes.data.overall_exp);
        setEventOrg(revireDetailsRes.data.event_org);
        setProdQuality(revireDetailsRes.data.production_quality);
        setFeedBack(isValueNull(revireDetailsRes.data.review));
      }
      setIsLoading(false);
    }
  };
  const isValid = () => {
    if (feedBack.length > 0) {
      setFeedbackErr('');
      return true;
    } else {
      setFeedbackErr(translations.THIS_FIELD_REQUIRED);
      return false;
    }
  };
  const hitWriteAReview = async () => {
    if (isValid() && checkIsConnected()) {
      setIsLoading(true);
      if (isEditable) {
        const updateReviewRes = await updateReview();
        if (updateReviewRes.success) {
          navigation.goBack();
        }
      } else {
        let res;
        if (businessProfile) {
          res = await writeAreview();
        } else {
          res = await eventWriteAreview();
        }
        if (res.success) {
          navigation.goBack();
        }
      }
      if (businessProfile) {
        setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EXPERT);
      } else {
        setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EVENT);
      }
      setIsLoading(false);
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={isLoading} />
      <Header
        lable={
          (isEditable ? translations.EDIT : translations.WRITE) +
          translations.A_REVIEW
        }
        isUnderLineRequired
      />
      <ScrollView
        style={styles.subcontainer}
        keyboardShouldPersistTaps={'handled'}>
        {businessProfile ? (
          <GetUserRating
            title={translations.KNOWLEGEABLE}
            initialRating={knowlegdeablerating}
            setUserRating={setKnowlegdeablerating}
          />
        ) : (
          <GetUserRating
            title={translations.EVENT_ORGANIZATION}
            initialRating={eventOrg}
            setUserRating={setEventOrg}
          />
        )}

        <GetUserRating
          title={translations.PROFESSIONALISM}
          initialRating={professionalism}
          setUserRating={setProfessionalism}
        />

        {businessProfile ? (
          <GetUserRating
            title={translations.COST}
            initialRating={cost}
            setUserRating={setCost}
          />
        ) : (
          <GetUserRating
            title={translations.PRODUCT_QUALITY}
            initialRating={prodQuality}
            setUserRating={setProdQuality}
          />
        )}
        <GetUserRating
          title={translations.OVERALL_EXPERIENCE}
          initialRating={overallExp}
          setUserRating={setOverallExp}
        />

        <Text style={styles.subHeading}>
          {translations.WRITE + translations.A_REVIEW}
        </Text>

        <FloatingBigInput
          floatingText={translations.FEEDBACK}
          value={feedBack}
          returnKeyType={'done'}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={'top'}
          lengthCheck={true}
          setText={value => setFeedBack(value)}
          forMultiline={true}
          autoCapitalize={'sentences'}
          showLength={false}
          errorMsg={feedbackErr}
          isMandatory={true}
          isMoreThan250={true}
        />
      </ScrollView>

      <View style={styles.aboveButtonView} />
      {!keyboardShown && (
        <View style={styles.subcontainer}>
          <CustomButton
            inactive
            label={isEditable ? translations.UPDATE : translations.SUBMIT}
            onPress={hitWriteAReview}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default WriteAReview;
