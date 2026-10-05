import React, {useState} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import AppImages from '../../../../../../../assets/images/AppImages';
import {styles} from './styles';
import {moderateScale, width} from '../../../../../../utils/responsiveSize';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import ViewPlanModal from '../../../../../dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';

// New carousel import
import Carousel from 'react-native-reanimated-carousel';

const UpgradeSlider = ({
  pageantId,
  claimedLeads,
  pendingLeads,
  pageantPlanDetail,
}) => {
  const navigation = useNavigation();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const screenWidth = Dimensions.get('window').width;

  const upgradeBanners = [
    <TouchableOpacity
      key="0"
      onPress={() =>
        navigation.navigate(SCREEN.PURCHASE_PLAN, {
          pageantId: pageantId,
          claimedLeads: claimedLeads,
          pendingLeads: pendingLeads,
        })
      }>
      <AppImages.Common.UpgradeNow width={width - moderateScale(49)} />
    </TouchableOpacity>,
    <TouchableOpacity key="1" onPress={() => setIsPreviewModalVisible(true)}>
      <AppImages.Common.Upgrade1 width={width - moderateScale(49)} />
    </TouchableOpacity>,
  ];

  const renderItem = ({item}) => {
    return <View style={styles.sliderContainer}>{item}</View>;
  };

  return (
    <View style={styles.container}>
      <Carousel
        width={screenWidth}
        height={moderateScale(140)} // Adjust this value to match your banner height
        data={upgradeBanners}
        renderItem={renderItem}
        onSnapToItem={index => setActiveSlideIndex(index)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 60,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={true} // Enables infinite loop (since you had autoplay + loop=false before, but with only 2 items loop=true feels natural)
        enabled={true} // Always enabled since there are 2 items
        // Note: react-native-reanimated-carousel does not have built-in autoplay.
        // If you really need auto-scroll every 3.5s, let me know and I'll add a useEffect with ref.current.next()
      />

      {/* Custom Pagination Dots - matches your original styles */}
      <View style={styles.paginationContainerStyle}>
        {[0, 1].map(index => (
          <View
            key={index}
            style={[
              styles.activeDotStyle,
              index !== activeSlideIndex && styles.inactiveDotStyle,
            ]}
          />
        ))}
      </View>

      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={pageantPlanDetail}
        pageantId={pageantId}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </View>
  );
};

export default UpgradeSlider;