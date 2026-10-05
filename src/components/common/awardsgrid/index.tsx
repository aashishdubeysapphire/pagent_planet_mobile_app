import React from 'react';
import {TouchableOpacity, Text, View, Dimensions} from 'react-native';
import useStyle from './styles';
import {moderateScaleVertical, moderateScale} from '../../utils/responsiveSize';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {color} from '../../../assets/colorConstant';
import FastImageView from '../../../components/common/fastimageview';
import CustomRatings from '../customratings';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../root/screenname';
import {DIRECTORY_ID, ROLES} from '../../utils/enum';
import {openWebLink} from '../../utils/helperFunction';

const itemSize = Dimensions.get('window').width / 2 - moderateScale(24);

interface Props {
  item?: any;
  label?: string;
  imageUrl?: any;
  screenName?: string;
  onItemClickListener?: (param1: number) => void;
  onPressButtonClick?: any;
  ratings?: any;
  review_count?: number;
  subHeading?: string;
  numberOfLinesForHeading?: number;
  editIcon?: boolean;
  onEditButtonClick?: () => void;
  url: string;
}

/* The code is defining a functional component called `AwardsGrid` that takes in several props. These
props include `item`, `label`, `imageUrl`, `screenName`, `onItemClickListener`,
`onPressButtonClick`, `ratings`, `review_count`, `subHeading`, `numberOfLinesForHeading`,
`editIcon`, `onEditButtonClick`, and `url`. The component returns a view with various elements and
styles based on the provided props. */
const AwardsGrid = ({
  item = {},
  label,
  imageUrl,
  screenName,
  onItemClickListener,
  onPressButtonClick,
  ratings,
  review_count,
  subHeading,
  numberOfLinesForHeading,
  editIcon,
  onEditButtonClick,
  url = '',
}: Props) => {
  const styles = useStyle();
  const navigation = useNavigation();

  /**
   * The function `onItemClick` navigates to a public profile page if the screen name is
   * "EVENT_CONTESTANT", otherwise it opens a web link if a URL is provided.
   */
  const onItemClick = () => {
    if (screenName === translations.EVENT_CONTESTANT) {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        profileId: item?.contestant_id,
        roleId:
          item.owner_id === ROLES.ADMIN_ID
            ? item?.contestant_id
            : item.owner_id,
        name: item?.name,
        key: new Date().getMilliseconds(),
        category: DIRECTORY_ID.CONTESTANT,
        selectedTab: ROLES.CONTESTANT,
      });
    } else if (url) {
      openWebLink(url);
    }
  };

  return (
    <View
      style={
        screenName === translations.AWARDS
          ? styles.container
          : screenName === translations.EVENT_CONTESTANT
          ? styles.eventContainer
          : styles.bigContainer
      }>
      {screenName === translations.ASSOCIATE_BUSINESS ||
      screenName === translations.EVENT_CONTESTANT ? (
        <TouchableOpacity
          style={{
            ...styles.bottomSection,
            top:
              screenName === translations.EVENT_CONTESTANT
                ? itemSize + moderateScaleVertical(52)
                : itemSize + moderateScaleVertical(54),
          }}
          onPress={() => onPressButtonClick()}>
          {screenName === translations.EVENT_CONTESTANT ? (
            <AppImages.Common.delete_icon />
          ) : (
            <AppImages.Dashboard.email_ICON />
          )}

          <Text style={styles.options}>
            {screenName === translations.ASSOCIATE_BUSINESS
              ? translations.MESSAGE
              : translations.DELETE}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            ...styles.bottomSection,
            top: itemSize + moderateScaleVertical(41),
          }}
          onPress={() => onPressButtonClick()}>
          <AppImages.Dashboard.download_ICON />
          <Text style={styles.options}>{translations.DOWNLOAD}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => onItemClick()}
        style={[
          styles.gridContainer,
          {
            backgroundColor:
              screenName === translations.AWARDS
                ? color.MAROON
                : color.S_GRAY_1,
          },
        ]}>
        <View
          style={{
            ...styles.imageSection,
            marginTop: -2,
          }}>
          <FastImageView
            width={itemSize}
            height={itemSize + 2}
            borderRadius={moderateScaleVertical(24)}
            imageUrl={imageUrl}
          />
          {editIcon ? (
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => onEditButtonClick()}>
              <AppImages.Common.editCircle_ICON />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            ...styles.titleSection,
            height:
              screenName === translations.AWARDS
                ? moderateScaleVertical(51)
                : screenName === translations.EVENT_CONTESTANT
                ? moderateScaleVertical(62)
                : moderateScaleVertical(64),
          }}>
          <Text
            style={{
              ...styles.title,
              color:
                screenName === translations.AWARDS
                  ? color.WHITE
                  : color.INPUT_TEXT,
            }}
            numberOfLines={numberOfLinesForHeading}>
            {label}
          </Text>
          {screenName === translations.ASSOCIATE_BUSINESS ? (
            <View style={styles.ratingArea}>
              <CustomRatings
                ratingsValue={ratings === null ? 0 : ratings}
                review_count={review_count === null ? 0 : review_count}
              />
            </View>
          ) : screenName === translations.EVENT_CONTESTANT && subHeading ? (
            <Text style={styles.subHeadingLabel} numberOfLines={2}>
              {subHeading}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AwardsGrid;
