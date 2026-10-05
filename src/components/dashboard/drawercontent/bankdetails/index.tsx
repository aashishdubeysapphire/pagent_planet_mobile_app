import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../common/header';
import {SCREEN} from '../../../../root/screenname';
import AppImages from '../../../../assets/images/AppImages';
import {styles} from './styles';
import {Dimensions, Text, TouchableOpacity, View, Modal} from 'react-native';
import translations from '../../../../assets/translations';
import NoRecord from '../../../common/norecord';
import {FlatList} from 'react-native-gesture-handler';
import ShimmerList from '../../../common/shimmer/listshimmer';

import {BANK_DETAIL_ARRAY} from '../../dashboard/pageantdashboard/addpageant/addpagentrules/loccalArray';
import useInfiniteHtQuery from '../../../../services/api/useHtInfiniteQuery';
import {
  GET_BANK_DETAILS,
  TRANSFER_REQUEST,
} from '../../../../services/endpoints';
import {MethodTypes, Param} from '../../../../services/constants';
import {
  checkIsConnected,
  emptyFunction,
  trackScreenView,
} from '../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import TransactionListItem from '../../../common/transactionlistitem';
import {useNavigation} from '@react-navigation/core';
import {color} from '../../../../assets/colorConstant';
import useCgMutation from '../../../../services/api/useCgMutation';
import {useSetLoader} from '../../../../store/useAppStore';
import {ActivityIndicator} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';

