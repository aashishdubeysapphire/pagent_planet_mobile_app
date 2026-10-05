import {View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import FloatingDropdown from '../../../common/floatingdropown';
import CustomBottomModal from '../../../common/custombottommodal';
import useCgMutation from '../../../../services/api/useCgMutation';
import {
  GET_REPORT_CATEGORY_LIST,
  REPORT_POST,
} from '../../../../services/endpoints';
import {MethodTypes} from '../../../../services/constants';
import {useSetLoader} from '../../../../store/useAppStore';
import {reportCategory} from '../../../../services/models/convo/reportcategoryList';
import FloatingBigInput from '../../../common/floatingbiginput';
import CustomButton from '../../../common/button';
import {Base} from '../../../../services/models/base';
import {useNavigation} from '@react-navigation/core';

const ReportPost = ({route}) => {
  const {id} = route?.params;
  const [reason, setReason] = useState({name: '', id: ''});
  const [reasonModal, setReasonModal] = useState(false);
  const [reasonModalList, setReasonModalList] = useState([]);
  const [comments, setComments] = useState('');
  const [reasonErr, setReasonErr] = useState('');
  const [commentErr, setCommentErr] = useState('');
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  useEffect(() => {
    hitGetCategoryList();
  }, []);
  const reportBody = {
    post_id: id,
    category_id: reason.id,
    comment: comments,
  };
  const {mutateAsync: getCategoryList} = useCgMutation<reportCategory>({
    key: GET_REPORT_CATEGORY_LIST,
    url: GET_REPORT_CATEGORY_LIST,
    method: MethodTypes.GET,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: reportPost} = useCgMutation<Base>({
    key: REPORT_POST,
    url: REPORT_POST,
    body: reportBody,
    disableLoader: true,
  });
  const hitGetCategoryList = async () => {
    setLoader(true);
    const response = await getCategoryList();
    if (response.success) {
      setReasonModalList(response.data);
    }
    setLoader(false);
  };

  const isReasonValid = () => {
    if (!!reason.name) {
      setReasonErr('');
      return true;
    } else {
      setReasonErr(translations.THIS_FIELD_REQUIRED);
      return false;
    }
  };
  const isCommentValid = () => {
    if (!!comments) {
      setCommentErr('');
      return true;
    } else {
      setCommentErr(translations.THIS_FIELD_REQUIRED);
      return false;
    }
  };
  const onSubmit = async () => {
    isReasonValid();
    isCommentValid();
    if (isReasonValid() && isCommentValid()) {
      setLoader(true);
      const res = await reportPost();
      if (res.success) {
        navigation.goBack();
      }
      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.REPORT_POST} isUnderLineRequired />
      <View style={styles.mainContiner}>
        <FloatingDropdown
          floatingText={translations.SELECT_THE_REASON}
          setText={value => setReason(value)}
          value={reason?.name}
          onFieldFocus={() => setReasonModal(true)}
          isMandatory={true}
          errorMsg={reasonErr}
        />
        <FloatingBigInput
          floatingText={translations.ADD_COMMENTS}
          value={comments}
          returnKeyType={'done'}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={'top'}
          lengthCheck={true}
          setText={value => setComments(value)}
          forMultiline={true}
          autoCapitalize={'sentences'}
          showLength={false}
          errorMsg={commentErr}
          isMandatory={true}
          isMoreThan250={true}
        />
        <CustomBottomModal
          isModalVisible={reasonModal}
          setIsModalVisible={val => {
            setReasonModal(val);
          }}
          data={reasonModalList}
          parentCallback={selectedText => {
            setReason(selectedText);
          }}
          heading={translations.SELECT_THE_REASON}
        />
        <View style={styles.buttonView}>
          <CustomButton
            label={translations.SUBMIT}
            inactive={true}
            onPress={onSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportPost;
