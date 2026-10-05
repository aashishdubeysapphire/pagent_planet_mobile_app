import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import {styles} from './styles';
import CustomButton from '../../../../common/button';
import {SCREEN} from '../../../../../root/screenname';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import MyJourneyCards from './components/myjournycards';
import {GET_CONTESTENT_UPCOMING_EVENT} from '../../../../../services/endpoints';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {color} from '../../../../../assets/colorConstant';
import {toast, toastType} from '../../../../common/commonalert';
import {FLOATING_ICON} from '../../../../utils/enum';
import FloatingButton from '../../../../common/floatingbutton';
import {MethodTypes} from '../../../../../services/constants';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
import {
  createFirebaseLog,
  trackScreenView,
} from '../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../assets/translations/analyticsscreenname';

const MyJourney = props => {
  const navigation = useNavigation();
  const isFocued = useIsFocused();
  const [pageNo, setPageNo] = useState(1);
  const [itemSize, setItemSize] = useState(Number);
  const [length, setLength] = useState(1);
  const [listData, setlistData] = useState([]);
  const [maxLength, setMaxLength] = useState(0);

  useEffect(() => {
    if (isFocued) {
      onReFresh();
    }
  }, [isFocued]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.MY_JOURNEY);
  }, []);
  const {mutateAsync: contestentUpcominEvent, isLoading} = useCgMutation({
    key: GET_CONTESTENT_UPCOMING_EVENT + pageNo,
    url: GET_CONTESTENT_UPCOMING_EVENT + pageNo,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  const {mutateAsync: contestentUpcominEventRefetch, isLoading: isRefetching} =
    useCgMutation({
      key: GET_CONTESTENT_UPCOMING_EVENT + pageNo,
      url: GET_CONTESTENT_UPCOMING_EVENT + '1',
      method: MethodTypes.GET,
      offSuccessToast: true,
    });
  const getContestentUpcominEvent = async () => {
    createFirebaseLog(getContestentUpcominEvent.name, MyJourney.name, false);
    const res = await contestentUpcominEvent();
    if (res.success) {
      if (pageNo <= res.data.upcoming_events.last_page) {
        setPageNo(pageNo + 1);
        setlistData([...listData, ...res.data.upcoming_events.data]);
        setLength(res.data.upcoming_events.data.length);
        setMaxLength(res.data.upcoming_events.total);
      }
    }
  };

  const onAddEventClick = () => {
    createFirebaseLog(onAddEventClick.name, MyJourney.name, false);
    navigation.navigate(SCREEN.ADD_EVENT_DETAIL);
  };
  const listFooterComponent = () => {
    createFirebaseLog(listFooterComponent.name, MyJourney.name, false);
    if (isLoading) {
      return (
        <View style={styles.staticHeight}>
          <ActivityIndicator size="large" color={color.P_PINK} />
        </View>
      );
    } else {
      return <View style={styles.staticHeight} />;
    }
  };
  const onReFresh = async () => {
    createFirebaseLog(onReFresh.name, MyJourney.name, false);
    const res = await contestentUpcominEventRefetch();
    if (res.success) {
      setlistData(res.data.upcoming_events.data);
      setPageNo(2);
      setLength(res.data.upcoming_events.data.length);
      setMaxLength(res.data.upcoming_events.total);
    }
  };
  const onPressCard = (dateAvailable, id, pageant_id, event_directors_todo) => {
    createFirebaseLog(onPressCard.name, MyJourney.name, false);
    if (dateAvailable) {
      navigation.navigate(SCREEN.TODO, {
        pageant_id: pageant_id,
        event_directors_todo: event_directors_todo,
      });
    } else {
      navigation.navigate(SCREEN.ADD_EVENT_DETAIL, {
        id: id,
      });
      toast(
        translations.PLEASE_ENTER_START_DATE_END_DATE,
        toastType.SUCESS_TOAST,
      );
    }
  };

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width - moderateScaleVertical(32));
  }, []);

  return (
    <View style={{flex: 1}}>
      {length === 0 ? (
        <ScrollView style={styles.container}>
          <AppImages.MyJourney.MyJourneyLogo_ICON />
          <Text style={[styles.title]}>{translations.MY_JOURNEY_MSG}</Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              inactive
              label={translations.ADD_EVENT}
              onPress={onAddEventClick}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.mainContainer}>
          <FlatList
            ListHeaderComponent={() => {
              return (
                <Text style={styles.heading}>
                  {translations.PAGEANTS_YOU_ARE_COMPITING_IN}
                </Text>
              );
            }}
            data={listData}
            initialNumToRender={100}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={item => (
              <MyJourneyCards item={item} onPressCard={onPressCard} />
            )}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (listData?.length < maxLength) {
                getContestentUpcominEvent();
              }
            }}
            ListFooterComponent={listFooterComponent}
          />
        </View>
      )}
      {isRefetching && listData?.length === 0 && (
        <View style={styles.shimmerContainer}>
          <ShimmerList
            width={itemSize}
            height={moderateScaleVertical(100)}
            padding={15}
            borderRadius={16}
          />
        </View>
      )}
      {listData?.length !== 0 && (
        <FloatingButton
          iconId={FLOATING_ICON.PLUS}
          onPress={() => navigation.navigate(SCREEN.ADD_EVENT_DETAIL)}
        />
      )}
    </View>
  );
};

export default MyJourney;
