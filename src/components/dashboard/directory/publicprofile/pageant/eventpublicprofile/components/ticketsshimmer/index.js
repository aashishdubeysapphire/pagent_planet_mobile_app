import { View } from 'react-native'
import React from 'react'
import { moderateScale, width } from '../../../../../../../utils/responsiveSize'
import Shimmer from '../../../../../../../common/shimmer'
import { styles } from './styles';

const TicketsShimmer = () => {
  return (
    <View style={styles.shimmerStyle}>
      <Shimmer
        width={width-moderateScale(32)}
        height={moderateScale(110)}
        borderRadius={moderateScale(20)}
        bottomSpace={16}
      />
      <Shimmer
       width={width-moderateScale(32)}
        height={moderateScale(110)}
        borderRadius={moderateScale(20)}
      />
    </View>
  )
}

export default TicketsShimmer