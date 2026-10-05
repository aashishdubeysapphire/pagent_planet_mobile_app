import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../../../common/header';
import {styles} from './styles';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {GET_AGE_DIVISION_BY_EVENTS} from '../../../../../../../services/endpoints';
import BackgroundTimer from 'react-native-background-timer';
import translations from '../../../../../../../assets/translations';
import {AgeDivision} from '../../../../../../../services/models/pageantdetails/ageDivision';
import {MethodTypes, UpgradPlan} from '../../../../../../../services/constants';
import DynamicTabs from '../../../../../../common/dynamictabs';
import {Base} from '../../../../../../../services/models/base';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import PublicProfileContestantTab from './components/contestanttab';
import {useSetLoader} from '../../../../../../../store/useAppStore';

const EventPublicProfileContestants = ({route}) => {
  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- START
  const [eventId] = useState(route?.params?.eventId);

  const [globalTimer, setGlobalTimer] = useState(0);

  const [apiKey] = useState(route?.params?.apiKey);

  const {data: ageDivisionList, isLoading: ageDivisionLoading} = useHtQuery<
    Base<AgeDivision[]>
  >({
    key: apiKey + GET_AGE_DIVISION_BY_EVENTS + eventId,
    method: MethodTypes.GET,
    url: GET_AGE_DIVISION_BY_EVENTS + eventId,
    offSuccessToast: true,
  });

  const setLoader = useSetLoader();
  const [hideContestantLastName] = useState(
    route?.params?.hideContestantLastName,
  );

  console.log(ageDivisionList, 'this is list');
  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- END

  useEffect(() => {
    setLoader(ageDivisionLoading);
  }, [ageDivisionLoading]);

  /**
   * Start the 1s tick once age divisions are loaded so the countdown in each
   * tab advances on the first visit. Functional updater avoids capturing a
   * stale `globalTimer` value inside BackgroundTimer's long-lived callback.
   */
  useEffect(() => {
    if (ageDivisionLoading || !ageDivisionList?.data?.length) {
      return;
    }
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(() => {
      setGlobalTimer(prev => prev + 1);
    }, 1000);
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [ageDivisionLoading, ageDivisionList?.data?.length]);

  const renderScene = (page: any, index: number) => {
    let position = Number(page.key);
    if (position > -1) {
      return (
        <PublicProfileContestantTab
          eventId={eventId}
          isFlatListScroolEnable={true}
          screenKey={apiKey}
          globalTimer={globalTimer}
          ageId={ageDivisionList.data[Number(page.key)].id + ''}
          hideContestantLastName={hideContestantLastName === UpgradPlan.YES}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header lable={translations.CONTESTANTS} isUnderLineRequired />
      {!ageDivisionLoading &&
        ageDivisionList?.data !== undefined &&
        ageDivisionList?.data?.length > 0 && (
          <DynamicTabs
            tabScreen={renderScene}
            ageDivisionList={ageDivisionList?.data}
            indexChanged
            isAllTabRequired={false}
            selectedTab={route.params.selectedTab}
            customStylesForContainer={{
              marginTop: moderateScale(0),
            }}
          />
        )}
    </SafeAreaView>
  );
};

export default EventPublicProfileContestants;
