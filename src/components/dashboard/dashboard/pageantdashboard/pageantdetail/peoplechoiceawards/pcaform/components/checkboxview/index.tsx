import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import styles from './styles';
import {color} from '../../../../../../../../../assets/colorConstant';
import translations from '../../../../../../../../../assets/translations';
import WarningModel from '../../../../../../../../common/warningmodel';
import {toast, toastType} from '../../../../../../../../common/commonalert';

const CheckBoxView = ({
  activateContestent,
  oneWinnerAllAge,
  setOneWinnerAllAge,
  hideLastName,
  setHideLastName,
  hideVotes,
  setHideVotes,
  halfPrice,
  sethalfPrice,
  onChangePcaData,
  onChangePcaError,
}) => {
  const [isHalfPriceWarningMoadlVisible, setIsHalfPriceWarningMoadlVisible] =
    useState(false);
  const [isHideVotesWarningModal, setIsHideVotesWarningModal] = useState(false);
  const [profibitlty, setProfibitlty] = useState(false);
  const TickImageWithlable = ({lable, onPress, bool}) => {
    return (
      <View style={styles.mainView}>
        {bool ? (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imgView}
              onPress={() => onPress(!bool)}>
              <View style={styles.imageView}>
                <AppImages.PCA.checkBoxselected />
              </View>
              <Text
                style={{
                  ...styles.lableStylesUnselected,
                  color: color.INPUT_TEXT,
                }}>
                {lable}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imgView}
              onPress={() => onPress(!bool)}>
              <View style={styles.imageView}>
                <AppImages.PCA.checkBoxunselected />
              </View>
              <Text style={styles.lableStylesUnselected}>{lable}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };
  const onModalConfirm = () => {
    onChangePcaData({
      halfPriceStartDate: '',
      halfPriceEndDate: '',
    });
    onChangePcaError({
      halfPriceStartDate: '',
      halfPriceEndDate: '',
    });
    sethalfPrice(true);
  };

  const onPresshalfVotes = bool => {
    if (halfPrice) {
      sethalfPrice(false);
    } else {
      setIsHalfPriceWarningMoadlVisible(true);
    }
  };
  const onPressHideVotes = bool => {
    if (activateContestent) {
      hideVotes ? setHideVotes(false) : setIsHideVotesWarningModal(true);
    } else {
      hideVotes
        ? setHideVotes(false)
        : toast(
            translations.ACTIVATE_THE_CONTEST_TO_HIDE_VOTES,
            toastType.ERROR_TOAST,
          );
    }
  };

  const profibiltyConfirm = () => {
    setHideVotes(true);
    onChangePcaData({
      contestentSortBy: translations.NUMBER_OF_VOTES,
      showPredictiveMatrix: translations.YES,
    });
  };
  const hideVotesModalConfirmation = () => {
    setTimeout(() => {
      setProfibitlty(true);
    }, 500);
  };
  return (
    <View style={styles.bottomHeight}>
      <TickImageWithlable
        lable={translations.ONE_WINNER_ALL_AGE_GROUPS}
        onPress={setOneWinnerAllAge}
        bool={oneWinnerAllAge}
      />
      <TickImageWithlable
        lable={translations.HIDE_CONSTESENT_LAST_NAME}
        onPress={setHideLastName}
        bool={hideLastName}
      />
      <TickImageWithlable
        lable={translations.HIDE_VOTES_ON_EVERY_PROFILE}
        onPress={onPressHideVotes}
        bool={hideVotes}
      />
      <TickImageWithlable
        lable={translations.HALF_PRICE_VOTES}
        onPress={onPresshalfVotes}
        bool={halfPrice}
      />
      <WarningModel
        msg={translations.HALF_PRICE_WARNING}
        isModalVisible={isHalfPriceWarningMoadlVisible}
        setConfirm={onModalConfirm}
        setIsModalVisible={setIsHalfPriceWarningMoadlVisible}
        headingStyle={styles.modalHeading}
      />
      <WarningModel
        msg={translations.CHANGING_THE_SETTINGS_MIGHT_IMPACT_YOUR_PORIFBILITY}
        isModalVisible={isHideVotesWarningModal}
        setConfirm={hideVotesModalConfirmation}
        setIsModalVisible={setIsHideVotesWarningModal}
        headingStyle={styles.modalHeading}
      />

      <WarningModel
        msg={translations.DIRECTORS_WHO_SHOW_THEIR_VOTES}
        isModalVisible={profibitlty}
        setConfirm={profibiltyConfirm}
        setIsModalVisible={setProfibitlty}
        headingStyle={styles.modalHeading}
      />
    </View>
  );
};

export default CheckBoxView;
