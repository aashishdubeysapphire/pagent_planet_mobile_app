import React, {useEffect, useRef, useState} from 'react';
import {View, BackHandler} from 'react-native';
import translations from '../../../../../assets/translations';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../styles';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../../common/header';
import StepOne from '../components/stepone';
import DigitalPrintStepTwo from '../components/steptwodigitalprint';
import SellStepsManager, {SELL_TABS} from '../components/stepview';
import {SCREEN} from '../../../../../root/screenname';
import {useSetLoader} from '../../../../../store/useAppStore';
import {SellAttributeData} from '../../../../../services/models/sellitems/stepOne/catgoryFields';
import {Base} from '../../../../../services/models/base';
import {GET_CATEGORY_FIELDS} from '../../../../../services/endpoints';
import {MethodTypes} from '../../../../../services/constants';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {ProductsData} from '../../../../../services/models/sellitems/myProducts';
import {keyBoardManager} from '../../../../utils/helperFunction';

export const SellTwoStep = ({route}) => {
  const setLoader = useSetLoader();

  const [step, setStep] = useState(1);
  const [completedStep, setCompletedStep] = useState(0);
  const [isNextClick, setNextClick] = useState(false);
  const scrollRef = useRef();
  const [prodcutDetail, setProductDetail] = useState<ProductsData>(
    route?.params?.product !== undefined
      ? route?.params?.product
      : {
          additionalImage: [],
          additional_images: [],
          result: {variable_fields: []},
        },
  );

  const [isTwoStepSell] = useState(true);
  const [prodcutAttrbute, setProdcutAttrbute] = useState<SellAttributeData>();

  const navigation = useNavigation();
  const netInfo = useNetInfo();
  useEffect(() => {
    keyBoardManager();
    hitGetCategoryFields();
    setProductDetail({
      ...prodcutDetail,
      additionalImage: [],
      product_id: prodcutDetail?.id,
      category_id:
        prodcutDetail.category_detail !== undefined
          ? prodcutDetail.category_detail.id
          : route?.params?.categery.id,
    });
  }, []);
  const {mutateAsync: getCategoryFields} = useCgMutation<
    Base<SellAttributeData>
  >({
    key: GET_CATEGORY_FIELDS,
    method: MethodTypes.Post,
    body: {
      category_id:
        prodcutDetail.category_detail !== undefined
          ? prodcutDetail.category_detail.id
          : route?.params?.categery.id,
    },
    url: GET_CATEGORY_FIELDS,
    disableLoader: true,
    offSuccessToast: true,
  });
  const hitGetCategoryFields = async () => {
    setLoader(true);
    const categoryRes = await getCategoryFields();
    if (categoryRes.success) {
      setProdcutAttrbute(categoryRes.data);
    }
    setLoader(false);
  };
  const moveToSellPriviewScreen = () => {
    setNextClick(!isNextClick);
  };
  const onStepComplete = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      return false;
    } else {
      if (
        step === SELL_TABS.STEP_ONE &&
        isTwoStepSell &&
        completedStep < SELL_TABS.STEP_THREE
      ) {
        setStep(SELL_TABS.STEP_THREE);
        scrollToTop();
      } else if (
        step === SELL_TABS.STEP_THREE ||
        completedStep === SELL_TABS.STEP_THREE
      ) {
        navigation.navigate(SCREEN.SELL_PRIVIEW, {previewData: prodcutDetail});
      }
    }
  };

  const scrollToTop = async () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const onPressBack = () => {
    backButtonHandled();
    return true;
  };

  const backButtonHandled = () => {
    if (step === SELL_TABS.STEP_THREE) {
      setStep(SELL_TABS.STEP_ONE);
    } else if (step === SELL_TABS.STEP_ONE) {
      navigation.goBack();
    }
  };
  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, [onPressBack]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <Header
          lable={
            prodcutDetail.category_detail !== undefined
              ? translations.SELL_ + prodcutDetail.category_detail.name
              : translations.SELL_ + route?.params?.categery?.name
          }
          rightText={translations.NEXT}
          onPressRightText={() => moveToSellPriviewScreen()}
          isUnderLineRequired
          onCustomPressBack={backButtonHandled}
        />
        <ScrollView ref={scrollRef} contentContainerStyle={{flexGrow: 1}}>
          <SellStepsManager
            currentTab={step}
            completedStep={completedStep}
            isTwoStep={isTwoStepSell}
            isEditProduct={
              route?.params?.isEditProductDetail !== undefined &&
              route?.params?.isEditProductDetail
            }
          />

          <>
            {step === SELL_TABS.STEP_ONE ? (
              <StepOne
                category={
                  prodcutDetail.category_detail !== undefined
                    ? prodcutDetail.category_detail
                    : route?.params?.categery
                }
                addEditRequest={prodcutDetail}
                completedStep={completedStep}
                setCompletedStep={setCompletedStep}
                setProductDetail={setProductDetail}
                isNextClick={isNextClick}
                sellAttributeData={prodcutAttrbute?.result}
                onStepComplete={onStepComplete}
                isEditProduct={
                  route?.params?.isEditProductDetail !== undefined &&
                  route?.params?.isEditProductDetail
                }
              />
            ) : (
              step === SELL_TABS.STEP_THREE && (
                <DigitalPrintStepTwo
                  categoryId={
                    prodcutDetail.category_id !== undefined
                      ? prodcutDetail.category_id
                      : route?.params?.categery?.id
                  }
                  addEditRequest={prodcutDetail}
                  completedStep={completedStep}
                  setCompletedStep={setCompletedStep}
                  setProductDetail={setProductDetail}
                  isNextClick={isNextClick}
                  onStepComplete={onStepComplete}
                  category={
                    prodcutDetail.category_detail !== undefined
                      ? prodcutDetail.category_detail
                      : route?.params?.categery
                  }
                  isEditProduct={
                    route?.params?.isEditProductDetail !== undefined &&
                    route?.params?.isEditProductDetail
                  }
                  sellAttributeData={prodcutAttrbute?.result}
                />
              )
            )}
          </>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SellTwoStep;
