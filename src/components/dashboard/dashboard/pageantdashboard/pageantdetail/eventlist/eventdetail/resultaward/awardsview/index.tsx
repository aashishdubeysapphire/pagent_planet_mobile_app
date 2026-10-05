import React, {useState, useEffect} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../../assets/translations';
import {GET_EVENT_AWARDS_LIST} from '../../../../../../../../../services/endpoints';
import ShimmerList from '../../../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {EVENT_STATUS} from '../../../../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';
import {PageantContestantData} from '../../../../../../../../../services/models/pageantdetails/pageantContestantData';
import {Base} from '../../../../../../../../../services/models/base';
import AddFirstRecord from '../../../../../../../../common/addfirstrecord';
import EventAwardsList from './awardslist';
import {internetState} from '../../../../../../../../common/commonalert';
import useHtQuery from '../../../../../../../../../services/api/useHtQuery';
import {Param} from '../../../../../../../../../services/constants';

interface Props {
  eventTitle?: string;
  eventId?: number;
  ageId: string;
  isActive: boolean;
  ageName: string;
  isFlatListScroolEnable: boolean;
  eventTenseStatus: string | undefined;
}

const EventAwardsTab = ({
  eventTitle,
  eventId,
  ageId,
  isActive,
  ageName,
  eventTenseStatus,
  isFlatListScroolEnable,
}: Props) => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);
  const [params] = useState(Param.EVENT_ID + eventId + Param.AGE_DIVISION_ID);
  const navigation = useNavigation();

  //API GET EVENT CONTESTANT LIST----------------------------------------- START
  const {
    data: dataList,
    isLoading,
    refetch,
  } = useHtQuery<Base<PageantContestantData>>({
    key: GET_EVENT_AWARDS_LIST + params + ageId,
    url: GET_EVENT_AWARDS_LIST + params + ageId,
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET EVENT CONTESTANT LIST----------------------------------------- END

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  const moveToEditConstestantScreen = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.EVENT_ADD_EDIT_AWARD, {
        eventId: eventId,
        awards: dataList?.data,
        ageDivisionId: ageId,
        idEditResult: true,
      });
    }
  };

  const moveToAddConstestantScreen = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.EVENT_ADD_EDIT_AWARD, {
        eventId: eventId,
        ageDivisionId: ageId,
      });
    }
  };

  useEffect(() => {
    refeshlist();
  }, [isActive]);

  const refeshlist = async () => {
    await refetch();
  };
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };
  return (
    <View
      style={{
        ...styles.container,
        marginRight: ageId === '' ? 0 : moderateScale(16),
        marginLeft: ageId === '' ? moderateScale(16) : 0,
      }}>
      {!isLoading ? (
        <View style={styles.noRecordView}>
          <AddFirstRecord
            label={
              dataList?.data?.length > 0 &&
              eventTenseStatus === EVENT_STATUS.PAST
                ? translations.EDIT + ' ' + ageName + ' ' + translations.AWARDS
                : eventTitle + ' ' + translations.AWARDS
            }
            onPress={
              dataList?.data?.length > 0 &&
              eventTenseStatus === EVENT_STATUS.PAST
                ? moveToEditConstestantScreen
                : moveToAddConstestantScreen
            }
            isListAvallable={
              dataList?.data?.length > 0 &&
              eventTenseStatus === EVENT_STATUS.PAST
                ? true
                : false
            }
            bodyText={
              eventTenseStatus === EVENT_STATUS.ON_GOING
                ? translations.EVENT_NOT_COMPLETED_YET
                : translations.NO_AWARDS_ADDED
            }
            editIcon={
              dataList?.data?.length > 0 &&
              eventTenseStatus === EVENT_STATUS.PAST
                ? true
                : false
            }
            hidePlusIcon={
              eventTenseStatus === EVENT_STATUS.ON_GOING ? true : false
            }
          />
        </View>
      ) : null}
      <View style={styles.flatlistContainer}>
        {dataList?.data?.length > 0 &&
        !isLoading &&
        eventTenseStatus === EVENT_STATUS.PAST ? (
          <FlatList
            data={dataList?.data}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={'*'}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={isFlatListScroolEnable}
            nestedScrollEnabled
            ListFooterComponent={listFooterComponent}
            renderItem={({item, index}) => (
              <EventAwardsList
                awardTitle={item?.award_title}
                winnerName={item?.contestant_name}
                imageUrl={item?.contestant_image_url}
                itemSize={itemSize}
              />
            )}
          />
        ) : isLoading && netInfo.isInternetReachable ? (
          <ShimmerList
            width={itemSize}
            height={itemSize}
            padding={15}
            numColumns={2}
          />
        ) : null}
      </View>
    </View>
  );
};

export default EventAwardsTab;
