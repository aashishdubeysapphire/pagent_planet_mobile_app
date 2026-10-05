import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import AppImages from '../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
export const RecruitContestantBanner = ({
  text,
  btnText,
  img,
  onBtnPress,
  isSvg = true,
}) => {
  return (
    <ImageBackground
      source={AppImages.Common.Gradient}
      borderRadius={20}
      style={styles.gradientStyles}>
      <View style={styles.leftView}>
        <Text style={styles.textStyle} numberOfLines={3}>
          {text}
        </Text>
        <TouchableOpacity style={styles.btnStyle} onPress={onBtnPress}>
          <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imgView}>{isSvg ? img : <Image source={img} />}</View>
    </ImageBackground>
  );
};
const RecruitContestant = ({
  pageantId,
  contact_list_count,
  my_leads_count,
  pageantPlanDetail,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <RecruitContestantBanner
        text={contact_list_count + translations.INTRESTED_CONTESTANT}
        btnText={translations.SEE_RESULTS}
        img={AppImages.PAGEANT_DETAIL.pagentSeeResults}
        onBtnPress={() => {
          navigation.navigate(SCREEN.LEAD_DETAILS, {
            pageantId: pageantId,
            contact_list_count: contact_list_count,
            pageantPlanDetail: pageantPlanDetail,
          });
        }}
        isSvg={false}
      />
      <RecruitContestantBanner
        text={
          translations.YOU_HAVE +
          my_leads_count +
          translations.CONTESTANTS_IN_CONTACT_LIST
        }
        btnText={translations.VIEW_LIST}
        img={AppImages.PAGEANT_DETAIL.seeContacts}
        onBtnPress={() => {
          navigation.navigate(SCREEN.CONTACT_LIST, {
            pageantId: pageantId,
            my_leads_count: Number(my_leads_count),
          });
        }}
        isSvg={false}
      />
      <View style={styles.height} />
    </View>
  );
};

export default RecruitContestant;
