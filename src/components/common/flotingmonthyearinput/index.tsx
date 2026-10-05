import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import FloatingDropdown from '../floatingdropown';
import AppImages from '../../../assets/images/AppImages';
import moment from 'moment';
import {checkIsNull} from '../../utils/validations';
import {TIME_FORMAT} from '../../utils/datetimemanger';
import MonthPicker from 'react-native-month-year-picker';
import {isIosDevice} from '../../utils/helperFunction';
import Modal from 'react-native-modal';

const FloatingMonthYearInput = ({
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
}) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const onValueChange = (event, newDate) => {
    const selectedDate = moment(newDate).format(TIME_FORMAT.MM_YY);
    setIsDateModalOpen(false);
    setText(selectedDate);
  };

  const onFocus = () => {
    setIsDateModalOpen(true);
    onFieldFocus();
  };

  return (
    <SafeAreaView>
      <FloatingDropdown
        floatingText={floatingText}
        value={value}
        rightIcon={<AppImages.Dashboard.HeaderDropdownIcon />}
        onFieldFocus={onFocus}
        isMandatory={isMandatory}
        errorMsg={errorMsg}
        opacity={opacity}
      />
      {isIosDevice() ? (
        <Modal
          isVisible={isDateModalOpen}
          backdropOpacity={0.2}
          useNativeDriver={false}
          animationIn={'fadeInUp'}
          animationOut={'fadeOutDown'}
          onBackButtonPress={() => setIsDateModalOpen(false)}
          keyboardShouldPersistTaps={'always'}
          style={{
            flex: 1,
            marginHorizontal: 0,
            marginVertical: 0,
            marginTop: '200%',
          }}>
          <View>
            <View>
              {isDateModalOpen && (
                <MonthPicker
                  maximumDate={setMaxDate()}
                  minimumDate={setMinDate()}
                  onChange={onValueChange}
                  value={
                    checkIsNull(value)
                      ? new Date(
                          Number(
                            moment(value, TIME_FORMAT.MM_YY).format(TIME_FORMAT.YYYY)
                          ),
                          Number(moment(value, TIME_FORMAT.MM_YY).format(TIME_FORMAT.MM))
                        )
                      : new Date()
                  }
                />
              )}
            </View>
          </View>
        </Modal>
      ) : (
        <View>
          <View>
            {isDateModalOpen && (
              <MonthPicker
                maximumDate={setMaxDate()}
                minimumDate={setMinDate()}
                onChange={onValueChange}
                value={
                  checkIsNull(value)
                    ? new Date(
                        (Number(
                          moment(value, TIME_FORMAT.MM_YY).format(TIME_FORMAT.YYYY)
                        ),
                        Number(moment(value, TIME_FORMAT.MM_YY).format(TIME_FORMAT.DD)))
                      )
                    : new Date()
                }
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FloatingMonthYearInput;
