import React, {useEffect, useState} from 'react';
import {View, BackHandler, ScrollView, Text} from 'react-native';
import translations from '../../../../../assets/translations';
import {useNetInfo} from '@react-native-community/netinfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../../../common/header';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import AppImages from '../../../../../assets/images/AppImages';
import CustomButton from '../../../../common/button';
import WelcomeModal from '../../../dashboard/chooseprofiletype/welcomemodal';
import ProductVariation from './components/productvariations';
import ProductSelectedDetails from './components/selecteddetails';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {ProductsData} from '../../../../../services/models/sellitems/myProducts';
import {
  ADD_EDIT_PRODUCT,
  PRODUCT_FEATURE_ADDITIONAL_IMAGE_UPLOAD,
} from '../../../../../services/endpoints';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {internetState} from '../../../../common/commonalert';
import {useSetLoader} from '../../../../../store/useAppStore';
import {createFormData} from '../../../../utils/helperFunction';
import {
  ProductUpdateResponse,
  ChildProduct,
} from '../../../../../services/models/sellitems/productupdateresponse';
import {checkIsNull} from '../../../../utils/validations';
// import Bio from '../../../directory/publicprofile/expertcontestant/components/bio';
// import ViewMoreModal from '../../../dashboard/pageantdashboard/pageantdetail/eventlist/eventdetail/reviews/viewmoremodal';
import {styles as styleDes} from '../../../directory/publicprofile/expertcontestant/components/bio/styles';
import ReadMoreModal from '../../../../common/readmoremodal';
import CommonHtmlViewer from '../../../../common/commonhtmlviewer';

