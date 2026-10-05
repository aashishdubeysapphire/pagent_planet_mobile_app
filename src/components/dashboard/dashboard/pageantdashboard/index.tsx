import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import AppImages from '../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import {GET_PAGEANT_SYSTEM} from '../../../../services/endpoints';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {PageantTypes, REFESH_SCREEN} from '../../../utils/enum';
import {SCREEN} from '../../../../root/screenname';
import ShimmerList from '../../../common/shimmer/listshimmer';
import useAppStore, {useSetScreenRefresh} from '../../../../store/useAppStore';
import UpcomingPageantGridListView from '../../../common/upcomingpageantgridlist';
import CustomRatings from '../../../common/customratings';
import useHtQuery from '../../../../services/api/useHtQuery';
import {PageantListResponse} from '../../../../services/models/pageantsData/pageantsListResponse';
import FastImageView from '../../../common/fastimageview';
import {ScrollView} from 'react-native-gesture-handler';
import Shimmer from '../../../common/shimmer';
import {trackScreenView} from '../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';
import Carousel from 'react-native-reanimated-carousel';


const width = Dimensions.get('window').width;

const PageantDashboard = props => {
  const [isActive, setIsActive] = useState(true);
  const [isActiveInactiveState, setActiveInactiveState] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isListActive, setListState] = useState(false);
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);

  const [upcomingPageantsList, setUpcomingPageantsList] = useState([]);
  const [activePageantsList, setActivePageantsList] = useState([]);
  const [inactivePageantsList, setInactivePageantsList] = useState([]);
  const [upcomingListLen, setUpcomingListLen] = useState(0);
  const setScreenRefresh = useSetScreenRefresh();
  const {
    storeData: {refresh},
  } = useAppStore();
  const isFocused = useIsFocused();

  //API PAGEANT LIST ----------------------------------------- START
  const {data, isLoading, refetch} = useHtQuery<PageantListResponse>({
    key: GET_PAGEANT_SYSTEM,
    url: GET_PAGEANT_SYSTEM,
    offSuccessToast: true,
  });
  //API PAGEANT LIST ----------------------------------------- END

  const onListModeActive = () => {
    setListState(!isListActive);
  };

  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PAGEANT_DASHBOARD);
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const refeshScreenList = async () => {
    if (REFESH_SCREEN.PAGEANT_LIST === refresh) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      const pageantData = data?.data?.pageants;
      setUpcomingPageantsList(pageantData?.upcomingPageantsArr);
      setActivePageantsList(pageantData?.activePageantsArr);
      setInactivePageantsList(pageantData?.inactivePageantsArr);
      setUpcomingListLen(pageantData?.upcomingPageantsArr?.length);
      if (pageantData?.activePageantsArr?.length > 0) {
        setIsActive(true);
      } else if (pageantData?.inactivePageantsArr?.length > 0) {
        setIsActive(false);
      }
      if (
        pageantData?.activePageantsArr.length > 0 &&
        pageantData?.inactivePageantsArr?.length > 0
      ) {
        setActiveInactiveState(true);
      } else {
        setActiveInactiveState(false);
      }
    }
  }, [data]);

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          moveToPageantDetailScreen(item);
        }}>
        <View
          style={{
            ...styles.carouselContainer,
            width: upcomingListLen === 1 ? width * 0.93 : moderateScale(320),
            justifyContent: 'center', // centers the card horizontally
          }}>
          <View style={styles.eventImageArea}>
            <FastImageView
              height={moderateScaleVertical(102)}
              width={moderateScaleVertical(102)}
              imageUrl={item?.main_image_full_url}
              borderRadius={moderateScale(16)}
            />
          </View>
          <View style={styles.eventSection}>
            <Text style={styles.eventNameLabel} numberOfLines={2}>
              {item?.title}
            </Text>
            <View style={styles.ratingArea}>
              <CustomRatings
                ratingsValue={
                  item?.average_rating === undefined ? 0 : item?.average_rating
                }
                review_count={
                  item?.rating_count === undefined ? 0 : item?.rating_count
                }
              />
            </View>
            {item?.participants_count === 0 ? null : (
              <View style={styles.ratingArea}>
                <AppImages.Common.PinkProfile_ICON />
                <Text style={styles.lifetimeParticipantLabel}>
                  {item?.participants_count +
                    ' ' +
                    translations.LIFETIME_PARTICIPANT}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onItemClick = (index: number) => {
    moveToPageantDetailScreen(
      isActive ? activePageantsList[index] : inactivePageantsList[index],
    );
  };

  const moveToPageantDetailScreen = (item: any) => {
    navigation.navigate(SCREEN.PAGEANT_DETAIL, {
      pageantId: item.id,
      pageantName: item.title,
      pageantImageUrl: item.main_image_full_url,
      isActiveL: isActive,
    });
  };

  const shimmerEffect = () => {
    return (
      <View>
        <Shimmer
          width={itemSize}
          height={moderateScaleVertical(10)}
          leftBottomSpace={16}
          borderRadius={16}
        />
        <Shimmer
          width={width - moderateScale(30)}
          height={moderateScaleVertical(120)}
          leftBottomSpace={16}
          borderRadius={16}
        />
        <Shimmer
          width={itemSize}
          height={moderateScaleVertical(10)}
          leftBottomSpace={16}
          borderRadius={16}
        />
        <ShimmerList
          width={itemSize}
          height={itemSize}
          padding={15}
          numColumns={2}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {isActiveInactiveState ? (
        <View
          style={{
            ...styles.toggleContainer,
            marginBottom:
              isActive && upcomingListLen > 0 ? moderateScaleVertical(24) : 0,
          }}>
          <TouchableOpacity
            style={
              isActive ? styles.activeButtonView : styles.inActiveButtonView
            }
            onPress={() => {
              setIsActive(true);
            }}>
            <Text
              style={
                isActive ? styles.activeLabelStyles : styles.inActiveLabelStyles
              }>
              {translations.ACTIVE}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isActive ? styles.inActiveButtonView : styles.activeButtonView
            }
            onPress={() => {
              setIsActive(false);
            }}>
            <Text
              style={
                isActive ? styles.inActiveLabelStyles : styles.activeLabelStyles
              }>
              {translations.INACTIVE}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView>
        {isActive && upcomingListLen > 0 ? (
          <View
            style={{
              marginTop: isActiveInactiveState ? 0 : moderateScaleVertical(16),
            }}>
            <View style={styles.upcomingEventHeader}>
              <Text style={styles.heading}>
                {translations.UPCOMING_PAGEANT}
              </Text>
            </View>
            <View
              style={{
                ...styles.upcomingEventSection,
                height:
                  upcomingListLen === 1 ? null : moderateScaleVertical(152),
              }}>
              {upcomingPageantsList.length > 0 && (
                <Carousel
                  width={width}
                  height={moderateScaleVertical(152)}
                  data={upcomingPageantsList}
                  renderItem={_renderItem}
                  onSnapToItem={index => setActiveSlide(index)}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: 0.92,
                    parallaxScrollingOffset: 60,
                  }}
                  panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                  }}
                  loop={false}
                  enabled={upcomingListLen > 1} // disable swipe if only one item
                />
              )}

              {/* Custom Pagination Dots - matches your old styles exactly */}
              {upcomingListLen > 1 && (
                <View style={styles.paginationContainerStyle}>
                  {upcomingPageantsList.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        index === activeSlide
                          ? styles.activeDotStyle
                          : styles.inactiveDotStyle,
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>
          </View>
        ) : null}

        {!isActive && !isActiveInactiveState ? (
          <View style={styles.inactiveMessageStyle}>
            <Text style={styles.inactiveMessageLabel} numberOfLines={2}>
              {translations.INACTIVE_MESSAGE_LABEL}
            </Text>
          </View>
        ) : null}

        <View style={styles.scrollableContainer}>
          {!isLoading ? (
            <View style={styles.modeContainer}>
              <Text style={styles.heading}>
                {isActive
                  ? PageantTypes.ACTIVE_PAGEANT
                  : PageantTypes.INACTIVE_PAGEANT}
              </Text>

              <TouchableOpacity onPress={onListModeActive}>
                {isListActive ? (
                  <AppImages.Gallery.GridActive_ICON />
                ) : (
                  <AppImages.Gallery.ListActive_ICON />
                )}
              </TouchableOpacity>
            </View>
          ) : null}
          {activePageantsList?.length > 0 ||
          inactivePageantsList?.length > 0 ? (
            <FlatList
              data={isActive ? activePageantsList : inactivePageantsList}
              showsVerticalScrollIndicator={false}
              numColumns={isListActive ? 1 : 2}
              key={isListActive ? '_' : '#'}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <UpcomingPageantGridListView
                  position={index}
                  imageUrl={item?.main_image_full_url}
                  label={item?.title}
                  maxLines={isListActive ? 2 : 1}
                  isList={isListActive}
                  onItemClickListener={onItemClick}
                  size={itemSize}
                  ratings={item?.average_rating}
                  ratingsCount={item?.rating_count}
                  participantsCount={item?.participants_count}
                />
              )}
            />
          ) : isLoading ? (
            shimmerEffect()
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageantDashboard;