import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../common/header';
import AppImages from '../../../../../../assets/images/AppImages';
import {styles} from './styles';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import translations from '../../../../../../assets/translations';
import NoRecord from '../../../../../common/norecord';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {BANK_DETAIL_ARRAY} from '../../addpageant/addpagentrules/loccalArray';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {
  CLAIM_LEAD,
  MY_LEAD_LIST,
  MY_LEAD_LIST_FILTERS,
} from '../../../../../../services/endpoints';
import {MethodTypes, Param} from '../../../../../../services/constants';

import {
  checkIsConnected,
  emptyFunction,
} from '../../../../../utils/helperFunction';
import {
  moderateScaleVertical,
  width,
  moderateScale,
} from '../../../../../utils/responsiveSize';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {color} from '../../../../../../assets/colorConstant';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import {ActivityIndicator} from 'react-native-paper';
import LeadListItem from '../../../../../common/leadlistitem';
import {FilterData} from '../../../../../../services/models/filterData';
import useHtQuery from '../../../../../../services/api/useHtQuery';
import DirectoryFilterModal from '../../../../directory/filtermodal';
import {SCREEN} from '../../../../../../root/screenname';
import UpgradeSlider from '../../../../directory/publicprofile/expertcontestant/components/upgradeslider';
import {PAYMENT_FOR, REFESH_SCREEN} from '../../../../../utils/enum';
import ViewPlanModal from '../components/viewplanmodal';

