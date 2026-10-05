import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import AppImages from '../../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import {color} from '../../../../../../assets/colorConstant';
import Slider from '@react-native-community/slider';
import {GET_TESTIMONIAL_DATA} from '../../../../../../services/endpoints';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import CustomButton from '../../../../../common/button';
import {toast, toastType} from '../../../../../common/commonalert';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {useSetLoader} from '../../../../../../store/useAppStore';
import FastImageView from '../../../../../common/fastimageview';
import {SCREEN} from '../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {
  checkIsConnected,
  openWebLink,
} from '../../../../../utils/helperFunction';
import {MethodTypes} from '../../../../../../services/constants';
import {
  CALENDLY_LINK,
  CONTACT_US_LINK,
} from '../../../../../../services/staticWebUrl';
export const topSectiondata = [
  {
    title: translations.PROFIT,
    cover: AppImages.Common.Profit,
  },
  {
    title: translations.LEAD,
    cover: AppImages.Common.Lead,
  },
  {
    title: translations.EXPENSE,
    cover: AppImages.Common.Expense,
  },
  {
    title: translations.TIME,
    cover: AppImages.Common.Clock,
  },
  {
    title: translations.VOTE,
    cover: AppImages.Common.Vote,
  },
  {
    title: translations.WINNERS,
    cover: AppImages.Common.Winner,
  },
  {
    title: translations.PROTECT,
    cover: AppImages.Common.Exclude,
  },
  {
    title: translations.CUSTOMER_SUPPORT,
    cover: AppImages.Common.CustomerSupport,
  },
  {
    title: translations.CALENDER,
    cover: AppImages.Common.Calender,
  },
];

