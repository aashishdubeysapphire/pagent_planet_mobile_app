import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {moderateScale} from '../../../../../../../../utils/responsiveSize';
import CustomRatings from '../../../../../../../../common/customratings';

const GetUserRating = ({title, setUserRating, initialRating}) => {
  return (
    <View>
      <>
        <Text style={styles.subHeading}>{title}</Text>
        <View style={styles.customRatingStyles}>
          <CustomRatings
            ratingsValue={initialRating}
            enableTouch={true}
            size={moderateScale(24)}
            customStyles={styles.customStylesTaj}
            showRatingsReviewsCount={false}
            setUserRating={setUserRating}
          />
        </View>
      </>
    </View>
  );
};

export default GetUserRating;
