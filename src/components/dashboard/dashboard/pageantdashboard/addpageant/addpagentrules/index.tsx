import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../common/header';
import translations from '../../../../../../assets/translations';
import PagentRulesComp from './component';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {UPDATE_PAGENT_RULES} from '../../../../../../services/endpoints';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {
  ROLES,
  REFESH_SCREEN,
  USER_DESHBOARD_TAB,
} from '../../../../../utils/enum';
import WarningModel from '../../../../../common/warningmodel';
import {Base} from '../../../../../../services/models/base';
import {UserContext} from '../../../../../../store/userStore';
import {StackActions} from '@react-navigation/native';
import {PAGEANT_RULES_INFO_ARRAY} from './loccalArray';
import CelebrationView from '../../pageantdetail/eventlist/eventdetail/addevent/components/celebrationview';
import {checkIfDatesAreupcomingCurrent} from '../../../../../utils/datetimemanger';

const AddpagentRules = props => {
  const {pageantId, endDate} = props?.route?.params;
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const [isSavePressed, setIsSavePressed] = useState(false);
  const [addBody, setAddBody] = useState();
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const {storeData, setDataToStore} = React.useContext(UserContext);
  const [addContestentMsg, setAddContestentMsg] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [upcoming_event_id, setupcoming_event_id] = useState();
  const setScreenRefresh = useSetScreenRefresh();

  const {mutateAsync: createNewPagent} = useCgMutation<Base>({
    key: UPDATE_PAGENT_RULES,
    url: UPDATE_PAGENT_RULES,
    body: addBody,
    disableLoader: true,
  });

  const hitCreateNewPagentApi = async () => {
    setLoader(true);
    const res = await createNewPagent();
    if (res.success) {
      if (props.route.params?.isEditing) {
        setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      } else {
        let store = storeData;
        if (
          storeData?.data?.user?.primary_profile_type === null ||
          storeData?.data?.user?.primary_profile_type === undefined ||
          storeData?.data?.user?.primary_profile_type === ROLES.CONTESTANT
        ) {
          store.data.user.primary_profile_type = ROLES.PAGEANT;
        }
        const pageantObj = {pageant: ROLES.PAGEANT};
        store.data.user.addedRolesListData = {
          ...store.data.user.addedRolesListData,
          ...pageantObj,
        };
        setDataToStore(store);
        setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);

        if (res.data.infoMessage !== '') {
          setupcoming_event_id(res.data.upcoming_event_id);
          setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);
          setAddContestentMsg(res.data.infoMessage);
          setShowCelebration(true);
        } else if (!checkIfDatesAreupcomingCurrent(endDate)) {
          setupcoming_event_id(pageantId);
          setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);
          setAddContestentMsg(translations.NOW_LETS_ADD);
          setShowCelebration(true);
        } else {
          setTimeout(() => {
            props.navigation.dispatch(
              StackActions.replace(SCREEN.PAGEANT_DETAIL, {
                pageantId: props?.route?.params.pageantId,
              }),
            );
          }, 500);
        }
      }
    }
    setLoader(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {!showCelebration ? (
          <>
            <Header
              lable={
                props?.route?.params?.isEditing
                  ? translations.EDIT_PAGNET_RULES
                  : translations.ADD_PAGNET_RULES
              }
              rightText={translations.SAVE}
              isUnderLineRequired
              onPressRightText={() => setIsSavePressed(true)}
              onPressBack={() => {
                if (props?.route?.params?.isEditing === undefined) {
                  setIsWarningMoadlVisible(true);
                } else {
                  navigation.goBack();
                }
              }}
              infoIcon={true}
              infoDataArray={PAGEANT_RULES_INFO_ARRAY}
            />
            <PagentRulesComp
              isSavePressed={isSavePressed}
              setIsSavePressed={setIsSavePressed}
              setAddBody={setAddBody}
              param={props.route.params}
              createNewPagent={hitCreateNewPagentApi}
            />
          </>
        ) : (
          <CelebrationView
            msg={addContestentMsg}
            id={upcoming_event_id}
            isNewpagentAdded={true}
          />
        )}
      </View>

      <WarningModel
        msg={translations.ADD_PAGENT_RULES_BACK_ERR_MSG}
        isModalVisible={isWarningMoadlVisible}
        setCancel={() => {
          setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);

          navigation.reset({
            index: 0,
            routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
          });
          setTimeout(() => {
            navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
              redirectedto: ROLES.PAGEANT,
            });
          }, 100);
        }}
        setIsModalVisible={setIsWarningMoadlVisible}
        headingStyle={styles.modalHeading}
      />
    </SafeAreaView>
  );
};

export default AddpagentRules;
