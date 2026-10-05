import React from 'react';
import {View, FlatList} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {moderateScale} from '../../../utils/responsiveSize';
import {styles} from '../../../dashboard/dashboard/contestantdashboard/profilesection/basicdetails/styles';
import AppImages from '../../../../assets/images/AppImages';

/*
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */

const detailsIcon = [
  <AppImages.Dashboard.hairColor_ICON />,
  <AppImages.Dashboard.eyeColor_ICON />,
  <AppImages.Dashboard.zodiac_ICON />,
  <AppImages.Dashboard.height_ICON />,
  <AppImages.Dashboard.dob_ICON />,
];

const BasicDetailsShimmer = () => {
  return (
    <FlatList
      data={[{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}]}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      key={'#'}
      showsHorizontalScrollIndicator={false}
      renderItem={({index}) => (
        <View style={styles.basicSection}>
          {detailsIcon[index]}
          <View style={styles.infoSection}>
            <Shimmer
              width={moderateScale(60)}
              height={7}
              borderRadius={5}
              bottomSpace={6}
            />
            <Shimmer width={moderateScale(45)} borderRadius={5} height={5} />
          </View>
        </View>
      )}
    />
  );
};

export default BasicDetailsShimmer;
