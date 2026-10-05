import {ScrollView, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import {styles} from './styles';
import FloatingInput from '../../../../common/floatinginput';
import FloatingDropdown from '../../../../common/floatingdropown';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {MASTERDATA} from '../../../../utils/enum';
import {
  GET_AGE_DEVISION,
  GET_MASTER_DATA,
  SAVE_PAGEANT_CREATE_REQUEST,
} from '../../../../../services/endpoints';
import {UserContext} from '../../../../../store/userStore';
import {useSetLoader} from '../../../../../store/useAppStore';
import CustomBottomModal from '../../../../common/custombottommodal';
import MultiSelectinput from '../../../../common/multiselectinput';
import {toast, toastError, toastType} from '../../../../common/commonalert';
import SearchCountryState, {
  ITEM_KEY,
} from '../../../../common/searchcountrystate';
import FloatingBigInput from '../../../../common/floatingbiginput';
import {
  keyBoardManager,
  removeMiddleSpaces,
} from '../../../../utils/helperFunction';
import {isURL, removeEmojis} from '../../../../utils/validations';
import WelcomeModal from '../../chooseprofiletype/welcomemodal';
import AppImages from '../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MethodTypes} from '../../../../../services/constants';
import {ROLES, USER_DESHBOARD_TAB} from '../../../../utils/enum';

const PageantCreationRequest = () => {
  const {storeData} = React.useContext(UserContext);
  const navigation = useNavigation();
  const setLoader = useSetLoader();
  const scrollRef = useRef();
  const [isCountryStateModalKey, setCountryStateModalKey] = useState(-1);
  const [isCountryStateModalVisible, setCountryStateModalVisible] =
    useState(false);
  const [socialMediaHandleRef, setSocialMediaHandleRef] = useState('');
  const [setWebsiteRef] = useState('');
  const [additionalInfoRef, setAdditionalInfoRef] = useState('');
  const [dataSourceCords, setDataSourceCords] = useState({});

  //errorMessage
  const [nameOfPageantErr, setNameOfPageantErr] = useState('');
  const [pageantyearErr, setPageantyearErr] = useState('');
  const [ageDevisionErr, setAgeDevisionErr] = useState('');
  const [phasesOfCompetitionErr, setPhasesOfCompetitionErr] = useState('');
  const [countryErr, setCountryErr] = useState('');
  const [webErr, setWebErr] = useState('');
  const [socialMediaErr, setSocialMediaErr] = useState('');
  const [additionalErr, setAdditionalErr] = useState('');
  const [state, setState] = useState({
    nameOfPageant: '',
    year: {id: '', name: ''},
    age: [],
    phasesOfCompetetion: [],
    country: {id: -1, title: ''},
    state: {id: '', title: ''},
    socialMediaHandle: '',
    website: '',
    additionalInfo: '',
  });
  const [isModalVisible, setIsModalVisible] = useState({
    years: false,
    age: false,
    phasesOfCompetetion: false,
    thankYou: false,
  });
  const [modalList, setmodalList] = useState({
    years: [],
    age: [],
    phasesOfCompetetion: [],
  });

  React.useEffect(() => {
    getMasterData();
    keyBoardManager();
  }, []);

  const getIdAsList = (data: any[]) => {
    let idArray: string[] = [];
    data.map(i => {
      idArray.push(String(i?.id));
    });
    return idArray;
  };
  const saveCreatePagentRequestBody = {
    title: state.nameOfPageant,
    year_id: state.year.id,
    age_division_ids: getIdAsList(state.age),
    phases_of_competition_ids: getIdAsList(state.phasesOfCompetetion),
    country_id: state.country.id,
    state_id: state.state.id,
    website: state.website,
    social_media_handler: state.socialMediaHandle,
    description: state.additionalInfo,
  };
  const onChangeState = data => {
    setState({...state, ...data});
  };

  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.YEARS},${MASTERDATA.PHASES_OF_COMPETETION}`,
    },
    offSuccessToast: true,
  });
  const {mutateAsync: getAgeDevision} = useCgMutation({
    key: GET_AGE_DEVISION,
    method: MethodTypes.GET,
    url: GET_AGE_DEVISION,
    auth: storeData.data?.access_token,
    offSuccessToast: true,
  });
  const {mutateAsync: saveCreatePagentRequest} = useCgMutation({
    key: SAVE_PAGEANT_CREATE_REQUEST,
    body: saveCreatePagentRequestBody,
    url: SAVE_PAGEANT_CREATE_REQUEST,
    offSuccessToast: true,
  });
  const getMasterData = async () => {
    setLoader(true);
    const res = await getMasterDetails();
    if (res.success) {
      setmodalList({
        ...modalList,
        years: res.data.master_records.years,
        phasesOfCompetetion: res.data.master_records.phases_of_competition,
      });
      setLoader(false);
    }
  };
  const getAgeDevisionhitAPi = async () => {
    setLoader(true);
    const res = await getAgeDevision();
    if (res.success) {
      setmodalList({
        ...modalList,
        age: res.data.age_divisions,
      });

      setTimeout(() => {
        setIsModalVisible({
          ...isModalVisible,
          age: true,
        });
      }, 200);

      setLoader(false);
    }
  };

  const onItemSelection = (id: number, title: string, key: any) => {
    if (key === ITEM_KEY.COUNTRY) {
      if (state.country.id !== id) {
        onChangeState({
          country: {
            id: id,
            title: title,
          },
          state: {
            id: '',
            title: '',
          },
        });
      } else {
        onChangeState({
          country: {
            id: id,
            title: title,
          },
        });
      }
    } else if (key === ITEM_KEY.STATE) {
      onChangeState({
        state: {
          id: id,
          title: title,
        },
      });
    }
  };

  const optionalValidation = () => {
    if (!!state.website) {
      if (!isURL(state.website)) {
        setWebErr(translations.PLEASE_ENTER_A_VALID_LINK);
        return false;
      } else {
        setWebErr('');
      }
    } else {
      setWebErr('');
    }
    if (!!state.socialMediaHandle) {
      if (!isURL(state.socialMediaHandle)) {
        setSocialMediaErr(translations.PLEASE_ENTER_A_VALID_LINK);
        return false;
      } else {
        setSocialMediaErr('');
      }
    } else {
      setSocialMediaErr('');
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
    if (!state.nameOfPageant) {
      scrollHandler(translations.NAME_OF_PEAGEANT);
    } else if (!state.year.id) {
      scrollHandler(translations.EVENT_YEAR);
    } else if (state.age.length == 0) {
      scrollHandler(translations.AGE_DIVISION);
    } else if (!state.country.title) {
      scrollHandler(translations.COUNTRY);
    } else if (!optionalValidation()) {
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({animated: true});
      }
    }
  };
  const isValid = () => {
    state.nameOfPageant
      ? setNameOfPageantErr('')
      : setNameOfPageantErr(translations.THIS_FIELD_REQUIRED);
    state.year.id
      ? setPageantyearErr('')
      : setPageantyearErr(translations.THIS_FIELD_REQUIRED);
    state.age.length > 0
      ? setAgeDevisionErr('')
      : setAgeDevisionErr(translations.THIS_FIELD_REQUIRED);
    state.phasesOfCompetetion.length > 0
      ? setPhasesOfCompetitionErr('')
      : setPhasesOfCompetitionErr(translations.THIS_FIELD_REQUIRED);

    state.country.title
      ? setCountryErr('')
      : setCountryErr(translations.THIS_FIELD_REQUIRED);
    state.additionalInfo
      ? setAdditionalErr('')
      : setAdditionalErr(translations.THIS_FIELD_REQUIRED);
    const optional = optionalValidation;
    if (
      state.nameOfPageant &&
      state.year.id &&
      state.age.length > 0 &&
      state.phasesOfCompetetion.length > 0 &&
      state.country.title &&
      state.additionalInfo &&
      optional !== false
    ) {
      optionalValidation();
      return true;
    } else {
      scrollToTopError();
    }
  };

  const onPressSave = async () => {
    if (isValid()) {
      setLoader(true);
      const res = await saveCreatePagentRequest();
      if (res.success) {
        setTimeout(() => {
          setIsModalVisible({
            ...isModalVisible,
            thankYou: true,
          });
        }, 100);
        setLoader(false);
      }
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };

  const goToContestant = () => {
    navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
      redirectedto: ROLES.CONTESTANT,
    });
  };

  const onPressBackToDashboard = () => {
    setIsModalVisible({
      ...isModalVisible,
      thankYou: false,
    });
    storeData.data?.user.primary_profile_type === null
      ? navigation.navigate(SCREEN.CREATE_PROFILE)
      : goToContestant();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={translations.PAGEANT_CREATION_REQUEST}
        rightText={translations.SAVE}
        onPressRightText={() => {
          onPressSave();
        }}
        isUnderLineRequired
      />

      <ScrollView
        style={styles.subContiner}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        ref={scrollRef}>
        <FloatingInput
          floatingText={translations.NAME_OF_PEAGEANT}
          setText={value => onChangeState({nameOfPageant: removeEmojis(value)})}
          value={state.nameOfPageant}
          returnKeyType={'done'}
          isMandatory={true}
          errorMsg={nameOfPageantErr}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingDropdown
          floatingText={translations.EVENT_YEAR}
          value={String(state?.year?.name)}
          isMandatory={true}
          dropdown={true}
          onFieldFocus={() => {
            setIsModalVisible({
              ...isModalVisible,
              years: true,
            });
          }}
          errorMsg={pageantyearErr}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <CustomBottomModal
          isModalVisible={isModalVisible.years}
          setIsModalVisible={val => {
            setIsModalVisible({
              ...isModalVisible,
              years: val,
            });
          }}
          data={modalList.years}
          preSelectedValue={state.year.id}
          parentCallback={selectedText => {
            onChangeState({year: selectedText});
          }}
          heading={translations.PEAGEANT_YEAR}
          enableSearch={true}
        />
        <MultiSelectinput
          floatingText={translations.AGE_DEVISION}
          setText={value => onChangeState({age: value})}
          value={state.age}
          isMandatory={true}
          dropdown={true}
          onFieldFocus={() => getAgeDevisionhitAPi()}
          errorMsg={ageDevisionErr}
          onDelete={val => {
            onChangeState({age: val});
          }}
          addMore={() =>
            setIsModalVisible({
              ...isModalVisible,
              age: true,
            })
          }
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
          parentCallback={selectedText => onChangeState({age: selectedText})}
          heading={translations.AGE_DEVISION}
          enableSearch={true}
          enableMultiselect={true}
          preSelectedValue={state.age}
        />
        <MultiSelectinput
          floatingText={translations.PHASES_OF_COMPETETION}
          setText={value => onChangeState({phasesOfCompetetion: value})}
          value={state.phasesOfCompetetion}
          isMandatory={true}
          dropdown={true}
          errorMsg={phasesOfCompetitionErr}
          onFieldFocus={() =>
            setIsModalVisible({
              ...isModalVisible,
              phasesOfCompetetion: true,
            })
          }
          onDelete={val => {
            onChangeState({phasesOfCompetetion: val});
          }}
          addMore={() =>
            setIsModalVisible({
              ...isModalVisible,
              phasesOfCompetetion: true,
            })
          }
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <CustomBottomModal
          isModalVisible={isModalVisible.phasesOfCompetetion}
          setIsModalVisible={val =>
            setIsModalVisible({
              ...isModalVisible,
              phasesOfCompetetion: val,
            })
          }
          data={modalList.phasesOfCompetetion}
          parentCallback={selectedText =>
            onChangeState({phasesOfCompetetion: selectedText})
          }
          heading={translations.PHASES_OF_COMPETETION}
          enableSearch={true}
          enableMultiselect={true}
          preSelectedValue={state.phasesOfCompetetion}
        />
        <FloatingDropdown
          floatingText={translations.COUNTRY}
          setText={value => onChangeState({country: value})}
          value={state.country.title}
          isMandatory={true}
          dropdown={true}
          onFieldFocus={() => {
            setCountryStateModalKey(ITEM_KEY.COUNTRY);
            setCountryStateModalVisible(true);
          }}
          errorMsg={countryErr}
          onPressDropdown={() => {
            setCountryStateModalKey(ITEM_KEY.COUNTRY);
            setCountryStateModalVisible(true);
          }}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingDropdown
          floatingText={translations.STATE}
          setText={value => onChangeState({state: value})}
          value={state.state.title}
          dropdown={true}
          onFieldFocus={() => {
            if (state.country.id > 0) {
              setCountryStateModalKey(ITEM_KEY.STATE);
              setCountryStateModalVisible(true);
            } else {
              toast(
                translations.PLEASE_SELECT_A_COUNTRY,
                toastType.SUCESS_TOAST,
              );
            }
          }}
          onPressDropdown={() => {
            setCountryStateModalKey(ITEM_KEY.STATE);
            setCountryStateModalVisible(true);
          }}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <SearchCountryState
          title={
            isCountryStateModalKey === ITEM_KEY.COUNTRY
              ? translations.SEARCH_COUNTRY
              : translations.SEARCH_STATES
          }
          modelId={isCountryStateModalKey}
          isModalVisible={isCountryStateModalVisible}
          setIsModalVisible={setCountryStateModalVisible}
          preSelectedValue={
            isCountryStateModalKey === ITEM_KEY.COUNTRY
              ? state.country.id
              : state.state.id
          }
          countryId={state.country.id}
          onItemSelect={onItemSelection}
        />
        <FloatingInput
          setRef={setWebsiteRef}
          floatingText={translations.WEBSITE}
          setText={value => onChangeState({website: removeEmojis(value)})}
          value={state.website}
          returnKeyType={'next'}
          nextField={socialMediaHandleRef}
          errorMsg={webErr}
        />
        <FloatingInput
          setRef={setSocialMediaHandleRef}
          floatingText={translations.SOCIAL_MEIA_HANDLE}
          setText={value =>
            onChangeState({socialMediaHandle: removeEmojis(value)})
          }
          value={state.socialMediaHandle}
          returnKeyType={'next'}
          nextField={additionalInfoRef}
          errorMsg={socialMediaErr}
        />

        <FloatingBigInput
          floatingText={translations.ADDITIONAL_INFO}
          value={state.additionalInfo}
          setRef={setAdditionalInfoRef}
          returnKeyType={'done'}
          isMandatory={true}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={'top'}
          lengthCheck={true}
          setText={value =>
            onChangeState({
              additionalInfo: removeEmojis(value),
            })
          }
          forMultiline={true}
          autoCapitalize={'sentences'}
          showLength={false}
          errorMsg={additionalErr}
        />
        <View style={styles.bottomHeight}></View>
      </ScrollView>
      <WelcomeModal
        label={''}
        bodyText={translations.WE_WILL_ADD_PAGENT_IN_48_HRS}
        icon={<AppImages.Common.thankYou_ICON />}
        isModalVisible={isModalVisible.thankYou}
        buttonText={translations.BACK_TO_DASHBOARD}
        closeModal={onPressBackToDashboard}
        customStyles={styles.modalButtonBottom}
        giveStaticHeight={false}
      />
    </SafeAreaView>
  );
};

export default PageantCreationRequest;
