import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {color} from '../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {styles} from './styles';
import CustomButton from '../../../../../common/button';
import Header from '../../../../../common/header';
import {SafeAreaView} from 'react-native-safe-area-context';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {useNetInfo} from '@react-native-community/netinfo';
import {CLAIM_PROFILE} from '../../../../../../services/endpoints';
import {internetState} from '../../../../../common/commonalert';
import {ScrollView} from 'react-native-gesture-handler';
import WarningModel from '../../../../../common/warningmodel';
import FloatingBigInput from '../../../../../common/floatingbiginput';
import WelcomeModal from '../../../../dashboard/chooseprofiletype/welcomemodal';
import {isIosDevice, keyBoardManager} from '../../../../../utils/helperFunction';
import {removeEmojis} from '../../../../../utils/validations';
export const expertBenefits = [
  {
    title: translations.CONTACT,
    cover: AppImages.Common.Clients,
  },
  {
    title: translations.SELL,
    cover: AppImages.Common.SellIcon,
  },
  {
    title: translations.NETWORK,
    cover: AppImages.Common.CrownIcon,
  },
];
export const judgesBenefits = [
  {
    title: translations.GET_CONTACTED,
    cover: AppImages.Common.GetContacted,
  },
  {
    title: translations.NOMINATED,
    cover: AppImages.Common.AwardsIcon,
  },
  {
    title: translations.JOIN,
    cover: AppImages.Common.CrownIcon,
  },
];
export const pageantBenefits = [
  {
    title: translations.HOST,
    cover: AppImages.Common.HostIcon,
  },

  {
    title: translations.CONTACT,
    cover: AppImages.Common.Clients,
  },
  {
    title: translations.NOMINATED,
    cover: AppImages.Common.AwardsIcon,
  },
];
export const pageantBenefits2 = [
  {
    title: translations.SELL_TICKETS,
    cover: AppImages.Common.TicketIcon,
  },
  {
    title: translations.MANAGE,
    cover: AppImages.Common.Software,
  },
];
// SEE_WHO_VOTED: 'See Who Voted For You On People’s Choice',
// ATLEAST_10_CHAR: 'Please Enter At Least 10 Characters',
// CONTROL_DETAILS : 'Control The Details Your Judges See',
// SEE_TO_DO : "See To Do's From Your Director",
// RECEIVE_COACHING_TIPS : 'Receive Coaching Tips Via Pageant Weekly',
// QUALITY_FOR_BEST_IN_PAGEANTRY
export const contestantBenefits = [
  {
    title: translations.SEE_WHO_VOTED,
    cover: AppImages.Common.SEE_VOTE_ICON,
  },
  {
    title: translations.CONTROL_DETAILS,
    cover: AppImages.Common.CONTROL_DETAILS,
  },
  {
    title: translations.SEE_TO_DO,
    cover: AppImages.Common.TO_DO_FROM_DIRECTOR,
  },
  // {
  //   title: translations.RECEIVE_COACHING_TIPS,
  //   // cover: AppImages.Common.Software,
  //   cover: AppImages.Common.COACHING_TIPS,
  // },
  {
    title: translations.QUALITY_FOR_BEST_IN_PAGEANTRY,
    // cover: AppImages.Common.CrownIcon,
    cover: AppImages.Common.BEST_IN_PAGEANTRY,
  },
  // {
  //   title: translations.SELL_DRESS,
  //   cover: AppImages.Common.JewelleryIcon,
  // },
];
const ClaimProfile = props => {
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const [mergeDuplicateModalVisible, setMergeDuplicateModalVisible] =
    useState(false);
  const [description, setDescription] = useState('');
  const [isClaimModalVisible, setIsClaimModalVisible] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');

  const updateBody = {
    slug: props.route.params.slug,
    comment: description,
    profile_type: props.route.params.profileType,
  };
  const hitClaimProfile = async () => {
    const response = await claimProfile();
    if (response.success) {
      setDescription('');
      setTimeout(() => {
        setIsClaimModalVisible(true);
      }, 500);
    }
    Keyboard.dismiss();
    setLoader(false);
  };
  React.useEffect(() => {
    if (isIosDevice()) {
      keyBoardManager();
    }
  }, []);

  const validation = () => {
    if (description.trim().length < 10) {
      setDescriptionError(translations.ATLEAST_10_CHAR);
      return false;
    } else {
      setDescriptionError('');
      return true;
    }
  };

  //API CREATE EVENT PRIZES ----------------------------------------- START
  const onSave = async () => {
    if (validation()) {
      // if (
      //   storeData.data?.user.contestant &&
      //   props.route.params.profileType === translations.SMALL_CONTESTANT
      // ) {
      //   setMergeDuplicateModalVisible(true);
      // } else {
      hitClaimApi();
    }
  };
  const hitClaimApi = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);

      setTimeout(() => {
        hitClaimProfile();
      }, 1000);
    }
  };
  const {mutateAsync: claimProfile} = useCgMutation({
    key: CLAIM_PROFILE,
    url: CLAIM_PROFILE,
    body: updateBody,
    isJson: true,
    offSuccessToast: true,
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: color.WHITE,
      }}>
      <Header lable={translations.CLAIM} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.menuContainer}>
          <View style={styles.pinkView}>
            <Text style={styles.benefits}>{translations.BENIFITS_CLAIM}</Text>
            <View>
              <FlatList
                data={
                  props.route.params.profileType ===
                  translations.SMALL_CONTESTANT
                    ? contestantBenefits
                    : props.route.params.profileType ===
                      translations.PAGEANT_SMALL
                    ? pageantBenefits
                    : props.route.params.profileType ===
                        translations.BUSINESS &&
                      props?.route?.params?.role !==
                        translations.JUDGES_SMALL &&
                      props?.route?.params?.role !== translations.EMCEES_SMALL
                    ? expertBenefits
                    : judgesBenefits
                }
                keyExtractor={(x, i) => i.toString()}
                numColumns={3}
                nestedScrollEnabled={true}
                renderItem={({item, index}) => (
                  <>
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: color.WHITE,
                          // flex: index < 3 ? 1 : 0.5,
                        },
                        styles.container,
                      ]}>
                      {<item.cover height={moderateScaleVertical(24)} />}
                      <Text
                        style={
                          item.title !==
                          translations.QUALITY_FOR_BEST_IN_PAGEANTRY
                            ? styles.inactiveTitle3
                            : [styles.inactiveTitle3, {width: '60%'}]
                        }>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              />
              {props.route.params.profileType === translations.BUSINESS &&
              props?.route?.params?.role !== translations.JUDGES_SMALL &&
              props?.route?.params?.role !== translations.EMCEES_SMALL ? (
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: color.WHITE,
                    },
                    styles.container2,
                  ]}>
                  {
                    <AppImages.Common.AwardsIcon
                      height={moderateScaleVertical(24)}
                    />
                  }

                  <Text style={styles.inactiveTitle2}>
                    {translations.NOMINATED}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {props.route.params.profileType ===
                translations.PAGEANT_SMALL && (
                <FlatList
                  data={pageantBenefits2}
                  keyExtractor={(x, i) => i.toString()}
                  numColumns={2}
                  nestedScrollEnabled={true}
                  renderItem={({item, index}) => (
                    <>
                      <TouchableOpacity
                        style={[
                          {
                            backgroundColor: color.WHITE,
                          },
                          styles.containerItem,
                        ]}>
                        {<item.cover height={moderateScaleVertical(24)} />}

                        <Text style={styles.pageantBenefits}>{item.title}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                />
              )}
            </View>
          </View>
          <View style={styles.tellwhy}>
            <Text style={styles.why}>{translations.WHY}</Text>
          </View>
          <View style={styles.subContainer}>
            <FloatingBigInput
              floatingText={translations.DESCRIPTION}
              value={description}
              returnKeyType={'done'}
              multiline={true}
              numberOfLines={6}
              textAlignVertical={'top'}
              lengthCheck={true}
              maxLength={2000}
              setText={value => setDescription(removeEmojis(value))}
              forMultiline={true}
              autoCapitalize={'sentences'}
              showLength={false}
              isMandatory={true}
              errorMsg={descriptionError}
              isMoreThan250={true}
            />
          </View>
          <View
            style={{
              ...styles.sumbitButtonStyle,
              marginTop:
                props.route.params.profileType === translations.BUSINESS &&
                (props?.route?.params?.role === translations.JUDGES_SMALL ||
                  props?.route?.params?.role === translations.EMCEES_SMALL)
                  ? moderateScaleVertical(150)
                  : moderateScaleVertical(40),
            }}>
            <CustomButton
              label={translations.SUBMIT}
              inactive={true}
              onPress={() => {
                onSave();
              }}
              enableHaptic={true}
            />
          </View>
          <WarningModel
            msg={translations.MERGE_DUPLICATE}
            isModalVisible={mergeDuplicateModalVisible}
            setConfirm={() => {
              hitClaimApi();
            }}
            setCancel={() => setMergeDuplicateModalVisible(false)}
            setIsModalVisible={setMergeDuplicateModalVisible}
            headingStyle={styles.modalLabel1}
          />
          <WelcomeModal
            label={translations.CLAIM_SUBMITTED}
            bodyText={translations.CLAIM_REVIEW}
            icon={
              <AppImages.Common.tickIcon
                width={moderateScale(72)}
                height={moderateScaleVertical(72)}
              />
            }
            isModalVisible={isClaimModalVisible}
            buttonText={`${translations.MY_ACCOUNT?.toUpperCase()}`}
            isUploadModal={true}
            customStyles={styles.modalButtonBottom}
            giveStaticHeight={false}
            closeModal={setIsClaimModalVisible}
            isClaimModal={true}
            isPageant={true}
            isExpert={
              props.route.params.profileType === translations.BUSINESS
                ? true
                : false
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClaimProfile;
