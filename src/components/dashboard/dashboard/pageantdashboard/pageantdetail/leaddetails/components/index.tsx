import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../../common/header';
import AppImages from '../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import PageantAdvertise from '../../advertise';
import {Text, View} from 'react-native';
import translations from '../../../../../../../assets/translations';

import {
  MethodTypes,
  Param,
  ProfileType,
} from '../../../../../../../services/constants';

import {checkIsConnected} from '../../../../../../utils/helperFunction';
import {useNavigation} from '@react-navigation/core';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {SCREEN} from '../../../../../../../root/screenname';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {
  GET_PAGEANT_PLAN,
  PURCHASE_REQUEST,
} from '../../../../../../../services/endpoints';
import {PlanData} from '../../../../../../../services/models/planData';
import FloatingInput from '../../../../../../common/floatinginput';
import CustomButton from '../../../../../../common/button';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import {useKeyboard} from '@react-native-community/hooks';

const PurchasePlan = ({route}) => {
  const [body, setBody] = useState(null);
  const [lead, setLead] = useState(null);
  const navigation = useNavigation();
  const {keyboardShown} = useKeyboard();
  const [leadError, setLeadError] = useState(null);
  const setLoader = useSetLoader();
  const {data: pageantPlanDetail} = useHtQuery<PlanData>({
    key:
      GET_PAGEANT_PLAN +
      ProfileType.PAGEANT +
      Param.PROFILE_ID +
      route.params.pageantId,
    url:
      GET_PAGEANT_PLAN +
      ProfileType.PAGEANT +
      Param.PROFILE_ID +
      route.params.pageantId,
    offSuccessToast: true,
  });


  const {mutateAsync: purchaseRequestAPI} = useCgMutation({
    key: PURCHASE_REQUEST,
    url: PURCHASE_REQUEST,
    method: MethodTypes.Post,
    disableLoader: true,
    body: body,
    offErrorToast: true,
  });

  useEffect(() => {
    setBody({
      prepaid_lead_price:
        pageantPlanDetail?.data?.my_plans[0]?.membership_plan
          ?.prepaid_lead_price,
      profile_type: translations.PAGEANT,
      profile_id: route.params.pageantId,
      requested_leads_number: lead,
    });
  }, [lead]);

  const onSubmit = async () => {
    if (checkIsConnected() && lead !== null && lead !== '' && lead > 0) {
      setLoader(true);
      const res = await purchaseRequestAPI();
      if (res.success) {
        navigation.goBack();
      }
      setLoader(false);
    } else if (lead === null || lead === '') {
      setLeadError(translations.THIS_FIELD_REQUIRED);
    } else if (lead == 0) {
      setLeadError(translations.COUNT_VALIDATION_ERR);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header lable={SCREEN.PURCHASE_PLAN} isUnderLineRequired />

      <View style={styles.rectangle}>
        <View style={styles.row}>
          <AppImages.Common.CreditsUsed />
          <View style={styles.column}>
            <Text style={styles.credits}>{translations.CREDITS_USED}</Text>
            <Text style={styles.creditCount}>
              {route?.params?.claimedLeads}
            </Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.row1}>
          <AppImages.Common.Credits />
          <View style={styles.column}>
            <Text style={styles.credits}>{translations.CREDITS_}</Text>
            <Text style={styles.creditCount}>
              {route?.params?.pendingLeads}
            </Text>
          </View>
        </View>
      </View>

      <PageantAdvertise
        pageantPlanDetail={pageantPlanDetail?.data}
        pageantId={route.params.pageantId}
        cardView={true}
      />
      <View style={styles.container1}>
        <View style={styles.rowLeadView}>
          <Text style={styles.leadHeaderTitle}>
            {translations.PER_LEAD_PRICE}
          </Text>
          {pageantPlanDetail?.data?.my_plans[0]?.membership_plan
            ?.prepaid_lead_price !== undefined &&
            pageantPlanDetail?.data?.my_plans[0]?.membership_plan
              ?.prepaid_lead_price < 5 && (
              <Text style={styles.leadHeaderCount}>
                {'$' +
                  pageantPlanDetail?.data?.my_plans[0]?.membership_plan
                    ?.prepaid_lead_price}
              </Text>
            )}
          <Text
            style={
              pageantPlanDetail?.data?.my_plans[0]?.membership_plan
                ?.cost_per_lead !== undefined &&
              pageantPlanDetail?.data?.my_plans[0]?.membership_plan
                ?.cost_per_lead <= 5
                ? styles.realPrice
                : styles.leadHeaderCount
            }>
            {'$' +
              pageantPlanDetail?.data?.my_plans[0]?.membership_plan
                ?.cost_per_lead}
          </Text>
        </View>
        <FloatingInput
          floatingText={translations.ADDITIONAL}
          value={lead}
          isMandatory={true}
          maxLength={4}
          returnKeyType={'done'}
          errorMsg={leadError}
          keyboardType={'number-pad'}
          autoCapitalize={'none'}
          setText={value => setLead(value.replace(/[^0-9 ]/g, ''))}
        />
        <View style={styles.rowView}>
          <Text style={styles.noteHeader}>{'Note*'}</Text>
          <Text style={styles.noteText}>
            {
              translations.THESE_LEADS_WILL_BECOME_A_PART_OF_YOUR_MONTHLY_PACKAGE_WITH_JUST_PAYING_A_MINIMAL_AMOUNT_UO_YOUR_PACKAGE
            }
          </Text>
        </View>
      </View>
      {!keyboardShown && (
        <View style={styles.buttonView}>
          <CustomButton
            label={translations.SUBMIT}
            inactive={true}
            onPress={onSubmit}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PurchasePlan;
