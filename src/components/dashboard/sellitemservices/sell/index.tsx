import React, {useEffect, useRef, useState} from 'react';
import {View, BackHandler} from 'react-native';
import translations from '../../../../assets/translations';
import {internetState} from '../../../common/commonalert';
import {useNavigation} from '@react-navigation/core';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../common/header';
import StepOne from './components/stepone';
import StepTwo from './components/steptwo';
import StepThree from './components/stepthree';
import SellStepsManager, {SELL_TABS} from './components/stepview';
import {SELL_PRODUCT} from '../../../utils/enum';
import {ProductsData} from '../../../../services/models/sellitems/myProducts';
import {SCREEN} from '../../../../root/screenname';
import useCgMutation from '../../../../services/api/useCgMutation';
import {SellAttributeData} from '../../../../services/models/sellitems/stepOne/catgoryFields';
import {GET_CATEGORY_FIELDS} from '../../../../services/endpoints';
import {MethodTypes} from '../../../../services/constants';
import {useSetLoader} from '../../../../store/useAppStore';
import {Base} from '../../../../services/models/base';
import {keyBoardManager} from '../../../utils/helperFunction';

/* The
component accepts a prop named `route`. */
export const Sell = ({route}) => {
  const [step, setStep] = useState(1);
  const [completedStep, setCompletedStep] = useState(0);
  const [isNextClick, setNextClick] = useState(false);
  const [visitingStepThreeFirstTime, setVisitingStepThreeFirstTime] =
    useState(true);
  const [userAggredTanC, setUserAggredTanC] = useState(
    route?.params?.isEditProductDetail !== undefined &&
      route?.params?.isEditProductDetail,
  );
  const scrollRef = useRef();
  const setLoader = useSetLoader();
  const [prodcutDetail, setProductDetail] = useState<ProductsData>(
    route?.params?.product !== undefined
      ? route?.params?.product
      : {
          additionalImage: [],
          additional_images: [],
          result: {variable_fields: []},
        },
  );
  const [prodcutAttrbute, setProdcutAttrbute] = useState<SellAttributeData>();
  const [isTwoStepSell, setStepTwoState] = useState(false);
  const navigation = useNavigation();

  /**
   * The function `moveToSellPriviewScreen` toggles the value of `isNextClick`.
   */
  const moveToSellPriviewScreen = () => {
    setNextClick(!isNextClick);
  };
  const {mutateAsync: getCategoryFields} = useCgMutation<
    Base<SellAttributeData>
  >({
    key:
      GET_CATEGORY_FIELDS +
      (prodcutDetail.category_detail !== undefined
        ? prodcutDetail.category_detail.id
        : route?.params?.categery.id),
    method: MethodTypes.Post,
    body: {
      category_id:
        prodcutDetail.category_detail !== undefined
          ? prodcutDetail.category_detail?.id
          : route?.params?.categery?.id,
    },
    url: GET_CATEGORY_FIELDS,
    disableLoader: true,
    offSuccessToast: true,
  });

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  `useEffect` hook is used to fetch the network connectivity status using the `NetInfo.fetch()`
  method. */
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected && !state.isInternetReachable) {
        internetState(state.isConnected!!);
        return false;
      } else {
        hitGetCategoryFields();
      }
    });

    setProductDetail({
      ...prodcutDetail,
      product_id: prodcutDetail?.id,
      additionalImage: [],
      delete_additional_images: [],
      delete_product: [],
      delete_product_size: [],
      category_id:
        prodcutDetail.category_detail !== undefined
          ? prodcutDetail.category_detail.id
          : route?.params?.categery.id,
    });
  }, []);

  /**
   * The function `hitGetCategoryFields` sets a loader state to true, makes an asynchronous request to
   * get category fields, and if successful, sets the product attribute state with the received data
   * before setting the loader state to false.
   */
  const hitGetCategoryFields = async () => {
    setLoader(true);
    const categoryRes = await getCategoryFields();
    if (categoryRes.success) {
      setProdcutAttrbute(categoryRes.data);
    }
    setLoader(false);
  };

  const onStepComplete = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected && !state.isInternetReachable) {
        internetState(state.isConnected!!);
        return false;
      } else {
        if (
          step === SELL_TABS.STEP_ONE &&
          !isTwoStepSell &&
          completedStep < SELL_TABS.STEP_THREE
        ) {
          setStep(SELL_TABS.STEP_TWO);
          scrollToTop();
        } else if (
          (step === SELL_TABS.STEP_TWO &&
            completedStep < SELL_TABS.STEP_THREE) ||
          (step === SELL_TABS.STEP_ONE &&
            isTwoStepSell &&
            completedStep < SELL_TABS.STEP_THREE)
        ) {
          setStep(SELL_TABS.STEP_THREE);
          scrollToTop();
        } else if (
          step === SELL_TABS.STEP_THREE ||
          completedStep === SELL_TABS.STEP_THREE
        ) {
          navigation.navigate(SCREEN.SELL_PRIVIEW, {
            previewData: prodcutDetail,
          });
        }
      }
    });
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
    if (
      step === SELL_TABS.STEP_TWO ||
      (isTwoStepSell && step === SELL_TABS.STEP_THREE)
    ) {
      setStep(SELL_TABS.STEP_ONE);
    } else if (step === SELL_TABS.STEP_THREE) {
      setStep(SELL_TABS.STEP_TWO);
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
  useEffect(() => {
    keyBoardManager();
    if (prodcutDetail.category_detail === undefined) {
      prodcutDetail.category_detail = route?.params?.categery;
      prodcutDetail.category_id = prodcutDetail?.category_detail?.id;
    }

    if (
      prodcutDetail.category_detail?.id === SELL_PRODUCT.TICKETS_ENTRY ||
      prodcutDetail.category_detail?.id === SELL_PRODUCT.HIRE ||
      prodcutDetail.category_detail?.id === SELL_PRODUCT.DIGITAL_PAINT
    ) {
      setStepTwoState(true);
    }
  }, []);

  const headerView = () => {
    return (
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
    );
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        {headerView()}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            flexGrow: 1,
            // justifyContent: 'center'
          }}>
          <SellStepsManager
            currentTab={step}
            isEditProduct={
              route?.params?.isEditProductDetail !== undefined &&
              route?.params?.isEditProductDetail
            }
            completedStep={completedStep}
            isTwoStep={isTwoStepSell}
          />

          <>
            {step === SELL_TABS.STEP_ONE ? (
              <StepOne
                addEditRequest={prodcutDetail}
                category={
                  prodcutDetail.category_detail !== undefined
                    ? prodcutDetail.category_detail
                    : route?.params?.categery
                }
                isNextClick={isNextClick}
                onStepComplete={onStepComplete}
                completedStep={completedStep}
                setCompletedStep={setCompletedStep}
                sellAttributeData={prodcutAttrbute?.result}
                setProductDetail={setProductDetail}
                isEditProduct={
                  route?.params?.isEditProductDetail !== undefined &&
                  route?.params?.isEditProductDetail
                }
              />
            ) : step === SELL_TABS.STEP_TWO ? (
              <StepTwo
                addEditRequest={prodcutDetail}
                category={
                  prodcutDetail.category_detail !== undefined
                    ? prodcutDetail.category_detail
                    : route?.params?.categery
                }
                isNextClick={isNextClick}
                onStepComplete={onStepComplete}
                completedStep={completedStep}
                setCompletedStep={setCompletedStep}
                sellAttributeData={prodcutAttrbute?.result}
                setProductDetail={setProductDetail}
                isEditProduct={
                  route?.params?.isEditProductDetail !== undefined &&
                  route?.params?.isEditProductDetail
                }
                scrollRef={scrollRef}
              />
            ) : (
              step === SELL_TABS.STEP_THREE && (
                <StepThree
                  addEditRequest={prodcutDetail}
                  category={
                    prodcutDetail.category_detail !== undefined
                      ? prodcutDetail.category_detail
                      : route?.params?.categery
                  }
                  isNextClick={isNextClick}
                  onStepComplete={onStepComplete}
                  sellAttributeData={prodcutAttrbute?.result}
                  completedStep={completedStep}
                  setCompletedStep={setCompletedStep}
                  setProductDetail={setProductDetail}
                  isEditProduct={
                    route?.params?.isEditProductDetail !== undefined &&
                    route?.params?.isEditProductDetail
                  }
                  visitingStepThreeFirstTime={visitingStepThreeFirstTime}
                  setVisitingStepThreeFirstTime={setVisitingStepThreeFirstTime}
                  userAggredTanC={userAggredTanC}
                  setUserAggredTanC={setUserAggredTanC}
                />
              )
            )}
          </>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Sell;
