// Importing required components and modules
import {SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import {
  EDIT_CROWN_CONVO,
  GET_CROWN_CONVO_CATEGORY_LIST,
  GET_MASTER_DATA,
  SAVE_CROWN_CONVO_POST,
  UPDATE_CROWN_CONVO_POST,
} from '../../../../services/endpoints';
import {
  categoryData,
  reportCategory,
} from '../../../../services/models/convo/reportcategoryList';
import {useSetLoader} from '../../../../store/useAppStore';
import CrownConvoForm from './components/crownconvoform';
import useCgMutation from '../../../../services/api/useCgMutation';
import {MASTERDATA} from '../../../utils/enum';
import {checkIsConnected} from '../../../utils/helperFunction';
import {YearName} from '../../../../services/models/pageantdetails/yearName';
import {ConvoButtonTypes, MethodTypes} from '../../../../services/constants';
import CustomButton from '../../../common/button';
import {getConvoDetails} from '../../../../services/models/convo/convoformdetails';
import {useKeyboard} from '@react-native-community/hooks';

const AddCrownConvo = props => {
  // Extracting parameters from props
  const {
    isAdd = true,
    fromBottomTab = false,
    postId,
  } = props?.route?.params ?? {};

  // State variables
  const [categoryList, setCategoryList] = useState<categoryData>();
  const [yearsList, setYearsList] = useState<YearName>();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [buttonType, setButtonType] = useState('');
  const [crownConvoDetails, setCrownConvoDetails] = useState<getConvoDetails>();
  const [postStatus, setPostStatus] = useState();
  const {keyboardShown} = useKeyboard();
  const setLoader = useSetLoader();

  // Function to check internet connection
  const checkInterNet = () => {
    return checkIsConnected();
  };

  // API GET CATEGORY LIST----------------------------------------- START
  // Fetching category list using a custom hook `useCgMutation`
  const {mutateAsync: getCategoryData} = useCgMutation<reportCategory>({
    key: GET_CROWN_CONVO_CATEGORY_LIST,
    url: GET_CROWN_CONVO_CATEGORY_LIST,
    offSuccessToast: true,
    method: MethodTypes.GET,
  });
  // API GET CATEGORY LIST----------------------------------------- END

  // API GET MASTER DATA----------------------------------------- START
  // Fetching master data (years list) using a custom hook `useCgMutation`
  const {mutateAsync: getMasterDetails, isLoading} = useCgMutation<YearName[]>({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.YEARS}`,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  // API GET MASTER DATA-------------------------------------------- END

  // API EDIT CONVO----------------------------------------- START
  // Fetching crown convo details for editing using a custom hook `useCgMutation`
  const {mutateAsync: getEditCrownConvoDetails} =
    useCgMutation<getConvoDetails>({
      key: EDIT_CROWN_CONVO + postId,
      url: EDIT_CROWN_CONVO + postId,
      offSuccessToast: true,
      method: MethodTypes.GET,
      disableLoader: true,
    });
  // API  EDIT CONVO-------------------------------------------- END

  // useEffect hook to fetch initial data when the component mounts
  useEffect(() => {
    if (isAdd) {
      getCategoryList();
    } else {
      getCategoryList();
      hitEditCrownConvoAPI();
    }
  }, []);

  // Function to fetch category list
  const getCategoryList = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const response = await getCategoryData();
      if (response.success) {
        console.log(response.data, isAdd, 'categories list');
        setCategoryList(response.data);
        hitMasterDetailsAPI();
      } else {
        setLoader(false);
      }
    }
  };

  // Function to fetch master data (years list)
  const hitMasterDetailsAPI = async () => {
    const res = await getMasterDetails();
    if (res.success) {
      setYearsList(res.data?.master_records?.years);
    }
    setLoader(false);
  };

  // Function to fetch crown convo details for editing
  const hitEditCrownConvoAPI = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const resp = await getEditCrownConvoDetails();
      if (resp.success) {
        setCrownConvoDetails(resp.data);
        setPostStatus(resp.data?.status);
        hitMasterDetailsAPI();
      } else {
        setLoader(false);
      }
    }
  };

  // Function to handle button click and determine the button type
  const onPressButton = (type: string) => {
    if (isAdd) {
      setButtonType(type);
    } else if (
      (!isAdd && postStatus == 2) ||
      type === ConvoButtonTypes.SAVE_AS_DRAFT
    ) {
      setButtonType(type);
    } else {
      setButtonType(ConvoButtonTypes.UPDATE_POST);
    }
    setButtonClicked(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Component */}
      <Header
        lable={
          isAdd ? translations.ADD_CROWN_CONVO : translations.EDIT_CROWN_CONVO
        }
        isUnderLineRequired
        rightText={translations.SAVE_AS_DRAFT}
        onPressRightText={() => onPressButton(ConvoButtonTypes.SAVE_AS_DRAFT)}
      />

      {/* Crown Convo Form Component */}
      <CrownConvoForm
        type={isAdd ? translations.ADD : translations.EDIT}
        postId={postId}
        fromBottomTab={fromBottomTab}
        categoriesData={categoryList}
        yearsData={yearsList}
        isButtonPressed={isButtonClicked}
        setButtonClicked={setButtonClicked}
        buttonType={buttonType}
        crownConvoDetails={crownConvoDetails}
        savePostUrl={isAdd ? SAVE_CROWN_CONVO_POST : UPDATE_CROWN_CONVO_POST}
        imageUrl={crownConvoDetails?.image_url}
        isLoading={isLoading}
      />

      {/* Custom Button Component */}
      {!keyboardShown && (
        <View style={styles.buttonArea}>
          <CustomButton
            label={
              isAdd || postStatus == 2 ? translations.POST : translations.UPDATE
            }
            onPress={() => onPressButton(ConvoButtonTypes.PUBLISH)}
            inactive={true}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddCrownConvo;
