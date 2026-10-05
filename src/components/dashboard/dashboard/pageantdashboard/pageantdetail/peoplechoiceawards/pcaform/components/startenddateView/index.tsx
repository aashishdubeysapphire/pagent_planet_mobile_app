import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import translations from '../../../../../../../../../assets/translations';
import FloatingDropdown from '../../../../../../../../common/floatingdropown';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import styles from './styles';
import FloatingDateTimeInput from '../../../../../../../../common/floatingdatetimeinput';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import {GET_PCA_TIMEZONE_DATA} from '../../../../../../../../../services/endpoints';
import {checkIsConnected} from '../../../../../../../../utils/helperFunction';
import CustomBottomModal from '../../../../../../../../common/custombottommodal';
import {
  getDateFormat,
  getESTDateTime,
  TIME_FORMAT,
} from '../../../../../../../../utils/datetimemanger';
import {MethodTypes} from '../../../../../../../../../services/constants';
import Loader from '../../../../../../../../common/customloader';
import OpenChildAnimation from '../../../../../../../../common/openchildanimation';

const StartEndDateView = ({pcaData, onChangePcaData, pcaError}) => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getTimeZoneData();
  }, []);

  const [isTimeZoneConvertorVisible, setIsTimeZoneConvertorVisible] =
    useState(false);
  const [dateTime, setDateTime] = useState(
    getDateFormat(new Date(), TIME_FORMAT.MMslashDDslashYYYY_hhmmA),
  );
  const [timeZone, setTimeZone] = useState({
    id: 49,
    abbr: 'EST',
    text: '(UTC+02:00) Cairo (EST)',
    utc: 'Africa/Cairo',
    offset: 2,
    value: 'Egypt Standard Time',
  });
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [isTimeZoneModalVisible, setIsTimeZoneModalVisible] = useState(false);
  const {mutateAsync: getPCATimezoneData} = useCgMutation({
    key: GET_PCA_TIMEZONE_DATA,
    method: MethodTypes.GET,
    url: GET_PCA_TIMEZONE_DATA,
    offSuccessToast: true,
    disableLoader: true,
  });
  const getTimeZoneData = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      const res = await getPCATimezoneData();
      if (res.success) {
        setTimeZoneList(res.data?.timezone);
      }
      setLoader(false);
    }
  };

  return (
    <View style={{marginBottom: moderateScaleVertical(10)}}>
      <Loader isLoading={loader} />
      <View style={styles.flexRow}>
        <Text style={styles.heading}>{translations.START_END_DATE}</Text>
        <Text
          style={styles.subheading}
          onPress={() => {
            setIsTimeZoneConvertorVisible(!isTimeZoneConvertorVisible);
          }}>
          {translations.TIME_ZONE_CONVERTER}
        </Text>
      </View>
      <OpenChildAnimation
        isVisible={isTimeZoneConvertorVisible}
        child={
          <>
            <View style={styles.uparrow}>
              <AppImages.Dashboard.up_arrow_ICON width={20} height={20} />
            </View>
            <View style={styles.pinkView}>
              <FloatingDateTimeInput
                floatingText={translations.DATE_AND_TIME}
                onChange={value => setDateTime(value + '')}
                value={dateTime}
                frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}
              />
              <FloatingDropdown
                floatingText={translations.SELECT_YOUR_TIMEZONE}
                value={timeZone?.text}
                onFieldFocus={() => {
                  setIsTimeZoneModalVisible(true);
                }}
              />
              <CustomBottomModal
                isModalVisible={isTimeZoneModalVisible}
                setIsModalVisible={val => setIsTimeZoneModalVisible(val)}
                data={timeZoneList}
                preSelectedValue={timeZone.id}
                parentCallback={selectedText => {
                  setTimeZone(selectedText);
                  getESTDateTime();
                }}
                heading={translations.SELECT_YOUR_TIMEZONE}
              />

              <Text style={styles.greyText}>
                {translations.CONVERTED_DATE_TIME_EST}
              </Text>
              <Text style={styles.blackText}>
                {getESTDateTime(dateTime, timeZone.utc)}
              </Text>
            </View>
          </>
        }
      />
      {/* <Animated.View style={{opacity: opacity, maxHeight: maxHeight}}>
        {isTimeZoneConvertorVisible && (
          <>
            <View style={styles.uparrow}>
              <AppImages.Dashboard.up_arrow_ICON width={20} height={20} />
            </View>
            <View style={styles.pinkView}>
              <FloatingDateTimeInput
                floatingText={translations.DATE_AND_TIME}
                onChange={value => setDateTime(value + '')}
                value={dateTime}
              />
              <FloatingDropdown
                floatingText={translations.SELECT_YOUR_TIMEZONE}
                value={timeZone?.text}
                onFieldFocus={() => {
                  setIsTimeZoneModalVisible(true);
                }}
              />
              <CustomBottomModal
                isModalVisible={isTimeZoneModalVisible}
                setIsModalVisible={val => setIsTimeZoneModalVisible(val)}
                data={timeZoneList}
                preSelectedValue={timeZone.id}
                parentCallback={selectedText => {
                  setTimeZone(selectedText);
                  getESTDateTime();
                }}
                heading={translations.SELECT_YOUR_TIMEZONE}
              />

              <Text style={styles.greyText}>
                {translations.CONVERTED_DATE_TIME_EST}
              </Text>
              <Text style={styles.blackText}>
                {getESTDateTime(dateTime, timeZone.utc)}
              </Text>
            </View>
          </>
        )}
      </Animated.View> */}

      <View style={styles.main}>
        <FloatingDateTimeInput
          floatingText={translations.START_DATE_TIME_EST}
          onChange={value => onChangePcaData({startDate: value + ''})}
          value={
            // pcaData.startDate
            //   ? moment(pcaData.startDate,"yyyy-mm-dd")
            //       .format(TIME_FORMAT.MMslashDDslashYYYY_hhmmA)
            // : ''
            pcaData.startDate
          }
          frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}
          errorMsg={pcaError?.startDate}
          isMandatory
        />
        <FloatingDateTimeInput
          floatingText={translations.END_DATE_TIME_EST}
          onChange={value => {
            onChangePcaData({endDate: value + ''});
          }}
          value={
            // pcaData.endDate
            //   ? moment(
            //       pcaData.endDate,
            //       TIME_FORMAT.DDslashMMslashYYYY_hhmmA,
            //     ).format(TIME_FORMAT.MMslashDDslashYYYY_hhmmA)
            // :
            pcaData.endDate
          }
          frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}
          errorMsg={pcaError?.endDate}
          isMandatory
        />
      </View>
    </View>
  );
};

export default StartEndDateView;
