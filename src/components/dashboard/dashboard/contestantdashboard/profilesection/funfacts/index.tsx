import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import {Contestant} from '../../../../../../services/models/pageantdetails/contestant';
import CommonTextInput from '../commontextinput';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {ApiStatusType, MethodTypes} from '../../../../../../services/constants';
import {UPDATE_CONTESTANT_DETAILS} from '../../../../../../services/endpoints';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {internetState} from '../../../../../common/commonalert';
import {useIsFocused} from '@react-navigation/core';
import {Base} from '../../../../../../services/models/base';
import {keyBoardManager} from '../../../../../utils/helperFunction';
import {useSetLoader} from '../../../../../../store/useAppStore';

interface Props {
  contestant?: Contestant;
  getUpatedDetailContestan: () => void;
  editable: boolean;
  setFunFactsLoading: Function;
}
const FunFacts = ({
  contestant,
  getUpatedDetailContestan: getContestantApi,
  editable,
  setFunFactsLoading,
}: Props) => {
  const netInfo = useNetInfo();
  const [talent, setTalent] = useState('');
  const [funFacts, setFunFacts] = useState('');
  const [school, setSchool] = useState('');
  const [nationality, setNationality] = useState('');
  const [pageantPlatform, setPageantPlatform] = useState('');
  const [competetion, setCompetetion] = useState('');
  const [occupation, setOccupation] = useState('');
  const [clicked, setClicked] = useState([false]);
  const [about, setAbout] = useState('');
  const [openTextInputIndex, setOpenTextInputIndex] = useState(0);
  const [updatedBody, setUpdateBody] = useState();
  const isFocus = useIsFocused();
  const setLoader = useSetLoader();

  useEffect(() => {
    closeAllOpenViews();
    setTalent(contestant?.talent!!);
    setFunFacts(contestant?.fun_facts!!);
    setSchool(contestant?.college_attend!!);
    setNationality(contestant?.complexion!!);
    setPageantPlatform(contestant?.pageant_plateform!!);
    setCompetetion(contestant?.start_in_pageant!!);
    setAbout(contestant?.bio!!);
    setOccupation(contestant?.occupation!!);
  }, [isFocus, contestant]);

  useEffect(() => {
    keyBoardManager();
  }, []);

  const {mutateAsync: updateContestantDetails} = useCgMutation<Base>({
    key: UPDATE_CONTESTANT_DETAILS,
    url: UPDATE_CONTESTANT_DETAILS,
    method: MethodTypes.Put,
    body: updatedBody,
  });

  const updateDetailsAPI = async () => {
    setLoader(true);
    setFunFactsLoading(true);
    const response = await updateContestantDetails();
    if (response.success || response.status_code === ApiStatusType.Success) {
      NetInfo.fetch().then(state => {
        if (state.isConnected || state.isInternetReachable) {
          getContestantApi();
        } else {
          internetState(netInfo.isConnected!!);
        }
      });
    }
    setTimeout(() => {
      setLoader(false);
      setFunFactsLoading(false);
    }, 2500);
  };

  const saveData = (Key: string, Value: string) => {
    const body = {
      key: Key,
      value: Value,
    };
    setUpdateBody(body);
    NetInfo.fetch().then(state => {
      if (state.isConnected || state.isInternetReachable) {
        updateDetailsAPI();
      } else {
        internetState(netInfo.isConnected!!);
      }
    });
  };

  const handlePress = (index: number) => {
    const click = [...clicked];
    click[index] = !click[index];
    if (index !== openTextInputIndex) {
      click[openTextInputIndex] = false;
      if (openTextInputIndex === 0) {
        setTalent(contestant?.talent!!);
      } else if (openTextInputIndex === 1) {
        setPageantPlatform(contestant?.pageant_plateform!!);
      } else if (openTextInputIndex === 2) {
        setOccupation(contestant?.occupation!!);
      } else if (openTextInputIndex === 3) {
        setSchool(contestant?.college_attend!!);
      } else if (openTextInputIndex === 4) {
        setCompetetion(contestant?.start_in_pageant!!);
      } else if (openTextInputIndex === 5) {
        setFunFacts(contestant?.fun_facts!!);
      } else if (openTextInputIndex === 6) {
        setNationality(contestant?.complexion!!);
      } else if (openTextInputIndex === 7) {
        setAbout(contestant?.bio!!);
      } else {
        setAbout('');
      }
    }
    setClicked(click);
    if (click[index] === true) {
      setOpenTextInputIndex(index);
    }
  };

  const closeAllOpenViews = () => {
    setClicked([false]);
    setOpenTextInputIndex(0);
  };

  return (
    <View style={styles.detailsArea}>
      <View style={styles.wrapper}>
        {contestant?.talent?.length !== 0 &&
          contestant?.talent !== '' &&
          contestant?.talent !== null && (
            <CommonTextInput
              label={translations.TALENT}
              setText={value => setTalent(value)}
              conditionVar={clicked[0]}
              index={0}
              info={
                talent === undefined ? '' + contestant?.talent : '' + talent
              }
              onPress={() => {
                handlePress(0);
              }}
              onSave={() => {
                saveData(translations.TALENT, talent);
              }}
              editable={editable}
            />
          )}

        {contestant?.pageant_plateform?.length !== 0 &&
          contestant?.pageant_plateform !== '' &&
          contestant?.pageant_plateform !== null && (
            <CommonTextInput
              label={translations.PAGEANT_PLATFORM}
              setText={value => setPageantPlatform(value)}
              conditionVar={clicked[1]}
              index={1}
              info={
                pageantPlatform === undefined
                  ? '' + contestant?.pageant_plateform
                  : '' + pageantPlatform
              }
              onPress={() => {
                handlePress(1);
              }}
              onSave={() => {
                saveData('pageant_plateform', pageantPlatform);
              }}
              editable={editable}
            />
          )}

        {contestant?.occupation?.length !== 0 &&
          contestant?.occupation !== '' &&
          contestant?.occupation !== null && (
            <CommonTextInput
              label={
                translations.WHAT_IS_THE_OCCUPATION +
                contestant?.owner?.first_name +
                '?'
              }
              setText={value => setOccupation(value)}
              conditionVar={clicked[2]}
              index={2}
              info={
                occupation === undefined
                  ? '' + contestant?.occupation
                  : '' + occupation
              }
              onPress={() => {
                handlePress(2);
              }}
              onSave={() => {
                saveData(translations.OCCUPATION, occupation);
              }}
              editable={editable}
            />
          )}

        {contestant?.college_attend?.length !== 0 &&
          contestant?.college_attend !== '' &&
          contestant?.college_attend !== null && (
            <CommonTextInput
              label={
                translations.WHICH_SCHOOL +
                contestant?.owner?.first_name +
                translations.ATTEND
              }
              setText={value => setSchool(value)}
              conditionVar={clicked[3]}
              index={3}
              info={
                school === undefined
                  ? '' + contestant?.college_attend
                  : '' + school
              }
              onPress={() => {
                handlePress(3);
              }}
              onSave={() => {
                saveData(translations.COLLEGE_ATTEND, school);
              }}
              editable={editable}
            />
          )}

        {contestant?.start_in_pageant?.length !== 0 &&
          contestant?.start_in_pageant !== '' &&
          contestant?.start_in_pageant !== null && (
            <CommonTextInput
              label={translations.WHY_COMPETING_IN_PAGEANT}
              setText={value => setCompetetion(value)}
              conditionVar={clicked[4]}
              index={4}
              info={
                competetion === undefined
                  ? '' + contestant?.start_in_pageant
                  : '' + competetion
              }
              onPress={() => {
                handlePress(4);
              }}
              onSave={() => {
                saveData(translations.START_IN_PAGEANT, competetion);
              }}
              editable={editable}
            />
          )}

        {contestant?.fun_facts?.length !== 0 &&
          contestant?.fun_facts !== '' &&
          contestant?.fun_facts !== null && (
            <CommonTextInput
              label={
                translations.FUN_FACTS_ABOUT + contestant?.owner?.first_name
              }
              setText={value => setFunFacts(value)}
              conditionVar={clicked[5]}
              index={5}
              info={
                funFacts === undefined
                  ? '' + contestant?.fun_facts
                  : '' + funFacts
              }
              onPress={() => {
                handlePress(5);
              }}
              onSave={() => {
                saveData(translations.SMALL_FUN_FACTS, funFacts);
              }}
              editable={editable}
            />
          )}

        {contestant?.complexion?.length !== 0 &&
          contestant?.complexion !== '' &&
          contestant?.complexion !== null && (
            <CommonTextInput
              label={
                translations.NATIONALITY + contestant?.owner?.first_name + ' ?'
              }
              index={6}
              setText={value => setNationality(value)}
              conditionVar={clicked[6]}
              info={
                nationality === undefined
                  ? '' + contestant?.complexion
                  : '' + nationality
              }
              onPress={() => {
                handlePress(6);
              }}
              onSave={() => {
                saveData(translations.COMPLEXION, nationality);
              }}
              editable={editable}
            />
          )}

        {contestant?.bio?.length !== 0 &&
          contestant?.bio !== '' &&
          contestant?.bio !== null && (
            <CommonTextInput
              label={translations.ABOUT}
              index={7}
              setText={value => setAbout(value)}
              conditionVar={clicked[7]}
              info={about === undefined ? '' + contestant?.bio : '' + about}
              onPress={() => {
                handlePress(7);
              }}
              onSave={() => {
                saveData(translations.SMALL_BIO, about);
              }}
              editable={editable}
            />
          )}
      </View>
    </View>
  );
};

export default FunFacts;
