import React, { useEffect } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import { MESSAGE_TYPE } from '../../../../common/localnotificationtoast';
import { styles } from './styles';
import { GET_EXPERT_ALBUM } from '../../../../../services/endpoints';
import { SCREEN } from '../../../../../root/screenname';
import { useNavigation } from '@react-navigation/native';
import translations from '../../../../../assets/translations';
import FloatingButton from '../../../../common/floatingbutton';
import {
  EXPERT_ALUM_TYPE,
  FLOATING_ICON,
  PROFILE_STATUS,
  REFESH_SCREEN,
} from '../../../../utils/enum';
import { PageantDataResponse } from '../../../../../services/models/pageantdetails/contestantPublicDetails';
import AlbumList from '../../../directory/publicprofile/expertcontestant/components/albumlist';
import { color } from '../../../../../assets/colorConstant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AwardsList from '../../../directory/publicprofile/expertcontestant/components/awards';
import { SortedRolesForPublicScreen } from '../../../../../services/models/user/user';
import useAppStore, {
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import AppImages from '../../../../../assets/images/AppImages';
import { useNetInfo } from '@react-native-community/netinfo';
import { internetState } from '../../../../common/commonalert';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import { checkIsNull } from '../../../../utils/validations';
import CustomButton from '../../../../common/button';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import { createFirebaseLog, trackScreenView } from '../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../assets/translations/analyticsscreenname';
import useHtQuery from '../../../../../services/api/useHtQuery';

interface Props {
  sortedRolesForPublicScreen: SortedRolesForPublicScreen | undefined;
}

/* It represents a section of the user interface called "MyWork". */
const MyWork = ({ sortedRolesForPublicScreen }: Props) => {
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const netInfo = useNetInfo();
  const {
    storeData: { refresh },
  } = useAppStore();

  /* The code snippet is using the `useHtQuery` hook to make an API request to fetch data for the
  expert's album. */
  const { data, isLoading, refetch, isRefetching } =
    useHtQuery<PageantDataResponse>({
      key: GET_EXPERT_ALBUM + sortedRolesForPublicScreen?.id,
      url: GET_EXPERT_ALBUM + sortedRolesForPublicScreen?.id,
      offSuccessToast: true,
    });
  //API GALLERY----------------------------------------- START

  /**
   * The function `onCreateAlbumClick` navigates to the `CREATE_EXPERT_ALBUM` screen with the expert
   * data.
   */

  const onCreateAlbumClick = () => {
    createFirebaseLog(onCreateAlbumClick.name, MyWork.name, false);
    navigation.navigate(SCREEN.CREATE_EXPERT_ALBUM, {
      expert: sortedRolesForPublicScreen,
    });
  };

  /**
   * The function `refeshScreen` is used to refresh the screen if the value of `refresh` is equal to
   * `REFESH_SCREEN.EXPERT_DASHBOARD_ALBUM`.
   */
  const refeshScreen = async () => {
    createFirebaseLog(refeshScreen.name, MyWork.name, false);
    if (REFESH_SCREEN.EXPERT_DASHBOARD_ALBUM === refresh) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
 `useEffect` hook is used to track a screen view event using an analytics library. */
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.EXPERT_MY_WORK);
  }, []);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is used to call the `refeshScreen` function whenever the value of the `refresh`
