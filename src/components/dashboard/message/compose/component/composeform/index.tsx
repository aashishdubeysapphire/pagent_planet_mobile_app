import {View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import FloatingDropdown from '../../../../../common/floatingdropown';
import translations from '../../../../../../assets/translations';
import FloatingBigInput from '../../../../../common/floatingbiginput';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  COMPOSE_MESSAGE,
  DIRECTORY_FILTTER_BY_TYPE,
} from '../../../../../../services/endpoints';
import {MethodTypes, Param} from '../../../../../../services/constants';
import {DataFilter} from '../../../../../../services/models/filterData';
import Loader from '../../../../../common/customloader';
import CustomBottomModal from '../../../../../common/custombottommodal';
import {
  FILE_EXT,
  FILE_TYPE,
  PROFILE_SELECTION_TYPE,
} from '../../../../../utils/enum';
import SearchTagOptions from '../../../../dashboard/contestantdashboard/gallery/subgallery/albumdetail/tags/addtag/components/searchtagoptions';
import AppImages from '../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import ImagePickerModal from '../../../../../common/imagepickermodal';
import {toast, toastError, toastType} from '../../../../../common/commonalert';
import {
  createFormData,
  getFileExtension,
} from '../../../../../utils/helperFunction';
import CustomButton from '../../../../../common/button';
import {useKeyboard} from '@react-native-community/hooks';
import {isFeildValid, isFormValid} from './validation';
import {useNavigation} from '@react-navigation/core';

