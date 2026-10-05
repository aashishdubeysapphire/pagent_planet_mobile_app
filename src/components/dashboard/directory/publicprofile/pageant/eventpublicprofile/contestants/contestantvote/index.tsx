import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './styles';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {
  IS_PCA_ACTIVE,
  PUBLIC_PROFILE_CONTESTANT_VOTE_DETAIL,
} from '../../../../../../../../services/endpoints';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../store/useAppStore';
import Header from '../../../../../../../common/header';
import useHtQuery from '../../../../../../../../services/api/useHtQuery';
import { moderateScaleVertical } from '../../../../../../../utils/responsiveSize';
import FastImageView from '../../../../../../../common/fastimageview';
import FloatingDropdown from '../../../../../../../common/floatingdropown';
import translations from '../../../../../../../../assets/translations';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MethodTypes, Param } from '../../../../../../../../services/constants';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { SCREEN } from '../../../../../../../../root/screenname';
import {
  PAYMENT_FOR,
  REFESH_SCREEN,
  ROLES,
} from '../../../../../../../utils/enum';
import { VoteContestant } from '../../../../../../../../services/models/pageantdetails/voteContestantData';
import {
  createFirebaseLog,
  currencyFormatter,
  onShare,
  trackScreenView,
} from '../../../../../../../utils/helperFunction';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../common/commonalert';
import VoteQuantityModel from './quantitymodel';
import { MasterRecordsItem } from '../../../../../../../../services/models/masterData';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import { Base } from '../../../../../../../../services/models/base';
import LinearGradient from 'react-native-linear-gradient';
import { checkIsNull } from '../../../../../../../utils/validations';
import { ANALYTICS_SCREEN } from '../../../../../../../../assets/translations/analyticsscreenname';

export enum PLACE {
  FIRST_PLACE = 1,
  SECOUND_PLACE = 2,
  THIRD_PLACE = 3,
}