variable changes. This ensures that the screen is refreshed whenever the `refresh` variable is
updated. */
  useEffect(() => {
    refeshScreen();
  }, [refresh]);

  /**
   * The function `onPageantWWItemClicked` handles the logic for when a pageant item is clicked,
   * including checking internet connectivity and navigating to the pageant event's public profile.
   * @param {number} indxx - The parameter `indxx` is of type `number` and represents the index of an
   * item in an array.
   * @returns The function `onPageantWWItemClicked` returns the value of `netInfo.isConnected` if both
   * `netInfo.isConnected` and `netInfo.isInternetReachable` are false. Otherwise, it does not
   * explicitly return a value.
   */
  const onPageantWWItemClicked = (indxx: number) => {
    createFirebaseLog(onPageantWWItemClicked.name, MyWork.name, false);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return netInfo.isConnected;
    } else {
      if (
        data?.data?.pageantsWorkedAlbums[indxx].status === PROFILE_STATUS.ACTIVE
      ) {
        let pageantId = data?.data?.pageantsWorkedAlbums[indxx].pageant_id;
        navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
          eventId: checkIsNull(pageantId)
            ? pageantId
            : data?.data?.pageantsWorkedAlbums[indxx].id,
          name: data?.data?.pageantsWorkedAlbums[indxx].title,
        });
      }
    }
  };

  /**
   * The function `onExtraViewAllClick` navigates to the expert album screen with specific parameters.
   */
  const onExtraViewAllClick = () => {
    createFirebaseLog(onExtraViewAllClick.name, MyWork.name, false);
    navigation.navigate(SCREEN.EXPERT_ALBUM, {
      profileId: sortedRolesForPublicScreen?.id,
      role: {
        slug: sortedRolesForPublicScreen?.role.toLowerCase(),
        profile_type: sortedRolesForPublicScreen?.role,
        profile_id: sortedRolesForPublicScreen?.id,
      },
      tag: new Date().getMilliseconds(),
      albumId: EXPERT_ALUM_TYPE.EXTRA,
      expert: sortedRolesForPublicScreen,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: moderateScaleVertical(100),
        }}>
        {isLoading || isRefetching ? (
          <ShimmerList
            width={'95%'}
            height={moderateScale(150)}
            padding={15}
            numColumns={1}
          />
        ) : (
          <>
            {(data?.data?.contesantsWorkedAlbums !== undefined &&
              data?.data?.contesantsWorkedAlbums?.length) > 0 && (
                <View>
                  <AlbumList
                    data={data?.data?.contesantsWorkedAlbums}
                    maxNoOfLines={1}
                    navigation={navigation}
                    profileId={sortedRolesForPublicScreen?.id}
                    role={{
                      slug: sortedRolesForPublicScreen?.role.toLowerCase(),
                      profile_type: sortedRolesForPublicScreen?.role,
                      profile_id: sortedRolesForPublicScreen?.id,
                    }}
                    sortedRolesForPublicScreen={sortedRolesForPublicScreen}
                    isNameClickAble={false}
                    backgroundColor={color.S_GRAY_1}
                    itemType={SCREEN.EXPERT_ALBUM}
                    albumId={EXPERT_ALUM_TYPE.CONTESTANT_WORKED_WITH}
                    title={
                      translations.CONTESTANT_WORKED_WITH +
                      ' (' +
                      data?.data?.contesantsWorkedAlbumsCount +
                      ')'
                    }
                  />
                </View>
              )}

            {(data?.data?.pageantsWorkedAlbums !== undefined &&
              data?.data?.pageantsWorkedAlbums?.length) > 0 && (
                <View>
                  <AlbumList
                    data={data?.data?.pageantsWorkedAlbums}
                    navigation={navigation}
                    maxNoOfLines={2}
                    sortedRolesForPublicScreen={sortedRolesForPublicScreen}
                    backgroundColor={color.WHITE}
                    isNameClickAble={false}
                    profileId={sortedRolesForPublicScreen?.id}
                    role={{
                      slug: sortedRolesForPublicScreen?.role.toLowerCase(),
                      profile_type: sortedRolesForPublicScreen?.role,
                      profile_id: sortedRolesForPublicScreen?.id,
                    }}
                    onTextClickListener={(index: number) =>
                      onPageantWWItemClicked(index)
                    }
                    albumId={EXPERT_ALUM_TYPE.PAGEANT_WORKED_WITH}
                    itemType={SCREEN.EXPERT_ALBUM}
                    title={
                      translations.PAGEANT_WORKED_WITH +
                      ' (' +
                      data?.data?.pageantsWorkedAlbumsCount +
                      ')'
                    }
                  />
                </View>
              )}

            {data?.data?.extraImages !== undefined &&
              data?.data?.extraImages !== null &&
              data?.data?.extraImages?.length !== 0 && (
                <View style={styles.awardSection}>
                  <View style={styles.rowSection}>
                    <Text style={styles.heading}>
                      {translations.EXTRA} ({data?.data?.extraAlbumsCount})
                    </Text>
                    <TouchableOpacity
                      style={styles.viewStyles}
                      onPress={() => {
                        onExtraViewAllClick();
                      }}>
                      <Text style={styles.viewButton}>
                        {translations.VIEW_ALL}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <AwardsList data={data?.data?.extraImages} />
                </View>
              )}
          </>
        )}

        {(data?.data?.pageantsWorkedAlbums !== undefined &&
          data?.data?.pageantsWorkedAlbums?.length === 0 &&
          data?.data?.contesantsWorkedAlbums !== undefined &&
          data?.data?.contesantsWorkedAlbums?.length === 0 &&
          data?.data?.extraImages !== undefined &&
          data?.data?.extraImages?.length === 0) ||
          (data?.data?.pageantsWorkedAlbums !== undefined &&
            data?.data?.pageantsWorkedAlbums?.length === 0 &&
            data?.data?.contesantsWorkedAlbums !== undefined &&
            data?.data?.contesantsWorkedAlbums?.length === 0 &&
            data?.data?.extraImages === null) ? (
          <View style={styles.emptycontainer}>
            <Image
              source={AppImages.Dashboard.ExpertEmptyAlbum}
              style={styles.mainimage}
              resizeMode="contain"
            />

            <View style={styles.containerLogin}>
              <CustomButton
                inactive
                label={translations.CREATE_ALBUM}
                onPress={onCreateAlbumClick}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>

      {(data?.data?.pageantsWorkedAlbums !== undefined &&
        data?.data?.pageantsWorkedAlbums?.length !== 0) ||
        (data?.data?.contesantsWorkedAlbums !== undefined &&
          data?.data?.contesantsWorkedAlbums?.length !== 0) ||
        (data?.data?.extraImages !== null &&
          data?.data?.extraImages !== undefined &&
          data?.data?.extraImages?.length !== 0) ? (
        <FloatingButton
          iconId={FLOATING_ICON.PLUS}
          onPress={() => onCreateAlbumClick()}
          type={MESSAGE_TYPE.REARRANGE_ALBUM}
        />
      ) : null}
    </View>
  );
};

export default MyWork;
