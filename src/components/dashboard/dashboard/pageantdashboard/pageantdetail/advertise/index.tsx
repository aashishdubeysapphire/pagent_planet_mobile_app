import React, {useRef, useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../utils/responsiveSize';
import GestureFlipView from 'react-native-gesture-flip-card';
import translations from '../../../../../../assets/translations';
import CustomButton from '../../../../../common/button';
import AppImages from '../../../../../../assets/images/AppImages';
import {
  openWebLink,
  trackScreenView,
} from '../../../../../utils/helperFunction';
import {CONTACT_US_LINK} from '../../../../../../services/staticWebUrl';
import AdvertisePlanSlider from '../components/advertiseplanslider';
import {MyPlan, PlanData} from '../../../../../../services/models/planData';
import {
  getDateFormat,
  getLocalTime,
  TIME_FORMAT,
} from '../../../../../utils/datetimemanger';
import FastImageView from '../../../../../common/fastimageview';
import ViewPlanModal from '../components/viewplanmodal';
import {ANALYTICS_SCREEN} from '../../../../../../assets/translations/analyticsscreenname';

interface Props {
  pageantPlanDetail?: PlanData;
  pageantId?: number;
  cardView: boolean;
}

const PageantAdvertise = ({
  pageantPlanDetail,
  pageantId,
  cardView = false,
}: Props) => {
  useEffect(() => {
    trackScreenView(trackScreenView(ANALYTICS_SCREEN.PAGEANT_ADVERTISE));
  }, []);

  const viewRef = useRef();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const renderFront = (plan: MyPlan) => {
    return (
      <TouchableOpacity
        style={styles.front}
        onPress={() => {
          viewRef?.current?.flipRight();
        }}>
        <FastImageView
          width={width - moderateScale(32)}
          height={moderateScaleVertical(162)}
          borderRadius={moderateScaleVertical(16)}
          imageUrl={plan.image}
        />
        <View style={styles.infoWhite}>
          <AppImages.Common.InfoWhiteIcon />
        </View>
      </TouchableOpacity>
    );
  };

  const renderBack = (plan: MyPlan) => {
    return (
      <TouchableOpacity
        style={styles.flipContainer}
        onPress={() => {
          viewRef?.current?.flipLeft();
        }}>
        <View style={styles.cardBackContainer}>
          <Image
            source={AppImages.PAGEANT_DETAIL.CARD_PLAN_BG_ICON}
            style={styles.tpp_see_prep_timeline_illustration_ICON}
          />
          <View style={styles.cardBackDetailContainer}>
            <Text style={styles.cardTitle}>{plan.membership_name}</Text>
            <View style={styles.rowView}>
              <Text style={styles.cardTitleBenefit}>
                {translations.INCLUDES}
              </Text>
              <Text style={styles.cardTitleBenefitLead}>
                {' ' + plan.total_prepaid_lead}
              </Text>
              <Text style={styles.cardTitleBenefit}>
                {' ' + translations.PREPAID_LEADS_}
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.cardTitlePerMonth}>
                {'$' + plan.membership_price}
              </Text>
              <Text style={styles.cardTitlePerMonthTitle}>
                {' ' + translations.PER_MONTH}
              </Text>
            </View>
            {!cardView && (
              <View style={styles.rowView}>
                <Text style={styles.cardTransaction}>
                  {translations.TRANSACTION_ID + ': '}
                </Text>
                <Text style={styles.cardTransactionNumber}>
                  {plan.invoice_id}
                </Text>
              </View>
            )}
            {!cardView && (
              <View style={styles.rowView}>
                <Text style={styles.cardTransaction}>
                  {translations.PAID_VIA + ': '}
                </Text>
                <Text style={styles.cardTransactionNumber}>
                  {translations.CREDIT_CARD}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.rowViewAllginRight}
              onPress={() => {
                cardView
                  ? setIsPreviewModalVisible(true)
                  : openWebLink(CONTACT_US_LINK);
              }}>
              <Text
                style={{
                  ...styles.cardCancelPlan,
                  marginEnd: cardView ? 0 : moderateScale(12),
                }}>
                {cardView && plan.membership_name !== 'Diamond Package'
                  ? translations.UPGRADE_PLAN
                  : translations.CANCEL_PLAN}
              </Text>
              {!cardView && <AppImages.Common.REFRESH_PLAN />}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceBordrContainer}>
          <AppImages.PAGEANT_DETAIL.CARD_VALID_PLAN_BG_ICON />
          <View style={styles.containerAbsolute}>
            <Text style={styles.validTill}>{translations.VALID_TILL}</Text>
            <Text numberOfLines={2} style={styles.validTillDate}>
              {getDateFormat(
                getLocalTime(plan.expiry_date),
                TIME_FORMAT.DDMMMYYYY,
              )}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        maxHeight: cardView ? moderateScaleVertical(185) : 'auto',
        paddingBottom: cardView ? 0 : moderateScaleVertical(150),
      }}>
      {pageantPlanDetail?.my_plans !== undefined &&
        pageantPlanDetail.my_plans.length > 0 && (
          <View
            style={{
              ...styles.cardContainer,
              marginBottom: cardView ? 0 : moderateScaleVertical(50),
            }}>
            {!cardView && (
              <Text style={styles.title}>{translations.MY_ACTIVE_PLAN}</Text>
            )}
            {cardView ? (
              <View style={styles.cardBackContainer1}>
                {renderBack(pageantPlanDetail.my_plans[0])}
              </View>
            ) : (
              <GestureFlipView
                ref={ref => (viewRef.current = ref)}
                width={width}
                height={moderateScaleVertical(162)}>
                {renderFront(pageantPlanDetail.my_plans[0])}
                {renderBack(pageantPlanDetail.my_plans[0])}
              </GestureFlipView>
            )}
          </View>
        )}
      {!cardView && (
        <>
          <Text style={styles.allPlantitle}>
            {pageantPlanDetail?.my_plans !== undefined &&
            pageantPlanDetail.my_plans.length > 0
              ? translations.EXPOLORE_ALL_ADVERTISE_PLANS
              : translations.EXPOLORE_PLANS}
          </Text>
          <AdvertisePlanSlider
            pageantPlanDetail={pageantPlanDetail}
            pageantId={pageantId}
          />

          <Text style={styles.name}>
            {translations.GOT_QUESTION_CONTACT_US}
          </Text>
          <View style={styles.imageSection}>
            <Image
              source={AppImages.RESULTS.tpp_contact_us_illustration_icon}
            />
          </View>
          <View style={styles.contactUsContainer}>
            <CustomButton
              inactive
              smallHeight
              label={translations.CONTACT_US}
              onPress={() => {
                openWebLink(CONTACT_US_LINK);
              }}
            />
          </View>
        </>
      )}
      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={pageantPlanDetail}
        pageantId={pageantId}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </View>
  );
};

export default PageantAdvertise;
