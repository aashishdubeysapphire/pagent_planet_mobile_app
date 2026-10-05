import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  Text,
  Dimensions,
} from 'react-native';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {styles} from './styles';
import {
  GET_CURRENT_PAGEANTS,
  GET_PAGEANT_WON,
  GET_PAST_PAGEANTS,
  GET_AWARDS_WON_LIST,
} from '../../../../../../../services/endpoints';
import translations from '../../../../../../../assets/translations';
import FloatingButton from '../../../../../../common/floatingbutton';
import {FLOATING_ICON} from '../../../../../../utils/enum';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import AppImages from '../../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import PageantListView from '../../../../../../common/pageantlistview';
import {SCREEN} from '../../../../../../../root/screenname';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../../../common/commonalert';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {ViewAllData} from '../../../../../../../services/models/pageantdetails/viewAllData';
import {Param} from '../../../../../../../services/constants';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import DeviceInfo from 'react-native-device-info';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {isIosDevice} from '../../../../../../utils/helperFunction';

const ViewAllComponent = props => {
  const [url, setUrl] = useState(props?.route?.params?.Url);
  const [label, setLabel] = useState(props?.route?.params?.screenName);
  const [menuData, setMenuData] = useState([]);
  const setLoader = useSetLoader();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [hasScreenNotch, sethasScreenNotch] = useState();
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);

  const {
    data: paginatedData,
    fetchNextPage,
    refetch,
    isLoading,
  } = useInfiniteHtQuery<ViewAllData>({
    key: url + label + props?.route?.params?.contestantId,
    url: url + Param.CONTESTANT_PARAM_ + props?.route?.params?.contestantId,
    page: Param.PAGE_,
    getDataArray: page => page.data?.data.length,
    reverse: true,
  });

  const eventListData =
    paginatedData?.pages
      ?.map((page: ViewAllData) => {
        if (page?.data?.data !== null && page?.data?.data !== undefined) {
          return page.data?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  useEffect(() => {
    setLoader(true);
    setMenuData(props?.route?.params?.data);
    const screen_name = props?.route?.params?.screenName;
    setLabel(screen_name);
    const hasNotch = DeviceInfo.hasNotch();
    sethasScreenNotch(String(hasNotch));
  }, []);

  const onItemClick = (index: number) => {
    navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
      eventId: eventListData[index]?.pageant_id,
      name: eventListData[index]?.pageant?.title,
    });
  };

  const handlePlusButton = () => {
    props.navigation.navigate(SCREEN.ADD_EVENT_DETAIL);
  };

  const handleMenuOnPress = (title: string) => {
    setLabel(title);
    if (title === translations.PAGEANT_WON) {
      setUrl(GET_PAGEANT_WON);
    } else if (title === translations.AWARD_WON) {
      setUrl(GET_AWARDS_WON_LIST);
    } else if (title === translations.CURRENT_PAGEANT) {
      setUrl(GET_CURRENT_PAGEANTS);
    } else if (title === translations.PAGEANT_COMPETED_IN) {
      setUrl(GET_PAST_PAGEANTS);
    } else {
      setUrl('');
    }

    setTimeout(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          refeshScreenList();
        } else {
          setLoader(false);
          internetState(netInfo.isConnected!!);
        }
      });
    }, 500);
  };

  const refeshScreenList = async () => {
    setLoader(true);
    await refetch();
    setLoader(false);
  };
  const onDropDownIconClick = () => {
    setModalVisible(true);
  };

  const onEndReached = async () => {
    fetchNextPage();
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Modal
          statusBarTranslucent={true}
          animationType="fade"
          transparent={true}
          visible={modalVisible}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={styles.outerview}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                ...styles.innerview,
                top: !isIosDevice()
                  ? moderateScaleVertical(70)
                  : hasScreenNotch === 'true'
                  ? moderateScaleVertical(92)
                  : moderateScaleVertical(60),
              }}>
              <FlatList
                data={menuData}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={item => (
                  <TouchableOpacity
                    style={styles.cardTouch}
                    onPress={() => {
                      setModalVisible(false);
                      handleMenuOnPress(item?.item?.title);
                    }}>
                    <View style={styles.cardRow}>
                      <Text
                        style={
                          label === item.item.title
                            ? styles.staticSelectedCardLable
                            : styles.staticCardLable
                        }>
                        {item?.item?.title}
                      </Text>
                      {label === item.item.title ? (
                        <View style={{width: moderateScale(20)}}>
                          <AppImages.Dashboard.tick_ICON />
                        </View>
                      ) : (
                        <View style={{width: moderateScale(20)}}></View>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <AppImages.Common.Back_ICON style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDropDownIconClick}
            style={{flexDirection: 'row', marginLeft: moderateScale(8)}}>
            <Text
              style={
                modalVisible ? styles.selectedLabelStyle : styles.lableStyle
              }>
              {label}
            </Text>
            {modalVisible ? (
              <AppImages.EditProfile.Tpp_dropdown_pink
                style={styles.dropIcon}
              />
            ) : (
              <AppImages.Dashboard.HeaderDropdownIcon style={styles.dropIcon} />
            )}
          </TouchableOpacity>
        </View>
      </>
      <View style={{marginTop: moderateScaleVertical(16)}}>
        {eventListData?.length > 0 ? (
          <FlatList
            data={eventListData}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            numColumns={1}
            key={'*'}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item, index}) =>
              label === translations.AWARD_WON ? (
                <PageantListView
                  position={index}
                  screenName={label}
                  imageUrl={item?.pageant?.main_image}
                  label={item?.pageant?.title}
                  onItemClickListener={onItemClick}
                  award_name={
                    item?.award?.name !== undefined
                      ? translations.AWARD + item?.award?.name
                      : item?.got_title
                  }
                  type={item?.type}
                  contestant_id={item?.pageant_contestant_id}
                  numberOfLinesForTitle={3}
                  smallBannerImage={false}
                  edit={props?.route?.params?.edit}
                />
              ) : (
                <GalleryGridItem
                  position={index}
                  imageUrl={item?.pageant?.main_image}
                  label={item?.pageant?.title}
                  isList={true}
                  maxLines={3}
                  onItemClickListener={onItemClick}
                  editIcon={props?.route?.params?.edit}
                  contestant_id={
                    label === translations.AWARD_WON ||
                    label === translations.PAGEANT_WON
                      ? item?.pageant_contestant_id
                      : item?.id
                  }
                />
              )
            }
          />
        ) : (
          isLoading && (
            <ShimmerList
              width={Dimensions.get('window').width - moderateScale(32)}
              height={moderateScaleVertical(110)}
              padding={15}
              numColumns={2}
            />
          )
        )}
      </View>
      {props?.route?.params?.edit ? (
        <FloatingButton
          iconId={FLOATING_ICON.PLUS}
          onPress={() => handlePlusButton()}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default ViewAllComponent;
