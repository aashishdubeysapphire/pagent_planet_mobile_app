// Importing required components and modules
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import FloatingBigInput from '../../../../../common/floatingbiginput';
import FloatingDropdown from '../../../../../common/floatingdropown';
import HeadShotImage from '../../../../../common/headshotimage';
import CustomBottomModal from '../../../../../common/custombottommodal';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import FloatingInput from '../../../../../common/floatinginput';
import TagPageant from '../tagpageantview';
import {YearName} from '../../../../../../services/models/pageantdetails/yearName';
import {categoryData} from '../../../../../../services/models/convo/reportcategoryList';
import {
  moderateScaleVertical,
  width,
  moderateScale,
} from '../../../../../utils/responsiveSize';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  checkIsConnected,
  createFormData,
  removeMiddleSpaces,
} from '../../../../../utils/helperFunction';
import {
  checkIsNull,
  isURL,
  removeEmojis,
} from '../../../../../utils/validations';
import Shimmer from '../../../../../common/shimmer';
import {
  ASPECT_RATIO,
  FileSize,
  IS_MINOR_VALUES,
  REFESH_SCREEN,
  USER_DESHBOARD_TAB,
} from '../../../../../utils/enum';
import {toastError} from '../../../../../common/commonalert';

// Props interface for CrownConvoForm component
interface Props {
  type: string;
  postId: string;
  categoriesData?: categoryData;
  yearsData?: YearName;
  isButtonPressed: boolean;
  setButtonClicked: Function;
  buttonType: string;
  refetch: Function;
  crownConvoDetails: any;
  savePostUrl: string;
  imageUrl: string;
  isLoading: boolean;
  fromBottomTab?: boolean;
}