const LeadDetails = ({route}) => {
  const {pageantId, contact_list_count, pageantPlanDetail} = route.params;
  const [url] = useState('');
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isFiltering] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [body, setBody] = useState(null);
  const navigation = useNavigation();
  const [totalCount, setTotalCount] = useState(contact_list_count);
  const setLoader = useSetLoader();
  const setScreenRefresh = useSetScreenRefresh();
  const [completeFilterQuery, setCompleteFilterQuery] = useState('');
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  const [isAllFillterApplied, setAllFillterApplied] = useState(false);
  const isFocused = useIsFocused();
  //API DIRECTORY FILTTER BY TYPE ----------------------------------------- START
  const {data: filtterList} = useHtQuery<FilterData>({
    key: MY_LEAD_LIST_FILTERS,
    url: MY_LEAD_LIST_FILTERS,
    offSuccessToast: true,
  });
  //API DIRECTORY FILTTER BY TYPE ----------------------------------------- END
  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteHtQuery({
    key: MY_LEAD_LIST + pageantId + completeFilterQuery,
    url: MY_LEAD_LIST + pageantId + completeFilterQuery,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.leadList?.length,
    disableLoader: true,
  });

  const transactionListData =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.leadList?.data !== null &&
          page?.data?.leadList?.data !== undefined
        ) {
          return page?.data?.leadList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  useEffect(() => {
    // reload the screen when url link changes
    if (checkIsConnected()) {
      reload();
    }
  }, [url]);
  useEffect(() => {
    if (!isLoading) {
      setTotalCount(paginatedData?.pages[0]?.data?.total_count);
    }
  }, [paginatedData?.pages[0]?.data?.total_count]);
  const {mutateAsync: claimRequestAPI} = useCgMutation({
    key: CLAIM_LEAD,
    url: CLAIM_LEAD,
    method: MethodTypes.Post,
    disableLoader: true,
    body: body,
    offErrorToast: true,
  });

  useEffect(() => {
    setBody({
      id: selectedArray.toString(),
      profile_type: translations.PAGEANT,
      profile_id: pageantId,
    });
  }, [selectedArray]);

  useEffect(() => {
    if (completeFilterQuery !== undefined) {
      if (checkIsConnected()) {
        reload();
      }
    }
  }, [completeFilterQuery]);

  const claimRequest = async () => {
    setLoader(true);
    const response = await claimRequestAPI();
    if (response.success) {
      reload();
      setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
      setLoader(false);
      navigation.navigate(SCREEN.CONTACT_LIST, {pageantId: pageantId});
    } else {
      setLoader(false);
    }
  };
  const onEndReached = async () => {
    if (transactionListData?.length > 9) {
      fetchNextPage();
    }
  };
  const leadClaimPay = async () => {
    navigation.navigate(SCREEN.BUY_VOTES, {
      votesInfo: {
        paymentType: PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD,
        totalVotes: selectedArray?.length,
        profileId: pageantId,
        totalCost:
          paginatedData?.pages[0]?.data?.discount_price_per_lead !== undefined
            ? paginatedData?.pages[0]?.data?.discount_price_per_lead *
              selectedArray?.length
            : paginatedData?.pages[0]?.data?.price_per_lead *
              selectedArray?.length,
        claimIds: selectedArray.join(','),
        perVotePrice: paginatedData?.pages[0]?.data?.price_per_lead,
        halfPrice:
          paginatedData?.pages[0]?.data?.discount_price_per_lead !==
          paginatedData?.pages[0]?.data?.price_per_lead
            ? paginatedData?.pages[0]?.data?.discount_price_per_lead
            : undefined,
        currencySign: '$',
        have_billing_address:
          paginatedData?.pages[0]?.data?.address > 0 ? 1 : 0,
      },
    });
  };

  const reload = async () => {
    await refetch();

    setSelectedArray([]);
  };

  const createFilterQuery = () => {
    var finalFilterquery = '';
    filtterList?.data?.forEach(element => {
      if (element?.query?.length > 0) {
        element?.query?.forEach(elementQuery => {
          if (elementQuery?.length > 0) {
            finalFilterquery = finalFilterquery + elementQuery;
          }
        });
      }
    });
    setCompleteFilterQuery(finalFilterquery);
    if (finalFilterquery.length > 0) {
      setAllFillterApplied(true);
    } else {
      setAllFillterApplied(false);
    }
  };
  const onClearFilterApply = () => {
    setCompleteFilterQuery('');
    setAllFillterApplied(false);
    filtterList?.data?.forEach(element => {
      element.query = [];
      element.tempQuery = [];
      element.selectedIndex = -1;
    });
  };
  const listFooterComponent = () => {
    return (
      <View style={styles.loader}>
        {isFetchingNextPage && (
          <ActivityIndicator size="small" color={color.P_PINK} />
        )}
      </View>
    );
  };
  const onClaimPayClick = () => {
    paginatedData?.pages[0]?.data?.totalPendingLeads === 0
      ? leadClaimPay()
      : claimRequest();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={translations.CONTESTANTS + ` (${totalCount})`}
        isUnderLineRequired
        infoDataArray={BANK_DETAIL_ARRAY}
      />

      <View style={styles.rectangle}>
        <View style={styles.row}>
          <AppImages.Common.CreditsUsed />
          <View style={styles.column}>
            <Text style={styles.credits}>{translations.CREDITS_USED}</Text>
            <Text style={styles.creditCount}>
              {paginatedData?.pages[0]?.data?.totalClaimedLeads}
            </Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.row}>
          <AppImages.Common.Credits />
          <View style={styles.column}>
            <Text style={styles.credits}>{translations.CREDITS_}</Text>
            <Text style={styles.creditCount}>
              {paginatedData?.pages[0]?.data?.totalPendingLeads}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        {paginatedData?.pages[0]?.data?.totalPendingLeads === 0 &&
        paginatedData?.pages[0]?.data?.check_profile_active_membership &&
        paginatedData?.pages[0]?.data?.check_profile_active_membership
          ?.membership_name !== 'Diamond Package' ? (
          <UpgradeSlider
            pageantId={pageantId}
            claimedLeads={paginatedData?.pages[0]?.data?.totalClaimedLeads}
            pendingLeads={paginatedData?.pages[0]?.data?.totalPendingLeads}
            pageantPlanDetail={pageantPlanDetail}
          />
        ) : paginatedData?.pages[0]?.data?.totalPendingLeads === 0 &&
          paginatedData?.pages[0]?.data?.check_profile_active_membership &&
          paginatedData?.pages[0]?.data?.check_profile_active_membership
            ?.membership_name === 'Diamond Package' ? (
          <TouchableOpacity
            style={styles.sliderContainer}
            onPress={() =>
              navigation.navigate(SCREEN.PURCHASE_PLAN, {
                pageantId: pageantId,
                claimedLeads: paginatedData?.pages[0]?.data?.totalClaimedLeads,
                pendingLeads: paginatedData?.pages[0]?.data?.totalPendingLeads,
              })
            }>
            <AppImages.Common.UpgradeNow width={width - moderateScale(49)} />
          </TouchableOpacity>
        ) : paginatedData?.pages[0]?.data?.check_profile_active_membership
            ?.membership_name !== 'Diamond Package' ? (
          <TouchableOpacity
            style={styles.sliderContainer}
            onPress={() => setIsPreviewModalVisible(true)}>
            <AppImages.Common.Upgrade1 />
          </TouchableOpacity>
        ) : (
          <View style={styles.sliderContainer} />
        )}

        <View style={styles.todosRow}>
          <Text style={styles.title}>
            {translations.INTERESTED_CONTESTANTS}
          </Text>
          {contact_list_count > 0 && (
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => setDirectoryFilterModalVisible(true)}>
              {isAllFillterApplied && (
                <View style={styles.filterAppliedCircleContainer} />
              )}
              <AppImages.Common.filter />
            </TouchableOpacity>
          )}
        </View>
        {transactionListData.length > 0 && (
          <Text style={styles.claimText1}>
            {translations.NOTE}
            <Text style={styles.claimText}>{translations.NOTE_EXPIRE}</Text>
          </Text>
        )}
        {(transactionListData.length > 0 && !isLoading && !isFiltering) ||
        (transactionListData.length > 0 &&
          isFetchingNextPage &&
          isRefetching) ||
        (transactionListData.length > 0 && isFiltering && !isRefetching) ? (
          <FlatList
            data={transactionListData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            style={styles.bagList}
            onEndReached={onEndReached}
            ListFooterComponent={listFooterComponent}
            renderItem={item => {
              return (
                <LeadListItem
                  item={item?.item}
                  selectedCallback={emptyFunction}
                  setError={emptyFunction}
                  onPressDelete={emptyFunction}
                  setSelectedArray={setSelectedArray}
                  selectedArray={selectedArray}
                  pageantId={pageantId}
                  availableCredits={
                    paginatedData?.pages[0]?.data?.totalPendingLeads
                  }
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
              rightIcon={<AppImages.Common.noContestantIllustration />}
              text={translations.NO_CONTESTANTS_FOUND}
            />
          </View>
        )}
      </ScrollView>
      {selectedArray.length > 0 && (
        <View style={styles.shadowView}>
          <View style={styles.paymentView}>
            <View>
              <Text style={styles.totalAmountText}>
                {selectedArray?.length + ' ' + translations.PROFILE_SELECTED}
              </Text>

              <View style={styles.payNowSection}>
                <Text style={styles.amountText}>
                  {paginatedData?.pages[0]?.data?.totalPendingLeads === 0
                    ? `$${
                        paginatedData?.pages[0]?.data?.price_per_lead *
                        selectedArray?.length
                      }`
                    : selectedArray?.length + ' ' + translations.CREDITS_USED}
                </Text>
                <Text style={styles.totalAmountLabel}>
                  {paginatedData?.pages[0]?.data?.totalPendingLeads === 0
                    ? translations.TOTAL_AMOUNT
                    : null}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.btnView} onPress={onClaimPayClick}>
              <Text style={styles.payNowBtnText}>
                {paginatedData?.pages[0]?.data?.totalPendingLeads === 0
                  ? translations.PAY_NOW.toUpperCase()
                  : translations.CLAIM_NOW.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {filtterList?.data !== undefined && filtterList?.data?.length > 0 && (
        <View>
          <DirectoryFilterModal
            isModalVisible={isDirectoryFilterModalVisible}
            setIsModalVisible={setDirectoryFilterModalVisible}
            filter={filtterList?.data}
            onFilterApply={createFilterQuery}
            onClearFilterApply={onClearFilterApply}
            isAllFillterApplied={isAllFillterApplied}
          />
        </View>
      )}
      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={pageantPlanDetail}
        pageantId={pageantId}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </SafeAreaView>
  );
};

export default LeadDetails;
