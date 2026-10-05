import {View, Text} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FloatingSmallDropdown from '../../../../../common/floatingsmalldropdown';
import {Filter} from '../../../../../../services/models/filterData';
import {TIME_FORMAT} from '../../../../../utils/datetimemanger';
import translations from '../../../../../../assets/translations';
import {isIosDevice} from '../../../../../utils/helperFunction';

interface Props {
  title: string;
  type: number | undefined;
  displayToDateBox?: boolean;
  currentMaxToDateActive?: boolean;
  fromDateTitle?: string;
  filter: Filter;
  onFromDateSelect: (date: string, tempDate: string) => void;
  onToDateSelect?: (date: string, tempDate: string) => void;
}

/* This is a react component which is used to show the list of countries and states. */
const DateTime = ({
  title,
  onFromDateSelect,
  onToDateSelect,
  fromDateTitle = '',
  displayToDateBox = false,
  currentMaxToDateActive = false,
  filter,
  type,
}: Props) => {
  const [maxDate, setMaxDate] = useState(new Date());
  const [currentFromDate, setCurrentFromDate] = useState(new Date());
  const [currentToDate, setCurrentToDate] = useState(new Date());
  const [isDateParamUpdate, setDateParamUpdate] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isToDateActive, setToDateActive] = useState(false);
  const [isMinDateActive, setMinDateActive] = useState(false);
  const [isMaxDateActive, setMaxDateActive] = useState(false);
  const [fromDateValue, setFromDateValue] = useState('');
  const [fromDateMinValue, setFromDateMinValue] = useState('');
  const [toDateMaxValue, setDateValue] = useState('');
  const [toDateValueForAPI, setSelectedToDateValue] = useState('');

  const hideDatepicker = () => {
    setIsDateModalOpen(false);
  };

  useEffect(() => {
    if (filter?.query !== undefined && filter?.query.length > 0) {
      if (displayToDateBox !== undefined && displayToDateBox) {
        try {
          if (filter.query.length > 1 && filter.query[1].includes('end_date')) {
            setDateValue(filter?.tempQuery!![1]);
            setCurrentToDate(new Date(filter?.tempQuery!![1]));
            setSelectedToDateValue(
              moment(new Date(filter?.tempQuery!![1])).format(
                TIME_FORMAT.MMDDYYYY,
              ),
            );
            setMaxDateActive(true);
          } else if (filter.query[0].includes('end_date')) {
            setDateValue(filter?.tempQuery!![0]);
            setCurrentToDate(new Date(filter?.tempQuery!![0]));
            setSelectedToDateValue(
              moment(new Date(filter?.tempQuery!![0])).format(
                TIME_FORMAT.MMDDYYYY,
              ),
            );
            setMaxDateActive(true);
          } else {
            setMaxDateActive(false);
          }
        } catch (error) {
          //empty
        }
      }

      try {
        if (filter.query[0].includes('start_date')) {
          setFromDateMinValue(filter?.tempQuery!![0]);
          setCurrentFromDate(new Date(filter?.tempQuery!![0]));
          setFromDateValue(
            moment(new Date(filter?.tempQuery!![0])).format(
              TIME_FORMAT.MMDDYYYY,
            ),
          );
          setMinDateActive(true);
        } else if (
          filter.query.length > 1 &&
          filter.query[1].includes('start_date')
        ) {
          setFromDateMinValue(filter?.tempQuery!![1]);
          setCurrentFromDate(new Date(filter?.tempQuery!![1]));
          setFromDateValue(
            moment(new Date(filter?.tempQuery!![1])).format(
              TIME_FORMAT.MMDDYYYY,
            ),
          );
          setMinDateActive(true);
        } else if (filter.query.length > 0 && !displayToDateBox) {
          setFromDateMinValue(filter?.tempQuery!![0]);
          setMinDateActive(true);
          setCurrentFromDate(new Date(filter?.tempQuery!![0]));
          setFromDateValue(
            moment(new Date(filter?.tempQuery!![0])).format(
              TIME_FORMAT.MMDDYYYY,
            ),
          );
        } else {
          setMinDateActive(false);
        }
      } catch (error) {
        //empty
      }
    } else if (displayToDateBox && currentMaxToDateActive) {
      setMaxDateActive(false);
      setMinDateActive(false);
      setMaxDate(new Date());
    }
  }, [type]);

  const onChange = (selectedDate: Date) => {
    if (!isIosDevice()) {
      setIsDateModalOpen(false);
    }
    const currentDate = selectedDate;
    const tempDate = new Date(currentDate);

    const fDate1 = moment(tempDate).format(TIME_FORMAT.MMDDYYYY);
    const calenderFormatDate = moment(tempDate).format(TIME_FORMAT.YYYYMMDD);
    if (isToDateActive) {
      setMaxDateActive(true);
      setSelectedToDateValue(fDate1);

      if (displayToDateBox) {
        setDateValue(calenderFormatDate);
      }

      if (onToDateSelect !== undefined) {
        onToDateSelect(fDate1, calenderFormatDate);
        setCurrentToDate(new Date(calenderFormatDate));
      }
    } else {
      setMinDateActive(true);

      setFromDateValue(fDate1);

      if (displayToDateBox) {
        setFromDateMinValue(calenderFormatDate);
      }
      setCurrentFromDate(new Date(calenderFormatDate));
      onFromDateSelect(fDate1, calenderFormatDate);
    }

    hideDatepicker();
    setDateParamUpdate(true);
    setTimeout(() => {
      setDateParamUpdate(false);
    }, 300);
  };

  return (
    <View>
      <Text style={styles.selectedText}>
        {title +
          (filter.searchTitle !== undefined
            ? filter.searchTitle
            : filter.title)}
      </Text>

      <FloatingSmallDropdown
        floatingText={fromDateTitle}
        value={fromDateValue}
        maxHeightBox={48}
        onFieldFocus={() => {
          if (isMaxDateActive) {
            setMaxDate(new Date(toDateMaxValue));
          }
          setToDateActive(false);
          setIsDateModalOpen(true);
        }}
        inputBottomMarginTop={!isIosDevice() ? -5 : -3}
        paddingHorizontalCustom={8}
        placeHolderBottomMargin={13}
        titleLaftMargin={8}
        leftIconWidth={50}
        fontSize={11}
        rightIcon={<AppImages.Dashboard.CalenderIcon width={14} hegith={14} />}
      />
      {displayToDateBox && (
        <FloatingSmallDropdown
          floatingText={translations.TO_DATE}
          maxHeightBox={48}
          value={toDateValueForAPI}
          onFieldFocus={() => {
            if (currentMaxToDateActive) {
              setMaxDate(new Date());
            }
            setToDateActive(true);
            setIsDateModalOpen(true);
          }}
          fontSize={11}
          paddingHorizontalCustom={8}
          inputBottomMarginTop={!isIosDevice() ? -5 : -3}
          titleLaftMargin={8}
          placeHolderBottomMargin={13}
          leftIconWidth={50}
          rightIcon={
            <AppImages.Dashboard.CalenderIcon width={14} hegith={14} />
          }
        />
      )}

      {!isDateParamUpdate && (
        <View>
          {(isMaxDateActive && !isToDateActive && !currentMaxToDateActive) ||
          (!displayToDateBox && !currentMaxToDateActive) ? (
            <DateTimePicker
              display={isIosDevice() ? 'inline' : 'default'}
              isVisible={isDateModalOpen}
              mode={'date'}
              maximumDate={maxDate}
              date={currentFromDate}
              onConfirm={onChange}
              onCancel={hideDatepicker}
            />
          ) : null}
          {isMinDateActive &&
            isToDateActive &&
            !currentMaxToDateActive &&
            displayToDateBox && (
              <DateTimePicker
                display={isIosDevice() ? 'inline' : 'default'}
                isVisible={isDateModalOpen}
                mode={'date'}
                date={currentToDate}
                minimumDate={new Date(fromDateMinValue)}
                onConfirm={onChange}
                onCancel={hideDatepicker}
              />
            )}
          {displayToDateBox &&
            !currentMaxToDateActive &&
            fromDateValue.length === 0 &&
            toDateValueForAPI.length === 0 && (
              <DateTimePicker
                display={isIosDevice() ? 'inline' : 'default'}
                isVisible={isDateModalOpen}
                mode={'date'}
                onConfirm={onChange}
                onCancel={hideDatepicker}
              />
            )}
          {displayToDateBox &&
          currentMaxToDateActive &&
          filter?.query === undefined ? (
            <DateTimePicker
              display={isIosDevice() ? 'inline' : 'default'}
              isVisible={isDateModalOpen}
              mode={'date'}
              maximumDate={maxDate}
              date={isToDateActive ? currentToDate : currentFromDate}
              onConfirm={onChange}
              onCancel={hideDatepicker}
            />
          ) : displayToDateBox &&
            currentMaxToDateActive &&
            filter?.query?.length === 1 &&
            isToDateActive ? (
            <DateTimePicker
              display={isIosDevice() ? 'inline' : 'default'}
              isVisible={isDateModalOpen}
              mode={'date'}
              maximumDate={maxDate}
              date={currentToDate}
              minimumDate={new Date(fromDateMinValue)}
              onConfirm={onChange}
              onCancel={hideDatepicker}
            />
          ) : (
            displayToDateBox &&
            currentMaxToDateActive &&
            // isMinDateActive &&
            !isToDateActive && (
              <DateTimePicker
                display={isIosDevice() ? 'inline' : 'default'}
                isVisible={isDateModalOpen}
                mode={'date'}
                maximumDate={maxDate}
                date={currentFromDate}
                onConfirm={onChange}
                onCancel={hideDatepicker}
              />
            )
          )}

          {isMinDateActive &&
            isToDateActive &&
            currentMaxToDateActive &&
            displayToDateBox &&
            fromDateMinValue !== undefined && (
              <DateTimePicker
                display={isIosDevice() ? 'inline' : 'default'}
                isVisible={isDateModalOpen}
                mode={'date'}
                maximumDate={maxDate}
                date={currentToDate}
                minimumDate={new Date(fromDateMinValue)}
                onConfirm={onChange}
                onCancel={hideDatepicker}
              />
            )}
        </View>
      )}
    </View>
  );
};

export default DateTime;
