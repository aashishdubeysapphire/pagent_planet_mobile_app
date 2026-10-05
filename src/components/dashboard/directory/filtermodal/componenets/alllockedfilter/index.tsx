import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import {UserContext} from '../../../../../../store/userStore';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../../../../../root/screenname';
import {PAGEANT_DETAIL_MENU_ID} from '../../../../dashboard/pageantdashboard/pageantdetail/components/menu';
import {toast, toastType} from '../../../../../common/commonalert';
import translations from '../../../../../../assets/translations';
import {ROLES} from '../../../../../utils/enum';

// Define the component's Props interface
interface Props {
  data?: any;
  setIsModalVisible?: boolean;
}
const purchasePlanToast = () => {
  toast(translations.PURCHASE_A_PLAN, toastType.SUCESS_TOAST);
};
const AllLockedFilter = ({data, setIsModalVisible}: Props) => {
  // Get user data from the context
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();


  // redirectionFunction function determines where to redirect the user based on their profile
  const redirectionFunction = () => {
    // If user has director profile , user will get navigated to the director's first pageant's advertising section.
    if (storeData?.data?.user?.is_pageant_exist == true) {
      setTimeout(() => {
        setIsModalVisible(false);
      }, 500);

      navigation.navigate(SCREEN.PAGEANT_DETAIL, {
        pageantId: storeData?.data?.user?.pageant?.id,
        tab: PAGEANT_DETAIL_MENU_ID.ADVERTISE,
      });
    }

    // If user has an expert profile without director profile, toast message will be displayed.
    else if (
      storeData?.data?.user?.is_expert_exist == true &&
      storeData?.data?.user?.is_pageant_exist == false
    ) {
      purchasePlanToast();
    }
    // If user has an contestant profile without director profile and expert profile, toast message will be displayed.
    else if (
      storeData?.data?.user?.is_contestant_exist == true &&
      storeData?.data?.user?.is_pageant_exist == false &&
      storeData?.data?.user?.is_expert_exist == false
    ) {
      purchasePlanToast();
    }

    // If user has fan profile, user will be navigated to create profile screen
    else if (storeData.data?.user.primary_profile_type === null) {
      setTimeout(() => {
        setIsModalVisible(false);
      }, 500);
      navigation.navigate(SCREEN.CHOOSE_PROFILE_WITH_BACK, {
        showHeader: true,
        selectedRole: ROLES.CONTESTANT,
      });
    }
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterOptionContainer}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.row}>
              <AppImages.Common.DIRECTORY_LOCK />
              <Text style={styles.filterOptionContainerText}>
                {' '}
                {item?.title}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.filterOptionValueContainer}>
        <Text style={styles.unlockFilterText}>
          {translations.UPGRADE_TO_UNLOCK}
        </Text>
        <Text style={styles.unlockDscrpText}>
          {translations.UPGRADE_TO_UNLOCK_FEATURES}
        </Text>
        <TouchableOpacity
          style={styles.UnlockBtn}
          onPress={redirectionFunction}>
          <Text style={styles.upgradeBtnText}>
            {translations.UPGRADE_NOW_CAPITALIZE}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllLockedFilter;
