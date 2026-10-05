import React, {useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {styles} from './styles';
import EventToDosList from '../../../../../../../../../../common/eventtodolist';
import useHtQuery from '../../../../../../../../../../../services/api/useHtQuery';
import {
  MethodTypes,
  Param,
} from '../../../../../../../../../../../services/constants';
import {GET_CONTESTANT_SUBMISSION_TODOS} from '../../../../../../../../../../../services/endpoints';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../../../root/screenname';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../../../../../../common/shimmer/listshimmer';
import {ContestantSubmissionResponse} from '../../../../../../../../../../../services/models/eventmanager/contestantSubmissionTodos';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../../../../../../../common/commonalert';

interface Props {
  ageId: number;
  eventId: number;
}

const SubmissionList = ({ageId, eventId}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [getParams, setParams] = useState(
    Param.EVENT_ID + eventId + Param.AGE_DIVISION_ID + ageId,
  );

  //API GET CONTESTANT SUBMISSION LIST ----------------------------------------- START
  const {data, isLoading} = useHtQuery<ContestantSubmissionResponse>({
    key: GET_CONTESTANT_SUBMISSION_TODOS + getParams,
    url: GET_CONTESTANT_SUBMISSION_TODOS + getParams,
    offSuccessToast: true,
    method: MethodTypes.GET,
  });
  //API GET CONTESTANT SUBMISSION LIST  ----------------------------------------- END

  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  const onItemClickListener = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.COMPLETED_PENDING, {
        eventId: eventId,
        noOfPending: item?.pending_contestants,
        noOfCompleted: item?.total_contestants - item?.pending_contestants,
        todoName: item?.todo_category?.name,
        todoId: item?.id,
        ageId: ageId,
      });
    }
  };

  return (
    <View style={styles.container}>
      {data?.data !== undefined ? (
        <FlatList
          data={data?.data?.todosListData}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          nestedScrollEnabled
          key={'_'}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          ListFooterComponent={listFooterComponent}
          renderItem={({item, index}) => (
            <EventToDosList
              numberOfLinesForName={2}
              contestantName={
                item?.category_id === 9 ? item?.name : item?.todo_category?.name
              }
              edit={false}
              noOfContestants={item?.total_contestants}
              noOfPendingTodos={item?.pending_contestants}
              onItemClick={() => onItemClickListener(item)}
              showImage={false}
            />
          )}
        />
      ) : (
        isLoading && (
          <ShimmerList
            width={Dimensions.get('window').width - moderateScale(32)}
            height={moderateScaleVertical(100)}
            padding={16}
          />
        )
      )}
    </View>
  );
};

export default SubmissionList;
