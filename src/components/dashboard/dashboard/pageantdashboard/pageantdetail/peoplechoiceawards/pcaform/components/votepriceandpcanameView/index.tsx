import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FloatingInput from '../../../../../../../../common/floatinginput';
import translations from '../../../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import {ConTwoDecDigit} from '../../../../../../../../utils/helperFunction';
import {toast, toastType} from '../../../../../../../../common/commonalert';
import { removeEmojis } from '../../../../../../../../utils/validations';

const VotePriceAndPcaName = ({
  pcaData,
  pcaError,
  activateContestent,
  onChangePcaData,
  scrollOnKeybordOpen,
}) => {
  const [pcaNameRef, setPcaNameRef] = useState();
  const inactiveTextField = () => {
    if (!activateContestent) {
      toast(
        translations.ACTIVATE_YOUR_CONTEST_TO_SET_THE +
          translations.PER_VOTE_PRICE,
        toastType.ERROR_TOAST,
      );
    } else {
      return;
    }
  };
  return (
    <View
      style={{
        marginBottom: moderateScaleVertical(10),
        opacity: activateContestent ? 1 : 0.5,
      }}>
      <TouchableOpacity activeOpacity={1} onPress={inactiveTextField}>
        <FloatingInput
          floatingText={translations.PER_VOTE_PRICE}
          setText={value =>
            onChangePcaData({perVotePrice: ConTwoDecDigit(value)})
          }
          value={pcaData.perVotePrice}
          isMandatory
          returnKeyType={'next'}
          nextField={pcaNameRef}
          isEditable={activateContestent}
          keyboardType={'numeric'}
          errorMsg={pcaError?.perVotePrice}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!activateContestent) {
            toast(
              translations.ACTIVATE_YOUR_CONTEST_TO_SET_THE +
                translations.PEOPLE_CHOICE_AWARDS_NAME,
              toastType.ERROR_TOAST,
            );
          }
        }}>
        <FloatingInput
          setRef={setPcaNameRef}
          floatingText={translations.PEOPLE_CHOICE_AWARDS_NAME}
          setText={value => onChangePcaData({pcaname: removeEmojis(value)})}
          value={pcaData.pcaname}
          isMandatory
          returnKeyType={'done'}
          isEditable={activateContestent}
          errorMsg={pcaError?.pcaname}
          maxLength={150}
          onCustomFocus={scrollOnKeybordOpen}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VotePriceAndPcaName;
