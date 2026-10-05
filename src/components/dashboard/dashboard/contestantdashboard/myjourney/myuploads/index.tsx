import {View, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import {styles} from './styles';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../../../../utils/responsiveSize';
import UploadedImages from '../../../../../common/uploadedimages';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  GET_TODO_UPLOADED_FILES_LIST,
  UPLOAD_IMAGE_DOCUMENT,
  DELETE_IMAGE_DOCUMENT,
} from '../../../../../../services/endpoints';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {downloadImage} from '../../../../../utils/downloadImage';
import ImagePickerModal from '../../../../../common/imagepickermodal';
import {
  checkIsConnected,
  createFormData,
} from '../../../../../utils/helperFunction';
import {toast, toastType} from '../../../../../common/commonalert';
import WarningModel from '../../../../../common/warningmodel';
import FloatingButton from '../../../../../common/floatingbutton';
import {FLOATING_ICON} from '../../../../../utils/enum';
import {ApiStatusType, MethodTypes, Param} from '../../../../../../services/constants';

const UploadedFiles = props => {
  const setLoader = useSetLoader();

  const [isModalVisible, setisModalVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);

  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [todo_upload_id, setTodo_upload_id] = useState('');
  const [uploadeBody, setUploadeBody] = useState({});

  const {mutateAsync: getToDoUploadedFiles} = useCgMutation({
    key: GET_TODO_UPLOADED_FILES_LIST,
    url:
      GET_TODO_UPLOADED_FILES_LIST +
      `${props.route.params.eventId}` +
      Param.TO_DO_ID +
      `${props.route.params.todoId}`,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  useEffect(() => {
    getUploadedFiles();
  }, []);
  const checkInterNet = () => {
    return checkIsConnected();
  };

  const getUploadedFiles = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const res = await getToDoUploadedFiles();
      if (res.success) {
        setListData(res.data.todo_documents);
      } else {
        setLoader(false);
      }
    }
  };
  const onPressEdit = id => {
    setTodo_upload_id(id);
    if (listData.length === 1) {
      setIsAlertModalVisible(true);
    } else {
      setIsWarningModalVisible(true);
    }
  };

  const {mutateAsync: uploadImage} = useCgMutation({
    key: UPLOAD_IMAGE_DOCUMENT,
    body: uploadeBody,
    url: UPLOAD_IMAGE_DOCUMENT,
    customHeader: {'Content-Type': 'multipart/form-data'},
    isJson: false,
  });
  const {mutateAsync: deleteImage} = useCgMutation({
    key: DELETE_IMAGE_DOCUMENT,
    method: MethodTypes.GET,
    url: DELETE_IMAGE_DOCUMENT + `${todo_upload_id}`,
    offSuccessToast: true,
  });
  const deleteImageFunc = async () => {
    setLoader(true);
    const res = await deleteImage();
    if (res.success || res.status_code === ApiStatusType.Error) {
      setLoader(false);
      getUploadedFiles();
    } else {
      setLoader(false);
    }
  };
  const uploadImageFunc = async () => {
    setLoader(true);

    const res = await uploadImage();
    if (res.success) {
      setLoader(false);
      setisModalVisible(false);

      getUploadedFiles();
    } else {
      setLoader(false);
    }
  };
  const imagePickerResult = data => {
    const details = {
      event_id: props.route.params.eventId,
      to_do_id: props.route.params.todoId,
      file: data,
    };
    if (details.file.size > props.route.params.allowedSize) {
      toast(
        `${translations.YOU_CANT_UPLOADE}${props.route.params.allowedSize}${translations.MB}`, 
        toastType.ERROR_TOAST,
      );
    } else if (
      details.file.type === 'application/pdf' ||
      details.file.type === 'application/zip' ||
      details.file.type ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      details.file.type === 'image/jpeg' ||
      details.file.type === 'image/png' ||
      details.file.type === 'audio/mpeg' ||
      details.file.type === 'video/mp4'
    ) {
      const body = createFormData(details);
      setUploadeBody(body);
      uploadImageFunc();
    } else {
      toast(translations.UPLOAD_FILE, toastType.ERROR_TOAST);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header lable={props?.route?.params?.todoName} isUnderLineRequired />
      {listData.length > 0 ? (
        <View
          keyboardShouldPersistTaps={true}
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              marginHorizontal: moderateScale(8),
              marginTop: moderateScaleVertical(16),
            }}>
            <FlatList
              data={listData}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              key={'@'}
              renderItem={item => {
                return (
                  <>
                    <UploadedImages
                      item={item}
                      imageUrl={item.item.document_file_url}
                      label={item?.item?.file_name}
                      onPressDownload={() => {
                        downloadImage(item.item.document_file_url);
                      }}
                      docType={item.item.file_type}
                      onPressEdit={() => onPressEdit(item?.item?.id)}
                    />
                  </>
                );
              }}
            />
          </View>
          <FloatingButton
            iconId={FLOATING_ICON.UPLOAD}
            onPress={() => setisModalVisible(true)}
          />
        </View>
      ) : (
        <View></View>
      )}
      <ImagePickerModal
        isModalVisible={isModalVisible}
        setModalVisible={setisModalVisible}
        documentUpload={true}
        cropping={true}
        note={`${translations.UPLOAD_IMAGE_DOCUMENT}${props?.route?.params?.allowedSize} MB`}
        note2={`${translations.VALID_FORMAT}`}
        onImageFound={imagePickerResult}
      />
      <WarningModel
        msg={translations.DELETE_SELECTED_FILE}
        isModalVisible={isWarningModalVisible}
        setConfirm={() => deleteImageFunc()}
        setIsModalVisible={setIsWarningModalVisible}
        headingStyle={styles.modalHeading}
      />

      <WarningModel
        msg={translations.ATLEAST_ONE_FILE}
        isModalVisible={isAlertModalVisible}
        setConfirm={() => setIsAlertModalVisible(false)}
        setIsModalVisible={setIsAlertModalVisible}
        headingStyle={styles.modalHeading}
      />
    </SafeAreaView>
  );
};

export default UploadedFiles;