const PageantEventPublicProfileContestantVote = ({ route }) => {
  const navigation = useNavigation();
  const setLoader = useSetLoader();
  const [bannerMsg, seBannerMsg] = useState('');
  const [eventError, setEventError] = useState('');
  const [eventVaue, setEventValue] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const setScreenRefresh = useSetScreenRefresh();
  const netInfo = useNetInfo();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    storeData: { refresh },
  } = useAppStore();
  const isFocused = useIsFocused();

  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- START
  const { data, isLoading, refetch, isRefetching } = useHtQuery<VoteContestant>({
    key:
      PUBLIC_PROFILE_CONTESTANT_VOTE_DETAIL +
      route?.params?.eventId +
      Param.CONTESTANT_PARAM +
      route?.params?.contestantId +
      Param.AGE_DIVISION_ID +
      route?.params?.ageDivisionId +
      route?.params?.screenKey,
    url:
      PUBLIC_PROFILE_CONTESTANT_VOTE_DETAIL +
      route?.params?.eventId +
      Param.CONTESTANT_PARAM +
      route?.params?.contestantId +
      Param.AGE_DIVISION_ID +
      route?.params?.ageDivisionId,
    offSuccessToast: true,
  });

  const { mutateAsync: getPcaState } = useCgMutation<Base<string>>({
    key:
      IS_PCA_ACTIVE +
      route?.params?.eventId +
      Param.AGE_DIVISION_ID +
      route?.params?.ageDivisionId,
    method: MethodTypes.GET,
    offSuccessToast: true,
    url:
      IS_PCA_ACTIVE +
      route?.params?.eventId +
      Param.AGE_DIVISION_ID +
      route?.params?.ageDivisionId,
  });
  // //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- END

  useEffect(() => {
    if (isFocused) {
      setLoader(true);
      refetch();
      setTimeout(() => setLoader(false), 2000);
    }
  }, [isFocused]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PCA_QUANTITY);
  }, []);

  const refeshScreenList = async () => {
    createFirebaseLog(refeshScreenList.name, SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE);
    if (REFESH_SCREEN.CONTESTANT_VOTE_SCREEN === refresh) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  const onPurchaseClick = async () => {
    createFirebaseLog(onPurchaseClick.name, SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE);
    let quantity = Number(
      eventVaue.length > 0 ? eventVaue + ''.split(' ')[0] : 1,
    );
    if (!netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
    } else if (totalCost < 1) {
      var tempCost = 0;
      for (let index = quantity; index <= 2500 && tempCost < 1; index++) {
        if (
          data?.data?.event.default_discounted_price !== undefined &&
          data?.data?.event.default_discounted_price !== null &&
          data?.data?.event.default_discounted_price > 0
        ) {
          tempCost = index * data?.data?.event.default_discounted_price;
        } else {
          tempCost = index * Number(data?.data?.event.per_vote_price);
        }
        quantity = index;
      }

      toast(
        translations.YOU_NEED_TO_PURCHASE_MINIMUM +
        quantity +
        ' ' +
        translations.VOTES,
        toastType.SUCESS_TOAST,
      );
      setEventError(
        translations.YOU_NEED_TO_PURCHASE_MINIMUM +
        quantity +
        ' ' +
        translations.VOTES,
      );
    } else {
      setEventError('');
      setLoader(true);
      let isPcaActiveResponse = await getPcaState();
      setLoader(false);
      if (isPcaActiveResponse.success) {
        let voteCount = eventVaue.split(' ')[0];
        navigation.navigate(SCREEN.BUY_VOTES, {
          votesInfo: {
            paymentType: PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT,
            contestantName: route?.params?.contentantName,
            contestantPublicUrl: data?.data?.share_link,
            contestantDp: data?.data?.pageantContestant?.final_image_url,
            totalVotes: voteCount,
            event_id: route?.params?.eventId,
            contestant_id: route?.params?.contestantId,
            age_division_id: route?.params?.ageDivisionId,
            totalCost: totalCost,
            perVotePrice: data?.data?.event.default_original_price,
            halfPrice: data?.data?.event.default_discounted_price,
            currencySign: data?.data?.currencySign,
            have_billing_address: data?.data?.have_billing_address,
          },
        });
      }
    }
  };

  useEffect(() => {
    setLoader(isLoading);
    if (
      !isLoading &&
      data?.data !== undefined &&
      data?.data?.votePickCount !== undefined
    ) {
      setEventValue(data?.data?.votePickCount + '');
      seBannerMsg(data?.data?.msgArray.msg);
      calculateVoteCost(data?.data?.votePickCount);
    }
  }, [isLoading, data]);

  const calculateVoteCost = (votes: number) => {
    createFirebaseLog(calculateVoteCost.name, SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE);
    if (
      data?.data?.event.default_discounted_price !== undefined &&
      data?.data?.event.default_discounted_price !== null &&
      data?.data?.event.default_discounted_price > 0
    ) {
      setTotalCost(votes * data?.data?.event.default_discounted_price);
    } else if (data?.data?.event?.per_vote_price !== undefined) {
      setTotalCost(votes * data?.data?.event.per_vote_price);
    }
  };

  const onPressShareIcon = () => {
    createFirebaseLog(onPressShareIcon.name, SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE);
    onShare('' + data?.data?.share_link, '');
  };

  const onItemSelection = (item: MasterRecordsItem, title: string) => {

    createFirebaseLog(onItemSelection.name, SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE);
    setEventValue(title + '');
    setEventError('');
    calculateVoteCost(item.id);
    if (item.place !== undefined && item.place === PLACE.FIRST_PLACE) {
      seBannerMsg(
        translations.THANK_YOU +
        '! ' +
        item.id +
        translations.VOTES_WILL_TAKE_ME_TO_1ST_PLACE,
      );
    } else if (item.place !== undefined && item.place === PLACE.SECOUND_PLACE) {
      seBannerMsg(
        translations.THANK_YOU +
        '! ' +
        item.id +
        translations.VOTES_WILL_TAKE_ME_TO_2ND_PLACE,
      );
    } else if (item.place !== undefined && item.place === PLACE.THIRD_PLACE) {
      seBannerMsg(
        translations.THANK_YOU +
        '! ' +
        item.id +
        translations.VOTES_WILL_TAKE_ME_TO_3RD_PLACE,
      );
    } else if (data?.data?.msgArray.msg !== undefined) {
      seBannerMsg(data?.data?.msgArray.msg);
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header
        lable={route?.params?.contentantName}
        isUnderLineRequired
        rightIcon1={<AppImages.PUBLIC_PROFILE.ShareIcon />}
        onPressRightIcon1={onPressShareIcon}
      />
      <View style={styles.topContainer}>
        <View style={styles.proileImageContianer}>
          <FastImageView
            width={moderateScaleVertical(124)}
            height={moderateScaleVertical(124)}
            borderRadius={moderateScaleVertical(124)}
            imageUrl={data?.data?.pageantContestant?.final_image_url}
            isCircle
          />
        </View>

        <Text style={styles.nameLabel}>{route?.params?.contentantName}</Text>

        {data?.data?.pageantContestant.contestant_profile.owner_id ===
          ROLES.ADMIN_ID && (
            <View style={styles.claimProfileSection}>
              <TouchableOpacity
                style={styles.claimTouchableArea}
                onPress={() =>
                  navigation.navigate(SCREEN.CLAIM_PROFILE, {
                    profileType: translations.SMALL_CONTESTANT,
                    slug: data?.data?.pageantContestant?.contestant_profile?.slug,
                  })
                }>
                <AppImages.PUBLIC_PROFILE.ClaimProfile />
                <Text style={styles.claimProfileLabel}>
                  {translations.CLAIM_THIS_PROFILE}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        {<View style={styles.separatorLine} />}

        {!isLoading && checkIsNull(data?.data?.msgArray.msg) ? (
          <View style={styles.bannerContainer}>
            <LinearGradient
              colors={[
                'rgba(211, 156, 110, 0.1)',
                'rgba(212, 150, 111, 0.08)',
                'rgba(230, 66, 122, 0.23)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.linearGradientStyles}
              locations={[0.2, 0.5, 1]}>
              <Text style={styles.promotionalLabel}>{bannerMsg}</Text>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.gap} />
        )}

        <View style={styles.qantityContainer}>
          <View style={styles.rowSection}>
            <Text style={styles.heading}> {translations.PER_VOTE_PRICE} </Text>

            {!isLoading &&
              data?.data?.event.default_discounted_price !== undefined &&
              data?.data?.event.default_discounted_price !== null &&
              data?.data?.event.default_discounted_price > 0 ? (
              <View style={styles.priceRow}>
                <Text style={styles.price}>
                  {data?.data?.currencySign +
                    data?.data?.event.default_discounted_price.toFixed(2)}
                </Text>
                <Text style={styles.realPrice}>
                  {data?.data?.currencySign +
                    data?.data?.event.default_original_price.toFixed(2)}
                </Text>
              </View>
            ) : (
              !isLoading &&
              data?.data?.currencySign !== undefined && (
                <Text style={styles.price}>
                  {data?.data?.currencySign +
                    data?.data?.event.per_vote_price.toFixed(2)}
                </Text>
              )
            )}
          </View>
          <FloatingDropdown
            floatingText={translations.QUANTITY}
            setText={value => setEventValue(value)}
            value={eventVaue}
            isMandatory={true}
            onFieldFocus={() => {
              setIsModalVisible(true);
            }}
            errorMsg={eventError}
          />
        </View>
        {!isLoading && !isRefetching && (
          <VoteQuantityModel
            title={translations.QUANTITY}
            modelId={isModalVisible}
            onItemSelect={onItemSelection}
            voteCountListArr={data?.data?.voteCountListArr}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            isMultiSelect={true}
          />
        )}

        <View style={styles.bottomFilterShadowContainer}>
          <View style={styles.bottomFilterContainer}>
            <View style={styles.amountContainer}>
              <Text style={styles.totalAmountHeading}>
                {translations.TOTAL_AMOUNT}
              </Text>
              {!isLoading && (
                <Text style={styles.byPrice}>
                  {data?.data?.currencySign !== undefined
                    ? currencyFormatter(totalCost.toFixed(2))
                    : '' + '' + totalCost.toFixed(2)}
                </Text>
              )}
            </View>
            <View style={styles.amountContainer}>
              <TouchableOpacity
                onPress={onPurchaseClick}
                style={styles.buttonStyle}>
                <Text style={styles.purchaseLabel}>
                  {translations.PURCHASE}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PageantEventPublicProfileContestantVote;
