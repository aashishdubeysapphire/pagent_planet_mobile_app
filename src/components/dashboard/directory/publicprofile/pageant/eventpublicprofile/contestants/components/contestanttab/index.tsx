import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  memo,
} from 'react';
import {View, Text, FlatList, ListRenderItem} from 'react-native';
import {styles} from './styles';
import {Param, UpgradPlan} from '../../../../../../../../../services/constants';
import {GET_EVENT_PUBLIC_PROFILE_CONTESTANT_LIST} from '../../../../../../../../../services/endpoints';
import ShimmerList from '../../../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {
  DIRECTORY_ID,
  PROFILE_STATUS,
  ROLES,
} from '../../../../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../../../utils/responsiveSize';
import {PageantContestantData} from '../../../../../../../../../services/models/pageantdetails/pageantContestantData';
import {Contestant} from '../../../../../../../../../services/models/pageantdetails/contestant';
import {Base} from '../../../../../../../../../services/models/base';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../common/commonalert';
import ContestantsList from '../../../components/contestantlist';
import useHtQuery from '../../../../../../../../../services/api/useHtQuery';
import ContestantVoteItem from '../../../components/contestantvote';
import translations from '../../../../../../../../../assets/translations';
import {checkIsNull} from '../../../../../../../../utils/validations';

interface Props {
  eventId?: number;
  screenKey: number;
  ageId: string;
  isFlatListScroolEnable: boolean;
  globalTimer: number;
  hideContestantLastName: boolean;
}

type ContentProps = Props & {
  data: Base<PageantContestantData>;
};

type VoteCountdownHeaderProps = {
  visible: boolean;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const VoteCountdownHeader = memo(
  ({visible, days, hours, minutes, seconds}: VoteCountdownHeaderProps) => {
    if (!visible) {
      return null;
    }

    return (
      <View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerTitleTextContainer}>
            {translations.TIME_LEFT_TO_VOTE}
          </Text>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
            }}>
            <View style={styles.durationRow}>
              <View style={styles.durationRow}>
                <View>
                  <Text style={styles.duration}>Day</Text>
                  <Text style={styles.timer}>{days}</Text>
                </View>
                <Text style={styles.dotDivider}>:</Text>
              </View>

              <View style={styles.durationRow}>
                <View>
                  <Text style={styles.duration}>Hour</Text>
                  <Text style={styles.timer}>{hours}</Text>
                </View>
                <Text style={styles.dotDivider}>:</Text>
              </View>

              <View style={styles.durationRow}>
                <View>
                  <Text style={styles.duration}>Min</Text>
                  <Text style={styles.timer}>{minutes}</Text>
                </View>
                <Text style={styles.dotDivider}>:</Text>
              </View>

              <View style={styles.durationRow}>
                <View>
                  <Text style={styles.duration}>Sec</Text>
                  <Text style={styles.timer}>{seconds}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  },
);

type ContestantTabRowProps = {
  item: Contestant;
  index: number;
  showVoteUI: boolean;
  isShowVote: boolean;
  itemSize: number;
  hideContestantLastName: boolean;
  onVote: (index: number) => void;
  onProfile: (index: number) => void;
  onClaim: (index: number) => void;
};

const ContestantTabRow = memo(
  ({
    item,
    index,
    showVoteUI,
    isShowVote,
    itemSize,
    hideContestantLastName,
    onVote,
    onProfile,
    onClaim,
  }: ContestantTabRowProps) => {
    const label = checkIsNull(item?.contestant_name)
      ? item?.contestant_name
      : hideContestantLastName
      ? item?.first_name
      : item?.name;

    if (showVoteUI) {
      return (
        <ContestantVoteItem
          position={index}
          imageUrl={item?.final_image_url}
          label={label}
          isHideReceivedVotes={isShowVote}
          title={item?.contestant_title}
          totalVotes={item?.total_votes}
          maxLines={1}
          ownerId={item?.contestant_profile?.owner_id}
          onBottomTextClickListener={onVote}
          onTextClickListener={onProfile}
          size={itemSize}
          isMinor={item?.contestant_profile?.is_minor !== translations.NO_SMALL}
          onClaimButtonPress={onClaim}
          isActive={item?.contestant_profile?.status === PROFILE_STATUS.ACTIVE}
        />
      );
    }

    return (
      <ContestantsList
        position={index}
        onItemClickListener={onVote}
        onTextClickListener={onProfile}
        imagePath={item?.final_image_url}
        itemSize={itemSize + moderateScaleVertical(3)}
        ownerId={item?.contestant_profile?.owner_id}
        contestantName={label}
        title={item?.contestant_title}
        numberOfLinesForName={1}
        numberOfLinesForTitle={1}
        horizontalView={false}
        isMinor={item?.contestant_profile?.is_minor !== translations.NO_SMALL}
        onClaimButtonPress={onClaim}
        isActive={item?.contestant_profile?.status === PROFILE_STATUS.ACTIVE}
      />
    );
  },
);

