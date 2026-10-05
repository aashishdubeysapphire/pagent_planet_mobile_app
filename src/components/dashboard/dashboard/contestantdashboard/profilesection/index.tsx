import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import translations from '../../../../../assets/translations';
import BasicDetails from './basicdetails';
import {styles} from './styles';
import TabContent from './tabcontent';
import TabViewScreen from './tabview';
import {
  GET_CONTESTANT_AWARDS,
  GET_CONTESTANT_DETAILS,
} from '../../../../../services/endpoints';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {SCREEN} from '../../../../../root/screenname';
import FunFacts from './funfacts';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';
import {EVENT_STATUS, REFESH_SCREEN, TAB_KEYS} from '../../../../utils/enum';
import useHtQuery from '../../../../../services/api/useHtQuery';
import {
  PageantDataResponse,
  PageantDetails,
} from '../../../../../services/models/pageantdetails/contestantPublicDetails';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import {checkIsNull} from '../../../../utils/validations';
import AppImages from '../../../../../assets/images/AppImages';
import CustomButton from '../../../../common/button';
import ContestantDashboardShimmer from '../../../../common/shimmer/contestantdashboardshimmer';
import FastImageView from '../../../../common/fastimageview';
import {UserContext} from '../../../../../store/userStore';
import {
  createFirebaseLog,
  trackScreenView,
} from '../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../assets/translations/analyticsscreenname';

