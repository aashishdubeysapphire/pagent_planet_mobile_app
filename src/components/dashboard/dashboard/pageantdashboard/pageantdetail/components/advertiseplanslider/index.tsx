import React, {useState, useRef, useEffect} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {styles} from './styles';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import translations from '../../../../../../../assets/translations';
import CustomButton from '../../../../../../common/button';
import AppImages from '../../../../../../../assets/images/AppImages';
import {color} from '../../../../../../../assets/colorConstant';
import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import {PlanData} from '../../../../../../../services/models/planData';
import {PAYMENT_FOR} from '../../../../../../utils/enum';

// New carousel import
import Carousel from 'react-native-reanimated-carousel';

interface Props {
  whiteInactiveDot?: boolean;
  setIsPreviewModalVisible?: any;
  pageantPlanDetail?: PlanData;
  pageantId?: number;
}

const AdvertisePlanSlider = ({
  whiteInactiveDot = false,
  setIsPreviewModalVisible,
  pageantPlanDetail,
  pageantId,
}: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [myPlanAmount, setMyPlanAmount] = useState(0);
  const navigation = useNavigation();

  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    if (
      pageantPlanDetail?.my_plans !== undefined &&
      pageantPlanDetail?.my_plans.length > 0
    ) {
      setMyPlanAmount(pageantPlanDetail?.my_plans[0].membership_price);
    }
  }, [pageantPlanDetail]);

  const PointsView = ({lable}) => {
    return (
      <View style={styles.rowView}>
        <Image
          source={AppImages.Common.filledRatingIcon}
          style={styles.filledRatingIcon}
        />
        <Text style={styles.pointersText}>{lable}</Text>
      </View>
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          ...styles.carouselContainer,
          width: moderateScale(298),
          borderColor: index === activeSlide ? color.P_PINK : color.S_GRAY_2,
          justifyContent: 'center', // centers the card horizontally
        }}>
        <Text style={styles.upgradePlanHeaderTitle}>{item.name}</Text>
        <Text style={styles.upgradePlanPrice}>
          {'$' + item.price + '/Month'}
        </Text>
        <Text style={styles.whatgetHeaderTitle}>
          {translations.WHAT_YOU_GET}
        </Text>
        {item.updatedContent.map((i, idx) => (
          <PointsView key={idx} lable={i} />
        ))}

        <View style={styles.contactUsContainer}>
          <CustomButton
            inactive
            smallHeight
            label={
              pageantPlanDetail?.my_plans?.length > 0
                ? myPlanAmount > item.price
                  ? translations.DOWNGRADE_NOW
                  : translations.UPGRADE_NOW
                : translations.BUY_NOW
            }
            onPress={() => {
              if (setIsPreviewModalVisible !== undefined) {
                setIsPreviewModalVisible(false);
              }
              navigation.navigate(SCREEN.SHOPPING_BAG, {
                paymentType: PAYMENT_FOR.BUY_PAGEANT_PLAN,
                palnData: item,
                pageantId: pageantId,
                have_billing_address: pageantPlanDetail?.have_billing_address,
              });
            }}
          />
        </View>
      </View>
    );
  };

  const plans = pageantPlanDetail?.membership_plans || [];
  console.log(plans, 'plans');

  return (
    <View style={styles.upcomingEventSection}>
      {plans.length > 0 && (
        <Carousel
          width={width}
          height={height * 0.7} // Adjust based on your card height; you can tweak this
          data={plans}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveSlide(index)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          enabled={plans.length > 1} // Disable swipe if only one plan
        />
      )}

      {/* Custom Pagination Dots - matches your original styles exactly */}
      {plans.length > 1 && (
        <View style={styles.upgradeContainerStyle}>
          {plans.map((_, index) => (
            <View
              key={index}
              style={[
                styles.activeDotStyle,
                index !== activeSlide &&
                  (whiteInactiveDot
                    ? styles.upgradeInactiveDotWhitwStyle
                    : styles.upgradeInactiveDotStyle),
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default AdvertisePlanSlider;
