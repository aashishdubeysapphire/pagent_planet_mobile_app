import {View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import Shimmer from '../../../../../../common/shimmer';
import {styles} from './styles';

const OrerDetailsShimmer = () => {
  const fourLineView = () => {
    return (
      <>
        <View style={styles.seperator} />

        <Shimmer
          width={moderateScale(200)}
          height={moderateScale(10)}
          borderRadius={moderateScale(20)}
          bottomSpace={moderateScaleVertical(12)}
        />
        {Array.from(Array(3).keys()).map(i => {
          return (
            <Shimmer
              width={moderateScale(150)}
              height={moderateScale(10)}
              borderRadius={moderateScale(20)}
              bottomSpace={moderateScaleVertical(8)}
              leftBottomSpace={moderateScaleVertical(4)}
            />
          );
        })}
      </>
    );
  };
  return (
    <View style={styles.mainView}>
      <Shimmer
        width={moderateScale(100)}
        height={moderateScale(10)}
        borderRadius={moderateScale(20)}
        bottomSpace={moderateScaleVertical(10)}
      />
      <View style={styles.continer}>
        <Shimmer
          width={moderateScale(124)}
          height={moderateScale(124)}
          borderRadius={moderateScale(20)}
        />
      </View>
      <View style={styles.name}>
        <Shimmer
          width={moderateScale(300)}
          height={moderateScale(10)}
          borderRadius={moderateScale(20)}
        />
      </View>
      <View style={styles.rowView}>
        <View style={styles.qty}>
          <Shimmer
            width={moderateScale(50)}
            height={moderateScale(10)}
            borderRadius={moderateScale(20)}
          />
        </View>
        <View style={styles.qty}>
          <Shimmer
            width={moderateScale(50)}
            height={moderateScale(10)}
            borderRadius={moderateScale(20)}
          />
        </View>
        <View style={styles.qty}>
          <Shimmer
            width={moderateScale(50)}
            height={moderateScale(10)}
            borderRadius={moderateScale(20)}
          />
        </View>
      </View>
      <View style={styles.rowView}>
        <View style={styles.circle}>
          <Shimmer
            width={moderateScale(36)}
            height={moderateScale(36)}
            borderRadius={moderateScale(100)}
          />
        </View>
        <View style={styles.circle}>
          <View style={styles.status}>
            <Shimmer
              width={moderateScale(100)}
              height={moderateScale(10)}
              borderRadius={moderateScale(20)}
              bottomSpace={moderateScaleVertical(10)}
            />
          </View>

          <Shimmer
            width={moderateScale(100)}
            height={moderateScale(10)}
            borderRadius={moderateScale(20)}
            leftBottomSpace={moderateScale(8)}
          />
        </View>

        <View style={styles.raiseIssue}>
          <Shimmer
            width={moderateScale(80)}
            height={moderateScale(10)}
            borderRadius={moderateScale(20)}
            leftBottomSpace={moderateScale(8)}
          />
        </View>
      </View>

      {Array.from(Array(3).keys()).map(i => {
        return fourLineView();
      })}
    </View>
  );
};

export default OrerDetailsShimmer;
