import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {moderateScaleVertical, moderateScale} from '../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  status: string;
  dueDate: string;
  todoHeading: string;
  onViewMoreClick: any;
  time: any;
  locked: boolean;
  upload: boolean;
  uploadedFile: boolean;
  UploadImage: any;
  maxSize: string;
  onEditClick: any;
  onDeleteClick: any;
  location: string;
  startDate: string;
  startDateTime: any;
}
const ToDoListItem = ({
  status,
  todoHeading,
  onViewMoreClick,
  dueDate,
  time,
  locked,
  upload,
  uploadedFile,
  UploadImage,
  maxSize,
  onEditClick,
  onDeleteClick,
  location,
  startDate,
  startDateTime,
}: Props) => {
  const [expand] = useState(false);
  const [lessDescription] = useState(false);

  return (
    <>
      <View
        style={
          expand && !lessDescription
            ? {
                ...styles.openContainer,
                maxHeight: moderateScaleVertical(308),
                marginTop: moderateScaleVertical(0),
              }
            : {
                ...styles.closedContainer,
                maxHeight: moderateScaleVertical(228),
                marginTop: moderateScaleVertical(0),
              }
        }>
        {locked && (
          <View style={styles.lockedView}>
            <View style={{flexDirection: 'row'}}>
              <AppImages.Common.Lock />
              <Text style={styles.upgrade}>{translations.UPGRADE}</Text>
            </View>
          </View>
        )}
        <View
          style={
            locked
              ? {
                  ...styles.membership,
                  backgroundColor: color.TRANSPARNT,
                  opacity: 0.1,
                }
              : {
                  ...styles.membership,
                  backgroundColor: color.TRANSPARNT,
                  opacity: 1,
                }
          }>
          <TouchableOpacity
            onPress={() => onViewMoreClick()}
            style={styles.column}>
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
                  marginTop: moderateScaleVertical(12),
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
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => (locked ? null : onEditClick())}
                  activeOpacity={locked ? 1 : 0}>
                  <AppImages.Common.editCircle_ICON
                    width={moderateScale(22)}
                    height={moderateScaleVertical(22)}
                    style={styles.editCircleIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => (locked ? null : onDeleteClick())}
                  activeOpacity={locked ? 1 : 0}>
                  <AppImages.Common.MyUploadsDelete
                    width={moderateScale(20)}
                    height={moderateScaleVertical(20)}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text numberOfLines={expand ? 2 : 1} style={styles.toDoHeading}>
              {todoHeading}
            </Text>
            <View
              style={{
                ...styles.iconRow,
                width: time ? null : moderateScale(175),
              }}>
              {location ? (
                <>
                  {startDate && (
                    <View style={styles.infoView}>
                      <AppImages.Common.dateNew />
                      <Text style={styles.infoText}>
                        {translations.START_DATE_TIME}{translations.COLON}
                        <Text
                          style={{...styles.infoText, ...CommonStyles.tpp_p4}}>
                          {' '}
                          {startDate} {startDateTime}
                        </Text>
                      </Text>
                    </View>
                  )}
                  <View style={styles.infoView}>
                    <AppImages.Common.dateNew />
                    <Text style={styles.infoText}>
                      {translations.END_DATE_TIME}{translations.COLON}
                      <Text
                        style={{...styles.infoText, ...CommonStyles.tpp_p4}}>
                        {' '}
                        {dueDate} {time}
                      </Text>
                    </Text>
                  </View>
                </>
              ) : (
                <View style={styles.infoView}>
                  <AppImages.Common.dateNew />
                  <Text style={styles.infoText}>
                    {translations.DUE_DATE_TIME}{translations.COLON}
                    <Text style={{...styles.infoText, ...CommonStyles.tpp_p4}}>
                      {' '}
                      {dueDate} {time}
                    </Text>
                  </Text>
                </View>
              )}
            </View>

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
            {uploadedFile && (
              <View style={styles.uploadedImageView}>
                <Text numberOfLines={1} style={styles.infoText1}>
                  {translations.CLICK_MYUPLOADS}
                </Text>
              </View>
            )}

            <View>
              <Text style={styles.viewMore}>{translations.VIEW_MORE}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ToDoListItem;
