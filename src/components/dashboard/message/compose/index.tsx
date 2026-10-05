import {SafeAreaView, View} from 'react-native';
import React from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import Exploreplan from './component/exploreplan';
import {styles} from './styles';
import ComposeForm from './component/composeform';
import useHtQuery from '../../../../services/api/useHtQuery';
import {PlanData} from '../../../../services/models/planData';
import {GET_PAGEANT_PLAN} from '../../../../services/endpoints';
import Loader from '../../../common/customloader';

const Compose = props => {
  const {data: pageantPlanDetail, isLoading: isLoadingPlanDetail} =
    useHtQuery<PlanData>({
      key: GET_PAGEANT_PLAN,
      url: GET_PAGEANT_PLAN,
      offSuccessToast: true,
    });
  //API  GET PAGEANT PLAN ----------------------------------------- END

  const getScreenView = () => {
    if (pageantPlanDetail?.has_valid_membership === 1) {
      return <ComposeForm {...props} />;
    } else {
      return <Exploreplan membershipPlans={pageantPlanDetail?.data} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header lable={translations.COMPOSE} isUnderLineRequired />
      <Loader isLoading={isLoadingPlanDetail} />
      {isLoadingPlanDetail ? null : getScreenView()}
    </View>
  );
};

export default Compose;
