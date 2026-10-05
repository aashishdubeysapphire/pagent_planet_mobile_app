import React, {useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import {
  GET_EVENT_AWARDS_LIST,
  GET_EVENT_RESULT_LIST,
} from '../../../../../../../../services/endpoints';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {PLACEMENT, REFESH_SCREEN} from '../../../../../../../utils/enum';
import {AddEventResultRequest} from '../../../../../../../../services/models/event/addEventResultRequest';
import useHtQuery from '../../../../../../../../services/api/useHtQuery';
import useAppStore from '../../../../../../../../store/useAppStore';
import {Param} from '../../../../../../../../services/constants';
import EventResultsList from '../../../../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/resultaward/resultview/resultList';
import {Base} from '../../../../../../../../services/models/base';
import {PageantContestantData} from '../../../../../../../../services/models/pageantdetails/pageantContestantData';
import Shimmer from '../../../../../../../common/shimmer';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../../utils/responsiveSize';
// import FastImage from 'react-native-fast-image';
import FastImage from '@d11/react-native-fast-image';

interface Props {
  eventId?: number;
  ageId: string;
  isActive: string;
}

const resultArray = [
  PLACEMENT.WINNER + 's',
  PLACEMENT.RUNNER_UP1,
  PLACEMENT.RUNNER_UP2,
  PLACEMENT.RUNNER_UP3,
  PLACEMENT.RUNNER_UP4,
];

const EventPublicProfileResultsTab = ({eventId, ageId, isActive}: Props) => {
  const {
    storeData: {refresh},
  } = useAppStore();

  //API GET EVENT RESULT LIST----------------------------------------- START

  const {
    data: dataList,
    isLoading,
    refetch,
  } = useHtQuery<AddEventResultRequest>({
    key:
      GET_EVENT_RESULT_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,
    url:
      GET_EVENT_RESULT_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,
    offSuccessToast: true,
  });

  const {data: awardList, isLoading: awardLoading} = useHtQuery<
    Base<PageantContestantData>
  >({
    key:
      GET_EVENT_AWARDS_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,
    url:
      GET_EVENT_AWARDS_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,
    offSuccessToast: true,
  });

  //API GET EVENT RESULT LIST----------------------------------------- END

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  useEffect(() => {
    refeshlist();
  }, [isActive]);

  const refeshlist = async () => {
    await refetch();
  };

  const refeshScreenList = async () => {
    if (REFESH_SCREEN.UPDATE_EVENT_DETAIL_AGE_DIVISIONS === refresh) {
      await refetch();
    }
  };

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={styles.flatlistView}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        {!isLoading &&
          resultArray?.map((key, index) => {
            return (
              <EventResultsList
                data={
                  index === 0
                    ? dataList?.data?.winners
                    : index === 1
                    ? dataList?.data?.firstRunnerUps
                    : index === 2
                    ? dataList?.data?.secondRunnerUps
                    : index === 3
                    ? dataList?.data?.thirdRunnerUps
                    : index === 4
                    ? dataList?.data?.fourthRunnerUps
                    : null
                }
                resultName={key}
                isList={false}
              />
            );
          })}
        {!awardLoading && awardList?.data !== undefined && (
          <EventResultsList
            data={awardList?.data}
            resultName={translations.AWARD_WINNERS}
            isList={false}
          />
        )}

        {!isLoading &&
          !awardLoading &&
          dataList?.data === undefined &&
          awardList?.data === undefined && (
            <View style={styles.wrapper}>
              <View style={styles.imageArea}>
                <FastImage
                  style={{
                    width: '100%',
                    height: moderateScaleVertical(110),
                    borderRadius: moderateScale(16),
                  }}
                  source={AppImages.PAGEANT_DETAIL.NO_RESULT_BG}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View
                  style={{
                    alignItems: 'center',
                    position: 'absolute',
                    flexDirection: 'row',
                  }}>
                  <AppImages.Common.blackAlert />
                  <Text style={styles.textStyle}>
                    {translations.NO_RESULTS_ADDED}
                  </Text>
                </View>
              </View>
            </View>
          )}

        {isLoading && awardLoading && (
          <View style={styles.shimmerList}>
            <Shimmer
              width={width - moderateScale(32)}
              height={moderateScale(124)}
              borderRadius={moderateScale(24)}
              bottomSpace={moderateScale(16)}
            />
          </View>
        )}
        <View style={styles.staticHeight} />
      </ScrollView>
    </View>
  );
};

export default EventPublicProfileResultsTab;