export const SellPreview = props => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const setLoader = useSetLoader();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [additionImageUploadCounter, setAdditionImageUploadCounter] =
    useState(0);
  const [productVariantUploadCounter, setProdcutVariantUploadCounter] =
    useState(0);

  const [totalFileUploadCounter, setTotalFileUploadCounter] = useState(0);
  const [fileUploadCounter, setFileUploadCounter] = useState(0);
  const [prodcutDetail, setProdcutDetail] = useState<ProductsData>(
    props?.route?.params?.previewData,
  );
  const [prodcutResDetail, setResProdcutDetail] =
    useState<ProductUpdateResponse>();
  const [updateImageBody, setUpdateImageBody] = useState<ProductUpdateResponse>(
    {},
  );
  const [viewMoreModalVisible, setViewMoreModalVisible] = useState(false);

  //API handling-----------------------------------------

  /* A custom hook which is used to make api call. */
  const {mutateAsync: addEditProductRequest} = useCgMutation<
    Base<ProductUpdateResponse>
  >({
    key: ADD_EDIT_PRODUCT,
    body: prodcutDetail,
    url: ADD_EDIT_PRODUCT,
    disableLoader: true,
    offSuccessToast: true,
  });

  //API handling-----------------------------------------

  //Upload GALLERY Images ----------------------------------------- START
  const {mutateAsync: uploadProductImageRequest} = useCgMutation<Base>({
    key: PRODUCT_FEATURE_ADDITIONAL_IMAGE_UPLOAD,
    url: PRODUCT_FEATURE_ADDITIONAL_IMAGE_UPLOAD,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: true,
    disableLoader: true,
  });

  const onSaveButtonClicked = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      let res = await addEditProductRequest();

      if (res.success && totalFileUploadCounter > 0) {
        setResProdcutDetail(res?.data);
      } else {
        if (res.success) {
          setConfirmModalVisible(true);
        }
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    if (prodcutResDetail !== undefined) {
      fileUploadCreator();
    }
  }, [prodcutResDetail]);

  const myProductButtonClicked = () => {
    navigation.goBack();
    navigation.goBack();
    navigation.navigate(SCREEN.SELL_ITEM_SERVICES, {
      selectedTab: translations.MY_PRODUCTS,
    });
  };
  useEffect(() => {
    if (fileUploadCounter > 0) {
      uploadImage();
    }
  }, [fileUploadCounter]);

  const fileUploadCreator = async () => {
    if (prodcutDetail.localImage !== undefined) {
      setUpdateImageBody({
        featured_image: prodcutDetail.localImage,
        product_id: prodcutResDetail?.product_id,
      });

      setProdcutDetail({...prodcutDetail, localImage: undefined});
    } else if (prodcutDetail.ticket_image !== undefined) {
      setUpdateImageBody({
        ticket_image: prodcutDetail.ticket_image,
        product_id: prodcutResDetail?.product_id,
      });
      setProdcutDetail({...prodcutDetail, ticket_image: undefined});
    } else if (prodcutDetail.sample_audio !== undefined) {
      setUpdateImageBody({
        sample_audio: prodcutDetail.sample_audio,
        product_id: prodcutResDetail?.product_id,
      });
      setProdcutDetail({...prodcutDetail, sample_audio: undefined});
    } else if (prodcutDetail.full_audio !== undefined) {
      setUpdateImageBody({
        full_audio: prodcutDetail.full_audio,
        product_id: prodcutResDetail?.product_id,
      });
      setProdcutDetail({...prodcutDetail, full_audio: undefined});
    } else if (prodcutDetail.digital_file !== undefined) {
      setUpdateImageBody({
        digital_file: prodcutDetail.digital_file,
        product_id: prodcutResDetail?.product_id,
      });
      setProdcutDetail({...prodcutDetail, digital_file: undefined});
    } else if (
      prodcutDetail?.additionalImage !== undefined &&
      prodcutDetail?.additionalImage.length > 0 &&
      additionImageUploadCounter < prodcutDetail?.additionalImage.length &&
      prodcutDetail?.additionalImage[additionImageUploadCounter] !==
        undefined &&
      prodcutDetail?.additionalImage[additionImageUploadCounter]?.uri !==
        undefined &&
      prodcutDetail?.additionalImage[additionImageUploadCounter]?.uri
        ?.length!! > 0
    ) {
      setUpdateImageBody({
        additional_images:
          prodcutDetail?.additionalImage[additionImageUploadCounter],
        product_id: prodcutResDetail?.product_id,
      });

      setAdditionImageUploadCounter(additionImageUploadCounter + 1);
    } else if (
      prodcutDetail?.result?.variable_fields !== undefined &&
      prodcutDetail?.result?.variable_fields.length > 0 &&
      productVariantUploadCounter <
        prodcutDetail?.result?.variable_fields.length
    ) {
      var counter = -1;
      for (
        let index = productVariantUploadCounter;
        index < prodcutDetail?.result?.variable_fields.length;
        index++
      ) {
        const element = prodcutDetail?.result?.variable_fields[index];
        if (element.localImage !== undefined && counter === -1) {
          counter = index;
        }
      }
      if (
        counter >= 0 &&
        prodcutDetail?.result?.variable_fields[counter].localImage !== undefined
      ) {
        let productVairantDetail = getUploadVariantDetail(
          prodcutDetail?.result?.variable_fields[counter].id,
        );

        setUpdateImageBody({
          variant_image:
            prodcutDetail?.result?.variable_fields[counter].localImage,
          product_id: productVairantDetail?.product_id,
        });
        setProdcutVariantUploadCounter(counter + 1);
      }
    }
    setTimeout(() => {
      setFileUploadCounter(fileUploadCounter + 1);
    }, 500);
  };

  const getUploadVariantDetail = (
    colordID: number | undefined,
  ): ChildProduct | undefined => {
    var productVariant = undefined;
    prodcutResDetail?.child_products?.forEach(newElement => {
      if (colordID === newElement.color_id) {
        productVariant = newElement;
      }
    });

    return productVariant;
  };

  const uploadImage = async () => {
    let request = createFormData(updateImageBody);
    if (request?._parts?.length === 0) {
      setProdcutVariantUploadCounter(productVariantUploadCounter + 1);
      setTimeout(() => {
        fileUploadCreator();
      }, 500);
    } else {
      let resImage = await uploadProductImageRequest();

      if (resImage.success && fileUploadCounter >= totalFileUploadCounter) {
        setConfirmModalVisible(true);
        setLoader(false);
      } else if (resImage.success) {
        fileUploadCreator();
      } else {
        myProductButtonClicked();
        setLoader(false);
      }
    }
  };

  //We nee to handle system back here becase we using system back in previous screen.
  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, [onPressBack]);

  const onPressBack = () => {
    navigation.goBack();
    return true;
  };

  // Function to count words in a string
  const countWords = text => {
    return text?.length;
  };

  // Count words in the description
  const wordCount = countWords(prodcutDetail?.description);

  // Function to truncate description to 500 words
  const truncateDescription = (text, maxWords) => {
    return text?.slice(0, maxWords);
  };

  // Truncate the description to 500 words if not pressed
  const truncatedDescription = truncateDescription(
    prodcutDetail?.description,
    500,
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header lable={translations.PRODUCT_OVERVIEW} isUnderLineRequired />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ProductSelectedDetails
          prodcutDetail={prodcutDetail}
          imageCount={totalFileUploadCounter}
          setUploadCounter={setTotalFileUploadCounter}
        />
        {checkIsNull(prodcutDetail?.result?.non_variable_fields) && (
          <ProductVariation
            nonVariableFields={prodcutDetail?.result?.non_variable_fields}
          />
        )}
        {!!prodcutDetail.description && (
          <View
            style={{
              marginTop: checkIsNull(prodcutDetail?.result?.non_variable_fields)
                ? moderateScaleVertical(-4)
                : 0,
            }}>
            {/* <Bio
              heading={translations.DESCRIPTION}
              text={prodcutDetail.description}
              onViewMoreClick={onViewMoreClick}
              numberOfLines={8}
              isAbout={true}
              customStyles={styles.descriptionHeading}
            /> */}
            <View style={styleDes.container}>
              <Text style={styles.descriptionHeading}>
                {translations.DESCRIPTION}
              </Text>
              <CommonHtmlViewer value={truncatedDescription} />
              {/* <HTMLView
                value={truncatedDescription?.replace(/<div>|<\/div>/g, '')}
              stylesheet={{
                div: {
                  ...styleDes.subHeaderTitle,
                  marginTop: moderateScaleVertical(8),
                },
              }}
              /> */}
              {/* {!viewMoreModalVisible ? (
                <HTMLView
                  value={truncatedDescription}
                  stylesheet={{ div: { ...styleDes.subHeaderTitle, marginTop: moderateScaleVertical(8) } }}
                />
              ) : (
                <HTMLView
                  value={prodcutDetail.description}
                  stylesheet={{ div: { ...styleDes.subHeaderTitle, marginTop: moderateScaleVertical(8) } }}
                />
              )} */}

              {wordCount > 500 && (
                <Text
                  style={styleDes.viewMore}
                  onPress={() => {
                    setViewMoreModalVisible(true);
                  }}>
                  {translations.VIEW_MORE}
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomSection}>
        <CustomButton
          label={translations.SAVE_AND_CONTINUE}
          onPress={onSaveButtonClicked}
          inactive={true}
          enableHaptic={true}
        />
      </View>
      <WelcomeModal
        label={translations.SUCCESS}
        bodyText={translations.TO_EDIT_DELETE_YOU_CAN_GO_TO_MY_PRODUCT}
        icon={
          <AppImages.Common.tickIcon
            width={moderateScale(72)}
            height={moderateScaleVertical(72)}
          />
        }
        isModalVisible={confirmModalVisible}
        buttonText={translations.MY_PRODUCTS?.toUpperCase()}
        closeModal={setConfirmModalVisible}
        customStyles={styles.modalButtonBottom}
        isUploadModal={true}
        customHeight={styles.customHeight}
        giveStaticHeight={false}
        onPresssButton={myProductButtonClicked}
      />
      {/* <ViewMoreModal
        isModalVisible={viewMoreModalVisible}
        heading={translations.DESCRIPTION}
        bodyText={prodcutDetail.description}
        closeModal={setViewMoreModalVisible}
        isReview={false}
      /> */}

      <ReadMoreModal
        isModalVisible={viewMoreModalVisible}
        heading={translations.DESCRIPTION}
        bodyText={prodcutDetail?.description}
        closeModal={setViewMoreModalVisible}
      />
    </SafeAreaView>
  );
};

export default SellPreview;
