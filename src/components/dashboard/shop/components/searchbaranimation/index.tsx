import React, {useEffect, useRef, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../common/commonalert';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {styles} from './styles';
import BackgroundTimer from 'react-native-background-timer';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import {ShopLandingDetails} from '../../../../../services/models/shop/shopLandingDetails';

interface Props {
  data?: ShopLandingDetails;
}
export const SearchBarAnimation = ({data}: Props) => {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [globalTimer, setGlobalTimer] = useState(0);
  const flatList = useRef();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      timerFunc();
    }
  }, [globalTimer]);

  const timerFunc = () => {
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(() => {
      if (globalTimer === 4) {
        setGlobalTimer(0);
      } else {
        setGlobalTimer(globalTimer + 1);
      }
      flatList?.current?.scrollToIndex({
        index: globalTimer,
        animated: true,
        viewPosition: 0,
      });
    }, 2000);
  };

  const goToSearch = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.SEARCH_SCREEN, {
        categories: data?.categories,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.searchBox} onPress={goToSearch}>
      <Text style={styles.searchTextinput}>
        {translations.SEARCH_BY_CATEGORY_PRODUCTS_AND_MORE}
      </Text>
      <FlatList
        data={[
          translations.Products,
          translations.CATEGORIES,
          translations.EVENT_TICKETS,
          translations.SELLER,
          translations.MORE,
        ]}
        ref={flatList}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatList.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        key={'#'}
        ListFooterComponent={() => {
          return <View style={styles.freeHeight} />;
        }}
        renderItem={({item, index}) => (
          <Text style={styles.searchTextOption}>{item}</Text>
        )}
      />
      <View style={styles.searchImage}>
        <AppImages.Common.tpp_search_small_icon />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBarAnimation;
