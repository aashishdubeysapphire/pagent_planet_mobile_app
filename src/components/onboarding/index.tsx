import React, {useRef, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';

import useStyle from './useStyle';
import {SCREEN} from '../../root/screenname';
import NextButton from '../common/nextbutton';
import translations from '../../assets/translations';
import {useSetOnBoarding, useSetLoader} from '../../store/useAppStore';
import useAppStore from '../../store/useAppStore';
import AppImages from '../../assets/images/AppImages';

const {width} = Dimensions.get('window');

const onBoardingData = [
  {
    title: translations.BUY_AND_SELL,
    title2: translations.WARDROBE,
    title3: translations.ENTRY_FEE,
    cover: AppImages.OnBoarding.OnBoarding1_ICON,
  },
  {
    title: translations.SOCIALIZE,
    title2: translations.WATCH_PAGEANT,
    title3: translations.SHARE_NEWS,
    cover: AppImages.OnBoarding.OnBoarding2_ICON,
  },
  {
    title: translations.EVERYTHING_PAGEANT,
    title2: translations.JOIN_COMPETITIONS,
    title3: translations.FIND_CONTESTANTS,
    cover: AppImages.OnBoarding.OnBoarding3_ICON,
  },
];

const OnBoarding = () => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);

  const navigator = useNavigation();
  const styles = useStyle();

  const setOnBoarding = useSetOnBoarding();
  const setLoader = useSetLoader();

  const {
    storeData: {isOnBoardingViewed},
  } = useAppStore();

  useEffect(() => {
    setLoader(false);
  }, []);

  const goToWelcomeScreen = () => {
    if (!isOnBoardingViewed) {
      setOnBoarding(true);
    }

    navigator.reset({
      index: 0,
      routes: [{name: SCREEN.WELCOME}],
    });
  };

  const onIndexChange = (i: number) => {
    setIndex(i);
    if (!isOnBoardingViewed) {
      setOnBoarding(true);
    }
  };

  const handleNextButton = () => {
    if (index === onBoardingData.length - 1) {
      goToWelcomeScreen();
      return;
    }

    carouselRef.current?.scrollTo({
      index: index + 1,
      animated: true,
    });

    if (!isOnBoardingViewed) {
      setOnBoarding(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Carousel
          ref={carouselRef}
          width={width}
          height={styles.slide1.height}
          data={onBoardingData}
          loop={false}
          onSnapToItem={onIndexChange}
          renderItem={({item}) => (
            <View style={styles.slide1}>
              <Image source={item.cover} style={styles.bgIcon} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.heading2}>
                {item.title2 + '\n' + item.title3}
              </Text>
            </View>
          )}
        />

        {/* Pagination Dots */}
        <View style={styles.paginationStyle}>
          {onBoardingData.map((_, i) => (
            <View
              key={i}
              style={
                i === index
                  ? styles.activeDotStyle
                  : styles.paginationDotStyle
              }
            />
          ))}
        </View>

        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.skipButtonArea}
            onPress={goToWelcomeScreen}>
            <Text style={styles.skipButton}>
              {translations.SKIP_BUTTON}
            </Text>
          </TouchableOpacity>

          <View style={styles.nextButtonArea}>
            <NextButton onPress={handleNextButton} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
