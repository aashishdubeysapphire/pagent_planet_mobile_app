import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import AppImages from '../../../../../assets/images/AppImages';
import FloatingDropdown from '../../../../common/floatingdropown';
import Modal from 'react-native-modal';
import {checkIsNull} from '../../../../utils/validations';
import FloatingBigInput from '../../../../common/floatingbiginput';
import CustomButton from '../../../../common/button';
import ViewConcern from '../viewconcern';
import useHtQuery from '../../../../../services/api/useHtQuery';
import {
  GET_DISPUTE_REASON,
  RAISE_DISPUTE_ON_PRODUCT,
} from '../../../../../services/endpoints';
import {categoryData} from '../../../../../services/models/convo/reportcategoryList';
import {MethodTypes} from '../../../../../services/constants';
import useCgMutation from '../../../../../services/api/useCgMutation';
import DisputeDropDown from '../disputedropdown';
import {
  checkIsConnected,
  dontAcceptEmoji,
  emptyFunction,
  keyBoardManager,
} from '../../../../utils/helperFunction';
import {DressOrderDispute} from '../../../../../services/models/myorders/myOrdersList';
import {ActivityIndicator} from 'react-native-paper';
import {color} from '../../../../../assets/colorConstant';
import {moderateScale} from '../../../../utils/responsiveSize';

interface Props {
  isModalVisible: boolean;
  setModalVisible: Function;
  type: string;
  productId: number;
  viewConcernDetails?: DressOrderDispute;
  refetchAPI: Function;
}

const RaiseConcernModal = ({
  isModalVisible,
  setModalVisible,
  type,
  productId,
  viewConcernDetails,
  refetchAPI,
}: Props) => {
  const [reasonType, setReasonType] = useState('');
  const [reasonId, setReasonId] = useState(0);
  const [reasonErr, setReasonErr] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loader, setLoader] = useState(false);

  //API GET DISPUTE REASON ----------------------------------------- START
  const {data} = useHtQuery<categoryData>({
    key: GET_DISPUTE_REASON,
    url: GET_DISPUTE_REASON,
    offSuccessToast: true,
  });
  //API GET GET DISPUTE REASON ----------------------------------------- END

  const disputeBody = {
    item_id: productId,
    dispute_reason: reasonId,
    dispute_comment: description?.trim()?.replace(/[\u{0080}-\u{10FFFF}]/gu,""),
  };

  //API POST DISPUTE REASON ----------------------------------------- START
  const {mutateAsync: hitRaiseDisputeAPI} = useCgMutation({
    key: RAISE_DISPUTE_ON_PRODUCT,
    url: RAISE_DISPUTE_ON_PRODUCT,
    method: MethodTypes.Post,
    disableLoader: true,
    body: disputeBody,
    offSuccessToast: false,
  });
  // API POST DISPUTE REASON --------------------------------------------END

  useEffect(() => {
    keyBoardManager();
  }, []);

  const closeModal = () => {
    if (!loader) {
      setModalVisible(false);
      setReasonId(0);
      setReasonType('');
      setDescription('');
      setReasonErr('');
      setDescriptionErr('');
      setSelectedItem();
      setDropdownVisible(false);
    }
  };

  const isValid = (Data: string, setError: Function) => {
    if (checkIsNull(Data)) {
      return true;
    } else {
      setError(translations.THIS_FIELD_REQUIRED);
      return false;
    }
  };

  const checkValidations = () => {
    isValid(reasonType, setReasonErr);
    isValid(description.trim(), setDescriptionErr);
    return (
      isValid(reasonType, setReasonErr) &&
      isValid(description.trim(), setDescriptionErr)
    );
  };

  const confirmButtonPressed = async () => {
    if (checkIsConnected() && checkValidations()) {
      setLoader(true);
      const res = await hitRaiseDisputeAPI();
      if (res.success) {
        closeModal();
        refetchAPI();
      }
      setTimeout(() => {
        setLoader(false);
      }, 1800);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.45}
      useNativeDriver={true}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={900}
      animationOutTiming={900}
      coverScreen={true}
      hasBackdrop={true}
      onBackdropPress={() => closeModal()}
      onBackButtonPress={() => closeModal()}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.crossIconStyle}
          onPress={() => closeModal()}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
        <View style={styles.middleSection}>
          <Text style={styles.headerLabel}>{type}</Text>
          {type === translations.RAISE_A_CONCERN ? (
            <>
              <FloatingDropdown
                floatingText={translations.REASON_}
                value={reasonType}
                dropdown={true}
                isMandatory={true}
                setText={value => setReasonType(value)}
                onPressDropdown={() => {
                  loader
                    ? emptyFunction()
                    : setDropdownVisible(!dropdownVisible);
                }}
                onFieldFocus={() => {
                  loader
                    ? emptyFunction()
                    : setDropdownVisible(!dropdownVisible);
                }}
                errorMsg={reasonErr}
                rightIcon={
                  dropdownVisible ? (
                    <AppImages.Dashboard.HeaderDropdownIcon
                      style={{transform: [{rotate: '180deg'}]}}
                    />
                  ) : (
                    <AppImages.Dashboard.HeaderDropdownIcon />
                  )
                }
              />
              {dropdownVisible ? (
                <DisputeDropDown
                  dropdownList={data?.data}
                  setReasonType={setReasonType}
                  setReasonId={setReasonId}
                  setDropdownVisible={setDropdownVisible}
                  setReasonError={setReasonErr}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              ) : null}
              <FloatingBigInput
                floatingText={translations.COMMENT}
                value={description}
                returnKeyType={'done'}
                multiline={true}
                numberOfLines={6}
                textAlignVertical={'top'}
                maxLength={250}
                setText={value => {
                  loader
                    ? emptyFunction()
                    : setDescription(dontAcceptEmoji(value));
                  if (checkIsNull(value)) {
                    setDescriptionErr('');
                  }
                }}
                forMultiline={true}
                autoCapitalize={'sentences'}
                showLength={false}
                isMandatory={true}
                errorMsg={descriptionErr}
                isMoreThan250={true}
                editable={loader ? false : true}
              />
            </>
          ) : (
            <ViewConcern
              reasonType={viewConcernDetails?.dispute_reason}
              comment={viewConcernDetails?.dispute_comment}
              disputeStatus={viewConcernDetails?.dispute_status}
            />
          )}
        </View>

        {type === translations.RAISE_A_CONCERN ? (
          <View style={styles.buttonStyles}>
            {!loader ? (
              <CustomButton
                label={translations.SUBMIT}
                onPress={() => confirmButtonPressed()}
                inactive={true}
                smallHeight
              />
            ) : (
              <View style={styles.overlayLoadingContainer}>
                <ActivityIndicator
                  size={moderateScale(20)}
                  animating={true}
                  color={color.WHITE}
                />
              </View>
            )}
          </View>
        ) : null}
      </View>
    </Modal>
  );
};

export default RaiseConcernModal;
