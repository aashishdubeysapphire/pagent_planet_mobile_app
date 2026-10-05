// A Component Used for showing Rating , it is fully Customisable
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import {styles} from './styles';
import {textScale} from '../../utils/responsiveSize';

interface Props {
  ratingsValue: number;
  review_count?: number;
  size?: number;
  fontSize?: number;
  showRatingsReviewsCount?: boolean;
  customStyles?: any;
  enableTouch?: boolean;
  setUserRating?: any;
}
const CustomRatings = ({
  ratingsValue,
  review_count,
  size = 10,
  fontSize = 8,
  showRatingsReviewsCount = true,
  customStyles = {},
  enableTouch = false,
  setUserRating = () => {},
}: Props) => {
  const [defaultRating, setDefaultRating] = useState(0.0);
  const [maxRating] = useState([1, 2, 3, 4, 5]);

  const starImageFilled = AppImages.Common.filledRatingIcon;
  const starImageCorner = AppImages.Common.emptyRatingIcon_ICON;
  const startHalfFilled = AppImages.Common.halfRatingIcon;

  useEffect(() => {
    setDefaultRating(ratingsValue);
  }, [ratingsValue]);

  return (
    <View style={styles.ratingArea}>
      {maxRating.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (enableTouch) {
                setDefaultRating(index + 1);
                setUserRating(index + 1);
              }
            }}>
            <View style={{marginHorizontal: 1.8}}>
              <Image
                style={{
                  aspectRatio: 1,
                  height: size,
                  resizeMode: 'contain',
                  ...customStyles,
                }}
                source={
                  item <= defaultRating
                    ? starImageFilled
                    : item >= defaultRating && item < defaultRating + 1
                    ? startHalfFilled
                    : starImageCorner
                }
              />
            </View>
          </TouchableOpacity>
        );
      })}

      {showRatingsReviewsCount ? (
        <View style={styles.reviewSection}>
          <Text style={{...styles.ratingStyle, fontSize: textScale(fontSize)}}>
            {defaultRating === null
              ? 0
              : defaultRating - Math.floor(defaultRating) !== 0
              ? defaultRating?.toFixed(1)
              : defaultRating}
          </Text>
          <Text style={{...styles.reviewCount, fontSize: textScale(fontSize)}}>
            ({review_count === null ? 0 : review_count})
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default CustomRatings;
