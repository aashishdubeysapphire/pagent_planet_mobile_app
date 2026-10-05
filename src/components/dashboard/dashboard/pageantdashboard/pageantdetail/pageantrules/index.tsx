import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './styles';
import { color } from '../../../../../../assets/colorConstant';
import {
  Pageant,
  PageantPhaseOfCompetition,
} from '../../../../../../services/models/pageantdetails/pageant';
import { CountryState } from '../../../../../../services/models/country/CountryState';
import { moderateScaleVertical } from '../../../../../utils/responsiveSize';
import translations from '../../../../../../assets/translations';
import { GENDER, PLACEMENT } from '../../../../../utils/enum';
import { createFirebaseLog, trackScreenView } from '../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../assets/translations/analyticsscreenname';
interface Props {
  rules: Pageant;
  isActive: boolean;
}
const PageantRules = ({ rules, isActive }: Props) => {
  const [selectedCountries, setSelectedCountries] = useState('');
  const [phaseOfCompetition, setPhaseOfCompetition] = useState({
    start: 0,
    end: 0,
  });
  const [countriesStartState, setCountriesStart] = useState({
    start: 0,
    end: 0,
  });
  const [stateStartState, setStateStartState] = useState({
    start: 0,
    end: 0,
  });
  const [selectedPhaseOfCompitions, setSelectedPhaseOfCompitions] =
    useState('');

  const _handleFocus = () => {
    createFirebaseLog(_handleFocus.name, PageantRules.name, false);
    setPhaseOfCompetition(null);
    setStateStartState(null);
    setCountriesStart(null);
  };

  const getListString = (items: CountryState[]) => {
    createFirebaseLog(getListString.name, PageantRules.name, false);
    let itemListString = '';
    for (let index = 0; index < items.length; index++) {
      if (items[index].country !== undefined) {
        if (index + 1 === items.length) {
          itemListString = itemListString + items[index].country.name;
        } else {
          itemListString = itemListString + items[index].country.name + ', ';
        }
      } else {
        if (index + 1 === items.length) {
          itemListString = itemListString + items[index].state.name;
        } else {
          itemListString = itemListString + items[index].state.name + ', ';
        }
      }
    }

    return itemListString;
  };

  const getListStringOfPhaseOfCompition = (
    items: PageantPhaseOfCompetition[],
  ) => {
    createFirebaseLog(getListStringOfPhaseOfCompition.name, PageantRules.name, false);
    let itemListString = '';
    for (let index = 0; index < items?.length; index++) {
      if (index + 1 === items.length) {
        itemListString =
          itemListString +
          (items[index].name !== undefined
            ? items[index].name
            : items[index].phase_of_competition.name);
      } else {
        itemListString =
          itemListString +
          (items[index].name !== undefined
            ? items[index].name
            : items[index].phase_of_competition.name) +
          ', ';
      }
    }
    //items[index].phase_of_competition.name
    return itemListString;
  };
  const isData = (items: string | undefined) => {

    createFirebaseLog(isData.name, PageantRules.name, false);
    if (items === undefined || items === null || items.length === 0) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PAGEANT_RULES);
    setSelectedCountries(getListString(rules?.pageant_country));
    if (rules?.pageantPhaseOfCompetitionsData !== undefined) {
      setSelectedPhaseOfCompitions(
        getListStringOfPhaseOfCompition(rules?.pageantPhaseOfCompetitionsData),
      );
    } else {
      setSelectedPhaseOfCompitions(
        getListStringOfPhaseOfCompition(rules?.pageant_phase_of_competition),
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(rules?.is_married)
              ? color.WHITE
              : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.ARE_YOU_ALLOWED_TO_BE_MARRIED}
        </Text>
        <Text style={styles.valueText}>
          {(rules?.is_married === undefined || rules?.is_married) === null
            ? translations.NO_DATA
            : rules?.is_married === GENDER.BOTH
              ? translations.BOTH_WE_ALLOW_BOTH_MARRIES_AND_NO_MARRRIED_CONTESTANTS
              : rules?.is_married}
        </Text>
      </View>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(rules?.have_kids)
              ? color.WHITE
              : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.ARE_YOU_ALLOWED_TO_HAVE_KIDS}
        </Text>
        <Text style={styles.valueText}>
          {(rules?.have_kids === undefined || rules?.have_kids) === null
            ? translations.NO_DATA
            : rules.have_kids === GENDER.BOTH
              ? translations.BOTH_WE_ALLOW_BOTH_CONTESTANTS_WITH_AND_WITHOUT_CHILDREN_TO_COMPLETE
              : rules.have_kids}
        </Text>
      </View>

      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(selectedPhaseOfCompitions)
              ? color.WHITE
              : color.S_GRAY_1,
            paddingBottom: moderateScaleVertical(0),
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.WHAT_ARE_THE_PHASES_OF_COMPETITION}
        </Text>
        <TextInput
          style={styles.inputField}
          multiline={true}
          contextMenuHidden={true}
          showSoftInputOnFocus={false}
          focusable={false}
          selection={phaseOfCompetition}
          caretHidden={true}
          onFocus={_handleFocus}
          value={
            (rules?.pageant_phase_of_competition === undefined ||
              rules?.pageant_phase_of_competition) === null ||
              rules?.pageant_phase_of_competition.length === 0
              ? translations.NO_DATA
              : selectedPhaseOfCompitions
          }
        />
      </View>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(rules?.gender)
              ? color.WHITE
              : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.WHO_IS_ALLOWED_TO_COMPETE}
        </Text>
        <Text style={styles.valueText}>
          {rules?.gender === undefined || rules?.gender === null
            ? translations.NO_DATA
            : rules.gender === GENDER.BOTH
              ? translations.BOTH_WE_AlLOW_BOTH_MALE_AND_FEMALE_CONTESTANT
              : rules.gender}
        </Text>
      </View>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(rules?.age_from)
              ? color.WHITE
              : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.floatingTitle}>{translations.AGE_RANGE}</Text>
        <Text style={styles.valueText}>
          {((rules?.age_from === undefined || rules?.age_from) === null &&
            rules?.age_to === undefined) ||
            rules?.age_to === null
            ? translations.NO_DATA
            : rules?.age_from + ' - ' + rules?.age_to + ' Years'}
        </Text>
      </View>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(rules?.age_from)
              ? color.WHITE
              : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.IS_THERE_AN_ETHNICITY_REQ_FOR_COMP}
        </Text>
        <Text style={styles.valueText}>
          {isActive
            ? rules?.speciality_type_name === PLACEMENT.NONE
              ? translations.NO
              : translations.YES
            : translations.NO_DATA}
        </Text>
      </View>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(rules?.age_from)
              ? color.WHITE
              : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.IS_THERE_AN_UNIQUE_REQ_FOR_COMP}
        </Text>
        <Text style={styles.valueText}>
          {isActive
            ? rules?.sub_speciality_type_name === PLACEMENT.NONE
              ? translations.NO
              : translations.YES
            : translations.NO_DATA}
        </Text>
      </View>
      {/* <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isData(rules?.speciality_pageant)
              ? color.WHITE
              : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.ADDITIONAL_COMPETITION_REQUIREMENT_TO_COMPETE}
        </Text>
        <Text style={styles.valueText}>
          {(rules?.speciality_pageant === undefined ||
            rules?.speciality_pageant) === null
            ? translations.NO_DATA
            : rules?.speciality_pageant}
        </Text>
      </View> */}

      <View
        style={[
          styles.itemContainer,
          {
            marginBottom:
              rules?.pageant_country.length > 1
                ? moderateScaleVertical(120)
                : moderateScaleVertical(16),
            backgroundColor: isData(selectedCountries)
              ? color.WHITE
              : color.S_GRAY_1,
            paddingBottom: moderateScaleVertical(0),
          },
        ]}>
        <Text style={styles.floatingTitle}>
          {translations.WHICH_COUNTRY_DO_YOU_NEED_TO_LIVE_IN_TO_COMPETE}
        </Text>
        <TextInput
          style={styles.inputField}
          multiline={true}
          contextMenuHidden={true}
          selection={countriesStartState}
          focusable={false}
          caretHidden={true}
          onFocus={_handleFocus}
          showSoftInputOnFocus={false}
          value={
            (rules?.pageant_country === undefined || rules?.pageant_country) ===
              null || rules?.pageant_country.length === 0
              ? translations.NO_DATA
              : selectedCountries
          }
        />
      </View>
      {rules?.pageant_country.length < 2 ? (
        <View
          style={[
            styles.itemContainer,
            {
              marginBottom: moderateScaleVertical(120),
              backgroundColor:
                selectedCountries.length > 0 || rules?.pageant_state.length > 0
                  ? color.WHITE
                  : color.S_GRAY_1,
              paddingBottom: moderateScaleVertical(0),
            },
          ]}>
          <Text style={styles.floatingTitle}>
            {translations.WHICH_STAET_DO_YOU_NEED_TO_LIVE_IN_TO_COMPETE}
          </Text>
          <TextInput
            style={styles.inputField}
            multiline={true}
            focusable={false}
            caretHidden={true}
            onFocus={_handleFocus}
            selection={stateStartState}
            contextMenuHidden={true}
            showSoftInputOnFocus={false}
            value={
              (rules?.pageant_state === undefined || rules?.pageant_state) ===
                null || rules?.pageant_state.length === 0
                ? selectedCountries.length > 0
                  ? translations.EVERY_STATE
                  : translations.NO_DATA
                : getListString(rules?.pageant_state)
            }
          />
        </View>
      ) : null}
    </View>
  );
};

export default PageantRules;
