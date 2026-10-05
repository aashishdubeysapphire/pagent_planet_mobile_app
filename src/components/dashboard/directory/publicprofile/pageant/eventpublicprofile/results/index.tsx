import {SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../../../common/header';
import {styles} from './styles';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {GET_AGE_DIVISION_BY_EVENTS} from '../../../../../../../services/endpoints';
import translations from '../../../../../../../assets/translations';
import {AgeDivision} from '../../../../../../../services/models/pageantdetails/ageDivision';
import {MethodTypes} from '../../../../../../../services/constants';
import DynamicTabs from '../../../../../../common/dynamictabs';
import {Base} from '../../../../../../../services/models/base';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import EventPublicProfileResultsTab from './resultaward';

const EventPublicProfileResults = ({route}) => {
  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- START
  const [eventId] = useState(route?.params?.eventId);
  const {data: ageDivisionList, isLoading: ageDivisionLoading} = useHtQuery<
    Base<AgeDivision[]>
  >({
    key: GET_AGE_DIVISION_BY_EVENTS + eventId,
    method: MethodTypes.GET,
    url: GET_AGE_DIVISION_BY_EVENTS + eventId,
    offSuccessToast: true,
  });
  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- END

  const renderScene = (page: any, index: number) => {
    let position = Number(page.key);
    if (position > -1) {
      return (
        <EventPublicProfileResultsTab
          eventId={eventId}
          ageId={ageDivisionList.data[Number(page.key)].id + ''}
          isActive={page.key}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header lable={translations.RESULTS} isUnderLineRequired />
      {!ageDivisionLoading &&
        ageDivisionList?.data !== undefined &&
        ageDivisionList?.data?.length > 0 && (
          <DynamicTabs
            tabScreen={renderScene}
            ageDivisionList={ageDivisionList?.data}
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

export default EventPublicProfileResults;
