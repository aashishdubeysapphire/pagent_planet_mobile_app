import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import {styles} from './style';
import ToggleView from './component/toggleview';
import {MANAGE_NOTIFICATION_STATUS} from '../../../../services/endpoints';
import {MethodTypes} from '../../../../services/constants';
import useCgMutation from '../../../../services/api/useCgMutation';
import {Base} from '../../../../services/models/base';
import Loader from '../../../common/customloader';
import {trackScreenView} from '../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';
const TYPES = {
  SET: 1,
  GET: 2,
};
const ManageNotification = () => {
  const [toDO, settoDO] = useState(false);
  const [convo, setConvo] = useState(false);
  const [taggedImg, setTaggedImg] = useState(false);
  const [leadEmail, setLeadEmail] = useState(false);
  const [contactLead, setContactLead] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleList, setToggleList] = useState([]);
  const {mutateAsync: getNotificationStatus} = useCgMutation<Base>({
    key: MANAGE_NOTIFICATION_STATUS,
    method: MethodTypes.GET,
    url: MANAGE_NOTIFICATION_STATUS,
    disableLoader: false,
    offSuccessToast: true,
  });
  const setNotificationStatus = (val, status, type = TYPES.SET) => {
    switch (val) {
      case translations.MY_TODO:
        if (type == TYPES.SET) {
          settoDO(status == 1 ? true : false);
        } else {
          return toDO;
        }
        break;
      case translations.MY_CONVO:
        if (type == TYPES.SET) {
          setConvo(status == 1 ? true : false);
        } else {
          return convo;
        }
        break;
      case translations.TAGGED_IMG:
        if (type == TYPES.SET) {
          setTaggedImg(status == 1 ? true : false);
        } else {
          return taggedImg;
        }
        break;
      case translations.LEAD_EMAIL_NOTIFICATION:
        if (type == TYPES.SET) {
          setLeadEmail(status == 1 ? true : false);
        } else {
          return leadEmail;
        }
        break;
      case translations.CONTACT_LEADS_AUTO:
        if (type == TYPES.SET) {
          setContactLead(status == 1 ? true : false);
        } else {
          return contactLead;
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    notificationStauts();
    trackScreenView(ANALYTICS_SCREEN.MANAGE_NOTIFICATION);
  }, []);

  const notificationStauts = async () => {
    setIsLoading(true);
    const response = await getNotificationStatus();

    if (response.success) {
      setToggleList(response?.data);
      response?.data.map(i => {
        setNotificationStatus(i.label, i.status);
      });
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={styles.continer}>
      <Header lable={translations.MANAGE_NOTIFICATION} isUnderLineRequired />
      <Loader isLoading={isLoading} />
      <View style={styles.rowView}>
        <Text style={styles.note}>{translations.NOTE} </Text>
        <Text style={[styles.noteText]}>
          {translations.EMAIL_NOTIFICATION_NOTES}
        </Text>
      </View>
      {toggleList.map(i => {
        return (
          <ToggleView
            isON={setNotificationStatus(i?.label, '', TYPES.GET)}
            slug={i?.name}
            lable={i?.label}
            setIsON={val => setNotificationStatus(i?.label, val, TYPES.SET)}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default ManageNotification;
