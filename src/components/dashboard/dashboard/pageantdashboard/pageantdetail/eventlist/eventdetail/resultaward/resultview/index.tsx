import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../../assets/translations';
import {GET_EVENT_RESULT_LIST} from '../../../../../../../../../services/endpoints';
import ShimmerList from '../../../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {
  EVENT_STATUS,
  PLACEMENT,
  REFESH_SCREEN,
} from '../../../../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';
import {AddEventResultRequest} from '../../../../../../../../../services/models/event/addEventResultRequest';
import useHtQuery from '../../../../../../../../../services/api/useHtQuery';
import EventResultsList from './resultList';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import NoRecordView from '../../../../../../../../common/noresultsview';
import {internetState} from '../../../../../../../../common/commonalert';
import {FlatList} from 'react-native-gesture-handler';
import AddResultPopup from '../component/addresultpopup';
import useAppStore from '../../../../../../../../../store/useAppStore';
import {Param} from '../../../../../../../../../services/constants';

interface Props {
  eventTitle?: string;
  eventId?: number;
  ageId: string;
  isActive: string;
  ageName?: string;
  isFlatListScroolEnable: boolean;
  addedResultCount?: number;
  eventTenseStatus?: string;
  setIsModalAddResultVisible?: any;
  isModalAddResultVisible?: boolean;
  setModalAddResultVisible?: any;
  iModalAddResultVisible?: boolean;
  isReadOnly?: boolean;
  isListView?: boolean;
}

const resultArray = [
  PLACEMENT.WINNER + 's',
  PLACEMENT.RUNNER_UP1,
  PLACEMENT.RUNNER_UP2,
  PLACEMENT.RUNNER_UP3,
  PLACEMENT.RUNNER_UP4,
];

const EventResultsTab = ({
  eventTitle,
  eventId,
  ageId,
  isActive,
  ageName,
  eventTenseStatus,
  setIsModalAddResultVisible,
  addedResultCount,
  isModalAddResultVisible,
  setModalAddResultVisible,
  iModalAddResultVisible,
  isFlatListScroolEnable,
  isReadOnly = false,
  isListView = true,
}: Props) => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);

  const {
    storeData: {refresh},
  } = useAppStore();

  const [isList, setListState] = useState(isListView);
  const [isGridViewExist, setGridViewState] = useState(false);
  const navigation = useNavigation();
  const [eventStatus, setEventStatus] = useState('');

  //API GET EVENT RESULT LIST----------------------------------------- START

  const {
    data: dataList,
    isLoading,
    refetch,
    isFetching,
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
    disableLoader: true,
  });
  //API GET EVENT RESULT LIST----------------------------------------- END

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(16));
    setEventStatus(eventTenseStatus);
    if (!isLoading) {
      if (
        dataList?.data?.winners?.length > 1 ||
        dataList?.data?.firstRunnerUps?.length > 1 ||
        dataList?.data?.secondRunnerUps?.length > 1 ||
        dataList?.data?.thirdRunnerUps?.length > 1 ||
        dataList?.data?.fourthRunnerUps?.length > 1
      ) {
        setGridViewState(true);
      } else {
        setGridViewState(false);
      }

      if (
        !isModalAddResultVisible &&
        addedResultCount === 0 &&
        eventTenseStatus !== EVENT_STATUS.ON_GOING
      ) {
        setModalAddResultVisible(true);
      }
    }
  }, [isLoading, dataList]);

  const moveToEditConstestantScreen = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.EVENT_ADD_EDIT_RESULT, {
        eventId: eventId,
        results: dataList?.data,
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
      navigation.navigate(SCREEN.EVENT_ADD_EDIT_RESULT, {
        eventId: eventId,
        ageDivisionId: ageId,
        idEditResult: false,
      });
    }
  };
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

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
    <View style={styles.flatlistContainer}>
      {eventStatus === EVENT_STATUS.ON_GOING ? (
        <View
          style={{
            flexDirection: 'column',
            left: ageId === '' ? moderateScale(16) : 0,
          }}>
          <View style={styles.resultHeadingArea}>
            <Text style={styles.headingLabel} numberOfLines={2}>
              {eventTitle + ' ' + translations.RESULTS}
            </Text>
          </View>
          <View style={styles.noRecordView}>
            <NoRecordView text={translations.EVENT_NOT_COMPLETED_YET} />
          </View>
        </View>
      ) : !isLoading && dataList?.data === undefined ? (
        <View
          style={{
            flexDirection: 'column',
            left: ageId === '' ? moderateScale(16) : 0,
          }}>
          {!isReadOnly ? (
            <View style={styles.resultHeadingArea}>
              <Text style={styles.headingLabel} numberOfLines={2}>
                {eventTitle + ' ' + translations.RESULTS}
              </Text>
              <TouchableOpacity
                style={styles.topGridListSection}
                onPress={moveToAddConstestantScreen}>
                <AppImages.Dashboard.addPageant_ICON />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.gap} />
          )}

          <View style={styles.noRecordView}>
            <NoRecordView text={translations.NO_RESULTS_ADDED} />
          </View>
        </View>
      ) : !isLoading && dataList?.data !== undefined ? (
        <>
          {!isReadOnly ? (
            <View style={styles.resultHeadingArea}>
              <Text style={styles.headingLabel}>
                {translations.EDIT + ' ' + ageName + ' ' + translations.RESULTS}
              </Text>
              <View style={styles.topGridListSection}>
                <TouchableOpacity onPress={moveToEditConstestantScreen}>
                  <AppImages.Dashboard.edit_ICON />
                </TouchableOpacity>
                {isGridViewExist ? (
                  <TouchableOpacity
                    style={{marginLeft: moderateScale(16)}}
                    onPress={() => {
                      setListState(!isList);
                    }}>
                    {isList ? (
                      <AppImages.Gallery.GridActive_ICON />
                    ) : (
                      <AppImages.Gallery.ListActive_ICON />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ) : (
            <View style={styles.gap} />
          )}

          <View style={styles.flatlistView}>
            <FlatList
              data={resultArray}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              nestedScrollEnabled
              bounces={false}
              key={'*'}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={listFooterComponent}
              scrollEnabled={isFlatListScroolEnable}
              renderItem={({item, index}) => (
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
                  resultName={item}
                  isList={isList}
                />
              )}
            />
          </View>
        </>
      ) : (isLoading || isFetching) && netInfo.isInternetReachable ? (
        <View
          style={{
            marginTop: moderateScale(16),
            marginLeft: ageId === '' ? 0 : -moderateScale(15),
          }}>
          <ShimmerList
            width={2 * itemSize}
            height={itemSize - 40}
            padding={16}
            numColumns={1}
          />
        </View>
      ) : null}
      {isModalAddResultVisible !== undefined && !isModalAddResultVisible && (
        <AddResultPopup
          isModalVisible={iModalAddResultVisible}
          setModalVisible={setModalAddResultVisible}
          setIsModalVisible={setIsModalAddResultVisible}
          eventTenseStatus={eventTenseStatus}
          eventId={eventId}
          ageId={ageId}
        />
      )}
    </View>
  );
};

export default EventResultsTab;
