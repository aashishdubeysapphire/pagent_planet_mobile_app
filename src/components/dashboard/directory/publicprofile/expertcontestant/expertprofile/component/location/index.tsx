import {View, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import ExpertStoreTimingModal from './timingmodal';
import {
  Contestant,
  ExpertLocationTime,
  OperatingHourMultiple,
} from '../../../../../../../../services/models/pageantdetails/contestant';
import translations from '../../../../../../../../assets/translations';
import {getDateFormat} from '../../../../../../../utils/datetimemanger';
import {ROLES} from '../../../../../../../utils/enum';
import {AgeDivision} from '../../../../../../../../services/models/pageantdetails/ageDivision';

interface Props {
  selectedTab?: string;
  role: AgeDivision | undefined;
  contestant: Contestant | undefined;
}

const ExpertLocation = ({contestant, selectedTab, role}: Props) => {
  const [isTimingModalVisible, setTimingModalVisible] = useState(false);

  const [isRefresh, setRefresh] = useState(false);
  const [currentDay] = useState(getDateFormat(new Date(), 'dddd'));

  const [days, setDays] = useState<OperatingHourMultiple>();

  const getTodayTime = (weekTiming: ExpertLocationTime[]) => {
    if (weekTiming !== undefined) {
      for (const timing of weekTiming) {
        if (timing.isActive) {
          return timing.time;
        }
      }
    }
    if (contestant?.operating_hour_multiple !== undefined) {
      resetData();
    }
    return '';
  };

  const resetData = () => {
    if (contestant?.operating_hour_multiple !== undefined) {
      for (const locationTiming of contestant?.operating_hour_multiple) {
        addDayOfWeek(
          locationTiming.mon_from,
          locationTiming.mon_to,
          translations.Monday,
          locationTiming,
        );
        addDayOfWeek(
          locationTiming.tue_from,
          locationTiming.tue_to,
          translations.Tuesday,
          locationTiming,
        );
        addDayOfWeek(
          locationTiming.wed_from,
          locationTiming.wed_to,
          translations.Wednesday,
          locationTiming,
        );
        addDayOfWeek(
          locationTiming.thu_from,
          locationTiming.thu_to,
          translations.Thursday,
          locationTiming,
        );
        addDayOfWeek(
          locationTiming.fri_from,
          locationTiming.fri_to,
          translations.Friday,
          locationTiming,
        );
        addDayOfWeek(
          locationTiming.sat_from,
          locationTiming.sat_to,
          translations.Saturday,
          locationTiming,
        );
        addDayOfWeek(
          locationTiming.sun_from,
          locationTiming.sun_to,
          translations.Sunday,
          locationTiming,
        );
      }
    }
    setTimeout(() => {
      setRefresh(true);
    }, 200);
  };
  const addDayOfWeek = (
    fromTime: string,
    toTime: string,
    day: string,
    operatingHour: OperatingHourMultiple,
  ) => {
    let timing = '';
    if (
      (fromTime === null && toTime === null) ||
      (fromTime.length === 0 && toTime.length === 0)
    ) {
      timing = 'Closed: ';
    } else {
      timing = 'Open: ' + fromTime + ' - ' + toTime + ' ';
    }
    if (
      operatingHour.weekTiming === undefined ||
      operatingHour.weekTiming === null
    ) {
      operatingHour.weekTiming = [];
    }

    if (operatingHour.weekTiming.length < 7) {
      operatingHour.weekTiming.push({
        time: timing + day,
        isActive: currentDay === day,
      });
    }
  };

  useEffect(() => {
    resetData();
  }, []);

  useEffect(() => {
    if (days !== undefined) {
      setTimingModalVisible(true);
    }
  }, [days]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.locationTitle}>{translations.LOCATION}</Text>
      </View>

      {isRefresh &&
        contestant?.operating_hour_multiple?.map((i, index) => {
          return (
            <View style={styles.itemRootContainer}>
              <View style={styles.itemContainer}>
                <View
                  style={[
                    styles.icon,
                    {marginStart: moderateScaleVertical(2)},
                  ]}>
                  <AppImages.Dashboard.LocationIcon width={10} height={14} />
                </View>
                <Text style={styles.subHeadingLabel} ellipsizeMode="tail">
                  {i.address}
                </Text>
              </View>
              {(role !== undefined &&
                role.profile_type !== ROLES.EMCEE &&
                role.profile_type !== ROLES.JUDGE) ||
              (role === undefined &&
                selectedTab !== undefined &&
                selectedTab !== ROLES.EMCEE &&
                selectedTab !== ROLES.JUDGE) ? (
                <TouchableOpacity
                  onPress={() => {
                    if ((days !== undefined && i.id) === days?.id) {
                      setTimingModalVisible(true);
                    } else {
                      setDays(i);
                    }
                  }}
                  style={styles.itemContainer}>
                  <View style={styles.itemContainer}>
                    <View style={styles.icon}>
                      <AppImages.Dashboard.TimeIcon width={14} height={14} />
                    </View>
                    <Text style={styles.openContainer} ellipsizeMode="tail">
                      {getTodayTime(i.weekTiming).includes('Closed:')
                        ? 'Closed:'
                        : 'Open:'}
                      <Text style={styles.subHeadingLabel} ellipsizeMode="tail">
                        {getTodayTime(i.weekTiming)
                          .replace('Closed:', '')
                          .replace('Open:', '')}
                      </Text>
                    </Text>
                    <View style={styles.icon}>
                      <AppImages.Dashboard.downArrow_ICON
                        width={10}
                        height={6.43}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      <ExpertStoreTimingModal
        isModalVisible={isTimingModalVisible}
        setIsModalVisible={setTimingModalVisible}
        expertLocationTime={days}
        contestant={contestant}
      />
    </View>
  );
};

export default ExpertLocation;
