import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import {styles} from './styles';

import {
  GET_GROUP_LIST,
  REMOVE_GROUP,
} from '../../../../../../../../../services/endpoints';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import {GROUP, REFESH_SCREEN} from '../../../../../../../../utils/enum';
import NoRecordView from '../../../../../../../../common/noresultsview';
import translations from '../../../../../../../../../assets/translations';
import GroupListItem from './grouplistitem';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import ShimmerList from '../../../../../../../../common/shimmer/listshimmer';
import {moderateScale} from '../../../../../../../../utils/responsiveSize';
import {ApiStatusType} from '../../../../../../../../../services/constants';
import {MethodTypes} from '../../../../../../../../../services/constants';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import {useNetInfo} from '@react-native-community/netinfo';

interface Props {
  eventId?: number;
  isFlatListScroolEnable: boolean;
}

const Groups = ({eventId, isFlatListScroolEnable}: Props) => {
  const {
    storeData: {refresh},
  } = useAppStore();
  const netInfo = useNetInfo();
  const [listData, setListData] = useState('');
  const setScreenRefresh = useSetScreenRefresh();
  const [groupId, setGroupId] = useState(0);
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
    }, 500);
  }, [refresh]);
  const refreshScreen = () => {
    if (REFESH_SCREEN.GROUP_LIST === refresh) {
      getGroupList();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };
  const {mutateAsync: removeGroup} = useCgMutation({
    key: REMOVE_GROUP,
    url: REMOVE_GROUP + `${groupId}`,
    method: MethodTypes.GET,
  });
  const {mutateAsync: getGroups, isLoading} = useCgMutation({
    key: GET_GROUP_LIST,
    url: GET_GROUP_LIST + `${eventId}`,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });
  useEffect(() => {
    getGroupList();
  }, []);
  const _onPressFloatingButton = async () => {
    setLoader(true);

    const res = await removeGroup();
    if (res.success || res.status_code === ApiStatusType.Success) {
      getGroupList();
    }
    setIsLoading(false);
  };
  const getGroupList = async () => {
    const res = await getGroups();
    if (res.success) {
      setListData(res.data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.eventHeadingArea}>
        <Text style={styles.headingLabel}>{translations.CREATE_GROUP}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN.ADD_GROUP, {
              id: GROUP.ADD_GROUP,
              eventId: eventId,
            });
          }}>
          <AppImages.Dashboard.addPageant_ICON />
        </TouchableOpacity>
      </View>

      {listData.length > 0 ? (
        <View style={styles.groupList}>
          <FlatList
            data={listData}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={isFlatListScroolEnable}
            renderItem={({item, index}) => (
              <GroupListItem
                text={item?.description}
                heading={item?.name}
                memberCount={item?.group_contestants_count}
                groupId={item?.id}
                eventId={item?.event_id}
                onPressConfirm={() => {
                  setGroupId(item?.id),
                    setTimeout(() => {
                      _onPressFloatingButton();
                    }, 500);
                }}
              />
            )}
          />
        </View>
      ) : !isLoading ? (
        <View style={styles.noRecordView}>
          <NoRecordView text={translations.NO_GROUPS_ADDED} />
        </View>
      ) : isLoading ? (
        <ShimmerList
          width={Dimensions.get('window').width - moderateScale(32)}
          height={moderateScale(136)}
          padding={moderateScale(16)}
          borderRadius={moderateScale(20)}
          numColumns={1}
        />
      ) : null}
    </View>
  );
};

export default Groups;