const BankDetails = () => {
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState(translations.ALL);
  const [isFiltering, setIsFiltering] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const navigation = useNavigation();
  const setLoader = useSetLoader();
  const menuData = [
    {
      title: translations.ALL,
      id: 1,
    },
    {
      title: translations.PENDING,
      id: 2,
    },
    {
      title: translations.PAID,
      id: 3,
    },
    {
      title: translations.TRANSFER_INITIATED,
      id: 3,
    },
  ];
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteHtQuery({
    key: GET_BANK_DETAILS,
    url: GET_BANK_DETAILS + url,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.transactions?.length,
    disableLoader: true,
  });
  const GET_PENDING_TRANSACTIONS = 'Pending';
  const GET_PAID_TRANSACTIONS = 'Paid';
  const GET_TRANSFER_TRANSACTIONS = 'Transfer';
  const transactionListData =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.transactions?.data !== null &&
          page?.data?.transactions?.data !== undefined
        ) {
          return page?.data?.transactions?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  const {mutateAsync: transferRequestAPI} = useCgMutation({
    key: TRANSFER_REQUEST,
    url: TRANSFER_REQUEST,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {transaction_id: selectedArray.toString()},
    offSuccessToast: false,
    offErrorToast: true,
  });

  const transferRequest = async () => {
    setLoader(true);

    const response = await transferRequestAPI();
    if (response.success) {
      reload();
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  const handleMenuOnPress = (title: string) => {
    setLabel(title);
    setIsFiltering(true);
    setModalVisible(false);
    if (title === translations.PENDING) {
      setUrl(GET_PENDING_TRANSACTIONS);
    } else if (title === translations.PAID) {
      setUrl(GET_PAID_TRANSACTIONS);
    } else if (title === translations.TRANSFER_INITIATED) {
      trackScreenView(ANALYTICS_SCREEN.TRANSFER_INITIATED);
      setUrl(GET_TRANSFER_TRANSACTIONS);
    } else {
      setUrl('');
    }
  };
  const listFooterComponent = () => {
    return (
      <View style={[styles.loader]}>
        {isFetchingNextPage && (
          <ActivityIndicator size="small" color={color.P_PINK} />
        )}
      </View>
    );
  };
  useEffect(() => {
    if (checkIsConnected()) {
      reload();
    }
  }, [url]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.BANK_DETAILS);
  }, []);

  const reload = async () => {
    await refetch();
    setSelectedArray([]);
  };
  const onEndReached = async () => {
    if (transactionListData?.length > 9) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={SCREEN.BANK_DETAILS}
        infoIcon={true}
        isUnderLineRequired
        infoDataArray={BANK_DETAIL_ARRAY}
      />
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.outerview}>
          <TouchableOpacity activeOpacity={1} style={styles.innerview}>
            <FlatList
              data={menuData}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={item => (
                <TouchableOpacity
                  style={styles.cardTouch}
                  onPress={() => {
                    handleMenuOnPress(item?.item?.title);
                  }}>
                  <View style={[styles.cardRow]}>
                    <Text
                      style={
                        label === item?.item?.title
                          ? styles.staticSelectedCardLable
                          : styles.staticCardLable
                      }>
                      {item?.item?.title}
                    </Text>
                    {label === item?.item?.title ? (
                      <View style={[{width: moderateScale(20)}]}>
                        <AppImages.Dashboard.tick_ICON />
                      </View>
                    ) : (
                      <View style={[{width: moderateScale(20)}]}></View>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <LinearGradient
        colors={[
          'rgba(211, 156, 110, 0.1)',
          'rgba(212, 150, 111, 0.08)',
          'rgba(230, 66, 122, 0.23)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.linearGradientStyles}
        locations={[0.2, 0.5, 1]}>
        <View style={styles.detailRow}>
          <Text style={styles.heading}>{translations.ACCOUNT_DETAILS}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREEN.ADD_EDIT_BANK_DETAILS, {
                isEdit: true,
                refetch: refetch,
              })
            }>
            <AppImages.Common.editCircle_ICON />
          </TouchableOpacity>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.subheading}>{translations.ACCOUNT_NUMBER}</Text>
          <Text style={styles.subheading1}>
            {paginatedData?.pages[0]?.data?.bankDetails?.accountNumber}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.subheading}>{translations.ACCOUNT_NAME}</Text>
          <Text style={styles.subheading1} numberOfLines={1}>
            {paginatedData?.pages[0]?.data?.bankDetails?.accountName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.subheading}>{translations.COUNTRY}</Text>
          <Text style={styles.subheading1}>
            {paginatedData?.pages[0]?.data?.bankDetails?.country}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.todosRow}>
        <Text style={styles.title}>{translations.MY_TRANSACTIONS}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AppImages.Common.filter />
        </TouchableOpacity>
      </View>

      {(transactionListData.length > 0 && !isLoading && !isFiltering) ||
      (transactionListData.length > 0 && isFetchingNextPage && isRefetching) ||
      (transactionListData.length > 0 && isFiltering && !isRefetching) ? (
        <FlatList
          data={transactionListData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          style={styles.bagList}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={1} // Increase time between renders
          windowSize={70} // Reduce the window size
          onEndReached={onEndReached}
          ListFooterComponent={listFooterComponent}
          renderItem={item => {
            return (
              <TransactionListItem
                item={item?.item}
                selectedCallback={emptyFunction}
                setError={emptyFunction}
                onPressDelete={emptyFunction}
                setSelectedArray={setSelectedArray}
                selectedArray={selectedArray}
              />
            );
          }}
        />
      ) : isLoading || (isRefetching && isFiltering) ? (
        <>
          <ShimmerList
            width={Dimensions.get('window').width - moderateScaleVertical(32)}
            height={moderateScaleVertical(150)}
            padding={15}
            borderRadius={10}
          />
        </>
      ) : (
        <View style={styles.noRecordContainer}>
          <NoRecord
            rightIcon={<AppImages.Common.noTransactionIllustration />}
            text={'No transactions Found!'}
          />
        </View>
      )}
      {selectedArray.length > 0 && (
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.containerDelete}
            onPress={() => setSelectedArray([])}>
            <Text style={{...styles.borderButtonText, color: color.BLACK}}>
              {translations.CANCLE}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={() => transferRequest()}>
            <Text style={styles.borderButtonText}>{translations.TRANSFER}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BankDetails;
