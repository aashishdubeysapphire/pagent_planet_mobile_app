import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import CustomButton from '../../../../../common/button';
import translations from '../../../../../../assets/translations';
import ViewPlanModal from '../../../../dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';
import {PlanData} from '../../../../../../services/models/planData';
import {UserContext} from '../../../../../../store/userStore';
import {isOnlyExpert} from '../../../../../utils/helperFunction';
import {useNavigation} from '@react-navigation/core';
import {toast, toastType} from '../../../../../common/commonalert';
import {ROLES, USER_DESHBOARD_TAB} from '../../../../../utils/enum';
import {SCREEN} from '../../../../../../root/screenname';
interface Props {
  membershipPlans?: PlanData;
}
const Exploreplan = ({membershipPlans}: Props) => {
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <View style={styles.mainView}>
      <View style={styles.centerView}>
        <AppImages.COMPOSE.explorePlans />
        <View style={styles.btn}>
          {isOnlyExpert(storeData?.data?.user) ? (
            <Text style={styles.borderButtonText}>
              {
                translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE
              }
            </Text>
          ) : (
            <CustomButton
              inactive
              smallHeight
              label={translations.EXPLORE + ' ' + translations.PLANS}
              onPress={() => {
                navigation?.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREEN.DASHBOARD_NAVIGATION,
                    },
                  ],
                });
                if (
                  storeData?.data?.user?.primary_profile_type !== ROLES.PAGEANT
                ) {
                  toast(
                    translations.PURCHASE_MEMBERSHIP_FROM_WEBSITE_TO_ACCESS_THE_FEATURE,
                    toastType.ERROR_TOAST,
                  );
                } else {
                  toast(
                    translations.PURCHASE_THE_MEMEBERSHIP_PLAN_FOR_PROFILE_TO_ACCESS_THE_FEATURE,
                    toastType.SUCESS_TOAST,
                  );
                }
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: USER_DESHBOARD_TAB.DESHBOARD,
                      params: {openPrimaryDashbord: true},
                    },
                  ],
                });
              }}
            />
          )}
        </View>
      </View>

      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={membershipPlans}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </View>
  );
};

export default Exploreplan;
