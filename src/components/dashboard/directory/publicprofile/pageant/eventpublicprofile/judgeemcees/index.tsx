import {SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../../../../../common/header';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import EventJudgesEmcees from '../../../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/judgesemcees';
import {useSetScreenRefresh} from '../../../../../../../store/useAppStore';
import {REFESH_SCREEN} from '../../../../../../utils/enum';

const EventPublicProfileJudgeEmcees = ({route}) => {
  const setScreenRefresh = useSetScreenRefresh();

  useEffect(() => {
    setScreenRefresh(REFESH_SCREEN.JUDDGE_AND_EMCEES);
  }, []);

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header
        lable={translations.EVENT + ' ' + translations.JUDGES_EMCEES}
        isUnderLineRequired
      />
      <View style={styles.space}></View>
      <EventJudgesEmcees
        isFlatListScroolEnable={true}
        eventId={route?.params?.eventId}
        isReadOlny={true}
        forPublicPage={true}
      />
    </SafeAreaView>
  );
};

export default EventPublicProfileJudgeEmcees;
