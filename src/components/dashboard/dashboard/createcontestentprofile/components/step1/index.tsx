import {View, Text} from 'react-native';
import React, {memo, useState} from 'react';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import FloatingInput from '../../../../../common/floatinginput';
import FloatingDropdown from '../../../../../common/floatingdropown';
import {
  DESCRIPTION,
  EVENT_TYPE,
  MASTERDATA,
  PLACEMENT,
} from '../../../../../utils/enum';
import AppImages from '../../../../../../assets/images/AppImages';

import HeadShotImage from '../../../../../common/headshotimage';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  GET_AGE_DEVISION_BY_PAGEANT,
  GET_EVENT_LIST_BY_NAME_AND_YEAR,
  GET_MASTER_DATA,
} from '../../../../../../services/endpoints';

import CustomBottomModal from '../../../../../common/custombottommodal';
import {useEffect} from 'react';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {useIsFocused} from '@react-navigation/native';
import {checkIsNull, removeEmojis} from '../../../../../utils/validations';
import moment from 'moment';
import DynamicradioButton from '../../../../../common/dynamicradiobutton/dynamicradioButton';
import WarningModel from '../../../../../common/warningmodel';
import CustomBottomModalWithApi from '../custombottommodalwithApi';
import {
  description,
  eventType,
  placement,
} from '../../../../../utils/localarray';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import MultiSelectinput from '../../../../../common/multiselectinput';
import WeightModal from '../../../../../common/weightmodal';
import {
  checkIsConnected,
  hapticFeedBack,
  isIosDevice,
  removeMiddleSpaces,
} from '../../../../../utils/helperFunction';
import {COMPNAY_ENUM, MethodTypes, Param} from '../../../../../../services/constants';
import {TIME_FORMAT} from '../../../../../utils/datetimemanger';
import {AgeDivisionById} from '../../../../../../services/models/constantsForm/agedivisionbyid';
import {toastError} from '../../../../../common/commonalert';
const Step1 = ({
  step_one,
  onChangeStepOne,
  focused = false,
  isNextPressed,
  setCurrentStep,
  setisNextPressed,
  editScrenView = false,
  isEditable = true,
  hitAddContestantDetailsApi,
  isAdditionalInfoScreen = false,
  eventState,
  scrollRef,
  setEventState,
}) => {
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    !isAdditionalInfoScreen && setEventState(0);
    removeAllError();
  }, [isFocused]);

  useEffect(() => {
    if (!isEditable) {
      setAreDatesEditable(false);
    }
    if (isNextPressed) {
      validate();
      setisNextPressed(false);
    }
  }, [isNextPressed]);

  useEffect(() => {
    onEndDateChange(step_one.endDate);
  }, [step_one.endDate]);
  useEffect(() => {
    if (editScrenView) {
      if (step_one.endDate === '' || step_one.endDate === null) {
        onChangeYear(step_one.year);
      }
    }
  }, [step_one.year.name, step_one.endDate]);

  useEffect(() => {
    if (step_one.awards.find(item => item.id === COMPNAY_ENUM.OTHER) === undefined) {
      onChangeStepOne({nameOfTheAward: ''});
      setnameOfTheAwardError('');
    }
  }, [step_one.awards]);
  useEffect(() => {
    if (step_one.description !== DESCRIPTION.TITLE_AWARDED) {
      setnameOfTheTitleError('');
      onChangeStepOne({nameOfTheTitle: ''});
    }
  }, [step_one.description]);
  const [nameOfPaegeantModalVisibe, setnameOfPaegeantModalVisibe] =
    useState(false);
  const [changeEventModalVisible, setChangeEventModalVisible] = useState(false);
  const [, setGetAwaredsLength] = useState(0);
  useState(false);
  const [startDateErr, setStartDateErr] = useState('');
  const [endDateErr, setEndDateErr] = useState('');
  const [isModalVisible, setIsModalVisible] = useState({
    years: false,
    weight: false,
    awards: false,
    description: false,
    event: false,
    age: false,
  });
  const [modalList, setmodalList] = useState({
    years: [{}],
    weight: [{}],
    awards: [{}],
    event: [{}],
    age: [{}],
  });
  const [dataSourceCords, setDataSourceCords] = useState({});

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [isEndDateSelected, setIsEndDateSelected] = useState(false);
  const [areDatesEditable, setAreDatesEditable] = useState(true);
  //ValidationVariable

  const [nameOfPageantError, setNameOfPageantError] = useState('');
  const [yearError, setyearError] = useState('');
  const [eventError, setEventError] = useState('');
  const [ageDevisionError, setAgeDevisionError] = useState('');
  const [nameOfTheTitleError, setnameOfTheTitleError] = useState('');
  const [nameOfTheAwardError, setnameOfTheAwardError] = useState('');

  useEffect(() => {
    getMasterData();
  }, [focused]);
  useEffect(() => {
    setGetAwaredsLength(step_one?.awards?.length);
  }, [step_one?.awards]);
  const onChanegEventType = (val, ispressed = false) => {
    if (ispressed) {
      setChangeEventModalVisible(true);
      hapticFeedBack();
      return;
    }
    onChangeStepOne({eventType: val});
  };
  const checkInterNet = () => {
    return checkIsConnected();
  };
  const removeAllError = () => {
    setNameOfPageantError('');
    setyearError('');
    setEventError('');
    setAgeDevisionError('');
    setnameOfTheAwardError('');
    setnameOfTheTitleError('');
  };
  const onConfirm = () => {
    if (step_one.eventType === EVENT_TYPE.PAST) {
      onChangeStepOne({
        nameOfPageant: {title: ''},
        eventType: EVENT_TYPE.UPCOMING,
        placement: PLACEMENT.NONE,
        year: {name: ''},
        weight: {name: '', slug: ''},
        awards: [],
        description: {name: ''},
        event: {title: ''},
        age: {name: ''},
        startDate: '',
        endDate: '',
        contestant_title: '',
        nameOfTheTitle: '',
        nameOfTheAward: '',
        contestant_image: '',
      });
    }
    if (step_one.eventType === EVENT_TYPE.UPCOMING) {
      onChangeStepOne({
        nameOfPageant: {title: ''},
        eventType: EVENT_TYPE.PAST,
        placement: PLACEMENT.NONE,
        year: {name: ''},
        weight: {name: '', slug: ''},
        awards: [],
        description: {name: ''},
        event: {title: ''},
        age: {name: ''},
        startDate: '',
        endDate: '',
        contestant_title: '',
        nameOfTheTitle: '',
        nameOfTheAward: '',
        contestant_image: '',
      });
    }
    setIsModalVisible({
      ...isModalVisible,
      event: false,
    });
    setEventState(0);
    removeAllError();
    setChangeEventModalVisible(false);
  };
  const onChangePlacement = val => {
    onChangeStepOne({placement: val});
  };

  const imagePickerResult = (
    imageName: string,
    imagePath: string,
    type: string,
    form: FormData,
  ) => {
    if (!!imageName) {
      const dp = {
        name: imageName,
        uri: isIosDevice() ? imagePath?.replace('file://', '') : imagePath,
        type: type,
      };

      onChangeStepOne({contestant_image: dp.name});
    } else {
      onChangeStepOne({contestant_image: ''});
    }
  };

  const getAgeDivisionUrl = () => {
    if (step_one.event.id !== '') {
      return (
        GET_AGE_DEVISION_BY_PAGEANT + Param.PAGAENT_ID + `${step_one.event.id}`
      );
    } else {
      return (
        GET_AGE_DEVISION_BY_PAGEANT +
        Param.PAGAENT_ID +
        `${step_one.nameOfPageant.id}`
      );
    }
  };
  const {mutateAsync: getAgeDevision} = useCgMutation<AgeDivisionById>({
    key: GET_AGE_DEVISION_BY_PAGEANT,
    method: MethodTypes.GET,
    url: getAgeDivisionUrl(),
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getEventList} = useCgMutation({
    key: GET_EVENT_LIST_BY_NAME_AND_YEAR,
    method: MethodTypes.GET,
    url:
      GET_EVENT_LIST_BY_NAME_AND_YEAR +
      Param.PAGAENT_ID +
      `${step_one.nameOfPageant.id}` +
      Param.YEAR_ID +
      `${step_one.year.id}`,
    offSuccessToast: true,
  });
  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.YEARS},${MASTERDATA.WEIGHT},${MASTERDATA.AWARDS}`,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  const getEventListByName = async () => {
    setLoader(true);

    const res = await getEventList();
    if (res.success) {
      setTimeout(() => {
        setmodalList({
          ...modalList,
          event: res.data.events,
        });

        if (step_one.event.title !== '') {
          setIsModalVisible({
            ...isModalVisible,
            event: true,
          });
        }
      }, 300);
      if (res?.data?.events?.length > 1) {
        setTimeout(() => {
          setIsModalVisible({
            ...isModalVisible,
            event: true,
          });
        }, 300);
      }

      if (res?.data?.events?.length === 1) {
        onChangeStepOne({
          event: res.data.events[0],
          startDate: checkIsNull(res.data.events[0].start_date)
            ? moment(
                res.data.events[0].start_date,
                TIME_FORMAT.YYYYMMDD,
              ).format(TIME_FORMAT.MMDDYYYY)
            : null,
          endDate: checkIsNull(res.data.events[0].end_date)
            ? moment(res.data.events[0].end_date, TIME_FORMAT.YYYYMMDD).format(
                TIME_FORMAT.MMDDYYYY,
              )
            : null,
        });
        if (checkIsNull(res.data.events[0].end_date)) {
          setAreDatesEditable(false);
        } else {
          setAreDatesEditable(true);
        }
      }

      if (res?.data?.events?.length === 0) {
        setEventState(1);
        setAreDatesEditable(true);
      }
      setLoader(false);
    } else {
      setLoader(false);
    }
    // }
  };
  const getMasterData = async () => {
    if (checkInterNet()) {
      setLoader(true);

      const res = await getMasterDetails();
      if (res.success) {
        const otherAwardArr = [
          ...res.data.master_records.award,
          {id: COMPNAY_ENUM.OTHER, name: COMPNAY_ENUM.OTHER, slug: COMPNAY_ENUM.OTHER},
        ];
        setmodalList({
          ...modalList,
          years: res.data.master_records.years,
          weight: res.data.master_records.weight,
          awards: otherAwardArr,
          // ,
        });
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };

  const onPressEvent = () => {
    if (step_one.nameOfPageant?.title === '') {
      setNameOfPageantError(translations.THIS_FIELD_REQUIRED);

      // return
    } else if (step_one.year.name === '') {
      setyearError(translations.THIS_FIELD_REQUIRED);
    } else {
      setNameOfPageantError('');
      setyearError('');

      getEventListByName();
    }
  };
  const onFocusAgeDevision = async () => {
    if (!checkIsNull(step_one.nameOfPageant.id)) {
      setNameOfPageantError(translations.THIS_FIELD_REQUIRED);
    } else {
      if (checkInterNet()) {
        setLoader(true);
        const res = await getAgeDevision();
        if (res.success) {
          setTimeout(() => {
            setmodalList({
              ...modalList,
              age: res.data,
            });
            setIsModalVisible({
              ...isModalVisible,
              age: true,
            });
          }, 300);
        }
        setLoader(false);
      }
    }
  };
 
  const hideDatepicker = () => {
    setIsDateModalOpen(false);
  };
  const onChange = selectedDate => {
    if (!isIosDevice()) {
      setIsDateModalOpen(false);
    }
    const currentDate = selectedDate || date;
    const tempDate = new Date(currentDate);

    const fDate1 = moment(tempDate).format(TIME_FORMAT.MMDDYYYY);
    if (isStartDateSelected) {
      onChangeStepOne({
        startDate: fDate1,
      });
      setIsStartDateSelected(false);
    }
    if (isEndDateSelected) {
      onChangeStepOne({
        endDate: fDate1,
      });
      setIsEndDateSelected(false);
    }
    hideDatepicker();
  };

  const datesValidation = () => {
    if (step_one.startDate !== '' || step_one.endDate !== '') {
      if (step_one.startDate === '' && step_one.endDate === '') {
        setEndDateErr(translations.THIS_FIELD_REQUIRED);
        setStartDateErr(translations.THIS_FIELD_REQUIRED);
        return false;
      }
      if (step_one.startDate === '') {
        setStartDateErr(translations.THIS_FIELD_REQUIRED);
        return false;
      }
      if (step_one.endDate === '') {
        setEndDateErr(translations.THIS_FIELD_REQUIRED);
        return false;
      }

      const endDate = moment(step_one.endDate, TIME_FORMAT.MMDDYYYY).format(
        TIME_FORMAT.DDMMYYYY,
      );
      const startDate = moment(step_one.startDate, TIME_FORMAT.MMDDYYYY).format(
        TIME_FORMAT.DDMMYYYY,
      );
      const startFormtedDate = moment(startDate, TIME_FORMAT.DDMMYYYY);
      const endFormatedDate = moment(endDate, TIME_FORMAT.DDMMYYYY);
      const diffDays = endFormatedDate.diff(startFormtedDate, 'days');
      if (diffDays < 0) {
        setStartDateErr(translations.GREATER_START_DATE);
        setEndDateErr(translations.SMALL_END_DATE);
        return false;
      } else if (diffDays > 32) {
        setEndDateErr(translations.START_END_DATE_RANGE);
        return false;
      } else {
        setStartDateErr('');
        setEndDateErr('');
        return true;
      }
    } else {
      return true;
    }
  };

  const eventTitleValidation = () => {
    if (eventState === 0) {
      if (step_one.event.title) {
        setEventError('');
        return true;
      } else {
        setEventError(translations.THIS_FIELD_REQUIRED);
        return false;
      }
    } else {
      return true;
    }
  };

  const nameOfTitle = () => {
    if (step_one.description.id === 5) {
      if (step_one.nameOfTheTitle.trim().length > 0) {
        setnameOfTheTitleError('');
        return true;
      } else {
        setnameOfTheTitleError(translations.THIS_FIELD_REQUIRED);
        return false;
      }
    } else {
      return true;
    }
  };
  const nameOfAward = () => {
    if (step_one.awards.find(item => item.id === COMPNAY_ENUM.OTHER) !== undefined) {
      if (step_one.nameOfTheAward.trim().length > 0) {
        setnameOfTheAwardError('');
        return true;
      } else {
        setnameOfTheAwardError(translations.THIS_FIELD_REQUIRED);
        return false;
      }
    } else {
      return true;
    }
  };
  const scrollHandler = (key: string) => {
    if (!!scrollRef?.current) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)], //we get the offset value from array based on key
        animated: true,
      });
    }
  };
  const moveToTopError = () => {
    if (!step_one.nameOfPageant?.title) {
      scrollHandler(translations.NAME_OF_PEAGEANT);
      return;
    } else if (!editScrenView && !step_one.year.name) {
      scrollHandler(translations.YEAR_SHOWN_ON_YOUR_SASH);
      return;
    } else if (!eventTitleValidation()) {
      scrollHandler(translations.EVENT);
      return;
    } else if (!step_one.age.name) {
      scrollHandler(translations.AGE_DEVISION);
      return;
    } else if (!nameOfTitle() || !nameOfAward()) {
      scrollRef?.current?.scrollToEnd({animated: true});
      return;
    }
  };
  const validate = () => {
    step_one.nameOfPageant?.title
      ? setNameOfPageantError('')
      : setNameOfPageantError(translations.THIS_FIELD_REQUIRED);
    if (!editScrenView) {
      if (step_one.year.name) {
        setyearError('');
      } else {
        setyearError(translations.THIS_FIELD_REQUIRED);
      }
    }

    step_one.age.name
      ? setAgeDevisionError('')
      : setAgeDevisionError(translations.THIS_FIELD_REQUIRED);
    datesValidation();
    eventTitleValidation();
    if (step_one.eventType === EVENT_TYPE.UPCOMING) {
      if (
        step_one.nameOfPageant.title &&
        step_one.year.name &&
        step_one.age.name &&
        datesValidation() &&
        eventTitleValidation()
      ) {
        !!hitAddContestantDetailsApi && hitAddContestantDetailsApi();
      } else {
        moveToTopError();
        toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
      }
    }

    if (step_one.eventType === EVENT_TYPE.PAST) {
      nameOfTitle();
      nameOfAward();

      if (
        step_one.nameOfPageant.title &&
        step_one.year.name &&
        step_one.age.name &&
        nameOfTitle() &&
        nameOfAward() &&
        datesValidation() &&
        eventTitleValidation()
      ) {
        setCurrentStep(2);
        !!hitAddContestantDetailsApi && hitAddContestantDetailsApi();
      } else {
        moveToTopError();
        toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
      }
    }
  };
  const onEndDateChange = endDate => {
    const endFormatedDate = moment(
      moment(endDate, TIME_FORMAT.MMDDYYYY).format(TIME_FORMAT.YYYYMMDD),
    );
    const now = moment();
    if (endDate !== '') {
      if (now < endFormatedDate) {
        if (step_one.eventType === EVENT_TYPE.PAST) {
          setTimeout(() => {
            onChangeStepOne({eventType: EVENT_TYPE.UPCOMING});
          }, 100);
        }
      } else if (now > endFormatedDate) {
        setTimeout(() => {
          onChangeStepOne({eventType: EVENT_TYPE.PAST});
        }, 100);
      }
    }
  };
  const onChangeYear = year => {
    const presentYear = moment(new Date()).format(TIME_FORMAT.YYYY);
    if (year.name >= parseInt(presentYear)) {
      if (step_one.eventType === EVENT_TYPE.PAST) {
        setTimeout(() => {
          if (editScrenView) {
            onChangeStepOne({
              eventType: EVENT_TYPE.UPCOMING,
            });
          } else {
            onChangeStepOne({
              eventType: EVENT_TYPE.UPCOMING,
              year: year,
              age: {name: ''},
              event: {title: '', id: ''},
              startDate: '',
              endDate: '',
            });
          }
        }, 100);
      } else {
        if (editScrenView) {
        } else {
          onChangeStepOne({
            year: year,
            age: {name: ''},
            event: {title: '', id: ''},
            startDate: '',
            endDate: '',
          });
        }
      }
    } else {
      setTimeout(() => {
        if (editScrenView) {
          onChangeStepOne({
            eventType: EVENT_TYPE.PAST,
          });
        } else {
          onChangeStepOne({
            eventType: EVENT_TYPE.PAST,
            year: year,
            age: {name: ''},
            event: {title: '', id: ''},
            startDate: '',
            endDate: '',
          });
        }
      }, 100);
    }
  };

  const setMaxDate = () => {
    const presentYear = new Date().getFullYear();
    if (Number(step_one.year.name) === Number(presentYear) + 1) {
      return new Date(`${Number(step_one.year.name)}-12-31`);
    } else {
      return new Date(`${Number(step_one.year.name) + 1}-12-31`);
    }
  };

  const setMinDate = () => {
    return new Date(`${Number(step_one.year.name) - 1}-01-01`);
  };
  const getWieghtSlug = () => {
    const idArray = [];
    modalList.weight.map(i => {
      idArray.push(String(i.name));
    });
    return idArray;
  };

  const showSelectdDate = () => {
    if (isStartDateSelected) {
      if (!!step_one.startDate) {
        return new Date(
          moment(step_one.startDate, TIME_FORMAT.MMDDYYYY).format(
            TIME_FORMAT.YYYYMMDD,
          ),
        );
      } else {
        const date = new Date();
        let changeDate;
        if (String(date.getMonth()).length === 1) {
          changeDate =
            step_one.year.name +
            '-' +
            '0' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        } else {
          changeDate =
            step_one.year.name +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        }
        return new Date(
          moment(changeDate, TIME_FORMAT.YYYYMMDD).format(TIME_FORMAT.YYYYMMDD),
        );
      }
    }
    if (isEndDateSelected) {
      if (!!step_one.endDate) {
        return new Date(
          moment(step_one.endDate, TIME_FORMAT.MMDDYYYY).format(
            TIME_FORMAT.YYYYMMDD,
          ),
        );
      } else {
        const date = new Date();
        let endChangeDate;

        if (String(date.getMonth()).length === 1) {
          endChangeDate =
            step_one.year.name +
            '-' +
            '0' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        } else {
          endChangeDate =
            step_one.year.name +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        }
        return new Date(
          moment(endChangeDate, TIME_FORMAT.YYYYMMDD).format(
            TIME_FORMAT.YYYYMMDD,
          ),
        );
      }
    }
  };
  const [makeUIbetter, setmakeUIbetter] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setmakeUIbetter(true);
    }, 100);
  }, [isFocused]);

  return !makeUIbetter ? (
    <View></View>
  ) : (
    <View>
      {isDateModalOpen && (
        <DateTimePicker
          maximumDate={setMaxDate()}
          minimumDate={setMinDate()}
          display={isIosDevice() ? 'inline' : 'default'}
          isVisible={isDateModalOpen}
          mode={'date'}
          date={showSelectdDate()}
          onConfirm={onChange}
          onCancel={hideDatepicker}
        />
      )}
      {!editScrenView && (
        <>
          <Text style={styles.heading}>
            {isAdditionalInfoScreen
              ? translations.IS_PAGENT_UPCOMING_OR_PAST
              : translations.IS_YOUR_EVENT_UPCOMING_OR_PAST}
          </Text>
          <DynamicradioButton
            data={eventType}
            selectedRadio={step_one.eventType}
            setSelectedRadio={val => onChanegEventType(val, true)}
            showFirstWordOnly={true}
            customStyles={styles.radioCustomStyle}
          />
        </>
      )}

      <View style={styles.mainView}>
        {!isAdditionalInfoScreen && (
          <FloatingInput
            floatingText={translations.YOUR_NAME}
            setText={value => onChangeStepOne({yourName: removeEmojis(value)})}
            value={step_one.yourName}
            returnKeyType={'done'}
          />
        )}
        <FloatingDropdown
          floatingText={translations.NAME_OF_PEAGEANT}
          setText={value => onChangeStepOne({nameOfPageant: value})}
          value={step_one.nameOfPageant?.title}
          isMandatory={true}
          dropdown={true}
          onFieldFocus={
            editScrenView
              ? () => {}
              : () => {
                  setnameOfPaegeantModalVisibe(true);
                }
          }
          errorMsg={nameOfPageantError}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <CustomBottomModalWithApi
          isModalVisible={nameOfPaegeantModalVisibe}
          setIsModalVisible={val => {
            setnameOfPaegeantModalVisibe(val);
            setIsModalVisible({
              ...isModalVisible,
              event: false,
            });
            setEventState(0);
          }}
          preSelectedValue={step_one.nameOfPageant.id}
          parentCallback={selectedText => {
            onChangeStepOne({
              nameOfPageant: selectedText,
              age: {name: ''},
              event: {title: '', id: ''},
              startDate: '',
              endDate: '',
            });
            setAreDatesEditable(true);
          }}
          heading={translations.NAME_OF_PEAGEANT}
          enableSearch={true}
        />
        <Text style={styles.clickHereLine}>
          {translations.DONT_SEE_YOUR_PEAGEANT}
          <Text
            style={styles.clickHereText}
            onPress={() => {
              navigation.navigate(SCREEN.PAGEANT_CREATION_REQUEST);
              setmakeUIbetter(false);
            }}>
            {translations.CLICK_HERE}
          </Text>
          <Text>{translations.CLICK_HERE_TO_ADD_IT}</Text>
        </Text>
        {!editScrenView && (
          <FloatingDropdown
            floatingText={
              step_one.eventType === EVENT_TYPE.PAST
                ? translations.YEAR_SHOWN_ON_YOUR_SASH
                : translations.WHAT_YEAR_IS_SHOWN_ON_YOUR_SASH
            }
            value={String(step_one?.year?.name)}
            isMandatory={true}
            dropdown={true}
            onFieldFocus={() =>
              setIsModalVisible({
                ...isModalVisible,
                years: true,
              })
            }
            errorMsg={yearError}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              let ind = removeMiddleSpaces(
                translations.YEAR_SHOWN_ON_YOUR_SASH,
              );
              obj[ind] = val;
              setDataSourceCords(obj);
            }}
          />
        )}

        <CustomBottomModal
          isModalVisible={isModalVisible.years}
          setIsModalVisible={val => {
            setIsModalVisible({
              ...isModalVisible,
              years: val,
              event: false,
            });
            setEventState(0);
          }}
          data={modalList.years}
          preSelectedValue={step_one.year.id}
          parentCallback={selectedText => {
            onChangeYear(selectedText);
            setAreDatesEditable(true);
          }}
          heading={translations.PEAGEANT_YEAR}
          enableSearch={true}
        />
        {eventState === 0 ? (
          <>
            {!editScrenView && (
              <FloatingDropdown
                floatingText={translations.EVENT}
                setText={value => onChangeStepOne({event: value})}
                value={step_one?.event?.title}
                isMandatory={true}
                dropdown={true}
                onFieldFocus={() => {
                  onPressEvent();
                }}
                errorMsg={eventError}
                laoutY={(val: any, index: string) => {
                  let obj = dataSourceCords;
                  obj[index] = val;
                  setDataSourceCords(obj);
                }}
              />
            )}

            <CustomBottomModal
              isModalVisible={isModalVisible.event}
              setIsModalVisible={val =>
                setIsModalVisible({
                  ...isModalVisible,
                  event: val,
                })
              }
              data={modalList.event}
              preSelectedValue={step_one?.event?.id}
              parentCallback={selectedText => {
                onChangeStepOne({
                  event: selectedText,
                  startDate: checkIsNull(selectedText.start_date)
                    ? moment(
                        selectedText.start_date,
                        TIME_FORMAT.YYYYMMDD,
                      ).format(TIME_FORMAT.MMDDYYYY)
                    : null,
                  endDate: checkIsNull(selectedText.end_date)
                    ? moment(
                        selectedText.end_date,
                        TIME_FORMAT.YYYYMMDD,
                      ).format(TIME_FORMAT.MMDDYYYY)
                    : null,
                });
                if (checkIsNull(selectedText.start_date)) {
                  setAreDatesEditable(false);
                }
              }}
              heading={translations.EVENT}
            />
          </>
        ) : (
          <FloatingInput
            floatingText={translations.EVENT}
            setText={value => onChangeStepOne({event: removeEmojis(value)})}
            value={step_one.nameOfPageant.title + ' ' + step_one.year.name}
            returnKeyType={'done'}
            editable={false}
          />
        )}
        <FloatingDropdown
          floatingText={translations.EVENT_START_DATE}
          value={
            !!step_one.startDate
              ? moment(step_one.startDate, TIME_FORMAT.MMDDYYYY).format(
                  TIME_FORMAT.MMslashDDslashYYYY,
                )
              : ''
          }
          errorMsg={startDateErr}
          onFieldFocus={
            areDatesEditable
              ? () => {
                  if (!checkIsNull(step_one.year?.name)) {
                    setyearError(translations.THIS_FIELD_REQUIRED);
                  } else {
                    setyearError('');
                    setIsStartDateSelected(true);
                    setIsEndDateSelected(false);
                    setIsDateModalOpen(true);
                  }
                }
              : () => {}
          }
          isMandatory={false}
          rightIcon={<AppImages.Dashboard.CalenderIcon />}
          onPressRightIcon={() => {
            setIsDateModalOpen(true);
          }}
        />

        <FloatingDropdown
          floatingText={translations.EVENT_END_DATE}
          value={
            !!step_one.endDate
              ? moment(step_one.endDate, TIME_FORMAT.MMDDYYYY).format(
                  TIME_FORMAT.MMslashDDslashYYYY,
                )
              : ''
          }
          errorMsg={endDateErr}
          onFieldFocus={
            areDatesEditable
              ? () => {
                  if (!checkIsNull(step_one.year?.name)) {
                    setyearError(translations.THIS_FIELD_REQUIRED);
                  } else {
                    setyearError('');
                    setIsDateModalOpen(true);
                    setIsEndDateSelected(true);
                    setIsStartDateSelected(false);
                  }
                }
              : () => {}
          }
          isMandatory={false}
          rightIcon={<AppImages.Dashboard.CalenderIcon />}
          onPressRightIcon={() => {
            setIsDateModalOpen(true);
          }}
        />
        <FloatingDropdown
          floatingText={translations.AGE_DEVISION}
          setText={value => onChangeStepOne({age: value})}
          isMandatory={true}
          dropdown={true}
          onFieldFocus={() => {
            onFocusAgeDevision();
          }}
          value={step_one?.age?.name}
          errorMsg={ageDevisionError}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />

        <CustomBottomModal
          isModalVisible={isModalVisible.age}
          setIsModalVisible={val =>
            setIsModalVisible({
              ...isModalVisible,
              age: val,
            })
          }
          data={modalList.age}
          preSelectedValue={step_one?.age?.id}
          parentCallback={selectedText => {
            onChangeStepOne({age: selectedText});
            setNameOfPageantError('');
          }}
          heading={translations.AGE_DEVISION}
        />

        <FloatingDropdown
          floatingText={translations.COMPITION_WEIGHT}
          setText={value => onChangeStepOne({weight: value})}
          value={step_one.weight.name}
          dropdown={true}
          onFieldFocus={() =>
            setTimeout(() => {
              setIsModalVisible({
                ...isModalVisible,
                weight: true,
              });
            }, 300)
          }
        />
        {isIosDevice() ? (
          <WeightModal
            modalVisible={isModalVisible.weight}
            data={getWieghtSlug()}
            close={() =>
              setIsModalVisible({
                ...isModalVisible,
                weight: false,
              })
            }
            onPressCancel={() =>
              setIsModalVisible({
                ...isModalVisible,
                weight: false,
              })
            }
            onPressSave={() =>
              setIsModalVisible({
                ...isModalVisible,
                weight: false,
              })
            }
            heightCallback={selectedText => {
              onChangeStepOne({
                weight: {name: selectedText, slug: selectedText},
              });
            }}
            previousHeight={step_one.weight.name}
          />
        ) : (
          <CustomBottomModal
            isModalVisible={isModalVisible.weight}
            setIsModalVisible={val =>
              setIsModalVisible({
                ...isModalVisible,
                weight: val,
              })
            }
            data={modalList.weight}
            preSelectedValue={step_one.weight.id}
            parentCallback={selectedText =>
              onChangeStepOne({weight: selectedText})
            }
            heading={translations.COMPITION_WEIGHT}
            enableSearch={true}
          />
        )}
        <FloatingInput
          floatingText={translations.TITLE_AT_THIS_EVENT}
          setText={value =>
            onChangeStepOne({contestant_title: removeEmojis(value)})
          }
          value={step_one.contestant_title}
          returnKeyType={'done'}
          maxLength={50}
        />
        {step_one.eventType === EVENT_TYPE.PAST ? (
          <>
            <Text style={styles.placementText}>{translations.PLACEMENT}</Text>
            <DynamicradioButton
              data={placement}
              selectedRadio={step_one.placement}
              setSelectedRadio={val => onChangePlacement(val)}
            />
            <View style={styles.height24}></View>
            {step_one.placement === PLACEMENT.NONE ? null : (
              <>
                <FloatingDropdown
                  floatingText={translations.ADD_DESCRIPTION}
                  setText={value => onChangeStepOne({description: value})}
                  value={step_one.description.name}
                  dropdown={true}
                  onFieldFocus={() =>
                    setIsModalVisible({
                      ...isModalVisible,
                      description: true,
                    })
                  }
                />
                <CustomBottomModal
                  isModalVisible={isModalVisible.description}
                  setIsModalVisible={val =>
                    setIsModalVisible({
                      ...isModalVisible,
                      description: val,
                    })
                  }
                  data={description}
                  preSelectedValue={step_one.description.id}
                  parentCallback={selectedText =>
                    onChangeStepOne({description: selectedText})
                  }
                  heading={translations.ADD_DESCRIPTION}
                />
              </>
            )}
            {step_one.description.id === DESCRIPTION.TITLE_AWARDED && (
              <FloatingInput
                floatingText={translations.NAME_OF_THE_TITLE}
                setText={value =>
                  onChangeStepOne({nameOfTheTitle: removeEmojis(value)})
                }
                value={step_one.nameOfTheTitle}
                returnKeyType={'done'}
                isMandatory={true}
                errorMsg={nameOfTheTitleError}
              />
            )}

            <MultiSelectinput
              floatingText={translations.AWARDS}
              setText={value => onChangeStepOne({awards: value})}
              value={step_one?.awards}
              dropdown={true}
              onFieldFocus={() =>
                setIsModalVisible({
                  ...isModalVisible,
                  awards: true,
                })
              }
              onDelete={val => {
                onChangeStepOne({awards: val});
              }}
              addMore={() =>
                setIsModalVisible({
                  ...isModalVisible,
                  awards: true,
                })
              }
            />

            <CustomBottomModal
              isModalVisible={isModalVisible.awards}
              setIsModalVisible={val =>
                setIsModalVisible({
                  ...isModalVisible,
                  awards: val,
                })
              }
              data={modalList.awards}
              parentCallback={selectedText =>
                onChangeStepOne({awards: selectedText})
              }
              heading={translations.AWARDS}
              enableSearch={true}
              enableMultiselect={true}
              preSelectedValue={step_one.awards}
            />
          </>
        ) : null}

        {step_one.awards.find(item => item.id === COMPNAY_ENUM.OTHER) !== undefined &&
          step_one.eventType === EVENT_TYPE.PAST && (
            <FloatingInput
              floatingText={translations.NAME_OF_THE_AWARD}
              setText={value =>
                onChangeStepOne({nameOfTheAward: removeEmojis(value)})
              }
              value={step_one.nameOfTheAward}
              returnKeyType={'done'}
              isMandatory={true}
              errorMsg={nameOfTheAwardError}
            />
          )}
        {editScrenView ? (
          <HeadShotImage
            onImageFound={imagePickerResult}
            url={step_one.contestant_image}
            displayHeadUrl={step_one.contestant_image ? true : false}
          />
        ) : (
          <HeadShotImage
            onImageFound={imagePickerResult}
            url={step_one.contestant_image?.uri}
            displayHeadUrl={step_one.contestant_image?.uri ? true : false}
          />
        )}
      </View>

      <WarningModel
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_SWITCH}
        isModalVisible={changeEventModalVisible}
        setConfirm={() => onConfirm()}
        setIsModalVisible={setChangeEventModalVisible}
        headingStyle={styles.modalHeading}
        yesButtonText={translations.YES}
      />
    </View>
  );
};

export default memo(Step1);
