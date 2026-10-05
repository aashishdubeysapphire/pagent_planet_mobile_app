import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import TopSlider from '../contestantdashboard/profilesection/topslider';
import CommingSoonComp from '../../../common/commingsooncomp';
import {EXPERT_SUB_TAB} from '../../../utils/enum';
import ExpertProfile from './expertprofile';
import ExpertDashboardReviews from './expertdashboardreviews';
import MyWork from './mywork';
import {SortedRolesForPublicScreen} from '../../../../services/models/user/user';
import translations from '../../../../assets/translations';

interface Props {
  tabIndeex?: number | null;
  sliderIndexUpdate: any;
  sortedRolesForPublicScreen: SortedRolesForPublicScreen | undefined;
}
/* The code is defining a functional component called `ExpertDashboard` that takes in a set of props.
The props include `tabIndeex`, `sliderIndexUpdate`, and `sortedRolesForPublicScreen`. */
const ExpertDashboard = ({
  tabIndeex,
  sliderIndexUpdate = () => {},
  sortedRolesForPublicScreen,
}: Props) => {
  const [isProfileInactive, setProfileInactive] = useState(false);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
 used to call the `sliderIndexUpdate` function with an argument of 0 when the component is first
 rendered. The empty array `[]` as the second argument ensures that the effect is only run once,
 similar to the `componentDidMount` lifecycle method in class components. */
  useEffect(() => {
    sliderIndexUpdate(0);
  }, []);

  return (
    <View style={styles.container}>
      {isProfileInactive && (
        <View style={styles.detailsArea}>
          <Text style={styles.inactiveLabel}>
            {translations.ACTIVATE_YOUR_EXPERT_PROFILE}
          </Text>
        </View>
      )}

      <TopSlider
        onTabClick={sliderIndexUpdate}
        selectedTab={tabIndeex}
        isExpertTabs
      />
      {tabIndeex === EXPERT_SUB_TAB.PROFILE ? (
        <ExpertProfile
          sortedRolesForPublicScreen={sortedRolesForPublicScreen}
          setProfileInactive={setProfileInactive}
        />
      ) : tabIndeex === EXPERT_SUB_TAB.REVIEW ? (
        <ExpertDashboardReviews
          sortedRolesForPublicScreen={sortedRolesForPublicScreen}
        />
      ) : tabIndeex === EXPERT_SUB_TAB.MY_WORK ? (
        <MyWork sortedRolesForPublicScreen={sortedRolesForPublicScreen} />
      ) : (
        <CommingSoonComp />
      )}
    </View>
  );
};

export default ExpertDashboard;
