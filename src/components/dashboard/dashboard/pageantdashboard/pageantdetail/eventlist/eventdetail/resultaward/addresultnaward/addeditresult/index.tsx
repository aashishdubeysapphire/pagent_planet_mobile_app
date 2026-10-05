import {View, ScrollView, BackHandler} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Header from '../../../../../../../../../common/header';
import translations from '../../../../../../../../../../assets/translations';
import {styles} from './styles';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {
  ADD_EVENT_RESULTS,
  GET_AGE_DIVISION_BY_EVENTS,
  GET_EVENT_RESULT_LIST,
} from '../../../../../../../../../../services/endpoints';
import {
  DESCRIPTION,
  REFESH_SCREEN,
} from '../../../../../../../../../utils/enum';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../../store/useAppStore';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../../common/commonalert';
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
import {AddEventResultRequest} from '../../../../../../../../../../services/models/event/addEventResultRequest';
import {useNavigation} from '@react-navigation/core';
import {Contestant} from '../../../../../../../../../../services/models/pageantdetails/contestant';
import WarningModel from '../../../../../../../../../common/warningmodel';
import OpenChildAnimation from '../../../../../../../../../common/openchildanimation';

const EventAddEditResult = ({route}) => {
  const scrollRef = useRef();
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const [isAgeDivision, setAgeDivision] = useState(false);
  const [selectedAgeDivision, setSelectedAgeDivision] = useState<AgeDivision>();
  const navigation = useNavigation();
  const [isAllFieldActive, setAllFiledActive] = useState(
    route.params.idEditResult,
  );
  const [selectedAgeDivisionRequest, setSelectedAgeDivisionRequest] = useState(
    route.params.ageDivisionId,
  );
  const [renderWinnerItem, setRenderWinnerItem] = useState(false);
  const [render1stRunnerUpItem, setRender1stRunnerUItem] = useState(false);
  const [render2ndRunnerUpItem, setRender2ndRunnerUpItem] = useState(false);
  const [render3rdRunnerUpItem, setRender3rdRunnerUpItem] = useState(false);
  const [render4rdRunnerUprItem, setRender4rdRunnerUprItem] = useState(false);
  const [isDescriptionAppointedAdded, setDescriptionAppointedAdded] =
    useState(false);
  const [winnerItem, setWinnerItem] = useState<AddEventRequest[]>([]);
  const [isWarmingModelVisible, setWarningModal] = useState(false);
  const [addEditResultRequestBody, setAddEditResultRequestBody] =
    useState<AddEventResultRequest>();
  const [firstRunnerUpItem, setFirstRunnerUpItem] = useState<AddEventRequest[]>(
    [],
  );
  const [secondRunnerUpItem, setSecondRunnerUpItem] = useState<
    AddEventRequest[]
  >([]);
  const [thirdRunnerUpItem, setThirdRunnerUpItem] = useState<AddEventRequest[]>(
    [],
  );
  const [fourRunnerUpItem, setFourRunnerUpItem] = useState<AddEventRequest[]>(
    [],
  );

  const setScreenRefresh = useSetScreenRefresh();

  //API Age Division ----------------------------------------- START
  const {data: ageDivisionList, isLoading} = useHtQuery<AgeDivision[]>({
    key: GET_AGE_DIVISION_BY_EVENTS + `${route.params.eventId}`,
    method: MethodTypes.GET,
    url: GET_AGE_DIVISION_BY_EVENTS + `${route.params.eventId}`,
    offSuccessToast: true,
  });
  //API Age Division  ----------------------------------------- END

  //API GET_MASTER_DATA ----------------------------------------- START
  const {mutateAsync: getOldResult} = useCgMutation<
    Base<AddEventResultRequest>
  >({
    key:
      GET_EVENT_RESULT_LIST +
      Param.EVENT_ID +
      +`${route.params.eventId}` +
      Param.AGE_DIVISION_ID +
      selectedAgeDivisionRequest,
    url:
      GET_EVENT_RESULT_LIST +
      Param.EVENT_ID +
      +`${route.params.eventId}` +
      Param.AGE_DIVISION_ID +
      selectedAgeDivisionRequest,
    offSuccessToast: true,
    disableLoader: true,
    method: MethodTypes.GET,
  });
  //API GET_MASTER_DATA ----------------------------------------- END

  /**
   * If the descriptionId is equal to the TITLE_AWARDED constant, then add the
   * descriptionTitleAwardValue to the resultsList, otherwise just add the descriptionId.
   * @param {AddEventRequest[]} item - AddEventRequest[]
   * @returns An array of objects.
   */
  const getResultAward = (item: AddEventRequest[]) => {
    const resultsList: Contestant[] = [];
    for (let index = 0; index < item.length; index++) {
      if (item[index].descriptionId === DESCRIPTION.TITLE_AWARDED) {
        resultsList.push({
          contestant_id: item[index].contestant?.contestant_id,
          additional_title: item[index].descriptionId + '',
          title_awarded_text: item[index].descriptionTitleAwardValue,
        });
      } else {
        resultsList.push({
          contestant_id: item[index].contestant?.contestant_id,
          additional_title: item[index].descriptionId + '',
        });
      }
    }
    return resultsList;
  };

  /* A mutation request to add/edit the result of an event. */
  const {mutateAsync: addEditResultRequest} = useCgMutation<Base>({
    key: ADD_EVENT_RESULTS,
    body: addEditResultRequestBody,
    url: ADD_EVENT_RESULTS,
    disableLoader: true,
  });

  /* A react hook. It is called when the component is mounted. */
  useEffect(() => {
    keyBoardManager();
    createRequestBody();
  }, []);

  /**
   * "If the oldRecord is not undefined and has a length greater than 0, then for each entry in the
   * oldRecord, set the oldArray to the oldArray with the entry added to it."
   *
   * I'm not sure what the setter is doing, but I'm guessing it's setting the oldArray to the oldArray
   * with the entry added to it
   * @param {Contestant[] | undefined} oldRecord - Contestant[] | undefined
   * @param {any} setter - any =&gt; this is the setter function for the state
   */
  const resetOldrecord = (oldRecord: Contestant[] | undefined, setter: any) => {
    if (oldRecord !== undefined && oldRecord.length > 0) {
      for (const entry of oldRecord) {
        setter(oldArray => [
          ...oldArray,
          {
            contestant: {
              contestant_id: entry.contestant_id,
              name: entry.contestant_name,
            },
            descriptionId: Number(entry.additional_title),
            descriptionTitleAwardValue: entry.title_awarded_text,
          },
        ]);
      }
    }
  };

  const resetItemList = () => {
    setWinnerItem([]);
    setFirstRunnerUpItem([]);
    setSecondRunnerUpItem([]);
    setThirdRunnerUpItem([]);
    setFourRunnerUpItem([]);
    winnerItem.pop();
    firstRunnerUpItem.pop();
    secondRunnerUpItem.pop();
    thirdRunnerUpItem.pop();
    fourRunnerUpItem.pop();
  };

  const onAgeDivisionUpdate = (
    ageDivisionId: string,
    displayLoader: boolean,
  ) => {
    setSelectedAgeDivisionRequest(ageDivisionId);
    resetItemList();
    createRequestBody();
    setTimeout(() => {
      getOldrecord(ageDivisionId, displayLoader);
    }, 600);
  };

  const getOldrecord = async (
    ageDivisionId: string,
    displayLoader: boolean,
  ) => {
    setSelectedAgeDivisionRequest(ageDivisionId);

    if (displayLoader) {
      setLoader(true);
    }
    resetItemList();
    const addedResponse = await getOldResult();
    resetItemList();
    setLoader(false);

    if (addedResponse.success) {
      if (
        addedResponse?.data?.winners !== undefined &&
        addedResponse?.data?.winners?.length > 0
      ) {
        var count = 0;
        addedResponse?.data?.winners.forEach(elementOption => {
          if (
            Number(elementOption.additional_title) === DESCRIPTION.APPOINTED
          ) {
            count = count + 1;
          }
        });
        setDescriptionAppointedAdded(count > 0);
        resetOldrecord(addedResponse?.data?.winners, setWinnerItem);
      }

      if (
        addedResponse?.data?.firstRunnerUps !== undefined &&
        addedResponse?.data?.firstRunnerUps?.length > 0
      ) {
        resetOldrecord(
          addedResponse?.data?.firstRunnerUps,
          setFirstRunnerUpItem,
        );
      }

      if (
        addedResponse?.data?.secondRunnerUps !== undefined &&
        addedResponse?.data?.secondRunnerUps?.length > 0
      ) {
        resetOldrecord(
          addedResponse?.data?.secondRunnerUps,
          setSecondRunnerUpItem,
        );
      }

      if (
        addedResponse?.data?.thirdRunnerUps !== undefined &&
        addedResponse?.data?.thirdRunnerUps?.length > 0
      ) {
        resetOldrecord(
          addedResponse?.data?.thirdRunnerUps,
          setThirdRunnerUpItem,
        );
      }
      if (
        addedResponse?.data?.fourthRunnerUps !== undefined &&
        addedResponse?.data?.fourthRunnerUps?.length > 0
      ) {
        resetOldrecord(
          addedResponse?.data?.fourthRunnerUps,
          setFourRunnerUpItem,
        );
      }
      setTimeout(() => {
        if (
          addedResponse?.data?.winners !== undefined &&
          addedResponse?.data?.winners?.length > 0
        ) {
          setRenderWinnerItem(true);
        } else if (
          addedResponse?.data?.firstRunnerUps !== undefined &&
          addedResponse?.data?.firstRunnerUps?.length > 0
        ) {
          setRender1stRunnerUItem(true);
        } else if (
          addedResponse?.data?.secondRunnerUps !== undefined &&
          addedResponse?.data?.secondRunnerUps?.length > 0
        ) {
          setRender2ndRunnerUpItem(true);
        } else if (
          addedResponse?.data?.thirdRunnerUps !== undefined &&
          addedResponse?.data?.thirdRunnerUps?.length > 0
        ) {
          setRender3rdRunnerUpItem(true);
        } else if (
          addedResponse?.data?.fourthRunnerUps !== undefined &&
          addedResponse?.data?.fourthRunnerUps?.length > 0
        ) {
          setRender4rdRunnerUprItem(true);
        } else {
          setTimeout(() => {
            resetArray(
              false,
              0,
              winnerItem,
              setWinnerItem,
              setRenderWinnerItem,
            );
            setRenderWinnerItem(true);
          }, 200);
        }

        createRequestBody();
      }, 1000);
    }
    createRequestBody();
  };

  useEffect(() => {
    createRequestBody();
  }, [winnerItem]);
  useEffect(() => {
    createRequestBody();
  }, [firstRunnerUpItem]);
  useEffect(() => {
    createRequestBody();
  }, [secondRunnerUpItem]);
  useEffect(() => {
    createRequestBody();
  }, [thirdRunnerUpItem]);
  useEffect(() => {
    createRequestBody();
  }, [fourRunnerUpItem]);

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
          setSelectedAgeDivisionRequest(route.params.ageDivisionId);
          setSelectedAgeDivision(ageDivisionList?.data[index]);
          setAllFiledActive(true);
        }
      }
      setTimeout(() => {
        onAgeDivisionUpdate(route.params.ageDivisionId, false);
      }, 200);
    }
  }, [isLoading]);

  /**
   * When the user clicks on a tab, reset all the other tabs to false.
   */
  const resetAllTab = () => {
    setRenderWinnerItem(false);
    setRender1stRunnerUItem(false);
    setRender2ndRunnerUpItem(false);
    setRender3rdRunnerUpItem(false);
    setRender4rdRunnerUprItem(false);
  };

  /**
   * If isDelete is true, filter the item array by index and set the item array to the filtered array.
   * If isDelete is false, set the item array to the old array with an empty object appended to it.
   * @param {boolean} isDelete - boolean,
   * @param {number} index - number,
   * @param {AddEventRequest[]} item - AddEventRequest[] - this is the array of objects that I'm trying
   * to update
   * @param {any} setItem - is the setter function for the array
   * @param {any} setter - is the setter function for the state variable that holds the array of
   * objects.
   */
  const resetArray = (
    isDelete: boolean,
    index: number,
    item: AddEventRequest[],
    setItem: any,
    setter: any,
  ) => {
    if (isDelete) {
      if (item[index]?.descriptionId === DESCRIPTION.APPOINTED) {
        setDescriptionAppointedAdded(false);
      }
      setItem(item.filter(i => i.index !== index));
      if (item.length === 1) {
        setter(false);
      } else {
        tabRender(setter);
      }
      //
    } else {
      setItem(oldArray => [...oldArray, {}]);
    }
    scrollAtEnd();
    createRequestBody();
  };

  /**
   * It takes a boolean setter function as an argument, sets the boolean to false, then sets it to true
   * after 20 milliseconds.
   * @param {any} setter - This is the setter function that you pass to the useState hook.
   */
  const tabRender = (setter: any) => {
    setter(false);
    setTimeout(() => {
      setter(true);
    }, 20);
  };

  /**
   * Set all fields to inactive, then after 50 milliseconds, set all fields to active.
   */
  const refreshScreen = () => {
    setAllFiledActive(false);
    setTimeout(() => {
      setAllFiledActive(true);
    }, 50);
  };

  /**
   * If the scrollRef is not null, then scroll to the end of the scrollRef.
   */
  const scrollAtEnd = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({animated: true});
    }, 50);
  };

  /**
   * If there are no errors, then call the addEditResultAPI function, otherwise scroll to the end of
   * the page.
   */
  const onSaveClick = async () => {
    createRequestBody();
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (
      isFoundError(winnerItem, setRenderWinnerItem) &&
      isFoundError(firstRunnerUpItem, setRender1stRunnerUItem) &&
      isFoundError(secondRunnerUpItem, setRender2ndRunnerUpItem) &&
      isFoundError(thirdRunnerUpItem, setRender3rdRunnerUpItem) &&
      isFoundError(fourRunnerUpItem, setRender4rdRunnerUprItem) &&
      isContestantMoreThenOne()
    ) {
      addEditResultAPI();
    } else {
      scrollAtEnd();
    }
    refreshScreen();
  };
  const dynamicEntryValidation = entry => {
    entry.contestantDuplicateError = true;
    entry.error =
      translations.YOU_CAN_NOT_SLECT_A_CONTESTANT_FOR_MULTIPLE_POSTIONS;
    setRenderWinnerItem(true);
    return false;
  };
  /**
   * If the contestant is selected for more than one position, then return false.
   */
  const isContestantMoreThenOne = () => {
    for (const entry of winnerItem) {
      if (
        getOccurance(firstRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else if (
        getOccurance(secondRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else if (
        getOccurance(thirdRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else if (
        getOccurance(fourRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else {
        entry.contestantDuplicateError = false;
        entry.error = undefined;
      }
    }

    for (const entry of firstRunnerUpItem) {
      if (
        getOccurance(secondRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else if (
        getOccurance(thirdRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else if (
        getOccurance(fourRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else {
        entry.contestantDuplicateError = false;
        entry.error = undefined;
      }
    }
    for (const entry of secondRunnerUpItem) {
      if (
        getOccurance(thirdRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else if (
        getOccurance(fourRunnerUpItem, entry.contestant?.contestant_id) > 0
      ) {
        return dynamicEntryValidation(entry);
      } else {
        entry.contestantDuplicateError = false;
        entry.error = undefined;
      }
    }
    for (const entry of thirdRunnerUpItem) {
      if (getOccurance(fourRunnerUpItem, entry.contestant?.contestant_id) > 0) {
        return dynamicEntryValidation(entry);
      } else {
        entry.contestantDuplicateError = false;
        entry.error = undefined;
      }
    }
    return true;
  };

  const addEditResultAPI = async () => {
    setLoader(true);
    const recordAddedResponse = await addEditResultRequest();
    if (recordAddedResponse.success) {
      setScreenRefresh(REFESH_SCREEN.UPDATE_EVENT_DETAIL_AGE_DIVISIONS);
      navigation.goBack();
    }
    setLoader(false);
  };

  /**
   * The function isFoundError takes an array of AddEventRequest objects and a function as parameters
   * and returns a boolean value.
   */
  const isFoundError = (item: AddEventRequest[], openAccordionn: any) => {
    const isDataFilled = true;
    for (const entry of item) {
      if (
        (entry.descriptionId === DESCRIPTION.TITLE_AWARDED &&
          entry.descriptionTitleAwardValue?.length === undefined) ||
        (entry.descriptionId === DESCRIPTION.TITLE_AWARDED &&
          entry.descriptionTitleAwardValue?.length === 0)
      ) {
        entry.descriptionTitleAwardValueError = true;
        openAccordionn(true);
        return false;
      } else {
        entry.descriptionTitleAwardValueError = false;
      }
      if (getOccurance(item, entry.contestant?.contestant_id) > 1) {
        entry.contestantDuplicateError = true;
        entry.error =
          translations.YOU_CAN_NOT_SLECT_A_CONTESTANT_FOR_MULTIPLE_POSTIONS;
        openAccordionn(true);
        return false;
      } else {
        entry.contestantDuplicateError = false;
        entry.error = undefined;
      }
    }
    return isDataFilled;
  };

  const createRequestBody = () => {
    setAddEditResultRequestBody({
      event_id: route.params.eventId,
      age_division_id: selectedAgeDivision?.id,
      winners: getResultAward(winnerItem),
      firstRunnerUps: getResultAward(firstRunnerUpItem),
      secondRunnerUps: getResultAward(secondRunnerUpItem),
      thirdRunnerUps: getResultAward(thirdRunnerUpItem),
      fourthRunnerUps: getResultAward(fourRunnerUpItem),
    });
  };

  const isDescriptionAppointedAded = () => {
    var count = 0;
    winnerItem.forEach(elementOption => {
      if (elementOption?.descriptionId === DESCRIPTION.APPOINTED) {
        count = count + 1;
      }
    });
    setDescriptionAppointedAdded(count > 0);
  };

  /**
   * It takes an array of objects and a number and returns the number of times the number is found in the
   * array.
   * @param {AddEventRequest[]} array - AddEventRequest[]
   * @param {number | undefined} contestantId - number | undefined
   * @returns the number of times a contestant appears in the array.
   */
  const getOccurance = (
    array: AddEventRequest[],
    contestantId: number | undefined,
  ) => {
    let counter = 0;
    if (contestantId !== undefined) {
      for (const entry of array) {
        if (entry.contestant?.contestant_id === contestantId) {
          counter++;
        }
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

  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, [onPressBack]);

  const backButtonHandled = () => {
    if (
      winnerItem.length > 0 ||
      firstRunnerUpItem.length > 0 ||
      secondRunnerUpItem.length > 0 ||
      thirdRunnerUpItem.length > 0 ||
      fourRunnerUpItem.length > 0
    ) {
      setWarningModal(true);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topContainer}>
        <Header
          lable={
            route.params.idEditResult !== undefined && route.params.idEditResult
              ? translations.EDIT_RESULT
              : translations.ADD_RESULT
          }
          isUnderLineRequired
          rightText={translations.SAVE}
          isSaveActive={
            (isAllFieldActive && winnerItem.length > 0) ||
            (isAllFieldActive && firstRunnerUpItem.length > 0) ||
            (isAllFieldActive && secondRunnerUpItem.length > 0) ||
            (isAllFieldActive && thirdRunnerUpItem.length > 0) ||
            (isAllFieldActive && fourRunnerUpItem.length > 0) ||
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

          <View style={styles.itemRootContainer}>
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
            data={
              ageDivisionList?.data === undefined ? [] : ageDivisionList?.data
            }
            preSelectedValue={selectedAgeDivision?.id}
            parentCallback={selectedText => {
              setSelectedAgeDivision(selectedText);
              setSelectedAgeDivisionRequest(selectedText.id);
              resetAllTab();
              onAgeDivisionUpdate(selectedText?.id + '', true);
              setTimeout(() => {
                isDescriptionAppointedAded();
              }, 1000);
            }}
            heading={translations.AGE_DEVISION}
          />
          {/* Age Division ***************************************************** END */}

          {isAllFieldActive && (
            <View>
              <OvelContainer
                lable={translations.ADD_WINNNER}
                conditionVar={renderWinnerItem}
                isActive={isAllFieldActive}
                clickable
                onPress={() => {
                  if (isAllFieldActive) {
                    resetAllTab();
                    if (winnerItem.length === 0) {
                      resetArray(
                        false,
                        0,
                        winnerItem,
                        setWinnerItem,
                        setRenderWinnerItem,
                      );
                    }
                    setRenderWinnerItem(!renderWinnerItem);
                  } else {
                    toast(
                      translations.PELASE_SELECT_A_AGE_DIVISION,
                      toastType.ERROR_TOAST,
                    );
                  }
                }}
              />
              <OpenChildAnimation
                isVisible={winnerItem.length > 0}
                child={
                  <>
                    {renderWinnerItem &&
                      winnerItem.map((i, index) => {
                        return (
                          <EventAddResultItem
                            index={index}
                            eventId={route.params.eventId}
                            items={winnerItem}
                            isWinner={true}
                            isDescriptionAppointed={isDescriptionAppointedAdded}
                            setRenderWinnerItem={setRenderWinnerItem}
                            udpateRequestBundle={createRequestBody}
                            isDescriptionAppointedAded={
                              isDescriptionAppointedAded
                            }
                            ageDivisionId={selectedAgeDivision?.id}
                            isDisplayAddMore={winnerItem.length - 1 === index}
                            onAddMoreClick={(
                              isDelete: boolean,
                              position: number,
                            ) => {
                              resetArray(
                                isDelete,
                                position,
                                winnerItem,
                                setWinnerItem,
                                setRenderWinnerItem,
                              );
                            }}
                          />
                        );
                      })}
                  </>
                }
              />
              <OvelContainer
                lable={translations.ADD_1ST_RUNNER_UP}
                conditionVar={render1stRunnerUpItem}
                isActive={isAllFieldActive}
                clickable
                onPress={() => {
                  if (isAllFieldActive) {
                    resetAllTab();
                    if (firstRunnerUpItem.length === 0) {
                      resetArray(
                        false,
                        0,
                        firstRunnerUpItem,
                        setFirstRunnerUpItem,
                        setRender1stRunnerUItem,
                      );
                    }
                    setRender1stRunnerUItem(!render1stRunnerUpItem);
                  } else {
                    toast(
                      translations.PELASE_SELECT_A_AGE_DIVISION,
                      toastType.ERROR_TOAST,
                    );
                  }
                }}
              />
              <OpenChildAnimation
                isVisible={firstRunnerUpItem.length > 0}
                child={
                  <>
                    {render1stRunnerUpItem &&
                      firstRunnerUpItem.map((i, index) => {
                        return (
                          <EventAddResultItem
                            index={index}
                            eventId={route.params.eventId}
                            items={firstRunnerUpItem}
                            udpateRequestBundle={createRequestBody}
                            ageDivisionId={selectedAgeDivision?.id}
                            isDisplayAddMore={
                              firstRunnerUpItem.length - 1 === index
                            }
                            onAddMoreClick={(
                              isDelete: boolean,
                              postiion: number,
                            ) => {
                              resetArray(
                                isDelete,
                                postiion,
                                firstRunnerUpItem,
                                setFirstRunnerUpItem,
                                setRender1stRunnerUItem,
                              );
                            }}
                          />
                        );
                      })}
                  </>
                }
              />
              <OvelContainer
                lable={translations.ADD_2ND_RUNNER_UP}
                conditionVar={render2ndRunnerUpItem}
                isActive={isAllFieldActive}
                clickable
                onPress={() => {
                  if (isAllFieldActive) {
                    resetAllTab();
                    if (secondRunnerUpItem.length === 0) {
                      resetArray(
                        false,
                        0,
                        firstRunnerUpItem,
                        setSecondRunnerUpItem,
                        setRender2ndRunnerUpItem,
                      );
                    }
                    setRender2ndRunnerUpItem(!render2ndRunnerUpItem);
                  } else {
                    toast(
                      translations.PELASE_SELECT_A_AGE_DIVISION,
                      toastType.ERROR_TOAST,
                    );
                  }
                }}
              />
              <OpenChildAnimation
                isVisible={secondRunnerUpItem.length > 0}
                child={
                  <>
                    {render2ndRunnerUpItem &&
                      secondRunnerUpItem.map((i, index) => {
                        return (
                          <EventAddResultItem
                            index={index}
                            ageDivisionId={selectedAgeDivision?.id}
                            items={secondRunnerUpItem}
                            eventId={route.params.eventId}
                            udpateRequestBundle={createRequestBody}
                            isDisplayAddMore={
                              secondRunnerUpItem.length - 1 === index
                            }
                            onAddMoreClick={(
                              isDelete: boolean,
                              position: number,
                            ) => {
                              resetArray(
                                isDelete,
                                position,
                                firstRunnerUpItem,
                                setSecondRunnerUpItem,
                                setRender2ndRunnerUpItem,
                              );
                            }}
                          />
                        );
                      })}
                  </>
                }
              />
              <OvelContainer
                lable={translations.ADD_3RD_RUNNER_UP}
                conditionVar={render3rdRunnerUpItem}
                isActive={isAllFieldActive}
                clickable
                onPress={() => {
                  if (isAllFieldActive) {
                    resetAllTab();
                    if (thirdRunnerUpItem.length === 0) {
                      resetArray(
                        false,
                        0,
                        thirdRunnerUpItem,
                        setThirdRunnerUpItem,
                        setRender3rdRunnerUpItem,
                      );
                    }

                    setRender3rdRunnerUpItem(!render3rdRunnerUpItem);
                  } else {
                    toast(
                      translations.PELASE_SELECT_A_AGE_DIVISION,
                      toastType.ERROR_TOAST,
                    );
                  }
                }}
              />
              <OpenChildAnimation
                isVisible={thirdRunnerUpItem.length > 0}
                child={
                  <>
                    {render3rdRunnerUpItem &&
                      thirdRunnerUpItem.map((i, index) => {
                        return (
                          <EventAddResultItem
                            index={index}
                            ageDivisionId={selectedAgeDivision?.id}
                            eventId={route.params.eventId}
                            items={thirdRunnerUpItem}
                            udpateRequestBundle={createRequestBody}
                            isDisplayAddMore={
                              thirdRunnerUpItem.length - 1 === index
                            }
                            onAddMoreClick={(
                              isDelete: boolean,
                              position: number,
                            ) => {
                              resetArray(
                                isDelete,
                                position,
                                thirdRunnerUpItem,
                                setThirdRunnerUpItem,
                                setRender3rdRunnerUpItem,
                              );
                            }}
                          />
                        );
                      })}
                  </>
                }
              />
              <OvelContainer
                lable={translations.ADD_4TH_RUNNER_UP}
                conditionVar={render4rdRunnerUprItem}
                isActive={isAllFieldActive}
                clickable
                onPress={() => {
                  if (isAllFieldActive) {
                    resetAllTab();
                    if (fourRunnerUpItem.length === 0) {
                      resetArray(
                        false,
                        0,
                        fourRunnerUpItem,
                        setFourRunnerUpItem,
                        setRender4rdRunnerUprItem,
                      );
                    }

                    setRender4rdRunnerUprItem(!render4rdRunnerUprItem);
                  } else {
                    toast(
                      translations.PELASE_SELECT_A_AGE_DIVISION,
                      toastType.ERROR_TOAST,
                    );
                  }
                }}
              />
              <OpenChildAnimation
                isVisible={fourRunnerUpItem.length > 0}
                child={
                  <>
                    {render4rdRunnerUprItem &&
                      fourRunnerUpItem.map((i, index) => {
                        return (
                          <EventAddResultItem
                            index={index}
                            ageDivisionId={selectedAgeDivision?.id}
                            eventId={route.params.eventId}
                            items={fourRunnerUpItem}
                            udpateRequestBundle={createRequestBody}
                            isDisplayAddMore={
                              fourRunnerUpItem.length - 1 === index
                            }
                            onAddMoreClick={(
                              isDelete: boolean,
                              postion: number,
                            ) => {
                              resetArray(
                                isDelete,
                                postion,
                                fourRunnerUpItem,
                                setFourRunnerUpItem,
                                setRender4rdRunnerUprItem,
                              );
                            }}
                          />
                        );
                      })}
                  </>
                }
              />
            </View>
          )}
          <WarningModel
            msg={translations.THE_ADDED_RESULT_WILL_NOT_BE_NOT_SAVED}
            isModalVisible={isWarmingModelVisible}
            setConfirm={onConfirmWarning}
            setIsModalVisible={setWarningModal}
            headingStyle={styles.modalHeading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EventAddEditResult;