const ProfileSection = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [tabArray, setTabArray] = React.useState([]);
  const [itemSize, setItemSize] = useState(Number);
  const [isFunFactsLoading, setFunFactsLoading] = useState(false);
  const setLoader = useSetLoader();
  const {storeData} = useContext(UserContext);
  const setScreenRefresh = useSetScreenRefresh();
  const {
    storeData: {refresh},
  } = useAppStore();

  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- START
  const {
    data: contestantData,
    isLoading: isLoadingContestant,
    refetch,
    isRefetching,
  } = useHtQuery<PageantDataResponse>({
    key: GET_CONTESTANT_DETAILS,
    url: GET_CONTESTANT_DETAILS,
    offSuccessToast: true,
  });
  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- END

  useEffect(() => {
    if (isFocused) {
      // update on focus
      if (checkIsNull(contestantData)) {
        getUpdatedDetail();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  const refeshScreenList = async () => {
    createFirebaseLog(refeshScreenList.name, ProfileSection.name, false);
    if (REFESH_SCREEN.CONTESTANT_DASHBOARD === refresh) {
      setLoader(false);
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  const getUpdatedDetail = async () => {
    createFirebaseLog(getUpdatedDetail.name, ProfileSection.name, false);
    await refetch();
  };

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.CONTESTANT_PROFILE);
    setItemSize(width / 2 - moderateScaleVertical(24));
  }, []);

  useEffect(() => {
    if (!isLoadingContestant || !isRefetching) {
      const array = [];
      const resData = contestantData?.data?.pageant_details;
      if (resData !== undefined && resData?.currentPageants?.data?.length > 0) {
        array.push({
          key: TAB_KEYS.FIRST,
          title: translations.CURRENT_PAGEANT,
        });
      }
      if (resData !== undefined && resData?.pastPageants?.data?.length > 0) {
        array.push({
          key: TAB_KEYS.SECOND,
          title: translations.PAGEANT_COMPETED_IN,
        });
      }
      if (resData !== undefined && resData?.pageantsWon?.data?.length > 0) {
        array.push({key: TAB_KEYS.THIRD, title: translations.PAGEANT_WON});
      }
      if (resData !== undefined && resData?.awardsWon?.length > 0) {
        array.push({key: TAB_KEYS.FOURTH, title: translations.AWARD_WON});
      }
      setTabArray(array);
    }
  }, [isLoadingContestant, isRefetching]);

  const handleViewButtonClicked = (name: string, url: string) => {
    createFirebaseLog(handleViewButtonClicked.name, ProfileSection.name, false);
    navigation.navigate(SCREEN.GRID_VIEWALL, {
      screenName: name,
      Url: url,
      contestantId: contestantData?.data.contestant?.id,
      type: '',
    });
  };

  const isPageantCondition = (pageantDetails: PageantDetails) => {
    createFirebaseLog(isPageantCondition.name, ProfileSection.name, false);
    if (
      (!isLoadingContestant || !isRefetching) &&
      (pageantDetails?.pageantsWon?.data?.length === 0 ||
        pageantDetails?.pageantsWon?.data?.length === undefined) &&
      (pageantDetails?.awardsWon?.length === 0 ||
        pageantDetails?.awardsWon?.length === undefined) &&
      (pageantDetails?.currentPageants?.data?.length === 0 ||
        pageantDetails?.currentPageants?.data?.length === undefined) &&
      (pageantDetails?.pastPageants?.data?.length === 0 ||
        pageantDetails?.pastPageants?.data?.length === undefined)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isDetailsAvailable = (pageantData: PageantDetails) => {
    createFirebaseLog(isDetailsAvailable.name, ProfileSection.name, false);
    if (
      !isPageantCondition(pageantData) ||
      checkIsNull(contestantData?.data?.awards?.data) ||
      contestantData?.data?.is_fun_facts_empty === 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const clickAddButton = () => {
    createFirebaseLog(clickAddButton.name, ProfileSection.name, false);
    navigation.navigate(SCREEN.EDIT_CONTESTANT_DETAILS, {
      name: translations.DASHBOARD,
    });
  };

  const emptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <AppImages.Dashboard.AddMoreDetails />
        <Text style={styles.emptyText}>
          {translations.CREATE_A_CUSTOM_PRESCHEDULE_FOR_YOU +
            '\n' +
            translations.ITS_FREE}
        </Text>
        <View style={styles.customButtonStyles}>
          <CustomButton
            label={translations.ADD_DETAILS}
            smallHeight
            onPress={() => {
              clickAddButton();
            }}
            inactive
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.containerStyle}>
        <BasicDetails
          basicData={contestantData?.data?.contestant}
          isLoading={isLoadingContestant || isRefetching}
          marginFromTop={moderateScaleVertical(
            contestantData !== undefined &&
              contestantData.data?.contestant?.status !== undefined &&
              contestantData.data?.contestant?.status !== EVENT_STATUS.ACTIVE
              ? 140
              : 40,
          )}
          isHideTitle={true}
        />
        <View style={styles.rowHeader}>
          {contestantData !== undefined &&
          contestantData.data?.contestant?.status !== undefined &&
          contestantData.data?.contestant?.status !== EVENT_STATUS.ACTIVE ? (
            <View style={styles.inactiveContainer}>
              <Text style={styles.inactiveLabel}>
                {translations.ACTIVATE_YOUR_PROFILE}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                onPress={() =>
                  navigation.navigate(SCREEN.EDIT_CONTESTANT_DETAILS, {
                    name: translations.DASHBOARD,
                  })
                }>
                <Text style={styles.editLabel}>{translations.ACTIVATE}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.row}>
            <TouchableOpacity style={styles.demoImageContainer}>
              <FastImageView
                width={moderateScaleVertical(84)}
                height={moderateScaleVertical(84)}
                borderRadius={moderateScaleVertical(84)}
                imageUrl={
                  storeData?.data?.user?.personal_details.profile_image_url !==
                  undefined
                    ? storeData?.data?.user?.personal_details.profile_image_url
                    : ''
                }
                isCircle
              />

              <View>
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={() => {
                    navigation.navigate(SCREEN.PROFLIE_IMAGE);
                  }}>
                  <AppImages.EditProfile.Tpp_edit_circle_icon
                    width={moderateScale(24)}
                    height={moderateScale(24)}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <Text style={styles.contestantNameContainer} numberOfLines={1}>
              {'Hi, ' +
                storeData?.data?.user?.personal_details.first_name +
                ' ' +
                storeData?.data?.user?.personal_details.last_name}
            </Text>
          </View>
        </View>
        {isLoadingContestant && !isFunFactsLoading && (
          <View style={styles.shimmerList}>
            <ContestantDashboardShimmer
              width={itemSize}
              height={itemSize}
              padding={15}
              numColumns={2}
            />
          </View>
        )}

        {isDetailsAvailable(contestantData?.data?.pageant_details) ? (
          <>
            {isPageantCondition(
              contestantData?.data?.pageant_details,
            ) ? null : (
              <TabViewScreen
                data={contestantData?.data?.pageant_details}
                tabArray={tabArray}
                showAddFeature={true}
                contestantId={contestantData?.data.contestant?.id}
                editable={true}
              />
            )}

            {contestantData?.data?.awards?.data?.length !== 0 &&
            contestantData?.data?.awards?.data !== undefined ? (
              <View style={styles.awardSection}>
                <View style={styles.rowSection}>
                  <Text style={styles.heading}> {translations.AWARDS} </Text>
                  {contestantData?.data?.awards?.data?.length > 3 ? (
                    <TouchableOpacity
                      style={styles.viewStyles}
                      onPress={() => {
                        handleViewButtonClicked(
                          translations.AWARDS,
                          GET_CONTESTANT_AWARDS,
                        );
                      }}>
                      <Text style={styles.viewButton}>
                        {translations.VIEW_ALL}
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
                <TabContent
                  data={contestantData?.data?.awards?.data}
                  name={translations.AWARDS}
                  edit={true}
                />
              </View>
            ) : null}
            <FunFacts
              contestant={contestantData?.data?.contestant}
              getUpatedDetailContestan={getUpdatedDetail}
              setFunFactsLoading={setFunFactsLoading}
            />
          </>
        ) : !isLoadingContestant && !isFunFactsLoading ? (
          emptyState()
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ProfileSection;
