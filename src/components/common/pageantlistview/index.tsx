import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {SCREEN} from '../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import {PLACEMENT} from '../../utils/enum';
import FastImageView from '../fastimageview';

interface Props {
  label?: string;
  imageUrl: string;
  maxLines?: number;
  screenName: string;
  subHeading: string;
  numberOfLinesForTitle: Number;
  numberOfLinesForSubTitle: Number;
  smallBannerImage: boolean;
  award_name: string;
  type: string | number;
  contestant_id: number;
  onItemClickListener?: (param1: number) => void;
  edit: boolean;
  deleteIcon: boolean;
  stylesForTitle: any;
  onPressDeleteIcon: any;
  onPressEditIcon: any;
  position: number;
}

/* A function that returns a view. */
const PageantListView = ({
  position,
  label,
  imageUrl,
  screenName,
  subHeading,
  numberOfLinesForTitle,
  numberOfLinesForSubTitle,
  smallBannerImage,
  award_name,
  type,
  contestant_id,
  edit = false,
  deleteIcon = false,
  stylesForTitle,
  onPressDeleteIcon,
  onPressEditIcon,
  onItemClickListener,
}: Props) => {
  const styles = useStyle();
  const [awardName, setAwardName] = useState('');
  const navigation = useNavigation();

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    if (type === 1) {
      setAwardName(PLACEMENT.WINNER);
    } else if (type === 2) {
      setAwardName(PLACEMENT.RUNNER_UP1);
    } else if (type === 3) {
      setAwardName(PLACEMENT.RUNNER_UP2);
    } else if (type === 4) {
      setAwardName(PLACEMENT.RUNNER_UP3);
    } else if (type === 5) {
      setAwardName(PLACEMENT.RUNNER_UP4);
    }
  }, []);

  const editIconClicked = () => {
    if (screenName === translations.PRIZES) {
      onPressEditIcon();
    } else {
      navigation.navigate(SCREEN.ADD_EVENT_DETAIL, {
        id : contestant_id , 
        fromViewAll : true
      });
    }
  };

  const onItemClick = () => {
    if (
      onItemClickListener !== undefined &&
      screenName === translations.AWARD_WON
    ) {
      onItemClickListener(position);
    }
  };

  return (
    <TouchableOpacity
      onPress={onItemClick}
      style={
        screenName === translations.AWARD_WON
          ? styles.big_container
          : screenName === translations.PRIZES
          ? styles.prize_container
          : styles.container
      }>
      <View style={styles.listContainer}>
        {screenName === translations.AWARD_WON ||
        screenName === translations.PRIZES ? (
          <View
            style={{
              marginTop: -moderateScaleVertical(19),
              justifyContent: 'center',
            }}>
            {smallBannerImage ? (
              <AppImages.Common.smallAwardsBanner style={styles.awardsShow} />
            ) : (
              <AppImages.Common.awardsBanner_ICON style={styles.awardsShow} />
            )}

            {smallBannerImage ? (
              <Text
                style={styles.awardsTitleForEvent}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {awardName}
              </Text>
            ) : (
              <Text
                style={styles.awardsTitle}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {award_name === undefined
                  ? translations.AWARD + ' ' + awardName
                  : award_name}
              </Text>
            )}
          </View>
        ) : null}
        <View
          style={{
            ...styles.showData,
            marginTop:
              screenName === translations.PRIZES
                ? moderateScaleVertical(9)
                : moderateScaleVertical(12),
          }}>
          <View style={styles.imageSection}>
            <FastImageView
              width={moderateScaleVertical(60)}
              height={moderateScaleVertical(60)}
              borderRadius={moderateScaleVertical(60)}
              imageUrl={imageUrl}
              isCircle
            />
          </View>
          <View style={styles.titleView}>
            <Text
              style={
                screenName === translations.PRIZES
                  ? stylesForTitle
                  : styles.title
              }
              numberOfLines={numberOfLinesForTitle}
              ellipsizeMode="tail">
              {label}
            </Text>
            {subHeading !== undefined &&
            subHeading !== null &&
            subHeading !== '' ? (
              <Text
                style={styles.subTitle}
                numberOfLines={numberOfLinesForSubTitle}
                ellipsizeMode="tail">
                {subHeading}
              </Text>
            ) : null}
          </View>

          <View style={styles.editablesection}>
            {edit ? (
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => editIconClicked()}>
                <AppImages.PAGEANT_DETAIL.edit_icon />
              </TouchableOpacity>
            ) : (
              <View style={styles.editIcon}>
                <Text style={{height: moderateScaleVertical(24)}} />
              </View>
            )}
            {deleteIcon ? (
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={onPressDeleteIcon}>
                <AppImages.Common.MyUploadsDelete />
              </TouchableOpacity>
            ) : (
              <View style={styles.deleteIcon}>
                <Text style={{height: moderateScaleVertical(24)}} />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PageantListView;
