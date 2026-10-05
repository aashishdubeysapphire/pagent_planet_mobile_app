import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import translations from '../../../../../../assets/translations';
import { styles } from './styles';
import {
  DIRECTORY_ID,
  PROFILE_STATUS,
  REFESH_SCREEN,
  ROLES,
  TAB_KEYS,
} from '../../../../../utils/enum';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../utils/responsiveSize';
import {
  GET_PUBLIC_PROFILE,
  GET_CONTESTANT_AWARDS,
  GET_PAGEANT_PLAN,
} from '../../../../../../services/endpoints';
import BasicDetails from '../../../../dashboard/contestantdashboard/profilesection/basicdetails';
import TabViewScreen from '../../../../dashboard/contestantdashboard/profilesection/tabview';
import { ScrollView } from 'react-native-gesture-handler';
import FunFacts from '../../../../dashboard/contestantdashboard/profilesection/funfacts';
import { SCREEN } from '../../../../../../root/screenname';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import BannerSlider from '../components/bannerslider';
import Bio from '../components/bio';
import AwardsList from '../components/awards';
import AlbumList from '../components/albumlist';
import ProfileDetails from '../components/profiledetails';
import ActionButtons from '../components/actionbuttons';
import useHtQuery from '../../../../../../services/api/useHtQuery';
import {
  PageantDataResponse,
  PageantDetails,
} from '../../../../../../services/models/pageantdetails/contestantPublicDetails';
import {
  MethodTypes,
  Param,
  ProfileType,
  Public_Profile,
} from '../../../../../../services/constants';
import AppImages from '../../../../../../assets/images/AppImages';
import { User } from '../../../../../../services/models/user/user';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import Shimmer from '../../../../../common/shimmer';
import { AgeDivision } from '../../../../../../services/models/pageantdetails/ageDivision';
import { UserLocationsData } from '../../../../../../services/models/publicRoles';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import { checkIsNull } from '../../../../../utils/validations';
import { color } from '../../../../../../assets/colorConstant';
import { ActivePcaEvent } from '../../../../../../services/models/pca/activePcaEvent';
import ViewPlanModal from '../../../../dashboard/pageantdashboard/pageantdetail/components/viewplanmodal';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import { PlanData } from '../../../../../../services/models/planData';
import { internetState } from '../../../../../common/commonalert';
import { useNetInfo } from '@react-native-community/netinfo';
import { createFirebaseLog, trackScreenView } from '../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../assets/translations/analyticsscreenname';

interface Props {
  directoryID: number;
  role: AgeDivision | undefined;
  user: User | undefined;
  itemId: number;
  address: UserLocationsData | undefined;
}

