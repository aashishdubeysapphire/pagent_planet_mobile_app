import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import MultiSelectinput from '../../../../../../common/multiselectinput';
import translations from '../../../../../../../assets/translations';
import FloatingInput from '../../../../../../common/floatinginput';
import DynamicradioButton from '../../../../../../common/dynamicradiobutton/dynamicradioButton';
import {GENDER_LIST, THREE_OPTIONS} from '../loccalArray';
import AppImages from '../../../../../../../assets/images/AppImages';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {
  GET_AGE_DEVISION,
  GET_MASTER_DATA,
  GET_PAGEANT_AND_EVENT_DETAIL,
} from '../../../../../../../services/endpoints';
import {MASTERDATA} from '../../../../../../utils/enum';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import CustomBottomModal from '../../../../../../common/custombottommodal';
import FloatingDropdown from '../../../../../../common/floatingdropown';
import SearchCountryState, {
  ITEM_KEY,
} from '../../../../../../common/searchcountrystate';
import {CountryState} from '../../../../../../../services/models/country/CountryState';
import {
  ConTwoDecDigit,
  getIDsArrayFromArray,
  keyBoardManager,
  removeMiddleSpaces,
} from '../../../../../../utils/helperFunction';
import {checkIsNull, isValueNull} from '../../../../../../utils/validations';
import {PageantDetailData} from '../../../../../../../services/models/pageantdetails/pageantDetailData';
import {useIsFocused} from '@react-navigation/core';
import {MethodTypes} from '../../../../../../../services/constants';
import {toastError} from '../../../../../../common/commonalert';

