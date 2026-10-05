import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import translations from '../../../../assets/translations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../../common/header';
import AppImages from '../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {Param} from '../../../../services/constants';
import {BLOCKED_LIST, BLOCK_USER} from '../../../../services/endpoints';
import {MSG_TYPE} from '../../../utils/enum';
import NoRecord from '../../../common/norecord';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../utils/responsiveSize';
import Loader from '../../../common/customloader';
import {useIsFocused} from '@react-navigation/core';
import {onlyAlphabets} from '../../../utils/validations';
import {SCREEN} from '../../../../root/screenname';
import GalleryGridItem from '../../../common/gallerygriditem';
import ShimmerList from '../../../common/shimmer/listshimmer';

import {ConvoListing} from '../../../../services/models/convo/convoListing';
import useCgMutation from '../../../../services/api/useCgMutation';
import WarningModel from '../../../common/warningmodel';
import {checkIsConnected, trackScreenView} from '../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';
let timeoutId;
const debounce = (func: Function, delay: number) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const BlockedUsers = () => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [noOfItemSelected] = useState(0);
  const [param] = useState('all');
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading] = useState(false);
  const [userId, setUserId] = useState(null);
  const isFocused = useIsFocused();
  const [warningModal, setWarningModal] = useState(false);
  //API GET MESSAGES LIST ---------------------------------------------- START
  const {
    data: paginatedData,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<ConvoListing>({
    key: BLOCKED_LIST + searchValue,
    url: BLOCKED_LIST + searchValue,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.length,
    disableLoader: true,
  });
  const messageData =
    paginatedData?.pages
      ?.map(page => {
        if (page?.data?.data !== null && page?.data?.data !== undefined) {
          return page?.data?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  //API GET MESSAGES LIST ---------------------------------------------- END
  const {mutateAsync: hitBlockUserApi} = useCgMutation<Base>({
    key: BLOCK_USER,
    url: BLOCK_USER,
    body: {
      user_id: userId,
      unblock: true,
    },
    offSuccessToast: false,
    disableLoader: true,
  });
  const callBlockUserAPi = async () => {
    if (checkIsConnected()) {
      const res = await hitBlockUserApi();
      if (res.success) {
        refetch();
      }
    }
  };
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.BLOCKED_USERS);
  }, []);
  const getLabel = () => {
    if (deleteClicked) {
      return noOfItemSelected + ' ' + translations.SELECTED;
    } else {
      return SCREEN.BLOCKED_USERS;
    }
  };
  const noRecordFoundView = () => {
    return (
      <View style={styles.noRecordStyle}>
        <NoRecord
          text={
            isSearchActive
              ? translations.NO_RESULT_FOUND + '!'
              : translations.NO_BLOCK
          }
          rightIcon={
            <AppImages.Common.BlockedIllustration
              width={width - moderateScale(32)}
            />
          }
        />
      </View>
    );
  };
  const onSearchClick = () => {
    setSearchActive(true);
  };

  const onChangeInputText = val => {
    setSearchValue(onlyAlphabets(val));
    debounceSearch();
  };

  const onCrossButtonClicked = () => {
    setSearchActive(false);
    setSearchValue('');
    debounceSearch();
  };

  const onItemClick = item => {
    setUserId(item?.blocked_user_id);
    setWarningModal(true);
  };
  const debounceSearch = debounce(refetch, 600);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Loader isLoading={loading} />
      {!isSearchActive ? (
        <Header
          lable={getLabel()}
          rightIcon1={
            deleteClicked || messageData?.length === 0 ? null : (
              <AppImages.Dashboard.HeaderSearchIcon />
            )
          }
          onPressRightIcon1={onSearchClick}
          crossIcon={deleteClicked}
          onCrossIconClick={() => setDeleteClicked(false)}
          isUnderLineRequired
        />
      ) : (
        <View style={styles.searchView}>
          <TouchableOpacity onPress={() => onCrossButtonClicked()}>
            <AppImages.Common.crossIcon />
          </TouchableOpacity>
          <TextInput
            style={styles.textInputStyles}
            value={searchValue}
            onChangeText={val => onChangeInputText(val)}
            numberOfLines={1}
            autoFocus
          />
        </View>
      )}
      {isLoading ? (
        <View style={styles.gap}>
          <ShimmerList
            width={Dimensions.get('window').width - moderateScaleVertical(32)}
            height={moderateScaleVertical(100)}
            padding={15}
            borderRadius={16}
          />
        </View>
      ) : messageData?.length === 0 && param === MSG_TYPE.ALL ? (
        noRecordFoundView()
      ) : (
        <>
          {messageData?.length === 0 ? (
            noRecordFoundView()
          ) : (
            <View style={styles.gap}>
              <FlatList
                data={messageData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                renderItem={item => (
                  <GalleryGridItem
                    imageUrl={item?.item?.user?.profile_image_path}
                    label={item?.item?.user?.name}
                    onItemClickListener={() => onItemClick(item?.item)}
                    isList={true}
                    maxLines={3}
                    editIcon={false}
                    block={true}
                  />
                )}
              />
            </View>
          )}
        </>
      )}
      <WarningModel
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_UNBLOCK_THIS_USER}
        isModalVisible={warningModal}
        setConfirm={callBlockUserAPi}
        setIsModalVisible={setWarningModal}
        headingStyle={styles.modalHeading}
      />
    </SafeAreaView>
  );
};
export default BlockedUsers;
