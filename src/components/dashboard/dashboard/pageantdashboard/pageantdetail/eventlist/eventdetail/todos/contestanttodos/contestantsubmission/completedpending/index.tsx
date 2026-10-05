import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {styles} from './styles';
import SwitchButton from '../../../../../../../../../../common/switchbutton';
import translations from '../../../../../../../../../../../assets/translations';
import AppImages from '../../../../../../../../../../../assets/images/AppImages';
import EventToDosList from '../../../../../../../../../../common/eventtodolist';
import Header from '../../../../../../../../../../common/header';
import {useNavigation} from '@react-navigation/core';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../../utils/responsiveSize';
import {
  GET_COMPLETED_CONTESTANT_LIST,
  GET_PENDING_CONTESTANT_LIST,
} from '../../../../../../../../../../../services/endpoints';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../../../../../../../../services/constants';
import useHtQuery from '../../../../../../../../../../../services/api/useHtQuery';
import ShimmerList from '../../../../../../../../../../common/shimmer/listshimmer';
import useCgMutation from '../../../../../../../../../../../services/api/useCgMutation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WEBSITE_HOMEPAGE_LINK} from '../../../../../../../../../../../services/staticWebUrl';
import {PendingContestantResponse} from '../../../../../../../../../../../services/models/eventmanager/pendingContestantList';
import {Base} from '../../../../../../../../../../../services/models/base';
import {CompletedContestantsList} from '../../../../../../../../../../../services/models/eventmanager/completedContestantList';
import {internetState} from '../../../../../../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import {openWebLink} from '../../../../../../../../../../utils/helperFunction';

