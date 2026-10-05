import React, {useState, useEffect} from 'react';
import {View, FlatList, Dimensions, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../../assets/translations';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../../../../../../services/constants';
import {
  GET_EVENT_CONTESTANT_LIST,
  DELETE_EVENT_CONTESTANT,
} from '../../../../../../../../../services/endpoints';
import useInfiniteHtQuery from '../../../../../../../../../services/api/useHtInfiniteQuery';
import AwardsGrid from '../../../../../../../../common/awardsgrid';
import ShimmerList from '../../../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../store/useAppStore';
import WarningModel from '../../../../../../../../common/warningmodel';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {EVENT_STATUS, REFESH_SCREEN} from '../../../../../../../../utils/enum';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import {PageantContestantData} from '../../../../../../../../../services/models/pageantdetails/pageantContestantData';
import {Base} from '../../../../../../../../../services/models/base';
import {internetState} from '../../../../../../../../common/commonalert';
import {EVENT_DETAIL_MENU_ID} from '../../components/menu';
import AddFirstRecord from '../../../../../../../../common/addfirstrecord';
import { trackScreenView } from '../../../../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../../../../assets/translations/analyticsscreenname';

interface Props {
  eventTitle?: string;
  eventId?: number;
  ageId: string;
  isActive: number;
  callAgeDivisionAPI: any;
  isFlatListScroolEnable: boolean;
  eventTenseStatus: string;
  setSelectedMenuId: Function;
  setSelectedToDoTab: Function;
}

const ContestantTab = ({
  eventTitle,
  eventId,
  ageId,
  isActive,
  callAgeDivisionAPI,
  isFlatListScroolEnable,
  eventTenseStatus,
  setSelectedMenuId,
  setSelectedToDoTab,
}: Props) => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);
  const [contestantId, setContestantId] = useState(0);
  const [deleteContestantAgeID, setdeleteContestantAgeID] = useState();
  const [getContestantApiUrl] = useState(
    GET_EVENT_CONTESTANT_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,
  );
  const setLoader = useSetLoader();

  const {
    storeData: {refresh},
  } = useAppStore();

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();

  //API GET EVENT CONTESTANT LIST----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<Base<PageantContestantData>>({
    key: getContestantApiUrl,
    url: getContestantApiUrl,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.pageantContestants.data.length,
    reverse: true,
    disableLoader: true,
  });

  const dataList =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.pageantContestants?.data !== null &&
          page?.data?.pageantContestants?.data !== undefined
        ) {
          return page?.data?.pageantContestants.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  //API GET EVENT CONTESTANT LIST----------------------------------------- END

  //API DELETE EVENT CONTESTANT----------------------------------------- START
  const {mutateAsync: removeContestant} = useCgMutation<Base>({
    key: DELETE_EVENT_CONTESTANT + eventId,
    url:
      DELETE_EVENT_CONTESTANT +
      Param.EVENT_ID +
      eventId +
      Param.CONTESTANT_PARAM +
      contestantId +
      Param.AGE_DIVISION_ID +
      deleteContestantAgeID,
    offSuccessToast: false,
    method: MethodTypes.GET,
    disableLoader: true,
  });
  //API DELETE EVENT CONTESTANT----------------------------------------- END

  const onEndReached = async () => {
    fetchNextPage();
  };

  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN)
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  useEffect(() => {
    if (ageId.length === 0) {
      refeshScreen();
    }
  }, [isActive]);

  const moveToEditConstestantScreen = item => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.EVENT_EDIT_CONSTESTANT, {
        eventId: eventId,
        contestant: item,
        ageDivisionId: ageId,
      });
    }
  };

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  const refeshScreen = async () => {
    await refetch();
  };

  const refeshScreenList = async () => {
    if (REFESH_SCREEN.EDIT_CONTASTENT_IN_EVENT === refresh) {
      await refetch();
    }
  };

  const deleteContestant = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      const response = await removeContestant();
      setLoader(false);
      if (response.success && response.status_code === ApiStatusType.Success) {
        if (dataList.length < 2 || ageId.length === 0) {
          callAgeDivisionAPI();
        } else {
          await refetch();
        }
        setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
      }
    }
  };
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  const goToContestantSchedule = () => {
    setSelectedMenuId(EVENT_DETAIL_MENU_ID.EVENT_MANAGER);
    setSelectedToDoTab(2); //making contestant schedule tab active
  };

  const moveToAddConstestantScreen = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.EVENT_ADD_CONSTESTANT, {
        eventId: eventId,
        ageDivisionId: ageId,
      });
    }
  };

  return (
    <View>
      {!isLoading ? (
        <View
          style={[
            {
              marginTop:
                dataList.length > 0
                  ? moderateScaleVertical(0)
                  : moderateScaleVertical(5),
              marginStart:
                dataList !== undefined && dataList.length > 0
                  ? moderateScaleVertical(-16)
                  : 0,
              paddingEnd:
                dataList !== undefined && dataList.length > 0
                  ? moderateScaleVertical(16)
                  : 0,
            },
          ]}>
          <AddFirstRecord
            label={eventTitle + ' ' + translations.CONTESTANTS}
            onPress={moveToAddConstestantScreen}
            isListAvallable={dataList !== undefined && dataList.length > 0}
            bodyText={translations.NO_CONTESTANTS_FOUND}
            showTapHereButton={eventTenseStatus !== EVENT_STATUS.PAST}
            onTapButtonPress={goToContestantSchedule}
          />
        </View>
      ) : null}

      {eventTenseStatus !== EVENT_STATUS.PAST && dataList?.length > 0 && (
        //when contestants are not 0 , then only show this ,
        <TouchableOpacity
          style={styles.showTapButton}
          onPress={() => {
            goToContestantSchedule();
          }}>
          <Text style={styles.tapButton}>{translations.TAP_HERE}</Text>
          <Text style={styles.contestantLabel}>
            {translations.TO_VIEW_CONTETSANT_SCHEDULE}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.flatlistContainer}>
        <View style={styles.flatlistView}>
          {dataList.length > 0 && !isLoading ? (
            <View>
              <FlatList
                data={dataList}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                nestedScrollEnabled
                key={'_'}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={isFlatListScroolEnable}
                onEndReached={onEndReached}
                ListFooterComponent={listFooterComponent}
                renderItem={({item, index}) => (
                  <AwardsGrid
                    item={item}
                    screenName={translations.EVENT_CONTESTANT}
                    imageUrl={item?.final_image_url}
                    label={
                      item?.contestant_name !== undefined &&
                      item?.contestant_name?.length > 0
                        ? item.contestant_name
                        : item?.name
                    }
                    numberOfLinesForHeading={1}
                    subHeading={item?.contestant_title}
                    onPressButtonClick={() => {
                      setContestantId(item?.contestant_id);
                      setdeleteContestantAgeID(item?.age_division_id);
                      setDeleteModalVisible(true);
                    }}
                    editIcon={true}
                    onEditButtonClick={() => {
                      moveToEditConstestantScreen(item);
                    }}
                  />
                )}
              />
            </View>
          ) : (
            isLoading &&
            netInfo.isInternetReachable && (
              <View
                style={[
                  {
                    marginStart:
                      isActive === -1 ? moderateScaleVertical(16) : 0,
                  },
                ]}>
                <ShimmerList
                  width={itemSize}
                  height={itemSize}
                  padding={15}
                  numColumns={2}
                />
              </View>
            )
          )}
        </View>

        <WarningModel
          msg={translations.DELETE_EVENT_CONTESTANT_CONFIRM_MSG}
          isModalVisible={isDeleteModalVisible}
          setConfirm={deleteContestant}
          setIsModalVisible={setDeleteModalVisible}
          headingStyle={styles.modalHeading}
        />
      </View>
    </View>
  );
};

export default ContestantTab;
