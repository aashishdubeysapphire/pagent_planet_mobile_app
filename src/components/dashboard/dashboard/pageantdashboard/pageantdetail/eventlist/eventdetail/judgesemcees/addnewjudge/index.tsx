import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../../../../../common/header';
import translations from '../../../../../../../../../assets/translations';
import {styles} from './styles';
import FloatingInput from '../../../../../../../../common/floatinginput';
import HeadShotImage from '../../../../../../../../common/headshotimage';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import {
  CREATE_NEW_EMCEES,
  CREATE_NEW_JUDGE,
} from '../../../../../../../../../services/endpoints';
import {createFormData} from '../../../../../../../../utils/helperFunction';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../store/useAppStore';
import {JUDGES_EMCEES, REFESH_SCREEN} from '../../../../../../../../utils/enum';
import {useNavigation} from '@react-navigation/core';
import {Base} from '../../../../../../../../../services/models/base';
import {NewJudgeEmcee} from '../../../../../../../../../services/models/pageantsData/getAllJudgesEmcess';
import { removeEmojis } from '../../../../../../../../utils/validations';

const AddNewJudge = props => {
  const {id} = props.route.params;
  const setLoader = useSetLoader();
  const setScreenRefresh = useSetScreenRefresh();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastNameRef, setLastNameRef] = useState('');
  const [lastname, setLastname] = useState('');
  const [imageData, setImageData] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  const [lastnameErr, setLastnameErr] = useState('');

  const imagePickerResult = data => {
    setImageData(data);
  };
  const updateImageBody = {
    first_name: firstName,
    last_name: lastname,
    image: imageData,
  };
  const {mutateAsync: addNewJudge} = useCgMutation<Base<NewJudgeEmcee>>({
    key: CREATE_NEW_JUDGE,
    url: CREATE_NEW_JUDGE,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: false,
  });

  const {mutateAsync: addNewEmcess} = useCgMutation<Base<NewJudgeEmcee>>({
    key: CREATE_NEW_EMCEES,
    url: CREATE_NEW_EMCEES,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: false,
  });
  const validation = () => {
    !!firstName
      ? setFirstNameErr('')
      : setFirstNameErr(translations.THIS_FIELD_REQUIRED);
    !!lastname
      ? setLastnameErr('')
      : setLastnameErr(translations.THIS_FIELD_REQUIRED);

    if (!!firstName && !!lastname) {
      return true;
    } else {
      return false;
    }
  };
  const hitaddNewJudge = async () => {
    const res = await addNewJudge();
    if (res.success) {
      setScreenRefresh(REFESH_SCREEN.ADD_JUDDGE);
      navigation.goBack();
    }
    setLoader(false);
  };
  const hitaddNewEmcees = async () => {
    const res = await addNewEmcess();
    if (res.success) {
      setScreenRefresh(REFESH_SCREEN.ADD_EMCEES);
      navigation.goBack();
    }
    setLoader(false);
  };
  const onSave = async () => {
    if (validation()) {
      setLoader(true);
      if (id === JUDGES_EMCEES.JUDGES) {
        hitaddNewJudge();
      } else if (id === JUDGES_EMCEES.EMCEES) {
        hitaddNewEmcees();
      }
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        lable={
          id === JUDGES_EMCEES.JUDGES
            ? translations.ADD_NEW_JUDGE
            : translations.ADD_NEW_EMCEES
        }
        rightText={translations.SAVE}
        onPressRightText={onSave}
        isUnderLineRequired
      />
      <View style={styles.subContainer}>
        <FloatingInput
          floatingText={translations.FIRST_NAME}
          value={firstName}
          nextField={lastNameRef}
          returnKeyType={'next'}
          isMandatory
          setText={value => setFirstName(removeEmojis(value))}
          autoCapitalize={'sentences'}
          errorMsg={firstNameErr}
        />
        <FloatingInput
          floatingText={translations.LAST_NAME}
          value={lastname}
          setRef={setLastNameRef}
          returnKeyType={'done'}
          isMandatory
          setText={value => setLastname(removeEmojis(value))}
          autoCapitalize={'sentences'}
          errorMsg={lastnameErr}
        />
        {!!imageData && (
          <Text style={styles.uploadeImage}>{translations.UPLOAD_IMAGE}</Text>
        )}
        <HeadShotImage
          onImageFound={imagePickerResult}
          label={translations.UPLOAD_IMAGE}
          url={imageData}
          removeCameraOption
          msg={translations.DELETE_IMAGE}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddNewJudge;