const ListFooter = memo(() => <View style={styles.staticHeight} />);

const ContestantTabContent = ({
  eventId,
  ageId,
  screenKey,
  isFlatListScroolEnable,
  hideContestantLastName = false,
  globalTimer,
  data,
}: ContentProps) => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(width / 2 - moderateScale(24));
  const [isTimerRuning, setTimerRuning] = useState(false);
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const navigation = useNavigation();

  const netInfoRef = useRef(netInfo);
  const dataRef = useRef(data);
  const isTimerRuningRef = useRef(isTimerRuning);

  netInfoRef.current = netInfo;
  dataRef.current = data;
  isTimerRuningRef.current = isTimerRuning;

  const eventContestants = data?.data?.pageantContestants?.eventContestants;
  const pageantContestants = data?.data?.pageantContestants;

  const isShowVote = pageantContestants?.is_show_vote ?? false;

  const countdownActive = useMemo(() => {
    const remaining = pageantContestants?.current_pca_end_date_time_difference;
    return (
      remaining !== undefined &&
      remaining !== null &&
      remaining > 0 &&
      pageantContestants?.is_timer !== undefined &&
      pageantContestants?.is_timer === true
    );
  }, [
    pageantContestants?.current_pca_end_date_time_difference,
    pageantContestants?.is_timer,
  ]);

  const showVoteUI = isTimerRuning && countdownActive;

  const timerHeaderVisible = useMemo(
    () => isTimerRuning && countdownActive,
    [isTimerRuning, countdownActive],
  );

  useEffect(() => {
    isTimerRuningRef.current = isTimerRuning;
  }, [isTimerRuning]);

  useEffect(() => {
    setItemSize(width / 2 - moderateScale(24));
  }, []);

  useEffect(() => {
    if (
      data?.data?.pageantContestants?.is_pca_activated === UpgradPlan.YES &&
      data?.data?.pageantContestants?.is_timer !== undefined &&
      data?.data?.pageantContestants?.is_timer &&
      data?.data?.pageantContestants?.is_pageant_completed !== UpgradPlan.YES
    ) {
      setTimerRuning(true);
    }
  }, [data]);

  const secondsToDhms = useCallback((sec: number) => {
    const secs = Number(sec);
    const d = Math.floor(secs / (3600 * 24));
    const h = Math.floor((secs % (3600 * 24)) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);

    const dDisplay = d > 0 ? (d < 10 ? `0${d}` : d) : '00';
    setDays(dDisplay + '');
    const hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) : '00';
    setHours(hDisplay + '');
    const mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) : '00';
    setMinutes(mDisplay + '');
    const sDisplay = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
    setSeconds(sDisplay + '');
  }, []);

  useEffect(() => {
    const remaining = pageantContestants?.current_pca_end_date_time_difference;

    if (
      remaining !== undefined &&
      remaining !== null &&
      remaining > 0 &&
      remaining - globalTimer > 0
    ) {
      secondsToDhms(remaining - globalTimer);
    } else {
      if (isTimerRuningRef.current) {
        toast(
          translations.THE_CONTEST_ENDED_YOU_CAN_NO_LONGER_VOTE_FOR_THE_CONTESTANT,
          toastType.ERROR_TOAST,
        );
      }
      setTimerRuning(false);
    }
  }, [
    globalTimer,
    pageantContestants?.current_pca_end_date_time_difference,
    secondsToDhms,
  ]);

  const moveToVoteConstestantScreen = useCallback(
    (index: number) => {
      const currentNetInfo = netInfoRef.current;
      if (!currentNetInfo.isConnected && !currentNetInfo.isInternetReachable) {
        internetState(currentNetInfo.isConnected!!);
        return false;
      }

      if (!isTimerRuningRef.current) {
        return false;
      }

      const contestants =
        dataRef.current?.data?.pageantContestants?.eventContestants;
      const contestant = contestants?.[index];

      const voteNavParams = {
        eventId: eventId,
        ageDivisionId: ageId,
        screenKey: screenKey,
        contestant: contestant,
        contentantName: checkIsNull(contestant?.contestant_name)
          ? contestant?.contestant_name
          : hideContestantLastName
          ? contestant?.first_name
          : contestant?.name,
        contestantId: contestant?.contestant_id,
      };
      console.log(
        'Vote navigate params →',
        SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE,
        voteNavParams,
      );

      navigation.navigate(
        SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE,
        voteNavParams,
      );
    },
    [navigation, eventId, ageId, screenKey, hideContestantLastName],
  );

  const moveToConstestantPublicProfileScreen = useCallback(
    (index: number) => {
      const currentNetInfo = netInfoRef.current;
      if (!currentNetInfo.isConnected && !currentNetInfo.isInternetReachable) {
        internetState(currentNetInfo.isConnected!!);
        return false;
      }

      const contestant =
        dataRef.current?.data?.pageantContestants?.eventContestants?.[index];

      if (
        contestant?.contestant_profile?.is_minor !== translations.NO_SMALL ||
        contestant?.contestant_profile?.status !== PROFILE_STATUS.ACTIVE
      ) {
        toast(translations.NO_PROFILE_DETAIL, toastType.SUCESS_TOAST);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId:
            contestant.contestant_profile.owner_id === 1
              ? contestant.contestant_id
              : contestant.contestant_profile.owner_id,
          profileId: contestant.contestant_id,
          name: contestant.name,
          category: DIRECTORY_ID.CONTESTANT,
          selectedTab: ROLES.CONTESTANT,
          key: new Date().getMilliseconds(),
        });
      }
    },
    [navigation],
  );

  const moveToClaimProfileScreen = useCallback(
    (index: number) => {
      const currentNetInfo = netInfoRef.current;
      if (!currentNetInfo.isConnected && !currentNetInfo.isInternetReachable) {
        internetState(currentNetInfo.isConnected!!);
        return false;
      }

      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.SMALL_CONTESTANT,
        slug: dataRef.current?.data?.pageantContestants?.eventContestants?.[
          index
        ]?.slug,
      });
    },
    [navigation],
  );

  const keyExtractor = useCallback(
    (item: Contestant, index: number) =>
      String(item?.contestant_id ?? item?.slug ?? index),
    [],
  );

  const renderItem: ListRenderItem<Contestant> = useCallback(
    ({item, index}) => (
      <ContestantTabRow
        item={item}
        key={index}
        index={index}
        showVoteUI={showVoteUI}
        isShowVote={isShowVote}
        itemSize={itemSize}
        hideContestantLastName={hideContestantLastName}
        onVote={moveToVoteConstestantScreen}
        onProfile={moveToConstestantPublicProfileScreen}
        onClaim={moveToClaimProfileScreen}
      />
    ),
    [
      showVoteUI,
      isShowVote,
      itemSize,
      hideContestantLastName,
      moveToVoteConstestantScreen,
      moveToConstestantPublicProfileScreen,
      moveToClaimProfileScreen,
    ],
  );

  const listHeaderComponent = useMemo(
    () => (
      <VoteCountdownHeader
        visible={timerHeaderVisible}
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    ),
    [timerHeaderVisible, days, hours, minutes, seconds],
  );

  if (!eventContestants || eventContestants.length === 0) {
    return null;
  }

  return (
    <View
      style={
        data?.data?.pageantContestants?.is_show_vote !== undefined &&
        data?.data?.pageantContestants?.is_show_vote &&
        isTimerRuning
          ? styles.flatlistView
          : styles.contestantItemContainer
      }>
      <View>
        <FlatList
          data={eventContestants}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          nestedScrollEnabled
          key={'_'}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={isFlatListScroolEnable}
          keyExtractor={keyExtractor}
          ListHeaderComponent={listHeaderComponent}
          ListFooterComponent={ListFooter}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const PublicProfileContestantTab = (props: Props) => {
  const {eventId, ageId, screenKey} = props;
  const netInfo = useNetInfo();
  const shimmerItemSize = width / 2 - moderateScale(24);

  const {data, isLoading} = useHtQuery<PageantContestantData>({
    key:
      screenKey +
      GET_EVENT_PUBLIC_PROFILE_CONTESTANT_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,

    url:
      GET_EVENT_PUBLIC_PROFILE_CONTESTANT_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageId,
    offSuccessToast: true,
  });

  if (isLoading || !data) {
    if (netInfo.isInternetReachable === false) {
      return null;
    }
    return (
      <View style={styles.shimmerContainer}>
        <ShimmerList
          width={shimmerItemSize}
          height={shimmerItemSize}
          padding={15}
          numColumns={2}
        />
      </View>
    );
  }

  return <ContestantTabContent {...props} data={data} />;
};

export default PublicProfileContestantTab;
