import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  TouchableOpacity,
  Text,
  BackHandler,
  View,
} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import translations from '../../../../../../assets/translations';
import {SafeAreaView} from 'react-native-safe-area-context';
import FloatingDropdown from '../../../../../common/floatingdropown';
import Header from '../../../../../common/header';
import CustomBottomModal from '../../../../../common/custombottommodal';
import {Contestant} from '../../../../../../services/models/pageantdetails/contestant';
import {Pageant} from '../../../../../../services/models/pageantdetails/pageant';
import SearchTagOptions from '../../../contestantdashboard/gallery/subgallery/albumdetail/tags/addtag/components/searchtagoptions';
import {Param} from '../../../../../../services/constants';
import {
  EXPERT_ALBUM_TYPE,
  EXPERT_ALUM_TYPE,
  MASTERDATA,
  REFESH_SCREEN,
  SLUG,
} from '../../../../../utils/enum';
import {SortedRolesForPublicScreen} from '../../../../../../services/models/user/user';
import {Base} from '../../../../../../services/models/base';
import {
  CREATE_CONTESTANT_WORKWITH_ALBUM_EXPERT,
  CREATE_PAGAENT_WORKWITH_ALBUM_EXPERT,
  EXPERT_UPLOAD_IMAGE_IN_ALBUM,
  GET_MASTER_DATA,
} from '../../../../../../services/endpoints';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../common/commonalert';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import {YearName} from '../../../../../../services/models/pageantdetails/yearName';
import CompetitorListModal from '../../../pageantdashboard/pageantdetail/eventlist/eventdetail/contestantgroups/contestants/addcompetitor/components/competitorlistmodal';
import FloatingInput from '../../../../../common/floatinginput';
import {checkMinLength, removeEmojis} from '../../../../../utils/validations';
import WarningModel from '../../../../../common/warningmodel';
import AdditionalImage from '../../../../sellitemservices/sell/components/additionalimages';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import HeadShotImage from '../../../../../common/headshotimage';
import {LocalImage} from '../../../../../../services/models/localimage';
import {createFormData} from '../../../../../utils/helperFunction';
import ProgressLoader from '../../../../../common/progressloader';

const CreateExpertAlbum = ({route}) => {
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const [year, setYear] = useState<YearName>();
  const [imageUploadcounter, setImageUploadCounter] = useState(0);
  const [addEditRequest, setProductDetail] = useState<ProductsData>({
    additional_images: [],
    additionalImage: [],
  });
  const [isWarmingModelVisible, setWarningModal] = useState(false);
  const [galleryId, setGalleryID] = useState(Number);
  const [expert] = useState<SortedRolesForPublicScreen>(route.params.expert);
  const [isAlbumTypeVisible, setAlbumTypeVisible] = useState(false);
  const [isCompetitorListModalVisible, setCompetitorListModalVisible] =
    useState(false);
  const [yearDropDownVisible, setYearDropDownVisible] = useState(false);
  const [isNewCompetitorModeActive, setAddNewCompetitor] = useState(false);
  const [newCompetitorFirstName, setNewCompetitorFirstName] = useState('');
  const [newCompetitorLastName, setNewCompetitorLastName] = useState('');
  const [selectedAlbumType, setSelectedAlbumType] = useState();
  const [yearsList, setYearsList] = useState<YearName>();
  const [yearErr, setYearErr] = useState('');
  const [imageData, setImageData] = useState<LocalImage>();
  const [isHeadShotAvaialble, setHeadShotAvaialble] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [lastNameRef, setLastNameRef] = useState('');
  const netInfo = useNetInfo();
  const [nameOfTheAlbumError, setNameOfTheAlbumError] = useState('');
  const setLoader = useSetLoader();
  const [uploadingProgress, setUploaderProgress] = useState(0);
  const [isUploaderProgressVisible, setUploaderProgressVisible] =
    useState(false);
  const [updateImageBody, setUpdateImageBody] = useState({});
  const [isPageantModalVisible, setPageantModalVisible] = useState(false);
  const [selectedContestant, setSelectedContestant] = useState<
    Contestant | undefined
  >();

  const [selectedPageant, setSelectedPageant] = useState<Pageant | undefined>();

  //Upload GALLERY Images ----------------------------------------- START
  /* The above code is using the `useCgMutation` hook to make a mutation request to upload an image to
  a gallery album. */
  const {
    error,
    isLoading,
    mutateAsync: uploadGalleryImageRequest,
  } = useCgMutation<Base>({
    key: EXPERT_UPLOAD_IMAGE_IN_ALBUM,
    url: EXPERT_UPLOAD_IMAGE_IN_ALBUM,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: true,
    disableLoader: true,
  });

  //API active pagent event ----------------------------------------- END

  //API DELETE EVENT CONTESTANT----------------------------------------- END
  /**
   * The function `getRequestBody` returns different objects based on the selected album type and other
   * conditions.
   * @returns The function `getRequestBody` returns an object with different properties based on the
   * conditions. The returned object will have different properties depending on the value of
   * `selectedAlbumType?.id`.
   */
  const getRequestBody = () => {
    if (selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH) {
      if (isNewCompetitorModeActive) {
        return {
          business_profile_id: expert?.id,
          first_name: newCompetitorFirstName.trim(),
          last_name: newCompetitorLastName.trim(),
        };
      } else {
        return {
          business_profile_id: expert?.id,
          contestant_id: selectedContestant?.id,
        };
      }
    } else if (selectedAlbumType?.id === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH) {
      return {
        business_profile_id: expert.id,
        pageant_id: selectedPageant?.id,
        year_id: year?.id,
      };
    } else if (selectedAlbumType?.id === EXPERT_ALUM_TYPE.EXTRA) {
      return {
        business_profile_id: expert?.id,
      };
    }
  };
  /* The above code is using the `useCgMutation` hook to make an asynchronous request to create an
  album. The `createAlbumRequest` function is assigned the `mutateAsync` method from the
  `useCgMutation` hook. The `key` and `url` properties are conditionally set based on the value of
  `selectedAlbumType?.id`. If `selectedAlbumType?.id` is equal to
  `EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH`, then the `key` and `url` properties are set to
  `CREATE_CONTESTANT_WORKWITH_ALBUM */
  const {mutateAsync: createAlbumRequest} = useCgMutation<Base<string>>({
    key:
      selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
        ? CREATE_CONTESTANT_WORKWITH_ALBUM_EXPERT
        : CREATE_PAGAENT_WORKWITH_ALBUM_EXPERT,
    url:
      selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
        ? CREATE_CONTESTANT_WORKWITH_ALBUM_EXPERT
        : CREATE_PAGAENT_WORKWITH_ALBUM_EXPERT,
    body: getRequestBody(),
  });
  //API DELETE EVENT CONTESTANT----------------------------------------- END

  //API GET MASTER DATA----------------------------------------- START
  const {mutateAsync: getMasterDetails} = useCgMutation<YearName[]>({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.YEARS}`,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET MASTER DATA-------------------------------------------- END
  const popupMenuData = [
    {
      id: EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH,
      name: translations.CONTESTANT_WORKED_WITH,
      isSelected: false,
    },
    {
      id: EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH,
      name: translations.PAGEANT_WORKED_WITH,
      isSelected: false,
    },
    {
      id: EXPERT_ALUM_TYPE.EXTRA,
      name: translations.EXTRA,
      isSelected: false,
    },
  ];
  /* The above code is using the `useEffect` hook in a React component. It is iterating over an array
 called `popupMenuData` and checking if the `id` property of each element matches the
 `activeAlbumId` property from the `route.params` object. If a match is found, the
 `setSelectedAlbumType` function is called with the matching element as an argument. This code is
 executed once, when the component is first rendered, due to the empty dependency array `[]` passed
 as the second argument to `useEffect`. */
  useEffect(() => {
    popupMenuData.forEach(element => {
      if (element.id === route.params.activeAlbumId) {
        setSelectedAlbumType(element);
      }
    });
  }, []);

  /**
   * The function `onItemSelection` updates the selected contestant or pageant based on the selected
   * album type.
   * @param id - The id parameter represents the unique identifier of the selected item. It is used to
   * identify and differentiate between different items in the list or collection.
   * @param text - The "text" parameter is a string that represents the text or title of the selected
   * item.
   */
  const onItemSelection = (id, text) => {
    if (selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH) {
      setSelectedContestant({id: id, text: text});
    } else {
      if (yearsList) {
        setLoader(true);
      }
      hitMasterDetailsAPI();
      setSelectedPageant({id: id, title: text});
    }
  };

  /**
   * The function `createAlbum` is an asynchronous function that creates an album, sets a loader,
   * dismisses the keyboard, makes a request to create the album, sets the loader to false, and
   * performs different actions based on the response.
   */
  const createAlbum = async () => {
    setLoader(true);
    Keyboard.dismiss();
    const response = await createAlbumRequest();
    setLoader(false);
    if (response.success) {
      setGalleryID(response.gallery_id);
      if (
        isNewCompetitorModeActive &&
        selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH &&
        imageData !== undefined
      ) {
        setUpdateImageBody({
          contestant_id: response.contestant_id,
          contestant_image: imageData,
          gallery_id: response.gallery_id,
          album_type: EXPERT_ALBUM_TYPE.CONTESTANT_ALBUM,
        });
        await uploadGalleryImageRequest();
        onUploadClick();
      } else if (
        addEditRequest?.additional_images !== undefined &&
        addEditRequest?.additional_images.length > 0
      ) {
        onUploadClick();
      } else {
        refeshAlbumImageScreen();
        navigation.goBack();
      }
    }
  };
  /**
   * The function checks if all the required fields are valid and returns true if they are, otherwise
   * it returns false.
   * @returns a boolean value.
   */
  const isAllFeildValid = () => {
    if (
      (selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH &&
        selectedContestant === undefined &&
        !isNewCompetitorModeActive) ||
      (selectedAlbumType?.id === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH &&
        selectedPageant === undefined &&
        !isNewCompetitorModeActive)
    ) {
      setNameOfTheAlbumError(translations.THIS_FIELD_REQUIRED);
      return false;
    }

    if (
      selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH &&
      isNewCompetitorModeActive &&
      !isNewCompetitorFeildValid()
    ) {
      return false;
    }
    if (selectedPageant !== undefined && year === undefined) {
      setNameOfTheAlbumError('');
      setYearErr(translations.THIS_FIELD_REQUIRED);
      return false;
    }
    setYearErr('');
    setNameOfTheAlbumError('');
    return true;
  };
  /**
   * The function `isNewCompetitorFeildValid` checks if the first name and last name fields of a new
   * competitor are valid by checking their minimum length and setting error messages accordingly.
   * @returns The function `isNewCompetitorFeildValid` returns a boolean value. It returns `true` if
   * both `firstNameErr` and `lastNameErr` are empty strings, indicating that the first name and last
   * name fields are valid. Otherwise, it returns `false`.
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
  /**
   * The function `onSaveClick` checks for network connectivity and album type before either uploading
   * or creating an album.
   * @returns The function `onSaveClick` returns either `false` or nothing (`undefined`).
   */
  const onSaveClick = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (selectedAlbumType?.id === EXPERT_ALUM_TYPE.EXTRA) {
      onUploadClick();
    } else if (isAllFeildValid()) {
      createAlbum();
    }
  };
  /**
   * The function `onUploadClick` checks for internet connectivity, validates the selected album type
   * and additional images, and updates the uploader progress and image upload counter.
   * @returns either `false` or nothing (`undefined`).
   */
  const onUploadClick = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(false);
      return false;
    } else if (
      (selectedAlbumType?.id === EXPERT_ALUM_TYPE.EXTRA &&
        addEditRequest?.additionalImage === undefined) ||
      (selectedAlbumType?.id === EXPERT_ALUM_TYPE.EXTRA &&
        addEditRequest?.additionalImage?.length === 0)
    ) {
      toast(translations.UPLOAD_IMAGE_UNDER_EXTRA_ALBUM, toastType.ERROR_TOAST);
    } else {
      setUploaderProgressVisible(true);
      if (
        addEditRequest?.additionalImage !== undefined &&
        addEditRequest?.additionalImage[
          addEditRequest?.additionalImage.length - 1
        ]?.uri?.length === 0
      ) {
        addEditRequest?.additionalImage?.pop();
      }
      setImageUploadCounter(imageUploadcounter + 1);
    }
  };
  /**
   * The function "setYearDetails" sets the year details using the provided "details" parameter.
   * @param {YearName} details - The parameter `details` is of type `YearName`.
   */
  const setYearDetails = (details: YearName) => {
    setYear(details);
  };
  /**
   * The function `hitMasterDetailsAPI` makes an asynchronous API call to retrieve master details and
   * updates the years list if the API call is successful.
   */
  const hitMasterDetailsAPI = async () => {
    const res = await getMasterDetails();
    if (res.success) {
      setYearsList(res.data?.master_records?.years);
    }
    setLoader(false);
  };
  /**
   * The function `onModalNewAddButtomClick` takes a name as input, splits it into first and last names,
   * and sets the state variables `newCompetitorFirstName` and `newCompetitorLastName` accordingly. If
   * `isNewCompetitorModeActive` is false, it also sets the state variable `addNewCompetitor` to true.
   * @param {string} name - A string representing the full name of a competitor.
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
   * The function "onCompetitorSelection" sets the selected contestant.
   * @param {Contestant | undefined} contestant - The `contestant` parameter is of type `Contestant |
   * undefined`. This means that it can either be a `Contestant` object or `undefined`.
   */
  const onCompetitorSelection = (contestant: Contestant | undefined) => {
    setSelectedContestant(contestant);
  };
  /**
   * The function `onConfirmWarning` navigates back to the previous screen.
   */
  const onConfirmWarning = () => {
    navigation.goBack();
  };
  const onPressBack = () => {
    backButtonHandled();
    return true;
  };
  /**
   * The function checks if a selected album type is defined and if all fields are valid, and if so, it
   * sets a warning modal to true; otherwise, it navigates back.
   */
  const backButtonHandled = () => {
    if (selectedAlbumType !== undefined && isAllFeildValid()) {
      setWarningModal(true);
    } else {
      navigation.goBack();
    }
  };
  useEffect(() => {
    const hardware = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardware.remove();
  }, [onPressBack]);

  /*It is triggered whenever the
  value of `imageUploadcounter` changes. */
  useEffect(() => {
    if (
      imageUploadcounter > 0 &&
      addEditRequest?.additionalImage !== undefined
    ) {
      if (selectedAlbumType?.id === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH) {
        setUpdateImageBody({
          record_images:
            addEditRequest?.additionalImage[imageUploadcounter - 1],
          gallery_id: galleryId,
          album_type: EXPERT_ALBUM_TYPE.PAGEANT_ALBUM,
        });
      } else if (
        selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
      ) {
        setUpdateImageBody({
          record_images:
            addEditRequest?.additionalImage[imageUploadcounter - 1],
          gallery_id: galleryId,
          album_type: EXPERT_ALBUM_TYPE.CONTESTANT_ALBUM,
        });
      } else {
        setUpdateImageBody({
          record_images:
            addEditRequest?.additionalImage[imageUploadcounter - 1],
          business_profile_id: expert?.id,
          album_type: EXPERT_ALBUM_TYPE.EXTRA,
        });
      }

      setTimeout(() => {
        onUploading();
      }, 400);
    }
  }, [imageUploadcounter]);

  /**
   * It uploads the image to the server.
   */
  const onUploading = async () => {
    if (
      addEditRequest?.additionalImage !== undefined &&
      addEditRequest?.additionalImage?.length === 1
    ) {
      setTimeout(() => {
        setUploaderProgress(0.2);
        setTimeout(() => {
          setUploaderProgress(0.5);
          setTimeout(() => {
            setUploaderProgress(0.7);
          }, 500);
        }, 500);
      }, 500);
    }
    const res = await uploadGalleryImageRequest();

    if (
      addEditRequest?.additionalImage !== undefined &&
      addEditRequest?.additionalImage?.length > 1
    ) {
      setUploaderProgress(
        imageUploadcounter / addEditRequest?.additionalImage?.length,
      );
    }
    if (
      imageUploadcounter === addEditRequest?.additionalImage?.length &&
      res.success
    ) {
      setUploaderProgressVisible(false);
      refeshAlbumImageScreen();
      setTimeout(() => {
        toast(res.message, toastType.SUCESS_TOAST);
        navigation.goBack();
      }, 200);
    } else if (res.success) {
      setImageUploadCounter(imageUploadcounter + 1);
    } else {
      setImageUploadCounter(0);
      refeshAlbumImageScreen();
      navigation.goBack();
    }
  };
  /**
   * It refreshes the screen.
   */
  const refeshAlbumImageScreen = () => {
    if (route.params.isAlbumView !== undefined && route.params.isAlbumView) {
      setScreenRefresh(REFESH_SCREEN.EXPERT_ALBUM_VIEW);
    } else {
      setScreenRefresh(REFESH_SCREEN.EXPERT_DASHBOARD_ALBUM);
    }
  };
  useEffect(() => {
    if (!isLoading && error) {
      refeshAlbumImageScreen();
      navigation.goBack();
    }
  }, [error]);

  /**
   * The function sets the image data and updates the availability of a headshot.
   * @param {LocalImage | undefined} data - The `data` parameter is of type `LocalImage | undefined`.
   * This means that it can either be an object of type `LocalImage` or `undefined`.
   */
  const imagePickerResult = (data: LocalImage | undefined) => {
    setImageData(data);
    setHeadShotAvaialble(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Header
          lable={translations.CREATE_ALBUM}
          isUnderLineRequired
          onPressBack={() => {
            navigation.goBack();
          }}
          onCustomPressBack={backButtonHandled}
          isSaveActive={selectedAlbumType !== undefined}
          rightText={translations.SAVE}
          onPressRightText={() => onSaveClick()}
        />
        <View style={styles.titleContainer}>
          <FloatingDropdown
            floatingText={translations.SELECT_ALBUM_TYPE}
            value={
              selectedAlbumType?.name !== undefined
                ? selectedAlbumType?.name
                : ''
            }
            isMandatory
            onFieldFocus={() => {
              setAlbumTypeVisible(true);
            }}
          />
          {selectedAlbumType !== undefined &&
          selectedAlbumType?.id !== EXPERT_ALUM_TYPE.EXTRA &&
          !isNewCompetitorModeActive ? (
            <FloatingDropdown
              floatingText={
                selectedAlbumType.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
                  ? translations.CONTESTANT_NAME
                  : translations.PAGEANT_NAME
              }
              value={
                selectedAlbumType.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
                  ? selectedContestant?.text !== undefined
                    ? selectedContestant?.text
                    : ''
                  : selectedPageant?.title !== undefined
                  ? selectedPageant?.title
                  : ''
              }
              errorMsg={nameOfTheAlbumError}
              isMandatory
              onFieldFocus={() => {
                if (
                  selectedAlbumType?.id ===
                  EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
                ) {
                  setCompetitorListModalVisible(true);
                } else {
                  setPageantModalVisible(true);
                }
              }}
            />
          ) : isNewCompetitorModeActive ? (
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
                setRef={ref => setLastNameRef(ref)}
                setText={(value: string) => {
                  setNewCompetitorLastName(removeEmojis(value));
                }}
                returnKeyType={'done'}
                autoCapitalize={'none'}
              />
            </View>
          ) : null}
          {selectedPageant &&
            selectedAlbumType?.id === EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH && (
              <FloatingDropdown
                floatingText={translations.YOUR_EVENT_WAS_HELD}
                value={year !== undefined ? '' + year?.name : ''}
                isMandatory={true}
                errorMsg={yearErr}
                onFieldFocus={() => {
                  setYearDropDownVisible(true);
                }}
              />
            )}
          {isNewCompetitorModeActive && (
            <HeadShotImage
              onImageFound={imagePickerResult}
              label={translations.UPLOAD_CONTESTANT_IMAGE}
              showNote={false}
              displayHeadUrl={isHeadShotAvaialble}
              heading={translations.CONTESTANT_IMAGE}
              isRemoveBottomSpace={true}
            />
          )}

          {selectedAlbumType !== undefined && (
            <AdditionalImage
              addEditRequest={addEditRequest}
              setProductDetail={setProductDetail}
              title={
                selectedAlbumType?.id ===
                EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
                  ? translations.UPLOAD_ALBUM_IMAGE
                  : selectedAlbumType?.id ===
                    EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH
                  ? translations.UPLOAD_EVENT_IMAGE + 's'
                  : translations.IMAGE + 's'
              }
              subTitle={
                selectedAlbumType?.id ===
                EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
                  ? translations.CONTESTANT_IMAGE
                  : selectedAlbumType?.id ===
                    EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH
                  ? translations.UPLOAD_EVENT_IMAGE + 's'
                  : translations.IMAGE + 's'
              }
              headerTitle={
                selectedAlbumType?.id ===
                EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
                  ? translations.CONTESTANT_IMAGE + 's'
                  : selectedAlbumType?.id ===
                    EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH
                  ? translations.UPLOAD_EVENT_IMAGE + 's'
                  : translations.IMAGE + 's'
              }
            />
          )}
        </View>
      </>
      {yearDropDownVisible && yearsList && (
        <CustomBottomModal
          isModalVisible={yearDropDownVisible}
          setIsModalVisible={setYearDropDownVisible}
          data={yearsList}
          parentCallback={selectedText => setYearDetails(selectedText)}
          heading={translations.SELECT_YEAR}
          preSelectedValue={year?.id}
          customStyles={{height: '90%'}}
          enableSearch={true}
        />
      )}
      {selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH && (
        <CompetitorListModal
          isModalVisible={isCompetitorListModalVisible}
          setIsModalVisible={setCompetitorListModalVisible}
          onAddClick={onModalNewAddButtomClick}
          onContestantClick={onCompetitorSelection}
          preSeelctedContestantID={
            selectedContestant === undefined ? -1 : selectedContestant.id
          }
        />
      )}
      <CustomBottomModal
        isModalVisible={isAlbumTypeVisible}
        setIsModalVisible={setAlbumTypeVisible}
        data={popupMenuData}
        preSelectedValue={
          selectedAlbumType?.id !== undefined ? selectedAlbumType?.id : 0
        }
        parentCallback={selectedText => {
          setNameOfTheAlbumError('');
          setAddNewCompetitor(false);
          setNewCompetitorFirstName('');
          setNewCompetitorLastName('');
          setYear(undefined);
          setSelectedPageant(undefined);
          setProductDetail({
            additional_images: [],
            additionalImage: [],
          });
          setSelectedContestant(undefined);
          setSelectedAlbumType(selectedText);
        }}
        heading={translations.SELECT_ALBUM_TYPE}
      />
      {isPageantModalVisible && (
        <SearchTagOptions
          title={translations.SELECT + translations.PROFILE_NAME}
          isModalVisible={isPageantModalVisible}
          setIsModalVisible={setPageantModalVisible}
          params={
            selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
              ? SLUG.CONTESTANT + Param.USER_OWNED + 'true'
              : SLUG.PAGEANT + Param.USER_OWNED + 'true'
          }
          preSelectedValue={
            selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
              ? selectedContestant?.id
              : selectedPageant?.id
          }
          show_image={1}
          onItemSelect={onItemSelection}
        />
      )}

      <WarningModel
        msg={
          selectedAlbumType?.id === EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH
            ? translations.THE_ADDED_CONTESTANTS_WILL_NOT_BE_SAVED
            : translations.THE_ADDED_PAGEANT_WILL_NOT_BE_SAVED
        }
        isModalVisible={isWarmingModelVisible}
        setConfirm={onConfirmWarning}
        setIsModalVisible={setWarningModal}
        headingStyle={styles.modalHeading}
      />
      {isUploaderProgressVisible &&
        addEditRequest?.additionalImage !== undefined && (
          <ProgressLoader
            imageLoadedCounter={imageUploadcounter}
            progress={uploadingProgress}
            totalToUpload={addEditRequest?.additionalImage?.length}
          />
        )}
    </SafeAreaView>
  );
};

export default CreateExpertAlbum;