const ComposeForm = (props: any) => {
  const route = props?.route;
  const screenParam = route?.params;
  const isFromBottomTab = screenParam?.fromBottomTab;
  const [isLoading, setIsLoading] = useState(false);
  const [profileTypeList, setProfileTypeList] = useState([]);
  const [profileType, setProfileType] = useState('');
  const [fileDetails, setFileDetails] = useState('');
  const [profilename, setProfilename] = useState('');
  const [selectedRadioBtn, setSelectedRadioBtn] = useState(
    translations.ONE_OR_MORE_USERS,
  );
  const [description, setDescription] = useState('');
  const [dropDown, setDropDown] = useState({
    profileType: false,
    profile: false,
    uploadeFile: false,
  });
  const [profileTypeErr, setProfileTypeErr] = useState('');
  const [profileNameErr, setProfileNameErr] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const {keyboardShown} = useKeyboard();
  const navigation = useNavigation();
  const {mutateAsync: getPrifileTypes} = useCgMutation<DataFilter>({
    key: DIRECTORY_FILTTER_BY_TYPE,
    url: DIRECTORY_FILTTER_BY_TYPE,
    offSuccessToast: true,
    method: MethodTypes.GET,
    disableLoader: true,
  });
  const canSendMsgToMoreThanOne = () => {
    //this functionalty was removed
    return false;
  };
  const getComposeMsgbody = () => {
    return {
      record_single_id: profilename?.id,
      profile_type: profileType?.id,
      profile_selection_type: PROFILE_SELECTION_TYPE.ONE_OR_MORE,
      message: description,
      record_images: fileDetails,
    };
  };
  const {mutateAsync: composeMsg} = useCgMutation({
    key: COMPOSE_MESSAGE,
    url: COMPOSE_MESSAGE,
    body: createFormData(getComposeMsgbody()),
    method: MethodTypes.Post,
    disableLoader: true,
    customHeader: {'Content-Type': 'multipart/form-data'},
    isJson: false,
  });
  useEffect(() => {
    getProfileList();
    if (screenParam?.isCommingFormProductDetails) {
      setProfileType({
        ...screenParam?.type,
        name: screenParam?.type?.name + 's',
      });
      setProfilename(screenParam?.name);
    }
  }, []);

  const getProfileList = async () => {
    try {
      setIsLoading(true);
      const res = await getPrifileTypes();

      if (res?.success) {
        const newArr = res.data.businessTypes.map(i => ({
          id: i.id,
          name: i.display_name,
          slug: i?.name,
        }));

        setProfileTypeList(newArr);

        if (isFromBottomTab) {
          const defaultItem = newArr.find(item =>
            item.slug?.toLowerCase().includes('pageant'),
          );

          if (defaultItem) {
            setProfileType(defaultItem);
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onItemSelection = (id, text) => {
    setProfilename({
      id,
      text,
    });
  };
  const checkFileType = fileName => {
    return (
      getFileExtension(fileName) === FILE_EXT.png ||
      getFileExtension(fileName) === FILE_EXT.gif ||
      getFileExtension(fileName) === FILE_EXT.doc ||
      getFileExtension(fileName) === FILE_EXT.jpeg ||
      getFileExtension(fileName) === FILE_EXT.zip ||
      getFileExtension(fileName) === FILE_EXT.rar ||
      getFileExtension(fileName) === FILE_EXT.pdf ||
      getFileExtension(fileName) === FILE_EXT.docx
    );
  };
  const onImageFound = data => {
    if (
      data.type === FILE_TYPE.png ||
      data.type === FILE_TYPE.gif ||
      data.type === FILE_TYPE.doc ||
      data.type === FILE_TYPE.jpeg ||
      data.type === FILE_TYPE.zip ||
      data.type === FILE_TYPE.rar ||
      data.type === FILE_TYPE.pdf ||
      data.type === FILE_TYPE.docx ||
      checkFileType(data.name)
    ) {
      setFileDetails(data);
      setDropDown({
        ...dropDown,
        uploadeFile: false,
      });
    } else {
      toast(
        translations.UPLOAD_FILE_COMPOSE_MSG_ERR,
        toastType.ERROR_TOAST,
        false,
      );
    }
  };

  const getFileDisplayname = () => {
    if (
      fileDetails?.type === FILE_TYPE.png ||
      fileDetails?.type === FILE_TYPE.gif ||
      fileDetails?.type === FILE_TYPE.jpeg
    ) {
      return translations.IMAGE;
    } else {
      return translations.FILE;
    }
  };
  const onPressSubmit = async () => {
    if (
      isFormValid(
        profileType,
        setProfileTypeErr,
        profilename,
        setProfileNameErr,
        description,
        setDescriptionErr,
        selectedRadioBtn,
      )
    ) {
      setIsLoading(true);
      const res = await composeMsg();
      if (res.success) {
        navigation.goBack();
      }
      setIsLoading(false);
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  const commonFeildFocusFunc = (feildName: string) => {
    if (screenParam && screenParam.isCommingFormProductDetails) {
      // Do nothing or perform any desired action
      return '';
    } else {
      setDropDown({
        ...dropDown,
        [feildName]: true,
      });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.mainView}>
      <Loader isLoading={isLoading} />
      <View
        style={{opacity: screenParam?.isCommingFormProductDetails ? 0.5 : 1}}>
        <FloatingDropdown
          floatingText={translations.WHO_DO_YOU_WANT_TO_CONTACT}
          value={profileType?.name}
          isMandatory={true}
          errorMsg={profileTypeErr}
          onFieldFocus={() => commonFeildFocusFunc('profileType')}
        />
        <FloatingDropdown
          floatingText={translations.PROFILE_NAME}
          value={profilename?.text}
          isMandatory={true}
          errorMsg={profileNameErr}
          onFieldFocus={() => {
            if (isFeildValid(profileType?.id, setProfileTypeErr)) {
              commonFeildFocusFunc('profile');
            }
          }}
        />
      </View>

      <FloatingBigInput
        floatingText={translations.DESCRIPTION}
        value={description}
        returnKeyType={'done'}
        multiline={true}
        numberOfLines={5}
        textAlignVertical={'top'}
        lengthCheck={true}
        setText={value => setDescription(value)}
        forMultiline={true}
        autoCapitalize={'sentences'}
        showLength={false}
        errorMsg={descriptionErr}
        isMandatory={true}
        isMoreThan250={true}
        maxLength={500}
      />

      {fileDetails ? (
        <View>
          <Text style={styles.audioHeading}>{translations.UPLOADED}</Text>
          <View style={styles.clickable}>
            {getFileDisplayname() === translations.FILE ? (
              <AppImages.COMPOSE.tpp_document_icon />
            ) : (
              <AppImages.COMPOSE.tpp_image_icon />
            )}

            <Text style={styles.audioName}>{getFileDisplayname()}</Text>

            <TouchableOpacity
              style={styles.uploadImageInnerVIew}
              onPress={() => {
                setFileDetails('');
              }}>
              <AppImages.CreateContestentProfile.tpp_cross_small_icon
                width={16}
                height={16}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            setDropDown({
              ...dropDown,
              uploadeFile: true,
            })
          }
          style={styles.uploadView}>
          <AppImages.Common.UploadIcon
            height={moderateScaleVertical(36)}
            width={moderateScaleVertical(36)}
          />
          <Text style={styles.upload}>{translations.UPLOAD_FILE_TEXT}</Text>
        </TouchableOpacity>
      )}
      {!keyboardShown && (
        <View style={styles.btnView}>
          <CustomButton
            inactive
            label={translations.SUBMIT}
            onPress={onPressSubmit}
          />
        </View>
      )}
      <ImagePickerModal
        isModalVisible={dropDown.uploadeFile}
        setModalVisible={val => {
          setDropDown({
            ...dropDown,
            uploadeFile: val,
          });
        }}
        documentUpload={true}
        cropping={true}
        note={translations.DOC_ERROR}
        note2={`${translations.VALID_FORMAT_COMPOSE_MSG}`}
        onImageFound={onImageFound}
      />
      {dropDown.profileType && (
        <CustomBottomModal
          isModalVisible={dropDown.profileType}
          setIsModalVisible={val => {
            setDropDown({
              ...dropDown,
              profileType: val,
            });
          }}
          preSelectedValue={profileType?.id}
          data={profileTypeList}
          parentCallback={selectedText => {
            setProfileType(selectedText);
            setProfilename('');
            setSelectedRadioBtn(translations.ONE_OR_MORE_USERS);
          }}
          heading={translations.WHO_DO_YOU_WANT_TO_CONTACT}
        />
      )}

      {dropDown.profile && (
        <SearchTagOptions
          title={translations.SELECT + translations.PROFILE_NAME}
          isModalVisible={dropDown.profile}
          setIsModalVisible={val => {
            setDropDown({
              ...dropDown,
              profile: val,
            });
          }}
          params={profileType?.slug + Param.USER_OWNED + 'true'}
          preSelectedValue={profilename?.id}
          show_image={1}
          onItemSelect={onItemSelection}
          enableMultiSelect={canSendMsgToMoreThanOne()}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ComposeForm;
