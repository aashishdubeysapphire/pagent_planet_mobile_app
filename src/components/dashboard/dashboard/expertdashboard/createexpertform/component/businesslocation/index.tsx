import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FloatingDropdown from '../../../../../../common/floatingdropown';
import translations from '../../../../../../../assets/translations';
import SearchAdress from '../../../../../../common/searchaddress';
import {styles} from './styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  TIME_FORMAT,
  getDateFormat,
} from '../../../../../../utils/datetimemanger';
import {color} from '../../../../../../../assets/colorConstant';
import {hapticFeedBack} from '../../../../../../utils/helperFunction';
let firstSelectedTime = ['00:00', '00:00'];

const BusinessLocation = ({
  selectedLocation,
  setSelectedLocation,
  errorMsg,
  isjudgeOrEmcee,
  isEdit,
  setremovedLocation,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(0);
  const getDaysArr = () => {
    let arr: {day: string; isOpen: string; from: string; to: string}[] = [];
    let daysArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    daysArr.forEach(i => {
      arr.push({
        day: i,
        isOpen: translations.NO_SMALL,
        from: '00:00',
        to: '00:00',
      });
    });
    return arr;
  };

  const [count, setCount] = useState(0);
  const updateLocationObj = data => {
    setSelectedLocation(data);
    setCount(count + 1);
  };
  const onAddresss = (add: any, lat: any, lng: any, details: any) => {
    if (!!add) {
      if (!isEditing) {
        selectedLocation.push(getDaysObj(add, lat, lng));
      } else {
        let obj = selectedLocation;
        obj[index].name = add;
        obj[index].lat = lat;
        obj[index].lng = lng;
        setSelectedLocation(obj);
      }
    }
  };
  const getDaysObj = (add, lat, lng) => {
    return {
      name: add,
      lat,
      lng,
      days: getDaysArr(),
    };
  };
  const onPressEdit = indx => {
    setIsEditing(true);
    setIsModalVisible(true);
    setIndex(indx);
  };
  const onPressdelete = data => {
    let arr = selectedLocation.filter(i => {
      return i.name != data.name;
    });
    setremovedLocation(data.id);
    setSelectedLocation(arr);
  };
  const getNonEmptyErrorIndex = () => {
    const nonEmptyIndexes = !!errorMsg.locationTime
      ? errorMsg?.locationTime?.reduce(
          (reducerVar: any[], str: string, indexHere: any) => {
            if (str.trim() !== '') {
              reducerVar.push(indexHere);
            }
            return reducerVar;
          },
          [],
        )
      : '';
    return nonEmptyIndexes;
  };

  return (
    <View>
      {selectedLocation.length == 0 ? (
        <FloatingDropdown
          floatingText={translations.WHERE_IS_YOUR_BUSINESS_LOCATED}
          isMandatory={true}
          errorMsg={errorMsg?.selectedLocation}
          onFieldFocus={() => {
            setIsModalVisible(true);
          }}
        />
      ) : (
        <>
          <Text style={styles.heading}>
            {translations.WHERE_IS_YOUR_BUSINESS_LOCATED}
            <Text style={styles.pinkText}>*</Text>
          </Text>
          {!!errorMsg.locationTime[getNonEmptyErrorIndex()[0]] && (
            <View style={styles.rowView}>
              <AppImages.Common.Alert_ICON />
              <Text style={styles.error}>
                {errorMsg.locationTime[getNonEmptyErrorIndex()[0]]}
              </Text>
            </View>
          )}
          {selectedLocation.map(
            (itm: any, selectedLocIndex: React.Key | null | undefined) => {
              return (
                <Locationcard
                  key={selectedLocIndex}
                  item={itm}
                  isEdit={isEdit}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={updateLocationObj}
                  locationIndex={selectedLocIndex}
                  isjudgeOrEmcee={isjudgeOrEmcee}
                  onPressEdit={onPressEdit}
                  errorMsg={errorMsg}
                  NonEmptyErrorIndex={getNonEmptyErrorIndex()[0]}
                  onPressdelete={onPressdelete}
                  setremovedLocation={setremovedLocation}
                />
              );
            },
          )}
        </>
      )}
      <SearchAdress
        isModalVisible={isModalVisible}
        setIsModalVisible={val => {
          setIsModalVisible(val);
        }}
        onItemSelect={onAddresss}
      />
    </View>
  );
};
const Locationcard = ({
  item,
  isEdit,
  selectedLocation,
  setSelectedLocation,
  locationIndex,
  isjudgeOrEmcee,
  onPressEdit,
  errorMsg,
  NonEmptyErrorIndex,
  onPressdelete,
}) => {
  const getExpandedState = () => {
    if (isEdit) {
      if (selectedLocation.length === 1) {
        return true;
      }
      return (
        !!errorMsg.locationTime[NonEmptyErrorIndex] &&
        locationIndex == NonEmptyErrorIndex
      );
    } else {
      return true;
    }
  };
  let conditonalIsExpanded = getExpandedState();
  useEffect(() => {
    conditonalIsExpanded = getExpandedState();
    setIsExpanded(conditonalIsExpanded);
  }, [errorMsg.locationTime]);

  const [isExpanded, setIsExpanded] = useState(conditonalIsExpanded);
  useEffect(() => {
    return () => {
      firstSelectedTime = ['00:00', '00:00'];
    };
  }, []);

  return (
    <TouchableOpacity
      style={styles.continer}
      activeOpacity={1}
      onPress={() => !isExpanded && setIsExpanded(!isExpanded)}>
      <View style={styles.rowView}>
        <Text style={styles.heading}>
          {translations.LOCATION} {isEdit ? locationIndex + 1 : ''}
        </Text>

        <TouchableOpacity
          style={isjudgeOrEmcee ? {} : styles.editIcon}
          onPress={() => onPressEdit(locationIndex)}>
          <AppImages.Common.editCircle_ICON />
        </TouchableOpacity>
        {item?.is_addtional_address == translations.YES && (
          <TouchableOpacity
            style={isjudgeOrEmcee ? {} : styles.editIcon}
            onPress={() => onPressdelete(item)}>
            <AppImages.Common.MyUploadsDelete
              width={moderateScale(24)}
              height={moderateScaleVertical(24)}
            />
          </TouchableOpacity>
        )}
        {!isjudgeOrEmcee && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <AppImages.EditProfile.Tpp_dropdown_pink
                width={moderateScale(14)}
                height={moderateScaleVertical(14)}
                style={styles.arrowColaps}
              />
            ) : (
              <AppImages.Common.tpp_dropdown_thick
                width={moderateScale(14)}
                height={moderateScaleVertical(14)}
                style={styles.arrowColaps}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.whiteLocation}>
        <Text style={styles.whiteLocationText}>{item.name}</Text>
      </View>
      {isExpanded && !isjudgeOrEmcee && (
        <>
          <Text style={styles.openingHoursText}>
            {translations.ADD_OPENING_HOURS}
            <Text style={styles.pinkText}>*</Text>
          </Text>
          {!!errorMsg.locationTime[locationIndex] && (
            <View style={styles.rowView}>
              <AppImages.Common.Alert_ICON />
              <Text style={styles.error}>
                {errorMsg.locationTime[locationIndex]}
              </Text>
            </View>
          )}

          <View style={[styles.rowView, styles.marTop16]}>
            <Text style={[styles.subHeading, styles.marRight28]}>
              Select Days
            </Text>
            <Text style={[styles.subHeading, styles.marRight90]}>
              {translations.FROM}
            </Text>
            <Text style={styles.subHeading}>{translations.TO}</Text>
          </View>
          <View style={styles.line}></View>
          {item?.days.map((i, index) => {
            return (
              <IsOpenCloseView
                key={index}
                data={i}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                dayIndex={index}
                locationIndex={locationIndex}
              />
            );
          })}
        </>
      )}
    </TouchableOpacity>
  );
};

const IsOpenCloseView = ({
  data,
  selectedLocation,
  setSelectedLocation,
  dayIndex = 0,
  locationIndex = 0,
}) => {
  const getInitialTimeValue = () => {
    const allOpen = selectedLocation[locationIndex].days.filter(
      i => i.isOpen == translations.YES,
    );
    if (allOpen.length == 1) {
      const timeFilled = allOpen.filter(i => {
        return i.from != '00:00' || i.to != '00:00';
      });
      if (timeFilled.length == 1) {
        firstSelectedTime = [timeFilled[0].from, timeFilled[0].to];
      }
    } else if (allOpen.length == 0) {
      firstSelectedTime = ['00:00', '00:00'];
    }
  };
  const onPressToggle = val => {
    hapticFeedBack();
    getInitialTimeValue();

    let obJ = selectedLocation;
    obJ[locationIndex].days[dayIndex].isOpen = val;
    if (val !== translations.YES) {
      obJ[locationIndex].days[dayIndex].from = '00:00';
      obJ[locationIndex].days[dayIndex].to = '00:00';
    } else {
      obJ[locationIndex].days[dayIndex].from = firstSelectedTime[0];
      obJ[locationIndex].days[dayIndex].to = firstSelectedTime[1];
    }

    setSelectedLocation(obJ);
  };
  const getOnPressToggle = () => {
    return selectedLocation[locationIndex]?.days[dayIndex]?.isOpen ===
      translations.YES
      ? translations.NO_SMALL
      : translations.YES;
  };
  return (
    <View style={[styles.rowView, styles.marTop18]}>
      <TouchableOpacity
        style={[styles.toggleStyle, styles.marRight28]}
        onPress={() => onPressToggle(getOnPressToggle())}
        activeOpacity={1}>
        {data?.isOpen === translations.YES ? (
          <AppImages.Drawer.tpp_toggle_btnON />
        ) : (
          <AppImages.Drawer.tpp_toggle_btnOFF />
        )}
        <Text
          style={[
            styles.dayText,
            data?.isOpen === translations.YES ? styles.open : styles.close,
          ]}>
          {data?.day}
        </Text>
      </TouchableOpacity>
      <TimeView
        data={data}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        dayIndex={dayIndex}
        locationIndex={locationIndex}
        feild={'from'}
      />
      <View style={styles.marLeft8}>
        <TimeView
          data={data}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          dayIndex={dayIndex}
          locationIndex={locationIndex}
          feild={'to'}
        />
      </View>
    </View>
  );
};

const TimeView = ({
  data,
  selectedLocation,
  setSelectedLocation,
  dayIndex = 0,
  locationIndex = 0,
  feild = 'from',
}) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const hideDatepicker = () => {
    setIsDateModalOpen(false);
  };
  const onConfirm = val => {
    let oBj = selectedLocation;
    oBj[locationIndex].days[dayIndex][feild] = getDateFormat(
      val,
      TIME_FORMAT.HH_MM,
    );
    hideDatepicker();

    setSelectedLocation(oBj);
  };
  const getPrefilleTime = () => {
    if (data[feild] != '00:00') {
      let d = '2013-02-08 ' + data[feild];
      return new Date(d);
    } else {
      return new Date();
    }
  };
  return (
    <>
      {isDateModalOpen && (
        <DateTimePicker
          is24Hour={true}
          locale="en_GB"
          isVisible={isDateModalOpen}
          mode={'time'}
          date={getPrefilleTime()}
          onConfirm={val => onConfirm(val)}
          onCancel={hideDatepicker}
          accentColor={color.P_PINK}
          display={'spinner'}
          minuteInterval={30}
        />
      )}
      <TouchableOpacity
        style={[
          styles.timeView,
          styles.rowView,
          {backgroundColor: color.S_GRAY_1},
          data?.isOpen !== translations.YES && {
            opacity: 0.4,
          },
          data[feild] !== '00:00' && {backgroundColor: color.WHITE},
        ]}
        onPress={() =>
          data?.isOpen === translations.YES && setIsDateModalOpen(true)
        }>
        <Text
          style={[
            styles.timeText,
            data?.isOpen == translations.YES && {
              color: color.S_GRAY_4,
            },
            data[feild] !== '00:00' && {
              color: color.BLACK,
            },
          ]}>
          {data[feild]}
        </Text>
        <View style={styles.arrowColaps}>
          <AppImages.Common.blackClock
            width={moderateScale(14)}
            height={moderateScale(14)}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default BusinessLocation;
