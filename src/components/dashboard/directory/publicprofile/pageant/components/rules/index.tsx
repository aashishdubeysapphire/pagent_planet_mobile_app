import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import translations from '../../../../../../../assets/translations';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import {
  Pageant,
  PageantPhaseOfCompetition,
} from '../../../../../../../services/models/pageantdetails/pageant';
import {GENDER, PLACEMENT} from '../../../../../../utils/enum';
import {CountryState} from '../../../../../../../services/models/country/CountryState';

// New carousel import
import Carousel from 'react-native-reanimated-carousel';

interface Props {
  pageant: Pageant | undefined;
  bgColor?: string;
  forPublicPage?: boolean;
}

export interface RulesItem {
  title: string;
  rules: string | undefined;
}

const Rules = ({pageant, bgColor, forPublicPage}: Props) => {
  const [rules, setRules] = useState<RulesItem[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;

  const renderRulesView = ({item}: {item: RulesItem}) => {
    return (
      <TouchableOpacity
        style={styles.rectangularView}
        onPress={() => {
          navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_RULES, {
            pageant: pageant,
          });
        }}>
        <Text
          style={styles.subHeading}
          ellipsizeMode={'tail'}
          numberOfLines={2}>
          {item.title}
        </Text>
        <Text
          style={styles.description}
          ellipsizeMode={'tail'}
          numberOfLines={2}>
          {item.rules}
        </Text>
      </TouchableOpacity>
    );
  };

  const getListStringOfPhaseOfCompition = (
    items: PageantPhaseOfCompetition[] | undefined,
  ) => {
    if (!items || items.length === 0) return translations.NO_DATA;
    return items
      .map(item => item?.phase_of_competition?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getRulesListString = (items: CountryState[] | undefined) => {
    if (!items || items.length === 0) return '';
    return items
      .map(item => item.country?.name || item.state?.name)
      .filter(Boolean)
      .join(', ');
  };

  useEffect(() => {
    const newRules: RulesItem[] = [];

    newRules.push({
      title: translations.ARE_YOU_ALLOWED_TO_BE_MARRIED,
      rules:
        pageant?.is_married == null
          ? translations.NO_DATA
          : pageant?.is_married === GENDER.BOTH
          ? translations.BOTH_WE_ALLOW_BOTH_MARRIES_AND_NO_MARRRIED_CONTESTANTS
          : pageant?.is_married,
    });

    newRules.push({
      title: translations.ARE_YOU_ALLOWED_TO_HAVE_KIDS,
      rules:
        pageant?.have_kids == null
          ? translations.NO_DATA
          : pageant?.have_kids === GENDER.BOTH
          ? translations.BOTH_WE_ALLOW_BOTH_CONTESTANTS_WITH_AND_WITHOUT_CHILDREN_TO_COMPLETE
          : pageant?.have_kids,
    });

    newRules.push({
      title: translations.WHAT_ARE_THE_PHASES_OF_COMPETITION,
      rules: getListStringOfPhaseOfCompition(pageant?.pageant_phase_of_competition),
    });

    newRules.push({
      title: translations.WHO_IS_ALLOWED_TO_COMPETE,
      rules:
        pageant?.gender == null
          ? translations.NO_DATA
          : pageant?.gender === GENDER.BOTH
          ? translations.BOTH_WE_AlLOW_BOTH_MALE_AND_FEMALE_CONTESTANT
          : pageant?.gender,
    });

    newRules.push({
      title: translations.AGE_RANGE,
      rules:
        (pageant?.age_from == null && pageant?.age_to == null) || pageant?.age_to == null
          ? translations.NO_DATA
          : `${pageant?.age_from} - ${pageant?.age_to} Years`,
    });

    newRules.push({
      title: translations.IS_THERE_AN_ETHNICITY_REQ_FOR_COMP,
      rules:
        pageant?.speciality_type_name === PLACEMENT.NONE
          ? translations.NO
          : translations.YES,
    });

    newRules.push({
      title: translations.IS_THERE_AN_UNIQUE_REQ_FOR_COMP,
      rules:
        pageant?.sub_speciality_type_name === PLACEMENT.NONE
          ? translations.NO
          : translations.YES,
    });

    newRules.push({
      title: translations.WHICH_COUNTRY_DO_YOU_NEED_TO_LIVE_IN_TO_COMPETE,
      rules:
        !pageant?.pageant_country || pageant?.pageant_country.length === 0
          ? translations.NO_DATA
          : getRulesListString(pageant?.pageant_country),
    });

    if (
      pageant?.pageant_country &&
      pageant?.pageant_country.length < 2
    ) {
      newRules.push({
        title: translations.WHICH_STAET_DO_YOU_NEED_TO_LIVE_IN_TO_COMPETE,
        rules:
          !pageant?.pageant_state || pageant?.pageant_state.length === 0
            ? getRulesListString(pageant?.pageant_country).length > 0
              ? translations.EVERY_STATE
              : translations.NO_DATA
            : getRulesListString(pageant?.pageant_state),
      });
    }

    setRules(newRules);
  }, [pageant]);

  const hasMultipleRules = rules.length > 1;

  return (
    <View>
      {rules.length > 0 && (
        <View style={{...styles.container, backgroundColor: bgColor}}>
          <View style={styles.rowSection}>
            <Text
              style={
                !forPublicPage ? styles.heading : styles.headingPublicPage
              }>
              {translations.RULES}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_RULES, {
                  pageant: pageant,
                });
              }}
              style={styles.viewStyles}>
              <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flatlistView}>
            <Carousel
              width={width}
              height={moderateScale(140)} // Adjust based on your card height
              data={rules}
              renderItem={renderRulesView}
              onSnapToItem={index => setActiveSlideIndex(index)}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.92,
                parallaxScrollingOffset: 60,
              }}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              loop={false}
              enabled={hasMultipleRules}
              // autoplay={true} not enabled by default in reanimated-carousel
              // If you want auto-scroll every 3.5s, let me know!
            />

            {/* Custom Pagination Dots - matches your original styles */}
            {hasMultipleRules && (
              <View style={styles.paginationContainerStyle}>
                {rules.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.activeDotStyle,
                      index !== activeSlideIndex && styles.inactiveDotStyle,
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Rules;