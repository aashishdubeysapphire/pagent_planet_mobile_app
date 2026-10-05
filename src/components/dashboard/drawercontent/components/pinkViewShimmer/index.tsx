import {View} from 'react-native';
import React from 'react';
import Shimmer from '../../../../common/shimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import {styles} from '../../styles';
import DeviceInfo from 'react-native-device-info';
import {randomString} from '../../../../utils/helperFunction';

export const PinkViewShimmer = () => {
  const hasNotch = DeviceInfo.hasNotch();
  return (
    <View>
      <View style={hasNotch == true ? styles.dpContinerIos : styles.dpContiner}>
        <Shimmer
          width={moderateScaleVertical(100)}
          height={moderateScaleVertical(100)}
          borderRadius={100}
          bottomSpace={0}
        />
      </View>
      <View style={styles.userName}>
        <Shimmer
          width={moderateScaleVertical(120)}
          height={moderateScaleVertical(24)}
          borderRadius={100}
          bottomSpace={8}
        />
      </View>
      <View style={styles.countryStateTitle}>
        <Shimmer
          width={moderateScaleVertical(200)}
          height={moderateScaleVertical(16)}
          borderRadius={100}
          bottomSpace={0}
        />
      </View>
      <View style={styles.headerline}>
        <Shimmer
          width={moderateScaleVertical(200)}
          height={moderateScaleVertical(16)}
          borderRadius={100}
          bottomSpace={0}
        />
      </View>
      <View style={styles.emptyHeight} />
      {/* <Text>PinkViewShimmer</Text> */}
    </View>
  );
};

export const DrawerListShimmer = () => {
  return (
    <View>
      <View
        style={{
          paddingVertical: moderateScaleVertical(24),
          paddingLeft: moderateScale(16),
        }}>
        {Array.from(Array(6).keys()).map(i => {
          return (
            <Shimmer
              key={randomString(4)}
              width={moderateScaleVertical(200)}
              height={moderateScaleVertical(16)}
              borderRadius={100}
              bottomSpace={moderateScaleVertical(24)}
            />
          );
        })}
      </View>
    </View>
  );
};