const ContestantProfile = ({
  directoryID,
  address,
  role,
  user,
  itemId,
}: Props) => {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const isFocused = useIsFocused();
  const [pageantData, setPageantData] = useState<PageantDetails>();
  const [tabArray, setTabArray] = React.useState([]);
  const [buttonArray, setButtonArray] = React.useState([]);
  const [itemSize, setItemSize] = useState(Number);
  const {
    storeData: { refresh },
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const netInfo = useNetInfo();

  //API GET CONTESTANT PUBLIC DETAILS ---------------------------------------- START
  const { data, isLoading, refetch, isFetching } =
    useHtQuery<PageantDataResponse>({
      key: GET_PUBLIC_PROFILE + Param.CONTESTANT_PARAM_ + itemId,
      url: GET_PUBLIC_PROFILE + Param.CONTESTANT_PARAM_ + itemId,
      offSuccessToast: true,
    });
  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- END

  const { data: membershipPlans, mutateAsync: getPlanDetails } =
    useCgMutation<PlanData>({
      key: GET_PAGEANT_PLAN,
      method: MethodTypes.GET,
      url: GET_PAGEANT_PLAN,
      disableLoader: true,
      offSuccessToast: true,
    });

  /* This is a react hook that is called when the component is mounted. */
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.CONTESTANT_PUBLIC_PROFILE);
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    getPlanDetails();
  }, []);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);


  const refeshScreen = async () => {
    createFirebaseLog(refeshScreen.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    if (REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT === refresh) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      refetch();
    }
  };

  const getActiveButtonList = (dataList: PageantDataResponse) => {
    createFirebaseLog(getActiveButtonList.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    const buttonList = [];
    if (
      dataList?.contestant?.owner_id !== ROLES.ADMIN_ID &&
      dataList?.contestant?.owner_id !== Number(user?.id) &&
      dataList?.contestant?.hide_message_me === translations.NO_SMALL &&
      !dataList?.is_message_button_disable &&
      !dataList?.is_compete_button_display
    ) {
      buttonList.push(translations.MESSAGE);
    } else if (
      (dataList?.contestant?.owner_id === ROLES.ADMIN_ID ||
        dataList?.contestant?.owner_id === Number(user?.id)) &&
      dataList?.contestant?.hide_message_me !== translations.NO_SMALL
    ) {
      // for admin profiles & user own profile, show meesage disable
    } else if (dataList?.is_message_button_disable) {
      buttonList.push(translations.UPGRADE_SMALL); //for unlock profiles ,who do not have membership
    } else if (dataList?.is_compete_button_display) {
      buttonList.push(translations.COMPETING);
    }

    if (dataList?.productOnSale > 0) {
      buttonList.push(translations.SHOP);
    }
    if (dataList?.productOnHire > 0) {
      buttonList.push(translations.HIRE);
    }
    setButtonArray(buttonList);
  };

  const getTabsList = (resData: PageantDetails) => {
    createFirebaseLog(getTabsList.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    const array = [];
    if (resData?.currentPageants?.data?.length > 0) {
      array.push({ key: TAB_KEYS.FIRST, title: translations.CURRENT_PAGEANT });
    }
    if (resData?.pastPageants?.data?.length > 0) {
      array.push({
        key: TAB_KEYS.SECOND,
        title: translations.PAGEANT_COMPETED_IN,
      });
    }
    if (resData?.pageantsWon?.data?.length > 0) {
      array.push({
        key: TAB_KEYS.THIRD,
        title:
          translations.PAGEANTS +
          data?.data?.contestant?.owner?.first_name +
          translations.WON,
      });
    }
    if (resData?.awardsWon?.length > 0) {
      array.push({
        key: TAB_KEYS.FOURTH,
        title:
          translations.AWARDS +
          ' ' +
          data?.data?.contestant?.owner?.first_name +
          translations.WON,
      });
    }
    setTabArray(array);
  };

  useEffect(() => {
    setPageantData(data?.data?.pageant_details);
    getTabsList(data?.data?.pageant_details);
    getActiveButtonList(data?.data);
  }, [data]);

  const handleViewButtonClicked = (name: string, url: string) => {
    createFirebaseLog(handleViewButtonClicked.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    navigation.navigate(SCREEN.GRID_VIEWALL, {
      screenName: name,
      Url: url,
      contestantId: data?.data?.contestant?.id,
      type: Public_Profile,
    });
  };

  const checkPageantCondition = (pageantDetails: PageantDetails) => {
    createFirebaseLog(checkPageantCondition.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    if (
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

  const isBannerShown = (pageantsData: PageantDataResponse) => {
    createFirebaseLog(isBannerShown.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    if (
      (pageantsData?.activeNominationsList !== undefined &&
        pageantsData?.activeNominationsList?.length > 0) ||
      (pageantsData?.activePcaEvents !== undefined &&
        pageantsData?.activePcaEvents?.length > 0 &&
        !isLoading &&
        !isFetching)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const voteMeButtonPressed = (item: ActivePcaEvent) => {
    createFirebaseLog(isBannerShown.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE, {
      eventId: item?.pageant_id,
      ageDivisionId: item?.age_division_id,
      contestant: data?.data?.contestant,
      contentantName: data?.data?.contestant?.name,
      contestantId: data?.data?.contestant?.id,
    });
  };

  useEffect(() => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [isFocused]);

  const onAlbumTextClicked = (indxx: number) => {
    createFirebaseLog(onAlbumTextClicked.name, SCREEN.CHOOSE_PROFILE_WITH_BACK, false);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      if (data?.data?.galleryList[indxx].status === PROFILE_STATUS.ACTIVE) {
        let pageantId = data?.data?.galleryList[indxx].pageant_id;
        let eventId = data?.data?.galleryList[indxx].id;
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: checkIsNull(pageantId) ? pageantId : eventId,
          name: data?.data?.galleryList[indxx].album_name,
        });
      }
    }
  };


  return (
    <ScrollView ref={scrollRef}>
      <View style={styles.profileArea}>
        <ProfileDetails
          directoryID={directoryID}
          contestant={data?.data?.contestant}
          isLoadingDetail={isLoading}
          address={address}
          socialMediaData={data?.data?.socialMedias}
        />
        {data?.data?.contestant?.owner_id === ROLES.ADMIN_ID ? (
          <View style={styles.claimProfileSection}>
            <TouchableOpacity
              style={styles.claimTouchableArea}
              onPress={() =>
                navigation.navigate(SCREEN.CLAIM_PROFILE, {
                  profileType: translations.SMALL_CONTESTANT,
                  slug: data?.data?.contestant?.slug,
                })
              }>
              <AppImages.PUBLIC_PROFILE.ClaimProfile />
              <Text style={styles.claimProfileLabel}>
                {translations.CLAIM_THIS_PROFILE}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          data?.data !== undefined && (
            <ActionButtons
              buttonArray={buttonArray}
              loading={isLoading}
              fetching={isFetching}
              screen={''}
              name={data?.data?.contestant?.name}
              profileId={data?.data?.contestant?.id}
              roleId={DIRECTORY_ID.CONTESTANT}
              setIsPreviewModalVisible={setIsPreviewModalVisible}
            />
          )
        )}
      </View>

      {isLoading || isFetching ? (
        <View style={{ ...styles.shimmerList, marginLeft: moderateScale(16) }}>
          <Shimmer
            width={width - moderateScale(32)}
            height={moderateScale(124)}
            borderRadius={moderateScale(24)}
            bottomSpace={moderateScale(16)}
          />
        </View>
      ) : (
        isBannerShown(data?.data) && (
          <BannerSlider
            pcaEventList={data?.data?.activePcaEvents}
            nominationList={data?.data?.activeNominationsList}
            publicProfileType={ProfileType.CONTESTANT}
            businessId={data?.data?.contestant?.id}
            refetchAPI={refetch}
            voteMeButtonClicked={(item: ActivePcaEvent) => {
              voteMeButtonPressed(item);
            }}
          />
        )
      )}

      {data?.data?.contestant?.owner?.bio !== undefined &&
        !isLoading &&
        data?.data?.contestant?.owner?.bio !== null &&
        data?.data?.contestant?.owner?.bio !== '' && (
          <Bio
            heading={translations.BIO}
            text={'' + data?.data?.contestant?.owner?.bio}
          />
        )}

      <View style={{ marginTop: moderateScaleVertical(8) }}>
        {data?.data?.contestant?.contestant_eye_color?.name ||
          data?.data?.contestant?.contestant_hair_color?.name ||
          data?.data?.contestant?.dob ||
          data?.data?.contestant?.height ||
          data?.data?.contestant?.zodiac_sign ? (
          <BasicDetails
            basicData={data?.data?.contestant}
            isLoading={isLoading}
            editable={false}
            marginFromTop={moderateScaleVertical(16)}
          />
        ) : null}
      </View>
      {data?.data?.galleryList?.length !== 0 &&
        data?.data?.galleryList !== undefined && (
          <AlbumList
            data={data?.data?.galleryList}
            itemSize={itemSize}
            navigation={navigation}
            profileId={itemId}
            role={role}
            title={translations.ALBUMS}
            backgroundColor={color.S_GRAY_1}
            itemType={SCREEN.CONTESTANT_PUBLIC_PROFILE}
            onTextClickListener={(index: number) => onAlbumTextClicked(index)}
          />
        )}

      {!checkPageantCondition(pageantData) &&
        !isLoading &&
        tabArray?.length > 0 && (
          <TabViewScreen
            data={pageantData}
            tabArray={tabArray}
            showAddFeature={false}
            editable={false}
            contestantId={data?.data?.contestant?.id}
          />
        )}

      {(data?.data?.awards?.data !== undefined &&
        data?.data?.awards?.data?.length) > 0 && (
          <View style={styles.awardSection}>
            <View style={styles.rowSection}>
              <Text style={styles.heading}> {translations.AWARDS} </Text>
              <TouchableOpacity
                style={styles.viewStyles}
                onPress={() => {
                  handleViewButtonClicked(
                    translations.AWARDS,
                    GET_CONTESTANT_AWARDS,
                  );
                }}>
                <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
              </TouchableOpacity>
            </View>
            <AwardsList data={data?.data?.awards?.data} />
          </View>
        )}

      {data?.data?.contestant !== undefined ? (
        <FunFacts contestant={data?.data?.contestant} editable={false} />
      ) : isLoading || isFetching ? (
        <View style={styles.shimmerList}>
          <ShimmerList
            width={width - moderateScale(24)}
            height={moderateScaleVertical(60)}
            numColumns={1}
            padding={moderateScale(16)}
          />
        </View>
      ) : null}
      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        pageantPlanDetail={membershipPlans?.data}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </ScrollView>
  );
};

export default ContestantProfile;
