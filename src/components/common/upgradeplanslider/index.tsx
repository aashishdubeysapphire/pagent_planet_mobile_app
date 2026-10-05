import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import translations from '../../../assets/translations';
import AppImages from '../../../assets/images/AppImages';
import FastImage from '@d11/react-native-fast-image';
import useStyle from './styles';
import {AdvertisingBannerData} from '../../../services/models/pageantdetails/pageantDetailData';

import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../utils/responsiveSize';

import ViewPlanModal from '../../dashboard/dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';
import {PlanData} from '../../../services/models/planData';

// New import
import Carousel from 'react-native-reanimated-carousel';

interface Props {
  plan: AdvertisingBannerData | undefined;
  isContentedAdd: boolean;
  pageantPlanDetail: PlanData | undefined;
  pageantId?: number;
}
interface PlanInfo {
  header?: string;
  message: string;
}

const UpgradePlanSlider = ({
  plan,
  isContentedAdd,
  pageantPlanDetail,
  pageantId,
}: Props) => {
  const styles = useStyle();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [planinfo, setPlanInfo] = useState<PlanInfo[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (planinfo.length === 0) {
      if (isContentedAdd) {
        setPlanInfo(oldArray => [
          ...oldArray,
          {
            header: translations.UPGRADE_YOUR_PROFILE,
            message: translations.UPGRADE_FOR_FREE_LEADS_TO_SHOW_CONTACT_INFO,
          },
        ]);
      }
      setPlanInfo(oldArray => [
        ...oldArray,
        {
          header:
            translations.YOU_RANK +
            plan?.rank +
            '/ ' +
            plan?.total_profile_for_this_role_type +
            translations.PAGEANT_PROFILE,
          message:
            translations.FOR_$ +
            plan?.membership_price +
            translations.YOUR_PROFILE_WILL_START_APPEARING_IN_THE_FIRST +
            plan?.position_profile_appeared +
            translations.PLACES,
        },
      ]);
    }
  }, []);

  const onUpgradePlanClick = item => {
    setIsPreviewModalVisible(true);
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          ...styles.carouselContainer,
          width: moderateScale(340),
          justifyContent: 'center', // to center the item horizontally
        }}>
        <FastImage
          style={{
            width:
              planinfo.length > 1
                ? width - moderateScale(48)
                : width - moderateScale(42),
            height: moderateScaleVertical(135),
            borderRadius: moderateScale(16),
          }}
          source={AppImages.PAGEANT_DETAIL.UPGRADE_PLAN_BG}
        />
        <View
          style={{
            ...styles.eventSection,
            width: moderateScale(325),
          }}>
          <View>
            <Text style={styles.upgradePlanHeaderTitle}>{item.header}</Text>
            <Text style={styles.upgradePlanSubHeaderTitle}>{item.message}</Text>
          </View>

          <TouchableOpacity
            onPress={() => onUpgradePlanClick(item)}
            style={styles.upgradeButtonAreaStyles}>
            <Text style={styles.borderButtonText}>{translations.UPGRADE_}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.upcomingEventSection,
        height: moderateScaleVertical(180),
        marginBottom: planinfo.length > 1 ? moderateScaleVertical(16) : 0,
      }}>
      {planinfo.length > 0 && (
        <Carousel
          width={Dimensions.get('window').width}
          height={moderateScaleVertical(180)}
          data={planinfo}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveSlide(index)}
          mode="parallax" // optional: gives a slight parallax feel, close to snap-carousel default
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          // These mimic the old snap-carousel behavior
          loop={false}
          enabled={planinfo.length > 1} // disable swipe if only one item
        />
      )}

      {/* Custom Pagination Dots (exact match to old Pagination component) */}
      {planinfo.length > 1 && (
        <View style={styles.upgradeContainerStyle}>
          {planinfo.map((_, index) => (
            <View
              key={index}
              style={[
                index === activeSlide
                  ? styles.activeDotStyle
                  : styles.upgradeInactiveDotStyle,
              ]}
            />
          ))}
        </View>
      )}

      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={pageantPlanDetail}
        pageantId={pageantId}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </View>
  );
};

export default UpgradePlanSlider;