const PeopleChoiceAward = ({pageantDetail}: Props) => {
  const [slideValue, setSlideValue] = useState(0);
  const [listData, setListData] = useState([]);
  const [low, setLow] = useState('');
  const [high, setHigh] = useState('');
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const {mutateAsync: testimonialData, isLoading} = useCgMutation({
    key: GET_TESTIMONIAL_DATA,
    url: GET_TESTIMONIAL_DATA,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  useEffect(() => {
    getTestimonialData();
    setItemSize(Dimensions.get('window').width - moderateScaleVertical(32));
  }, []);
  const checkInterNet = () => {
    return checkIsConnected();
  };

  const getTestimonialData = async () => {
    setLoader(true);
    const res = await testimonialData();
    if (res.success) {
      setListData(res?.data?.testimonials);
    }
  };
  const onMinusClick = () => {
    if (slideValue > 0) {
      setSlideValue(slideValue - 1);
    }
  };
  const onPlusClick = () => {
    if (slideValue < 1000) {
      setSlideValue(slideValue + 1);
    }
  };
  return (
    <View style={styles.menuContainer}>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>{translations.MONEY}</Text>

        <View
          style={{
            width: '100%',
            marginTop: moderateScaleVertical(16),
            left:
              (slideValue *
                (Dimensions.get('screen').width - moderateScale(90))) /
                1000 -
              moderateScale(8),
          }}>
          <ImageBackground
            source={AppImages.Common.Callout}
            resizeMode="contain"
            style={{
              width: moderateScale(37),
              height: moderateScaleVertical(25),
            }}>
            <Text style={styles.calloutText}>{Math.floor(slideValue)}</Text>
          </ImageBackground>
        </View>

        <Slider
          style={{width: '100%', height: 40}} // Added height for better touch area (recommended)
          minimumValue={0}
          maximumValue={1000}
          step={1}
          value={slideValue}
          minimumTrackTintColor={color.P_PINK}
          maximumTrackTintColor={color.S_GRAY_2}
          thumbImage={AppImages.Common.Thumb} // This prop works in @react-native-community/slider
          onValueChange={value => setSlideValue(Math.round(value))} // Round to ensure integer
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onMinusClick()}>
            <AppImages.Common.Minus />
          </TouchableOpacity>
          <Text style={styles.sliderLabel}>{'No. Of Contestants'}</Text>
          <TouchableOpacity style={styles.button} onPress={() => onPlusClick()}>
            <AppImages.Common.Plus />
          </TouchableOpacity>
        </View>
        <Text style={styles.amount}>{`$${(
          pageantDetail?.base_contestant_price_for_pca * slideValue
        ).toFixed(2)}`}</Text>
        <Text style={styles.earning}>
          {'Average Earnings On Pageant Planet'}
        </Text>
      </View>
      <View style={styles.getStarted}>
        <CustomButton
          inactive
          smallHeight
          textStyle={styles.buttonText}
          label={translations.GET_STARTED}
          onPress={() => {
            navigation.navigate(SCREEN.ADD_PAGENT_EVENT, {
              pageantDetail: pageantDetail,
              showPCAWarningMessage: true,
            });
          }}
        />
      </View>
      <View style={styles.pinkView}>
        <Text style={styles.benefits}>{translations.BENIFITS}</Text>
        <View
          style={{marginHorizontal: moderateScale(4), alignItems: 'center'}}>
          <FlatList
            data={topSectiondata}
            keyExtractor={(x, i) => i.toString()}
            numColumns={3}
            nestedScrollEnabled={true}
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: color.WHITE,
                    },
                    styles.container,
                  ]}
                  onPress={() => {
                    navigation.navigate(SCREEN.ADD_PAGENT_EVENT, {
                      pageantDetail: pageantDetail,
                      showPCAWarningMessage: true,
                    });
                  }}>
                  {<item.cover height={moderateScaleVertical(24)} />}

                  <Text style={styles.inactiveTitle}>{item.title}</Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
        <Text
          style={styles.notVisible}
          onPress={() => toast('Under development', toastType.SUCESS_TOAST)}>
          {translations.GOT_QUESTIONS}

          <Text
            style={styles.heightTouchLine}
            onPress={() => openWebLink(CONTACT_US_LINK)}>
            {' '}
            {translations.CONTACT_US}
          </Text>
        </Text>
      </View>
      <View style={styles.testimonials}>
        <Text style={styles.heading}>{SCREEN.TESTIMONIALS}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN.TESTIMONIALS, listData)}>
          <Text style={styles.viewAll}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      </View>
      {listData.length > 0 ? (
        <View style={styles.testimonialView}>
          <FlatList
            data={listData.slice(0, 5)}
            keyExtractor={(x, i) => i.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item}) => (
              <>
                <View
                  style={[
                    {
                      backgroundColor: color.WHITE,
                    },
                    styles.container1,
                  ]}
                  onPress={() => null}>
                  <View style={styles.circleContainer}>
                    <FastImageView
                      width={moderateScaleVertical(48)}
                      height={moderateScaleVertical(48)}
                      borderRadius={moderateScaleVertical(60)}
                      imageUrl={null}
                      isCircle
                    />
                  </View>

                  <Text style={styles.name} numberOfLines={1}>
                    {item?.commenter}
                  </Text>
                  <Text style={styles.designation} numberOfLines={2}>
                    {item?.commenter_position}
                  </Text>
                  <Text style={styles.inactiveTitle1} numberOfLines={6}>
                    {item?.comment}
                  </Text>
                </View>
              </>
            )}
          />
        </View>
      ) : isLoading ? (
        <View style={styles.shimmerView}>
          <ShimmerList
            width={154}
            height={190}
            padding={12}
            borderRadius={16}
            horizontal={true}
          />
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          marginTop: moderateScaleVertical(12),
          marginStart: moderateScaleVertical(16),
          marginBottom: moderateScaleVertical(60),
        }}
        onPress={() => openWebLink(CALENDLY_LINK)}>
        <AppImages.Common.Schedule width={itemSize} />
      </TouchableOpacity>
    </View>
  );
};

export default PeopleChoiceAward;