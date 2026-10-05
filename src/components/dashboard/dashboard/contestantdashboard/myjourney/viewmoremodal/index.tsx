import React, {useState, useEffect} from 'react';
import {
  Text,
  GestureResponderEvent,
  View,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import translations from '../../../../../../assets/translations';
import {useShowStartModal} from '../../../../../../store/useAppStore';
import {color} from '../../../../../../assets/colorConstant';
import {ScrollView} from 'react-native-gesture-handler';
import {openWebLink} from '../../../../../utils/helperFunction';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import BottomModal from '../../../../../common/bottommodal';

interface Props {
  status: string;
  bodyText: string;
  buttonText: string;
  inactive?: boolean;
  isModalVisible: boolean;
  awardList: Array;
  pageantTitle: string;
  onPressDelete: any;
  gotTitle: string;
  todoHeading: string;
  todoText: string | undefined;
  createdBy: string;
  dueDate: string;
  Seconds: string;
  linkTitle: string;
  link: string;
  upload: boolean;
  UploadImage: any;
  uploadedFile: boolean;
  uploadedFileName: string;
  time: string;
  maxSize: string;
  isContestantTodo: boolean;
  location: string;
  startDate: string;
  startDateTime: string;
  closeModal: Function;
  onPressDone: (event: GestureResponderEvent) => void;
  hideMarkDone: boolean;
  setSelected: Function;
  onEditClick: (event: GestureResponderEvent) => void;
}

const ViewMoreModal = ({
  status,
  bodyText,
  maxLines = 1,
  icon,
  isModalVisible,
  createdBy,
  closeModal,
  todoHeading,
  todoText,
  dueDate,
  uploadedFile,
  Seconds,
  linkTitle,
  upload,
  UploadImage,
  uploadedFileName,
  link,
  time,
  maxSize,
  isContestantTodo = false,
  location,
  startDateTime,
  startDate,
  hideMarkDone = false,
  onPressDone,
  setSelected,
  onEditClick,
}: Props) => {
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const setShowModal = useShowStartModal();
  useEffect(() => {
    secondsToDhms(Seconds);
  }, [Seconds]);

  const secondsToDhms = sec => {
    let secNumber = Number(sec);
    const d = Math.floor(secNumber / (3600 * 24));
    const h = Math.floor((secNumber % (3600 * 24)) / 3600);
    const m = Math.floor((secNumber % 3600) / 60);
    const s = Math.floor(secNumber % 60);

    const dDisplay = d > 0 ? (d < 10 ? `0${d}` : d) : '00';
    setDays(dDisplay);
    const hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) : '00';
    setHours(hDisplay);
    const mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) : '00';
    setMinutes(mDisplay);
    const sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
    setSeconds(sDisplay);
  };

  const closeOpenModal = () => {
    if (!!closeModal) {
      closeModal(false);
    }
    setSelected(null);
    setShowModal(false);
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      backdropOpacity={0.45}
      onBackdropPress={closeOpenModal}>
      {status === translations.RECENT && !isContestantTodo ? (
        <View
          style={{
            alignSelf: 'center',
            position: 'relative',
            zIndex: 1,
            top: -moderateScaleVertical(23),
          }}>
          <AppImages.Common.TimerBanner />
          <View
            style={{
              flexDirection: 'column',
              position: 'absolute',
              justifyContent: 'center',

              alignSelf: 'center',
              alignContent: 'center',
            }}>
            <View style={styles.durationRow1}>
              <Text style={styles.duration}>{translations.DAY}</Text>
              <Text style={styles.duration}>{translations.HOUR}</Text>
              <Text style={styles.duration}>{translations.MIN}</Text>
              <Text style={styles.duration}>{translations.SEC}</Text>
            </View>
            <View style={styles.durationRow}>
              <Text style={styles.duration1}>{days}</Text>
              <Text style={styles.duration1}>:</Text>
              <Text style={styles.duration1}>{hours}</Text>
              <Text style={styles.duration1}>:</Text>
              <Text style={styles.duration1}>{minutes}</Text>
              <Text style={styles.duration1}>:</Text>
              <Text style={styles.duration1}>{seconds}</Text>
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.crossIcon} onPress={closeOpenModal}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
          {status && (
            <View style={styles.topRow}>
              <View
                style={{
                  ...styles.dateTag,
                  borderColor:
                    status === translations.PAST
                      ? color.S_GRAY_4
                      : status === translations.UPCOMING
                      ? color.UPCOMING
                      : color.RECENT,
                }}>
                <Text
                  style={{
                    ...styles.dateText,
                    color:
                      status === translations.PAST
                        ? color.S_GRAY_4
                        : status === translations.UPCOMING
                        ? color.UPCOMING
                        : color.RECENT,
                  }}>
                  {status}
                </Text>
              </View>
              {hideMarkDone && (
                <TouchableOpacity
                  onPress={() => onEditClick()}
                  activeOpacity={0}
                  style={{marginTop: moderateScaleVertical(12)}}>
                  <AppImages.Common.editCircle_ICON
                    width={moderateScale(22)}
                    height={moderateScaleVertical(22)}
                    style={styles.editCircleIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          <Text style={styles.toDoHeading}>{todoHeading}</Text>
          {location ? (
            <>
              {startDate && (
                <View style={styles.infoView}>
                  <AppImages.Common.schedul />
                  <Text style={styles.infoText}>
                    {translations.START_DATE_TIME}
                    {translations.COLON}
                    <Text
                      style={{
                        ...styles.infoText,
                        ...CommonStyles.tpp_p3,
                        color: color.INPUT_TEXT,
                      }}>
                      {' '}
                      {startDate} | {startDateTime}
                    </Text>
                  </Text>
                </View>
              )}
              <View style={styles.infoView}>
                <AppImages.Common.schedul />
                <Text style={styles.infoText}>
                  {translations.END_DATE_TIME}
                  {translations.COLON}
                  <Text
                    style={{
                      ...styles.infoText,
                      ...CommonStyles.tpp_p3,
                      color: color.INPUT_TEXT,
                    }}>
                    {' '}
                    {time ? `${dueDate} | ${time}` : dueDate}
                  </Text>
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.infoView}>
              <AppImages.Common.schedul />
              <Text style={styles.infoText}>
                {time ? translations.DUE_DATE_TIME : translations.DUE_DATE}
                <Text
                  style={{
                    ...styles.infoText,
                    ...CommonStyles.tpp_p3,
                    color: color.INPUT_TEXT,
                  }}>
                  {' '}
                  {time ? `${dueDate} | ${time}` : dueDate}
                </Text>
              </Text>
            </View>
          )}

          {!isContestantTodo && (
            <View
              style={{
                ...styles.iconRow,
                width: time ? null : moderateScale(175),
              }}>
              {/* doubt */}
              <View
                style={{
                  ...styles.infoView,
                  opacity: !isContestantTodo ? 1 : 0,
                }}>
                <AppImages.Common.avtar />
                <Text style={styles.infoText}>{createdBy}</Text>
              </View>
            </View>
          )}

          {upload ? (
            <View>
              <TouchableOpacity
                style={styles.uploadImageView}
                onPress={() => UploadImage()}>
                <AppImages.Common.Upload />
              </TouchableOpacity>
              <Text style={styles.infoText1}>
                {translations.MAX_SIZE}
                {maxSize}
              </Text>
            </View>
          ) : null}
          {uploadedFile ? (
            <View style={styles.uploadedImageView}>
              <Text style={styles.infoText2}>{translations.FILE_UPLOADED}</Text>
              <Text style={styles.infoText1}>
                {translations.CLICK_MYUPLOADS}
              </Text>
            </View>
          ) : null}
          {linkTitle ? (
            <TouchableOpacity
              onPress={() => (link !== null ? openWebLink(link) : null)}>
              <Text style={styles.linkTitle}>{linkTitle}</Text>
            </TouchableOpacity>
          ) : null}

          <ScrollView persistentScrollbar={true}>
            <Text style={styles.toDoText}>{todoText}</Text>
          </ScrollView>
        </View>
      </View>

      {!hideMarkDone && (
        <View style={styles.shadowView}>
          <View style={styles.paymentView}>
            <View style={styles.containerDelete}>
              <AppImages.Common.infoIcon />
              <Text style={styles.TodoInfo}>{translations.TODO_INFO}</Text>
            </View>

            <TouchableOpacity
              style={styles.containerConfirm}
              onPress={onPressDone}>
              <Text
                style={{
                  ...styles.borderButtonText,
                  textTransform: 'uppercase',
                }}>
                {translations.MARK_AS_DONE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </BottomModal>
  );
};

export default ViewMoreModal;
