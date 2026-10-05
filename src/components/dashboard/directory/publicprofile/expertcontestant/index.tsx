import { SafeAreaView, Dimensions, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../../common/header';
import { styles } from './styles';
import { DIRECTORY_ID, REFESH_SCREEN, ROLES } from '../../../../utils/enum';
import ContestantProfile from './contestantprofile';
import ExpertProfile from './expertprofile';
import AppImages from '../../../../../assets/images/AppImages';
import useHtQuery from '../../../../../services/api/useHtQuery';
import { GET_PUBLIC_PROFILE_ROLE } from '../../../../../services/endpoints';
import DynamicTabs from '../../../../common/dynamictabs';
import { createFirebaseLog, onShare, trackScreenView } from '../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import useAppStore, {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import { UserContext } from '../../../../../store/userStore';
import {
  Roles,
  UserLocationsData,
} from '../../../../../services/models/publicRoles';
import { AgeDivision } from '../../../../../services/models/pageantdetails/ageDivision';
import CrownConvo from './components/crownconvo';
import ShimmerProfile from '../../../../common/shimmer/profileshimmer';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import { Param } from '../../../../../services/constants';
import translations from '../../../../../assets/translations';
import { toast, toastType } from '../../../../common/commonalert';
import { SCREEN } from '../../../../../root/screenname';
// import {useIsFocused} from '@react-navigation/core';

const PublicProfile = ({ route }) => {
  const [directoryID] = useState(route?.params?.category);
  const setLoader = useSetLoader();
  const { storeData } = useContext(UserContext);
  // const isFocused = useIsFocused();
  const roleId = route.params.roleId === 1 ? '' : route.params.roleId;
  const profileId = route.params.profileId;
  const [selectedRole, setSelectedRole] = useState(route.params.selectedTab);
  const [isRefresh, setRefresh] = useState(true);
  const [itemSize, setItemSize] = useState(Number);
  const {
    storeData: { refresh },
  } = useAppStore();

  const setScreenRefresh = useSetScreenRefresh();

  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- START
  const { data, isLoading, refetch, isRefetching } = useHtQuery<Roles>({
    key: GET_PUBLIC_PROFILE_ROLE + roleId + route.params.key,
    url:
      GET_PUBLIC_PROFILE_ROLE +
      roleId +
      Param.OWNER_IN +
      route.params.owner_id +
      Param.ROLE_ID +
      route.params.selectedTab,
    offSuccessToast: true,
  });
  //API GET CONTESTANT PUBLIC DETAILS ----------------------------------------- END
  useEffect(() => {
    setSelectedRole(route.params.selectedTab);
  }, [route]);

  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  const refeshScreen = async () => {
    createFirebaseLog(refeshScreen.name, SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE);
    if (REFESH_SCREEN.EXPERT_AND_CONTESTENT_DASHBOARD === refresh) {
      await refetch();
      setRefresh(false);
      setTimeout(() => {
        setRefresh(true);
      }, 1000);
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  useEffect(() => {
    if (roleId !== undefined) {
      refetch();
    }
  }, [roleId]);


  useEffect(() => {
    setLoader(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setLoader(isRefetching);
  }, [isRefetching]);

  const onPressShareIcon = () => {
    createFirebaseLog(onPressShareIcon.name, SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE);
    if (
      data?.data?.public_url !== undefined &&
      data?.data?.public_url !== null
    ) {
      onShare('' + data?.data?.public_url, '');
    } else {
      toast(translations.LINK_NOT_FOUND, toastType.ERROR_TOAST);
    }
  };

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  const renderSceneAward = (page: any, index: number) => {
    createFirebaseLog(renderSceneAward.name, SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE);
    let position = Number(page.key);
    if (
      position > -1 &&
      data?.data !== undefined &&
      data?.data?.profileTabsArr[position]?.profile_type === ROLES.CONTESTANT &&
      index + '' === page.key
    ) {
      return renderTabScreen(
        DIRECTORY_ID.CONTESTANT,
        data?.data?.userLocationsData,
        data?.data?.profileTabsArr[position],
        data?.data?.profileTabsArr[position]?.profile_id,
      );
    } else if (
      position > -1 &&
      data?.data !== undefined &&
      data?.data?.profileTabsArr[position]?.profile_type === ROLES.PAGEANT &&
      index + '' === page.key
    ) {
      return renderTabScreen(
        DIRECTORY_ID.PAGEANT,
        data?.data?.userLocationsData,
        data?.data?.profileTabsArr[position],
        data?.data?.profileTabsArr[position]?.profile_id,
      );
    } else if (
      data?.data !== undefined &&
      position > -1 &&
      data?.data?.profileTabsArr[position]?.profile_id === 0 &&
      index + '' === page.key
    ) {
      return <CrownConvo itemId={roleId} />;
    } else if (
      data?.data !== undefined &&
      position > -1 &&
      index + '' === page.key
    ) {
      return renderTabScreen(
        0,
        data?.data?.userLocationsData,
        data?.data?.profileTabsArr[position],
        data?.data?.profileTabsArr[position]?.profile_id,
      );
    } else {
      return (
        <View>
          <ShimmerProfile isDisplayLines={true} />
          <ShimmerList
            width={itemSize}
            height={itemSize}
            padding={15}
            numColumns={2}
          />
        </View>
      );
    }
  };

  const onDisplayNewProfile = async () => {
    createFirebaseLog(onDisplayNewProfile.name, SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE);
    setSelectedRole(ROLES.CONTESTANT);
    await refetch();
    setRefresh(false);
    setTimeout(() => {
      setRefresh(true);
    }, 1000);
  };

  const renderTabScreen = (
    id: number,
    address: UserLocationsData | undefined,
    roles: AgeDivision | undefined,
    itemId: number,
  ) => {
    createFirebaseLog(renderTabScreen.name, SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE);
    return (
      <View>
        {id === DIRECTORY_ID.CONTESTANT ? (
          <ContestantProfile
            role={roles}
            directoryID={id}
            address={address}
            user={storeData?.data?.user}
            itemId={itemId}
          />
        ) : (
          <ExpertProfile
            profileRole={id}
            role={roles}
            address={address}
            itemId={itemId}
            isRefresh={isRefresh}
            selectedTab={selectedRole}
            openProfileId={profileId}
            onDisplayNewProfile={onDisplayNewProfile}
            user={storeData?.data?.user}
          />
        )}
      </View>
    );
  };
  const handleIndexChange = (index: number) => {
    createFirebaseLog(handleIndexChange.name, SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE);
    if (
      data?.data?.profileTabsArr[index]?.profile_type === selectedRole ||
      data?.data?.profileTabsArr[index]?.profile_type === ROLES.CROWN_CONVO
    ) {
      setSelectedRole('');
      setScreenRefresh(REFESH_SCREEN.NONE);
    } else if (
      data?.data?.profileTabsArr[index]?.profile_type === ROLES.CONTESTANT
    ) {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_CONTESTANT);
    } else {
      setScreenRefresh(REFESH_SCREEN.PUBLIC_PROFILE_EXPERT);
    }
    trackScreenView(
      data?.data?.profileTabsArr[index]?.profile_type +
      ' ' +
      translations.PUBLIC_SCREEN,
    );
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <Header
        lable={route?.params?.name}
        isUnderLineRequired
        rightIcon1={<AppImages.PUBLIC_PROFILE.ShareIcon />}
        onPressRightIcon1={onPressShareIcon}
        fallbackToDashboardOnBack
      />
      {!isLoading &&
        !isRefetching &&
        data?.data !== undefined &&
        data?.data?.profileTabsArr?.length > 1 ? (
        <DynamicTabs
          tabScreen={renderSceneAward}
          ageDivisionList={data?.data?.profileTabsArr}
          isAllTabRequired={false}
          selectedTab={selectedRole}
          customStylesForContainer={{
            marginLeft: moderateScale(0),
            marginTop: moderateScale(0),
          }}
          indexChanged={handleIndexChange}
        />
      ) : !isLoading &&
        !isRefetching &&
        data?.data !== undefined &&
        data?.data?.profileTabsArr?.length === 1 ? (
        renderTabScreen(
          directoryID,
          data?.data?.userLocationsData,
          data?.data?.profileTabsArr[0],
          profileId,
        )
      ) : (
        !isLoading &&
        !isRefetching &&
        renderTabScreen(directoryID, undefined, undefined, profileId)
      )}
    </SafeAreaView>
  );
};

export default PublicProfile;
