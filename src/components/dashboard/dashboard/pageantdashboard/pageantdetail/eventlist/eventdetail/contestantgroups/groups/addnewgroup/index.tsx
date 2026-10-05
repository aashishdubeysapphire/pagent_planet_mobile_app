import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../../../../../../../common/header';
import translations from '../../../../../../../../../../assets/translations';
import {styles} from './styles';
import FloatingInput from '../../../../../../../../../common/floatinginput';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {
  EDIT_GROUP,
  CREATE_NEW_GROUP,
} from '../../../../../../../../../../services/endpoints';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../../store/useAppStore';
import {GROUP, REFESH_SCREEN} from '../../../../../../../../../utils/enum';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../../root/screenname';

import {SafeAreaView} from 'react-native-safe-area-context';
import FloatingBigInput from '../../../../../../../../../common/floatingbiginput';
import { removeEmojis } from '../../../../../../../../../utils/validations';

const AddNewGroup = props => {
  const {id, setGroupName = () => {}} = props?.route?.params;

  const setLoader = useSetLoader();
  const setScreenRefresh = useSetScreenRefresh();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastNameRef, setLastNameRef] = useState('');
  const [lastname, setLastname] = useState('');
  const [DescriptionErr, setDescriptionErr] = useState('');
  const [firstNameErr, setFirstNameErr] = useState('');
  useEffect(() => {
    if (props.route.params.id===GROUP.EDIT_GROUP) {
      setFirstName(props.route.params.name);
      setLastname(props.route.params.description);
    }
  }, []);

  const updateBody = {
    event_id: props.route.params.eventId,
    name: firstName,
    description: lastname,
  };
  const updateEditBody = {
    event_id: props.route.params.eventId,
    name: firstName,
    description: lastname,
    group_id: props.route.params.groupId,
  };
  const {mutateAsync: addNewGroup} = useCgMutation({
    key: CREATE_NEW_GROUP,
    url: CREATE_NEW_GROUP,
    body: updateBody,
    isJson: true,
    offSuccessToast: false,
  });

  const {mutateAsync: editGroup} = useCgMutation({
    key: EDIT_GROUP,
    url: EDIT_GROUP,
    body: updateEditBody,
    isJson: true,
    offSuccessToast: false,
  });
  const validation = () => {
    !!firstName
      ? setFirstNameErr('')
      : setFirstNameErr(translations.THIS_FIELD_REQUIRED);
    if (!!lastname) {
      lastname.length > 0 && lastname.length < 5
        ? setDescriptionErr(translations.DESCRIPTION_ERROR)
        : setDescriptionErr('');
    }

    if (!!firstName && !lastname) {
      return true;
    } else if (!!firstName && !!lastname) {
      if (lastname.length >= 5) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const hitaddNewGroup = async () => {
    const res = await addNewGroup();
    if (res.success) {
      setScreenRefresh(REFESH_SCREEN.GROUP_LIST);
      setScreenRefresh(REFESH_SCREEN.GROUP_CONTESTANT_LIST);

      navigation.goBack();
    }
    setLoader(false);
  };
  const hitEditGroup = async () => {
    const res = await editGroup();
    if (res.success) {
      setScreenRefresh(REFESH_SCREEN.GROUP_LIST);
      setGroupName(firstName);
      navigation.goBack();
    }
    setLoader(false);
  };
  const onSave = async () => {
    if (validation()) {
      setLoader(true);
      if (id===GROUP.ADD_GROUP) {
        hitaddNewGroup();
      } else if (id===GROUP.EDIT_GROUP) {
        hitEditGroup();
      }
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        lable={
          id === GROUP.ADD_GROUP
            ? SCREEN.ADD_GROUP
            : `Edit ${props.route.params.name}`
        }
        rightText={translations.SAVE}
        onPressRightText={onSave}
        isUnderLineRequired
      />
      <View style={styles.subContainer}>
        <FloatingInput
          floatingText={translations.GROUP_NAME}
          value={firstName}
          maxLength={50}
          nextField={lastNameRef}
          returnKeyType={'next'}
          isMandatory
          setText={value => setFirstName(removeEmojis(value))}
          autoCapitalize={'sentences'}
          errorMsg={firstNameErr}
        />
        <FloatingBigInput
          floatingText={translations.DESCRIPTION}
          value={lastname}
          setRef={setLastNameRef}
          returnKeyType={'done'}
          setText={value => setLastname(removeEmojis(value))}
          autoCapitalize={'sentences'}
          multiline={true}
          maxLength={250}
          numberOfLines={5}
          textAlignVertical={'top'}
          lengthCheck={true}
          forMultiline={true}
          showLength={false}
          errorMsg={DescriptionErr}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddNewGroup;
