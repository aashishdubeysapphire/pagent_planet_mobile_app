import {View} from 'react-native';
import React from 'react';
import translations from '../../../../../../assets/translations';
import FloatingInput from '../../../../../common/floatinginput';
import FloatingBigInput from '../../../../../common/floatingbiginput';
import {keyBoardManager} from '../../../../../utils/helperFunction';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {
  doesParaContainersURL,
  removeEmojis,
} from '../../../../../utils/validations';
const Step3 = ({
  isNextPressed,
  setCurrentStep,
  setisNextPressed,
  onChangeStepThree,
  hitAddContestantDetailsApi,
}) => {
  const [data, setData] = React.useState({
    talent: '',
    ethinicity: '',
    funFacts: '',
    school: '',
    platform: '',
    currentOccupation: '',
    reason: '',
    bio: '',
  });
  const [aboutRef, setAboutRef] = React.useState('');
  const [ethinicityRef, setEthinicityRef] = React.useState('');
  const [funfactsRef, setFunfactsRef] = React.useState('');
  const [schoolRef, setSchoolRef] = React.useState('');
  const [currentOccupationRef, setCurrentOccupationRef] = React.useState('');
  const [platformRef, setPlatformRef] = React.useState('');
  const [reasonRef, setReasonRef] = React.useState('');
  //err variables
  const [talentErr, setTalentErr] = React.useState('');
  const [ethnicityErr, setEthnicityErr] = React.useState('');
  const [funFactErr, setFunFactErr] = React.useState('');
  const [schoolErr, setschoolErr] = React.useState('');
  const [platformErr, setPlatformErr] = React.useState('');
  const [currentOccupationErr, setCurrentOccupationErr] = React.useState('');
  const [reasonErr, setReasonErr] = React.useState('');
  const [aboutErr, setAboutErr] = React.useState('');

  React.useEffect(() => {
    keyBoardManager();
  }, []);
  React.useEffect(() => {
    if (isNextPressed) {
      isValid();
    }
    setisNextPressed(false);
  }, [isNextPressed]);
  React.useEffect(() => {
    onChangeStepThree(data);
  }, [data]);

  const checkValidField = (data, setErr) => {
    if (!!data) {
      if (doesParaContainersURL(data)) {
        setErr(translations.THIS_FILED_CANT_CONTAIN_A_LINK);
        return false;
      } else {
        setErr('');
        return true;
      }
    } else {
      setErr('');
      return true;
    }
  };
  const isValid = () => {
    if (
      checkValidField(data.talent, setTalentErr) &&
      checkValidField(data.ethinicity, setEthnicityErr) &&
      checkValidField(data.funFacts, setFunFactErr) &&
      checkValidField(data.reason, setReasonErr) &&
      checkValidField(data.school, setschoolErr) &&
      checkValidField(data.platform, setPlatformErr) &&
      checkValidField(data.currentOccupation, setCurrentOccupationErr) &&
      checkValidField(data.bio, setAboutErr)
    ) {
      onChangeStepThree(data);
      setCurrentStep(3);
      setisNextPressed(true);
      hitAddContestantDetailsApi();
    }
  };

  return (
    <View>
      <FloatingInput
        floatingText={translations.TALENT}
        value={data.talent}
        nextField={ethinicityRef}
        returnKeyType={'next'}
        autoCapitalize={'sentences'}
        errorMsg={talentErr}
        setText={value =>
          setData({
            ...data,
            talent: removeEmojis(value),
          })
        }
      />

      <FloatingInput
        floatingText={translations.ETHINICITY}
        value={data.ethinicity}
        nextField={funfactsRef}
        autoCapitalize={'sentences'}
        errorMsg={ethnicityErr}
        returnKeyType={'next'}
        setRef={ref => setEthinicityRef(ref)}
        nextField={funfactsRef}
        setText={value =>
          setData({
            ...data,
            ethinicity: removeEmojis(value),
          })
        }
      />

      <FloatingInput
        floatingText={translations.FUN_FACTS}
        value={data.funFacts}
        returnKeyType={'next'}
        setRef={ref => setFunfactsRef(ref)}
        nextField={schoolRef}
        keyboardType={'email-address'}
        setText={value =>
          setData({
            ...data,
            funFacts: removeEmojis(value),
          })
        }
        autoCapitalize={'sentences'}
        errorMsg={funFactErr}
      />

      <FloatingInput
        setRef={ref => setSchoolRef(ref)}
        returnKeyType={'next'}
        nextField={platformRef}
        autoCapitalize={'sentences'}
        errorMsg={schoolErr}
        floatingText={translations.SCHOOL}
        value={data.school}
        setText={value =>
          setData({
            ...data,
            school: removeEmojis(value),
          })
        }
      />
      <FloatingInput
        floatingText={translations.PLATFORM}
        value={data.platform}
        setRef={ref => setPlatformRef(ref)}
        returnKeyType={'next'}
        nextField={currentOccupationRef}
        setText={value =>
          setData({
            ...data,
            platform: removeEmojis(value),
          })
        }
        autoCapitalize={'sentences'}
        errorMsg={platformErr}
      />
      <FloatingInput
        floatingText={translations.CURRENT_OCCUPATION}
        value={data.currentOccupation}
        setRef={ref => setCurrentOccupationRef(ref)}
        returnKeyType={'next'}
        nextField={reasonRef}
        setText={value =>
          setData({
            ...data,
            currentOccupation: removeEmojis(value),
          })
        }
        autoCapitalize={'sentences'}
        errorMsg={currentOccupationErr}
      />
      <FloatingBigInput
        floatingText={translations.REASON}
        value={data.reason}
        setRef={ref => setReasonRef(ref)}
        returnKeyType={'next'}
        nextField={aboutRef}
        multiline={true}
        numberOfLines={5}
        textAlignVertical={'top'}
        lengthCheck={true}
        setText={value =>
          setData({
            ...data,
            reason: removeEmojis(value),
          })
        }
        forMultiline={true}
        autoCapitalize={'sentences'}
        showLength={false}
        errorMsg={reasonErr}
      />
      <FloatingBigInput
        floatingText={translations.ABOUT}
        value={data.bio}
        setRef={ref => setAboutRef(ref)}
        returnKeyType={'done'}
        multiline={true}
        numberOfLines={5}
        textAlignVertical={'top'}
        lengthCheck={true}
        setText={value =>
          setData({
            ...data,
            bio: removeEmojis(value),
          })
        }
        forMultiline={true}
        autoCapitalize={'sentences'}
        showLength={false}
        errorMsg={aboutErr}
      />

      <View
        style={{
          marginBottom: moderateScaleVertical(80),
        }}
      />
    </View>
  );
};

export default Step3;
