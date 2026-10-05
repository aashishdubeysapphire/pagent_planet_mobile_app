import {View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../root/screenname';
import {UserContext} from '../../../store/userStore';
import useCgMutation from '../../../services/api/useCgMutation';
import {Base} from '../../../services/models/base';
import {IS_PCA_ACTIVE} from '../../../services/endpoints';
import {MethodTypes, Param} from '../../../services/constants';
import {getTagTypeLable} from '../../utils/helperFunction';
import {ROLES} from '../../utils/enum';

export enum DEEPLINK_TYPES {
  SHOP = 'shop',
  CONVO_POST = 'share',
  PAGEANT = 'pageant',
  EVENT = 'event',
  CONTESTANT_EXPERT = 'contestant_expert',
  CONTESTANT_VOTE = 'contestant_vote',
}

const FirebaseDeepLinkParser = () => {
  const navigation = useNavigation();
  const {storeData} = useContext(UserContext);
  const [pageantEventId, setEventId] = useState('');
  const isFocused = useIsFocused();
  const [isLinkFound, setLinkFound] = useState(false);
  const [eventContestantAgeDivisionID, setAgeDivisionId] = useState('');
  const [eventContestantId, setContestantId] = useState('');

  const {mutateAsync: getPcaState} = useCgMutation<Base<string>>({
    key:
      IS_PCA_ACTIVE +
      pageantEventId +
      Param.AGE_DIVISION_ID +
      eventContestantAgeDivisionID +
      Param.CONTESTANT_PARAM +
      eventContestantId,
    method: MethodTypes.GET,
    offSuccessToast: true,
    url:
      IS_PCA_ACTIVE +
      pageantEventId +
      Param.AGE_DIVISION_ID +
      eventContestantAgeDivisionID +
      Param.CONTESTANT_PARAM +
      eventContestantId,
  });

  const parseDeepLink = (link: string | undefined) => {
    if (link === null || link === undefined || link.length === 0) {
      return;
    }
    // ... (your entire parseDeepLink function remains unchanged)
  };

  const checkMoveOnVoteScreen = async (
    name: string | undefined,
    eventid: string | undefined,
    ageDivisionid: string | undefined,
    contestantid: string | undefined,
  ) => {
    let isPcaActiveResponse = await getPcaState();
    if (isPcaActiveResponse.success) {
      navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_EVENT_CONTESTANT_VOTE, {
        eventId: eventid,
        ageDivisionId: ageDivisionid,
        contentantName: name,
        contestantId: contestantid,
      });
    }
  };

  const handleDynamicLink = async (link: any) => {
    if (!isLinkFound) {
      setLinkFound(true);
      parseDeepLink(link?.url);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      setLinkFound(false);
    }
  }, [isFocused]);

  useEffect(() => {
    // Dynamically import and set up listener
    const setupDynamicLinks = async () => {
      const {default: dynamicLinks} = await import(
        '@react-native-firebase/dynamic-links'
      );

      // Set up onLink listener
      const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

      // Cleanup on unmount
      return () => unsubscribe();
    };

    setupDynamicLinks();
  }, [handleDynamicLink]);

  useEffect(() => {
    // Dynamically import and get initial link
    const getInitialDeepLink = async () => {
      const {default: dynamicLinks} = await import(
        '@react-native-firebase/dynamic-links'
      );

      const link = await dynamicLinks().getInitialLink();
      if (!isLinkFound && link) {
        setLinkFound(true);
        parseDeepLink(link.url);
      }
    };

    getInitialDeepLink();
  }, []);

  return <View />;
};

export default FirebaseDeepLinkParser;