const CompletedPending = props => {
  const [leftTabActive, setLeftTabActive] = useState(true);
  const navigation = useNavigation();
  const [pendingList, setPendingList] = useState<PendingContestantResponse>([]);
  const netInfo = useNetInfo();
  const [pendingUploadFlag, setPendingUploadFlag] = useState(Number);
  const [getCompletedParams, setCompletedParams] = useState(
    Param.EVENT_ID +
      props.route.params.eventId +
      Param.TO_DO_ID +
      props.route.params.todoId +
      Param.AGE_DIVISION_ID +
      props.route.params.ageId,
  );
  const [getPendingParam, setPendingParams] = useState(
    Param.TO_DO_ID_ +
      props.route.params.todoId +
      Param.AGE_DIVISION_ID +
      props.route.params.ageId,
  );

  //API GET COMPLETED CONTESTANT LIST ----------------------------------------- START
  const {data, isLoading, refetch} = useHtQuery<CompletedContestantsList>({
    key: GET_COMPLETED_CONTESTANT_LIST + getCompletedParams,
    url: GET_COMPLETED_CONTESTANT_LIST + getCompletedParams,
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET COMPLETED CONTESTANT LIST  ----------------------------------------- END

  //API GET PENDING CONTESTANT LIST ----------------------------------------- START
  const {mutateAsync: callPendingContestantAPI, isLoading: isLoading2} =
    useCgMutation<Base<PendingContestantResponse>>({
      key: GET_PENDING_CONTESTANT_LIST + getPendingParam,
      url: GET_PENDING_CONTESTANT_LIST + getPendingParam,
      offSuccessToast: true,
      method: MethodTypes.GET,
    });
  //API GET PENDING CONTESTANT LIST ----------------------------------------- START

  const onLeftButtonClicked = () => {
    if (!leftTabActive) {
      setLeftTabActive(!leftTabActive);
      if (!netInfo.isConnected && !netInfo.isInternetReachable) {
        internetState(netInfo.isConnected!!);
        return false;
      } else {
        refetch();
      }
    }
  };

  const onRightButtonClicked = async () => {
    if (leftTabActive) {
      setLeftTabActive(!leftTabActive);
      if (!netInfo.isConnected && !netInfo.isInternetReachable) {
        internetState(netInfo.isConnected!!);
        return false;
      } else {
        const res = await callPendingContestantAPI();
        if (res.success && res?.status_code === ApiStatusType.Success) {
          setPendingList(res?.data?.pendingContestantRecords);
          setPendingUploadFlag(res?.data?.todo_upload_file_check);
        }
      }
    }
  };

  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  const tapLinkShow = (showLink: number) => {
    if (showLink === 1) {
      return (
        <TouchableOpacity
          style={styles.tapHereArea}
          onPress={() => openWebLink(WEBSITE_HOMEPAGE_LINK)}>
          <Text style={styles.tapHereStyle}>{translations.TAP_HERE}</Text>
          <Text style={styles.infoStyle}>
            {translations.DOWNLOAD_FILES_ON_WEBSITE}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View style={{marginTop: moderateScaleVertical(8)}}></View>;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={props?.route?.params.todoName}
        onPressBack={() => navigation.goBack()}
        isUnderLineRequired
      />
      <View style={{marginTop: moderateScale(16)}}>
        <SwitchButton
          leftLabel={
            translations.COMPLETED +
            '(' +
            props?.route?.params.noOfCompleted +
            ')'
          }
          rightLabel={
            translations.PENDING + '(' + props?.route?.params.noOfPending + ')'
          }
          isLeftButtonActive={leftTabActive}
          onLeftTabClicked={onLeftButtonClicked}
          onRightTabClicked={onRightButtonClicked}
        />

        {leftTabActive ? (
          data !== undefined && data?.data?.length > 0 ? (
            <View style={styles.pendingListArea}>
              {tapLinkShow(data?.data[0]?.todo_upload_file_check)}
              <FlatList
                data={data?.data}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                nestedScrollEnabled
                key={'_'}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                ListFooterComponent={listFooterComponent}
                renderItem={({item, index}) => (
                  <EventToDosList
                    numberOfLinesForName={1}
                    contestantName={item?.name}
                    imageUrl={item?.contestant_full_image_url}
                    edit={false}
                    showImage={true}
                    fileName={item?.completed_todo_upload?.file_name}
                    fileType={item?.completed_todo_upload?.file_type}
                  />
                )}
              />
            </View>
          ) : data?.data?.length === 0 ? (
            <View style={styles.noRecordView}>
              <Image
                source={AppImages.EVENT_TO_DOS.NoCompletedSubmission}
                style={{width: '100%'}}
                resizeMode="contain"
              />
              <Text style={styles.noRecordStyles}>
                {translations.NO_COMPLETED_RECORDS}
              </Text>
            </View>
          ) : isLoading ? (
            <View style={styles.shimmerView}>
              <ShimmerList
                width={Dimensions.get('window').width - moderateScale(32)}
                height={moderateScaleVertical(85)}
                padding={16}
              />
            </View>
          ) : null
        ) : (
          <View style={styles.pendingListArea}>
            {pendingList !== undefined && pendingList?.length > 0 ? (
              <>
                {tapLinkShow(pendingUploadFlag)}
                <FlatList
                  data={pendingList}
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                  nestedScrollEnabled
                  key={'_'}
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={true}
                  ListFooterComponent={listFooterComponent}
                  renderItem={({item, index}) => (
                    <EventToDosList
                      numberOfLinesForName={1}
                      contestantName={item?.name}
                      imageUrl={item?.contestant_full_image_url}
                      edit={false}
                      showImage={true}
                    />
                  )}
                />
              </>
            ) : isLoading2 ? (
              <ShimmerList
                width={Dimensions.get('window').width - moderateScale(32)}
                height={moderateScaleVertical(85)}
                padding={16}
              />
            ) : pendingList?.length === 0 ? (
              <View
                style={{
                  ...styles.noRecordView,
                  marginTop: -moderateScaleVertical(50),
                }}>
                <Image
                  source={AppImages.EVENT_TO_DOS.NoPendingSubmission}
                  style={{width: '100%'}}
                  resizeMode="contain"
                />
                <Text style={styles.noRecordStyles}>
                  {translations.NO_PENDING_RECORDS}
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CompletedPending;
