import {View} from 'react-native';
import React, {useState} from 'react';
import FloatingDropdown from '../floatingdropown';
import AppImages from '../../../assets/images/AppImages';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {checkIsNull} from '../../utils/validations';
import {TIME_FORMAT, getCustomDateFormat} from '../../utils/datetimemanger';
import {isIosDevice} from '../../utils/helperFunction';

const FloatingDateTimeInput = ({
  floatingText = '',
  setText = () => {},
  value = '',
  isMandatory,
  onFieldFocus = () => {},
  setMaxDate = () => {},
  setMinDate = () => {},
  onChange = () => {},
  errorMsg = '',
  opacity = 1,
  isfeildInactive = false,
  frontEndFormat = TIME_FORMAT.DDMMYYYYHHMMA,
  mode = 'datetime',
  frontEndOnlyFormat = '',
}) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const hideDatepicker = () => {
    setIsDateModalOpen(false);
  };
  const onFocus = () => {
    !isfeildInactive && setIsDateModalOpen(true);
    onFieldFocus();
  };
  const onConfirm = val => {
    const selectedDate = moment(val).format(frontEndFormat);

    onChange(selectedDate);
    hideDatepicker();
  };

  return (
    <View>
      {isDateModalOpen && (
        <DateTimePicker
          maximumDate={setMaxDate()}
          minimumDate={setMinDate()}
          display={isIosDevice() ? 'inline' : 'default'}
          isVisible={isDateModalOpen}
          mode={mode}
          date={
            checkIsNull(value)
              ? new Date(
                  moment(value, frontEndFormat).format(TIME_FORMAT.YYYYMMDD),
                )
              : new Date()
          }
          onConfirm={val => onConfirm(val)}
          onCancel={hideDatepicker}
        />
      )}
      <FloatingDropdown
        floatingText={floatingText}
        setText={value => setText(value)}
        value={
          frontEndOnlyFormat
            ? getCustomDateFormat(
                value,
                TIME_FORMAT.DDMMYYYYHHMMA,
                TIME_FORMAT.MMslashDDslashYYYY_hhmmA,
              )
            : value
        }
        rightIcon={<AppImages.Dashboard.CalenderIcon />}
        onFieldFocus={onFocus}
        isMandatory={isMandatory}
        errorMsg={errorMsg}
        opacity={opacity}
      />
    </View>
  );
};

export default FloatingDateTimeInput;
