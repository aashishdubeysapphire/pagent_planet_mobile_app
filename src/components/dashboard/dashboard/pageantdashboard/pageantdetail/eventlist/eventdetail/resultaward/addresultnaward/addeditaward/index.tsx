import {View, ScrollView, BackHandler} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../../../../../../../common/header';
import translations from '../../../../../../../../../../assets/translations';
import {styles} from './styles';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {
  ADD_EVENT_AWARD,
  GET_AGE_DIVISION_BY_EVENTS,
  GET_MASTER_DATA,
  GET_EVENT_AWARDS_LIST,
} from '../../../../../../../../../../services/endpoints';
import {MASTERDATA, REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../../store/useAppStore';
import {internetState} from '../../../../../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import {Base} from '../../../../../../../../../../services/models/base';
import {
  MethodTypes,
  Param,
} from '../../../../../../../../../../services/constants';
import {keyBoardManager} from '../../../../../../../../../utils/helperFunction';
import {SafeAreaView} from 'react-native-safe-area-context';
import FloatingDropdown from '../../../../../../../../../common/floatingdropown';
import EventAddResultItem from '../components/eventadditem';
import OvelContainer from '../../../../../../../../../common/ovelcontainer';
import CustomBottomModal from '../../../../../../../../../common/custombottommodal';
import useHtQuery from '../../../../../../../../../../services/api/useHtQuery';
import {AddEventRequest} from '../../../../../../../../../../services/models/event/addeventrequest';
import {AgeDivision} from '../../../../../../../../../../services/models/pageantdetails/ageDivision';
import {Award} from '../../../../../../../../../../services/models/pageantdetails/award';
import {useNavigation} from '@react-navigation/core';
import WarningModel from '../../../../../../../../../common/warningmodel';
import {AddEventResultRequest} from '../../../../../../../../../../services/models/event/addEventResultRequest';
import {MasterData} from '../../../../../../../../../../services/models/masterData';

const EventAddEditAward = ({route}) => {
  const scrollRef = useRef();
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const [isAgeDivision, setAgeDivision] = useState(false);
  const [selectedAgeDivision, setSelectedAgeDivision] = useState<AgeDivision>();
  const [isAllFieldActive, setAllFiledActive] = useState(true);
  const [renderItem, setRenderItem] = useState(false);
  const navigation = useNavigation();
  const [awardItem, setAwardtems] = useState<AddEventRequest[]>([]);
  const [availableAwardItems, setAvailableAwardItems] = useState<
    Award[] | undefined
  >([]);
  const [selectedAgeDivisionRequest, setSelectedAgeDivisionRequest] = useState(
    route.params.ageDivisionId,
  );
  const setScreenRefresh = useSetScreenRefresh();
  const [addEditResultRequestBody, setAddEditAwardRequestBody] =
    useState<AddEventResultRequest>();
  const [isWarmingModelVisible, setWarningModal] = useState(false);

  //API Age Division ----------------------------------------- START
  const {data: ageDivisionList, isLoading} = useHtQuery<AgeDivision[]>({
    key: GET_AGE_DIVISION_BY_EVENTS + `${route.params.eventId}`,
    url: GET_AGE_DIVISION_BY_EVENTS + `${route.params.eventId}`,
    offSuccessToast: true,
  });
  //API Age Division  ----------------------------------------- END

  //API GET_MASTER_DATA ----------------------------------------- START
  const {mutateAsync: getMasterDetails} = useCgMutation<MasterData>({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.AWARDS}`,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET_MASTER_DATA ----------------------------------------- END

  //API GET_MASTER_DATA ----------------------------------------- START
  const {mutateAsync: getOldAward} = useCgMutation<Base<AddEventResultRequest>>(
    {
      key:
        GET_EVENT_AWARDS_LIST +
        Param.EVENT_ID +
        +`${route.params.eventId}` +
        Param.AGE_DIVISION_ID +
        selectedAgeDivisionRequest,
      url:
        GET_EVENT_AWARDS_LIST +
        Param.EVENT_ID +
        +`${route.params.eventId}` +
        Param.AGE_DIVISION_ID +
        selectedAgeDivisionRequest,
      offSuccessToast: true,
      disableLoader: true,
      method: MethodTypes.GET,
    },
  );
  //API GET_MASTER_DATA ----------------------------------------- END

  /**
   * GetAwardList takes an array of AddEventRequest objects and returns an array of Award objects.
   * @param {AddEventRequest[]} item - AddEventRequest[]
   * @returns An array of objects.
   */
  const getAwardList = (item: AddEventRequest[]) => {
    let resultsList: Award[] = [];
    for (let index = 0; index < item.length; index++) {
      if (
        route.params.idEditResult !== undefined &&
        route.params.idEditResult &&
        item[index].oldId !== undefined
      ) {
        resultsList.push({
          contestant_id: item[index].contestant?.contestant_id,
          award_id: item[index].award?.id,
          id: item[index].oldId,
        });
      } else {
        resultsList.push({
          contestant_id: item[index].contestant?.contestant_id,
          award_id: item[index].award?.id,
        });
      }
    }
    return resultsList;
  };

  /* A mutation request to the server. */
  const {mutateAsync: addEditAwardRequest} = useCgMutation<Base>({
    key: ADD_EVENT_AWARD,
    body: addEditResultRequestBody,
    url: ADD_EVENT_AWARD,
    disableLoader: true,
  });

  /* Calling the keyBoardManager() and getMasterData() functions when the component is mounted. */
  useEffect(() => {
    keyBoardManager();
    createRequestBody();
  }, []);

  /* Checking if the isLoading is false and if the ageDivisionList?.data is not undefined and if the
 route.params.ageDivisionId is not undefined. If all of these are true then it will loop through the
 ageDivisionList?.data and check if the id of the ageDivisionList?.data is equal to the
 route.params.ageDivisionId. If it is true then it will set the selectedAgeDivision to the
 ageDivisionList?.data[index] and setAllFiledActive to true. */
  useEffect(() => {
    setLoader(true);
    if (
      !isLoading &&
      ageDivisionList?.data !== undefined &&
      route.params.ageDivisionId !== undefined
    ) {
      for (let index = 0; index < ageDivisionList?.data?.length; index++) {
        if (
          ageDivisionList?.data[index].id + '' ===
          route.params.ageDivisionId
        ) {
          setSelectedAgeDivisionRequest(ageDivisionList?.data[index].id + '');
          setSelectedAgeDivision(ageDivisionList?.data[index]);
          setAllFiledActive(true);
        }
      }
      getMasterData(route.params.ageDivisionId + '');
    }
  }, [isLoading]);

  /**
   * GetMasterData() is an async function that calls getMasterDetails() and if the response is
   * successful, it sets the state of availableAwardItems and if the route.params.idEditResult is not
   * undefined and route.params.idEditResult is true, it calls resetOldrecord() and passes in
   * oldRecordToEdit and setAwardtems as parameters.
   */
  const getMasterData = async (ageDivisionId: string) => {
    setSelectedAgeDivisionRequest(ageDivisionId);
    const res = await getMasterDetails();
    if (res.success) {
      setAvailableAwardItems(res.data?.master_records.award);
      if (
        route.params.idEditResult !== undefined &&
        route.params.idEditResult
      ) {
        setSelectedAgeDivisionRequest(ageDivisionId);
        setTimeout(() => {
          resetOldrecord(ageDivisionId, false);
        }, 200);
      } else {
        setLoader(false);
      }
    } else {
      resetArray(false, 0, awardItem, setAwardtems);
      setRenderItem(true);
      createRequestBody();
      setLoader(false);
    }
  };

  /**
   * If the oldRecord is not undefined and the length of the oldRecord is greater than 0, then for each
   * entry in the oldRecord, set the oldArray to the oldArray with the entry's contestant_id, name,
   * oldId, and award.
   * @param {Award[] | undefined} oldRecord - Award[] | undefined
   * @param {any} setter - (oldArray: Award[]) => void;
   */
  const resetOldrecord = async (
    ageDivisionId: string,
    displayLoader: boolean,
  ) => {
    setSelectedAgeDivisionRequest(ageDivisionId);
    if (displayLoader) {
      setLoader(true);
    }
    const addedResponse = await getOldAward();
    setLoader(false);

    if (addedResponse.success) {
      if (addedResponse.data !== undefined && addedResponse.data.length > 0) {
        for (const entry of addedResponse.data) {
          setAwardtems(oldArray => [
            ...oldArray,
            {
              contestant: {
                contestant_id: entry.contestant_id,
                name: entry.contestant_name,
              },
              oldId: entry.id,
              award: entry.event_award,
            },
          ]);
        }
      } else {
        resetArray(false, 0, awardItem, setAwardtems);
      }
      setRenderItem(true);
      setTimeout(() => {
        refreshScreen();
      }, 200);

      setLoader(false);
    } else {
      setLoader(false);
    }
    createRequestBody();
  };

  const createRequestBody = () => {
    const body: AddEventResultRequest = {
      event_id: route.params.eventId,
      age_division_id: selectedAgeDivision?.id,
      pageant_awards: getAwardList(awardItem),
    };
    setAddEditAwardRequestBody(body);
  };

  /**
   * When the user clicks on the 'Winner' tab, the 'Winner' tab will be set to active and all other tabs
   * will be set to inactive.
   */
  const resetAllTab = () => {
    setRenderItem(false);
  };

  useEffect(() => {
    createRequestBody();
  }, [awardItem]);

  useEffect(() => {
    createRequestBody();
  }, [selectedAgeDivisionRequest]);
  /**
   * If isDelete is true, filter out the item with the index that matches the index passed in,
   * otherwise add an empty object to the array.
   * @param {boolean} isDelete - boolean,
   * @param {number} index - number - the index of the item in the array
   * @param {AddEventRequest[]} item - AddEventRequest[] - this is the array of objects that I'm trying
   * to update
   * @param {any} setItem - any - this is the setter function for the array
   */
  const resetArray = (
    isDelete: boolean,
    index: number,
    item: AddEventRequest[],
    setItem: any,
  ) => {
    if (isDelete) {
      setItem(item.filter(itm => itm.index !== index));
      setRenderItem(false);
      setTimeout(() => {
        if (item.length > 1) {
          setRenderItem(true);
        }
      }, 1);
      createRequestBody();
    } else {
      setItem(oldArray => [...oldArray, {}]);
      scrollAtEnd();
    }
  };

  /**
   * Set all fields to inactive, then after 20 milliseconds, set all fields to active.
   */
  const refreshScreen = () => {
    setAllFiledActive(false);
    setTimeout(() => {
      setAllFiledActive(true);
    }, 20);
  };

  /**
   * ScrollAtEnd() is a function that scrolls to the end of the scrollview after 50 milliseconds.
   */
  const scrollAtEnd = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({animated: true});
    }, 50);
  };

  /**
   * If the user is not connected to the internet, then show an error message, otherwise, if the user
   * is not found, then call the addEditResultAPI function, otherwise, scroll to the end of the screen.
   */
  const onSaveClick = async () => {
    createRequestBody();

    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (isNotFoundError(awardItem, setRenderItem)) {
      addEditResultAPI();
    } else {
      scrollAtEnd();
    }
    refreshScreen();
  };

  /**
   * AddEditResultAPI is a function that calls addEditAwardRequest, which is an async function that
   * returns a promise, and if the promise is successful, it sets the state of screenRefresh to
   * REFESH_SCREEN.UPDATE_EVENT_DETAIL_AGE_DIVISIONS, and then after 500ms, it sets the state of loader
   * to false, and calls the toast function, and then calls the goBack function on the navigation
   * object.
   */
  const addEditResultAPI = async () => {
    setLoader(true);
    const recordAddedResponse = await addEditAwardRequest();
    if (recordAddedResponse.success) {
      setScreenRefresh(REFESH_SCREEN.UPDATE_EVENT_DETAIL_AGE_DIVISIONS);
      navigation.goBack();
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  /**
   * "If the contestant_id is undefined, set contestantEmptyError to true, otherwise set it to false.
   * If the contestant_id is not undefined and the award is undefined, set
   * descriptionTitleAwardValueError to true, otherwise set it to false. If the contestant_id is
   * undefined, set contestantDuplicateError to true, otherwise set it to false."
   *
   * I'm not sure what the purpose of the getOccurance function is, but I'm guessing it's to check if
   * the contestant_id is duplicated
   * @param {AddEventRequest[]} item - AddEventRequest[]
   * @param {any} openAccordionn - is a function that opens the accordion
   */
  const isNotFoundError = (item: AddEventRequest[], openAccordionn: any) => {
    for (const entry of item) {
      if (entry.contestant?.contestant_id === undefined) {
        entry.contestantEmptyError = true;
        openAccordionn(true);
        return false;
      } else {
        entry.contestantEmptyError = false;
        if (
          entry.contestant?.contestant_id !== undefined &&
          entry.award === undefined
        ) {
          entry.descriptionTitleAwardValueError = true;
          openAccordionn(true);
          return false;
        } else {
          entry.descriptionTitleAwardValueError = false;
        }
      }
      if (getOccurance(item, entry) > 1) {
        entry.contestantDuplicateError = true;
        entry.error =
          translations.THE_CONTESTANT_IS_ALREADY_SELECT_FOR_SAME_TITLE;
        openAccordionn(true);
        return false;
      } else {
        entry.error = undefined;
        entry.contestantDuplicateError = false;
      }
    }
    return true;
  };

  /**
   * This function takes an array of objects and returns the number of times a specific object appears
   * in the array.
   * @param {AddEventRequest[]} array - AddEventRequest[]
   * @param {AddEventRequest | undefined} award - AddEventRequest | undefined
   * @returns The number of times the award and contestant are in the array.
   */
  const getOccurance = (
    array: AddEventRequest[],
    award: AddEventRequest | undefined,
  ) => {
    let counter = 0;
    for (const entry of array) {
      if (
        entry.award?.id === award?.award?.id &&
        entry.contestant?.contestant_id === award?.contestant?.contestant_id
      ) {
        counter++;
      }
    }
    return counter;
  };

  /**
   * When the user clicks the confirm button, go back to the previous screen.
   */
  const onConfirmWarning = () => {
    navigation.goBack();
  };

  const onPressBack = () => {
    backButtonHandled();
    return true;
  };
  const backButtonHandled = () => {
    if (awardItem.length > 0) {
      setWarningModal(true);
    } else {
      navigation.goBack();
    }
  };
  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, [onPressBack]);
  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topContainer}>
        <Header
          lable={
            route.params.idEditResult !== undefined && route.params.idEditResult
              ? translations.EDIT_AWARD_WINNER
              : translations.ADD_AWARD_WINNER
          }
          isUnderLineRequired
          rightText={translations.SAVE}
          isSaveActive={
            (isAllFieldActive && awardItem.length > 0) ||
            (route.params.idEditResult !== undefined &&
              route.params.idEditResult)
          }
          onPressRightText={onSaveClick}
          onCustomPressBack={backButtonHandled}
        />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={styles.container}>
          {/* Age Division ***************************************************** START */}

          <View>
            <View style={styles.ageDivisionContainer}>
              <FloatingDropdown
                floatingText={translations.AGE_DEVISION}
                value={selectedAgeDivision?.name}
                isMandatory
                onFieldFocus={() => {
                  if (!isLoading) {
                    setAgeDivision(true);
                  }
                }}
              />
            </View>
            <CustomBottomModal
              isModalVisible={isAgeDivision}
              setIsModalVisible={setAgeDivision}
              preSelectedValue={selectedAgeDivision?.id}
              parentCallback={selectedText => {
                setSelectedAgeDivision(selectedText);
                setSelectedAgeDivisionRequest(selectedText.id);
                setAwardtems([]);
                setTimeout(() => {
                  resetOldrecord(selectedText.id, true);
                }, 300);
              }}
              data={
                ageDivisionList?.data === undefined ? [] : ageDivisionList?.data
              }
              heading={translations.AGE_DEVISION}
            />
            {/* Age Division ***************************************************** END */}
            {isAllFieldActive ? (
              <View>
                <OvelContainer
                  lable={translations.AWARD_WINNER}
                  conditionVar={renderItem}
                  isActive={isAllFieldActive}
                  onPress={() => {
                    resetAllTab();
                    if (awardItem.length === 0) {
                      resetArray(false, 0, awardItem, setAwardtems);
                    }
                    setRenderItem(!renderItem);
                  }}
                />
                {renderItem &&
                  awardItem.map((i, index) => {
                    return (
                      <EventAddResultItem
                        index={index}
                        resultType={0}
                        eventId={route.params.eventId}
                        items={awardItem}
                        isAward={true}
                        udpateRequestBundle={createRequestBody}
                        itemsaward={availableAwardItems}
                        ageDivisionId={selectedAgeDivision?.id}
                        isDisplayAddMore={awardItem.length - 1 === index}
                        onAddMoreClick={(
                          isDelete: boolean,
                          position: number,
                        ) => {
                          resetArray(
                            isDelete,
                            position,
                            awardItem,
                            setAwardtems,
                          );
                        }}
                      />
                    );
                  })}
              </View>
            ) : null}
            <WarningModel
              msg={translations.THE_ADDED_AWARD_WILL_NOT_BE_SAVED}
              isModalVisible={isWarmingModelVisible}
              setConfirm={onConfirmWarning}
              setIsModalVisible={setWarningModal}
              headingStyle={styles.modalHeading}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EventAddEditAward;
