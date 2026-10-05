import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import {styles} from './styles';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {moderateScale} from '../../../../../utils/responsiveSize';
import FastImageView from '../../../../../common/fastimageview';
import AppImages from '../../../../../../assets/images/AppImages';
import ToDoListItem from '../../../../../common/todolistitem';
import WarningModel from '../../../../../common/warningmodel';
import {
  GET_TODO_DATA,
  MARK_TODO_DONE,
  UPLOAD_IMAGE_DOCUMENT,
} from '../../../../../../services/endpoints';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {SCREEN} from '../../../../../../root/screenname';
import ViewMoreModal from '../viewmoremodal';
import BackgroundTimer from 'react-native-background-timer';
import CustomButton from '../../../../../common/button';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../common/commonalert';
import {useSetLoader} from '../../../../../../store/useAppStore';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import ImagePickerModal from '../../../../../common/imagepickermodal';
import NoRecord from '../../../../../common/norecord';
import moment from 'moment';
import WelcomeModal from '../../../chooseprofiletype/welcomemodal';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../../../services/constants';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import Shimmer from '../../../../../common/shimmer';
import {TIME_FORMAT} from '../../../../../utils/datetimemanger';
import {FILE_TYPE} from '../../../../../utils/enum';
import {
  hapticFeedBack,
  isIosDevice,
  trackScreenView,
} from '../../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../../assets/translations/analyticsscreenname';
const menuData = [
  {
    title: translations.ALL,
    id: 1,
  },
  {
    title: translations.BY_DIRECTOR,
    id: 2,
  },
  {
    title: translations.BY_PAGEANT_PLANET,
    id: 3,
  },
];
const ToDoScreen = props => {
  const setLoader = useSetLoader();
  const [modalVisible, setModalVisible] = useState(false);
  const [toDoModalVisible, setToDoModalVisible] = useState(false);
  const [label, setLabel] = useState(
    props.route.params.event_directors_todo === 0
      ? translations.BY_PAGEANT_PLANET
      : translations.BY_DIRECTOR,
  );
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [todoHeadin, setTodoHeadin] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [todosList, setTodosList] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [startdate, setStartdate] = useState('');
  const [uploadImageBody, setUploadImageBody] = useState(null);
  const [time, setTime] = useState('');
  const [globalTimer, setGlobalTimer] = useState(0);
  const netInfo = useNetInfo();
  const [uploadedFile, setUploadedFile] = useState(false);
  const [Seconds, setSeconds] = useState('');
  const [image, setImage] = useState('');
  const [filterby, setFilterby] = useState('');
  const [profileId, setProfileId] = useState('');
  const [contestantId, setContestantId] = useState('');
  const [activeMembershipPlan, setActiveMembershipPlan] = useState('');
  const [upload, setUpload] = useState(false);
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadFilesCount, setUploadFilesCount] = useState(null);
  const [timeZone, setTimeZone] = useState('');
  const [dueDateSort, setDueDateSort] = useState('');
  const [allowed_size, setAllowed_size] = useState('');
  const eventId = props.route.params.pageant_id;
  const [itemSize, setItemSize] = useState(Number);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [itemStartDate, setItemStartDate] = useState('');
  const handleMenuOnPress = (title: string) => {
    setLabel(title);
    {
      title === translations.BY_DIRECTOR
        ? setFilterby('ed')
        : title === translations.BY_PAGEANT_PLANET
        ? setFilterby('pp')
        : setFilterby(null);
    }

    setModalVisible(false);
  };

  const {mutateAsync: uploadImage} = useCgMutation({
    key: UPLOAD_IMAGE_DOCUMENT,
    body: uploadImageBody,
    url: UPLOAD_IMAGE_DOCUMENT,
    customHeader: {'Content-Type': 'multipart/form-data'},
    isJson: false,
    offSuccessToast: true,
  });

  useEffect(() => {
    timerFunc();
  }, [globalTimer]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.TODO);
  }, []);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        getDetails();
      } else {
        internetState(netInfo.isConnected!!);
      }
    });
  }, [filterby]);
  const onConfirm = () => {
    setUploadModalVisible(false);
    setTimeout(() => {
      setIsModalVisible(true);
    }, 400);
  };
  const getRemainingTimeAndroid = val => {
    const due_date_to_sort_todo = `${val}` + ' ' + '23:59:59';

    const local = moment(due_date_to_sort_todo)
      .utc()
      .format(TIME_FORMAT.Utc_format1);

    const dueDate1 = new Date(local).getTime() / 1000;
    const currentDate = new Date();
    const local1 = moment(currentDate).utc().format(TIME_FORMAT.Utc_format1);
    const currentTime = new Date(local1).getTime() / 1000;
    const remainingTime = dueDate1 - currentTime;

    return remainingTime;
  };
  const timerFunc = () => {
    BackgroundTimer.stopBackgroundTimer();

    BackgroundTimer.runBackgroundTimer(() => {
      setGlobalTimer(globalTimer + 1);
    }, 1000);
  };
  const checkInterNet = () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    }

    return true;
  };
  const createFormData = (formValues: {[x: string]: any}) => {
    const form_data = new FormData();

    for (const key in formValues) {
      form_data.append(key, formValues[key]);
    }

    return form_data;
  };
  const uploadImageFunc = async () => {
    if (checkInterNet()) {
      setLoader(true);

      const res = await uploadImage();
      if (res.success || res.status_code === ApiStatusType.Error) {
        setLoader(false);
        setIsModalVisible(false);
        setSelected(null);
        if (viewMoreModalVisible) {
          setViewMoreModalVisible(false);
        }
        getDetails();

        setIsUploadModalVisible(true);

        setLoader(false);
      }
    }
  };
  const imagePickerResult = data => {
    const details = {
      event_id: props.route.params.pageant_id,
      to_do_id: todoId,
      file: data,
    };

    if (details.file.size > allowed_size) {
      toast(
        `${translations.YOU_CANT_UPLOADE}${allowed_size}${translations.MB}`,
        toastType.ERROR_TOAST,
      );
    } else if (
      details.file.type === FILE_TYPE.pdf ||
      details.file.type === FILE_TYPE.zip ||
      details.file.type === FILE_TYPE.docx ||
      details.file.type === FILE_TYPE.jpeg ||
      details.file.type === FILE_TYPE.png ||
      details.file.type === FILE_TYPE.mpeg
    ) {
      const body = createFormData(details);
      setUploadImageBody(body);
      uploadImageFunc();
    } else {
      toast(translations.UPLOAD_FILE, toastType.ERROR_TOAST);
    }
  };
  useEffect(() => {
    setItemSize(Dimensions.get('window').width - moderateScaleVertical(32));
    getDetails();
  }, []);
  const updateModelState = item => {
    setTodoId(item?.id);
    setTodoName(item?.name ? item?.name : item?.todo_category?.name);
    setIsModalVisible(!isModalVisible);
    setAllowed_size(item?.file_allowed_size);
  };
  const getDate = val => {
    return moment(val, TIME_FORMAT.YYYYMMDD).format(TIME_FORMAT.DD_MMM);
  };
  const getRemainingTime = val => {
    const due_date_to_sort_todo = `${val}` + ' ' + '23:59:59';

    // Treat the string as local time
    const d = new Date(due_date_to_sort_todo.replace(/-/g, '/'));
    const remainDueDate = new Date(d).getTime() / 1000;
    const currentDate = new Date().getTime() / 1000;
    const remainingTime = remainDueDate - currentDate;

    return remainingTime;
  };

  const {mutateAsync: getToDoDetails, isLoading} = useCgMutation({
    key:
      GET_TODO_DATA +
      `${props.route.params.pageant_id}` +
      Param.FILTER_BY +
      `${filterby}`,
    method: MethodTypes.GET,
    url:
      GET_TODO_DATA +
      `${props.route.params.pageant_id}` +
      Param.FILTER_BY +
      `${filterby}`,
    offSuccessToast: true,

    disableLoader: true,
  });
  const updatedBody = {
    contestant_id: contestantId,
    profile_id: profileId,
    to_do_id: todoId,
    marked_as_complete: translations.NO_SMALL,
  };
  const {mutateAsync: markTodoComplete} = useCgMutation({
    key: MARK_TODO_DONE,
    url: MARK_TODO_DONE,
    body: updatedBody,
    offSuccessToast: false,
  });
  const markTodoDoneApi = async () => {
    if (upload) {
      setViewMoreModalVisible(false);
      setSelected(null);
      toast(
        translations.UPLOAD_A_FILE +
          ' ' +
          todoName +
          ' ' +
          translations.TO_MARK_DONE,
        toastType.ERROR_TOAST,
      );
    } else {
      setLoader(true);

      const res = await markTodoComplete();
      if (res.success) {
        setLableAsPerFiler();
        getDetails();

        if (viewMoreModalVisible) {
          setViewMoreModalVisible(false);
        }
      } else {
        setLoader(false);
      }
    }
  };
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  const setLableAsPerFiler = () => {
    if (todosList?.length == 1) {
      setLabel(translations.ALL);
    }
  };
  const getDetails = async () => {
    const res = await getToDoDetails();
    if (res.success || res.status_code === ApiStatusType.Error) {
      setTodosList(res?.data?.todosList);
      setEventTitle(res?.data?.currentUpcomingEventData?.title);
      setStartdate(res?.data?.currentUpcomingEventData?.start_date);
      setImage(res?.data?.currentUpcomingEventData?.main_image);
      setProfileId(res?.data?.currentUpcomingEventData?.id);
      setContestantId(res?.data?.contestant_id);
      setActiveMembershipPlan(res?.data?.contestantActiveMembershipPackage);
      setUploadFilesCount(res?.data?.todoUploadFilesCount);
      setTimeZone(res?.data?.currentUpcomingEventData?.event_timezone_abbr);
    }
  };
  const onBulletClick = item => {
    if (
      (selected !== null && (selected === null) !== undefined && selected) ===
      item.id
    ) {
      setSelected(null);
    } else {
      setSelected(item.id);

      setTodoId(item.id);
      setAllowed_size(item.file_allowed_size);
      setTodoName(item?.name ? item?.name : item?.todo_category?.name);
      setUpload(
        item?.file_allowed === translations.YES &&
          item?.todo_file_upload.length < 1
          ? true
          : false,
      );
      if (
        item?.file_allowed === translations.YES &&
        item?.todo_file_upload.length < 1
      ) {
        setUploadModalVisible(true);
      } else {
        setToDoModalVisible(true);
      }
    }
    hapticFeedBack();
  };

  const onViewMoreClick = item => {
    setStatus(item?.todo_status);
    setTodoId(item?.id);
    setDescription(item?.description);
    setTodoHeadin(item?.name ? item?.name : item?.todo_category?.name);
    setCreatedBy(item?.created_by_id_status);
    setSeconds(item?.remaining_time);
    setUploadedFileName(item?.todo_file_upload[0]?.file_name);
    setItemStartDate(
      item?.start_date_to_sort_todo
        ? getDate(item?.start_date_to_sort_todo)
        : null,
    );

    setDueDate(getDate(item?.due_date_to_sort_todo));
    setDueDateSort(item?.due_date_to_sort_todo);
    setUpload(
      item?.file_allowed === translations.YES &&
        item?.todo_file_upload.length < 1
        ? true
        : false,
    );
    setUploadedFile(
      item?.file_allowed === translations.YES &&
        item?.todo_file_upload.length > 0
        ? true
        : false,
    );
    setLink(item?.link);
    setLocation(item?.location_address);
    setLinkTitle(item?.title_for_link);
    setAllowed_size(item?.file_allowed_size);
    setTime(
      item?.due_date_time
        ? `${item?.due_date_time}` + ' ' + `${timeZone}`
        : null,
    );

    setViewMoreModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        statusBarTranslucent={true}
        transparent={true}
        animationType="fade"
        visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
          style={styles.outerview}>
          <TouchableOpacity activeOpacity={1} style={styles.innerview}>
            <FlatList
              data={menuData}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={item => (
                <TouchableOpacity
                  onPress={() => {
                    handleMenuOnPress(item?.item?.title);
                  }}
                  style={styles.cardTouch}>
                  <View style={styles.cardRow}>
                    <Text
                      style={
                        label === item?.item?.title
                          ? styles.staticSelectedCardLable
                          : styles.staticCardLable
                      }>
                      {item?.item?.title}
                    </Text>
                    {label === item?.item?.title ? (
                      <View style={{width: moderateScale(20)}}>
                        <AppImages.Dashboard.tick_ICON />
                      </View>
                    ) : (
                      <View style={{width: moderateScale(20)}}></View>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Header lable={translations.TODOS} isUnderLineRequired />
      <View
        keyboardShouldPersistTaps={true}
        style={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.viewContainer}>
          <View style={[styles.listContainer]}>
            <View style={styles.circleContainer}>
              {isLoading && image?.length === 0 ? (
                <Shimmer
                  width={moderateScaleVertical(60)}
                  height={moderateScaleVertical(60)}
                  borderRadius={moderateScaleVertical(60)}
                />
              ) : (
                <FastImageView
                  width={moderateScaleVertical(60)}
                  height={moderateScaleVertical(60)}
                  borderRadius={moderateScaleVertical(60)}
                  imageUrl={image}
                  isCircle
                />
              )}
            </View>

            <View style={{width: '81%'}}>
              {isLoading && eventTitle.length === 0 ? (
                <View>
                  <Shimmer
                    width={itemSize / 1.4}
                    height={9}
                    borderRadius={5}
                    bottomSpace={5}
                  />
                  <Shimmer width={itemSize / 2} borderRadius={5} height={7} />
                </View>
              ) : null}
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.editTitle}>
                {eventTitle}
              </Text>
              {startdate ? (
                <View style={styles.infoView}>
                  <AppImages.Dashboard.DateIconMedium_ICON />
                  <Text style={styles.infoText}>Due {getDate(startdate)}</Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.todosRow}>
            <Text style={styles.title}>{translations.TODOS}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AppImages.Common.filter />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ShimmerList
              width={itemSize}
              height={moderateScaleVertical(150)}
              padding={15}
              borderRadius={10}
            />
          ) : (
            <>
              {todosList?.length > 0 ? (
                <FlatList
                  data={todosList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id.toString()}
                  ListFooterComponent={listFooterComponent}
                  removeClippedSubviews={true} // Unmount components when outside of window
                  initialNumToRender={2} // Reduce initial render amount
                  maxToRenderPerBatch={1} // Reduce number in each render batch
                  updateCellsBatchingPeriod={1} // Increase time between renders
                  windowSize={70} // Reduce the window size
                  renderItem={item => {
                    return (
                      <ToDoListItem
                        status={item?.item?.todo_status}
                        onBulletClick={() => onBulletClick(item?.item)}
                        todoHeading={
                          item?.item?.name
                            ? item?.item?.name
                            : item?.item?.todo_category?.name
                        }
                        uploadedFileName={
                          item?.item?.todo_file_upload[0]?.file_name
                        }
                        locked={
                          item?.item?.has_membership === 1 &&
                          activeMembershipPlan === translations.NO_SMALL
                            ? true
                            : false
                        }
                        upload={
                          item?.item?.file_allowed === translations.YES &&
                          item?.item?.todo_file_upload.length < 1
                            ? true
                            : false
                        }
                        location={item?.item?.location_address}
                        uploadedFile={
                          item?.item?.file_allowed === translations.YES &&
                          item?.item?.todo_file_upload.length > 0
                            ? true
                            : false
                        }
                        time={
                          item?.item?.due_date_time
                            ? `${item?.item?.due_date_time}` +
                              ' ' +
                              `${timeZone}`
                            : null
                        }
                        link={item?.item?.link}
                        Seconds={
                          item?.item?.created_by_id_status ===
                          translations.BY_DIRECTOR
                            ? item?.item?.remaining_time - globalTimer
                            : isIosDevice()
                            ? getRemainingTime(
                                item?.item?.due_date_to_sort_todo,
                              )
                            : getRemainingTimeAndroid(
                                item?.item?.due_date_to_sort_todo,
                              )
                        }
                        createdBy={item?.item?.created_by_id_status}
                        startDate={
                          item?.item?.start_date_to_sort_todo
                            ? getDate(item?.item?.start_date_to_sort_todo)
                            : null
                        }
                        dueDate={getDate(item?.item?.due_date_to_sort_todo)}
                        linkTitle={item?.item?.title_for_link}
                        todoText={item?.item?.description}
                        selected={selected === item?.item?.id ? true : false}
                        onViewMoreClick={() => onViewMoreClick(item?.item)}
                        UploadImage={() => updateModelState(item?.item)}
                        maxSize={`${
                          item?.item?.todo_category?.name ===
                            translations.TALENT_MUSIC ||
                          item?.item?.todo_category?.name ===
                            translations.AD_PAGE
                            ? 20
                            : 15
                        } MB`}
                      />
                    );
                  }}
                />
              ) : (
                <View style={styles.noRecordContainer}>
                  <NoRecord rightIcon={<AppImages.Common.NoRecordIcon />} />
                </View>
              )}
            </>
          )}
          {uploadFilesCount > 0 && (
            <View style={styles.containerLogin}>
              <CustomButton
                label={translations.MY_UPLOADS}
                inactive
                onPress={() =>
                  props.navigation.navigate(SCREEN.MY_UPLOADS, eventId)
                }
                upload
              />
            </View>
          )}
          <WarningModel
            msg={`${translations.MARK} "${todoName}" ${translations.AS_DONE}`}
            isModalVisible={toDoModalVisible}
            setConfirm={() => markTodoDoneApi()}
            setCancel={() => setSelected(null)}
            setIsModalVisible={setToDoModalVisible}
            headingStyle={styles.modalLabel}
            isTodoModal={true}
          />
          <WarningModel
            msg={`${translations.UPLOAD_A_FILE} "${todoName}" ${translations.TO_MARK_DONE}`}
            isModalVisible={uploadModalVisible}
            setConfirm={() => onConfirm()}
            setCancel={() => setSelected(null)}
            yesButtonText={translations.UPLOAD}
            setIsModalVisible={setUploadModalVisible}
            headingStyle={styles.modalLabel}
            isTodoModal={true}
          />
          <ViewMoreModal
            status={status}
            todoHeading={todoHeadin}
            todoText={description}
            createdBy={createdBy}
            Seconds={
              createdBy === translations.BY_DIRECTOR
                ? Seconds - globalTimer
                : isIosDevice()
                ? getRemainingTime(dueDateSort)
                : getRemainingTimeAndroid(dueDateSort)
            }
            dueDate={dueDate}
            time={time}
            isModalVisible={viewMoreModalVisible}
            link={link}
            upload={upload}
            location={location}
            maxSize={`${allowed_size}MB`}
            uploadedFileName={uploadedFileName}
            uploadedFile={uploadedFile}
            UploadImage={() => {
              setViewMoreModalVisible(false);
              setTimeout(() => {
                setIsModalVisible(true);
              }, 1000);
            }}
            linkTitle={linkTitle}
            closeModal={setViewMoreModalVisible}
            onPressDelete={() => {}}
            onPressDone={() => markTodoDoneApi()}
            setSelected={setTodoId}
            startDate={itemStartDate}
            startDateTime={time}
          />
          <WelcomeModal
            label={translations.UPLOAD_HEADING_TEXT}
            bodyText={`${translations.UPLOAD_BODY_TEXT}'${todoName}'${translations.UNDER_MY_UPLOAD}`}
            icon={
              <AppImages.Common.tickIcon
                width={moderateScale(72)}
                height={moderateScaleVertical(72)}
              />
            }
            isModalVisible={isUploadModalVisible}
            buttonText={`${translations.MY_UPLOADS?.toUpperCase()}`}
            isUploadModal={true}
            customStyles={styles.modalButtonBottom}
            giveStaticHeight={false}
            closeModal={setIsUploadModalVisible}
            eventId={eventId}
          />
          <ImagePickerModal
            isModalVisible={isModalVisible}
            setModalVisible={setIsModalVisible}
            documentUpload={true}
            cropping={false}
            note={`${translations.UPLOAD_IMAGE_DOCUMENT}${allowed_size} MB`}
            note2={`${translations.VALID_FORMAT}`}
            onImageFound={imagePickerResult}
            uncheckCheckBox={() => setSelected(null)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ToDoScreen;
