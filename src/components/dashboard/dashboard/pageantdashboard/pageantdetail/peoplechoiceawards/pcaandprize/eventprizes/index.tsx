/* A function component , shows the event Prize List of PCA.
It provides the feature of deleting , editing options to delete/edit the created prize  */

import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import {
  DELETE_PRIZE_FROM_PCA,
  GET_PRIZES_LIST,
} from '../../../../../../../../services/endpoints';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import useHtQuery from '../../../../../../../../services/api/useHtQuery';
import AppImages from '../../../../../../../../assets/images/AppImages';
import NoRecordView from '../../../../../../../common/noresultsview';
import PageantListView from '../../../../../../../common/pageantlistview';
import {Base} from '../../../../../../../../services/models/base';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../../../../../services/constants';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../store/useAppStore';
import {internetState} from '../../../../../../../common/commonalert';
import WarningModel from '../../../../../../../common/warningmodel';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SCREEN} from '../../../../../../../../root/screenname';
import {PRIZE} from '../../../../../../../utils/enum';
import {REFESH_SCREEN} from '../../../../../../../utils/enum';
import {PrizeList} from '../../../../../../../../services/models/event/getEventPrizeList';

interface Props {
  eventId?: number;
}

const EventPrizes = ({eventId}: Props) => {
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);
  const navigation = useNavigation();
  const [prizeId, setPrizeId] = useState(Number);
  const setLoader = useSetLoader();
  const [isDelete, setDeleteVisible] = useState(false);
  const {
    storeData: {refresh},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();

  //API GET EVENT PRIZES LIST----------------------------------------- START

  const {data, isLoading, refetch} = useHtQuery<PrizeList>({
    key: GET_PRIZES_LIST + Param.EVENT_ID + eventId,
    url: GET_PRIZES_LIST + Param.EVENT_ID + eventId,
    offSuccessToast: true,
  });
  //API GET EVENT PRIZES LIST----------------------------------------- END

  //API DELETE WINNER FROM PCA----------------------------------------- START

  const deleteBody = {
    prize_id: prizeId,
  };

  const {mutateAsync: deletePrize} = useCgMutation<Base>({
    key: DELETE_PRIZE_FROM_PCA,
    method: MethodTypes.Post,
    url: DELETE_PRIZE_FROM_PCA,
    offSuccessToast: true,
    disableLoader: true,
    body: deleteBody,
  });
  //API DELETE WINNER FROM PCA----------------------------------------- START

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(16));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      refreshScreen();
    }, 500);
  }, [refresh]);

  const refreshScreen = () => {
    if (REFESH_SCREEN.EVENT_PRIZE_LIST === refresh) {
      refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  const deleteWinnerPrize = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      deletePrize().then(res => {
        if (res.success || res.status_code === ApiStatusType.Success) {
          refetch();
        }
        setLoader(false);
      });
    }
  };

  return (
    <View style={styles.subContainer}>
      <View style={styles.activeArea}>
        <Text style={styles.eventLabel}>{translations.PRIZES}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN.CREATE_A_PRIZE, {
              id: PRIZE.ADD_PRIZE,
              event_id: eventId,
            });
          }}>
          <AppImages.Dashboard.addPageant_ICON />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {data?.data?.prizeList !== undefined &&
        data?.data?.prizeList?.length > 0 ? (
          <FlatList
            data={data?.data?.prizeList}
            nestedScrollEnabled={true}
            key={'@'}
            scrollEnabled={true}
            ListFooterComponent={listFooterComponent}
            renderItem={({item, index}) => (
              <PageantListView
                screenName={translations.PRIZES}
                type={1}
                imageUrl={item?.prizeImageSrc}
                label={item?.message}
                numberOfLinesForTitle={4}
                smallBannerImage={true}
                edit={true}
                deleteIcon={true}
                stylesForTitle={styles.title}
                onPressDeleteIcon={() => {
                  setPrizeId(item?.id);
                  setDeleteVisible(true);
                }}
                onPressEditIcon={() => {
                  navigation.navigate(SCREEN.CREATE_A_PRIZE, {
                    id: PRIZE.EDIT_PRIZE,
                    event_id: eventId,
                    image: item?.prizeImageSrc,
                    description: item?.message,
                    prizeId: item?.id,
                    imageName: item?.upload_image,
                  });
                }}
              />
            )}
          />
        ) : isLoading ? (
          <ShimmerList
            width={2 * itemSize}
            height={itemSize - 40}
            padding={16}
            numColumns={1}
          />
        ) : (
          data?.data?.prizeList?.length === 0 && (
            <View style={styles.noRecordView}>
              <NoRecordView text={translations.NO_PRIZES_ADDED} />
            </View>
          )
        )}
      </View>
      <WarningModel
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_PRIZE}
        isModalVisible={isDelete}
        setConfirm={deleteWinnerPrize}
        setIsModalVisible={setDeleteVisible}
        headingStyle={styles.modalHeading}
      />
    </View>
  );
};

export default EventPrizes;
