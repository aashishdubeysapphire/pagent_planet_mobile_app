import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import TopSlider from './profilesection/topslider';
import MyJourney from './myjourney';
import Gallery from './gallery';
import ProfileSection from './profilesection';
import CommingSoonComp from '../../../common/commingsooncomp';
import {GALLERY_TYPE, ROLES, CONTESTANT_SUB_TAB} from '../../../utils/enum';
import {Param} from '../../../../services/constants';

interface Props {
  tabIndeex?: number | null;
  sliderIndexUpdate: any;
}
const ContestantDashboard = ({
  tabIndeex,
  sliderIndexUpdate = () => {},
}: Props) => {
  return (
    <View style={styles.container}>
      <TopSlider onTabClick={sliderIndexUpdate} selectedTab={tabIndeex} />
      {tabIndeex === CONTESTANT_SUB_TAB.MY_JOURNEY ? (
        <MyJourney />
      ) : tabIndeex === CONTESTANT_SUB_TAB.GALLERY ? (
        <Gallery
          param={Param.PROFILE_TYPE + ROLES.CONTESTANT.toLocaleLowerCase()}
          isFlatListScroolEnable={true}
          galleryType={GALLERY_TYPE.CONTESTANT_GALLERY}
        />
      ) : tabIndeex === CONTESTANT_SUB_TAB.PROFILE ? (
        <ProfileSection />
      ) : (
        <CommingSoonComp />
      )}
    </View>
  );
};

export default ContestantDashboard;
