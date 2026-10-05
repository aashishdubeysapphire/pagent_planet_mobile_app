import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import translations from '../../../assets/translations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../common/header';
// Removed: import messaging from '@react-native-firebase/messaging';
import AppImages from '../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../services/api/useHtInfiniteQuery';
import {Param} from '../../../services/constants';
import {MESSAGE_LIST} from '../../../services/endpoints';
import FilterModal from './components/filtermodal';
import MessageList from './components/messagelist';
import {MessageFilterMenu, MessageThreeDotMenu} from '../../utils/localarray';
import ShimmerMessageList from '../../common/shimmer/messagelistshimmer';
import {MessagesData} from '../../../services/models/messagesData';
import {MSG_TYPE, NOTIFICATION_TYPE} from '../../utils/enum';
import NoRecord from '../../common/norecord';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../utils/responsiveSize';
import ComposeButton from './components/composebutton';
import Loader from '../../common/customloader';
import {useIsFocused} from '@react-navigation/core';
import {Notification} from '../../../services/models/notification/notificationData';
import {onlyAlphabets} from '../../utils/validations';
import {
  createFirebaseLog,
  isIosDevice,
  trackScreenView,
} from '../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../assets/translations/analyticsscreenname';
import {SCREEN} from '../../../root/screenname';

