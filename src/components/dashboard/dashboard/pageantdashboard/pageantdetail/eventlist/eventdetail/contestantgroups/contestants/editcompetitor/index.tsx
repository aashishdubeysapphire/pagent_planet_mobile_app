import {View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../../../../../../common/header';
import translations from '../../../../../../../../../../assets/translations';
import {styles} from './styles';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {EDIT_EVENT_COMPETITOTR} from '../../../../../../../../../../services/endpoints';
import {useSetLoader} from '../../../../../../../../../../store/useAppStore';
import {internetState} from '../../../../../../../../../common/commonalert';
import {createFormData} from '../../../../../../../../../utils/helperFunction';
import {useNetInfo} from '@react-native-community/netinfo';
import {Base} from '../../../../../../../../../../services/models/base';
import {keyBoardManager} from '../../../../../../../../../utils/helperFunction';
import {SafeAreaView} from 'react-native-safe-area-context';
import FloatingInput from '../../../../../../../../../common/floatinginput';
import HeadShotImage from '../../../../../../../../../common/headshotimage';
import {LocalImage} from '../../../../../../../../../../services/models/localimage';
import {AddEventCompetitorRequest} from '../../../../../../../../../../services/models/event/AddEventCompetitorRequest';
import {Contestant} from '../../../../../../../../../../services/models/pageantdetails/contestant';
import CompetitorListModal from '../addcompetitor/components/competitorlistmodal';
import FloatingDropdown from '../../../../../../../../../common/floatingdropown';
import {useNavigation} from '@react-navigation/core';
import {useSetScreenRefresh} from '../../../../../../../../../../store/useAppStore';
import {REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import WarningModel from '../../../../../../../../../common/warningmodel';
import { removeEmojis } from '../../../../../../../../../utils/validations';

const EventEditConstestant = ({route}) => {
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const [isCompetitorListModalVisible, setCompetitorListModalVisible] =
    useState(false);
  const setScreenRefresh = useSetScreenRefresh();
  const netInfo = useNetInfo();
  const [competitor, setCompetitor] = useState<Contestant | undefined>();
  const [titleOfCompetitor, setTitleOfCompetitor] = useState('');
  const [competitorId, setCompetitorId] = useState(
    route.params.contestant.contestant_id,
  );
  const [imageData, setImageData] = useState<LocalImage>();
  const [isWarmingModelVisible, setWarningModal] = useState(false);
  const [isFormEdit, setFormEdit] = useState(false);

  const {mutateAsync: editCompetitorRequest} = useCgMutation<
    Base<AddEventCompetitorRequest>
  >({
    key: EDIT_EVENT_COMPETITOTR,
    url: EDIT_EVENT_COMPETITOTR,
    body: createFormData({
      pageant_contestant_id: route.params.contestant.pageant_contestant_id,
      pageant_id: route.params.contestant.pageant_id,
      age_division_id: route.params.contestant.age_division_id,
      contestant_id: competitorId,
      contestant_title: titleOfCompetitor.trim(),
      contestant_image: imageData === undefined ? '' : imageData,
    }),
    isJson: false,
    disableLoader: true,
    customHeader: {'Content-Type': 'multipart/form-data'},
  });

  useEffect(() => {
    keyBoardManager();
    const competitorOldData: Contestant = {
      text: route.params.contestant.name,
      id: competitorId,
      contestant_title:
        route.params.contestant.contestant_title !== null
          ? route.params.contestant.contestant_title + ''
          : '',
      pageant_contestant_id: route.params.contestant.pageant_contestant_id,
      pageant_id: route.params.contestant.pageant_id,
      age_division_id: route.params.contestant.age_division_id,
      image_with_path: route.params.contestant.final_image_url,
    };
    setCompetitor(competitorOldData);
    setTitleOfCompetitor(competitorOldData.contestant_title + '');
  }, []);

  const onSaveCompetitorClick = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      addCompetitorAPI();
    }
  };

  const addCompetitorAPI = async () => {
    setLoader(true);
    const response = await editCompetitorRequest();
    if (response.success) {
      navigation.goBack();
      setScreenRefresh(REFESH_SCREEN.EDIT_CONTASTENT_IN_EVENT);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  /**
   * The imagePickerResult function takes in a parameter of type LocalImage or undefined and returns a
   * function that sets the imageData state and calls the createRequest function.
   * @param {LocalImage | undefined} data - LocalImage | undefined
   */
  const imagePickerResult = (data: LocalImage | undefined) => {
    setImageData(data);

    setFormEdit(true);
  };

  /**
   * When the user clicks the confirm button, go back to the previous screen.
   */
  const onConfirmWarning = () => {
    navigation.goBack();
  };

  const onCompetitorSelection = (data: Contestant | undefined) => {
    setCompetitor(data);
    setCompetitorId(data?.id);

    setFormEdit(true);
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topContainer}>
        <Header
          lable={translations.EDIT_CONTESTANT_DETAILS}
          isUnderLineRequired
          rightText={translations.SAVE}
          onPressRightText={onSaveCompetitorClick}
          onPressBack={() => {
            if (isFormEdit) {
              setWarningModal(true);
            } else {
              navigation.goBack();
            }
          }}
        />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.itemRootContainer}>
            <FloatingDropdown
              floatingText={translations.NAME_OF_THE_COMPETITOR}
              value={competitor?.text !== undefined ? competitor?.text : ''}
              isMandatory
              onFieldFocus={() => {
                setCompetitorListModalVisible(true);
              }}
            />
            <FloatingInput
              floatingText={translations.TITLE_OF_THE_COMPETITOR}
              value={titleOfCompetitor}
              maxLength={50}
              setText={(value: string) => {
                setTitleOfCompetitor(removeEmojis(value));
                setFormEdit(true);
              }}
              returnKeyType={'done'}
              autoCapitalize={'none'}
            />
            {competitor?.image_with_path !== undefined && (
              <HeadShotImage
                onImageFound={imagePickerResult}
                displayHeadUrl={
                  route.params.contestant?.contestant_image === undefined ||
                  (route.params.contestant?.contestant_image !== undefined &&
                    route.params.contestant?.contestant_image.length > 0)
                }
                label={translations.UPLOAD_IMAGE}
                showNote={false}
                url={competitor?.image_with_path}
                heading={translations.UPLOAD_IMAGE}
                removeCameraOption
                isDisplayingEditIcon
              />
            )}

            <CompetitorListModal
              isModalVisible={isCompetitorListModalVisible}
              isDisableAdd
              setIsModalVisible={setCompetitorListModalVisible}
              onContestantClick={onCompetitorSelection}
              preSeelctedContestantID={
                competitor === undefined ? -1 : competitor.id
              }
            />
            <WarningModel
              msg={translations.THE_ADDED_CONTESTANTS_WILL_NOT_BE_SAVED}
              isModalVisible={isWarmingModelVisible}
              setConfirm={onConfirmWarning}
              setIsModalVisible={setWarningModal}
              headingStyle={styles.modalHeading}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EventEditConstestant;
