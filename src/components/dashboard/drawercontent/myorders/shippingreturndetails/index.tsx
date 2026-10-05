import {View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import Header from '../../../../common/header';
import FloatingDropdown from '../../../../common/floatingdropown';
import FloatingInput from '../../../../common/floatinginput';
import FloatingDateTimeInput from '../../../../common/floatingdatetimeinput';
import CustomBottomModal from '../../../../common/custombottommodal';
import CustomButton from '../../../../common/button';
import {TIME_FORMAT} from '../../../../utils/datetimemanger';
import moment from 'moment';
import {removeEojies} from '../../../../utils/validations';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {
  ADD_SHIPPING_DETAILS,
  GET_SHIPPING_SERVICES_LIST,
} from '../../../../../services/endpoints';
import {COMPNAY_ENUM, MethodTypes} from '../../../../../services/constants';
import Loader from '../../../../common/customloader';
import {isValid} from './validations';
import {checkIsConnected} from '../../../../utils/helperFunction';
import {useNavigation} from '@react-navigation/core';
import {ORDER_FROM} from '../../../../utils/enum';

export default function ShippingReturnDetails(props) {
  const {id, from} = props?.route?.params;
  const navigation = useNavigation();
  const [courierCompnayModal, setCourierCompnayModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    courierCompany: '',
    otherCourierServiceName: '',
    date: '',
    trackingId: '',
  });
  const [errorMsg, setErrorMsg] = useState({
    courierCompany: '',
    otherCourierServiceName: '',
    date: '',
    trackingId: '',
  });
  const [courierCompanyList, setCourierCompanyList] = useState([]);
  const {mutateAsync: getShippingServicesList} = useCgMutation<Base>({
    key: GET_SHIPPING_SERVICES_LIST,
    method: MethodTypes.GET,
    url: GET_SHIPPING_SERVICES_LIST,
    disableLoader: true,
    offSuccessToast: true,
  });
  const getKeyforReturnForm = () => {
    if (from == ORDER_FROM.SELLER) {
      return '0';
    } else {
      return '1';
    }
  };
  const {mutateAsync: addShippingDetails} = useCgMutation<Base>({
    key: ADD_SHIPPING_DETAILS,
    method: MethodTypes.Post,
    url: ADD_SHIPPING_DETAILS,
    body: {
      order_item_id: id,
      courier_service: data?.courierCompany?.id,
      expected_date: moment(data.date, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
        TIME_FORMAT.YYYYMMDD
      ),
      other_courier: data.otherCourierServiceName,
      tracking_id: data.trackingId,
      is_return: getKeyforReturnForm(),
    },
    disableLoader: true,
  });
  useEffect(() => {
    hitGetShippingServicesList();
  }, []);

  const hitGetShippingServicesList = async () => {
    if (checkIsConnected()) {
      setIsLoading(true);
      const response = await getShippingServicesList();

      if (response.success) {
        setCourierCompanyList(response.data);
      }
      setIsLoading(false);
    }
  };

  const hitAddShippingDetails = async () => {
    if (checkIsConnected()) {
      setIsLoading(true);
      const response = await addShippingDetails();

      if (response.success) {
        navigation.goBack();
      }
      setIsLoading(false);
    }
  };
  const onChangeData = val => {
    setData({
      ...data,
      ...val,
    });
  };

  const onPressSubmit = () => {
    if (isValid(data, setErrorMsg)) {
      hitAddShippingDetails();
    }
  };
  return (
    <SafeAreaView style={styles.continer}>
      <Loader isLoading={isLoading} />
      <Header
        lable={
          (from == ORDER_FROM.SELLER
            ? translations.SHIPPING + ' '
            : translations.RETURN) + translations.DETAILS
        }
        isUnderLineRequired
      />
      <View style={styles.feidlsView}>
        <FloatingDropdown
          floatingText={translations.COURIER_COMPANY}
          value={data?.courierCompany?.name}
          isMandatory={true}
          onFieldFocus={() => {
            setCourierCompnayModal(true);
          }}
          errorMsg={errorMsg.courierCompany}
        />
        {data?.courierCompany?.id == COMPNAY_ENUM.OTHER && (
          <FloatingInput
            floatingText={translations.OTHER_COURIER_SERVICE_NAME}
            setText={val =>
              onChangeData({otherCourierServiceName: removeEojies(val)})
            }
            value={data.otherCourierServiceName}
            isMandatory={true}
            returnKeyType={'done'}
            maxLength={50}
            errorMsg={errorMsg.otherCourierServiceName}
          />
        )}
        {data?.courierCompany?.id == COMPNAY_ENUM.IN_PERSON && (
          <FloatingDateTimeInput
            mode="date"
            floatingText={translations.EXPETED_DATE}
            isMandatory
            onChange={val =>
              onChangeData({
                date: moment(val, TIME_FORMAT.DDMMYYYYHHMMA).format(
                  TIME_FORMAT.DDmilnusMMmilusYYYY
                ),
              })
            }
            setMinDate={() => {
              return new Date();
            }}
            value={data.date}
            errorMsg={errorMsg.date}
          />
        )}

        {data?.courierCompany?.id !== COMPNAY_ENUM.IN_PERSON && (
          <FloatingInput
            floatingText={translations.TRACKING_ID}
            setText={val => onChangeData({trackingId: removeEojies(val)})}
            value={data.trackingId}
            isMandatory={true}
            returnKeyType={'done'}
            errorMsg={errorMsg.trackingId}
          />
        )}
      </View>
      <View style={styles.submitView}>
        <CustomButton
          inactive
          label={translations.SUBMIT}
          onPress={onPressSubmit}
        />
      </View>
      <CustomBottomModal
        isModalVisible={courierCompnayModal}
        setIsModalVisible={setCourierCompnayModal}
        data={courierCompanyList}
        preSelectedValue={data?.courierCompany?.id}
        parentCallback={selectedText => {
          onChangeData({
            courierCompany: selectedText,
            otherCourierServiceName: '',
            date: '',
            trackingId:
              selectedText?.id == COMPNAY_ENUM.IN_PERSON ? '' : data.trackingId,
          });
          setErrorMsg({});
        }}
        heading={translations.SELECT + translations.COURIER_COMPANY}
      />
    </SafeAreaView>
  );
}