const PagentRulesComp = ({
  isSavePressed,
  setIsSavePressed,
  setAddBody,
  param,
  createNewPagent,
}) => {
  const isFocused = useIsFocused();

  const scrollRef = React.useRef();
  const setLoader = useSetLoader();
  const [selectedCountries, setSelectedCountries] = useState<CountryState[]>(
    [],
  );
  const [dataSourceCords, setDataSourceCords] = useState({});
  const [isInactive, setIsInactive] = useState(false);
  const [ageDevisionErr, setAgeDevisionErr] = useState('');
  const [phasesOfCompErr, setPhasesOfCompErr] = useState('');
  const [ageErr, setAgeErr] = useState('');
  const [countryErr, setCountryErr] = useState('');
  const [genderErr, setGenderErr] = useState('');
  const [selectedStates, setSelectedStats] = useState<CountryState[]>([]);
  const [married, setMarried] = useState(translations.NO_SMALL);
  const [haveKids, setHaveKids] = useState(translations.NO_SMALL);
  const [toAgeRef, setToAgeRef] = useState('');
  const [ethnicityErr, setEthnicityErr] = useState('');
  const [uniquenessErr, setUniquenessErr] = useState('');
  const [costToCompeteErr, setCostToCompeteErr] = useState('');
  const [bacenkdListData, setBackendListData] = useState({
    ageDevision: [],
    phasesOfCompetetion: [],
    country: [],
    state: [],
    gender: GENDER_LIST,
    ethnicity: [],
    uniqueness: [],
  });

  const [isModalVisible, setIsModalVisible] = useState({
    ageDevision: false,
    phasesOfCompetetion: false,
    country: false,
    state: false,
    gender: false,
    warning: false,
    ethnicity: false,
    uniqueness: false,
  });
  const [userData, setUserData] = useState({
    ageDevision: [],
    phasesOfCompetetion: [],
    gender: {name: '', id: ''},
    costToCompete: '',
    fromAge: '',
    toAge: '',
    txt_for_speciality_type: '',
    ethnicity: {id: ''},
    uniqueness: {id: ''},
  });
  const [additionalRequir, setAdditionalRequir] = useState(
    translations.NO_SMALL,
  );

  const [isCountryStateModalKey, setCountryStateModalKey] = useState(
    ITEM_KEY.COUNTRY,
  );
  const [isCountryStateModalVisible, setCountryStateModalVisible] =
    useState(false);
  const [countryId, setCountryId] = useState(-1);

  //API  ----------------------------------------- START
  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.PHASES_OF_COMPETETION}`,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getAgeDevision} = useCgMutation({
    key: GET_AGE_DEVISION,
    method: MethodTypes.GET,
    url: GET_AGE_DEVISION,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getPageantById} = useCgMutation<PageantDetailData>({
    key: GET_PAGEANT_AND_EVENT_DETAIL,
    method: MethodTypes.GET,
    url: GET_PAGEANT_AND_EVENT_DETAIL + param?.pageantId,
    offSuccessToast: true,
    disableLoader: true,
  });
  //API  ----------------------------------------- END
  const getAge = val => {
    if (val <= 9) {
      return '0' + val;
    } else {
      return val;
    }
  };

  const moveDataToScreen = () => {
    let localBody = {
      id: param.pageantId,
      pageant_age_divisions: getIDsArrayFromArray(userData.ageDevision),
      pageant_countries: getIDsArrayFromArray(selectedCountries),
      pageant_states: getIDsArrayFromArray(selectedStates),
      pageant_phase_of_competitions: getIDsArrayFromArray(
        userData.phasesOfCompetetion,
      ),
      age_from: getAge(userData.fromAge),
      age_to: getAge(userData.toAge),
      speciality_pageant: additionalRequir,
      txt_for_speciality_type: userData.txt_for_speciality_type,
      gender: userData.gender.name,
      is_married: married,
      have_kids: haveKids,
      speciality_type: userData?.ethnicity?.id,
      sub_speciality_type: userData?.uniqueness?.id,
      speciality_type_name: userData?.ethnicity?.name,
      sub_speciality_type_name: userData?.uniqueness?.name,
      add_new: param?.isEditing ? 0 : 1,
    };
    if (param?.isEditing) {
      setAddBody({
        ...localBody,
      });
    } else {
      setAddBody({
        ...localBody,
        entry_fees: userData?.costToCompete
          ? Number(userData?.costToCompete).toFixed(2) + ''
          : '',
      });
    }

    return true;
  };

  const allCountrySelected = [
    {
      id: 'All Countries',
      isSelected: true,
      name: 'All Countries',
      phone_code: 93,
      sort_name: 'AF',
      status: 1,
    },
  ];

  useEffect(() => {
    moveDataToScreen();
  }, [
    userData,
    isFocused,
    married,
    haveKids,
    isCountryStateModalVisible,
    additionalRequir,
    selectedCountries,
    selectedStates,
  ]);

  const onChangeBacenkdListData = data => {
    setBackendListData({...bacenkdListData, ...data});
  };
  const onChangeUserData = data => {
    setUserData({...userData, ...data});
  };

  useEffect(() => {
    keyBoardManager();
    getListDataFromBackend();
    if (checkIsNull(param?.pageantDetail)) {
      displayRules(param.pageantDetail);
    } else if (checkIsNull(param?.pageantId)) {
      hitGetPageantById();
    }
  }, []);

  useEffect(() => {
    if (isSavePressed) {
      isValid();
    }
    setIsSavePressed(false);
  }, [isSavePressed]);

  const ageValidation = () => {
    if (userData.fromAge === '' || userData.toAge === '') {
      setAgeErr(translations.THIS_FIELD_REQUIRED);
      return false;
    } else if (
      Number(userData.toAge) > 100 ||
      Number(userData.fromAge) > 100 ||
      Number(userData.toAge) <= 0 ||
      Number(userData.fromAge) <= 0
    ) {
      setAgeErr(translations.PLEASE_ENTER_VALID_AGE);
      return false;
    } else if (Number(userData.fromAge) > Number(userData.toAge)) {
      setAgeErr(translations.AGE_ERR);
      return false;
    } else {
      setAgeErr('');
      return true;
    }
  };

  const moveToSpecificError = () => {
    if (userData?.ageDevision?.length === 0) {
      moveToError(translations.WHAT_ARE_YOUR_AGE_DIVISIONS);
    } else if (userData?.phasesOfCompetetion?.length === 0) {
      moveToError(translations.PHASES_OF_COMPETITION);
    } else if (!isCostToCompeteValid()) {
      moveToError(
        translations.HOW_MUCH_DOES_IT_COST_TO_COMPETE_IN_YOUR_PAGEANT,
      );
    } else if (ageValidation()) {
      moveToError(translations.FROM);
    } else if (selectedCountries.length === 0) {
      moveToError(translations.COUNTRY);
    } else if (!!!userData?.gender?.name) {
      moveToError(translations.GENDER);
    } else if (!!!userData?.ethnicity?.name) {
      moveToError(translations.ETHNICITY);
    } else if (!!!userData?.uniqueness?.name) {
      moveToError(translations.UNIQUENESS);
    }
  };
  const isCostToCompeteValid = () => {
    if (param?.isEditing) {
      return true;
    } else {
      

      let num = !!userData?.costToCompete
        ? Number(userData?.costToCompete).toFixed(2)
        : '';
      if (!!userData?.costToCompete) {
        if (num === '0.00' || isNaN(num)) {
          setCostToCompeteErr(translations.DIGIT_IS_NOT_PERMITTED);
          return false;
        } else {
          setCostToCompeteErr('');
          return true;
        }
      } else {
        setCostToCompeteErr(translations.THIS_FIELD_REQUIRED);
        return false;
      }
    }
  };
  const isValid = () => {
    moveDataToScreen();
    userData?.ageDevision?.length === 0
      ? setAgeDevisionErr(translations.THIS_FIELD_REQUIRED)
      : setAgeDevisionErr('');

    userData?.phasesOfCompetetion?.length === 0
      ? setPhasesOfCompErr(translations.THIS_FIELD_REQUIRED)
      : setPhasesOfCompErr('');
    selectedCountries.length === 0
      ? setCountryErr(translations.THIS_FIELD_REQUIRED)
      : setCountryErr('');

    !!!userData?.gender?.name
      ? setGenderErr(translations.THIS_FIELD_REQUIRED)
      : setGenderErr('');

    !!!userData?.uniqueness?.name
      ? setUniquenessErr(translations.THIS_FIELD_REQUIRED)
      : setUniquenessErr('');
    !!!userData?.ethnicity?.name
      ? setEthnicityErr(translations.THIS_FIELD_REQUIRED)
      : setEthnicityErr('');
    ageValidation();
    isCostToCompeteValid();
    if (
      userData?.ageDevision.length !== 0 &&
      userData?.phasesOfCompetetion.length !== 0 &&
      selectedCountries.length !== 0 &&
      !!userData?.gender?.name &&
      !!userData?.uniqueness?.name &&
      !!userData?.ethnicity?.name &&
      ageValidation() &&
      isCostToCompeteValid() &&
      moveDataToScreen()
    ) {
      createNewPagent();
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
      moveToSpecificError();
    }
  };

  const hitGetPageantById = async () => {
    setLoader(true);
    const res = await getPageantById();
    if (res.pageant_details !== null) {
      displayRules(res.pageant_details);
    }
    setLoader(false);
  };
  const displayRules = pageantDetails => {
    for (const entry of pageantDetails.pageant_country) {
      entry.id = entry.country.id;
      entry.name = entry.country.name;
    }
    for (const entry of pageantDetails.pageant_state) {
      entry.id = entry.state.id;
      entry.name = entry.state.name;
    }
    setSelectedCountries(pageantDetails.pageant_country);
    setSelectedStats(pageantDetails.pageant_state);

    onChangeUserData({
      ageDevision: pageantDetails?.pageantAgeDivisionsData,
      phasesOfCompetetion: pageantDetails?.pageantPhaseOfCompetitionsData,
      gender: {
        name: pageantDetails?.gender,
        title: pageantDetails?.gender,
        id: pageantDetails?.gender,
      },
      fromAge: isValueNull(pageantDetails?.age_from),
      toAge: isValueNull(pageantDetails?.age_to),
      txt_for_speciality_type: pageantDetails?.txt_for_speciality_type,
      ethnicity: {
        id: !!pageantDetails?.speciality_type_name
          ? pageantDetails?.speciality_type
          : '',
        name: pageantDetails?.speciality_type_name,
      },
      uniqueness: {
        id: !!pageantDetails?.sub_speciality_type_name
          ? pageantDetails?.sub_speciality_type
          : '',
        name: pageantDetails?.sub_speciality_type_name,
      },
    });
    if (checkIsNull(pageantDetails.have_kids)) {
      setHaveKids(pageantDetails.have_kids);
    }
    if (checkIsNull(pageantDetails.is_married)) {
      setMarried(pageantDetails.is_married);
    }
    if (checkIsNull(pageantDetails.speciality_pageant)) {
      setAdditionalRequir(pageantDetails.speciality_pageant);
    }

    setIsInactive(pageantDetails.status);
  };
  const getListDataFromBackend = async () => {
    setLoader(true);

    const phasesOfCompRes = await getMasterDetails();
    if (phasesOfCompRes.success) {
      const ageDevisionRes = await getAgeDevision();
      if (ageDevisionRes.success) {
        onChangeBacenkdListData({
          phasesOfCompetetion:
            phasesOfCompRes.data.master_records.phases_of_competition,
          ageDevision: ageDevisionRes.data.age_divisions,
          ethnicity: ageDevisionRes?.data?.ethenticities,
          uniqueness: ageDevisionRes?.data?.uniqueness,
        });
      }
    }

    setLoader(false);
  };
  const onMultiItemSelect = (selectedItems: CountryState[]) => {
    if (isCountryStateModalKey === ITEM_KEY.COUNTRY) {
      setSelectedCountries([]);
      for (const entry of selectedItems) {
        setSelectedCountries(oldArray => [...oldArray, entry]);
      }
      if (selectedItems.length) {
        setSelectedStats([]);
      }
    } else {
      setSelectedStats([]);
      for (const entry of selectedItems) {
        setSelectedStats(oldArray => [...oldArray, entry]);
      }
    }
  };

  const openStateSearchModel = () => {
    setCountryStateModalKey(ITEM_KEY.STATE);
    if (selectedCountries.length === 1) {
      setCountryId(selectedCountries[0].id);
      setTimeout(() => {
        setCountryStateModalVisible(true);
      }, 1000);
    } else if (selectedCountries.length === 0) {
      setCountryErr(translations.THIS_FIELD_REQUIRED);
    }
  };

  const moveToError = key => {
    if (scrollRef?.current) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)],
        animated: true,
      });
    }
  };
  return (
    <>
      {isInactive !== 'Active' && param?.isEditing && (
        <View style={styles.inactiveMessageStyle}>
          <Text style={styles.inactiveMessageLabel}>
            {translations.WARNING_ADD_RULES_TO_ACTIVATE_YOUR_PAGEANT}
          </Text>
        </View>
      )}
      <ScrollView ref={scrollRef}>
        <View style={styles.parentScrool}>
          <MultiSelectinput
            floatingText={translations.WHAT_ARE_YOUR_AGE_DEVISION}
            value={userData?.ageDevision}
            isMandatory={true}
            onFieldFocus={() =>
              setIsModalVisible({
                ...isModalVisible,
                ageDevision: true,
              })
            }
            onDelete={val => {
              onChangeUserData({ageDevision: val});
            }}
            addMore={() =>
              setIsModalVisible({
                ...isModalVisible,
                ageDevision: true,
              })
            }
            errorMsg={ageDevisionErr}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
          <CustomBottomModal
            isModalVisible={isModalVisible.ageDevision}
            setIsModalVisible={val =>
              setIsModalVisible({
                ...isModalVisible,
                ageDevision: val,
              })
            }
            data={bacenkdListData.ageDevision}
            parentCallback={selectedText =>
              onChangeUserData({ageDevision: selectedText})
            }
            heading={translations.AGE_DEVISION}
            enableSearch={true}
            enableMultiselect={true}
            preSelectedValue={userData.ageDevision}
          />

          <MultiSelectinput
            floatingText={translations.PHASES_OF_COMPETITION}
            isMandatory={true}
            value={userData?.phasesOfCompetetion}
            isMandatory={true}
            onFieldFocus={() =>
              setIsModalVisible({
                ...isModalVisible,
                phasesOfCompetetion: true,
              })
            }
            onDelete={val => {
              onChangeUserData({phasesOfCompetetion: val});
            }}
            addMore={() =>
              setIsModalVisible({
                ...isModalVisible,
                phasesOfCompetetion: true,
              })
            }
            errorMsg={phasesOfCompErr}
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
            data={bacenkdListData.phasesOfCompetetion}
            parentCallback={selectedText =>
              onChangeUserData({phasesOfCompetetion: selectedText})
            }
            heading={translations.PHASES_OF_COMPETITION}
            enableSearch={true}
            enableMultiselect={true}
            preSelectedValue={userData.phasesOfCompetetion}
          />
          {param?.isEditing !== true && (
            <FloatingInput
              floatingText={
                translations.HOW_MUCH_DOES_IT_COST_TO_COMPETE_IN_YOUR_PAGEANT
              }
              returnKeyType={'done'}
              value={isValueNull(userData?.costToCompete)}
              setText={val => {
                onChangeUserData({costToCompete: ConTwoDecDigit(val.trim())});
              }}
              isMandatory
              keyboardType="numeric"
              errorMsg={costToCompeteErr}
              maxLength={6}
              laoutY={(val: any, index: string) => {
                let obj = dataSourceCords;
                obj[index] = val;
                setDataSourceCords(obj);
              }}
            />
          )}
          <Text style={styles.whoCanCompeteText}>
            {translations.WHO_CAN_COMPETE_FOR_THIS_PAGEANT}
          </Text>
          <Text style={styles.heading}>
            {translations.AGE_LIMIT}
            <Text style={styles.red}>{'*'}</Text>
          </Text>
          <View
            style={{flexDirection: 'row'}}
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              let obj = dataSourceCords;
              obj[removeMiddleSpaces(translations.FROM)] = layout.y;
              setDataSourceCords(obj);
            }}>
            <FloatingInput
              floatingText={translations.FROM}
              returnKeyType={'next'}
              value={userData.fromAge}
              nextField={toAgeRef}
              maxLength={3}
              setText={val =>
                onChangeUserData({fromAge: val.replace(/[^\d]/g, '')})
              }
              isMandatory
              keyboardType="numeric"
              customStyles={styles.dynamicWidth}
            />
            <FloatingInput
              floatingText={translations.TO}
              setRef={ref => setToAgeRef(ref)}
              returnKeyType={'done'}
              value={userData.toAge}
              maxLength={3}
              setText={val =>
                onChangeUserData({toAge: val.replace(/[^\d]/g, '')})
              }
              isMandatory
              keyboardType="numeric"
              customStyles={styles.dynamicWidth2}
            />
          </View>
          {!!ageErr && (
            <View style={styles.row}>
              <AppImages.Common.Alert_ICON />
              <Text style={styles.error}> {ageErr} </Text>
            </View>
          )}

          <MultiSelectinput
            floatingText={translations.COUNTRY}
            isMandatory={true}
            value={
              selectedCountries.length === 248
                ? allCountrySelected
                : selectedCountries
            }
            onFieldFocus={() => {
              setCountryStateModalKey(ITEM_KEY.COUNTRY);
              setTimeout(() => {
                setCountryStateModalVisible(true);
              }, 1000);
            }}
            onDelete={val => {
              setSelectedCountries(val);
              onChangeUserData({country: val});
              setTimeout(() => {
                if (val.length === 0) {
                  setSelectedStats([]);
                }
              }, 100);
            }}
            addMore={() => {
              setCountryStateModalKey(ITEM_KEY.COUNTRY);
              setTimeout(() => {
                setCountryStateModalVisible(true);
              }, 1000);
            }}
            errorMsg={countryErr}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />

          {selectedCountries.length === 1 || selectedCountries.length === 0 ? (
            <MultiSelectinput
              floatingText={translations.STATE}
              value={selectedStates}
              onFieldFocus={openStateSearchModel}
              onDelete={val => {
                setSelectedStats(val);
              }}
              addMore={openStateSearchModel}
            />
          ) : (
            <View style={{opacity: 0.5}}>
              <FloatingDropdown
                floatingText={translations.STATE}
                hideRightIcon
                value={'All Selected'}
              />
            </View>
          )}

          <SearchCountryState
            title={
              isCountryStateModalKey === ITEM_KEY.COUNTRY
                ? translations.SEARCH_COUNTRY
                : translations.SEARCH_STATES
            }
            modelId={isCountryStateModalKey}
            isModalVisible={isCountryStateModalVisible}
            setIsModalVisible={setCountryStateModalVisible}
            countryId={countryId}
            isMultiSelect={true}
            selectedCountries={
              isCountryStateModalKey === ITEM_KEY.COUNTRY
                ? selectedCountries
                : selectedStates
            }
            onMultiItemSelect={onMultiItemSelect}
          />

          <FloatingDropdown
            floatingText={translations.GENDER}
            isMandatory={true}
            setText={value => onChangeUserData({gender: value})}
            value={userData?.gender.name}
            onFieldFocus={() =>
              setIsModalVisible({
                ...isModalVisible,
                gender: true,
              })
            }
            errorMsg={genderErr}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />

          <CustomBottomModal
            isModalVisible={isModalVisible.gender}
            setIsModalVisible={val =>
              setIsModalVisible({
                ...isModalVisible,
                gender: val,
              })
            }
            data={bacenkdListData.gender}
            parentCallback={selectedText =>
              onChangeUserData({gender: selectedText})
            }
            heading={translations.GENDER}
            preSelectedValue={userData?.gender?.id}
            customStyles={{height: '30%'}}
          />

          <Text style={[styles.heading, styles.topZero, styles.bottomZero]}>
            {translations.MARRIED}
            <Text style={styles.red}>*</Text>
          </Text>
          <DynamicradioButton
            data={THREE_OPTIONS}
            selectedRadio={married}
            setSelectedRadio={val => setMarried(val)}
            customStyles={styles.marginRight32}
            numColumns={3}
          />

          <Text style={[styles.heading, styles.bottomZero]}>
            {translations.HAVE_KIDS}
            <Text style={styles.red}>*</Text>
          </Text>
          <DynamicradioButton
            data={THREE_OPTIONS}
            selectedRadio={haveKids}
            setSelectedRadio={val => setHaveKids(val)}
            customStyles={styles.marginRight32}
            numColumns={3}
          />
          <Text style={[styles.heading]}>
            {translations.ADDITIONAL_REQUIRMENTS}
            <Text style={styles.red}>*</Text>
          </Text>

          <FloatingDropdown
            floatingText={translations.ETHNICITY}
            isMandatory={true}
            value={userData?.ethnicity?.name}
            onFieldFocus={() =>
              setIsModalVisible({
                ...isModalVisible,
                ethnicity: true,
              })
            }
            errorMsg={ethnicityErr}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />

          <CustomBottomModal
            isModalVisible={isModalVisible.ethnicity}
            setIsModalVisible={val =>
              setIsModalVisible({
                ...isModalVisible,
                ethnicity: val,
              })
            }
            data={bacenkdListData.ethnicity}
            parentCallback={selectedText =>
              onChangeUserData({ethnicity: selectedText})
            }
            heading={translations.ETHNICITY}
            preSelectedValue={userData?.ethnicity?.id}
          />
          <FloatingDropdown
            floatingText={translations.UNIQUENESS}
            isMandatory={true}
            value={userData?.uniqueness.name}
            onFieldFocus={() =>
              setIsModalVisible({
                ...isModalVisible,
                uniqueness: true,
              })
            }
            errorMsg={uniquenessErr}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />

          <CustomBottomModal
            isModalVisible={isModalVisible.uniqueness}
            setIsModalVisible={val => {
              setIsModalVisible({
                ...isModalVisible,
                uniqueness: val,
              });
            }}
            data={bacenkdListData.uniqueness}
            parentCallback={selectedText =>
              onChangeUserData({uniqueness: selectedText})
            }
            heading={translations.UNIQUENESS}
            preSelectedValue={userData?.uniqueness?.id}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PagentRulesComp;
