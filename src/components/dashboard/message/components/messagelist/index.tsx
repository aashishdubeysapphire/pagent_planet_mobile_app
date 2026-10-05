import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {styles} from './styles';
import {color} from '../../../../../assets/colorConstant';
import {SCREEN} from '../../../../../root/screenname';
import AppImages from '../../../../../assets/images/AppImages';
import ComposeButton from '../composebutton';
import translations from '../../../../../assets/translations';
import WarningModel from '../../../../common/warningmodel';
import {checkIsConnected} from '../../../../utils/helperFunction';
import MessageView from '../messageview';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {MethodTypes} from '../../../../../services/constants';
import {DELETE_THREAD} from '../../../../../services/endpoints';
import {MessageContent} from '../../../../../services/models/messagesData';

interface Props {
  dataList: MessageContent[];
  isDeleteClicked: boolean;
  refetchGetAPI: Function;
  setNoOfItemSelected: Function;
  fetchNextPage: Function;
  isFetchingNextPage: boolean;
  setDeleteClicked: Function;
  setLoader: Function;
  isSearchActive: boolean;
  param: string;
}

const MessageList = ({
  dataList,
  isDeleteClicked,
  refetchGetAPI,
  setNoOfItemSelected,
  fetchNextPage,
  isFetchingNextPage,
  setDeleteClicked,
  setLoader,
  isSearchActive,
  param,
}: Props) => {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isExtended, setIsExtended] = useState(true);
  const [showComposeIcon, setShowComposeIcon] = useState(true);
  const [offset, onOffSet] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const flatlistRef = useRef();

  const deleteBody = {
    message_id: selectedItems?.toString(),
  };

  const {mutateAsync: msgDeleteRequest} = useCgMutation<Base>({
    key: DELETE_THREAD,
    url: DELETE_THREAD,
    method: MethodTypes.Post,
    body: deleteBody,
    disableLoader: true,
  });

  useEffect(() => {
    if (!isDeleteClicked) {
      setSelectedItems([]);
      setNoOfItemSelected(0);
    }
  }, [isDeleteClicked]);

  const onRefreshList = useCallback(() => {
    setRefreshing(true);
    refetchGetAPI().then(() => {
      setRefreshing(false);
    });
  }, []);

  const onItemClicked = (id: number, item) => {
    if (isDeleteClicked) {
      if (!selectedItems.includes(id)) {
        setSelectedItems([...selectedItems, id]);
        setNoOfItemSelected(selectedItems.length + 1);
      } else {
        const filterArr = selectedItems.filter(i => {
          return selectedItems.indexOf(i) !== selectedItems.indexOf(id);
        });
        setSelectedItems(filterArr);
        setNoOfItemSelected(filterArr.length);
      }
    } else {
      if (checkIsConnected()) {
        navigation.navigate(SCREEN.CHAT_SCREEN, id);
      }
    }
  };

  const onScroll = ({nativeEvent}) => {
    if (
      nativeEvent.contentOffset.y > offset &&
      nativeEvent.contentOffset.y - offset > 50 &&
      isExtended
    ) {
      setIsExtended(false);
      setShowComposeIcon(false);
    } else if (
      nativeEvent.contentOffset.y < offset &&
      offset - nativeEvent.contentOffset.y > 50 &&
      !isExtended
    ) {
      setIsExtended(true);
      setTimeout(() => {
        setShowComposeIcon(true);
      }, 200);
    }
    onOffSet(nativeEvent.contentOffset.y);
  };

  const onEndReached = async () => {
    fetchNextPage();
  };

  const listFooterComponent = () => {
    return (
      <View style={styles.footerView}>
        {isFetchingNextPage ? (
          <ActivityIndicator size={'small'} color={color.P_PINK} />
        ) : null}
      </View>
    );
  };

  const onDeleteButtonClicked = () => {
    setShowModal(true);
  };

  const onConfirmDelete = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      setTimeout(async () => {
        const response = await msgDeleteRequest();
        if (response.success) {
          setSelectedItems([]);
          setNoOfItemSelected(0);
          setDeleteClicked(false);
          await refetchGetAPI();
          flatlistRef?.current?.scrollToOffset(0, 0, true);
        }
      }, 600);
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatlistRef}
        data={dataList}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={1} // Increase time between renders
        windowSize={70} // Reduce the window size
        horizontal={false}
        ListFooterComponent={listFooterComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshList} />
        }
        onScroll={onScroll}
        onEndReached={onEndReached}
        renderItem={({item, index}) => (
          <MessageView
            item={item}
            isDeleteClicked={isDeleteClicked}
            selectedItems={selectedItems}
            onItemClicked={onItemClicked}
            param={param}
          />
        )}
      />
      {/* <View style={styles.separator} /> */}
      {isDeleteClicked ? (
        <TouchableOpacity
          style={styles.deleteIconStyle}
          onPress={() => onDeleteButtonClicked()}>
          <Image
            source={AppImages.MESSAGES.RemoveIcon}
            style={styles.deleteImgStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : isSearchActive ? null : (
        <ComposeButton
          isExtended={isExtended}
          showComposeIcon={showComposeIcon}
        />
      )}
      <WarningModel
        isModalVisible={showModal}
        setIsModalVisible={setShowModal}
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_MESSAGES}
        setConfirm={onConfirmDelete}
        headingStyle={styles.modalHeading}
      />
    </View>
  );
};

export default MessageList;
