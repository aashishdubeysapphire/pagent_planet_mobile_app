import React, {useState, useEffect, memo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {moderateScaleVertical, moderateScale} from '../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  status: string;
  todoHeading: string;
  dueDate: string;
  createdBy: string;
  selected: boolean;
  onViewMoreClick: any;
  onBulletClick: any;
  Seconds: number;
  time: any;
  locked: boolean;
  isDirectorTodo: boolean;
  location: string;
  startDate: string;
  onBuyPlanClick: any;
}
const ToDoListItem = ({
  status,
  selected,
  todoHeading,
  onBulletClick,
  onViewMoreClick,
  createdBy,
  dueDate,
  Seconds,
  time,
  locked,
  isDirectorTodo = false,
  location,
  startDate,
  onBuyPlanClick,
}: Props) => {
  const [expand] = useState(false);
  const [toDays, setDays] = useState('');
  const [toDoHours, setHours] = useState('');
  const [toDoMinutes, setMinutes] = useState('');
  const [toDoSeconds, setSeconds] = useState('');
  const [lessDescription] = useState(false);

  useEffect(() => {
    secondsToDhms(Seconds);
  }, [Seconds]);

  const secondsToDhms = sec => {
    let secNumber = Number(sec);
    const toDoDay = Math.floor(secNumber / (3600 * 24));
    const toDoHour = Math.floor((secNumber % (3600 * 24)) / 3600);
    const toDoMinute = Math.floor((secNumber % 3600) / 60);
    const toDoSeceounds = Math.floor(secNumber % 60);

    const dDisplay =
      toDoDay > 0 ? (toDoDay < 10 ? `0${toDoDay}` : toDoDay) : '00';
    setDays(dDisplay + '');
    const hDisplay =
      toDoHour > 0 ? (toDoHour < 10 ? `0${toDoHour}` : toDoHour) : '00';
    setHours(hDisplay + '');
    const mDisplay =
      toDoMinute > 0 ? (toDoMinute < 10 ? `0${toDoMinute}` : toDoMinute) : '00';
    setMinutes(mDisplay + '');
    const sDisplay =
      toDoSeceounds > 0
        ? toDoSeceounds < 10
          ? `0${toDoSeceounds}`
          : toDoSeceounds
        : '00';
    setSeconds(sDisplay + '');
  };
  const getView = () => {
    return (
      <View style={styles.durationRow1}>
        <Text style={styles.duration}>{translations.DAY}</Text>
        <Text style={styles.duration}>{translations.HOUR}</Text>
        <Text style={styles.duration}>{translations.MIN}</Text>
        <Text style={styles.duration}>{translations.SEC}</Text>
      </View>
    );
  };
  return (
    <>
      {status === translations.RECENT && !locked && !isDirectorTodo ? (
        <View
          style={{
            alignSelf: 'center',
            position: 'relative',
            zIndex: 1,
          }}>
          <AppImages.Common.TimerBanner />
          <View style={styles.pinkViewStyles}>
            <View style={styles.durationRow1}>
              {getView()}
            </View>
            <View style={styles.durationRow}>
              <Text style={styles.duration1}>{toDays}</Text>
              <Text style={styles.duration1}>:</Text>
              <Text style={styles.duration1}>{toDoHours}</Text>
              <Text style={styles.duration1}>:</Text>
              <Text style={styles.duration1}>{toDoMinutes}</Text>
              <Text style={styles.duration1}>:</Text>
              <Text style={styles.duration1}>{toDoSeconds}</Text>
            </View>
          </View>
        </View>
      ) : null}

      <View
        style={
          expand && !lessDescription
            ? {
                ...styles.openContainer,
                maxHeight:
                  status === translations.RECENT && !locked && !isDirectorTodo
                    ? moderateScaleVertical(331)
                    : moderateScaleVertical(308),
                marginTop:
                  status === translations.RECENT && !locked && !isDirectorTodo
                    ? moderateScaleVertical(-24)
                    : moderateScaleVertical(0),
              }
            : {
                ...styles.closedContainer,
                maxHeight:
                  status === translations.RECENT && !locked && !isDirectorTodo
                    ? moderateScaleVertical(270)
                    : moderateScaleVertical(228),
                marginTop:
                  status === translations.RECENT && !locked && !isDirectorTodo
                    ? moderateScaleVertical(-24)
                    : moderateScaleVertical(0),
              }
        }>
        {locked && (
          <View style={styles.lockedViewRoot}>
            <AppImages.Common.TodoAccess />
            <View
              style={{
                flexDirection: 'row',
                marginTop: moderateScaleVertical(16),
              }}>
              <Text style={styles.upgrade}>{translations.UPGRADE}</Text>
            </View>
          </View>
        )}
        <View
          style={
            locked
              ? {
                  ...styles.toDoMemberShip,
                  backgroundColor: color.TRANSPARNT,
                  opacity: 0.1,
                }
              : {
                  ...styles.toDoMemberShip,
                  backgroundColor: color.TRANSPARNT,
                  opacity: 1,
                }
          }>
          <View style={styles.bulletView}>
            <TouchableOpacity
              style={selected ? styles.bulletSelected : styles.bulletUnselected}
              onPress={() => onBulletClick()}>
              {selected && <AppImages.Dashboard.tick_ICON />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.column}
            onPress={() => onViewMoreClick()}>
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
                  marginTop:
                    status === translations.RECENT && !locked && !isDirectorTodo
                      ? moderateScaleVertical(35)
                      : moderateScaleVertical(12),
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
            </View>
            <Text numberOfLines={expand ? 2 : 1} style={styles.toDoHeading}>
              {todoHeading}
            </Text>
            <View
              style={{
                ...styles.iconRow,
                width: '100%',
              }}>
              {location ? (
                <View style={{flexDirection: 'column'}}>
                  {startDate && (
                    <View style={styles.toDoInfoView}>
                      <AppImages.Common.dateNew />
                      <Text style={styles.infoText}>
                        {translations.START_DATE_TIME}
                        {translations.COLON}
                        <Text
                          style={{...styles.infoText, ...CommonStyles.tpp_p4}}>
                          {' '}
                          {startDate} | {time}
                        </Text>
                      </Text>
                    </View>
                  )}
                  <View style={styles.toDoInfoView}>
                    <AppImages.Common.dateNew />
                    <Text style={styles.infoText}>
                      {translations.END_DATE_TIME}
                      {translations.COLON}
                      <Text
                        style={{...styles.infoText, ...CommonStyles.tpp_p4}}>
                        {' '}
                        {dueDate} | {time}
                      </Text>
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.toDoInfoView}>
                  <AppImages.Common.dateNew />
                  <Text style={styles.infoText}>
                    {time ? translations.DUE_DATE_TIME : translations.DUE_DATE}
                    <Text style={{...styles.infoText, ...CommonStyles.tpp_p4}}>
                      {' '}
                      {time ? `${dueDate} | ${time}` : dueDate}
                    </Text>
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                ...styles.iconRow,
                width: moderateScale(175),
              }}>
              {!isDirectorTodo && (
                <View style={styles.toDoInfoView}>
                  <AppImages.Dashboard.UploadIcon />
                  <Text style={styles.infoText}>{createdBy}</Text>
                </View>
              )}
            </View>

            <View>
              <Text style={styles.viewMore}>View more</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default memo(ToDoListItem);
