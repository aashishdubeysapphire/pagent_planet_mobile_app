import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../../../../../../common/header';
import translations from '../../../../../../../../assets/translations';
import AddEventComp from './components/addeventcomponent';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import {
  CREATE_NEW_PAGEANT_EVENT,
  UPDATE_PAGENAT_EVENT,
} from '../../../../../../../../services/endpoints';
import {ADD_EVENT_INFO_ARRAY} from './localArray';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../root/screenname';
import CelebrationView from './components/celebrationview';

const AddPageantEvent = props => {
  const {pageantDetail, showPCAWarningMessage, tapHere} = props.route?.params;
  const [isSavePressed, setIsSavePressed] = useState(false);
  const [addContestentMsg, setAddContestentMsg] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const saveButtonPressed = () => {
    setIsSavePressed(true);
  };
  const [addBody, setAddBody] = useState();
  const [isSaveActive, setIsSaveActive] = useState(true);
  const [eventId, setEventId] = useState(pageantDetail?.id);
  const navigation = useNavigation();

  const {mutateAsync: createNewPagentEvent} = useCgMutation({
    key: CREATE_NEW_PAGEANT_EVENT,
    url: CREATE_NEW_PAGEANT_EVENT,
    body: addBody,
    disableLoader: true,
  });

  const {mutateAsync: updateEvent} = useCgMutation({
    key: UPDATE_PAGENAT_EVENT,
    url: UPDATE_PAGENAT_EVENT,
    body: addBody,
    disableLoader: true,
  });

  const onButtonPressed = () => {
    navigation.navigate(SCREEN.ADD_PAGEANT, {
      pageantEventDetail: pageantDetail,
      pageantId: pageantDetail?.id,
      isEdit: true,
    });
  };
  const stableSetIsSavePressed = useMemo(() => setIsSavePressed, []);
  const stableSetAddBody = useMemo(() => setAddBody, []);
  const stableSetIsSaveActive = useMemo(() => setIsSaveActive, []);
  const stableSetAddContestentMsg = useMemo(() => setAddContestentMsg, []);
  const stableSetShowCelebration = useMemo(() => setShowCelebration, []);
  const stableSetEventId = useMemo(() => setEventId, []);

  const stableCreate = useMemo(
    () => createNewPagentEvent,
    [createNewPagentEvent],
  );
  const stableUpdate = useMemo(() => updateEvent, [updateEvent]);

  // Optional: memoize complex props if needed
  const stablePageantDetail = useMemo(() => pageantDetail, [pageantDetail]);
  console.log('AddPageantEvent rerendering');
  return (
    <SafeAreaView style={styles.mainContainer}>
      {!showCelebration ? (
        <>
          <Header
            lable={
              props.route.params.isEditting
                ? translations.EDIT_EVENT_SMALL
                : translations.ADD_EVENT_SMALL
            }
            rightText={translations.SAVE}
            onPressRightText={() => saveButtonPressed()}
            isUnderLineRequired
            isSaveActive={isSaveActive}
            infoIcon={true}
            infoDataArray={ADD_EVENT_INFO_ARRAY}
            buttonOnModal={true}
            screenName={translations.ADD_EVENT_SMALL}
            onModalButtonPress={onButtonPressed}
          />
          <AddEventComp
            isEditting={props.route.params?.isEditting ?? false}
            pageantDetail={stablePageantDetail}
            isSavePressed={isSavePressed}
            setIsSavePressed={stableSetIsSavePressed}
            setAddBody={stableSetAddBody}
            createNewPagentEvent={stableCreate}
            updateEvent={stableUpdate}
            setIsSaveActive={stableSetIsSaveActive}
            showPCAWarningMessage={showPCAWarningMessage}
            tapHere={tapHere}
            pageantPlanDetail={props.route.params.pageantPlanDetail}
            isSaveActive={isSaveActive}
            setAddContestentMsg={stableSetAddContestentMsg}
            setShowCelebration={stableSetShowCelebration}
            setEventId={stableSetEventId}
          />
        </>
      ) : (
        <CelebrationView msg={addContestentMsg} id={eventId} />
      )}
    </SafeAreaView>
  );
};

export default AddPageantEvent;
