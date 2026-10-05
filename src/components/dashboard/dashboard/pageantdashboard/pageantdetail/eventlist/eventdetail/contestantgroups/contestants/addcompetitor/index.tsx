import {View, TouchableOpacity, Keyboard, ScrollView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../../../../../../common/header';
import translations from '../../../../../../../../../../assets/translations';
import {styles} from './styles';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {
  ADD_EVENT_COMPETITOTR,
  GET_AGE_DEVISION_BY_PAGEANT,
  DELETE_EVENT_CONTESTANT,
} from '../../../../../../../../../../services/endpoints';

import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../../store/useAppStore';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../../common/commonalert';
import {
  createFormData,
  keyBoardManager,
} from '../../../../../../../../../utils/helperFunction';
import {useNetInfo} from '@react-native-community/netinfo';
import {Base} from '../../../../../../../../../../services/models/base';
import {
  MethodTypes,
  Param,
} from '../../../../../../../../../../services/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import useHtQuery from '../../../../../../../../../../services/api/useHtQuery';
import FloatingDropdown from '../../../../../../../../../common/floatingdropown';
import CustomBottomModal from '../../../../../../../../../common/custombottommodal';
import {useNavigation} from '@react-navigation/native';
import {AgeDivision} from '../../../../../../../../../../services/models/pageantdetails/ageDivision';
import FloatingInput from '../../../../../../../../../common/floatinginput';
import HeadShotImage from '../../../../../../../../../common/headshotimage';
import {
  checkMinLength,
  removeEmojis,
} from '../../../../../../../../../utils/validations';
import {moderateScaleVertical} from '../../../../../../../../../utils/responsiveSize';
import CompetitorListModal from './components/competitorlistmodal';
import TagsChip from '../../../../../../../../../common/tagchip';
import {Tag} from '../../../../../../../../../../services/models/gallery/tag';
import {Contestant} from '../../../../../../../../../../services/models/pageantdetails/contestant';
import {LocalImage} from '../../../../../../../../../../services/models/localimage';
import WarningModel from '../../../../../../../../../common/warningmodel';
import {REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import {TagData} from '../../../../../../../../../../services/models/gallery/tagsData';
import {AddEventCompetitorRequest} from '../../../../../../../../../../services/models/event/AddEventCompetitorRequest';

const EventAddEditConstestant = ({route}) => {
  const setLoader = useSetLoader();
  const [isCompetitorListModalVisible, setCompetitorListModalVisible] =
    useState(false);
  const setScreenRefresh = useSetScreenRefresh();
  const netInfo = useNetInfo();
  const [isAgeDivision, setAgeDivision] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(true);
  const [isNewCompetitorModeActive, setAddNewCompetitor] = useState(false);
  const [selectedAgeDivision, setSelectedAgeDivision] = useState<AgeDivision>();
  const [competitor, setCompetitor] = useState<Contestant | undefined>();
  const [deleteCompetitorID, setDeleteCompetitorID] = useState(-1);
  const [titleOfCompetitor, setTitleOfCompetitor] = useState('');
  const [isAllFieldActive, setAllFiledActive] = useState(false);
  const [newCompetitorFirstName, setNewCompetitorFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [nameOfTheCompetitorError, setNameOfTheCompetitorError] = useState('');
  const [lastNameRef, setLastNameRef] = useState('');
  const [newCompetitorLastName, setNewCompetitorLastName] = useState('');
  const [titleOfCompetitorRef, setTitleOfCompetitorRef] = useState('');
  const [imageData, setImageData] = useState<LocalImage>();
  const [formData, setFormData] = useState<FormData>();
  const [isHeadShotAvaialble, setHeadShotAvaialble] = useState(false);
  const [totalAddedCompitorCounter, setTotalAddedCompitorCounter] = useState(0);
  const navigation = useNavigation();
  const [imageTagList, setImageTagList] = useState<TagData[]>([]);
  const [addeddCompetitorList, setAddeddCompetitorListe] = useState<Tag[]>([]);
  const [isWarmingModelVisible, setWarningModal] = useState(false);
  const [isContestantWarmingModelVisible, setContestantWarmingModelVisible] =
    useState(false);

  //API Age Division ----------------------------------------- START
  const {data: ageDivisionList, isLoading} = useHtQuery<AgeDivision[]>({
    key:
      GET_AGE_DEVISION_BY_PAGEANT + Param.PAGAENT_ID + `${route.params.eventId}`,
    url:
      GET_AGE_DEVISION_BY_PAGEANT + Param.PAGAENT_ID + `${route.params.eventId}`,
    offSuccessToast: true,
  });
  //API Age Division  ----------------------------------------- END

  //API DELETE EVENT CONTESTANT----------------------------------------- START
  const {mutateAsync: removeContestant} = useCgMutation<Base>({
    key: DELETE_EVENT_CONTESTANT,
    url:
      DELETE_EVENT_CONTESTANT +
      Param.EVENT_ID +
      `${route.params.eventId}` +
      Param.CONTESTANT_PARAM +
      deleteCompetitorID +
      Param.AGE_DIVISION_ID +
      selectedAgeDivision?.id,
    method: MethodTypes.GET,
  });
  //API DELETE EVENT CONTESTANT----------------------------------------- END

  /* Using the useCgMutation hook to make a request to the server. */
  const {mutateAsync: addCompetitorRequest} = useCgMutation<
    Base<AddEventCompetitorRequest>
  >({
    key: ADD_EVENT_COMPETITOTR,
    url: ADD_EVENT_COMPETITOTR,
    body: formData,
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
  });

  /* Calling the keyBoardManager function when the component is mounted. */
  useEffect(() => {
    keyBoardManager();
  }, []);

  useEffect(() => {
    createRequest(undefined);
  }, [imageData]);

  /* Checking if the modal is visible and if it is not visible, it is creating a request. */
  useEffect(() => {
    if (!isCompetitorListModalVisible) {
      createRequest(undefined);
    }
  }, [isCompetitorListModalVisible]);

  /* Checking if the isLoading is false and if the ageDivisionList.data is not undefined and if the
route.params.ageDivisionId is not undefined. If all of these are true then it will check if the
ageDivisionList.data.length is equal to 1. If it is equal to 1 then it will set the
selectedAgeDivision to ageDivisionList.data[0] and setAllFiledActive to true and call the
createRequest function. If the ageDivisionList.data.length is not equal to 1 then it will loop */
  useEffect(() => {
    setLoader(isLoading);
  

    if (
      !isLoading &&
      ageDivisionList?.data !== undefined
      //  &&
      // route.params.ageDivisionId !== undefined
    ) {
      if (ageDivisionList?.data?.length === 1) {
        setSelectedAgeDivision(ageDivisionList?.data[0]);
        setAllFiledActive(true);
        createRequest(undefined);
      } else {
        if (route.params.ageDivisionId !== undefined) {
          for (let index = 0; index < ageDivisionList?.data?.length; index++) {
            if (
              ageDivisionList?.data[index].id + '' ===
              route.params.ageDivisionId
            ) {
              setSelectedAgeDivision(ageDivisionList?.data[index]);
              setAllFiledActive(true);
              createRequest(undefined);
            }
          }
        }
      }
    }
  }, [isLoading]);

  // isFetching;
  /**
   * If the user is connected to the internet, and the new competitor mode is active, and the new
   * competitor field is valid, and the selected age division is not undefined, then add the competitor.
   * Otherwise, add the competitor.
   * @returns a boolean value.
   */
  const addCompetitor = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (totalAddedCompitorCounter < 26) {
      createRequest(undefined);

      if (
        (isNewCompetitorModeActive && isNewCompetitorFeildValid()) ||
        isCompetitorFeildValid()
      ) {
        addCompetitorAPI();
      }
    } else {
      toast(
        selectedAgeDivision === undefined
          ? translations.PELASE_SELECT_A_AGE_DIVISION
          : translations.YOU_CAN_NOT_ADD_MORE_THEN_25_CONTESTANT,
        toastType.SUCESS_TOAST,
      );
    }
  };

  /**
   * If isNewCompetitorModeActive is true, then set the request body to the new competitor's
   * information, otherwise set the request body to the existing competitor's information.
   */
  const createRequest = (data: LocalImage | undefined) => {
    if (isNewCompetitorModeActive) {
      setFormData(
        createFormData({
          pageant_id: route.params.eventId,
          age_division_id: selectedAgeDivision?.id,
          contestant_title: titleOfCompetitor.trim(),
          first_name: newCompetitorFirstName.trim(),
          last_name: newCompetitorLastName.trim(),
          contestant_image: imageData !== undefined ? imageData : data,
        }),
      );
    } else {
      setFormData(
        createFormData({
          pageant_id: route.params.eventId,
          age_division_id: selectedAgeDivision?.id,
          contestant_title: titleOfCompetitor.trim(),
          contestant_id: competitor?.id,
          contestant_image: imageData !== undefined ? imageData : data,
        }),
      );
    }
  };

  /**
   * If the competitor's text is undefined, set the name of the competitor error to the translation of
   * this field required, otherwise set the name of the competitor error to an empty string.
   * @returns a boolean value.
   */
  const isCompetitorFeildValid = () => {
    if (competitor?.text === undefined) {
      setNameOfTheCompetitorError(translations.THIS_FIELD_REQUIRED);
      return false;
    }
    setNameOfTheCompetitorError('');
    return true;
  };

  /**
   * If the firstNameErr or lastNameErr is not an empty string, return false, otherwise return true.
   * @returns A boolean value.
   */
  const isNewCompetitorFeildValid = () => {
    const firstNameErr = checkMinLength(
      newCompetitorFirstName,
      1,
      translations.FIRST_NAME,
    );
    const lastNameErr = checkMinLength(
      newCompetitorLastName,
      1,
      translations.FIRST_NAME,
    );
    setFirstNameError(firstNameErr);
    setLastNameError(lastNameErr);
    if (firstNameErr !== '' || lastNameErr !== '') {
      return false;
    }
    return true;
  };

  const isTagTypeAlreadyAdded = (title: string) => {
    for (const entry of imageTagList) {
      if (title === entry.title) {
        return title === entry.title;
      }
    }
    return false;
  };

  const createLocalAddedTag = async () => {
    if (!isTagTypeAlreadyAdded(selectedAgeDivision?.name + '')) {
      setImageTagList(oldArray => [
        ...oldArray,
        {
          title: selectedAgeDivision?.name + '',
          tags: addeddCompetitorList,
        },
      ]);
    }
  };

  /**
   * AddCompetitorAPI is an async function that sets the loader to true, then it calls the
   * addCompetitorRequest function, and if the response is successful, it pushes the name and
   * localImagePath to the addeddCompetitorList array, and then sets the newCompetitorFirstName,
   * newCompetitorLastName, titleOfCompetitor, competitor, and headShotAvaialble to empty strings,
   * undefined, and false, respectively.
   */
  const addCompetitorAPI = async () => {
    setLoader(true);
    Keyboard.dismiss();
    const response = await addCompetitorRequest();
    if (response.success) {
      if (!!route.params.isNewpagentAdded) {
        setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);
      } else {
        setScreenRefresh(REFESH_SCREEN.UPDATE_EVENT_DETAIL_AGE_DIVISIONS);
      }
      setTotalAddedCompitorCounter(totalAddedCompitorCounter + 1);
      createLocalAddedTag();
      addeddCompetitorList.push({
        name: isNewCompetitorModeActive
          ? newCompetitorFirstName + ' ' + newCompetitorLastName
          : competitor?.text,
        localImagePath:
          response.data?.contestant_image !== undefined
            ? response.data?.contestant_image
            : '',
        tagId: response.data?.contestant_id,
      });
      setNameOfTheCompetitorError('');
      setNewCompetitorFirstName('');
      setNewCompetitorLastName('');
      setTitleOfCompetitor('');
      setCompetitor(undefined);
      setImageData(undefined);
      setHeadShotAvaialble(false);
      if (isNewCompetitorModeActive) {
        setAddNewCompetitor(false);
      }
      createRequest(undefined);
    }
  };

  /**
   * "The function imagePickerResult takes in a parameter of type any and returns a function that takes
   * in a parameter of type any and returns a function that takes in a parameter of type any and returns
   * a function that takes in a parameter of type any and returns a function that takes in a parameter
   * of type any and returns a function that takes in a parameter of type any and returns a function
   * that takes in a parameter of type any and returns a function that takes in a parameter of type any
   * and returns a function that takes in a parameter of type any and returns a function that takes in a
   * parameter of type any and returns a function that takes in a parameter of type any and returns a
   * function that takes in a parameter of type any and returns a function that takes in a parameter of
   * type any and returns a function that takes in a parameter of type any and returns a function that
   * takes in a parameter of type any and returns a function that takes in a parameter of type any and
   * returns a function
   * @param {any} data - any - this is the data that is returned from the image picker.
   */
  const imagePickerResult = (data: LocalImage | undefined) => {
    setImageData(data);
    setHeadShotAvaialble(true);
    createRequest(data);
  };
  /**
   * OnCompetitorSelection is a function that takes in a parameter of type Contestant and returns
   * nothing.
   * @param {Contestant} contestant - Contestant - this is the data that is being passed from the child
   * component.
   */
  const onCompetitorSelection = (contestant: Contestant | undefined) => {
    setCompetitor(contestant);
    setTitleOfCompetitor('');
    setNameOfTheCompetitorError('');
    createRequest(undefined);
    setRefreshComponent(false);
    setTimeout(() => {
      setRefreshComponent(true);
    }, 200);
  };

  /**
   * When the user clicks the button, set the state of the modal to true, and set the state of the first
   * and last name to the first and last name of the user.
   * @param {string} name - string
   */
  const onModalNewAddButtomClick = (name: string) => {
    const splittedName = name.split(' ');
    setNewCompetitorFirstName(splittedName[0]);
    if (splittedName.length > 1) {
      let lastName = '';
      for (let index = 1; index < splittedName.length; index++) {
        lastName = lastName + splittedName[index] + ' ';
      }
      setNewCompetitorLastName(lastName);
    }
    if (!isNewCompetitorModeActive) {
      setAddNewCompetitor(true);
    }
  };

  /**
   * When the user clicks the confirm button, go back to the previous screen.
   */
  const onConfirmWarning = () => {
    navigation.goBack();
  };

  /**
   * When the user clicks the confirm button, go back to the previous screen.
   */
  const onDelteContestConfirmWarning = () => {
    deleteAddedCompetitor(deleteCompetitorID);
  };

  /**
   * "I'm trying to delete a competitor from a list of competitors, and then refresh the screen."
   *
   * The problem is that the screen doesn't refresh
   * @param {number} id - number - this is the id of the competitor that is being deleted
   */
  const deleteAddedCompetitor = async (id: number) => {
    setLoader(true);
    const response = await removeContestant();
    if (response.success) {
      setAddeddCompetitorListe(
        addeddCompetitorList.filter(item => item.tagId !== id),
      );
      setDeleteCompetitorID(-1);
      setScreenRefresh(REFESH_SCREEN.UPDATE_EVENT_DETAIL_AGE_DIVISIONS);
    }
  };

  /* A functional component that returns a view. */
  const AddedCompetitorList = () => {
    return (
      <View>
        {isAllFieldActive ? (
          <View>
            <View
              style={{
                ...styles.titleAddContainer,
                padding: moderateScaleVertical(16),
                marginBottom: 0,
              }}>
              <Text style={styles.addCompetitorTitle}>
                {translations.ADDED_COMPETITORS}
              </Text>
              {totalAddedCompitorCounter > 0 ? (
                <Text style={styles.limitCounter}>
                  {totalAddedCompitorCounter + '/25'}
                </Text>
              ) : null}
            </View>

            {imageTagList.length > 0 ? (
              imageTagList.map(item => {
                return <TagsChip title={item.title} tags={item.tags} />;
              })
            ) : (
              <Text style={styles.newTags}>
                {translations.NEW_TAGS_WILL_APPEAR_HERE}
              </Text>
            )}
          </View>
        ) : null}
      </View>
    );
  };

  /**
   * This function returns a view that contains a text and a touchable opacity that contains a text.
   * @returns A function that returns a view.
   */
  const CompetitorHeader = () => {
    return (
      <View style={styles.titleAddContainer}>
        <Text style={styles.addCompetitorTitle}>
          {translations.ADD_COMPETITORS}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (isAllFieldActive) {
              addCompetitor();
            }
          }}>
          <Text style={styles.addButton}>{translations.ADD}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const navigateBack = () => {
    setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topContainer}>
        <Header
          lable={translations.ADD_CONSTESANT}
          isUnderLineRequired
          onPressBack={() => {
            if (
              newCompetitorFirstName.length > 0 ||
              (competitor?.text !== undefined && competitor?.text.length > 0)
            ) {
              setWarningModal(true);
            } else {
              navigateBack();
            }
          }}
        />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          {route?.params?.msg !== undefined &&
            route?.params?.msg?.length > 0 && (
              <View style={styles.inactiveMessageStyle}>
                <Text style={styles.inactiveMessageLabel}>
                  {route.params.msg}
                </Text>
              </View>
            )}

          {/* Age Division ***************************************************** START */}

          <View style={styles.itemRootContainer}>
            <FloatingDropdown
              floatingText={translations.AGE_DEVISION}
              value={
                selectedAgeDivision?.name === undefined
                  ? ''
                  : selectedAgeDivision?.name
              }
              isMandatory
              onFieldFocus={() => {
                if (!isLoading) {
                  setAgeDivision(true);
                }
              }}
            />
          </View>
          {ageDivisionList?.data !== undefined ? (
            <CustomBottomModal
              isModalVisible={isAgeDivision}
              setIsModalVisible={setAgeDivision}
              data={
                ageDivisionList?.data === undefined ? [] : ageDivisionList?.data
              }
              preSelectedValue={
                selectedAgeDivision?.id !== undefined
                  ? selectedAgeDivision?.id
                  : 0
              }
              parentCallback={selectedText => {
                setAddeddCompetitorListe([]);
                setSelectedAgeDivision(selectedText);
                setAllFiledActive(true);
                createRequest(undefined);
              }}
              heading={translations.AGE_DEVISION}
            />
          ) : null}

          {/* Age Division ***************************************************** END */}

          <View
            style={{
              ...styles.addItemContainer,
              opacity: isAllFieldActive ? 1 : 0.5,
            }}>
            <CompetitorHeader />

            {!isNewCompetitorModeActive ? (
              <FloatingDropdown
                floatingText={translations.NAME_OF_THE_COMPETITOR}
                value={competitor?.text !== undefined ? competitor?.text : ''}
                isMandatory
                errorMsg={nameOfTheCompetitorError}
                onFieldFocus={() => {
                  if (!netInfo.isConnected && !netInfo.isInternetReachable) {
                    internetState(netInfo.isConnected!!);
                    return false;
                  } else {
                    if (isAllFieldActive) {
                      setNewCompetitorLastName('');
                      setCompetitorListModalVisible(true);
                    } else {
                      toast(
                        translations.PELASE_SELECT_A_AGE_DIVISION,
                        toastType.ERROR_TOAST,
                      );
                    }
                  }
                }}
              />
            ) : null}

            {isNewCompetitorModeActive ? (
              <View>
                <FloatingInput
                  floatingText={translations.FIRST_NAME}
                  value={newCompetitorFirstName}
                  maxLength={100}
                  isMandatory
                  errorMsg={firstNameError}
                  nextField={lastNameRef}
                  setText={(value: string) => {
                    setNewCompetitorFirstName(removeEmojis(value));
                    createRequest(undefined);
                  }}
                  returnKeyType={'next'}
                  autoCapitalize={'none'}
                />
                <TouchableOpacity
                  onPress={() => {
                    setAddNewCompetitor(false);
                  }}>
                  <Text style={styles.chooseExistingContestant}>
                    {translations.CHOOSE_EXISTING_CONTESTANT}
                  </Text>
                </TouchableOpacity>

                <FloatingInput
                  floatingText={translations.LAST_NAME}
                  value={newCompetitorLastName}
                  isMandatory
                  maxLength={100}
                  errorMsg={lastNameError}
                  nextField={titleOfCompetitorRef}
                  setRef={ref => setLastNameRef(ref)}
                  setText={(value: string) => {
                    setNewCompetitorLastName(removeEmojis(value));
                    createRequest(undefined);
                  }}
                  returnKeyType={'next'}
                  autoCapitalize={'none'}
                />
              </View>
            ) : null}

            <FloatingInput
              floatingText={translations.TITLE_OF_THE_COMPETITOR}
              value={titleOfCompetitor}
              maxLength={50}
              isEditable={isAllFieldActive}
              setRef={ref => setTitleOfCompetitorRef(ref)}
              setText={(value: string) => {
                setTitleOfCompetitor(removeEmojis(value));
                createRequest(undefined);
              }}
              returnKeyType={'done'}
              autoCapitalize={'none'}
            />
            <HeadShotImage
              onImageFound={imagePickerResult}
              displayHeadUrl={isHeadShotAvaialble}
              label={translations.UPLOAD_IMAGE}
              showNote={false}
              removeCameraOption
              isClickDisable={isAllFieldActive}
              heading={translations.UPLOAD_IMAGE}
            />
          </View>

          <AddedCompetitorList />
          {refreshComponent && (
            <CompetitorListModal
              isModalVisible={isCompetitorListModalVisible}
              setIsModalVisible={setCompetitorListModalVisible}
              onAddClick={onModalNewAddButtomClick}
              onContestantClick={onCompetitorSelection}
              preSeelctedContestantID={
                competitor === undefined ? -1 : competitor.id
              }
            />
          )}

          <WarningModel
            msg={translations.THE_ADDED_CONTESTANTS_WILL_NOT_BE_SAVED}
            isModalVisible={isWarmingModelVisible}
            setConfirm={onConfirmWarning}
            setIsModalVisible={setWarningModal}
            headingStyle={styles.modalHeading}
          />
          <WarningModel
            msg={translations.DELETE_EVENT_CONTESTANT_CONFIRM_MSG}
            isModalVisible={isContestantWarmingModelVisible}
            setConfirm={onDelteContestConfirmWarning}
            setIsModalVisible={setContestantWarmingModelVisible}
            headingStyle={styles.modalHeading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EventAddEditConstestant;