const CrownConvoForm = ({
  type,
  postId,
  categoriesData,
  yearsData,
  isButtonPressed,
  setButtonClicked,
  buttonType,
  fromBottomTab,
  crownConvoDetails,
  savePostUrl,
  imageUrl,
  isLoading,
}: Props) => {
  // State variables to manage form data
  const [category, setCategory] = useState('');
  const scrRef = useRef();
  const [dataSourceCords, setDataSourceCords] = useState({});
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [categoryErr, setCategoryErr] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [imageData, setImageData] = useState('');
  const [imageSizeErr, setImageSizeErr] = useState('');
  const [showUploadLink, setShowUploadLinkInput] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [videoLinkErr, setVideoLinkErr] = useState('');

  const [pageantId, setPageantId] = useState('');
  const [eventId, setEventId] = useState('');
  const [yearId, setYearId] = useState('');
  const [postBody, setPostBody] = useState({});
  const [yearErr, setYearErr] = useState('');
  const [eventErr, setEventErr] = useState('');
  const [event, setEvent] = useState('');
  const [showPageantSection, setShowPageantSection] = useState(false);
  const [isImageChanged, setisImageChanged] = useState(false);
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();

  // API SAVE CROWN CONVO POST ----------------------------------------- START
  // Fetching crown convo details using a custom hook `useCgMutation`
  const {mutateAsync: savePost} = useCgMutation({
    key: savePostUrl,
    url: savePostUrl,
    body: createFormData(postBody),
    offSuccessToast: type === translations.EDIT ? false : true,
    disableLoader: true,
    customHeader: {'Content-Type': 'multipart/form-data'},
    isJson: false,
  });
  // API SAVE CROWN CONVO POST -------------------------------------------- END

  useEffect(() => {
    console.log(fromBottomTab, type, 'from bottom tab');
    // Populating form fields with existing data when editing a post
    if (type === translations.EDIT) {
      setCategory(crownConvoDetails?.post_category?.name);
      setCategoryId(crownConvoDetails?.category_id);
      setDescription(
        !!crownConvoDetails?.body ? String(crownConvoDetails?.body) : '',
      );
      if (checkIsNull(imageUrl)) {
        setImageData(imageUrl);
      }
      if (checkIsNull(crownConvoDetails?.video_url)) {
        setVideoLink(crownConvoDetails?.video_url);
        setShowUploadLinkInput(true);
      }
      if (
        checkIsNull(crownConvoDetails?.master_pageant_id) &&
        checkIsNull(crownConvoDetails?.year_id) &&
        checkIsNull(crownConvoDetails?.event_id)
      ) {
        setPageantId(crownConvoDetails?.master_pageant_id);
        setYearId(crownConvoDetails?.year_id);
        setEventId(crownConvoDetails?.event_id);
        setEvent(crownConvoDetails?.post_event?.title);
        setShowPageantSection(true);
      } else {
        setShowPageantSection(false);
      }
    } else if (fromBottomTab) {
      console.log('categoriesData', categoriesData);
      const selectedCategories = categoriesData?.find(
        (item: {name: string; id: number}) => item.name === 'Question',
      );
      setCategory(selectedCategories?.name ?? '');
      setCategoryId(selectedCategories?.id);
    }
  }, [crownConvoDetails, categoriesData]);

  const resetForm = () => {
    let defaultCategoryName = '';
    let defaultCategoryId = '';
    if (fromBottomTab) {
      const selectedCategories = categoriesData?.find(
        (item: {name: string; id: number}) => item.name === 'Question',
      );
      defaultCategoryName = selectedCategories?.name ?? '';
      defaultCategoryId = selectedCategories?.id ?? '';
    }

    setCategory(defaultCategoryName);
    setCategoryId(defaultCategoryId);
    setCategoryErr('');
    setDescription('');
    setDescriptionErr('');
    setImageData('');
    setImageSizeErr('');
    setShowUploadLinkInput(false);
    setVideoLink('');
    setVideoLinkErr('');
    setPageantId('');
    setEventId('');
    setYearId('');
    setYearErr('');
    setEventErr('');
    setEvent('');
    setShowPageantSection(false);
    setisImageChanged(false);
    setPostBody({});
    setButtonClicked(false);
  };

  // Function to handle image selection callback
  const imagePickerResult = (image: string) => {
    setImageData(image);
    if (type == translations.EDIT) {
      setisImageChanged(true);
    }
  };

  // Function to set category data when selected from dropdown
  const setCategoryData = selectedText => {
    setCategoryId(selectedText?.id);
    setCategory(selectedText?.name);
    if (checkIsNull(selectedText)) {
      setCategoryErr('');
    }
  };

  useEffect(() => {
    if (isButtonPressed) {
      onPostButtonPressed(buttonType);
    }
  }, [isButtonPressed]);

  // Function to check internet connection
  const checkInterNet = () => {
    return checkIsConnected();
  };

  // Function to perform form validations
  const checkValidations = () => {
    if (categoryId === '') {
      return false;
    } else if (description.trim() === '') {
      return false;
    } else {
      return true;
    }
  };

  // Function to perform pageant section validations
  const checkPageantValidations = () => {
    if (pageantId === '') {
      // That means Pageant is not selected, so empty value will be sent
      return true;
    } else if (yearId === '') {
      return false;
    } else if (event === '') {
      return false;
    } else {
      return true;
    }
  };

  // Function to check if the video link is a valid URL
  const checkIfUrlExists = () => {
    if (videoLink === '' || isURL(videoLink)) {
      return true;
    } else {
      return false;
    }
  };

  // Function to check image validations
  const checkImageValidations = () => {
    if (imageData === '') {
      return true;
    } else if (imageData?.size > FileSize.FiveMB) {
      // More than 5MB size is not acceptable.
      return false;
    } else {
      return true;
    }
  };

  // Function to show validation warnings
  const showValidationsWarnings = () => {
    if (category == '') {
      setCategoryErr(translations.THIS_FIELD_REQUIRED);
    }
    if (description.trim() == '') {
      setDescriptionErr(translations.THIS_FIELD_REQUIRED);
    }
    if (pageantId !== '' && yearId == '') {
      setYearErr(translations.THIS_FIELD_REQUIRED);
    }
    if (pageantId !== '' && event == '') {
      setEventErr(translations.THIS_FIELD_REQUIRED);
    }
    if (checkIsNull(imageData) && imageData?.size > FileSize.FiveMB) {
      // More than 5MB size is not acceptable.
      setImageSizeErr(translations.IMAGE_FILE_SIZE_ACCEPTED_UPTO);
    }
    if (checkIsNull(videoLink) && !isURL(videoLink)) {
      setVideoLinkErr(translations.PLEASE_ENTER_A_VALID_LINK);
    }
  };

  // Function to move to the corresponding error field when the form submission fails
  const moveToError = key => {
    if (scrRef?.current) {
      scrRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)],
        animated: true,
      });
    }
  };

  // Function to move to the topmost error field when the form submission fails
  const moveToTopError = () => {
    if (category == '') {
      moveToError(translations.SELECT_CATEGORY);
    } else if (description.trim() == '') {
      moveToError(translations.ADD_DESCRIPTION);
    } else if (checkIsNull(videoLink) && !isURL(videoLink)) {
      moveToError(translations.VIDEO_LINK);
    } else if (!checkPageantValidations()) {
      if (scrRef.current) {
        scrRef.current.scrollToEnd({animated: true});
      }
    }
  };

  // Function to handle the post button press
  const onPostButtonPressed = async (buttonsType: string) => {
    showValidationsWarnings();
    if (imageData == undefined) {
      setImageData('');
    }
    if (
      checkValidations() &&
      checkPageantValidations() &&
      checkIfUrlExists() &&
      checkImageValidations()
    ) {
      if (checkInterNet()) {
        setLoader(true);
        if (type === translations.ADD) {
          const body = {
            category_id: categoryId,
            body: description.trim(),
            image: imageData === undefined ? '' : imageData,
            event_id: eventId,
            year_id: yearId,
            master_pageant_id: pageantId,
            attach_file: videoLink !== '' ? 2 : 1,
            video_url: videoLink,
            btn_hit: buttonsType,
          };
          setPostBody(body);
        } else {
          const body = {
            category_id: categoryId,
            body: description.trim(),
            image:
              !checkIsNull(imageData) || isImageChanged == false
                ? ''
                : imageData,
            event_id: eventId,
            year_id: yearId,
            master_pageant_id: pageantId,
            attach_file: videoLink !== '' ? 2 : 1,
            video_url: videoLink,
            post_id: postId + '',
            btn_hit: buttonsType,
            imageDelete: isImageChanged
              ? IS_MINOR_VALUES.YES
              : IS_MINOR_VALUES.NO,
          };
          setPostBody(body);
        }
        setTimeout(async () => {
          const response = await savePost();
          if (response.success) {
            setScreenRefresh(REFESH_SCREEN.CROWN_CONVO);
            setTimeout(() => {
              setLoader(false);
              if (type === translations.ADD) {
                resetForm();
              }
              navigation.navigate(USER_DESHBOARD_TAB.CONVO, {
                addConvo: true,
              });
            }, 2000);
          } else {
            setLoader(false);
          }
        }, 800);
      } else {
        setButtonClicked(false);
      }
    } else {
      setButtonClicked(false);
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
      moveToTopError();
    }
  };

  // Function to conditionally display the head URL section
  const displayHeadUrlCondition = () => {
    if (type === translations.EDIT) {
      if (imageData) {
        return true;
      } else if (!!imageUrl && isImageChanged) {
        return false;
      }
    } else {
      if (imageData) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer} ref={scrRef}>
      {/* Dropdown for selecting the category */}
      <FloatingDropdown
        floatingText={translations.SELECT_CATEGORY}
        value={category}
        dropdown={true}
        isMandatory={true}
        setText={value => setCategory(value)}
        errorMsg={categoryErr}
        onPressDropdown={() => {
          setCategoryVisible(true);
        }}
        onFieldFocus={() => {
          if (type === translations.ADD) {
            setCategoryVisible(true);
          }
        }}
        opacity={type === translations.EDIT ? 0.4 : 1}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />

      {/* Input field for entering the description */}
      <FloatingBigInput
        floatingText={translations.ADD_DESCRIPTION}
        value={description}
        returnKeyType={'done'}
        multiline={true}
        numberOfLines={6}
        textAlignVertical={'top'}
        setText={value => {
          setDescription(value);
          if (checkIsNull(value)) {
            setDescriptionErr('');
          }
        }}
        forMultiline={true}
        autoCapitalize={'sentences'}
        showLength={false}
        isMandatory={true}
        errorMsg={descriptionErr}
        isMoreThan250={true}
        laoutY={(val: any, index: string) => {
          let obj = dataSourceCords;
          obj[index] = val;
          setDataSourceCords(obj);
        }}
      />

      {showUploadLink ? (
        // Input field for entering video link when upload link is shown
        <View>
          <View style={styles.linkHeader}>
            <Text style={styles.linkHeaderLabel}>
              {translations.UPLOAD + ' ' + translations.VIDEO_LINK}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowUploadLinkInput(false);
                setVideoLink('');
              }}>
              <AppImages.CreateContestentProfile.tpp_cross_small_icon
                width={20}
                height={20}
              />
            </TouchableOpacity>
          </View>
          <FloatingInput
            floatingText={translations.VIDEO_LINK}
            setText={value => setVideoLink(removeEmojis(value))}
            value={videoLink}
            returnKeyType={'done'}
            errorMsg={videoLinkErr}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
        </View>
      ) : !isLoading || type === translations.ADD ? (
        // HeadShotImage component to handle image or video link selection
        <View
          style={{
            height:
              checkIsNull(imageData) && checkIsNull(imageSizeErr)
                ? moderateScaleVertical(152)
                : checkIsNull(imageData)
                ? moderateScaleVertical(134)
                : moderateScaleVertical(148),
          }}>
          <HeadShotImage
            onImageFound={imagePickerResult}
            label={translations.ADD_YOUR_IMAGE_OR_VIDEO_LINK}
            url={imageData === '' ? imageUrl : imageData}
            msg={translations.DELETE_IMAGE}
            errorMsg={imageSizeErr}
            showLink={true}
            showNote={false}
            note={translations.UPLOAD_LIMIT_FOR_FILE}
            note2={translations.VIMEO_YOUTUBE_VIDEO_LINKS_ONLY}
            circularCrop={false}
            heading={translations.UPLOAD_IMAGE}
            displayHeadUrl={displayHeadUrlCondition()}
            onLinkButtonPressed={() => {
              setShowUploadLinkInput(true);
            }}
            height={ASPECT_RATIO.NOT_REQUIRED}
            width={width}
          />
        </View>
      ) : (
        isLoading &&
        type === translations.EDIT && (
          // Shimmer effect while loading data for editing
          <Shimmer
            width={width - moderateScale(32)}
            height={moderateScaleVertical(130)}
            borderRadius={moderateScale(20)}
            bottomSpace={moderateScaleVertical(24)}
          />
        )
      )}

      {/* Component to handle pageant section */}
      <TagPageant
        yearsList={yearsData}
        pageantId={pageantId}
        setPageantId={setPageantId}
        eventId={eventId}
        setEventId={setEventId}
        yearId={yearId}
        setYearId={setYearId}
        yearErr={yearErr}
        setYearErr={setYearErr}
        eventErr={eventErr}
        setEventErr={setEventErr}
        event={event}
        setEvent={setEvent}
        type={type}
        formDetails={crownConvoDetails}
        showPageantSection={showPageantSection}
      />

      {/* Modal to display categories for selection */}
      {categoryVisible ? (
        <CustomBottomModal
          isModalVisible={categoryVisible}
          setIsModalVisible={setCategoryVisible}
          data={categoriesData}
          parentCallback={selectedText => setCategoryData(selectedText)}
          heading={translations.SELECT_CATEGORY}
          preSelectedValue={categoryId}
        />
      ) : null}
    </ScrollView>
  );
};

export default CrownConvoForm;
