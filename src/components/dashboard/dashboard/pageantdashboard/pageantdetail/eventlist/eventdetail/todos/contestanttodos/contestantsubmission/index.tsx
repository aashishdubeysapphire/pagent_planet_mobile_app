import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {styles} from './styles';
import DynamicTabs, {
  TAB_KEYS,
} from '../../../../../../../../../common/dynamictabs';
import {Param} from '../../../../../../../../../../services/constants';
import useHtQuery from '../../../../../../../../../../services/api/useHtQuery';
import ShimmerList from '../../../../../../../../../common/shimmer/listshimmer';
import SubmissionList from './submissionlist';
import Header from '../../../../../../../../../common/header';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GET_AGE_DIVISIONS_BY_EVENTS} from '../../../../../../../../../../services/endpoints';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';
import {AgeDivisionsResponse} from '../../../../../../../../../../services/models/eventmanager/ageDivisionList';
import { emptyFunction, trackScreenView } from '../../../../../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../../../../../assets/translations/analyticsscreenname';

const ContestantSubmission = props => {
  const navigation = useNavigation();
  const [ageDivisionList, seAgeDivisionList] = useState([]);

  //API GET EVENT AGE DIVISION LIST----------------------------------------- START
  const {data, isLoading} = useHtQuery<AgeDivisionsResponse>({
    key: GET_AGE_DIVISIONS_BY_EVENTS + props.route.params.randomNo,
    url:
      GET_AGE_DIVISIONS_BY_EVENTS + Param.EVENT_ID + props.route.params.eventId,
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET EVENT AGE DIVISION LIST----------------------------------------- END

  useEffect(() => {
    seAgeDivisionList(data?.data?.ageDivisionsArr);
  }, [data]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.CONTESTANT_SUBMISSIONS)
  }, []);
  const renderScene = (page: any, index: number) => {
    return (
      <SubmissionList
        eventId={props.route.params.eventId}
        ageId={
          ageDivisionList !== undefined &&
          ageDivisionList.length > 0 &&
          page.key !== undefined &&
          ageDivisionList[Number(page.key)]?.id !== undefined
            ? page.key === TAB_KEYS.ALL
              ? 0
              : ageDivisionList[Number(page.key)].id
            : 0
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={SCREEN.CONTESTANT_SUBMISSIONS}
        onPressBack={() => navigation.goBack()}
        isUnderLineRequired
      />
      <View style={styles.tabsView}>
        {ageDivisionList !== undefined && ageDivisionList?.length > 0 ? (
          <DynamicTabs
            tabScreen={renderScene}
            ageDivisionList={ageDivisionList}
            isAllTabRequired
            customStyles={{marginLeft: moderateScale(16)}}
            customStylesForContainer={{
              marginLeft: moderateScale(0),
              height: Dimensions.get('window').height,
            }}
            indexChanged={emptyFunction}
          />
        ) : isLoading ? (
          <View style={styles.shimmerView}>
            <ShimmerList
              height={moderateScaleVertical(100)}
              width={Dimensions.get('window').width - moderateScale(32)}
              padding={16}
            />
          </View>
        ) : (
          renderScene(-1, -1)
        )}
      </View>
    </SafeAreaView>
  );
};

export default ContestantSubmission;