let timeoutId;
const debounce = (func: Function, delay: number) => {
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const Message = () => {
  const [isFilterModalClicked, setFilterModalState] = useState(false);
  const [threeDotMenuClicked, setThreeDotMenuClicked] = useState(false);
  const [selectedFilterItem, setSelectedFilterItem] = useState(0);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [noOfItemSelected, setNoOfItemSelected] = useState(0);
  const [heading, setHeading] = useState('');
  const [param, setParam] = useState('all');
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoader] = useState(false);
  const isFocused = useIsFocused();

  // API GET MESSAGES LIST
  const {data, fetchNextPage, isLoading, refetch, isFetchingNextPage} =
    useInfiniteHtQuery<MessagesData>({
      key: MESSAGE_LIST + param + searchValue,
      url: MESSAGE_LIST + param + Param.MSG_SEARCH + searchValue,
      page: Param.PAGE_,
      getDataArray: page => page?.data?.messageList?.data?.length,
      reverse: true,
      disableLoader: true,
    });

  const messageData =
    data?.pages
      ?.map((page: MessagesData) => {
        if (
          page?.data?.messageList?.data !== null &&
          page?.data?.messageList?.data !== undefined
        ) {
          return page?.data?.messageList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  useEffect(() => {
    getHeading();
  }, [selectedFilterItem]);

  // Foreground message listener – now safely deferred
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.MESSAGE);

    const setupForegroundListener = async () => {
      try {
        const {default: messaging} = await import(
          '@react-native-firebase/messaging'
        );

        const unsubscribe = messaging().onMessage(async remoteMessage => {
          filterAndRefresh(remoteMessage.data as Notification);
        });

        return unsubscribe;
      } catch (error) {
        console.log('Failed to set up foreground message listener:', error);
        return () => {};
      }
    };

    let unsubscribe: (() => void) | undefined;

    setupForegroundListener().then(unsub => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filterAndRefresh = async (notification: Notification) => {
    createFirebaseLog(filterAndRefresh.name, SCREEN.MESSAGE);
    if (notification.notification_type === NOTIFICATION_TYPE.MESSAGE) {
      refetch();
    }
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const getHeading = () => {
    createFirebaseLog(getHeading.name, SCREEN.MESSAGE);
    if (selectedFilterItem === 0) {
      setParam(MSG_TYPE.ALL);
      setHeading(translations.ALL + ' ' + translations.MESSAGES);
    } else if (selectedFilterItem === 1) {
      setParam(MSG_TYPE.RECEIVED);
      setHeading(translations.RECEIVED + ' ' + translations.MESSAGES);
      trackScreenView(ANALYTICS_SCREEN.RECEIVED_MESSAGES);
    } else if (selectedFilterItem === 2) {
      setParam(MSG_TYPE.SENT);
      setHeading(translations.SENT + ' ' + translations.MESSAGES);
      trackScreenView(ANALYTICS_SCREEN.SENT_MESSAGES);
    } else if (selectedFilterItem === 3) {
      setParam(MSG_TYPE.UNREAD);
      setHeading(translations.UNREAD + ' ' + translations.MESSAGES);
    }
  };

  const getLabel = () => {
    createFirebaseLog(getLabel.name, SCREEN.MESSAGE);
    if (deleteClicked) {
      return noOfItemSelected + ' ' + translations.SELECTED;
    } else {
      return translations.MESSAGES;
    }
  };

  const onSearchClick = () => {
    createFirebaseLog(onSearchClick.name, SCREEN.MESSAGE);
    setSearchActive(true);
  };

  const onChangeInputText = (val: string) => {
    createFirebaseLog(onChangeInputText.name, SCREEN.MESSAGE);
    setSearchValue(onlyAlphabets(val));
    debounceSearch();
  };

  const onCrossButtonClicked = () => {
    createFirebaseLog(onCrossButtonClicked.name, SCREEN.MESSAGE);
    setSearchActive(false);
    setSearchValue('');
    debounceSearch();
  };

  const debounceSearch = debounce(refetch, 600);

  const noRecordFoundView = () => {
    createFirebaseLog(noRecordFoundView.name, SCREEN.MESSAGE);
    return (
      <View style={styles.noRecordStyle}>
        <NoRecord
          text={
            isSearchActive
              ? translations.NO_RESULT_FOUND + '!'
              : translations.YOU_HAVE_NO_MSG
          }
          rightIcon={
            <AppImages.MESSAGES.EmptyMsgState
              width={width - moderateScale(32)}
            />
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Loader isLoading={loading} />
      {isSearchActive ? (
        <View style={styles.searchView}>
          <TouchableOpacity onPress={onCrossButtonClicked}>
            <AppImages.Common.crossIcon />
          </TouchableOpacity>
          <TextInput
            style={styles.textInputStyles}
            value={searchValue}
            onChangeText={onChangeInputText}
            numberOfLines={1}
            autoFocus
          />
        </View>
      ) : (
        <Header
          lable={getLabel()}
          rightIcon1={
            deleteClicked || messageData?.length === 0 ? null : (
              <AppImages.Dashboard.HeaderSearchIcon />
            )
          }
          rightIcon2={
            deleteClicked ? null : <AppImages.Dashboard.HeaderMenuIcon />
          }
          onPressRightIcon2={() =>
            deleteClicked ? null : setThreeDotMenuClicked(!threeDotMenuClicked)
          }
          crossIcon={deleteClicked}
          onCrossIconClick={() => setDeleteClicked(false)}
          isUnderLineRequired
          onPressRightIcon1={onSearchClick}
        />
      )}
      {isLoading ? (
        <ShimmerMessageList />
      ) : messageData?.length === 0 && param === MSG_TYPE.ALL ? (
        noRecordFoundView()
      ) : (
        <>
          <View style={styles.headerStyle}>
            <Text style={styles.headingStyle}>{heading}</Text>
            {deleteClicked ? null : (
              <TouchableOpacity
                onPress={() => setFilterModalState(!isFilterModalClicked)}>
                <AppImages.Common.filter />
              </TouchableOpacity>
            )}
          </View>
          {messageData?.length === 0 ? (
            noRecordFoundView()
          ) : (
            <MessageList
              dataList={messageData}
              isDeleteClicked={deleteClicked}
              refetchGetAPI={refetch}
              setNoOfItemSelected={setNoOfItemSelected}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              setDeleteClicked={setDeleteClicked}
              setLoader={setLoader}
              isSearchActive={isSearchActive}
              param={param}
            />
          )}
        </>
      )}
      <FilterModal
        modalVisible={isFilterModalClicked || threeDotMenuClicked}
        setModalVisible={
          isFilterModalClicked ? setFilterModalState : setThreeDotMenuClicked
        }
        type={
          isFilterModalClicked
            ? translations.FILTER
            : translations.THREEDOT_MENU
        }
        menuList={
          isFilterModalClicked ? MessageFilterMenu : MessageThreeDotMenu
        }
        selectedFilterItem={selectedFilterItem}
        setSelectedFilterItem={setSelectedFilterItem}
        setDeleteClicked={setDeleteClicked}
        disableDelete={messageData?.length === 0}
      />

      {messageData?.length === 0 && !isLoading && !isSearchActive ? (
        <ComposeButton
          isExtended={true}
          showComposeIcon={true}
          topMargin={
            isIosDevice()
              ? moderateScaleVertical(130)
              : moderateScaleVertical(70)
          }
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Message;
