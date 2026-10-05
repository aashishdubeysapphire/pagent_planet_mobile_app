import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {Contestant} from '../../../../../../services/models/pageantdetails/contestant';
import {TIME_FORMAT} from '../../../../../utils/datetimemanger';
import moment from 'moment';
import BasicDetailsShimmer from '../../../../../common/shimmer/basicdetailsshimmer';

interface Props {
  basicData?: Contestant;
  isLoading: boolean;
  editable: boolean;
  isHideTitle: boolean;
  marginFromTop: number;
}

interface Item {
  title: string;
  name: string;
  image: any;
}

const BasicDetails = ({
  basicData,
  isLoading,
  editable = true,
  isHideTitle = false,
  marginFromTop,
}: Props) => {
  const navigation = useNavigation();
  const [infoArray, setInfoArray] = useState<Array<Item>>([]);

  useEffect(() => {
    let array = [];
    if (basicData?.contestant_hair_color !== null) {
      array.push({
        title: translations.HAIR_COLOR,
        name: basicData?.contestant_hair_color?.name,
        image: <AppImages.Dashboard.hairColor_ICON />,
      });
    }
    if (basicData?.contestant_eye_color) {
      array.push({
        title: translations.EYE_COLOR,
        name: basicData?.contestant_eye_color?.name,
        image: <AppImages.Dashboard.eyeColor_ICON />,
      });
    }
    if (basicData?.contestant_zodiac) {
      array.push({
        title: translations.ZODIAC_SIGN,
        name: basicData?.contestant_zodiac?.name,
        image: <AppImages.Dashboard.zodiac_ICON />,
      });
    }
    if (basicData?.contestant_height) {
      array.push({
        title: translations.HEIGHT,
        name: basicData?.contestant_height?.name,
        image: <AppImages.Dashboard.height_ICON />,
      });
    }
    if (basicData?.hide_dob?.toLowerCase() === 'no') {
      array.push({
        title: translations.DOB,
        name: getValidDate(basicData?.dob),
        image: <AppImages.Dashboard.dob_ICON />,
      });
    }
    setInfoArray(array);
  }, [basicData]);

  const clickedEditButton = () => {
    navigation.navigate(SCREEN.EDIT_CONTESTANT_DETAILS, {
      name: translations.DASHBOARD,
    });
  };

  const getValidDate = dob => {
    if (moment(dob, TIME_FORMAT.MMDDYYYY).isValid()) {
      return moment(dob, TIME_FORMAT.MMDDYYYY).format(
        TIME_FORMAT.MMM_SPACE_DD_COMMA_YYYYY,
      );
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        ...styles.detailsArea,
        height: 'auto',
        marginTop: marginFromTop,
        paddingBottom: moderateScaleVertical(8),
      }}>
      <View style={styles.detailsTopSection}>
        <Text style={styles.name}>
          {isHideTitle ? '' : translations.BASIC_DETAILS}
        </Text>
        {editable && (
          // <View/>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => clickedEditButton()}>
            <AppImages.Dashboard.edit_ICON />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.basicHeader}>
        {isLoading ? (
          <BasicDetailsShimmer />
        ) : (
          <FlatList
            data={infoArray}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            key={'#'}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item}) => (
              <View style={styles.basicSection}>
                {item.image}
                <View style={styles.infoSection}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text
                    style={{
                      ...styles.infoStyles,
                      width:
                        item.title === translations.DOB
                          ? moderateScale(110)
                          : null,
                    }}>
                    {item.name}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default BasicDetails;
