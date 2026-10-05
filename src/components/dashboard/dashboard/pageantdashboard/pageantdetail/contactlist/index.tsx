import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../common/header';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {RecruitContestantBanner} from '../components/recruitcontestants';
import DetailsView from '../../../../shop/shoppingbag/components/address/components/detailsview';
import {SCREEN} from '../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import {Filter} from '../../../../../../services/models/filterData';
import DirectoryFilterModal, {
  FILTER_TYPE,
} from '../../../../directory/filtermodal';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {MY_CONTACT_LIST} from '../../../../../../services/endpoints';
import {Param, ProfileType} from '../../../../../../services/constants';
import {
  formatPhoneNumber,
  openWebLink,
} from '../../../../../utils/helperFunction';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {LEAD_SECTION_GET_STARTED} from '../../../../../../services/staticPageEndpoints';
import {ActivityIndicator} from 'react-native-paper';
import {color} from '../../../../../../assets/colorConstant';

const ContactList = ({route}) => {
  const {pageantId, my_leads_count} = route?.params;
  const navigation = useNavigation();
  const [filters] = useState<Filter[]>([]);
  const [completeFilterQuery, setCompleteFilterQuery] = useState('');
  const [isDirectoryFilterModalVisible, setDirectoryFilterModalVisible] =
    useState(false);
  useEffect(() => {
    filters.push({
      title: 'Date',
      searchTitle: 'Claim Date',
      slug: ['start_date', 'end_date'],
      type: FILTER_TYPE.DATE_FROM_TO,
      currentMaxToDateActive: true,
      options: [],
    });
  }, []);
  const {
    data: paginatedData,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteHtQuery({
    key:
      MY_CONTACT_LIST +
      Param.PROFILE_TYPE +
      ProfileType.PAGEANT +
      Param.PROFILE_ID +
      pageantId +
      completeFilterQuery,
    url:
      MY_CONTACT_LIST +
      Param.PROFILE_TYPE +
      ProfileType.PAGEANT +
      Param.PROFILE_ID +
      pageantId +
      completeFilterQuery,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.list?.data?.length,
    disableLoader: true,
  });
  const constestantList =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.leadList?.data != null &&
          page?.data?.leadList?.data != undefined
        ) {
          return page?.data?.leadList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  /**
   * A function that is called when the user clicks on the clear filter button. It resets the filter
   * query and the query.
   */
  const onClearFilterApply = () => {
    setCompleteFilterQuery('');
    filters.forEach(element => {
      element.query = [];
      element.tempQuery = [];
      element.selectedIndex = -1;
    });
  };

  /* *|CURSOR_MARCADOR|* */
  const createFilterQuery = () => {
    if (filters[0].query?.length!! < 2) {
      return;
    }
    let filterQuery = '';
    filterQuery =
      filterQuery +
      filters[0]?.query!![1].replace('&start_date', '?start_date');
    filterQuery = filterQuery + filters[0]?.query!![0];

    setCompleteFilterQuery(filterQuery);
  };

  const _renderItem = ({item}) => {
    return (
      <View style={styles.continer}>
        <View style={styles.rowView}>
          <Text style={styles.name}>{item?.leads?.from_name}</Text>
          <Text
            style={styles.viewDetails}
            onPress={() => {
              navigation.navigate(SCREEN.CONTESTANT_DETAILS, {
                id: item?.leads?.id,
                pageantId: pageantId,
              });
            }}>
            {translations.MORE_DETAILS}
          </Text>
        </View>

        <DetailsView
          image={<AppImages.SHOPING_BAG.AtTheRate />}
          body={item?.leads?.from_email}
          noOfLines={1}
        />
        <DetailsView
          image={<AppImages.SHOPING_BAG.MobileNo />}
          body={formatPhoneNumber(item?.leads?.phone + ' ')}
          noOfLines={1}
        />
        <DetailsView
          image={<AppImages.SHOPING_BAG.Address />}
          body={
            !!item?.leads?.state?.name &&
            item?.leads?.state?.name + ',' + !!item?.leads?.country?.name &&
            item?.leads?.country?.name
          }
          noOfLines={2}
        />
      </View>
    );
  };
  const listEmptyComponent = () => {
    return (
      <View style={styles.topEmpty}>
        <AppImages.PAGEANT_DETAIL.noContestantsFound />
      </View>
    );
  };
  const listFoterComp = () => {
    return (
      <View style={styles.height}>
        {isFetchingNextPage ? (
          <ActivityIndicator size={'small'} color={color.P_PINK} />
        ) : null}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainView}>
      <Header lable={translations.CONTACT_LIST} isUnderLineRequired />
      <View style={styles.topHeight} />
      <ScrollView>
        <RecruitContestantBanner
          text={translations.NEED_HELP_FOR_CONVERTAION}
          btnText={translations.GET_STARTED}
          img={<AppImages.PAGEANT_DETAIL.contestantListbanner />}
          onBtnPress={() => {
            openWebLink(LEAD_SECTION_GET_STARTED);
          }}
        />

        <View style={styles.subView}>
          <View style={styles.rowView}>
            <Text style={styles.heading}>{translations.CONESTANT_LIST}</Text>
            {my_leads_count != 0 && (
              <TouchableOpacity
                onPress={() => {
                  setDirectoryFilterModalVisible(true);
                }}
                style={styles.filterStyles}>
                {completeFilterQuery.length > 0 && (
                  <View style={styles.filterAppliedCircleContainer} />
                )}
                <AppImages.Common.filter />
              </TouchableOpacity>
            )}
          </View>
          {/* ListItem */}
          {isLoading ? (
            <View style={styles.negativeSubView}>
              <ShimmerList
                width={Dimensions.get('window').width - moderateScale(32)}
                height={moderateScaleVertical(130)}
                padding={16}
                numColumns={1}
              />
            </View>
          ) : (
            <FlatList
              data={constestantList}
              showsVerticalScrollIndicator={false}
              renderItem={_renderItem}
              ListFooterComponent={listFoterComp}
              ListEmptyComponent={listEmptyComponent}
              onEndReached={fetchNextPage}
            />
          )}
        </View>
      </ScrollView>

      {filters !== undefined && filters?.length > 0 && (
        <View>
          <DirectoryFilterModal
            isModalVisible={isDirectoryFilterModalVisible}
            setIsModalVisible={setDirectoryFilterModalVisible}
            filter={filters}
            sortByValue={''}
            selectedCetegoryIndix={0}
            onFilterApply={createFilterQuery}
            onClearFilterApply={onClearFilterApply}
            isAllFillterApplied={completeFilterQuery.length > 0}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ContactList;
