import {View, Text,  ImageBackground} from 'react-native';
import React, {useState, useEffect} from 'react';
import translations from '../../../../../../../assets/translations';
import {styles} from './styles';
import FloatingInput from '../../../../../../common/floatinginput';
import FloatingDropdown from '../../../../../../common/floatingdropown';

import {
  checkIsNull,
  doesParaContainersURL,
  isURL,
  _validateEmail,
  removeEmojis,
} from '../../../../../../utils/validations';
import FloatingBigInput from '../../../../../../common/floatingbiginput';
import {
  toast,
  toastError,
  toastType,
} from '../../../../../../common/commonalert';
import {EVENT_TYPE, IMAGE_TYPE, MASTERDATA} from '../../../../../../utils/enum';
import AppImages from '../../../../../../../assets/images/AppImages';
import HeadShotImage from '../../../../../../common/headshotimage';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {GET_MASTER_DATA} from '../../../../../../../services/endpoints';
import {UserContext} from '../../../../../../../store/userStore';
import CustomBottomModal from '../../../../../../common/custombottommodal';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import moment from 'moment';
import PageantTitleModal from '../custombottommodalwithApi';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  checkIsConnected,
  isIosDevice,
  removeMiddleSpaces,
} from '../../../../../../utils/helperFunction';
import {
  TIME_FORMAT,
  getCustomDateFormat,
} from '../../../../../../utils/datetimemanger';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import CustomButton from '../../../../../../common/button';
import ViewPlanModal from '../../../pageantdetail/components/viewplanmodal';
const AddPageantForm = ({
  step_one,
  onChangeStepOne,
  focused = false,
  isSavePressed,
  setIsSavePressed,
  setCurrentStep,
  addPageant,
  editScrenView = false,
  isEditable = true,
  setMainImagePicked,
  setBannerImagePicked,
  isPlanActive,
  pageantPlanDetail,
  pageantId,
  scrollRef,
}) => {
  const setLoader = useSetLoader();
  const {storeData} = React.useContext(UserContext);
  const [notSure, setNotSure] = useState(false);

  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [nameOfPaegeantModalVisibe, setnameOfPaegeantModalVisibe] =
    useState(false);
  const [pageantnameList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState({
    years: false,
  });
  const [modalList, setmodalList] = useState({
    years: [{}],
  });
  const [optOut] = useState(translations.NO_SMALL);
  const [receiveNotification] = useState(translations.NO_SMALL);
  const [allLeadsNotification] = useState(translations.NO_SMALL);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [isEndDateSelected, setIsEndDateSelected] = useState(false);
  const [, setAreDatesEditable] = useState(true);
  const [dataSourceCords, setDataSourceCords] = React.useState({});

  //ValidationVariable
  const [nameOfPageantError, setNameOfPageantError] = useState('');
  const [webError, setWebError] = useState('');
  const [yearError, setyearError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [mainImageError, setMainImageError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (isSavePressed) {
      validate();
    }
    setIsSavePressed(false);
  }, [isSavePressed]);

  useEffect(() => {
    onEndDateChange(step_one.end_date);
  }, [step_one.end_date]);
  useEffect(() => {
    if (editScrenView) {
      if (step_one.end_date === '' || step_one.end_date === null) {
        onChangeYear(step_one.year);
      }
    }
  }, [step_one.year.name, step_one.end_date]);

  useEffect(() => {
    removeAllError();
    getMasterData();
    onChangeStepOne({
      mail_notify_pref:
        receiveNotification === translations.YES
          ? translations.ONE_NOTIFIACTION
          : optOut === translations.YES
          ? translations.OPT_OUT
          : allLeadsNotification === translations.YES
          ? translations.ALL_NOTIFICATIONS
          : null,
    });
  }, []);

  const checkInterNet = () => {
    return checkIsConnected();
  };
  const removeAllError = () => {
    setNameOfPageantError('');
    setyearError('');
    setDescriptionError('');
    setEmailError('');
    setStartDateError('');
    setEndDateError('');
    setWebError('');
    setMainImageError('');
  };

  const imagePickerResult = (imageName: string) => {
    if (!!imageName) {
      if (imageName?.size > 15) {
        toast(translations.PAGENT_LOGO_VALIDATION, toastType.ERROR_TOAST);
      } else {
        setMainImagePicked(true);
        onChangeStepOne({main_image: imageName});
      }
    } else {
      onChangeStepOne({main_image: ''});
    }
  };
  const imagePickerBanner = (imageName: string) => {
    if (imageName?.size > 15) {
      toast(translations.PAGENT_LOGO_VALIDATION, toastType.ERROR_TOAST);
    } else {
      setBannerImagePicked(true);
      onChangeStepOne({banner_image: imageName === undefined ? '' : imageName});
    }
  };

  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.YEARS}`,
    },
    offSuccessToast: true,
    disableLoader: true,
  });

  const getMasterData = async () => {
    if (checkInterNet()) {
      setLoader(true);

      const res = await getMasterDetails();
      if (res.success) {
        setmodalList({
          ...modalList,
          years: res.data.master_records.years,
          // ,
        });
        setLoader(false);
        if (!editScrenView) {
          onChangeStepOne({
            email: storeData?.data?.user?.email,
          });
        }
      } else {
        setLoader(false);
      }
    }
  };
  const checkValidField = (data: string) => {
    if (!editScrenView) {
      if (doesParaContainersURL(data)) {
        setDescriptionError(translations.THIS_FILED_CANT_CONTAIN_A_LINK);
        return false;
      } else {
        setDescriptionError('');
        return true;
      }
    } else {
      setDescriptionError('');
      return true;
    }
  };
  const getPageantnameListOnSearch = async (val = '') => {
    //emty
  };
  const optionalValidation = () => {
    if (!!step_one.website) {
      if (!isURL(step_one.website)) {
        setWebError(translations.PLEASE_ENTER_A_VALID_LINK);
        return false;
      } else {
        setWebError('');
        return true;
      }
    } else {
      setWebError('');
      return true;
    }
  };

  const hideDatepicker = () => {
    setIsDateModalOpen(false);
  };
  const onChange = (selectedDate: any) => {
    if (!isIosDevice()) {
      setIsDateModalOpen(false);
    }
    const currentDate = selectedDate || date;
    const tempDate = new Date(currentDate);

    const fDate1 = moment(tempDate).format(TIME_FORMAT.MMDDYYYY);
    if (isStartDateSelected) {
      onChangeStepOne({
        start_date: fDate1,
      });
      setIsStartDateSelected(false);
    }
    if (isEndDateSelected) {
      onChangeStepOne({
        end_date: fDate1,
      });
      setIsEndDateSelected(false);
    }
    hideDatepicker();
  };
  const dateValidation = () => {
    if (!notSure && !editScrenView) {
      if (
        step_one?.start_date?.length === 0 ||
        step_one?.end_date?.length === 0
      ) {
        return false;
      } else if (step_one.start_date && step_one.end_date) {
        const endDate = moment(step_one.end_date, TIME_FORMAT.MMDDYYYY).format(
          TIME_FORMAT.DDMMYYYY,
        );
        const startDate = moment(
          step_one.start_date,
          TIME_FORMAT.MMDDYYYY,
        ).format(TIME_FORMAT.DDMMYYYY);
        const a = moment(startDate, TIME_FORMAT.DDMMYYYY);
        const b = moment(endDate, TIME_FORMAT.DDMMYYYY);
        const diffDays = b.diff(a, 'days');
        if (diffDays < 0) {
          setEndDateError(translations.SMALL_END_DATE);
          setStartDateError(translations.GREATER_START_DATE);
          return false;
        } else if (diffDays > 32) {
          setEndDateError(translations.START_END_DATE_RANGE);
          return false;
        } else {
          setStartDateError('');
          setEndDateError('');
          return true;
        }
      }
    } else {
      setStartDateError('');
      setEndDateError('');
      return true;
    }
  };
  const emailValidation = () => {
    if (step_one.email) {
      if (!_validateEmail(step_one.email.trim())) {
        setEmailError(translations.PLEASE_ENTER_VALID_EMAIL);
        return false;
      } else {
        setEmailError('');
        return true;
      }
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
  const scrollToTopError = () => {
    if (!step_one?.title?.name?.trim()) {
      scrollHandler(translations.NAME_OF_PAGEANT);
      return;
    } else if (!editScrenView && !step_one.year.name) {
      scrollHandler(translations.WHAT_WAS_THE_YR_OF_THIS_PAGEANT);
      return;
    } else if (!dateValidation()) {
      scrollHandler(translations.START_DATE);
      return;
    } else if (!step_one.email) {
      scrollHandler(translations.EMAIL);
      return;
    } else if (!optionalValidation()) {
      scrollHandler(translations.WEBSITE);
      return;
    } else if (!editScrenView && !step_one.description) {
      scrollHandler(translations.DESCRIPTION);
      return;
    } else if (!step_one.main_image) {
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({animated: true});
      }
      return;
    }
  };
  const validate = () => {
    removeAllError();
    step_one?.title?.name?.trim()
      ? setNameOfPageantError('')
      : setNameOfPageantError(translations.THIS_FIELD_REQUIRED);
    if (!editScrenView) {
      if (step_one.year.name) {
        setyearError('');
      } else {
        setyearError(translations.THIS_FIELD_REQUIRED);
      }
    }
    if (!editScrenView) {
      if (step_one && step_one.description && step_one.description.trim()) {
        setDescriptionError('');
      } else {
        setDescriptionError(translations.THIS_FIELD_REQUIRED);
      }
    }
    step_one.email
      ? setEmailError('')
      : setEmailError(translations.THIS_FIELD_REQUIRED);
    step_one.main_image
      ? setMainImageError('')
      : setMainImageError(translations.PLEASE_ADD_A_LOGO);
    optionalValidation();

    if (!notSure && !editScrenView) {
      step_one.start_date
        ? setStartDateError('')
        : setStartDateError(translations.THIS_FIELD_REQUIRED);
      step_one.end_date
        ? setEndDateError('')
        : setEndDateError(translations.THIS_FIELD_REQUIRED);
    } else {
      setStartDateError('');
      setEndDateError('');
    }

    scrollToTopError();
    if (
      step_one?.title?.name?.trim()?.length !== 0 &&
      step_one?.year?.name?.length !== 0 &&
      step_one?.description?.length !== 0 &&
      step_one?.email?.length !== 0 &&
      step_one?.main_image?.length !== 0 &&
      emailValidation() &&
      optionalValidation() &&
      dateValidation() &&
      checkValidField(step_one?.description)
    ) {
      addPageant();
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  const onEndDateChange = (endDate: moment.MomentInput) => {
    const date = moment(
      moment(endDate, TIME_FORMAT.MMDDYYYY).format(TIME_FORMAT.YYYYMMDD),
    );
    const now = moment();
    if (endDate !== '') {
      if (now < date) {
        if (step_one.eventType === EVENT_TYPE.PAST) {
          setTimeout(() => {
            onChangeStepOne({eventType: EVENT_TYPE.UPCOMING});
          }, 100);
        }
      } else if (now > date) {
        setTimeout(() => {
          onChangeStepOne({eventType: EVENT_TYPE.PAST});
        }, 100);
      }
    }
  };
  const onChangeYear = (year: any) => {
    onChangeStepOne({
      year: year,
    });
  };

  const setMaxDate = () => {
    const date = new Date().getFullYear();

    const upcomingYear = Number(date) + 1;

    return new Date(`${upcomingYear}-12-31`);
  };

  const setMinDate = () => {
    const date = new Date().getFullYear();

    const pastYear = Number(date) - 1;

    return new Date(`${pastYear}-01-01`);
  };

  const onUpgradePlanClick = () => {
    setIsPreviewModalVisible(true);
  };

  return (
    <View>
      {isDateModalOpen && (
        <DateTimePicker
          maximumDate={setMaxDate()}
          minimumDate={setMinDate()}
          display={isIosDevice() ? 'inline' : 'default'}
          isVisible={isDateModalOpen}
          mode={'date'}
          date={
            isStartDateSelected
              ? checkIsNull(step_one.start_date)
                ? new Date(
                    moment(step_one.start_date, TIME_FORMAT.MMDDYYYY).format(
                      TIME_FORMAT.YYYYMMDD,
                    ),
                  )
                : new Date()
              : checkIsNull(step_one.end_date)
              ? new Date(
                  moment(step_one.end_date, TIME_FORMAT.MMDDYYYY).format(
                    TIME_FORMAT.YYYYMMDD,
                  ),
                )
              : new Date()
          }
          onConfirm={onChange}
          onCancel={hideDatepicker}
        />
      )}

      <View style={styles.mainView}>
        {editScrenView &&
        isPlanActive?.is_active_advertiser === translations.NO_SMALL ? (
          <View style={styles.upgradeView}>
            <ImageBackground
              source={AppImages.Common.Gradient}
              style={styles.gradientView}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.upgradeText} numberOfLines={4}>
                    {translations.PAY_$}
                    {isPlanActive?.membership_price}
                    {translations.PER_MONTH_AND_WILL}
                    {isPlanActive?.lead_include} {translations.CREDITS}{' '}
                    {isPlanActive?.position_profile_appeared}
                    {translations.PLACE}
                  </Text>
                  <View style={styles.buttonView}>
                    <CustomButton
                      inactive
                      label={translations.UPGRADE_}
                      border={true}
                      deleteModal
                      textStyle={styles.borderButtonText}
                      onPress={() => {
                        onUpgradePlanClick();
                      }}
                    />
                  </View>
                </View>
                <View style={{marginTop: moderateScaleVertical(20)}}>
                  <AppImages.Common.Upgrade />
                </View>
              </View>
            </ImageBackground>
          </View>
        ) : null}
        <FloatingDropdown
          floatingText={translations.NAME_OF_PAGEANT}
          setText={value => onChangeStepOne({title: {name: value}})}
          value={step_one.title.name}
          isMandatory={true}
          dropdown={true}
          onFieldFocus={() => {
            setnameOfPaegeantModalVisibe(true);
          }}
          errorMsg={nameOfPageantError}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <PageantTitleModal
          isModalVisible={nameOfPaegeantModalVisibe}
          setIsModalVisible={(
            val: boolean | ((prevState: boolean) => boolean),
          ) => {
            setnameOfPaegeantModalVisibe(val);
            setIsModalVisible({
              ...isModalVisible,
              event: false,
            });
          }}
          data={pageantnameList}
          preSelectedValue={step_one.title.id}
          parentCallback={(selectedText: any) => {
            onChangeStepOne({
              title: {name: selectedText},
            });
            setAreDatesEditable(true);
          }}
          parentSearchCallback={(searchText: any) => {
            onChangeStepOne({
              title: {name: searchText},
            });
            setAreDatesEditable(true);
          }}
          prefilledValue={step_one?.title?.name}
          heading={translations.NAME_OF_PAGEANT}
          enableSearch={true}
          enableSearchFromApi={true}
          searchValue={getPageantnameListOnSearch}
        />

        {!editScrenView && (
          <FloatingDropdown
            floatingText={translations.FIRST_YEAR}
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
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
        )}

        <CustomBottomModal
          isModalVisible={isModalVisible.years}
          setIsModalVisible={(val: any) => {
            setIsModalVisible({
              ...isModalVisible,
              years: val,
            });
          }}
          data={modalList.years}
          preSelectedValue={step_one.year.id}
          parentCallback={(selectedText: any) => {
            onChangeYear(selectedText);
            setAreDatesEditable(true);
          }}
          heading={translations.PEAGEANT_YEAR}
          enableSearch={true}
        />
        <FloatingDropdown
          floatingText={translations.START_DATE}
          value={
            notSure || step_one.end_date === translations.NOT_SURE_CAPITALIZED
              ? translations.NOT_SURE_CAPITALIZED
              : getCustomDateFormat(
                  step_one.start_date,
                  TIME_FORMAT.MMDDYYYY,
                  TIME_FORMAT.MMslashDDslashYYYY,
                )
          }
          onFieldFocus={
            notSure || editScrenView
              ? () => {}
              : () => {
                  setIsStartDateSelected(true);
                  setIsEndDateSelected(false);
                  setIsDateModalOpen(true);
                }
          }
          isMandatory={true}
          rightIcon={<AppImages.Dashboard.CalenderIcon />}
          onPressRightIcon={() => {
            setIsDateModalOpen(true);
          }}
          errorMsg={startDateError}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
          opacity={notSure || editScrenView ? 0.5 : 1}
        />

        <FloatingDropdown
          floatingText={translations.END_DATE}
          value={
            notSure || step_one.end_date === translations.NOT_SURE_CAPITALIZED
              ? translations.NOT_SURE_CAPITALIZED
              : getCustomDateFormat(
                  step_one.end_date,
                  TIME_FORMAT.MMDDYYYY,
                  TIME_FORMAT.MMslashDDslashYYYY,
                )
          }
          onFieldFocus={
            notSure || editScrenView
              ? () => {}
              : () => {
                  setIsStartDateSelected(false);
                  setIsEndDateSelected(true);
                  setIsDateModalOpen(true);
                }
          }
          isMandatory={true}
          errorMsg={endDateError}
          rightIcon={<AppImages.Dashboard.CalenderIcon />}
          onPressRightIcon={() => {
            setIsDateModalOpen(true);
          }}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
          opacity={notSure || editScrenView ? 0.5 : 1}
        />
        {!editScrenView ? (
          <>
            {notSure ? (
              <Text
                style={styles.heightTouchLine}
                onPress={() => {
                  setNotSure(false);
                  onChangeStepOne({
                    not_sure: 0,
                    not_sure_end_date: 0,
                  });
                }}>
                {translations.SELECT_DATE}
              </Text>
            ) : (
              <Text
                style={styles.heightTouchLine}
                onPress={() => {
                  setNotSure(true);
                  setStartDateError('');
                  setEndDateError('');
                  onChangeStepOne({
                    start_date: '',
                    end_date: '',
                    not_sure: 1,
                    not_sure_end_date: 1,
                  });
                }}>
                {translations.NOT_SURE}
              </Text>
            )}
          </>
        ) : (
          <></>
        )}

        <FloatingInput
          floatingText={translations.EMAIL_ADDRESS}
          setText={value => onChangeStepOne({email: removeEmojis(value)})}
          value={step_one.email}
          returnKeyType={'done'}
          isMandatory={true}
          errorMsg={emailError}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingInput
          floatingText={translations.PHONE}
          setText={value =>
            onChangeStepOne({phone: value.replace(/[^\d]/g, '')})
          }
          value={step_one?.phone?.toString()}
          maxLength={15}
          returnKeyType={'done'}
          keyboardType={'number-pad'}
        />
        {editScrenView &&
          isPlanActive?.is_active_advertiser === translations.NO_SMALL && (
            <Text
              style={styles.notVisible}
              onPress={() => {
                onUpgradePlanClick();
              }}>
              {translations.NOT_VISIBLE_ON_PROFILE}
              <Text style={styles.heightTouchLine}>
                {translations.TAP_HERE}
              </Text>
              <Text style={styles.notVisible}>{translations.TO_UPGRADE}</Text>
            </Text>
          )}
        <FloatingInput
          floatingText={translations.WEBSITE}
          setText={value => onChangeStepOne({website: removeEmojis(value)})}
          value={step_one.website}
          returnKeyType={'done'}
          errorMsg={webError}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        {editScrenView &&
          isPlanActive?.is_active_advertiser === translations.NO_SMALL && (
            <Text
              style={styles.notVisible}
              onPress={() => {
                onUpgradePlanClick();
              }}>
              {translations.NOT_VISIBLE_ON_PROFILE}
              <Text style={styles.heightTouchLine}>
                {translations.TAP_HERE}
              </Text>
              <Text style={styles.notVisible}>{translations.TO_UPGRADE}</Text>
            </Text>
          )}

        {!editScrenView ? (
          <FloatingBigInput
            floatingText={translations.DESCRIPTION}
            value={step_one.description}
            isMandatory={true}
            returnKeyType={'done'}
            multiline={true}
            numberOfLines={5}
            textAlignVertical={'top'}
            lengthCheck={true}
            setText={value =>
              onChangeStepOne({description: removeEmojis(value)})
            }
            forMultiline={true}
            autoCapitalize={'sentences'}
            showLength={false}
            errorMsg={descriptionError}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
        ) : (
          <></>
        )}

        <HeadShotImage
          onImageFound={imagePickerResult}
          url={step_one.main_image}
          label={translations.UPLOAD_LOGO_FOR_THIS_PAGEANT}
          showNote={false}
          isMandatory={true}
          heading={translations.LOGO_FOR_PAGEANT}
          errorMsg={mainImageError}
          displayHeadUrl={step_one.main_image ? true : false}
        />
        <HeadShotImage
          onImageFound={imagePickerBanner}
          url={step_one.banner_image}
          showNote={false}
          id={IMAGE_TYPE.BANNER_IMAGE}
          heading={translations.BANNER_IMAGE}
          note={translations.PAGEANT_BANNER1}
          label={translations.UPLOAD_BANNER_IMAGE_FOR_THIS_PAGEANT}
          displayHeadUrl={step_one.banner_image ? true : false}
        />
      </View>
      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
        pageantPlanDetail={pageantPlanDetail}
        pageantId={pageantId}
      />
    </View>
  );
};

export default AddPageantForm;
