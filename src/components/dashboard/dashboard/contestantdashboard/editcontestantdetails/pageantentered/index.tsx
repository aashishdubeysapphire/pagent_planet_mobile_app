import React, { useState, useEffect } from 'react';
import { FlatList, Dimensions, View } from 'react-native';
import GalleryGridItem from '../../../../../common/gallerygriditem';
import { styles } from './styles';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  GET_EVENT_LIST,
  DELETE_EVENT,
} from '../../../../../../services/endpoints';
import translations from '../../../../../../assets/translations';
import { REFESH_SCREEN } from '../../../../../utils/enum';
import PageantModal from '../pageantmodal';
import WarningModel from '../../../../../common/warningmodel';
import images from '../../../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import { EventData } from '../../../../../../services/models/eventdata';
import { useSetScreenRefresh } from '../../../../../../store/useAppStore';
import NoRecord from '../../../../../common/norecord';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../../../services/constants';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import { moderateScaleVertical } from '../../../../../utils/responsiveSize';
import Loader from '../../../../../common/customloader';

const PageantEntered = () => {
  const [label, setLabel] = useState('');
  const [pageantImage, setPageantImage] = useState('');
  const [awardList, setAwardList] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pageantTitle, setPageantTitle] = useState('');
  const [pageantId, setPageantId] = useState('');
  const [agedivisionId, setAgedivisionId] = useState('');
  const [contestantId, setContestantId] = useState('');
  const [gotTitle, setGotTitle] = useState('');
  const [mySpecialLoader, setMySpecialLoader] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();
  const [itemSize, setItemSize] = useState(Number);
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
  } = useInfiniteHtQuery<EventData>({
    key: GET_EVENT_LIST,
    url: GET_EVENT_LIST,
    page: Param.PAGE,
    getDataArray: page => page.data?.events.data.length,
    reverse: true,
  });
  const eventListData =
    paginatedData?.pages
      ?.map((page: EventData) => {
        if (
          page.data?.events?.data !== null &&
          page.data?.events?.data !== undefined
        ) {
          return page.data?.events.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const { mutateAsync: deleteEvent } = useCgMutation({
    key:
      DELETE_EVENT +
      `${pageantId}` +
      Param.AGE_DIVISION_ID +
      `${agedivisionId}`,
    method: MethodTypes.GET,
    url:
      DELETE_EVENT +
      `${pageantId}` +
      Param.AGE_DIVISION_ID +
      `${agedivisionId}`,
    offSuccessToast: true,
    // disableLoader: true,
  });

  useEffect(() => {
    setTimeout(() => {
      pageantRefesh();
    }, 400);
    setItemSize(Dimensions.get('window').width - moderateScaleVertical(32));
  }, []);
  const pageantRefesh = async () => {
    await refetch();
  };
  const onDelete = () => {
    setModalVisible(false);
    setTimeout(() => {
      setDeleteModal(true);
    }, 400);
  };
  const onItemClick = item => {
    setModalVisible(true);
    setLabel(item.item.pageant.title);
    setPageantImage(item.item.pageant.main_image);
    setAwardList(item.item.pageant.pageant_awards);
    setPageantTitle(item.item.contestant_title);
    setAgedivisionId(item.item.age_division_id);
    setPageantId(item.item.pageant_id);
    setContestantId(item.item.id);
    setGotTitle(item.item.got_title);
  };
  const deleteEventAPI = async () => {
    setTimeout(() => {
      setMySpecialLoader(true);
    }, 400);
    const res = await deleteEvent();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setTimeout(() => {
        setScreenRefresh(REFESH_SCREEN.CONTESTANT_DASHBOARD);
      }, 1000);
      await refetch();
      setMySpecialLoader(false);
    }
  };

  const onEndReached = async () => {
    fetchNextPage();
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={mySpecialLoader} />
      <PageantModal
        label={label}
        icon={pageantImage}
        isModalVisible={modalVisible}
        awardList={awardList}
        pageantTitle={pageantTitle}
        contestantId={contestantId}
        gotTitle={gotTitle}
        closeModal={setModalVisible}
        onPressDelete={onDelete}
      />

      {!isLoading ? (
        <>
          {eventListData.length > 0 ? (
            <>
              <FlatList
                data={eventListData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                onEndReached={onEndReached}
                renderItem={item => (
                  <GalleryGridItem
                    imageUrl={item.item.pageant.main_image}
                    label={item.item.pageant.title}
                    onItemClickListener={() => onItemClick(item)}
                    isList={true}
                    maxLines={2}
                    editIcon={false}
                  />
                )}
              />
            </>
          ) : (
            <View style={{ flex: 1, marginTop: moderateScaleVertical(120) }}>
              <NoRecord rightIcon={<images.Common.NO_PAGEANT_FOUND_ICON />} />
            </View>
          )}
        </>
      ) : (
        <ShimmerList
          width={itemSize}
          height={moderateScaleVertical(100)}
          padding={15}
          borderRadius={16}
        />
      )}

      <WarningModel
        msg={translations.SURE_YOU_WANT_TO_REMOVE_PAGENT}
        isModalVisible={deleteModal}
        setConfirm={() => {
          deleteEventAPI();
        }}
        setIsModalVisible={setDeleteModal}
        headingStyle={styles.modalHeading}
      />
    </View>
  );
};

export default PageantEntered;
